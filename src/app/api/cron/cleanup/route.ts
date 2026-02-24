import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

// Exporting a named GET function specifically targeting chron requests
// Depending on how you configure cron jobs (e.g. Vercel Cron, GitHub Actions)
export async function GET(request: Request) {
    // SECURITY: Ensure this route is protected if exposed publicly.
    // E.g., check for a secure header if triggered by Vercel Cron:
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //    return new Response('Unauthorized', { status: 401 });
    // }

    try {
        console.log("Cron triggered: Starting cleanup of expired files...");

        const nowIso = new Date().toISOString();

        // 1. Fetch only the rows that have expired
        const { data: expiredFiles, error: fetchError } = await supabase
            .from("files")
            .select("id, stored_name")
            .not("expires_at", "is", null) // Extra safety check
            .lt("expires_at", nowIso);     // Where expires_at is LESS THAN right now

        if (fetchError) {
            console.error("Error fetching expired files:", fetchError);
            return NextResponse.json({ error: "Failed to fetch expired records" }, { status: 500 });
        }

        if (!expiredFiles || expiredFiles.length === 0) {
            console.log("No expired files to clean up at this time.");
            return NextResponse.json({ message: "Clean run: perfectly empty." });
        }

        console.log(`Found ${expiredFiles.length} expired files. Proceeding to delete...`);

        // Grab an array of just the stored names
        const filesToDelete = expiredFiles.map(file => file.stored_name);

        // 2. Erase from Supabase Cloud Storage bucket
        const { error: storageError } = await supabase
            .storage
            .from("uploads")
            .remove(filesToDelete);

        if (storageError) {
            console.error("Storage Deletion Error:", storageError);
            return NextResponse.json({ error: "Failed to erase from bucket", details: storageError }, { status: 500 });
        }

        // 3. Delete metadata records from Postgres 'files' table
        const fileIds = expiredFiles.map(file => file.id);
        const { error: dbError } = await supabase
            .from("files")
            .delete()
            .in("id", fileIds);

        if (dbError) {
            console.error("Database Deletion Error:", dbError);
            return NextResponse.json({ error: "Failed to drop records from database" }, { status: 500 });
        }

        console.log(`Cleanup complete: successfully destroyed ${expiredFiles.length} files.`);
        return NextResponse.json({
            success: true,
            message: `Successfully deleted ${expiredFiles.length} files.`
        });

    } catch (error) {
        console.error("Cron Cleanup Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

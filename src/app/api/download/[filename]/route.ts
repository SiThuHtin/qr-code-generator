import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        // Extract filename from the URL, e.g. /api/download/filename.ext
        const storedName = url.pathname.split('/').pop();
        const originalName = url.searchParams.get("originalName") || storedName || "downloaded-file";

        if (!storedName || storedName.includes("..") || storedName.includes("/")) {
            return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
        }

        // Connect to Supabase to fetch metadata and verify existence
        const { supabase } = await import("@/utils/supabase");

        const { data: fileData, error: dbError } = await supabase
            .from('files')
            .select('original_name')
            .eq('stored_name', storedName)
            .single();

        if (dbError || !fileData) {
            return NextResponse.json({ error: "File not found in database registry" }, { status: 404 });
        }

        const resolvedOriginalName = fileData.original_name || storedName;

        // Replace checking disk with fetching from Supabase Storage
        const { data: storageData, error: storageError } = await supabase
            .storage
            .from('uploads')
            .download(storedName);

        if (storageError || !storageData) {
            console.error("Storage Download Error:", storageError);
            return NextResponse.json({ error: "File missing from cloud storage" }, { status: 404 });
        }

        // Atomically increment the download count via RPC or direct update
        // We'll use a direct update pulling current state, but an RPC is better if created
        const { error: rpcError } = await supabase.rpc('increment_download_count', { row_id: storedName });
        if (rpcError) {
            // Fallback if RPC doesn't exist yet: simple fetch and update
            const { data: countData } = await supabase.from('files').select('download_count').eq('stored_name', storedName).single();
            if (countData) {
                await supabase.from('files').update({ download_count: (countData.download_count || 0) + 1 }).eq('stored_name', storedName);
            }
        }

        // Set headers to force download with original filename from DB
        const fileBuffer = await storageData.arrayBuffer();
        const response = new NextResponse(fileBuffer);

        // Critical Security fix: Sanitize filename to prevent Header Injection
        const safeOriginalName = resolvedOriginalName.replace(/["\r\n]/g, "");
        response.headers.set("Content-Disposition", `inline; filename="${safeOriginalName}"`);

        // Set appropriate content type
        const ext = storedName.split(".").pop()?.toLowerCase();
        const mimeTypes: Record<string, string> = {
            pdf: "application/pdf",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            png: "image/png",
            jpeg: "image/jpeg",
            jpg: "image/jpeg",
            heic: "image/heic",
            heif: "image/heif"
        };

        if (ext && mimeTypes[ext]) {
            response.headers.set("Content-Type", mimeTypes[ext]);
        } else {
            response.headers.set("Content-Type", "application/octet-stream");
        }

        return response;

    } catch (error) {
        console.error("Download Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

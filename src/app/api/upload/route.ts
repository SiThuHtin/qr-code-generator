import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import crypto from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Strictly allow only pdf, docx, xlsx, pptx, png, jpeg
const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'xlsx', 'pptx', 'png', 'jpeg', 'jpg'];

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Validation: File Size Limit (5MB)
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "File exceeds the 5MB limit" }, { status: 400 });
        }

        // Validation: File Type Limit
        const originalName = file.name;
        const fileExtension = originalName.split('.').pop()?.toLowerCase();

        if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
            return NextResponse.json({
                error: "Invalid file type. Only PDF, DOCX, XLSX, PPTX, PNG, and JPEG are allowed."
            }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure uploads directory exists /public/uploads
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadsDir, { recursive: true });
        } catch (err) {
            // directory might already exist, safe to ignore
        }

        // Rename file using UUID
        const fileId = crypto.randomUUID();
        const storedName = `${fileId}.${fileExtension}`;
        const filepath = join(uploadsDir, storedName);

        // Save the file
        await writeFile(filepath, buffer);

        // Determine Mime Type
        const mimeTypes: Record<string, string> = {
            pdf: "application/pdf",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            png: "image/png",
            jpeg: "image/jpeg",
            jpg: "image/jpeg"
        };
        const mimeType = mimeTypes[fileExtension] || "application/octet-stream";

        // Insert metadata into Supabase Database 
        // Using dynamic import of the supabase instance
        const { supabase } = await import("@/utils/supabase");

        const { error: dbError } = await supabase.from('files').insert({
            id: fileId,
            original_name: originalName,
            stored_name: storedName,
            file_size: file.size,
            mime_type: mimeType
        });

        if (dbError) {
            console.error("Database Insert Error:", dbError);
            // Optionally decide if you want to fail the upload, or return warning logic
        }

        // We can also return a full URL for the client to generate the QR easily
        const url = new URL(request.url);
        const fileUrl = `${url.origin}/api/download/${storedName}?originalName=${encodeURIComponent(originalName)}`;

        // Return the specific JSON response requested
        return NextResponse.json({
            success: true,
            fileId,
            originalName,
            storedName,
            fileSize: file.size,
            url: fileUrl // Added to maintain compatibility with the QR Generator UI
        });

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Internal server error during upload" }, { status: 500 });
    }
}

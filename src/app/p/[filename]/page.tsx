import { supabase } from "@/utils/supabase";
import { DownloadCloud, ImageIcon, AlertCircle, FileIcon, SearchCheck } from "lucide-react";
import Link from "next/link";

type Props = {
    params: Promise<{ filename: string }>;
};

export default async function PreviewPage({ params }: Props) {
    const resolvedParams = await params;
    const filename = resolvedParams.filename;

    const { data: fileData, error: dbError } = await supabase
        .from('files')
        .select('original_name, mime_type, file_size')
        .eq('stored_name', filename)
        .single();

    if (dbError || !fileData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 p-4">
                <div className="max-w-md w-full p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl text-center border border-gray-100 dark:border-zinc-700">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">File Not Found</h1>
                    <p className="text-gray-500 dark:text-gray-400">The file you are looking for does not exist or has expired.</p>
                </div>
            </div>
        );
    }

    const isImage = fileData.mime_type.startsWith('image/');
    // Direct API route to download/preview the file
    const downloadUrl = `/api/download/${filename}?originalName=${encodeURIComponent(fileData.original_name)}`;
    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 animate-in fade-in duration-500">
            <div className="w-full max-w-lg p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 transition-colors">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/40 mb-4">
                        {isImage ? (
                            <ImageIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        ) : (
                            <FileIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        )}
                    </div>
                    <h1 className="text-2xl font-bold text-foreground break-words line-clamp-2" title={fileData.original_name}>
                        {fileData.original_name}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        {formatBytes(fileData.file_size)} • {fileData.mime_type.split('/')[1]?.toUpperCase() || 'FILE'}
                    </p>
                </div>

                {/* Preview Section */}
                {isImage && (
                    <div className="mb-8 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm bg-gray-50 dark:bg-zinc-950 flex justify-center items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={downloadUrl}
                            alt={fileData.original_name}
                            className="max-h-64 object-contain w-full"
                        />
                    </div>
                )}

                {/* Instructions & Actions */}
                <div className="space-y-4">
                    {isImage && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-4 text-center">
                            <p className="text-sm text-yellow-800 dark:text-yellow-400 font-medium">
                                💡 <strong>iPhone / Mobile Users:</strong><br />
                                Long-press the image above and tap <strong className="font-bold">&quot;Save to Photos&quot;</strong>.
                            </p>
                        </div>
                    )}

                    <a
                        href={downloadUrl}
                        download={fileData.original_name}
                        className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-all"
                    >
                        <DownloadCloud className="w-5 h-5" />
                        {isImage ? 'Download Original Data' : 'Download File'}
                    </a>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 text-center">
                    <Link href="/" className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                        Create your own QR Code
                    </Link>
                </div>
            </div>
        </div>
    );
}

import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 animate-in fade-in duration-300">
            <div className="animate-pulse flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Loading your file...
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Please wait a moment.
                </p>
            </div>
        </div>
    );
}

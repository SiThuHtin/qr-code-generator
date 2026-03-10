import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8 text-center">

                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                    Have a question, feedback, or a feature request? We would love to hear from you. We strive to make Silly QR the best free tool on the web.
                </p>

                <div className="mt-12 bg-white dark:bg-zinc-900 shadow-xl border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 justify-center p-4 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800">
                            <Mail className="w-6 h-6 text-blue-500" />
                            <div className="text-left">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">Email Support</p>
                                <a href="mailto:sithuhtin2022@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    sithuhtin2022@gmail.com
                                </a>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                            Please allow up to 48 hours for a response to general inquiries. If you are reporting a critical bug with the generator, please use the subject line &quot;URGENT: Bug Report&quot;.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

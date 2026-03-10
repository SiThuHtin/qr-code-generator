import React from 'react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-extrabold tracking-tight">About Silly QR</h1>

                <section className="space-y-4">
                    <p className="text-lg">
                        Silly QR was created with a simple mission: to provide a lightning-fast, highly reliable, and completely free QR code generator that doesn&apos;t compromise on user experience.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">Our Story</h2>
                    <p>
                        We realized that most QR code generators scattered across the internet are bloated, overloaded with frustrating forms, or hide their best features behind expensive subscription paywalls. Finding a secure way to just turn a quick PDF or a presentation slide into a QR code for a meeting was unnecessarily complicated.
                    </p>
                    <p>
                        So, we built Silly QR. Despite the silly name, our service is packed with serious technology. We leverage next-generation cloud infrastructure to instantly host files up to 10MB, giving you a dynamic QR code that behaves beautifully on smartphones.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">Why Choose Us?</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Always Free:</strong> Generate as many text, URL, and file QR codes as you need.</li>
                        <li><strong>Privacy First:</strong> Every file you upload is automatically destroyed after 24 hours. No traces, no lingering data.</li>
                        <li><strong>Mobile Optimized:</strong> Our preview pipeline is natively optimized for iOS and Android so users can seamlessly view and save files.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">Continuous Improvement</h2>
                    <p>
                        We are constantly working to improve the platform and expand its capabilities while keeping it simple. Thank you for using our tool and supporting our journey to build better utility applications for everyone.
                    </p>
                </section>
            </div>
        </div>
    );
}

import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated: March 2026</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">1. Introduction</h2>
                    <p>
                        Welcome to Silly QR (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We respect your privacy and are committed to protecting any personal information that you may provide through our services. This Privacy Policy explains what information we collect, how we use it, and your rights regarding this information.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">2. Information We Collect</h2>
                    <p>
                        When you use our service, we may collect the following types of information:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Uploaded Files:</strong> Any files you voluntarily upload (such as images, documents, or presentations) to generate QR codes.</li>
                        <li><strong>Usage Data:</strong> We may collect anonymous analytics data regarding how the service is accessed and used.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">3. How We Use Your Information</h2>
                    <p>
                        The files you upload are strictly used for the purpose of generating the requested QR code and providing the temporary download link. We do not sell, distribute, or use your uploaded content for any other purpose.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">4. Data Retention and Security</h2>
                    <p>
                        <strong>Auto-Deletion:</strong> All files uploaded to our servers are transient. They are automatically and permanently deleted from our cloud storage after 24 hours. We employ industry-standard security measures to ensure your data is secure while it remains on our servers during that 24-hour window.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">5. Third-Party Services</h2>
                    <p>
                        We may use third-party services, such as Google AdSense, to display advertisements. These third parties may use cookies to serve ads based on your prior visits to our website or other websites. Please refer to our <a href="/cookies" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie Policy</a> for more details.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">6. Changes to this Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please visit our <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Page</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}

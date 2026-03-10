import React from 'react';

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-extrabold tracking-tight">Cookie Policy</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated: March 2026</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">1. What Are Cookies</h2>
                    <p>
                        Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">2. How We Use Cookies</h2>
                    <p>
                        Silly QR itself does not use non-essential cookies to track your behavior or require you to log in. We strive to provide a fast and seamless QR code generation experience without unnecessary tracking.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">3. Third-Party Cookies (Google AdSense)</h2>
                    <p>
                        To keep this service free for everyone, we use Google AdSense to display advertisements. Google and its partners use cookies to serve ads based on your prior visits to our site or other websites on the internet.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to your sites and/or other sites on the Internet.</li>
                        <li>Users may opt out of personalized advertising by visiting Google&apos;s <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Ads Settings</a>.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">4. Your Consent</h2>
                    <p>
                        By using our website, you consent to the use of cookies in accordance with this Cookie Policy. If you do not accept the use of these cookies, please disable them through your browser settings or navigate away from the site. If you reside in a region governed by GDPR or CCPA, you may be presented with a consent banner where you can make specific choices regarding advertising cookies.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-2">5. Updates to this Policy</h2>
                    <p>
                        We may update this policy occasionally. We encourage you to review this Cookie Policy regularly to stay informed about how we use cookies.
                    </p>
                </section>
            </div>
        </div>
    );
}

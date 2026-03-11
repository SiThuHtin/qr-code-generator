"use client";

import { useEffect } from "react";

export default function AdBanner({ className = "w-full", format = "auto" }: { className?: string, format?: string }) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err: any) {
            console.error("AdSense Error:", err.message);
        }
    }, []);

    return (
        <div className={`flex justify-center text-center overflow-hidden ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: "block", width: "100%", height: format === 'vertical' ? '600px' : 'auto', minHeight: "250px" }}
                data-ad-client="ca-pub-6558195500270519"
                data-ad-slot="9282871605"
                data-ad-format={format}
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
}

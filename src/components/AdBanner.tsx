"use client";

import { useEffect } from "react";

export default function AdBanner() {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err: any) {
            console.error("AdSense Error:", err.message);
        }
    }, []);

    return (
        <div className="w-full mt-8 md:mt-16 flex justify-center text-center overflow-hidden">
            <ins
                className="adsbygoogle"
                style={{ display: "block", width: "100%" }}
                data-ad-client="ca-pub-6558195500270519"
                data-ad-slot="9282871605"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
}

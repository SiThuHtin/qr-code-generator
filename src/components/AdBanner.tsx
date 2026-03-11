"use client";

import { useEffect, useRef, useState } from "react";

export default function AdBanner({ className = "w-full", format = "auto" }: { className?: string, format?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;
        
        const initAd = () => {
            try {
                // Check if the container actually has dimensions (i.e. is visible)
                if (containerRef.current && containerRef.current.offsetWidth > 0 && containerRef.current.offsetHeight > 0) {
                    const insElement = containerRef.current.querySelector('ins');
                    // Only push if the ad hasn't already been filled
                    if (insElement && insElement.innerHTML === "") {
                        // @ts-ignore
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    }
                }
            } catch (err: any) {
                if (err.message && err.message.includes('availableWidth=0')) {
                    // Suppress this specific error since we are intentionally hiding the ad with CSS
                    return;
                }
                console.error("AdSense Error:", err.message);
            }
        };

        // A slight delay ensures the responsive layout is fully calculated before checking offsetWidth
        const timer = setTimeout(initAd, 250);

        return () => clearTimeout(timer);
    }, [isClient]);

    return (
        <div ref={containerRef} className={`flex justify-center text-center overflow-hidden ${className}`}>
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

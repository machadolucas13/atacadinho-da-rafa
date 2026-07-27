"use client";

import { useState, useEffect } from "react";
import { AdBannerClient, BANNER_728x90_SCRIPT, BANNER_728x90_INVOKE, BANNER_320x50_SCRIPT, BANNER_320x50_INVOKE, BANNER_300x250_SCRIPT, BANNER_300x250_INVOKE, SMARTLINK_SCRIPT, SMARTLINK_INVOKE } from "./AdsterraAds";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export function TopAd() {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center justify-center w-full overflow-hidden">
      {isMobile ? (
        <AdBannerClient
          scriptContent={BANNER_320x50_SCRIPT}
          invokeSrc={BANNER_320x50_INVOKE}
          width={320}
          height={50}
          fallbackWidth={300}
          fallbackHeight={50}
        />
      ) : (
        <AdBannerClient
          scriptContent={BANNER_728x90_SCRIPT}
          invokeSrc={BANNER_728x90_INVOKE}
          width={728}
          height={90}
          fallbackWidth={300}
          fallbackHeight={250}
        />
      )}
    </div>
  );
}

export function InContentAd() {
  return (
    <div className="flex items-center justify-center w-full overflow-hidden">
      <AdBannerClient
        scriptContent={BANNER_300x250_SCRIPT}
        invokeSrc={BANNER_300x250_INVOKE}
        width={300}
        height={250}
        fallbackWidth={300}
        fallbackHeight={250}
      />
    </div>
  );
}

export function SmartlinkAd() {
  return (
    <div className="flex items-center justify-center w-full overflow-hidden">
      <AdBannerClient
        scriptContent={SMARTLINK_SCRIPT}
        invokeSrc={SMARTLINK_INVOKE}
        width={300}
        height={250}
        fallbackWidth={300}
        fallbackHeight={250}
      />
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="flex items-center justify-center w-full overflow-hidden">
      <AdBannerClient
        scriptContent={BANNER_300x250_SCRIPT}
        invokeSrc={BANNER_300x250_INVOKE}
        width={300}
        height={250}
        fallbackWidth={300}
        fallbackHeight={250}
      />
    </div>
  );
}


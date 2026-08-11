"use client";

import { useEffect, useRef, useState } from "react";

type AdProps = {
  key: string;
  format: "iframe";
  height: number;
  width: number;
  src?: string;
};

const ADSTERRA_INVOKE = "https://russiaexternalknew.com/fvt0cu1tg/invoke.js";

export function Ad({ key, format, height, width, src }: AdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const adKey = key || `ad-${Math.random().toString(36).slice(2, 9)}`;
    const invokeSrc = src || ADSTERRA_INVOKE;

    console.log("[Ad] Initializing ad", { adKey, width, height, invokeSrc });

    const timeout = window.setTimeout(() => {
      console.log("[Ad] Timeout waiting for iframe", { adKey });
      setError(true);
    }, 10000);

    try {
      window.atOptions = {
        key: adKey,
        format,
        height,
        width,
        params: {},
      };

      console.log("[Ad] window.atOptions set", window.atOptions);

      const invokeScript = document.createElement("script");
      invokeScript.src = invokeSrc;
      invokeScript.async = true;
      invokeScript.onload = () => {
        console.log("[Ad] invoke.js loaded", { adKey });
      };
      invokeScript.onerror = () => {
        console.log("[Ad] invoke.js failed to load", { adKey });
        window.clearTimeout(timeout);
        setError(true);
      };
      container.appendChild(invokeScript);

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeName === "IFRAME") {
              console.log("[Ad] Iframe rendered!", { adKey, node });
              window.clearTimeout(timeout);
              setError(false);
              observer.disconnect();
              return;
            }
          }
        }
      });

      observer.observe(container, { childList: true, subtree: true });

      return () => {
        window.clearTimeout(timeout);
        observer.disconnect();
      };
    } catch (err) {
      console.log("[Ad] Error during init", err);
      window.clearTimeout(timeout);
      setError(true);
    }
  }, [key, format, height, width, src]);

  if (error) {
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.03)",
          border: "1px dashed rgba(255,255,255,0.1)",
          color: "#6b7280",
          fontSize: 11,
          borderRadius: 8,
        }}
      >
        Publicidade
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        minWidth: width,
        minHeight: height,
        maxWidth: "100%",
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    />
  );
}

export const BANNER_320x50_KEY = "7292007a1bc473f486b8326ae9244783";
export const BANNER_320x50_INVOKE = "https://russiaexternalknew.com/7292007a1bc473f486b8326ae9244783/invoke.js";

export const BANNER_728x90_KEY = "1d6a72f04d50f848ad503a3e4f4889f6";
export const BANNER_728x90_INVOKE = "https://russiaexternalknew.com/1d6a72f04d50f848ad503a3e4f4889f6/invoke.js";

export const BANNER_300x250_KEY = "a75d1c15fffc042a78552f24ca875571";
export const BANNER_300x250_INVOKE = "https://russiaexternalknew.com/a75d1c15fffc042a78552f24ca875571/invoke.js";

export const SMARTLINK_KEY = "f243d170cc0bf2fcd1df74001886740a";
export const SMARTLINK_INVOKE = "https://russiaexternalknew.com/fvt0cu1tg/invoke.js";

export function TopAd() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className="flex items-center justify-center w-full overflow-hidden"
      style={{ position: "relative", zIndex: 50 }}
    >
      <Ad
        key={isMobile ? BANNER_320x50_KEY : BANNER_728x90_KEY}
        format="iframe"
        width={isMobile ? 320 : 728}
        height={isMobile ? 50 : 90}
        src={isMobile ? BANNER_320x50_INVOKE : BANNER_728x90_INVOKE}
      />
    </div>
  );
}

export function InContentAd() {
  return (
    <div
      className="flex items-center justify-center w-full overflow-hidden"
      style={{ position: "relative", zIndex: 50 }}
    >
      <Ad
        key={BANNER_300x250_KEY}
        format="iframe"
        width={300}
        height={250}
        src={BANNER_300x250_INVOKE}
      />
    </div>
  );
}

export function FooterAd() {
  return (
    <div
      className="flex items-center justify-center w-full overflow-hidden"
      style={{ position: "relative", zIndex: 50 }}
    >
      <Ad
        key={BANNER_300x250_KEY}
        format="iframe"
        width={300}
        height={250}
        src={BANNER_300x250_INVOKE}
      />
    </div>
  );
}

export function SmartlinkAd() {
  return (
    <div
      className="flex items-center justify-center w-full overflow-hidden"
      style={{ position: "relative", zIndex: 50 }}
    >
      <Ad
        key={SMARTLINK_KEY}
        format="iframe"
        width={300}
        height={250}
        src={SMARTLINK_INVOKE}
      />
    </div>
  );
}

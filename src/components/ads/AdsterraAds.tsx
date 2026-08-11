"use client";

import { useEffect, useRef, useState } from "react";

type AdProps = {
  adKey: string;
  invokeSrc: string;
  width: number;
  height: number;
};

export function Ad({ adKey, invokeSrc, width, height }: AdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const timeout = window.setTimeout(() => {
      if (status === "loading") {
        setStatus("error");
      }
    }, 12000);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeName === "IFRAME") {
            window.clearTimeout(timeout);
            setStatus("ready");
            observer.disconnect();
            return;
          }
        }
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    try {
      const atScript = document.createElement("script");
      atScript.type = "text/javascript";
      atScript.textContent = `
        window.atOptions = {
          key: '${adKey}',
          format: 'iframe',
          height: ${height},
          width: ${width},
          params: {}
        };
      `;
      container.appendChild(atScript);

      const invokeScript = document.createElement("script");
      invokeScript.src = invokeSrc;
      invokeScript.async = true;
      container.appendChild(invokeScript);
    } catch {
      window.clearTimeout(timeout);
      setStatus("error");
    }

    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
    };
  }, [adKey, invokeSrc, width, height]);

  if (status === "error") {
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
        adKey={isMobile ? BANNER_320x50_KEY : BANNER_728x90_KEY}
        invokeSrc={isMobile ? BANNER_320x50_INVOKE : BANNER_728x90_INVOKE}
        width={isMobile ? 320 : 728}
        height={isMobile ? 50 : 90}
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
        adKey={BANNER_300x250_KEY}
        invokeSrc={BANNER_300x250_INVOKE}
        width={300}
        height={250}
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
        adKey={BANNER_300x250_KEY}
        invokeSrc={BANNER_300x250_INVOKE}
        width={300}
        height={250}
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
        adKey={SMARTLINK_KEY}
        invokeSrc={SMARTLINK_INVOKE}
        width={300}
        height={250}
      />
    </div>
  );
}

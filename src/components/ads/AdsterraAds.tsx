"use client";

import { useEffect, useRef, useState } from "react";

type AdProps = {
  html: string;
  width: number;
  height: number;
};

export function Ad({ html, width, height }: AdProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const container = ref.current;
    console.log("[Ad] Container found, injecting HTML", { width, height });

    const timeout = window.setTimeout(() => {
      console.log("[Ad] Timeout - no ad rendered");
      setError(true);
    }, 12000);

    try {
      container.innerHTML = html;

      const invokeScript = document.createElement("script");
      invokeScript.src = "https://russiaexternalkew.com/fvt0cu1tg/invoke.js";
      invokeScript.async = true;
      invokeScript.onload = () => {
        console.log("[Ad] Invoke script loaded");
        window.clearTimeout(timeout);
      };
      invokeScript.onerror = () => {
        console.log("[Ad] Invoke script failed");
        window.clearTimeout(timeout);
        setError(true);
      };
      container.appendChild(invokeScript);

      const observer = new MutationObserver(() => {
        const iframe = container.querySelector("iframe");
        if (iframe) {
          console.log("[Ad] Iframe detected!", iframe);
          window.clearTimeout(timeout);
          setError(false);
        }
      });

      observer.observe(container, { childList: true, subtree: true });

      return () => {
        window.clearTimeout(timeout);
        observer.disconnect();
      };
    } catch (err) {
      console.log("[Ad] Error injecting HTML", err);
      window.clearTimeout(timeout);
      setError(true);
    }
  }, [html]);

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
      ref={ref}
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

export const BANNER_320x50 = `atOptions = {
  'key' : '7292007a1bc473f486b8326ae9244783',
  'format' : 'iframe',
  'height' : 50,
  'width' : 320,
  'params' : {}
};<script src="https://russiaexternalknew.com/7292007a1bc473f486b8326ae9244783/invoke.js"><\/script>`;

export const BANNER_728x90 = `atOptions = {
  'key' : '1d6a72f04d50f848ad503a3e4f4889f6',
  'format' : 'iframe',
  'height' : 90,
  'width' : 728,
  'params' : {}
};<script src="https://russiaexternalknew.com/1d6a72f04d50f848ad503a3e4f4889f6/invoke.js"><\/script>`;

export const BANNER_300x250 = `atOptions = {
  'key' : 'a75d1c15fffc042a78552f24ca875571',
  'format' : 'iframe',
  'height' : 250,
  'width' : 300,
  'params' : {}
};<script src="https://russiaexternalknew.com/a75d1c15fffc042a78552f24ca875571/invoke.js"><\/script>`;

export const SMARTLINK = `atOptions = {
  'key' : 'f243d170cc0bf2fcd1df74001886740a',
  'format' : 'iframe',
  'height' : 250,
  'width' : 300,
  'params' : {}
};<script src="https://russiaexternalkew.com/fvt0cu1tg/invoke.js"><\/script>`;

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
        html={isMobile ? BANNER_320x50 : BANNER_728x90}
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
      <Ad html={BANNER_300x250} width={300} height={250} />
    </div>
  );
}

export function FooterAd() {
  return (
    <div
      className="flex items-center justify-center w-full overflow-hidden"
      style={{ position: "relative", zIndex: 50 }}
    >
      <Ad html={BANNER_300x250} width={300} height={250} />
    </div>
  );
}

export function SmartlinkAd() {
  return (
    <div
      className="flex items-center justify-center w-full overflow-hidden"
      style={{ position: "relative", zIndex: 50 }}
    >
      <Ad html={SMARTLINK} width={300} height={250} />
    </div>
  );
}

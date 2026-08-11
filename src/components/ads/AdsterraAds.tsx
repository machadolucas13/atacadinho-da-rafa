"use client";

import { useEffect, useRef, useState } from "react";

type AdProps = {
  html: string;
  src: string;
  width: number;
  height: number;
};

export function Ad({ html, src, width, height }: AdProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      console.log("[Ad] Server-side, skipping");
      return;
    }

    const container = ref.current;
    if (!container) {
      console.log("[Ad] No container ref");
      return;
    }

    console.log(`[Ad] Mounting ad attempt ${attempt + 1}`, { width, height, src });

    container.innerHTML = "";

    const timeout = window.setTimeout(() => {
      console.log(`[Ad] Timeout after 10s, showing fallback`);
      setError(true);
    }, 10000);

    try {
      console.log("[Ad] Creating atOptions script");
      const atOptionsScript = document.createElement("script");
      atOptionsScript.type = "text/javascript";
      atOptionsScript.textContent = html;
      container.appendChild(atOptionsScript);
      console.log("[Ad] atOptions script appended");

      console.log("[Ad] Creating invoke script");
      const invokeScript = document.createElement("script");
      invokeScript.src = src;
      invokeScript.async = true;
      invokeScript.onload = () => {
        console.log(`[Ad] Invoke script loaded successfully`);
        window.clearTimeout(timeout);
        setError(false);
      };
      invokeScript.onerror = (e) => {
        console.log(`[Ad] Invoke script failed to load`, e);
        window.clearTimeout(timeout);
        setError(true);
      };
      container.appendChild(invokeScript);
      console.log("[Ad] Invoke script appended, waiting...");
    } catch (err) {
      console.log("[Ad] Error during script creation", err);
      window.clearTimeout(timeout);
      setError(true);
    }

    return () => {
      window.clearTimeout(timeout);
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [html, src, attempt]);

  const retry = () => {
    console.log("[Ad] Retrying...");
    setError(false);
    setAttempt((a) => a + 1);
  };

  if (error) {
    console.log("[Ad] Showing error fallback");
    return (
      <div
        onClick={retry}
        style={{
          width,
          height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.03)",
          border: "1px dashed rgba(255,255,255,0.1)",
          color: "#6b7280",
          fontSize: 11,
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        <span>Publicidade</span>
        <span style={{ fontSize: 9, marginTop: 4, opacity: 0.7 }}>clique para tentar novamente</span>
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
        border: "1px solid rgba(255,255,255,0.05)",
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
};`;

export const BANNER_320x50_SRC = "https://russiaexternalknew.com/7292007a1bc473f486b8326ae9244783/invoke.js";

export const BANNER_728x90 = `atOptions = {
  'key' : '1d6a72f04d50f848ad503a3e4f4889f6',
  'format' : 'iframe',
  'height' : 90,
  'width' : 728,
  'params' : {}
};`;

export const BANNER_728x90_SRC = "https://russiaexternalknew.com/1d6a72f04d50f848ad503a3e4f4889f6/invoke.js";

export const BANNER_300x250 = `atOptions = {
  'key' : 'a75d1c15fffc042a78552f24ca875571',
  'format' : 'iframe',
  'height' : 250,
  'width' : 300,
  'params' : {}
};`;

export const BANNER_300x250_SRC = "https://russiaexternalknew.com/a75d1c15fffc042a78552f24ca875571/invoke.js";

export const SMARTLINK = `atOptions = {
  'key' : 'f243d170cc0bf2fcd1df74001886740a',
  'format' : 'iframe',
  'height' : 250,
  'width' : 300,
  'params' : {}
};`;

export const SMARTLINK_SRC = "https://russiaexternalknew.com/fvt0cu1tg/invoke.js";

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
        src={isMobile ? BANNER_320x50_SRC : BANNER_728x90_SRC}
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
      <Ad html={BANNER_300x250} src={BANNER_300x250_SRC} width={300} height={250} />
    </div>
  );
}

export function FooterAd() {
  return (
    <div
      className="flex items-center justify-center w-full overflow-hidden"
      style={{ position: "relative", zIndex: 50 }}
    >
      <Ad html={BANNER_300x250} src={BANNER_300x250_SRC} width={300} height={250} />
    </div>
  );
}

export function SmartlinkAd() {
  return (
    <div
      className="flex items-center justify-center w-full overflow-hidden"
      style={{ position: "relative", zIndex: 50 }}
    >
      <Ad html={SMARTLINK} src={SMARTLINK_SRC} width={300} height={250} />
    </div>
  );
}

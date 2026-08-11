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

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const container = ref.current;
    container.innerHTML = "";

    let timeout: number;

    try {
      const atOptionsScript = document.createElement("script");
      atOptionsScript.type = "text/javascript";
      atOptionsScript.textContent = html;
      container.appendChild(atOptionsScript);

      const invokeScript = document.createElement("script");
      invokeScript.src = src;
      invokeScript.async = true;
      invokeScript.onload = () => setError(false);
      invokeScript.onerror = () => setError(true);
      container.appendChild(invokeScript);

      timeout = window.setTimeout(() => {
        setError(true);
      }, 10000);
    } catch {
      setError(true);
    }

    return () => {
      window.clearTimeout(timeout);
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [html, src]);

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
    <div className="flex items-center justify-center w-full overflow-hidden py-3">
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
    <div className="flex items-center justify-center w-full overflow-hidden py-4">
      <Ad html={BANNER_300x250} src={BANNER_300x250_SRC} width={300} height={250} />
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="flex items-center justify-center w-full overflow-hidden py-4">
      <Ad html={BANNER_300x250} src={BANNER_300x250_SRC} width={300} height={250} />
    </div>
  );
}

export function SmartlinkAd() {
  return (
    <div className="flex items-center justify-center w-full overflow-hidden py-4">
      <Ad html={SMARTLINK} src={SMARTLINK_SRC} width={300} height={250} />
    </div>
  );
}

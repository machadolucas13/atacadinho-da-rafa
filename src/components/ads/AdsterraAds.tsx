"use client";

import { useEffect, useRef, useState } from "react";

type AdBannerProps = {
  scriptContent: string;
  invokeSrc: string;
  width: number;
  height: number;
  fallbackWidth?: number;
  fallbackHeight?: number;
};

function assertNumber(value: number | undefined, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function AdBannerClient({
  scriptContent,
  invokeSrc,
  width,
  height,
  fallbackWidth = 300,
  fallbackHeight = 250,
}: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const safeWidth = assertNumber(width, fallbackWidth);
  const safeHeight = assertNumber(height, fallbackHeight);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const container = containerRef.current;
    if (container.querySelector(`script[data-adsterra-invoked="${invokeSrc}"]`)) {
      setStatus("loaded");
      return;
    }

    let timeout: number;
    const successHandler = () => {
      setStatus("loaded");
      clearTimeout(timeout);
    };

    const errorHandler = () => {
      setStatus("error");
      clearTimeout(timeout);
    };

    timeout = window.setTimeout(() => {
      setStatus("error");
    }, 10000);

    const script = document.createElement("script");
    script.setAttribute("data-adsterra-invoked", invokeSrc);
    script.innerHTML = scriptContent;
    container.appendChild(script);

    const invokeScript = document.createElement("script");
    invokeScript.src = invokeSrc;
    invokeScript.async = true;
    invokeScript.onload = successHandler;
    invokeScript.onerror = errorHandler;
    container.appendChild(invokeScript);

    return () => {
      clearTimeout(timeout);
      if (invokeScript.parentNode) {
        invokeScript.parentNode.removeChild(invokeScript);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [scriptContent, invokeSrc, safeWidth, safeHeight]);

  if (status === "error") {
    return (
      <div
        style={{
          width: safeWidth,
          height: safeHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.05)",
          border: "1px dashed rgba(255,255,255,0.1)",
          borderRadius: "0.75rem",
          color: "#9ca3af",
          fontSize: "10px",
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
        width: safeWidth,
        height: safeHeight,
        minWidth: safeWidth,
        minHeight: safeHeight,
        maxWidth: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    />
  );
}

export const SMARTLINK_SCRIPT = `atOptions = {
  'key' : 'f243d170cc0bf2fcd1df74001886740a',
  'format' : 'iframe',
  'height' : 250,
  'width' : 300,
  'params' : {}
};`;

export const SMARTLINK_INVOKE = "https://russiaexternalknew.com/fvt0cu1tg/invoke.js";

export const BANNER_300x250_SCRIPT = `atOptions = {
  'key' : 'a75d1c15fffc042a78552f24ca875571',
  'format' : 'iframe',
  'height' : 250,
  'width' : 300,
  'params' : {}
};`;

export const BANNER_300x250_INVOKE = "https://russiaexternalknew.com/a75d1c15fffc042a78552f24ca875571/invoke.js";

export const BANNER_320x50_SCRIPT = `atOptions = {
  'key' : '7292007a1bc473f486b8326ae9244783',
  'format' : 'iframe',
  'height' : 50,
  'width' : 320,
  'params' : {}
};`;

export const BANNER_320x50_INVOKE = "https://russiaexternalknew.com/7292007a1bc473f486b8326ae9244783/invoke.js";

export const BANNER_728x90_SCRIPT = `atOptions = {
  'key' : '1d6a72f04d50f848ad503a3e4f4889f6',
  'format' : 'iframe',
  'height' : 90,
  'width' : 728,
  'params' : {}
};`;

export const BANNER_728x90_INVOKE = "https://russiaexternalknew.com/1d6a72f04d50f848ad503a3e4f4889f6/invoke.js";


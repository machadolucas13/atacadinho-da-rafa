"use client";

import { useEffect, useRef, useState } from "react";

export default function AdTestPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  function addLog(msg: string) {
    setLogs((l) => [...l, `${new Date().toLocaleTimeString()} - ${msg}`]);
  }

  useEffect(() => {
    setStatus("loading");
    addLog("AdTestPage mounted");

    const container = containerRef.current;
    if (!container) {
      addLog("Container ref not found");
      setStatus("error");
      return;
    }

    container.innerHTML = "";

    const key = "a75d1c15fffc042a78552f24ca875571";
    const invokeSrc = "https://russiaexternalknew.com/a75d1c15fffc042a78552f24ca875571/invoke.js";

    const timeout = setTimeout(() => {
      addLog("Timeout - checking for iframe");
      const iframe = container.querySelector("iframe");
      if (!iframe) {
        addLog("FAIL: no iframe after 12s");
        setStatus("error");
      }
    }, 12000);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeName === "IFRAME") {
            addLog(`SUCCESS: iframe rendered`);
            clearTimeout(timeout);
            setStatus("success");
            observer.disconnect();
            return;
          }
        }
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    const atScript = document.createElement("script");
    atScript.type = "text/javascript";
    atScript.textContent = `
      window.atOptions = {
        key: '${key}',
        format: 'iframe',
        height: 250,
        width: 300,
        params: {}
      };
    `;
    container.appendChild(atScript);
    addLog("atOptions injected");

    const invokeScript = document.createElement("script");
    invokeScript.src = invokeSrc;
    invokeScript.async = true;
    invokeScript.onload = () => addLog("invoke.js loaded");
    invokeScript.onerror = () => {
      addLog("invoke.js FAILED");
      clearTimeout(timeout);
      setStatus("error");
    };
    container.appendChild(invokeScript);
    addLog("invoke.js appended");

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Adsterra Isolated Test</h1>
      <p className="text-gray-300 mb-8">
        This page tests Adsterra outside the main layout. If this works but the main site
        doesn&apos;t, the issue is in how the ad wrapper interacts with the rest of the app.
      </p>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Test Slot</h2>
        <div className="flex items-center justify-center">
          <div
            ref={containerRef}
            style={{
              width: 300,
              height: 250,
              border: status === "success" ? "2px solid #22c55e" : "1px dashed rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.2)",
            }}
          />
        </div>
        <div className="mt-4 text-center">
          {status === "success" && (
            <span className="text-sm text-green-400 font-semibold">Ad rendered successfully</span>
          )}
          {status === "error" && (
            <span className="text-sm text-red-400 font-semibold">Ad failed to render</span>
          )}
          {status === "loading" && (
            <span className="text-sm text-yellow-400 font-semibold">Loading...</span>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Logs</h2>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className="text-xs text-gray-400 font-mono">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

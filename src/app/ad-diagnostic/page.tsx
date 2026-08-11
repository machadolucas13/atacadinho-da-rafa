"use client";

import { useEffect, useRef, useState } from "react";

export default function AdDiagnosticPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [tests, setTests] = useState<any>({});

  function addLog(msg: string) {
    setLogs((l) => [...l, `${new Date().toLocaleTimeString()} - ${msg}`]);
  }

  useEffect(() => {
    addLog("Diagnostic page mounted");

    const results: any = {
      hasWindow: typeof window !== "undefined",
      hasDocument: typeof document !== "undefined",
      hasDOMParser: typeof DOMParser !== "undefined",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "N/A",
    };

    setTests(results);

    const container = document.getElementById("ad-test-container");
    if (!container) {
      addLog("Container not found");
      return;
    }

    addLog("Container found, starting test");

    const script1 = document.createElement("script");
    script1.textContent = `
      window.atOptions = {
        'key' : 'a75d1c15fffc042a78552f24ca875571',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;
    container.appendChild(script1);
    addLog("atOptions script injected");

    const script2 = document.createElement("script");
    script2.src = "https://russiaexternalknew.com/a75d1c15fffc042a78552f24ca875571/invoke.js";
    script2.async = true;
    script2.onload = () => addLog("invoke.js loaded");
    script2.onerror = () => addLog("invoke.js FAILED to load");
    container.appendChild(script2);
    addLog("invoke.js script appended");

    const checkInterval = setInterval(() => {
      const iframe = container.querySelector("iframe");
      const scripts = container.querySelectorAll("script");
      const hasInvoke = Array.from(scripts).some(
        (s) => s.src && s.src.includes("russiaexternalknew")
      );

      if (iframe) {
        addLog(`SUCCESS: iframe found! src=${iframe.src}`);
        clearInterval(checkInterval);
      } else if (hasInvoke) {
        addLog("invoke.js script present, waiting for iframe...");
      } else {
        addLog("invoke.js not yet loaded");
      }
    }, 2000);

    setTimeout(() => {
      clearInterval(checkInterval);
      const iframe = container.querySelector("iframe");
      if (!iframe) {
        addLog("FAIL: No iframe after 15s");
      }
    }, 15000);

    return () => clearInterval(checkInterval);
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Ad Diagnostic</h1>

      <div className="grid gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Environment Tests</h2>
          <pre className="text-sm text-gray-300">{JSON.stringify(tests, null, 2)}</pre>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Raw HTML Injection Test (300x250)</h2>
          <div
            id="ad-test-container"
            style={{
              width: 300,
              height: 250,
              border: "1px dashed rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.2)",
            }}
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Live Logs</h2>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="text-xs text-gray-400 font-mono">
                {log}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Interpretation</h2>
          <div className="text-sm text-gray-300 space-y-2">
            <p>If you see &quot;invoke.js loaded&quot; but no iframe → Adsterra has no ad for your domain/traffic right now.</p>
            <p>If you see &quot;invoke.js FAILED to load&quot; → network/CSP issue.</p>
            <p>If you see an iframe → ads are working! The issue is likely in how React/Next.js wraps them.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    };

    setTests(results);

    const container = document.getElementById("ad-test-container");
    if (!container) {
      addLog("Container not found");
      return;
    }

    addLog("Container found, injecting raw HTML");

    const rawHtml = `
      <script>
        window.atOptions = {
          'key' : 'a75d1c15fffc042a78552f24ca875571',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      </script>
      <script src="https://russiaexternalknew.com/a75d1c15fffc042a78552f24ca875571/invoke.js"></script>
    `;

    container.innerHTML = rawHtml;
    addLog("Raw HTML injected");

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
          <h2 className="text-xl font-bold text-white mb-4">Next.js Component Test</h2>
          <AdComponentTest />
        </div>
      </div>
    </div>
  );
}

function AdComponentTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string>("idle");
  const [logs, setLogs] = useState<string[]>([]);

  function log(msg: string) {
    setLogs((l) => [...l, `${new Date().toLocaleTimeString()} - ${msg}`]);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    log("Component mounted");

    const container = containerRef.current;
    container.innerHTML = "";

    const key = "a75d1c15fffc042a78552f24ca875571";
    const invokeSrc = "https://russiaexternalknew.com/a75d1c15fffc042a78552f24ca875571/invoke.js";

    const timeout = setTimeout(() => {
      log("Timeout - checking result");
      const iframe = container.querySelector("iframe");
      if (!iframe) {
        log("FAIL: no iframe after timeout");
        setStatus("error");
      }
    }, 12000);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeName === "IFRAME") {
            log(`SUCCESS: iframe detected via observer`);
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
    log("atOptions script injected");

    const invokeScript = document.createElement("script");
    invokeScript.src = invokeSrc;
    invokeScript.async = true;
    invokeScript.onload = () => log("invoke.js onload fired");
    invokeScript.onerror = () => {
      log("invoke.js onerror fired");
      clearTimeout(timeout);
      setStatus("error");
    };
    container.appendChild(invokeScript);
    log("invoke.js script appended");

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="mb-4">
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
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {logs.map((log, i) => (
          <div key={i} className="text-xs text-gray-400 font-mono">
            {log}
          </div>
        ))}
      </div>
      {status === "success" && (
        <div className="mt-2 text-sm text-green-400 font-semibold">Ad rendered successfully!</div>
      )}
      {status === "error" && (
        <div className="mt-2 text-sm text-red-400 font-semibold">Ad failed to render</div>
      )}
    </div>
  );
}

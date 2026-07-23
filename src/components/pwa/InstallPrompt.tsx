"use client";

import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isAppleDevice = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    const isAndroid = /android/.test(navigator.userAgent.toLowerCase());
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone;
    const mobile = isAppleDevice || isAndroid;

    setIsMobile(mobile);
    setIsIos(isAppleDevice && !isStandalone);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    if (!isStandalone && (isAppleDevice || isAndroid)) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    try {
      if (!localStorage.getItem("installPromptDismissed")) {
        localStorage.setItem("installPromptDismissed", "true");
      }
    } catch {
      // ignore
    }
  };

  if (!isVisible) return null;

  const title = isMobile ? "Instale o Atacadinho da Rafa" : "Instale o app";
  const description = isIos
    ? "Toque no botão Compartilhar e selecione 'Adicionar à Tela de Início'."
    : isMobile
      ? "Instale o app para acessar os achados mais rápido."
      : "Instale o app para acessar os achados mais rápido.";

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md sm:left-auto sm:right-4">
      <div className="rounded-2xl border border-white/10 bg-[#0a0a14]/95 p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-white">{title}</p>
            <p className="mt-1 text-xs text-gray-400">{description}</p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full p-1 text-gray-400 transition-colors hover:text-white"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 flex gap-2">
          {!isIos && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="flex-1 rounded-full bg-[#E11D48] py-2 text-xs font-bold text-white transition-all hover:bg-[#be123c]"
            >
              Instalar app
            </button>
          )}
          {isIos && (
            <button
              onClick={handleClose}
              className="flex-1 rounded-full bg-white/10 py-2 text-xs font-bold text-white transition-all hover:bg-white/20"
            >
              Entendi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

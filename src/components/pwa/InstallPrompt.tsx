"use client";

import { useEffect, useState, useCallback } from "react";
import BrandLogo from "@/components/layout/BrandLogo";
import { X } from "lucide-react";

export default function InstallPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const handleInstall = useCallback(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsVisible(false);
        sessionStorage.setItem("installPromptDismissed", "true");
      }
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userAgent = navigator.userAgent || "";
    const isAppleDevice = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /android/i.test(userAgent);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;

    setIsIOS(isAppleDevice);
    setIsStandalone(standalone);

    if (standalone) return;

    const dismissed = sessionStorage.getItem("installPromptDismissed");
    if (dismissed === "true") return;

    const isMobile = isAppleDevice || isAndroid;
    if (!isMobile) return;

    const timer = setTimeout(() => setIsVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("installPromptDismissed", "true");
  };

  if (!isVisible || isStandalone) return null;

  const canInstall = !!deferredPrompt && !isIOS;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-sm rounded-t-3xl sm:rounded-3xl bg-white/10 p-6 shadow-2xl backdrop-blur-xl animate-[fadeSlideUp_0.5s_ease-out] border border-white/60">
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full p-2 text-gray-400 transition-colors hover:text-white hover:bg-white/10"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <BrandLogo size={56} showText className="mb-4" />

          <h3 className="text-lg font-bold text-white">
            Instale o Atacadinho da Rafa
          </h3>
          <p className="mt-1.5 text-sm text-gray-300 leading-relaxed">
            Salve na sua tela inicial para acessar os achados mais rapidamente.
          </p>

          <ul className="mt-4 w-full space-y-2 text-left text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-[#F4A7B9]">✔</span>
              <span>Abre mais rápido sem navegador</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-[#F4A7B9]">✔</span>
              <span>Experiência mais fluida e limpa</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-[#F4A7B9]">✔</span>
              <span>Receba destaques toda semana</span>
            </li>
          </ul>

          <div className="mt-5 w-full space-y-2">
            {canInstall && (
              <button
                onClick={handleInstall}
                className="btn-primary w-full"
              >
                Instalar agora
              </button>
            )}
            {isIOS && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left text-xs text-gray-300">
                <p className="font-semibold text-white mb-1">
                  Como instalar no iPhone/iPad:
                </p>
                <ol className="list-decimal space-y-1 pl-4">
                  <li>Toque em <strong>Compartilhar</strong></li>
                  <li>Toque em <strong>Adicionar à Tela de Início</strong></li>
                  <li>Confirme o nome e toque em <strong>Adicionar</strong></li>
                </ol>
              </div>
            )}
            <button
              onClick={handleClose}
              className="w-full rounded-full py-2.5 text-sm font-semibold text-gray-300 transition-colors hover:text-white"
            >
              Lembrar depois
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

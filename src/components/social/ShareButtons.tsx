"use client";

import React, { useState, useEffect } from "react";
import { Share2, Facebook, MessageCircle, Link2, Check } from "lucide-react";

export default function ShareButtons({ title, description, image, url }: { title: string; description?: string; image?: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setShareUrl(window.location.origin + url);
    }
  }, [url]);

  const shareFacebook = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const target = shareUrl || url;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(target)}&quote=${encodeURIComponent(description || title)}`, "_blank", "width=600,height=400");
  };

  const sharePinterest = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const target = shareUrl || url;
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(target)}&description=${encodeURIComponent(description || title)}&media=${encodeURIComponent(image || "")}`, "_blank", "width=600,height=400");
  };

  const shareX = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const target = shareUrl || url;
    window.open(`https://x.com/intent/post?text=${encodeURIComponent(description || title)}&url=${encodeURIComponent(target)}`, "_blank", "width=600,height=400");
  };

  const shareWhatsApp = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const target = shareUrl || url;
    window.open(`https://wa.me/?text=${encodeURIComponent(`${description || title}\n${target}`)}`, "_blank", "width=600,height=400");
  };

  const copyLink = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const target = shareUrl || url;
    try {
      await navigator.clipboard.writeText(target);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Erro ao copiar");
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl || url,
        });
      } catch {
        console.error("Erro ao compartilhar");
      }
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5">
        <div className="h-8 w-8 rounded-full bg-white/10" />
        <div className="h-8 w-8 rounded-full bg-white/10" />
        <div className="h-8 w-8 rounded-full bg-white/10" />
        <div className="h-8 w-8 rounded-full bg-white/10" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={(e) => shareFacebook(e)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm text-blue-600 transition-all hover:scale-110 hover:bg-white"
        aria-label="Compartilhar no Facebook"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>

      <button
        onClick={(e) => sharePinterest(e)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm text-red-600 transition-all hover:scale-110 hover:bg-white"
        aria-label="Compartilhar no Pinterest"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.15 9.42 7.6 11.17-.1-.94-.2-2.4.04-3.44.22-.94 1.4-5.92 1.4-5.92s-.36-.72-.36-1.78c0-1.67.97-2.91 2.17-2.91 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 4-.33 1.41.7 2.56 2.09 2.56 2.51 0 4.44-2.65 4.44-6.47 0-3.39-2.44-5.76-5.92-5.76-4.03 0-6.4 3.03-6.4 6.16 0 1.22.47 2.53.66 3.24.37.71.54 1.3.16 2.09-.15.31-.06.93.07 1.18.3.61.99 1.67 1.39 1.33-.02.66-.22 1.32-.4 1.88-.19.56.28.97 1.42.97 1.71 0 3.03-1.6 4.14-3.69 1.64-.59 3.58-2.5 3.58-4.9 0-4.03-2.93-7.71-7.08-7.71-4.68 0-7.42 3.51-7.42 7.14 0 1.42.55 2.94 1.24 3.77.14.16.16.3.12.46-.08.45-.29 1.42-.33 1.62-.06.3-.24.36-.56.21-1.34-.61-2.18-2.52-2.18-4.06 0-3.31 2.42-6.35 6.94-6.35 3.64 0 6.47 2.6 6.47 6.08 0 3.62-2.29 6.54-5.47 6.54-.85 0-1.65-.44-1.93-.91 0 0-.42 1.6-.52 2-.21.82-.81 1.84-1.2 2.47C8.86 21.6 10.38 22 12 22c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
        </svg>
      </button>

      <button
        onClick={(e) => shareX(e)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm text-black transition-all hover:scale-110 hover:bg-white"
        aria-label="Compartilhar no X"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>

      <button
        onClick={(e) => shareWhatsApp(e)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm text-green-600 transition-all hover:scale-110 hover:bg-white"
        aria-label="Compartilhar no WhatsApp"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>

      <button
        onClick={(e) => copyLink(e)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm text-gray-700 transition-all hover:scale-110 hover:bg-white"
        aria-label="Copiar link"
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

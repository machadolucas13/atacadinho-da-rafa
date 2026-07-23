"use client";

import { useEffect, useState, useMemo } from "react";

interface ArticleTocProps {
  htmlContent: string;
}

export default function ArticleToc({ htmlContent }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  const headings = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const items: { id: string; text: string; level: number }[] = [];
    doc.querySelectorAll("h2, h3").forEach((h, index) => {
      const id = `heading-${index}`;
      h.id = id;
      items.push({
        id,
        text: h.textContent?.replace(/^(✨|👉)\s*/, "") || "",
        level: h.tagName === "H2" ? 2 : 3,
      });
    });
    return items;
  }, [htmlContent]);

  useEffect(() => {
    if (!htmlContent) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    doc.querySelectorAll("h2, h3").forEach((h, index) => {
      h.id = `heading-${index}`;
    });
    const container = document.getElementById("article-content");
    if (container) {
      container.innerHTML = doc.body.innerHTML;
    }
  }, [htmlContent]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-card">
      <h2 className="text-2xl font-bold text-white mb-4">📑 Neste artigo</h2>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollTo(heading.id)}
            className={`block w-full text-left transition-all ${
              heading.level === 3 ? "pl-4" : ""
            } ${
              activeId === heading.id
                ? "text-[#F4A7B9] font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span
              className={`inline-block ${
                heading.level === 3 ? "text-xs" : "text-sm"
              }`}
            >
              {heading.text}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

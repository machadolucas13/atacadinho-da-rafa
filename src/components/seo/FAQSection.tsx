"use client";

import { useState } from "react";

interface FAQItem {
  pergunta: string;
  resposta: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQSection({ items, title = "Perguntas frequentes" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl py-12">
      <h2 className="text-2xl font-bold text-white tracking-tight mb-6">{title}</h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/10 transition-colors"
            >
              <span className="font-semibold text-white pr-4">{item.pergunta}</span>
              <svg
                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-300 leading-relaxed">
                {item.resposta}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

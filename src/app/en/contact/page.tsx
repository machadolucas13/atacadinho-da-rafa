"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Contact</h1>
      <p className="text-gray-300 leading-relaxed mb-8">
        Send your message, topic suggestion, partnership inquiry, or question. We reply
        within a few business days.
      </p>

      {sent ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-gray-200">
          Message sent successfully! We will get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-[#F4A7B9]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              required
              type="email"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-[#F4A7B9]"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Subject</label>
            <input
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-[#F4A7B9]"
              placeholder="Subject"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Message</label>
            <textarea
              required
              rows={6}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-[#F4A7B9]"
              placeholder="Write your message..."
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#F4A7B9] px-6 py-2.5 font-semibold text-black hover:bg-[#ff8fa3]"
          >
            Send message
          </button>
        </form>
      )}

      <p className="mt-8 text-sm text-gray-400">
        Or email directly:{" "}
        <a className="text-[#F4A7B9] hover:underline" href="mailto:contato@atacadinhodarafa.vercel.app">
          contato@atacadinhodarafa.vercel.app
        </a>
      </p>
    </div>
  );
}

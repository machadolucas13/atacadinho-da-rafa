"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";

const ADMIN_PASSWORD = "AtacadinhoDaRafa123*";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Senha incorreta");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a14] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E11D48] to-[#F67C6F] text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Admin</h1>
            <p className="text-xs text-gray-400">Atacadinho da Rafa</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-300">Digite a senha para acessar o painel</p>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#E11D48] to-[#F67C6F] py-2 text-white shadow-sm transition-all hover:shadow"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

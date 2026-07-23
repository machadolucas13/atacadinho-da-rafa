"use client";

import { useEffect, useRef, useCallback } from "react";

const DRAFT_KEY = "admin-draft";

export function useAutoSave(form: any, fields: string[]) {
  const timeoutRef = useRef<any>(null);

  const saveDraft = useCallback(() => {
    if (typeof window === "undefined") return;
    const data: any = {};
    fields.forEach((field) => {
      data[field] = form[field];
    });
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...data, savedAt: Date.now() }));
  }, [form, fields]);

  const clearDraft = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(DRAFT_KEY);
  }, []);

  const loadDraft = useCallback(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      saveDraft();
    }, 2000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [form, saveDraft]);

  return { saveDraft, clearDraft, loadDraft };
}

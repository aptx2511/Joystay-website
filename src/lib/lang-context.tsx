"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "vi";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
});

const KEY = "joystay-lang";

/** Ngôn ngữ: lần đầu theo ngôn ngữ trình duyệt (tiếng Việt → VI, còn lại → EN);
 *  khi khách tự chọn thì ghi nhớ cho những lần sau (localStorage). */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let next: Lang | null = null;
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "en" || saved === "vi") next = saved;
    } catch { /* chế độ riêng tư: bỏ qua */ }
    if (!next && navigator.language?.toLowerCase().startsWith("vi")) next = "vi";
    if (next && next !== "en") setLangState(next);
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(KEY, l); } catch { /* bỏ qua */ }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/** Helper: pick EN or VI string from a bilingual object */
export function tx(obj: { en: string; vi: string }, lang: Lang): string {
  return obj[lang];
}

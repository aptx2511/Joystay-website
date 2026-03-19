"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "vi";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
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

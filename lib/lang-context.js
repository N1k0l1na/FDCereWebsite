import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dict } from "./i18n";

const LangContext = createContext({ lang: "hr", t: dict.hr, setLang: () => {} });

export function LangProvider({ children }) {
  // Read saved language once during init (no setState in effects)
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fdcere_lang");
      if (saved === "hr" || saved === "en") return saved;
    }
    return "hr";
  });

  // Persist changes
  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem("fdcere_lang", lang);
    } catch {}
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: dict[lang] || dict.hr }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

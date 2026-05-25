"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ptBR from "./locales/pt-BR.json";
import en from "./locales/en.json";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        "pt-BR": { translation: ptBR },
        en: { translation: en },
      },
      fallbackLng: "pt-BR",
      supportedLngs: ["pt-BR", "en"],
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "dojo-fs-lang",
      },
      interpolation: { escapeValue: false },
      returnNull: false,
    });
}

export default i18n;

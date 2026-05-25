"use client";

import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./index";

/**
 * Provider client-side pra i18n. Wrap rotas que usam useTranslation().
 *
 * Rotas SSR/RSC públicas (landing) usam strings inline ou imports diretos dos JSONs
 * pra evitar custo de hydration desnecessária no marketing.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

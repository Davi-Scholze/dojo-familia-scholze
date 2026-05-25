"use client";

import { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { InstallPrompt } from "@/components/InstallPrompt";

/**
 * Layout das rotas autenticadas (Sprint 1+ adiciona middleware de auth).
 * Client-side por usar i18n + hooks.
 *
 * Sprint 1: verificar Supabase session aqui + redirect se não autenticado.
 */
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <I18nProvider>
      <div className="absolute right-4 top-4">
        <LanguageSwitch />
      </div>
      {children}
      <InstallPrompt />
    </I18nProvider>
  );
}

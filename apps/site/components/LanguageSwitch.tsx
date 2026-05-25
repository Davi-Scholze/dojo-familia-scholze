"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@dojo-fs/ui";

/**
 * Toggle minimal pra alternar idioma — pt-BR ↔ en.
 * Persistência via localStorage (configurada em lib/i18n/index.ts).
 */
export function LanguageSwitch() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? "pt-BR";
  const next = current === "pt-BR" ? "en" : "pt-BR";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => i18n.changeLanguage(next)}
      aria-label={`Switch language to ${next}`}
      className="text-xs uppercase tracking-widest text-muted-foreground"
    >
      {current === "pt-BR" ? "EN" : "PT"}
    </Button>
  );
}

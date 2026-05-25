/**
 * Design tokens — Dojô Família Scholze
 *
 * Paleta oficial extraída visualmente do material do pai (INDEX.md 2026-05-21).
 * Hex aproximados — refinar com colorpicker no PNG oficial em iteração futura.
 *
 * @see ../../_negocio/identidade/logos-e-marca/oficial/INDEX.md (bruto sagrado)
 */
export const tokens = {
  colors: {
    black: { hex: "#000000", oklch: "oklch(0 0 0)", usage: "fundo institucional, headers escuros" },
    red: { hex: "#D32F2F", oklch: "oklch(0.55 0.22 25)", usage: "faixa, ponto central do logo, detalhes de marca" },
    white: { hex: "#FFFFFF", oklch: "oklch(1 0 0)", usage: "logo em fundo escuro, texto sobre vermelho" },
    gray: { hex: "#3E3E3E", oklch: "oklch(0.35 0 0)", usage: "alternativa neutra ao preto puro (banner YouTube)" },
  },
  fontFamily: {
    sans: "Inter, system-ui, sans-serif",
    display: "CornerStoreJF, Inter, sans-serif",
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
  },
} as const;

export type Tokens = typeof tokens;

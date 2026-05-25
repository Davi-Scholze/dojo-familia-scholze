import type { Config } from "tailwindcss";

/**
 * Config Tailwind compartilhada — Dojô Família Scholze
 *
 * Apps consumidores (apps/site, apps/app) fazem `import sharedConfig from "@dojo-fs/ui/tailwind.config"`
 * e estendem com `content` próprio + plugins específicos.
 *
 * Paleta oficial extraída visualmente do material do pai (INDEX.md 2026-05-21).
 * Hex aproximados — refinar com colorpicker em iteração futura (T11/Sprint 1).
 */
export const sharedTailwindConfig: Partial<Config> = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // Paleta institucional Dojô Família Scholze
        dojo: {
          black: "oklch(0 0 0)",        // #000000 fundo institucional
          red: "oklch(0.55 0.22 25)",   // ~#D32F2F vermelho-sangue (faixa, ponto central)
          white: "oklch(1 0 0)",        // #FFFFFF
          gray: "oklch(0.35 0 0)",      // ~#3E3E3E cinza-grafite (alternativa neutra)
        },
        // shadcn/ui design system (CSS vars resolvidas em globals.css)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["CornerStoreJF", "Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};

export default sharedTailwindConfig;

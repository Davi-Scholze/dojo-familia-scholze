# @dojo-fs/ui

Design system compartilhado do Dojô Família Scholze.

**Stack:** shadcn/ui + Tailwind v3 + design tokens OKLCH derivados do material oficial do pai.

## O que tem aqui

- **`tailwind.config.shared.ts`** — config base reusável (paleta + tipografia + radius); apps consomem via `import sharedConfig from "@dojo-fs/ui/tailwind.config"`
- **`src/globals.css`** — CSS vars (HSL) + `@tailwind base/components/utilities`; apps importam via `@import "@dojo-fs/ui/globals.css"`
- **`src/theme.ts`** — tokens em JS (preto/vermelho/branco/cinza) com hex + oklch + usage
- **`src/constants.ts`** — textuais oficiais (slogan, kanji, modalidades, filosofia)
- **`src/components/`** — 3 componentes base shadcn/ui (Button, Card, Input)
- **`src/lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge)

## Como apps consomem

```ts
// apps/site/tailwind.config.ts
import type { Config } from "tailwindcss";
import sharedConfig from "@dojo-fs/ui/tailwind.config";

const config: Config = {
  ...sharedConfig,
  content: [
    "./app/**/*.{ts,tsx}",
    "./node_modules/@dojo-fs/ui/src/**/*.{ts,tsx}",
  ],
};

export default config;
```

```ts
// apps/app/src/main.tsx
import "@dojo-fs/ui/globals.css";
import { Button, SLOGAN, ORG_NAME } from "@dojo-fs/ui";
```

## Paleta

| Token | Hex | OKLCH | Uso |
|---|---|---|---|
| `dojo.black` | `#000000` | `oklch(0 0 0)` | Fundo institucional |
| `dojo.red` | `#D32F2F` | `oklch(0.55 0.22 25)` | Faixa, ponto central do logo |
| `dojo.white` | `#FFFFFF` | `oklch(1 0 0)` | Logo em fundo escuro |
| `dojo.gray` | `#3E3E3E` | `oklch(0.35 0 0)` | Banner YouTube, alternativa neutra |

**Status:** Hex aproximados via visual do PNG oficial (INDEX.md 2026-05-21). Refinar com colorpicker quando o pai enviar SVG vetorial.

## Pendências (do INDEX.md)

- Logo redondo PRETO (temos só branco)
- Logo retangular BRANCO (temos só preto)
- Fonte CornerStoreJF.ttf
- Logos em SVG
- Hex exatos via amostragem oficial

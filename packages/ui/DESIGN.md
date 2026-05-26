---
tipo: design-system
data: 2026-05-25
projeto: dojo-familia-scholze (caso 0 KOD.AI)
status: ATIVO — frontend-designer agent consulta antes de gerar qualquer componente
---

# DESIGN.md — Dojô Família Scholze

> Fonte canônica de design pro Dojô. Lido obrigatoriamente pelo agent `frontend-designer` antes de gerar qualquer componente. Lido pelo `design-reviewer` durante audit.

---

## 1. Identidade do cliente (PAI Cristiano Scholze)

**Empresa:** Dojô Família Scholze — Curitiba/PR
**Modalidades:** Judô + Jiu-Jitsu (BJJ)
**Slogan oficial:** "CEDER PARA VENCER"
**Kanji:** 柔道 (Judô) + 柔術 (Jiu-Jitsu)
**Sensei:** Cristiano Scholze (pai do Davi)
**Filosofia:** Jigoro Kano — *"Somente se aproxima da perfeição, quem a procura com constância, sabedoria e, sobretudo, humildade."*

### Assets oficiais (em `_negocio/identidade/logos-e-marca/oficial/`)

- **Logo retangular preto** (`2026-05-21_logo-retangular-preto-oficial.png`) — usar em headers grandes, hero
- **Logo redondo branco** (`2026-05-21_logo-redondo-branco-oficial.png`) — usar como avatar, ícone, favicon
- **Banner YouTube** (`2026-05-21_banner-youtube-oficial.png`) — cinza-grafite, referência de cover
- **Certificado template PDF** — visual japonês refinado (cerejeira + pagode + torii + serif elegante)

---

## 2. Mood consolidado — 4 referências escolhidas por Davi

Mix com peso decrescente:

| Ref | URL | Contribuição |
|---|---|---|
| 1. **Andrew Olf Boxing Club** | https://www.andrewolfboxing.club/ | **Energia combate** — preto + vermelho + atletas em movimento + tipografia forte caixa-alta. Hero épico cinematográfico. |
| 2. **Lupine Lights** | https://www.lupinelights.com/en | **Refinamento artesanal** — espaço em branco generoso + tipografia serif elegante + fotos com profundidade. Sensação de "produto raro". |
| 3. **rig.ai** | https://rig.ai/?ref=minimal.gallery | **Minimalismo contemplativo** — tipografia GIGANTE + scroll lento + espaço pra respirar. "Premium tech zen". |
| 4. **OnMat App Components** | https://onmat.app/app-components/ | **Utilitário SaaS** — concorrente direto, gestão de academias de artes marciais. Dashboard organizado, cards de métricas. |

### Mood final em 1 frase

> "Dojô tradicional japonês refinado **fundido** com academia de combate de elite — minimalista, intenso, contemplativo, profissional."

### Tom de voz

- **Sério** — não casual nem irônico
- **Filosófico** — usa citações de Jigoro Kano, conceitos como "Ceder pra Vencer"
- **Acolhedor sem ser meigo** — "Bem-vindo, Sensei" é warmth correto; "Oi Sensei!" é errado
- **Brasilidade técnica** — PT-BR primário, sem regionalismo excludente
- **Honesto** — sem hipérbole marketing; "tu vai virar campeão" é falso, "treine com método" é verdadeiro

---

## 3. Design tokens (consolidados — `packages/ui/theme.ts` + `globals.css`)

### Paleta (oficial confirmada visual do logo do pai)

```
dojo-black:   #000000   oklch(0 0 0)         — fundo institucional, principal
dojo-red:     #D32F2F   oklch(0.55 0.22 25)  — accent, CTA, faixa, ponto central logo
dojo-white:   #FFFFFF   oklch(1 0 0)         — texto sobre fundo escuro
dojo-gray:    #3E3E3E   oklch(0.35 0 0)      — neutra (banner YT, bordas sutis)
```

**Hierarquia uso:**
- **Background:** dojo-black (98% das telas, dark-first)
- **Foreground/text:** dojo-white em fundos escuros
- **Accent:** dojo-red — usar **com parcimônia** (CTA principal, slogan, faixa decorativa)
- **Borders/muted:** dojo-gray ou rgba dojo-white 12%

**Regra:** NUNCA usar dojo-red em blocos grandes. Energia vem da PARCIMÔNIA do vermelho contra preto absoluto, não saturação.

### Tipografia

| Token | Fallback CSS | Uso |
|---|---|---|
| `font-display` | `"CornerStoreJF", "Inter", sans-serif` | Headlines hero, slogan, kanji em destaque |
| `font-sans` | `"Inter", system-ui, sans-serif` | Corpo texto, UI, formulários |
| `font-serif` (futuro) | `"Cormorant Garamond", Georgia, serif` | Citações Jigoro Kano, contemplativo |

**Escala (Tailwind defaults + extends):**
- Display hero: `text-6xl sm:text-7xl lg:text-8xl` — caixa alta com `tracking-wider`
- Display section: `text-4xl sm:text-5xl` — caixa alta
- Body large: `text-base sm:text-lg`
- Body: `text-sm`
- Caption: `text-xs uppercase tracking-widest`

**Pesos:** `font-bold` (700) pra headlines, `font-medium` (500) pra UI, `font-normal` (400) pra body.

### Espaçamento

Escala base 4px (Tailwind default). Generoso por padrão (referência rig.ai).

- Container max: `max-w-7xl` no desktop, `px-6 sm:px-8 lg:px-12`
- Section vertical padding: `py-16 sm:py-24 lg:py-32` (espaço pra respirar)
- Component padding: `p-6` (cards) / `p-8` (forms)

### Border radius

- `rounded-sm` (2px) — inputs, badges
- `rounded-md` (6px) — buttons (padrão shadcn)
- `rounded-lg` (12px) — cards
- `rounded-full` — avatars, dots, badges circulares

### Motion tokens (pra animation-engineer agent)

```
ease-standard:    cubic-bezier(0.2, 0, 0, 1)    — uso geral
ease-emphasized:  cubic-bezier(0.3, 0, 0, 1)    — elementos entram em foco
ease-cinematic:   cubic-bezier(0.65, 0, 0.35, 1) — transições de tela (referência rig.ai)
duration-fast:    150ms                          — feedback imediato (hover/press)
duration-base:    250ms                          — transições estado
duration-slow:    400ms                          — entrada/saída de elementos grandes
duration-epic:    700ms                          — hero reveals, drama (referência andrewolf)
```

**Princípio:** animações **subordinadas ao conteúdo**, não decorativas. Cada motion serve uma função (feedback / hierarquia / contexto).

---

## 4. Padrões obrigatórios pra TODA tela

### Estrutura

1. **Hero / topo** — sempre forte, com identidade clara (logo + slogan ou contexto)
2. **Conteúdo** — alinhado, hierarquia visual clara, espaço pra respirar
3. **CTA** — destacado mas não agressivo (dojo-red como accent, não fundo)
4. **Footer/atribuição** — sutil, "Sensei Cristiano Scholze" + ano

### Componentes shadcn/ui (já em `packages/ui/src/components/`)

Existentes: Button, Card, Input.

Quando precisar de mais (Dialog, Sheet, Toast, Avatar, Badge, Tabs, etc), adicionar via shadcn CLI seguindo o design system aqui.

### Mobile-first inviolável

**Sempre testar PRIMEIRO em 390x844** (iPhone padrão), depois desktop. PWA é o canal principal.

### Acessibilidade

- Contraste mínimo AA WCAG (dojo-white em dojo-black = passa)
- Focus states visíveis (`focus-visible:ring-2 ring-dojo-red`)
- Aria labels em ícones-only
- Touch targets mínimo 44x44px

---

## 5. Tela `/login` — briefing rico

### Mood específico

**Combinação:**
- Hero estilo Andrew Wolf Boxing Club (intenso, atleta-foto, tipografia forte)
- Refinamento Lupine Lights (espaço, serif, sensação artesanal)
- Espaço Rig.ai (contemplativo, não-apressado)

### Estrutura proposta

```
┌─────────────────────────────────────┐
│ [Logo retangular preto centralizado]│
│                                     │
│         CEDER PARA VENCER           │  ← display bold, dojo-red, tracking-wider
│         柔道 • 柔術                 │  ← serif/display
│                                     │
│  ┌───────────────────────────────┐  │
│  │ seu@email.com               │  │  ← input grande, padding generoso
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  RECEBER LINK DE ACESSO       │  │  ← button caixa-alta, dojo-red
│  └───────────────────────────────┘  │
│                                     │
│  Sem senhas — só email. Você        │
│  recebe um link que faz login       │  ← microcopy explicativa, dojo-gray
│  automático.                        │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  "Somente se aproxima da            │  ← citação Jigoro Kano, serif
│  perfeição, quem a procura com      │     italic, contemplativo
│  constância, sabedoria e,           │
│  sobretudo, humildade."             │
│  — Jigoro Kano                      │
│                                     │
│  Sensei Cristiano Scholze · 2026    │  ← footer sutil
└─────────────────────────────────────┘
```

### Background

- Fundo: dojo-black puro
- Opcional (se houver foto): banner sutil B&W de tatame em opacity 0.05 (textura, não distrai)

---

## 6. Tela `/dashboard` — briefing rico

### Mood específico

**Combinação:**
- Utilitário OnMat (dashboard claro, cards organizados, foco em utilidade)
- Refinamento Lupine Lights (espaço, hierarquia)
- Identidade dojo (header com nome + role + logout — já implementado)

### Estrutura proposta

```
┌─────────────────────────────────────────────────────────────┐
│ [● Logo redondo] Dojô FS    Sensei Cristiano · admin · Sair │  ← header sticky
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Bem-vindo, Admin Teste                                   │  ← display, sem caixa-alta
│   Administrador                                             │  ← caption uppercase tracking-widest
│                                                             │
│   ┌──────────────────────────────────────────────┐         │
│   │ Visão geral do dojô                          │         │
│   │                                              │         │
│   │  ▍ 0 alunos ativos                           │         │
│   │  ▍ 0 turmas configuradas                     │         │
│   │  ▍ 0 graduações próximas                     │         │
│   │  ▍ R$ 0 mensalidades a receber este mês      │         │
│   │                                              │         │
│   │  [Estado vazio — Sprint 1c configura]        │         │  ← micro-state vazio elegante
│   └──────────────────────────────────────────────┘         │
│                                                             │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│   │ 👥 Alunos    │ │ 📅 Turmas    │ │ 💰 Financeiro│      │  ← cards de seção,
│   │ Sprint 1c    │ │ Sprint 1c    │ │ Sprint 3     │      │     disabled mas
│   │ → Em breve   │ │ → Em breve   │ │ → Em breve   │      │     visualmente bons
│   └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                             │
│   ─────────────────────────────────────────                 │
│                                                             │
│   柔道 • 柔術    CEDER PARA VENCER                          │  ← rodapé refinado
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Princípios de layout

- Container `max-w-6xl mx-auto`
- Espaçamento generoso entre seções
- Cards "vazios" Sprint 1c+ **não** parecem broken — parecem "promessas" elegantes
- Sem decoração desnecessária

---

## 7. Restrições técnicas inegociáveis

- **Stack:** Next.js 15 + App Router + TS + Tailwind v3 + shadcn/ui base
- **Mobile-first:** sempre validar em 390x844 ANTES de 1920x1080
- **PWA:** componentes funcionam offline (Server Components OK pra leitura, Client Components pra interação)
- **i18n:** strings via `react-i18next` `useTranslation()` quando viável; fallback hardcoded `@dojo-fs/ui/constants` em Server Components
- **Acessibilidade:** WCAG AA mínimo, focus rings visíveis
- **Performance:** Lighthouse PWA ≥80, SEO ≥90, Performance ≥80 (Sprint 1+)
- **Identidade ABSOLUTA:** paleta dojo-* nunca substituída por palette genérica shadcn

---

## 8. Checklist do `design-reviewer` (audit antes de commit)

- [ ] Usa tokens semânticos (sem `#xxx` literal no JSX)
- [ ] Tipografia segue escala (sem `text-[14px]` numérico)
- [ ] Espaçamentos seguem escala 4px
- [ ] Mobile-first verificado em 390x844
- [ ] Contraste WCAG AA mínimo (axe-core)
- [ ] Focus states visíveis
- [ ] Touch targets ≥ 44x44px
- [ ] Slogan + kanji + identidade do pai presentes em pelo menos 1 seção da tela
- [ ] Sem placeholder texto fake do tipo "Lorem ipsum"
- [ ] Sem `<img>` (usar `<Image>` Next.js para otimização)

---

## 9. Atribuição

- **Pai:** Cristiano Scholze — fornecedor da identidade visual original
- **Curador de design:** Davi Scholze (escolheu 4 refs em 2026-05-25)
- **Biblioteca canônica:** `_negocio/contextos/bruto/2026-05-13_biblioteca-web-design-internacional.md`
- **Postmortem que originou disciplina:** `_negocio/POSTMORTEM-2026-05-25-ui-cycle-violation.md`
- **Hook que enforça:** `.claude/hooks/pre-tool-use/enforce-ui-cycle.js`

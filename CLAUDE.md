# Dojô Família Scholze — Guia do Projeto

> Cliente 0 da agência KOD.AI. Sistema IA-first pra gestão de academia de Judô + Jiu-Jitsu.
> Caso de validação (não cobra do pai) → expansão pra próximos professores como sistema vendável.

## Ordem de leitura (economizar contexto)

1. **Este arquivo** — stack, regras, visão
2. **`README.md`** — como rodar dev local em <5min
3. **`contextos/mapeamento/ARQUITETURA-MESTRE.md`** — fonte canônica de decisões (DRAFT v1.1+)
4. **`docs/decisoes/`** — specs de cada Sprint/Fase
5. **Perspectivas** (`contextos/mapeamento/perspectiva-*.md`) — quando trabalhar com persona específica
6. **`contextos/bruto/`** — material original (NÃO usar como base sem promover)

## Stack (consolidada 2026-05-25 após refactor single-app unified)

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Single app** | Next.js 15 + App Router + TS + Tailwind v3 | SSR público (SEO) + CSR autenticado (`/dashboard`) + PWA — tudo 1 deploy |
| **PWA** | `@serwist/next` (Workbox) + manifest via Metadata API | Install prompt, offline, push (Sprint 4) |
| **Backend** | Supabase (Postgres + Auth + Realtime + Storage + Edge Functions) | Multi-tenant via RLS |
| **Auth** | Supabase Magic Link + Google OAuth (Sprint 1+) | Sem reinventar |
| **Multi-tenant** | RLS Supabase (`dojo_id` em toda tabela tenant-scoped) | Isolamento físico no banco + função `current_user_dojo_id()` SECURITY DEFINER |
| **Pagamentos BR** | Asaas (PIX + cartão + boleto + dunning) — Sprint 3 | Especialista BR |
| **i18n** | i18next + react-i18next (pt-BR + en) | Client-side, persistência localStorage |
| **Deploy** | Vercel Hobby (1 project: `dojofs`) → Pro quando faturar | URL atual: `https://dojofs-davi-scholzes-projects.vercel.app` |
| **CI** | GitHub Actions (build + typecheck matrix) | Verde em PR/push master |

**~~React Native + Expo~~** — REJEITADO 2026-05-25. PWA universal cobre mobile + desktop sem Apple Dev account ($99/ano) + sem store reviews. Bootstrap radical.

**~~2 apps separados (apps/site + apps/app)~~** — REJEITADO 2026-05-25. Single-app Next.js cobre público + autenticado. Memória crítica: `feedback_default_single_app_unified`.

## Estrutura monorepo

```
dojo-familia-scholze/
├── apps/
│   └── site/                       ← Next.js 15 single-app (público + dashboard + PWA)
│       ├── app/
│       │   ├── page.tsx            ← / (landing pública SSR)
│       │   ├── dashboard/          ← área autenticada (Sprint 1+ adiciona middleware)
│       │   │   ├── layout.tsx      ← I18nProvider + LanguageSwitch + InstallPrompt
│       │   │   └── page.tsx        ← placeholder "Bem-vindo Sensei"
│       │   ├── sw.ts               ← service worker serwist
│       │   ├── manifest.ts         ← PWA manifest (Next.js Metadata API)
│       │   ├── layout.tsx          ← root: html + body + register-sw
│       │   └── globals.css
│       ├── components/             ← InstallPrompt, LanguageSwitch
│       ├── lib/i18n/               ← i18next config + provider + locales
│       └── public/                 ← logos + pwa-* + og-image
├── packages/
│   ├── ui/                         ← @dojo-fs/ui (shadcn + tokens dojo + constants)
│   ├── lib/                        ← @dojo-fs/lib (zod schemas + helpers BR)
│   └── supabase/                   ← @dojo-fs/supabase (factory client + types tipados)
├── supabase/
│   ├── migrations/                 ← 0001_init_multi_tenant.sql + rollback adjacente
│   ├── seed.sql
│   └── config.toml
├── scripts/
│   ├── db-query.mjs                ← runQuery genérico Management API
│   ├── validate-migration.mjs      ← checklist automatizado
│   ├── setup-vercel.mjs            ← idempotente, cria project + envs + deploy
│   └── wait-deploys.mjs            ← polling deploys
├── _negocio/                       ← identidade (logos pai), assets
├── contextos/                      ← mapeamento, brutos, decisões
├── docs/decisoes/                  ← specs canônicas KOD.AI SDD
├── .env.example                    ← template (commitado)
├── .env.local                      ← valores reais (gitignored, TUDO dentro do repo)
├── .gitignore                      ← blindado (múltiplas camadas anti-leak secrets)
├── package.json                    ← workspaces apps/* + packages/*
└── CLAUDE.md                       ← este arquivo
```

## Comandos comuns

```bash
npm install            # raiz — instala todas workspaces
npm run dev            # alias pra dev:site (Next.js localhost:3000)
npm run build          # build all workspaces
npm run typecheck      # tsc --noEmit todas workspaces
npm run lint           # next lint
```

## Regras inegociáveis (consolidadas de memórias críticas KOD.AI)

1. **SDD obrigatório** — `/spec` → aprovação → `/break` → `/plan` → `/execute` → `/review` → `/complete` (Evidence Bloc)
2. **TypeScript estrito** — sem `any`, sem atalhos de tipagem
3. **Passo a passo** — nunca avançar sem OK explícito do Davi
4. **Zero credenciais no código** — `.env.local` (gitignored). NUNCA `Documents/Davi/secrets/` ou pastas externas (memória `feedback_tudo_dentro_do_repo_do_sistema`)
5. **Default single-app** — não criar `apps/admin/`, `apps/api/`, `apps/marketing/` separados (memória `feedback_default_single_app_unified`)
6. **Mobile-first** — PWA é o canal principal
7. **Segurança em pagamentos** — nunca logar dados de cartão, validar webhooks Asaas
8. **DDL exige aprovação humana** — qualquer migration SQL precisa OK textual antes de `supabase db push` (regra `.claude/rules/sql-migrations.md`)
9. **Pedir permissão pra ações externas** — email, SMS, push, webhook, cobrança, post rede social (memória `feedback_pedir_permissao_acoes_externas`)
10. **Executar via API, não delegar manual** — Supabase CLI/Management API, Vercel API, GitHub CLI (memória `feedback_executar_nao_delegar_setup`)

## Padrão de commits

```
feat(escopo): adiciona X
fix(escopo): corrige Y
refactor(escopo): reorganiza Z
docs(escopo): atualiza W
chore(escopo): ajuste V
ci(escopo): pipeline U
```

Em português, imperativo. Mensagens podem ser multi-linha com bullets pra contexto.

## Variáveis de ambiente

Ver `.env.example`. Todas dentro do repo, em `.env.local` (gitignored).

| Var | Pra que | Onde usar |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL pública projeto | Browser (App Router) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key (RLS-respeitante) | Browser |
| `VITE_*` | (reservado — não usado após refactor unified) | _(deprecated)_ |
| `SUPABASE_ACCESS_TOKEN` | PAT Management API | Tooling local + CI |
| `SUPABASE_SERVICE_ROLE_KEY` | Bypass RLS server-side | Edge Functions (Sprint 1+) |
| `VERCEL_TOKEN` | Vercel Management API | Tooling local |

## Repositório + URLs

- **GitHub:** https://github.com/Davi-Scholze/dojo-familia-scholze (private)
- **Vercel project:** `dojofs` (Hobby tier)
- **Production URL:** https://dojofs-davi-scholzes-projects.vercel.app
- **Branch principal:** `master` (auto-deploy ativo)
- **Supabase project:** `dojo-familia-scholze` (ref `mubcbbrwoeblvqaiebou`) em sa-east-1

## Memórias relacionadas (auto-load via MEMORY.md)

- `feedback_modelo_negocio_kodai_consolidado` — agência + framework, instâncias dedicadas
- `feedback_realidade_financeira_davi` — bootstrap radical, zero capital até primeiro cliente
- `feedback_tudo_dentro_do_repo_do_sistema` — secrets no `.env.local` do repo
- `feedback_default_single_app_unified` — 1 Next.js cobre tudo
- `feedback_pedir_permissao_acoes_externas` — antes de email/SMS/cobrança/post
- `feedback_executar_nao_delegar_setup` — CLI/API/PAT, não copy/paste manual
- `project_dojo` — estado do projeto

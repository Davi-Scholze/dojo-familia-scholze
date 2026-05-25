# Dojô Família Scholze

Sistema de gestão de academia de Judô + Jiu-Jitsu — **caso 0 da agência KOD.AI**.

**Stack:** Next.js 15 + Supabase + Tailwind v3 + i18n (pt-BR/en) + PWA.
**Status:** Fase 0 (setup) concluída em 2026-05-25 — Sprint 1 (auth + cadastro) a seguir.
**Production URL:** https://dojofs-davi-scholzes-projects.vercel.app

---

## Como rodar dev local em <5 min

### Pré-requisitos

- Node ≥ 20 (`node -v`)
- npm ≥ 10 (`npm -v`)
- Repo clonado: `git clone https://github.com/Davi-Scholze/dojo-familia-scholze.git`
- `.env.local` na raiz com credenciais Supabase reais (copiar de `.env.example` e preencher)

### Instalação

```bash
cd dojo-familia-scholze
npm install              # ~30s, instala 3 workspaces (apps/site + packages/*)
```

### Dev server

```bash
npm run dev              # Next.js em http://localhost:3000
```

Abra no browser:
- `http://localhost:3000` — landing pública (SSR + SEO)
- `http://localhost:3000/dashboard` — área autenticada placeholder (Sprint 1 adiciona auth real)

### Build de produção

```bash
npm run build            # build apps/site (Next.js compile + Serwist SW)
npm run typecheck        # tsc --noEmit em todas workspaces
```

---

## Arquitetura em 1 minuto

```
Next.js 15 (App Router) — 1 deploy, 1 URL
├── Rotas públicas (SSR pra SEO)        ← /, /loja (Fase 2), /sobre, etc
├── Rotas autenticadas (CSR)            ← /dashboard, /alunos, /turmas (Sprint 1+)
├── PWA (@serwist/next)                 ← install prompt, offline, manifest
├── i18n (i18next)                      ← pt-BR default + en, toggle UI
└── Supabase (backend)                  ← Auth Magic Link + Postgres RLS multi-tenant
```

Multi-tenancy via RLS Postgres: cada profile pertence a 1 dojo (`dojo_id`), policies isolam queries automaticamente.

Schema atual (Fase 0):
- `dojos` (id, nome, slug, created_at)
- `profiles` (id FK auth.users, dojo_id FK dojos, role, full_name)
- enum `user_role` (professor / aluno / responsavel / admin)
- function `current_user_dojo_id()` SECURITY DEFINER (evita recursão RLS)
- 6 policies RLS (3 dojos + 3 profiles)

---

## Estrutura de pastas

Ver `CLAUDE.md` seção "Estrutura monorepo" pra árvore completa.

---

## Próximos passos (após Fase 0)

- **Sprint 1** — auth Magic Link + cadastro dojo + cadastro alunos + gestão turmas
- **Sprint 2** — presença + graduação + certificado PDF
- **Sprint 3** — dashboard professor + alertas + financeiro + Asaas
- **Sprint 4** — LGPD + responsável + menor + cadernos + admin panel

Ver `contextos/mapeamento/ARQUITETURA-MESTRE.md` seção 4 pra inventário completo de 57 features.

---

## Para devs que entram no projeto

Leia nesta ordem:
1. **`CLAUDE.md`** (este projeto) — regras + stack
2. **`../../../KODAI/AGENTS.md`** (framework) — 12 princípios não-negociáveis KOD.AI
3. **`contextos/mapeamento/ARQUITETURA-MESTRE.md`** — fonte canônica de decisões
4. **`docs/decisoes/2026-05-25_fase-0-setup-dojo-scaffold.md`** — spec inicial completa (12 tasks + Evidence Bloc)

---

## Repositório

- **GitHub:** [Davi-Scholze/dojo-familia-scholze](https://github.com/Davi-Scholze/dojo-familia-scholze) (private)
- **Supabase:** `dojo-familia-scholze` (sa-east-1 / São Paulo)
- **Vercel:** project `dojofs` (auto-deploy push em `master`, preview por PR)

## Licença

Privado. Caso 0 da agência KOD.AI.

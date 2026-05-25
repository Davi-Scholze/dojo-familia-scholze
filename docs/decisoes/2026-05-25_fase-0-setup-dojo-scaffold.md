---
tipo: spec
data: 2026-05-25
status: aberto
escopo: dojo-familia-scholze (case 0 KOD.AI agência)
nivel_operacional: L1
related:
  - ../../contextos/mapeamento/ARQUITETURA-MESTRE.md (fonte canônica DRAFT v1.0)
  - ../../_negocio/identidade/logos-e-marca/oficial/INDEX.md (assets pai)
  - ../../../../KODAI/docs/STRATEGIC-NORTH.md (v1.4 — bootstrap radical + 3 níveis)
  - ../../../../KODAI/2-PACKS/packs/infra/supabase-config-maxima/ (DRAFT)
  - ../../../../KODAI/2-PACKS/packs/dev/ui-responsivo-smb/ (DRAFT)
  - ../../../../KODAI/3-CONTEXTOS-DOMINIO/gestao-academia-esportiva-br/ (DRAFT v0.1)
lineage:
  origin: downstream-pilot
  derived_from:
    - source: "ARQUITETURA-MESTRE.md seção 11 (Próximos Passos Concretos — Fase 0 setup)"
      type: design-doc-aprovado-conceitualmente
    - source: "Davi 2026-05-25 verbatim — 'queria continuar a criar o sistema do dojo familia scholze'"
      type: feedback-stakeholder
  validado_por: ["Davi 2026-05-25 (escolha de caminho via AskUserQuestion)"]
---

# Spec — Fase 0: Setup do Monorepo Dojô Família Scholze

## Problema

Hoje o repo `dojo-familia-scholze/` tem **zero código** — apenas docs (CLAUDE.md desatualizado citando React Native + Expo + 10 commits de mapeamento). O documento mestre `ARQUITETURA-MESTRE.md` (DRAFT v1.0, 506 linhas, aprovado conceitualmente em 2026-05-25) decidiu PWA universal (Vite + Next.js + Supabase + Asaas) e descreve a Fase 0 na seção 11 como pré-condição pra Sprint 1.

**Evidência concreta da necessidade:**
- `ls Repositorios/dojo-familia-scholze/` retorna apenas `CLAUDE.md _negocio contextos logs`
- Nenhum `package.json`, nenhum `apps/`, nenhum `packages/`, nenhuma `migration` Supabase
- `CLAUDE.md` do dojo (linhas 57-67) ainda declara stack React Native + Expo, conflitando com decisão pós-2026-05-25
- 5 decisões abertas na seção 7 do ARQUITETURA-MESTRE (mas só "Caderno do Sensei" naming bloqueia código — já resolvido)
- Davi está em bootstrap radical (memória crítica `feedback_realidade_financeira_davi.md`): cada hora livre da CLT (08-16) precisa render — sem fundação verificada, Sprint 1 vai misturar "setup infra" com "feature auth" e violar regra-base 7 (commit a cada passo).

**Dor real:** sem Fase 0 isolada, qualquer próxima sessão começa improvisando "vou criar package.json…" e perde 1-2h em decisões já tomadas no doc mestre. Pior: rastreabilidade do progresso fica ruim porque commits misturam "scaffold inicial" + "primeira feature".

## Hipótese central

**Se** entregarmos a Fase 0 como passo isolado com Evidence Bloc (monorepo buildando + Supabase project + identidade visual aplicada + deploy preview Vercel verde + CI rodando), **então** a Sprint 1 começa com tempo 100% gasto em feature (auth multi-perfil + cadastro dojo + turmas + alunos) em vez de mistura infra+feature, **e** Davi consegue cumprir a meta MVP de 4 sprints × 4 semanas dentro das horas livres da CLT.

**Verificável por:** comparar commits do Sprint 1 — se ≥80% das mensagens de commit no Sprint 1 forem `feat(auth)`, `feat(alunos)`, `feat(dojos)` (não `chore(setup)`, `build(deps)`, `infra(supabase)`), a hipótese se confirma.

## Escopo

### Dentro (Fase 0)

**Estrutura monorepo:**
- `package.json` raiz com npm workspaces (`apps/*`, `packages/*`)
- `apps/site/` — Next.js 15 + App Router + TypeScript (landing minimal renderizando logo do pai)
- `apps/app/` — Vite 6 + React 19 + TypeScript + React Router + vite-plugin-pwa (home minimal renderizando logo do pai)
- `packages/ui/` — shadcn/ui base + Tailwind v3 config compartilhada + design tokens (`theme.ts`) com paleta OKLCH derivada dos hex confirmados (`#000000`, `#D32F2F`, `#FFFFFF`, `#3E3E3E`)
- `packages/lib/` — Zod schemas placeholder (`AlunoSchema`, `DojoSchema` esqueleto) + helpers (date, currency BR, formatters)
- `packages/supabase/` — client config + types generated placeholder + queries/ vazio

**Backend Supabase:**
- Criar 1 project Supabase Free tier (region São Paulo)
- Habilitar Auth com Magic Link + Google OAuth providers
- Schema inicial mínimo: tabelas `dojos`, `profiles` (vazias, só estrutura) + RLS habilitado + policies básicas tenant_isolation
- 1 migration inicial `0001_init_multi_tenant.sql` em `supabase/migrations/`
- Seed vazio (`supabase/seed.sql`)
- `.env.example` com placeholders (URL + anon key) — `.env.local` NÃO commitado

**PWA setup completo (apps/app):**
- `manifest.json` (name "Dojô Família Scholze", short_name "Dojô FS", theme color `#000000`, icons placeholder geradas a partir do logo redondo branco)
- Service Worker via Workbox (vite-plugin-pwa)
- Install prompt component placeholder
- Ícones todas resoluções (192, 256, 384, 512) gerados a partir do logo oficial

**i18n setup:**
- `i18next` + `react-i18next` configurado em apps/app + apps/site
- 2 locales: `pt-BR` (default) + `en`
- Strings placeholder mínimas (só "Bem-vindo Sensei", "Dojô Família Scholze", "Ceder para Vencer")

**Identidade visual aplicada:**
- Logos oficiais copiados pra `apps/site/public/` e `apps/app/public/`
- Tokens Tailwind compartilhados refletindo paleta confirmada (preto puro, vermelho-sangue, branco, cinza-grafite)
- Header de ambos apps renderizando logo retangular preto + slogan "CEDER PARA VENCER"

**Deploy + CI:**
- 2 projetos Vercel conectados ao repo (preview por PR + production em main)
- `apps/site` em `dojofs-site-preview.vercel.app` (até decidir domínio)
- `apps/app` em `dojofs-app-preview.vercel.app`
- GitHub Action `.github/workflows/ci.yml`: build + typecheck em PR (matrix: site + app)

**Docs:**
- `.gitignore` na raiz (Node + Vite + Next.js + Supabase + IDE + OS)
- `README.md` na raiz com: o que é, como rodar dev local em <5 min, link pro CLAUDE.md
- `CLAUDE.md` do dojo **atualizado** refletindo stack PWA (não RN+Expo)
- `ARQUITETURA-MESTRE.md` marcado: Fase 0 ✅ na seção 11

### Fora (NÃO entra na Fase 0 — fica pra Sprints 1+)

- **Auth UI** (componentes de login Magic Link, OAuth Google, cadastro) → Sprint 1
- **Schema completo de banco** (alunos, turmas, presença, graduação, mensalidade, etc) → Sprint 1-4 conforme tabela MVP
- **Conteúdo do site público** (landing real com seções, blog, depoimentos) → Sprint 4
- **Loja B2C** → Fase 2
- **Asaas integration** → Sprint 3
- **WhatsApp Evolution API** → Sprint 4+
- **Face scan CompreFace** → Fase 3
- **Certificado PDF generator** → Sprint 2
- **Caderno do Guerreiro/Sensei** UIs → Sprint 4
- **Domínio customizado** (`dojofamiliascholze.com.br`) — adiado até 1ª venda do Davi (bootstrap)
- **Vercel Pro upgrade** — adiado até antes da 1ª venda (Hobby cobre Fase 0 + Sprint 1)
- **Supabase Pro upgrade** — só quando DB >400MB ou storage >800MB (rule do MEMORY.md)
- **Apple Dev account** — descartado definitivamente (PWA não publica em stores)
- **i18n strings completas** — só skeleton + 3 strings placeholder
- **Asset SVG vetorial dos logos** — fica em pendência do pai (INDEX.md linha 83), Fase 0 usa PNGs existentes
- **CNPJ MEI KOD.AI** — sugerido na seção 7 do doc mestre mas não bloqueia Fase 0 (vira bloqueio só no Sprint 3 Asaas)

## Contratos (handoff)

### Input (handoff_in)

| Item | Estado |
|---|---|
| `ARQUITETURA-MESTRE.md` v1.0 DRAFT aprovado conceitualmente | ✓ presente em `contextos/mapeamento/` |
| Assets oficiais do pai | ✓ 4 arquivos em `_negocio/identidade/logos-e-marca/oficial/` (logo redondo branco, retangular preto, banner YT, certificado template) |
| Paleta confirmada visualmente | ✓ INDEX.md linha 38-42 (hex aproximados — refinar com colorpicker no execute) |
| Slogan + kanji + modalidades | ✓ "CEDER PARA VENCER" + 柔道/柔術 + Judô/Jiu-Jitsu |
| Conta GitHub `Davi-Scholze` | ✓ autenticada via `gh auth login` (sessão 2026-05-25 C1/C2 resolvidos) |
| Conta Vercel + Supabase | A criar/confirmar no Davi durante /execute |
| Node.js 20+ + npm 10+ | A confirmar via `node -v && npm -v` no `/execute` |
| Repo dojo inicializado + remote configurado | ✓ `git remote -v` → `github.com/Davi-Scholze/dojo-familia-scholze` |

### Output (handoff_out)

| Artefato | Forma de verificação |
|---|---|
| Estrutura monorepo conforme ARQUITETURA-MESTRE §3.1 | `tree -L 3 -I node_modules` mostra apps/site, apps/app, packages/{ui,lib,supabase} |
| Build verde local ambos apps | `npm run build` na raiz finaliza com exit 0 |
| TypeCheck verde ambos apps | `npm run typecheck` exit 0 |
| Lint verde ambos apps | `npm run lint` exit 0 (ESLint config compartilhada via packages/ui ou raiz) |
| 2 URLs Vercel preview ativas | curl 200 OK em ambas URLs |
| Supabase project criado + Magic Link enviável | screenshot do dashboard Supabase + teste manual envio email |
| RLS habilitado em `dojos` + `profiles` | `SELECT * FROM pg_policies WHERE schemaname='public'` retorna ≥2 policies |
| PWA manifest válido | Lighthouse PWA score ≥80 em apps/app |
| Identidade visual visível | screenshot home de ambos apps mostrando logo retangular preto + paleta |
| CI rodando em PR | `.github/workflows/ci.yml` existe + 1 PR de teste com check verde |
| CLAUDE.md do dojo atualizado | grep -L "React Native" CLAUDE.md retorna o arquivo (não match) |
| ARQUITETURA-MESTRE seção 11 atualizado | linha 502 muda de ⏳ pra ✅ |
| Evidence Bloc na PR de fechamento | comando rodado + output literal + critério + resultado conforme regra-base 11 |

### Quality Gates

```yaml
quality_gates:
  - "git status retorna clean após commits + push"
  - "Todos os comandos de output_verification rodam sem erro humano"
  - "Lighthouse PWA score apps/app ≥80 (mobile + desktop)"
  - "≥5 commits atômicos seguindo regra-base 7 (1 step da skill /execute = 1 commit)"
  - "Conventional Commits em PT-BR (tipo(escopo): descrição)"
  - "Nenhum .env, .env.local, credencial, ou anon key commitada (check via grep -r 'SUPABASE_' . | grep -v .env.example)"
  - ".gitignore cobre node_modules, dist, .next, .turbo, .env*, .vercel, coverage"
  - "Evidence Bloc presente na PR de fechamento (regra-base 11)"
```

## Riscos + mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Conflito de versões React 19 / Next 15 / Vite 6 entre workspaces | M | M | Pin de versões via `packageManager` no package.json raiz + mesma major React em todos workspaces; testar `npm install` antes de qualquer feature |
| Tailwind config compartilhada não propaga entre apps | M | L | `packages/ui/tailwind.config.shared.ts` exporta config base; cada app faz `extend` em config local; validar via screenshot home dos 2 apps após scaffold |
| Hex da paleta confirmada (INDEX.md aproximados) não bate com logo real | L | M | Usar colorpicker no PNG oficial antes de configurar tokens; Davi valida no preview Vercel |
| Supabase Free tier insuficiente já no MVP | L | M | Trigger Pro documentado em ARQUITETURA-MESTRE §8 (>400MB DB ou >800MB storage); Free cobre Fase 0 + Sprint 1-2 sem dúvida |
| Vercel Hobby não suporta features futuras (Edge cron) | L | L | Hobby cobre Fase 0 + Sprint 1-3; trigger Pro antes Sprint 3 Asaas |
| PWA iOS Safari quirks (push notification 16.4+) | M | L | Documentado em ARQUITETURA-MESTRE §3.4 + §9.6 — não bloqueia Fase 0 (push só na Sprint 4) |
| Davi trava em naming de pacote (`@dojo/ui`, `@dojofs/ui`, sem prefix?) | M | L | Default `@dojo-fs/ui`, `@dojo-fs/lib`, `@dojo-fs/supabase` no monorepo; reverter trivial; decidir no /plan |
| GitHub Action falha por falta de secrets (Supabase URL/key em build) | M | M | CI Fase 0 só faz build + typecheck (não precisa secrets); secrets Vercel runtime entram quando Sprint 1 começa |
| Davi sem Node 20+ instalado localmente | L | H | Primeiro passo do /execute = verificar `node -v` + orientar nvm install se necessário |
| Hook KOD.AI `pre-commit-guard.js` bloqueia commit por engano | L | M | Hook intercepta `> .gitignore` e SQL DDL — esta spec cria .gitignore via `Write` (não redirect) e tem 1 migration SQL com aprovação humana (DDL exige aprovação — regra `.claude/rules/sql-migrations.md`) |
| Conflict entre KOD.AI `/spec` + comando `/spec` do user-global pasta-mãe | L | L | Já resolvido em 2026-05-25 sessão massiva (6 commands SDD delegate criados); skill rodou normalmente |

## Alternativas consideradas

| Alternativa | Por quê descartei |
|---|---|
| **3 repos separados (site / app / shared)** sem monorepo | Sincronizar types + design tokens vira caos manual; PR cruzado em 2-3 repos por feature; rejeitado em ARQUITETURA-MESTRE §3.1. Single repo + workspaces simplifica DX do Davi solo. |
| **Turborepo em vez de npm workspaces** | Overhead pra MVP solo dev; npm workspaces resolvem caching local nativamente em Node 20+; migrar pra Turbo é trivial quando build time virar gargalo (depois de Sprint 2+) |
| **Nx em vez de npm workspaces** | Lock-in maior, aprendizado pesado, mesma desvantagem do Turbo descartado, e Nx força estrutura opinada que conflita com layout já aprovado no ARQUITETURA-MESTRE |
| **Next.js single-app (sem apps/app Vite separado)** | Bundles maiores em rota autenticada (PWA + SSR + RSC); PWA setup mais complexo via Next.js plugin que via vite-plugin-pwa; perde flexibilidade SPA pura na área autenticada; e duplica risco de regressão SEO no site marketing por mudança no app |
| **Vite SSR também pro site (sem Next.js)** | Vite SSR menos maduro 2026 que App Router pra landing + blog + SEO + Open Graph; Vercel é Next.js-native; reverte vantagem zero-config |
| **Remix em vez de Next.js pro site** | Next.js + App Router está mais battle-tested 2026, ecossistema maior, Vercel-native sem ajustes. Remix tem vantagens mas não pra landing simples + loja futura |
| **React Native + Expo (decisão original CLAUDE.md dojo)** | Reverted formalmente em 2026-05-25 — PWA universal cobre mobile + desktop sem Apple Dev ($99/ano) + sem review delays + atualiza silenciosamente. Bootstrap radical do Davi favorece PWA. RN só faria sentido se features nativas críticas (Bluetooth, Notificações iOS sem PWA install) aparecessem — não é caso. |
| **Iniciar direto pela Sprint 1 (auth + cadastro) sem Fase 0 formal** | Mistura "setup infra" com "feature" no mesmo PR, viola regra-base 7 (commit a cada passo), dificulta debug se algo der errado no scaffold, e fere SDD: spec por feature implica fundação separada |
| **Fase 0 sem Supabase project criado (só local)** | Cria gap entre dev local e deploy real; primeiro deploy Sprint 1 vai descobrir setup faltando; melhor descobrir no escopo isolado da Fase 0 |
| **Pular CI GitHub Actions na Fase 0** | Sem CI desde início, Sprint 1 quebra build silenciosamente e Davi só descobre no deploy. 5min de yaml previne horas de debug. |
| **Domínio customizado já na Fase 0** | Viola bootstrap radical — R$ 40-200/ano sem 1ª venda. Subdomain Vercel atende perfeitamente até primeiro fechamento. Reverso trivial. |

## Critérios de aceitação

Mensuráveis e verificáveis por comando ou screenshot:

- [ ] `ls Repositorios/dojo-familia-scholze/` retorna ≥ `apps/ packages/ supabase/ docs/ package.json .gitignore README.md CLAUDE.md _negocio/ contextos/`
- [ ] `node -v` ≥ v20.0.0 confirmado
- [ ] `npm install` na raiz finaliza com exit 0 e gera `node_modules/` (gitignored)
- [ ] `npm run dev --workspace=apps/site` abre Next.js em `http://localhost:3000` renderizando logo retangular preto + slogan
- [ ] `npm run dev --workspace=apps/app` abre Vite em `http://localhost:5173` renderizando logo retangular preto + slogan + "Bem-vindo Sensei" (placeholder, sem auth)
- [ ] `npm run build` na raiz finaliza com exit 0 (ambos workspaces)
- [ ] `npm run typecheck` na raiz finaliza com exit 0
- [ ] `npm run lint` na raiz finaliza com exit 0
- [ ] Lighthouse PWA score em `apps/app` build ≥ 80 (mobile + desktop)
- [ ] Lighthouse SEO score em `apps/site` build ≥ 90 (mobile + desktop)
- [ ] 1 PR aberto + CI verde + 2 URLs Vercel preview acessíveis retornando 200 OK
- [ ] Supabase project criado, region São Paulo, `URL + anon key` em `.env.local` (NÃO commitado — checar via `git ls-files .env.local` retorna vazio)
- [ ] Supabase Auth Magic Link configurado (teste manual: enviar email pra `scholzecr@gmail.com` chega na inbox em <60s)
- [ ] Supabase tabelas `dojos` + `profiles` criadas via migration `0001_init_multi_tenant.sql` + RLS habilitado + ≥2 policies tenant_isolation
- [ ] `CLAUDE.md` do dojo atualizado — `grep "React Native" Repositorios/dojo-familia-scholze/CLAUDE.md` retorna vazio
- [ ] `ARQUITETURA-MESTRE.md` seção 11 linha 502: `✅ Documento mestre criado` + `✅ Scaffold monorepo (Fase 0)` marcados
- [ ] Git history com ≥ 5 commits atômicos seguindo Conventional Commits PT-BR (ex: `chore(monorepo): inicializa workspaces`, `feat(packages/ui): tokens identidade visual`, `feat(supabase): schema inicial multi-tenant`, `feat(apps/app): PWA setup vite-plugin-pwa`, `feat(apps/site): landing minimal Next.js`)
- [ ] Evidence Bloc da Fase 0 escrito ao final do `/complete` com timestamp + comando rodado + output literal + critério + resultado (regra-base 11 KOD.AI)

## Próximo passo

→ `/break` decomporá esta spec em tasks atômicas (estimativa: 8-12 tasks, cada uma 1 commit ideal, ~6-10h dev solo total nas horas livres do Davi).

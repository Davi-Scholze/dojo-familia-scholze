# ARQUITETURA MESTRE — Dojô Família Scholze

> **Documento mestre canônico do projeto.** Substitui `mvp-escopo.md` + `arquitetura-tecnica.md` (que ficam como histórico).
> Criado: 2026-05-25 sessão pós-faxina + agentes-ia + Liam.
> Status: **DRAFT v1.0** — aprovado conceitualmente pelo Davi, sujeito a refinamento em /spec individuais.
> Fontes: 5 perspectivas + 5 brutos + 3 concorrentes upstream + contexto-domínio `gestao-academia-esportiva-br` + packs/skills KOD.AI aplicáveis.

---

## 0. TL;DR (300 palavras)

**Não é um app.** É um **ecossistema PWA universal** (mobile + desktop, online + offline) que serve **5 personas** (professor, aluno adulto, responsável, aluno menor via responsável, operador plataforma), entrega **57 features mapeadas** em 4 fases, usa **arquitetura monorepo** com 2 apps (site SSR + app PWA autenticado) compartilhando packages (ui, lib, supabase), e funciona como **template pra futuros clientes** (academia X, academia Y → fork rápido → eventualmente multi-tenant único).

**Stack:** React 19 + TypeScript + Tailwind + shadcn/ui + Vite (app) + Next.js 15 (site) + Supabase (backend) + Asaas (pagamentos) + Vercel (deploy) + Service Worker + IndexedDB/Dexie (offline) + getUserMedia + CompreFace self-hosted (face scan) + Evolution API self-hosted (WhatsApp).

**Custo MVP:** R$ 0/mês até primeiro cliente pagante (Free tiers Vercel + Supabase + Asaas).
**Pricing:** R$ 97 / R$ 197 / R$ 397 (3 tiers BR) + trial 30d sem cartão + plano anual com 2 meses grátis.
**Break-even:** ~4-5 professores no Básico cobrem infra.

**KOD.AI aplicável:** 11 packs (8 prontos, 3 STUB) + 15 skills + contexto-domínio `gestao-academia-esportiva-br` (100% match) + 7 concorrentes já mapeados em `competitive-intelligence`.

**Roadmap:** MVP (4 fases × ~4 semanas cada) → validação Cristiano 30d → onboarding rede de 10 profs → tráfego pago → internacional → marketplace B2B → multi-tenant SaaS único.

**Próximo passo concreto:** decidir 8 itens críticos abertos + scaffold do monorepo + Sprint 1 Dia 1 (login + tela bem-vindo).

---

## 1. VISÃO — Ecossistema, não App

### 1.1 Componentes do ecossistema

| # | Componente | Stakeholder | Plataforma | SEO? | Auth? | Offline? |
|---|---|---|---|---|---|---|
| 1 | **Site público** | Visitante / lead | Web (mobile+desktop) | **SIM** | Não | Não |
| 2 | **Loja B2C** | Comprador kimono/faixa | Web (mobile-first) | **SIM** | Opcional | Não |
| 3 | **App professor** | Sensei (gestor academia) | PWA (mobile primário + desktop admin) | Não | **SIM** | **SIM** |
| 4 | **App aluno adulto** | Praticante 18+ | PWA (mobile + desktop) | Não | **SIM** | **SIM** |
| 5 | **App responsável** | Pai/mãe/tutor | PWA (mobile + desktop) | Não | **SIM** | **SIM** |
| 6 | **Dashboard plataforma** | Davi + Cristiano (operadores) | Web desktop | Não | **SIM (admin)** | Não |
| 7 | **Carrosséis Instagram** | Marketing | Pipeline KOD.AI (`/publicar-tema`) | Instagram | n/a | n/a |
| 8 | **Ads Google/Meta** | Marketing | Plataforma externa (pack `marketing/google-ads-campanhas` futuro) | n/a | n/a | n/a |

### 1.2 Espelho pra futuros clientes

Cada cliente novo = **fork do monorepo** com:
- `.env` diferente (Supabase project novo)
- `packages/ui/theme.ts` ajustado (paleta do cliente)
- `apps/site/content/` ajustado (textos do cliente)
- Deploy: `cliente-x.com.br` + `app.cliente-x.com.br`

**Evolução:** Fase 1 (instâncias separadas, 1-5 clientes) → Fase 2 (consolidar em multi-tenant SaaS único com `tenant_id` Supabase RLS — arquitetura já preparada desde MVP).

---

## 2. STAKEHOLDERS — 5 personas

### 2.1 Tabela consolidada

| Persona | Quem é | Top jornadas |
|---|---|---|
| **Professor** | Dono academia 20-300 alunos | Criar dojo → Cadastrar alunos → Gerir turmas → Controlar presença → Acompanhar graduações → Monitorar financeiro → Alertas inteligentes |
| **Aluno adulto** | Praticante 18+ | Descobrir academia → Matricular + pagar → Confirmar presença → Acessar script aula → Registrar Caderno do Guerreiro → Ver linha do tempo → Receber certificado |
| **Responsável** | Pai/mãe/tutor de aluno 6-17 | Cadastrar filho + dados médicos → Consentimento LGPD → Acompanhar presença → Ver progressão → Pagar mensalidade → Receber notificações |
| **Aluno menor** | Criança 6-17 | (Não tem login — vivencia via responsável) |
| **Operador plataforma** | Davi + Cristiano | Métricas globais → Gerenciar contas → Intervir suporte → Configurar features por plano → Beta testing |

### 2.2 Detalhamento em arquivos perspectivas

Cada persona tem doc dedicado em `contextos/mapeamento/perspectiva-*.md` (manter intactos como fonte de detalhe — este doc consolida).

---

## 3. ARQUITETURA TÉCNICA

### 3.1 Estrutura monorepo

```
dojo-familia-scholze/                  # monorepo (npm workspaces)
├── apps/
│   ├── site/                          # Next.js 15 SSR — landing + loja
│   │   ├── app/                       # App Router
│   │   ├── content/                   # MDX/JSON conteúdo editorial
│   │   └── public/                    # imagens estáticas, og-image
│   │
│   └── app/                           # Vite + React PWA — área autenticada
│       ├── src/
│       │   ├── routes/                # React Router (file-based via /routes/)
│       │   ├── features/              # módulos por feature (auth, alunos, etc)
│       │   └── lib/                   # local helpers
│       ├── public/
│       │   ├── manifest.json          # PWA manifest
│       │   └── icons/                 # PWA icons (todas resoluções)
│       └── vite.config.ts             # com vite-plugin-pwa
│
├── packages/
│   ├── ui/                            # componentes shadcn/ui compartilhados
│   │   ├── components/                # Button, Input, Modal, Card, etc
│   │   ├── theme.ts                   # design tokens (cores OKLCH do pai)
│   │   └── tailwind.config.shared.ts  # config Tailwind compartilhada
│   │
│   ├── lib/                           # types + validation
│   │   ├── schemas/                   # Zod schemas (Aluno, Dojo, Graduacao, etc)
│   │   ├── types/                     # TS types derivados
│   │   └── helpers/                   # date, currency, formatters
│   │
│   └── supabase/                      # client + types
│       ├── client.ts                  # client config
│       ├── types.ts                   # types gerados (supabase gen types)
│       └── queries/                   # query builders reutilizáveis
│
├── supabase/                          # backend (compartilhado)
│   ├── migrations/                    # SQL versionado
│   ├── functions/                     # Edge Functions (Deno)
│   └── seed/                          # dados de seed (planos, paletas, etc)
│
├── content/                           # output do pipeline KOD.AI
│   ├── carroseis/                     # PNG gerados via /gerar-carrossel
│   ├── ads/                           # creatives Google/Meta
│   └── posts/                         # legendas + temas via /publicar-tema
│
├── _negocio/                          # (já existe) identidade, contextos
├── contextos/                         # (já existe) mapeamento, decisões
└── docs/                              # (já existe) arquitetura, ADRs
```

### 3.2 Stack completo

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Frontend site** | Next.js 15 + App Router + TS | SSR pra SEO landing + loja, Open Graph rico |
| **Frontend app** | Vite 6 + React 19 + TS + React Router | SPA leve, PWA via vite-plugin-pwa, fluxo dev igual Decon |
| **Styling** | Tailwind v3 + shadcn/ui | Padrão pack `dev/ui-responsivo-smb` KOD.AI |
| **Backend** | Supabase (Postgres + Auth + Realtime + Storage + Edge Functions) | All-in-one, multi-tenant via RLS |
| **Banco** | PostgreSQL 15 (Supabase) | Relacional + extensions (pgvector futuro) |
| **Auth** | Supabase Auth (Magic Link + email/senha + OAuth Google) | Sem reinventar, multi-perfil via metadata |
| **Multi-tenant** | RLS Supabase (tenant_id = dojo_id em toda tabela tenant-scoped) | Isolamento físico no banco |
| **Storage** | Supabase Storage (fotos alunos, certificados PDF) | Integrado, RLS aplicável |
| **Pagamentos BR** | Asaas (PIX + cartão + boleto + dunning) | Especialista BR, sem cobrança setup |
| **Pagamentos B2B (Fase 3)** | Pagar.me Split (marketplace equipamentos) | Quando marketplace ativar |
| **Geração PDF** | Edge Function + pdf-lib ou html-to-pdf | Certificados de graduação server-side |
| **Animações** | Framer Motion 11 (web) | Sem Reanimated (era pra RN) |
| **Offline** | Service Worker (Workbox via vite-plugin-pwa) + IndexedDB via Dexie | Funciona PWA mobile + desktop |
| **Face scan** | `getUserMedia()` Web API + CompreFace self-hosted Docker via REST | Custo previsível, sem lock-in AWS |
| **WhatsApp** | Evolution API self-hosted (Docker) | Bootstrap-mode (sem Cloud API paga Meta) |
| **Push notifications** | Web Push API + Supabase Edge Function (cron) | iOS 16.4+ suporta, Android sempre |
| **i18n** | i18next (PT-BR + EN + ES no MVP, mais idiomas Fase 4) | Padrão consolidado web |
| **Deploy app** | Vercel Hobby → Pro antes 1ª venda | Fluxo igual Decon |
| **Deploy site** | Vercel Hobby → Pro antes 1ª venda | Mesmo |
| **CDN** | Vercel Edge Network (nativo) | Zero config |
| **DNS** | Cloudflare ou Registro.br | Domínio próprio |
| **Observability** | Supabase logs + Vercel Analytics (free) → Logfire/Sentry quando crescer | Bootstrap |
| **Monitoring uptime** | UptimeRobot free (50 monitors) | Free |

### 3.3 Multi-tenant via RLS

Toda tabela tenant-scoped (aluno, turma, mensalidade, graduação, etc) tem coluna `dojo_id`:

```sql
ALTER TABLE alunos ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON alunos
  FOR ALL USING (
    dojo_id = (auth.jwt()->>'dojo_id')::uuid
  );
```

Validado pelo contexto-domínio `gestao-academia-esportiva-br/operacao-white-label-multi-vertical.md`.

### 3.4 PWA — capabilities

| Feature | Mobile | Desktop |
|---|---|---|
| Instalação ("Adicionar à tela inicial") | ✓ (Android Chrome, iOS Safari, Edge Mobile) | ✓ (Chrome desktop, Edge, Brave) |
| Offline (Service Worker cache) | ✓ | ✓ |
| Storage local (IndexedDB) | ✓ (50MB+ disponível) | ✓ (várias GB) |
| Push notifications | ✓ Android sempre, iOS 16.4+ | ✓ |
| Camera (getUserMedia) | ✓ | ✓ |
| Share API | ✓ nativo | ✓ (Chrome 89+) |
| Background sync | ✓ Android Chrome | ✓ |
| File system access | Limitado | ✓ Chrome/Edge |
| Geolocation | ✓ | ✓ |

**Trade-offs vs nativo:**
- ❌ Não publica em App Store / Play Store (mas é vantagem pra Davi)
- ❌ Push iOS limitado (precisa user instalar PWA + autorizar)
- ✅ Atualizações silenciosas (sem review)
- ✅ Mesma codebase pra mobile + desktop
- ✅ SEO indexável (rotas públicas via Next.js, rotas autenticadas opt-out)
- ✅ Custo zero pra "distribuir"

---

## 4. INVENTÁRIO DE FEATURES (57 mapeadas)

### 4.1 MUST HAVE — MVP Sprint 1-4 (~16 semanas / 4 meses)

| # | Feature | Sprint | Pack KOD.AI |
|---|---|---|---|
| 1 | Auth multi-perfil (professor/aluno/responsável/admin) via Supabase | 1 | `infra/supabase-config-maxima` |
| 2 | Cadastro professor + criação do dojo | 1 | — |
| 3 | Cadastro de alunos (manual + link de convite) | 1 | — |
| 4 | Gestão de turmas e horários | 1 | — |
| 5 | Controle de presença (aluno confirma, professor corrige) | 2 | — |
| 6 | Graduação com cálculo automático (IBJJF/CBJ) | 2 | — |
| 7 | Cerimônia de graduação + histórico + foto | 2 | — |
| 8 | Certificado digital de graduação (PDF + link público imutável) | 2 | — |
| 9 | Painel professor (dashboard básico: alunos, próximas graduações, presença baixa, aniversários, receita, inadimplência) | 3 | `dados/analytics-saas-vertical` |
| 10 | Alertas inteligentes (graduação próxima, presença baixa, aluno sumido, inadimplência, aniversários) | 3 | — |
| 11 | Controle financeiro básico (recebido/a receber, histórico, alertas, previsão) | 3 | — |
| 12 | Integração Asaas (PIX, cartão recorrente, boleto) | 3 | `negocio-br/asaas-saas-recorrente` (a criar) |
| 13 | Trial 30 dias sem cartão | 3 | — |
| 14 | Termo LGPD obrigatório responsável (timestamp + audit log) | 4 | `negocio-br/lgpd` + `lgpd-seguranca-universal` |
| 15 | Cadastro responsável + dados médicos do menor | 4 | — |
| 16 | Múltiplos responsáveis por menor (até 2, pais separados) | 4 | — |
| 17 | Múltiplos filhos por responsável | 4 | — |
| 18 | Painel pessoal aluno (presença, graduação, frequência, observações) | 4 | — |
| 19 | Linha do tempo da jornada (marcos cronológicos) | 4 | — |
| 20 | Caderno do Guerreiro (diário pessoal por aula, texto livre + perguntas guiadas opcionais) | 4 | — |
| 21 | Caderno do Sensei (diário privado do professor) | 4 | — |
| 22 | Notificações push (presença, graduação, elogio, inadimplência) | 4 | — |
| 23 | Admin panel mínimo (lista profs + dashboard MRR + log auditoria) | 4 | — |
| 24 | PWA setup completo (manifest + service worker + ícones todas resoluções + install prompt) | 1 (transversal) | `dev/ui-responsivo-smb` |
| 25 | Offline básico via Service Worker + Dexie (CRUD básico funciona sem rede) | 1-4 (transversal) | — |
| 26 | i18n (PT-BR + EN no MVP) | 1 (transversal) | — |
| 27 | Identidade visual aplicada (paleta OKLCH + logos oficiais do pai) | 1 | — |
| 28 | Site público landing (Next.js SSR) com Open Graph | 4 | `marketing/seo` |

**MVP total: 28 features Must-Have, 16 semanas dev (~4 meses Davi solo nas horas livres).**

### 4.2 SHOULD HAVE — Fase 2 (~8 semanas)

| # | Feature | Pack KOD.AI |
|---|---|---|
| 29 | Comunicação interna (mensagens 1:1 + grupo por turma) | `integracoes/email-smtp-transacional` |
| 30 | Calendário integrado com scripts de aula | — |
| 31 | Script + plano de aula reutilizável | — |
| 32 | Registro por aluno (observações, elogios, marcos técnicos visíveis) | — |
| 33 | Relatório evolução aluno (compartilhável com pais via link) | — |
| 34 | Dunning + recuperação pagamento (Asaas retry + PIX fallback + notificações) | `negocio-br/asaas-saas-recorrente` |
| 35 | Avaliações físicas (toggle on/off por academia, peso/gordura/medidas + gráfico) | — |
| 36 | Alertas preditivos evasão (heurística: presença <60% + atraso pago + ausência não justificada) | — |
| 37 | Tracking métricas próprias (dashboard operador com churn/MRR/LTV/CAC) | `dados/analytics-saas-vertical` |
| 38 | Loja da academia (catálogo equipamentos no site + checkout integrado Asaas) | — |
| 39 | Perfil do aluno (foto, apelido, controle de privacidade) | — |
| 40 | Álbum de conquistas (card visual por graduação) | — |
| 41 | Barra progresso graduação em tempo real | — |
| 42 | Notificação aniversário entrada na academia | — |

### 4.3 COULD HAVE — Fase 3 (~6 semanas)

| # | Feature | Pack KOD.AI |
|---|---|---|
| 43 | CRM + funil vendas (entidade lead separada de aluno, pipeline interessado→demo→trial→matriculado, mensagens automáticas) | `comercial/crm-funil-vendas` (a criar) |
| 44 | Aula experimental com feedback | — |
| 45 | Exploração academias (busca por nome + geo) | — |
| 46 | Facescan via app (foto interna + share WhatsApp opcional via Web Share API) | `ia/face-recognition` + CompreFace self-hosted |
| 47 | Migração base alunos (CSV import) | — |
| 48 | Experiência gamificada (visual como jogo, progressão visual) | — |
| 49 | Marketplace B2B equipamento (kimono, faixa, luvas) | — |
| 50 | Plano anual com 2 meses grátis | — |
| 51 | Avaliações públicas professor/academia | — |
| 52 | KPIs avançados (retenção, taxa evolução, frequência média, LTV, comparativos vs benchmark) | `dados/analytics-saas-vertical` |
| 53 | Site auto-gerado por academia (subdomínio cliente-x.dojofamiliascholze.app) | `marketing/landing-auto-saas-vertical` (a criar) |

### 4.4 WON'T HAVE — Fase 4+ ou descartado

| # | Feature | Por quê adiar |
|---|---|---|
| 54 | Integrações federações (IBJJF, CBJJ, CBJ) | Credibilidade, não feature — após 5 cases |
| 55 | Frame-skip análise técnica de golpes (vídeo) | Complexidade alta, MVP não precisa |
| 56 | Rede social interna por academia (ranking + destaques) | Diferencial nice-to-have, depois de 50 academias |
| 57 | Modelo ML pra churn (substitui heurística) | Só com dados de 6+ meses |
| - | Plano Enterprise (associações, redes) | Fase 4 — após produto self-service consolidado |
| - | White-label app (Meu Campo, Meu Estúdio) | Fase 5 — após dojo provado |
| - | Internacionalização completa + USD/EUR | Fase 4 — após 50 clientes BR |

---

## 5. KOD.AI APLICÁVEL

### 5.1 Contexto-domínio upstream (consumido 100%)

[`gestao-academia-esportiva-br/`](../../../KODAI/3-CONTEXTOS-DOMINIO/gestao-academia-esportiva-br/) (DRAFT — promove FUNCIONAL após app rodar 30d em prod com Cristiano)

- DOMINIO.md (5 personas canônicas + jornada emocional + multi-tenancy)
- 6 conceitos: lgpd-menor-saas-educacao, verticalizacao-saas-b2b, operacao-white-label-multi-vertical, stack-tecnica-mobile-saas-vertical, infra-custos-saas-vertical-br, features-diferenciadoras-saas-vertical-esportivo

### 5.2 Contextos-domínio companheiros

| Contexto | Aplicação |
|---|---|
| `sistemas-empresariais-br` | Padrão SaaS B2B SMB BR + operação white-label |
| `competitive-intelligence` | 7 concorrentes mapeados (FaceDojo, Next Fit, Kicksite, +4) + benchmarks UX |
| `responsividade-mobile-first` | PWA mobile + desktop (responsividade obrigatória) |
| `lgpd-seguranca-universal` | LGPD + GDPR + worst-case (concorrente denuncia ANPD) — crítico pra dados de menores |
| `niveis-operacionais-l1-l2-l3` | Como entregar do nível 1 (entender usuário) ao L3 (executar) |
| `agentes-ia-construcao` | Se MeuDojo tiver agente IA (chatbot atendimento, qualificação lead, suporte), usar fundação |

### 5.3 Packs upstream aplicáveis

| Pack | Status | Aplicação |
|---|---|---|
| `infra/supabase-config-maxima` | DRAFT | Setup completo backend (auth + DB + storage + edge functions + RLS multi-tenant) |
| `infra/vercel-config-maxima` | DRAFT | Deploy continuous integration |
| `infra/multi-tenant-saas-architecture` | DRAFT | Padrão multi-tenant via RLS |
| `dev/ui-responsivo-smb` | DRAFT | shadcn/ui + Tailwind + responsividade mobile+desktop |
| `negocio-br/lgpd` | DRAFT | Compliance LGPD + termo + audit log + DSR endpoint |
| `marketing/seo` | DRAFT | SEO landing + loja Next.js |
| `comercial/modelos-venda-ia` | DRAFT (populado 2026-05-25 com scripts venda Liam) | Scripts Discovery/Demo/Proposta pra venda do MeuDojo (futuro) |
| `atendimento/customer-success-ia` | STUB | N1/N2 WhatsApp+Claude (Fase 2 quando tiver +5 clientes) |
| `integracoes/email-smtp-transacional` | DRAFT | Notificações por email |
| `ia/agentes-*` (6 packs) | STUB | Quando adicionar chatbot atendimento aluno OU qualificação lead (Fase 3) |
| `ia/face-recognition` | notebooklm-only | CompreFace self-hosted (Fase 3) |

### 5.4 Packs a CRIAR no upstream (não existem ainda)

| Pack a criar | Pra que serve |
|---|---|
| `negocio-br/asaas-saas-recorrente` | Asaas integração: signatures + dunning + webhooks + reconciliação + retry inteligente |
| `dev/pwa-vite-react` | PWA setup canônico (manifest + service worker via vite-plugin-pwa + install prompt + offline patterns + Dexie wrapper) |
| `dev/pwa-nextjs-ssr` | Next.js SSR + PWA hybrid (landing+loja) — diferente de Vite SPA |
| `dev/monorepo-npm-workspaces` | Setup monorepo padrão (workspaces + scripts + turbo opcional) |
| `comercial/crm-funil-vendas` | CRM lead → trial → matriculado pipeline + integrações |
| `marketing/landing-auto-saas-vertical` | Site auto-gerado por cliente (Fase 3) |
| `dados/analytics-saas-vertical` | Métricas churn/MRR/LTV/CAC SaaS vertical |

**Estes packs serão criados ao longo do build via `/criar-pack` — dogfooding (cada decisão técnica resolvida vira pack reutilizável).**

### 5.5 Skills KOD.AI aplicáveis na construção

| Skill | Quando usar |
|---|---|
| `/spec` | Antes de cada feature/sprint |
| `/break` | Quebra spec em tasks |
| `/plan` | Plano executável |
| `/execute` | Implementar |
| `/review` | Code review |
| `/complete` | Iron Law Evidence Bloc |
| `/test-driven-development` | Pra todo código novo |
| `/capturar-imagem` | Screenshots + assets do pai |
| `/capturar-video` | Vídeos demos + bug reports |
| `/absorver-midia` | URL YouTube/Instagram → contexto |
| `/mapear-concorrente` | Mapear novos (OnMat, Kimono, etc) |
| `/notebooklm` | Consultar notebooks (contexto-domínio, concorrentes) |
| `/excalidraw-diagram` | Diagramas arquitetura |
| `/criar-agente` | Quando adicionar chatbot Fase 3 |
| `/proposta-cliente` | Vender MeuDojo pros próximos professores |
| `/mapear-rotinas` | Identificar repetições viram skill |
| `/espelhar` | Espelhar progresso nos arquivos vivos |
| `/status-decisao` | Marcar decisões com tag semântica |

---

## 6. ROADMAP EM FASES

```
FASE 0 — Setup (1 semana)
├── Scaffold monorepo (apps/site + apps/app + packages/*)
├── Supabase project + schema inicial + RLS multi-tenant
├── Identidade visual aplicada (paleta + logos pai)
├── Deploy preview Vercel ambos apps
└── CI básico (PR build + preview deploy)

FASE 1 — MVP Sprint 1-4 (16 semanas)
├── Sprint 1: Auth + cadastro + dojo + turmas + PWA setup        (28-31)
├── Sprint 2: Presença + graduação + certificado                  (5-8)
├── Sprint 3: Dashboard + alertas + financeiro + Asaas + trial    (9-13)
└── Sprint 4: LGPD + responsável + menor + aluno + cadernos + admin panel (14-23)

FASE 1.5 — Validação Cristiano (4-6 semanas)
├── Onboarding Cristiano (1ª academia real)
├── 30 dias uso real
├── Coleta feedback estruturado
├── Fix prioritários P0
└── Decisão go/no-go pra Fase 2

FASE 2 — Expansão funcional (8 semanas)
├── Comunicação interna + email + push
├── Dunning + alertas evasão + métricas
├── Avaliações físicas
├── Loja B2C no site público
└── Onboarding manual de 10 profs da rede Cristiano

FASE 3 — Diferenciação (8 semanas)
├── CRM + funil vendas
├── Facescan (CompreFace + getUserMedia)
├── Marketplace B2B preparação
├── Site auto-gerado por cliente
└── KPIs avançados

FASE 4 — Escala (3-6 meses)
├── Internacionalização completa (PT+EN+ES+FR+IT)
├── USD/EUR pricing
├── Tráfego pago Meta + Google Ads
├── Federações parcerias
└── Plano Enterprise (associações, redes)

FASE 5 — Multi-tenant SaaS único (Davi decide)
├── Consolidar instâncias separadas em deploy único
├── Migração dados via script
├── Switch tenant via subdomínio
└── White-label app pra outras modalidades (Meu Campo, Meu Estúdio)
```

---

## 7. DECISÕES PENDENTES (8 críticas pra desbloquear Sprint 1)

| # | Decisão | Bloqueia |
|---|---|---|
| 1 | Domínio definitivo (`meudojo.app` vs `dojofamiliascholze.com.br` vs outro) | Setup DNS + Vercel + Open Graph |
| 2 | Nomenclatura "Caderno do Sensei" vs "Diário do Mestre" vs "Caderno do Tatame" | Naming database + UI |
| 3 | CNPJ pra Asaas (PF Cristiano vs MEI/ME empresa) | Setup Asaas account |
| 4 | Cristiano: perfil admin compartilhado ou role separada | Schema auth |
| 5 | Apple Dev account quem registra (Cristiano PF $99/ano OU pular App Store pelo PWA) | Decidido se PWA: pular |
| 6 | Logo final + tagline confirmados (já tem assets oficiais — só validar versão final) | Identidade visual |
| 7 | Plano de start de cobrança (após Sprint 4 OK?) | Pricing date público |
| 8 | Nome empresa SaaS (Showzy vs alternativa) | Marca + razão social NFs |

---

## 8. INFRA + CUSTOS

| Serviço | Tier MVP | R$/mês | Upgrade trigger |
|---|---|---|---|
| Supabase | Free | 0 | DB >400MB ou storage >800MB |
| Vercel (2 apps) | Hobby | 0 | Antes 1ª venda → Pro $20/mo = R$116 |
| Asaas | Free + taxa transação | 0 | n/a |
| Domínio | Registro.br | ~R$ 4/mês (R$ 40/ano) | n/a |
| **TOTAL MVP** | | **R$ 4/mês** | |
| Pós-1ª venda | Vercel Pro + Supabase Pro + domínio | ~R$ 290/mês | Coberto por ~3 mensalidades Plano Básico |

---

## 9. RISCOS PRINCIPAIS

1. **Facescan mediano** — FaceDojo já domina. Mitigação: paridade + 9 features que FaceDojo não tem (diário, certificado, jornada, etc).
2. **Janela competitiva** — Kicksite/Next Fit podem localizar BR em 18-36 meses. Mitigação: capturar mercado BR autônomo em ≤18 meses.
3. **Dependência Cristiano** — 1º cliente é pai do dev. Mitigação: onboarding manual de 10 profs rede após validação Cristiano.
4. **LGPD violado por descuido** — dados de menores = sensíveis. Mitigação: LGPD é Must no MVP (sprint 4), não Fase 2.
5. **Churn pós-trial alto** — sem rastrear "por que sai", cegueira. Mitigação: `exit_feedback` table desde MVP.
6. **iOS PWA limitado** — push notifications iOS exigem user instalar PWA + autorizar. Mitigação: documentar fluxo iOS bem + considerar fallback email pra notificações críticas em iOS pré-16.4.

---

## 10. INSIGHTS NÃO-ÓBVIOS (síntese da varredura)

1. **Certificado digital compartilhado = marketing orgânico** — pais postam no grupo de família, atrai outros pais. Investir em UX excelente do certificado.
2. **Diferencial emocional > funcional** — diário pessoal por aula vale mais que marketplace de kimonos. Concorrentes competem em features; MeuDojo vence em "seu treino vira história".
3. **Sweet spot pricing BR = R$ 80-110** — não é R$ 397 ("tudo internacional"). Vender pra "professor que tira renda da aula", não pra "academia profissional que quer KPIs".
4. **Offline-first é mito pro Brasil urbano** — Optimistic updates + Service Worker resolve 95%. Offline real (WatermelonDB / IndexedDB pesado) só se demanda real aparecer Fase 2+.
5. **Federações = canal de aquisição B2B gratuito** — não é "aluno vê ranking" — é "federação recomenda MeuDojo pro filiado". Começar com parsing manual; integração técnica depois.
6. **Admin panel esquecido = suporte cego** — Davi precisa ver MRR, profs ativos, churn. MVP mínimo = 3 páginas. Sem isso, operação falha nos primeiros 100 clientes.
7. **Múltiplos responsáveis = 35% do mercado BR** (pais com guarda compartilhada). Não é nice-to-have.
8. **Comparativo com US$ ilude pricing** — Kicksite US$49 = R$ 284 convertido, mas instrutor BR pensa "R$ 80 ou cancela". Pricing domina; feature-parity é higiene.

---

## 11. PRÓXIMOS PASSOS CONCRETOS

### Imediatos (esta sessão / próxima)
1. ✅ Documento mestre criado (este arquivo)
2. ⏳ Davi decide 8 itens da seção 7 (decisões pendentes críticas)
3. ⏳ Davi cria Supabase project + salva `.env.local` na raiz dojo
4. ⏳ Scaffold monorepo (Fase 0)

### Semana 1
- Sprint 1 inicia
- Auth básico funcionando (login Magic Link + Google OAuth)
- Cadastro professor + dojo
- Cadastro alunos (manual)
- PWA setup completo
- Identidade visual aplicada

### Mês 1-4 (Fase 1)
- Sprints 2-4 conforme tabela MVP

### Pós-MVP
- Onboarding Cristiano → 30d validação → Fase 2

---

## 12. REFERÊNCIA — DOCS CONSULTADOS NA SÍNTESE

Source files (todos lidos via varredura subagent):

**Repo dojo:**
- `contextos/mapeamento/perspectiva-{professor,aluno,responsavel,comercial,plataforma}.md`
- `contextos/mapeamento/{DECISOES_ABERTAS,arquitetura-tecnica,infraestrutura-custos,mvp-escopo}.md`
- `contextos/bruto/2026-05-{12,13,21}_*.md` (5 brutos)
- `contextos/{decisoes-mvp,modelo-de-venda}-2026-05-21.md`

**KODAI upstream:**
- `3-CONTEXTOS-DOMINIO/competitive-intelligence/conceitos/{facedojo,nextfit,kicksite}-vs-meudojo.md`
- `3-CONTEXTOS-DOMINIO/gestao-academia-esportiva-br/{DOMINIO,README,CHANGELOG,notebooklm}.md`
- `3-CONTEXTOS-DOMINIO/gestao-academia-esportiva-br/conceitos/*.md` (6 conceitos)
- `2-PACKS/packs/**/manifest.yaml` (inventário aplicabilidade)
- `1-ESQUELETO/skills-universais/*/SKILL.md` (inventário skills úteis)

**Memória persistente sessão:**
- `project_dojo.md` (atualização pendente nesta sessão)
- `project_kodai.md` (atualizado 2026-05-25)

---

**FIM do documento mestre.** Próxima atualização: após Sprint 1 concluído OU mudança arquitetural significativa.

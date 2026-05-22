---
tipo: decisoes-arquiteturais-mvp
data: 2026-05-21
projeto: MeuDojo (app SaaS dojo-familia-scholze)
status: aprovado-pelo-davi
fontes:
  - sessao_4_2026-05-21
  - bruto/2026-05-21_10-decisoes-mvp-plus-analise-fluxo-desejado.md
  - competitive-intelligence/conceitos/facedojo-vs-meudojo.md
  - competitive-intelligence/conceitos/nextfit-vs-meudojo.md
---

# Decisões arquiteturais aprovadas — MVP MeuDojo

Aplicação das 10 decisões respondidas pelo Davi na sessão 4 de 2026-05-21
após mapeamento FaceDojo + Next Fit + restrição financeira declarada.

## Princípio guarda-chuva — Bootstrap-mode

**Davi não tem capital pra queimar agora. Receita virá vendendo o sistema.**

Implicação em toda decisão:
- Custo fixo mensal o menor possível no MVP
- Evitar custos variáveis que crescem com escala (cada chamada API paga = perigoso)
- Self-host quando possível (CompreFace, Postgres próprio, etc) vs. managed
- Free tier dos fornecedores enquanto possível (Supabase Free, Vercel Hobby pra dev, Asaas free + taxas)
- Escalar infra conforme receita REAL (não pré-otimizar pra 1000 academias quando temos 1)
- Migrar Vercel pra Pro APENAS antes da primeira venda (uso comercial)

## Decisões aprovadas

### 1. Facescan — versão simplificada bootstrap-friendly

**Aprovada com simplificação importante do Davi:**

Em vez do modelo FaceDojo (foto enviada pra bot no WhatsApp via Cloud API paga), MeuDojo faz:
- **Foto tirada DENTRO do app** (camera nativa via Expo Image Picker)
- Face recognition processado no backend
- Após processamento, app oferece "compartilhar foto + lista de presença no grupo WhatsApp" (share intent nativo do celular)
- Resultado: presença registrada no diário sem custo de WhatsApp Cloud API + sem dependência da Meta

**Vantagens vs. FaceDojo:**
- Zero custo de WhatsApp Cloud API (sem mensalidade Meta, sem custo por mensagem)
- Zero dependência arquitetural (Meta pode mudar política sem afetar produto)
- Foto via app gera melhor controle de qualidade (resolução, orientação, iluminação)
- Compartilhamento WhatsApp = opcional (instrutor decide)

**Trade-off vs. FaceDojo:**
- FaceDojo NÃO exige app (zero atrito) — MeuDojo exige app instalado
- Mitigação: app é leve, usado também para diário/jornada/loja (multi-uso justifica instalação)

**Status:** confirmar viabilidade técnica em /brainstorming antes de spec.

### 2. Internacionalização — mais idiomas

**Aprovada — i18n desde MVP estruturado + mais idiomas que PT-BR.**

Arquitetar `lib/i18n/` desde dia 1 com `expo-localization`. Tradução inicial pra incluir:
- PT-BR (default)
- EN (mercado internacional — EUA, comunidade BJJ global)
- ES (LATAM)
- Outros idiomas a confirmar com Davi (FR? IT? JP? DE?)

**Custo bootstrap:** tradução inicial via IA (Claude/Gemini) custa zero. Revisão por nativo só quando primeiro cliente internacional aparecer.

### 3. Stack face recognition — REVISADA sob lente de custo

**Recomendação original (Rekognition):** **NÃO viável** sob bootstrap-mode.

Análise revisada:
| Opção | Custo MVP (1 academia, ~200 chamadas/mês) | Custo escala (100 academias, ~800k chamadas/mês) | Lock-in |
|---|---|---|---|
| Amazon Rekognition | ~US$0.20/mês (free tier 1º ano cobre) | ~US$800/mês (~R$4.600) | AWS |
| CompreFace self-hosted | R$300-500/mês (VPS médio) | R$300-500/mês (mesmo VPS escala bem) | Nenhum |
| InsightFace self-hosted | R$400-800/mês (precisa GPU OU CPU otimizada) | R$400-800/mês | Nenhum |

**Decisão revisada:** **CompreFace self-hosted Docker** desde MVP.

Justificativas:
- Custo previsível (R$300-500/mês — facilmente coberto por ~6 mensalidades de cliente Plano Intermediário)
- Sem custo por chamada → escalar não pesa
- Controle total LGPD (dados biométricos em servidor próprio = compliance mais simples vs. enviar pra AWS)
- Sem lock-in
- Setup: ~1-2 dias dev (Docker compose + endpoint REST)
- Comunidade Exadel ativa, projeto open-source maduro

**Alternativa interim (validação inicial, primeiros 30 dias):**
- Free tier Amazon Rekognition (5k chamadas/mês grátis) durante validação técnica com pai do Davi
- Migrar pra CompreFace quando confirmar pipeline funciona

**Arquitetura:** camada `services/face-recognition.ts` abstrai provider — troca CompreFace ↔ Rekognition sem refactor.

### 4. Dunning + recuperação de pagamento — aprovado

**Aprovado.** Asaas oferece retry nativo + adicionar:
- Fallback PIX automático ao 2º cartão falhado
- Lógica de retry inteligente (intervalos espaçados, horários otimizados)
- Notificação ao aluno em cada tentativa
- Alerta ao instrutor quando exceder N tentativas

**Custo:** ~2-3 dias dev.

### 5. Avaliações físicas — aprovado (toggle por academia)

**Aprovado.** CRUD simples + UI condicional + gráfico de evolução. Toggle off por padrão (academia ativa quando precisa).

**Custo:** ~3-4 dias dev.

### 6. Alertas preditivos de evasão — aprovado (regras heurísticas)

**Aprovado.** Implementar com regras heurísticas no MVP:
- Presença <60% últimas 4 semanas
- + atraso pagamento
- + ≥1 ausência não justificada
- = alerta urgente no dashboard do instrutor

Modelo ML opcional na Fase 2 (quando houver dados suficientes pra treinar).

**Custo:** ~2 dias dev + Edge Function cron diária.

### 7. Tracking de métricas próprias — aprovado

**Aprovado.** Tabela `metricas_cliente` desde MVP:
- Presença média por aluno/turma/academia
- Retenção mensal
- MRR por aluno
- Tempo médio de adesão
- Frequência de uso do app por persona

Dashboard interno do operador da plataforma (não exposto ao cliente).

**Custo:** ~1 dia dev.

### 8. CRM + funil de vendas — aprovado NO MVP (não Fase 2)

**Aprovado NO MVP** — Davi reverteu recomendação inicial. Entidade `lead` separada de `aluno`:
- Pipeline: interessado → demo agendada → trial → matriculado
- Mensagens automáticas (WhatsApp/email integrado)
- Funil visível no dashboard do instrutor
- Origem do lead trackada (Instagram Ads, indicação, busca orgânica)

**Custo revisado:** ~2-3 semanas dev. Atrasa MVP, mas Davi avaliou que vale pra venda.

**Pendência derivada:** entender qual plataforma de envio de WhatsApp usar pra automação (Evolution API self-hosted? Twilio? Z-API?). Lente bootstrap → preferir Evolution API self-hosted.

### 9. Pricing transparente — mantido público

**Mantido.** R$80-450 público nos 3 planos básicos. Plano Enterprise (associações, redes) sim venda consultiva, mas planos básicos sempre visíveis.

### 10. Marketing message principal — (a) plataforma completa

**Aprovado.** "Plataforma completa pra sua jornada de instrutor de artes marciais — sem hardware caro, sem dependência de WhatsApp, sem fricção comercial".

Davi notou: "isso não é o mais importante pra agora" — significa que conteúdo de marketing detalhado fica pra quando MVP estiver mais maduro.

---

## Resumo do escopo MVP atualizado

**Features confirmadas no MVP (15 itens):**

CRUD core (escopo original):
1. Cadastro de instrutor + dojô + turmas + alunos
2. Controle de presença (manual via app)
3. Mensalidade integrada (Asaas)
4. Graduação + certificado digital
5. Diário do Guerreiro (aluno)
6. Diário do Sensei (professor)
7. Jornada emocional + linha do tempo

Features absorvidas após mapeamento concorrentes:
8. Facescan via app (foto interna, compartilhamento WhatsApp opcional)
9. Dunning + recuperação pagamento
10. Avaliações físicas (toggle on/off por academia)
11. Alertas preditivos de evasão (heurísticos)
12. Tracking de métricas próprias (dashboard operador)
13. CRM + funil de vendas (entidade `lead` + pipeline + automação)
14. Internacionalização (PT+EN+ES no mínimo)
15. Loja B2C interna do dojô

**Para Fase 2 (post-MVP):**
- Site de vendas auto-gerado
- Marketplace B2B equipamento
- Integração federação esportiva
- Frame-skip análise técnica
- Micro rede social interna
- Modelo ML pra churn (substitui heurística)

---

## Próximas ações de desenvolvimento

1. **/brainstorming** sobre Decisão 1 (facescan via app + share WhatsApp) — confirmar viabilidade técnica
2. **/spec** do MVP MeuDojo com 15 features confirmadas + restrição bootstrap
3. **/break** em fases (8-12 sprints estimados)
4. **/plan** sprint 1 — cadastro + turmas + alunos
5. **/execute** primeira spike técnica de cada decisão arquitetural crítica (face recog, Asaas, i18n, Supabase RLS)

---

## Trilha pra promover contexto-domínio gestao-academia-esportiva-br pra FUNCIONAL

Este documento é EVIDENCE BLOC do uso real do contexto-domínio. Quando MVP estiver implementado e em uso por pai (instrutor real), promover via:
- `gestao-academia-esportiva-br/manifest.yaml`: status DRAFT → FUNCIONAL
- Registrar Evidence Bloc no manifest com link pra este doc
- Atualizar `CHANGELOG.md` do contexto-domínio

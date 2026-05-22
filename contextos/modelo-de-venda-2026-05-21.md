---
tipo: modelo-de-venda
data: 2026-05-21
projeto: MeuDojo
status: visao-revisada-aprovada-pelo-davi
fontes:
  - bruto/2026-05-21_visao-revisada-modelo-de-venda-e-regra-nao-perder-contextos.md
  - decisoes-mvp-2026-05-21.md (decisões anteriores)
  - KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/conceitos/kelvin-cleto-vs-kodai.md
  - KODAI/2-PACKS/packs/comercial/modelos-venda-ia/
---

# Modelo de venda revisado — MeuDojo

> Documento estratégico criado após Davi clarificar na sessão 4 de 2026-05-21
> que MeuDojo NÃO é SaaS B2B genérico tabelado. Substitui parcialmente o
> que estava em `decisoes-mvp-2026-05-21.md` no que tange MODELO DE VENDA
> (decisões técnicas dos 10 pontos continuam válidas).

## Visão revisada

**MeuDojo é uma BASE sólida adaptável vendida como SISTEMA PERSONALIZADO
para academias de Judô e Jiu-jitsu — não SaaS B2B genérico.**

- Tickets-alvo: R$1k / R$5k / R$15k / R$20k+
- Recorrência opcional (mensalidade pós-projeto)
- Modelo inspirado em Kelvin Cleto (concorrente direto KOD.AI) e similares
- Escalável: desde professor de colégio (ticket pequeno) até academia grande/rede (ticket alto)
- Diferenciação por personalização preserva margem (vs comoditização do SaaS puro)

## Tickets-alvo e escopo provável

| Ticket | Escopo provável | Persona | Recorrência típica |
|---|---|---|---|
| **R$1k** | Setup mínimo do app (cadastro + presença + mensalidade básica) + treinamento 2h + 30 dias suporte | Professor autônomo small (5-30 alunos) | R$100-200/mês (manutenção) |
| **R$5k** | Setup médio + customização leve (logo + cores) + onboarding 1 semana + 60 dias suporte | Academia pequena (30-50 alunos) | R$200-400/mês (manutenção + 1 sessão/mês) |
| **R$15k** | Setup completo + customização média + integração federação 1 modalidade + 6 meses suporte | Academia média (50-100 alunos) | R$500-1.000/mês (manutenção + suporte + features menores) |
| **R$20k+** | Tudo + multi-dojo + parcerias institucionais + suporte premium + 12 meses | Academia grande / rede / colégio | R$1.000-2.000/mês (suporte premium + features sob demanda) |

**Observações:**
- Mensalidade NÃO é obrigatória — cliente pode pagar só o setup e gerenciar sozinho
- Mensalidade é UPSELL natural (após cliente provar que precisa de manutenção/evolução)
- Cliente que paga R$20k+ entra em relacionamento próximo (Davi/Cristiano são canal direto, não suporte ticketed)

## Estrutura modular (técnica)

Pra cada cliente ter escopo diferente sem fork de código, MeuDojo precisa de **arquitetura modular real**:

### Schema base

```sql
-- Conceitual — adaptar ao schema definitivo
create table tenants (
  id uuid primary key,
  nome text not null,
  features_habilitadas jsonb default '{}'::jsonb,
  -- Ex: {"facescan": true, "frame_skip": false, "marketplace_b2b": false, "federacao_integrada": true}
  customizacoes jsonb default '{}'::jsonb,
  -- Ex: cores, logos, terminologia overrides
  ticket_setup_pago numeric,
  recorrencia_ativa boolean default false,
  recorrencia_valor numeric,
  created_at timestamptz default now()
);
```

### Camada de aplicação

```typescript
// Conceitual — adaptar à stack
const features = useTenantFeatures();
if (features.facescan) {
  // Renderiza módulo facescan
}
if (features.frame_skip) {
  // Renderiza player com frame-skip
}
```

### Catálogo de módulos opcionais (proposta inicial)

| Módulo | Custo dev MVP | Habilitado por padrão? | Upsell ticket |
|---|---|---|---|
| **Core**: cadastro, presença, mensalidade, graduação, certificado | sempre on | ✅ Sim | (incluído em R$1k base) |
| **Diário do Guerreiro + Sensei** | S | ✅ Sim | (incluído em R$5k+) |
| **Jornada emocional + linha do tempo** | S | ✅ Sim | (incluído em R$5k+) |
| **Facescan via app** | L | ⚠ Opt-in | +R$2k (cobre setup CompreFace) |
| **Integração federação** | M | ⚠ Opt-in por modalidade | +R$3-5k por modalidade |
| **Frame-skip análise técnica** | M | ⚠ Opt-in | +R$2k |
| **Loja B2C dojô** | M | ⚠ Opt-in | +R$3k |
| **Marketplace B2B equipamento** | L | ⚠ Roadmap (Fase 2) | +R$8-15k (Enterprise) |
| **Micro rede social interna** | M | ⚠ Opt-in | +R$3k |
| **Avaliações físicas trackadas** | S | ⚠ Opt-in | +R$1k |
| **CRM funil de vendas** | M | ⚠ Opt-in (instrutor que faz tráfego pago) | +R$3k |
| **Dunning + recuperação pagamento** | M | ⚠ Opt-in | +R$2k (cliente médio em diante) |
| **Alertas preditivos churn** | S | ⚠ Opt-in | +R$1k |
| **Internacionalização (PT+EN+ES)** | M | ⚠ Opt-in | +R$3k (cliente internacional) |
| **Multi-dojo (1 conta = N dojos)** | L | ⚠ Opt-in Enterprise | +R$5-8k |
| **Site/landing auto-gerado** | L | ⚠ Opt-in | +R$3k |

**Total catálogo:** core + 15 módulos opcionais. Cliente R$1k = só core. Cliente R$20k+ = pode pegar core + 10-12 módulos.

## Comparativo com modelo Kelvin Cleto (concorrente direto KOD.AI)

> Análise completa em `KODAI/3-CONTEXTOS-DOMINIO/competitive-intelligence/conceitos/kelvin-cleto-vs-kodai.md`

| Aspecto | Kelvin Cleto / Acelera 360 | MeuDojo (modelo revisado) |
|---|---|---|
| **Modelo de venda** | DFY (Done For You) / DWY (Done With You) / DIY (Do It Yourself) + workshop pago + assessment + programa Acelera 360 | DFY (R$15-20k) / DWY (R$5k) / DIY (R$1k) — convergência total no modelo |
| **Stack** | Claude Code + OpenClaw + Mission Control + GSD | RN+Expo+Supabase+CompreFace + KOD.AI |
| **Metodologia** | SDD (Spec Driven Development) | SDD via KOD.AI |
| **Posicionamento** | "Infraestrutura de IA por vertical" | "Sistema vertical pra academias artes marciais" |
| **Caso público citado** | "Vendi Claude como OS pra empresa de energia solar" (vídeo 4 análise) | Pai Cristiano (futuro primeiro caso) |
| **Tração** | Múltiplos casos reais (energia solar, têxtil, joalheria) | 0 (pre-launch) |

**Diferenciador defensável do MeuDojo:** **vertical específico (academias artes marciais BR)**. Kelvin atende qualquer vertical, ganhando por amplitude. MeuDojo ganha por profundidade num vertical.

**Risco:** Kelvin poderia entrar nesse vertical específico se ver valor de mercado. Mitigação: capturar nicho BR + comunidade artes marciais em ≤18 meses.

## Implicações pro MVP (revisão das decisões anteriores)

### O que muda

| Decisão original | Decisão revisada |
|---|---|
| Pricing 3 planos R$80/150/350 (gating por feature) | **Catálogo de módulos opcionais** + ticket project-based (R$1-20k) + recorrência opcional |
| Self-service trial sem cartão | **Venda consultiva + proposta personalizada por cliente** |
| Onboarding self-service via app | **Onboarding humano (DFY/DWY) embutido no ticket** |
| Captação via Instagram Ads | Captação via rede pessoal Davi/Cristiano + indicação + parcerias federações (médio prazo) |
| CRM integrado pra qualificar leads automáticos | CRM **continua valioso** — instrutor cliente pode usar pra capturar próprios alunos |
| Métricas próprias de impacto | **Continua essencial** — pitch comercial precisa de números |

### O que continua igual

- 15 features do escopo (todas implementadas, mas opt-in por tenant via `features_habilitadas`)
- Bootstrap-mode (custo fixo mínimo, CompreFace self-hosted, Evolution API self-hosted)
- Stack: RN+Expo+Supabase+CompreFace
- LGPD-by-design + biometria-ética + multi-tenant RLS
- Internacionalização estruturada desde MVP
- Diferenciadores únicos (Diário Guerreiro, frame-skip, etc) — viram MÓDULOS upsell

### O que precisa ser adicionado ao roadmap

1. **Arquitetura `features_habilitadas` por tenant** — schema + camada aplicação (+1-2 semanas dev)
2. **Catálogo de módulos opcionais** documentado pra apresentar em proposta
3. **Template de proposta comercial** — PDF com escopo + tickets + entregáveis (R$1-20k)
4. **Onboarding humano protocol** — checklist do que entregar em cada ticket
5. **Suporte tiered** — diferenciação clara R$1k (email 5 dias úteis) vs R$20k (canal direto Davi/Cristiano)

## Próximas decisões pendentes

### A — Aceitar modelo híbrido vs migrar 100% pra project-based?

**Trade-off:**
- **Híbrido (recomendado):** mantém opção self-service R$80-450/mês pra cliente pequeno + adiciona project-based R$1-20k pra cliente médio/grande
- **100% project-based:** simplifica posicionamento mas exclui o mercado SMB autônomo brasileiro (instrutor 5-10 alunos)

**Recomendação:** **Híbrido.** Cliente pequeno entra self-service R$80-110/mês, vira case, cresce, eventualmente faz upgrade pra project-based personalizado.

### B — Quem faz a venda consultiva nos tickets R$5k+?

Davi/Cristiano são gargalo natural (não tem time comercial). 

**Opções:**
- **Davi faz tudo** — limite ~3-5 propostas/mês até saturar
- **Cristiano (pai) faz frontend comercial** — usa rede pessoal de instrutores
- **Contratar comercial em comissão** — modelo aprendiz pagando %

**Recomendação:** **Davi+Cristiano fazem primeiros 10 vendas** (validam discurso e proposta). Depois contratam comercial em comissão (5-10% do ticket).

### C — Recorrência: opcional ou obrigatória pra ticket alto?

**Trade-off:**
- **Opcional:** cliente decide se quer manutenção pós-projeto. Menos pressão de venda.
- **Obrigatória pra R$15k+:** garante MRR previsível. Pode resistir cliente.

**Recomendação:** **Opcional mas fortemente recomendada via discurso comercial.** "Sem mensalidade você fica sem atualização de bug fix da Apple/Google que quebram app a cada release." Cliente decide, mas sente desconforto em não pegar.

## Riscos identificados

1. **Gargalo comercial Davi/Cristiano** — escalar venda consultiva exige time depois de 10-20 clientes
2. **Complexidade técnica `features_habilitadas`** — bugs em features opt-in/opt-off podem aparecer (testar exaustivo)
3. **Posicionamento confuso vs concorrentes** — cliente não entende se é SaaS ou "sistema customizado"; precisa de discurso claro
4. **Kelvin Cleto poderia entrar no vertical** — mitigação: velocidade

## Próximas ações concretas

1. ✓ Visão revisada documentada (este arquivo)
2. ⏳ Atualizar `gestao-academia-esportiva-br/conceitos/verticalizacao-saas-b2b.md` com modelo híbrido (já feito nesta sessão)
3. ⏳ `/brainstorming` sobre arquitetura `features_habilitadas` antes de spec MVP
4. ⏳ Template de proposta comercial — criar quando primeiro cliente real aparecer
5. ⏳ Decidir A, B, C acima com Davi

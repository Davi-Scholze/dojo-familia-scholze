# Dojô Família Scholze — Guia do Projeto

## Ordem de leitura (economizar contexto)

1. **Este arquivo** — stack, regras, visão do produto
2. **`contextos/mapeamento/mvp-escopo.md`** — escopo, sprints e critérios de lançamento (ler segundo)
3. **`contextos/mapeamento/arquitetura-tecnica.md`** — decisões técnicas, DB, stack (ler terceiro)
4. **Perspectiva relevante** — professor, aluno, responsável, comercial ou plataforma
5. **`contextos/bruto/`** — contextos brutos (não processar sem OK do Davi)
6. **`docs/MAPA_DO_PROJETO.md`** — quando existir (ainda não criado)

## Mapa de Perspectivas (contextos/mapeamento/)

| Arquivo | Conteúdo |
|---------|---------|
| `perspectiva-professor.md` | Todos os 23 módulos da experiência do professor |
| `perspectiva-aluno.md` | Todos os 14 módulos da experiência do aluno |
| `perspectiva-responsavel.md` | Experiência do pai/responsável de aluno menor |
| `perspectiva-comercial.md` | Planos, preços, benchmark, go-to-market |
| `perspectiva-plataforma.md` | Admin da plataforma (Davi + Cristiano como operadores) |
| `mvp-escopo.md` | O que entra no MVP, sprints, critérios de lançamento |
| `arquitetura-tecnica.md` | Stack, DB schema, multi-tenant, offline, segurança |
| `infraestrutura-custos.md` | Supabase, Vercel, EAS — custos e quando fazer upgrade |

---

## Quem é o projeto

App/SaaS para professores de artes marciais (foco inicial: judô, jiu-jitsu, caratê, MMA).

**Empresa:** Dojô Família Scholze — pai do Davi (fabricação e venda de faixas e kimonos)
**Prioridade:** Segunda — após Decon estar estável

### Visão em fases

**Fase 1 — App para professores (MVP)**
- Professor cria seu "dojô" na plataforma
- Controle de alunos, turmas, presença, mensalidades
- Promoção de faixa em 1 clique
- Pedidos de kimono/faixa para o Dojô Família Scholze

**Fase 2 — Marketplace B2B (diferencial)**
- Professores pedem kimonos/equipamentos direto de distribuidoras
- Desconto para professores que usam o app
- Lacuna de mercado: nenhum software de gestão de dojos faz isso hoje

**Fase 3 — SaaS multi-tenant**
- Cobrar mensalidade de outros professores
- Expandir para múltiplas distribuidoras

### Primeiro mercado
- Neomissão (Davi dá aula de judô todo sábado 11–12)
- Professores da rede do pai

---

## Stack (a confirmar com Davi)

| Camada | Decisão |
|--------|---------|
| Mobile | React Native + Expo SDK + TypeScript |
| Navegação | Expo Router v3 |
| Backend | A definir (Supabase ou Node/FastAPI) |
| Pagamentos | Asaas (mensalidades) + Pagar.me (split B2B) |
| Animações | React Native Reanimated 3 |
| Build | EAS Build + EAS Submit |

---

## Regras inegociáveis

1. **SDD obrigatório** — `/spec` → aprovação → `/break` → `/plan` → `/execute` → `/review`
2. **TypeScript obrigatório** — sem `any`, sem atalhos de tipagem
3. **Passo a passo** — nunca avançar sem OK explícito do Davi
4. **Zero credenciais no código** — `.env` para tudo
5. **Mobile-first** — app é o produto principal
6. **Segurança em pagamentos** — nunca logar dados de cartão, validar webhooks
7. **Skills primeiro** — `/mobile-dev`, `/payments-br`, `/web-design-ref` antes de resolver manual

---

## Competidores diretos (já mapeados)

Ver `contextos/bruto/2026-05-13_biblioteca-software-gestao-dojo.md`

Top 3 referências de UX:
- **Kicksite** — promoção de faixa em 1 clique, portal mobile do aluno
- **OnMat** — 100% artes marciais, 4.8/5 Capterra
- **Canopy** — melhor UX mobile do mercado (4.9 App Store, 19k avaliações — referência de contabilidade mas com UX excelente)

Lacuna de mercado identificada: nenhum software conecta professor a distribuidoras.

---

## Referências de design

Ver skill `/web-design-ref` ou `contextos/bruto/2026-05-13_biblioteca-web-design-internacional.md`

Referências para o app de artes marciais:
- ufc.com, bellator.com — branding esportivo
- Awwwards Sports: Stōkt, Double Play — UX mobile esportiva

---

## Padrão de commits

```
feat(alunos): adiciona promoção de faixa em 1 clique
fix(pagamentos): corrige webhook de mensalidade
docs(claude): atualiza estado do projeto
```

---

## Variáveis de ambiente

```bash
EXPO_PUBLIC_API_URL=
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
ASAAS_API_KEY=                  # mensalidades
PAGARME_API_KEY=                # split B2B
```

---

## Repositório

- **GitHub:** github.com/Davi-Scholze/dojo-familia-scholze
- **Local:** `Repositorios/dojo-familia-scholze/`
- **Status:** Novo — estrutura inicial a criar

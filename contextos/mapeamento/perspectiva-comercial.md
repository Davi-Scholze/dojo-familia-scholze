# Perspectiva Comercial — App Meu Dojo
> Modelo de negócio, precificação, go-to-market e projeções.
> Fonte: App_Meu_Dojo_Contexto_Mestre.md + biblioteca-software-gestao-dojo.md
> Última atualização: 2026-05-14

---

## Modelo de Negócio: SaaS Recorrente

**Quem paga:** o professor (não o aluno).  
**O que paga:** mensalidade pelo direito de usar a plataforma para gerenciar seus alunos.  
**Os alunos** usam o app gratuitamente — o valor para o aluno é o acesso à jornada dele, e isso aumenta a retenção do professor.

---

## Benchmark Internacional de Preços

Dados da biblioteca `2026-05-13_biblioteca-software-gestao-dojo.md`:

| Concorrente | País | Preço mensal | Modelo |
|------------|------|-------------|--------|
| Kicksite | EUA | US$49–199 | Por faixa de alunos |
| Zen Planner | EUA | US$117–348+ | Por aluno ativo |
| Spark Membership | EUA | Flat-rate | Flat-rate |
| WellnessLiving | EUA/CA | US$39/mês | Flat-rate + add-ons |
| OnMat | Global | TBD (freemium) | Freemium |
| Gymdesk | EUA | ~US$75–150 | Por faixa |

**Referência convertida para BRL (mai/2026, ~R$5,80/USD):**
- Kicksite básico: US$49 = R$284/mês
- Kicksite topo: US$199 = R$1.155/mês

**Conclusão:** há espaço para posicionar bem abaixo dos internacionais e ainda ser premium no Brasil.

---

## Precificação Recomendada (Brasil — MVP)

| Plano | Preço/mês | Para quem | Limite de alunos |
|-------|----------|-----------|-----------------|
| **Básico** | R$97 | Professor autônomo, aulas avulsas, recreativo puro | Até 30 alunos |
| **Intermediário** | R$197 | Academia pequena, mix recreativo + competitivo | Até 100 alunos |
| **Premium** | R$397 | Academia profissional, equipes de competição | Ilimitado |
| **Enterprise** | A definir | Associações, colégios, redes, franquias | N professores + N turmas |

**Estratégia de pricing:**
- Básico: abaixo do preço psicológico de R$100 (facilita conversão)
- Intermediário: ponto de maior volume esperado
- Premium: professores sérios — para eles, R$397 é custo de marketing mínimo

**Futuro (internacional):**
- Básico: US$19 / €17
- Intermediário: US$39 / €35
- Premium: US$79 / €70

---

## Features por Plano

| Feature | Básico | Intermediário | Premium |
|---------|--------|--------------|---------|
| Gestão de alunos | ✅ (até 30) | ✅ (até 100) | ✅ ilimitado |
| Controle de presença | ✅ | ✅ | ✅ |
| Graduação com cálculo | ✅ | ✅ | ✅ |
| Certificado digital | ✅ | ✅ | ✅ |
| Caderno do Guerreiro | ✅ | ✅ | ✅ |
| Caderno do Sensei | ✅ | ✅ | ✅ |
| Calendário + scripts | ✅ | ✅ | ✅ |
| Financeiro básico | ✅ | ✅ | ✅ |
| Comunicação interna | ✅ | ✅ | ✅ |
| Turmas múltiplas | — | ✅ | ✅ |
| Relatórios avançados | — | ✅ | ✅ |
| KPIs e dashboards | — | — | ✅ |
| Suporte prioritário | — | — | ✅ |
| Multi-dojo | — | — | ✅ |

---

## Período de Trial

- **30 dias grátis** sem cartão de crédito (benchmark: OnMat faz isso, converte bem)
- Após trial: professor já tem alunos cadastrados, presença registrada, histórico começado — custo de trocar é alto
- Estratégia: fazer o professor ter dados no app antes de pagar

---

## Estratégia Go-to-Market (sequência)

### Fase 0 — Beta fechado (Cristiano como cobaia)
- Professor Cristiano usa no próprio dojo
- Testa todos os fluxos com alunos reais de judô
- Coleta feedback real antes de abrir para outros

### Fase 1 — Rede do Cristiano (primeiros 10 professores)
- Professores da rede do pai do Davi
- Onboarding manual, suporte próximo
- Objetivo: validar retenção (professores ativos após 60 dias)

### Fase 2 — Tráfego pago
- Instagram Ads com carrossel de vendas
- Público: professores de artes marciais no Brasil
- Copy: "Quanto tempo você perde com planilha de presença?"
- Usar skill `/ads-audit` + `/content-creator` para produzir criativos

### Fase 3 — Prova social e reviews
- Reviews de professores reais (Cristiano + beta users)
- Avaliações na App Store e Play Store
- Vídeos curtos mostrando o certificado digital sendo gerado

### Fase 4 — Internacional
- Tradução para inglês e espanhol
- Público: academias na América Latina e EUA (comunidade brasileira)

---

## Projeção de Receita (cenário conservador)

| Mês | Professores ativos | MRR estimado | Custo infra |
|-----|-------------------|--------------|-------------|
| 1–3 | 1 (beta Cristiano) | R$0 (free) | ~R$350 |
| 4–6 | 10–20 | R$1.500–3.000 | ~R$350 |
| 7–12 | 30–80 | R$5.000–15.000 | R$500–800 |
| Ano 2 | 200–500 | R$30.000–80.000 | R$1.500–3.000 |

**Break-even (cobrir custo de infra):** 4–5 professores no plano Básico.

---

## Marketplace de Serviços Criativos

O professor pode solicitar serviços digitais dentro do app — sem precisar sair da plataforma.

| Serviço | Descrição |
|---------|-----------|
| Site da academia | Site personalizado + analytics integrado |
| Instagram | Criação e gestão de perfil profissional |
| Fotografia | Sessão de fotos profissional da academia e alunos |
| Vídeo/áudio | Gravação profissional de aulas e eventos |
| Tráfego pago | Meta/Google Ads estruturado |

**Versão MVP:** professor solicita → equipe (Davi + esposa) executa manualmente. Simples, rápido, validado.
**Versão futura:** prestadores cadastrados (fotógrafos, videomakers, designers) recebem pedidos direto pelo app.

---

## Parceiros com Desconto (MVP)

Dentro da plataforma, professor e alunos têm acesso a parceiros do ecossistema Showzy com condições especiais.

| Parceiro | Serviço | Responsável | Modelo |
|---------|---------|-------------|--------|
| Contabilidade | Gestão contábil e fiscal | Denize (mãe) | Indicação + desconto exclusivo |
| Seguros | Seguro do local e responsabilidade civil | Irmão | Indicação + condições especiais |
| Fotografia | Sessão profissional da academia | Esposa | Pacote exclusivo para academias no app |
| Site | Site personalizado + analytics | Davi + esposa | Integrado ao app |

**Modelo de receita:** professor usa o parceiro → parceiro oferece desconto → plataforma pode cobrar comissão por indicação a partir da Fase 2.

---

## Fontes de Receita Futuras

| Fonte | Fase | Modelo |
|-------|------|--------|
| SaaS mensal (Básico/Intermediário/Premium) | 1 | Principal |
| Marketplace de Serviços Criativos | 1 (manual) → 3 (marketplace) | Margem sobre execução |
| Parceiros com desconto (comissão) | 2 | % por indicação convertida |
| Marketplace B2B (kimonos/equipamentos) | 3 | Comissão 5–15% |
| Plano Enterprise (associações, redes) | 3 | Contrato personalizado |
| Marketplace aberto | 4 | Comissão 10–20% |
| Planos de federação | 2 | Licença anual |
| White-label para outras modalidades | 4 | Contrato anual |

---

## Canais de Aquisição

| Canal | Custo | Retorno esperado |
|-------|-------|-----------------|
| Rede pessoal do Cristiano | R$0 | Alto (confiança) |
| Instagram Ads (carrossel) | R$500–2.000/mês | Médio |
| YouTube / Reels demonstração | R$0 (produção) | Médio a longo prazo |
| Grupos de professores (WhatsApp, Facebook) | R$0 | Alto (nicho) |
| Parcerias com federações estaduais | R$0 | Alto (credibilidade) |
| App Store / Play Store (ASO) | R$0 | Médio a longo prazo |

---

## Métricas a Acompanhar desde o MVP

| Métrica | O que mede |
|---------|-----------|
| Trial → Pago (%) | Taxa de conversão do trial |
| Churn mensal (%) | Professores que cancelam |
| Alunos cadastrados por professor | Saúde do uso |
| Dias de uso por semana | Engajamento real |
| NPS do professor | Satisfação e propensão a indicar |
| NPS do aluno | Satisfação do usuário final |

**North Star Metric:** número de professores que usam o app pelo menos 3x por semana.

---

## Decisões Abertas

- [ ] Preços definitivos dos 3 planos (validar com Cristiano)
- [ ] Trial com ou sem cartão de crédito?
- [ ] Aceitar PIX para assinatura do professor? (precisa de lógica de cancelamento manual)
- [ ] Oferecer plano anual com desconto? (ex: 2 meses grátis)
- [ ] Modelo freemium para sempre (1 turma grátis) ou só trial?

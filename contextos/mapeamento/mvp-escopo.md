# Escopo do MVP — App Meu Dojo
> Define o que entra, o que sai e os critérios de lançamento.
> O MVP atual no contexto mestre é grande demais para 1 desenvolvedor em 3 meses.
> Esta análise propõe o corte mais inteligente.
> Última atualização: 2026-05-13

---

## O Problema com o MVP Original

O documento mestre lista ~40 features como MVP. Para 1 desenvolvedor (Davi) trabalhando nas horas livres (pós 16h nos dias úteis + fins de semana), isso é 9–12 meses de trabalho.

**Princípio:** o MVP precisa ser o menor conjunto de features que faz um professor de judô ou jiu-jitsu dizer "não consigo mais trabalhar sem isso" após 30 dias de uso.

---

## Framework de Priorização (MoSCoW)

| Prioridade | Critério |
|-----------|---------|
| **Must Have** | Sem isso, o professor não consegue usar o app para nada |
| **Should Have** | Com isso, o professor não vai embora após os primeiros 30 dias |
| **Could Have** | Com isso, ele vira fã e indica para outros |
| **Won't Have Now** | Fase 2 ou posterior |

---

## MVP Cortado (Versão Recomendada)

### MUST HAVE — Core de Gestão (sem isso não tem produto)

| Feature | Complexidade | Semanas |
|---------|-------------|---------|
| Cadastro professor + criação do dojo | Baixa | 1 |
| Cadastro de alunos (manual + link de convite) | Média | 1 |
| Gestão de turmas e horários | Baixa | 0.5 |
| Controle de presença (aluno confirma, professor corrige) | Média | 1 |
| **Graduação com cálculo automático** (coração do app) | Alta | 2 |
| Cerimônia de graduação + histórico | Média | 1 |
| Certificado digital de graduação (PDF) | Média | 1 |
| Painel do professor (dashboard básico) | Baixa | 0.5 |
| Alertas: graduação próxima, presença baixa, aniversário | Média | 1 |
| Autenticação multi-perfil (professor, aluno, responsável) | Alta | 2 |

**Total estimado Must Have: ~11 semanas**

---

### SHOULD HAVE — O que faz o professor ficar

| Feature | Complexidade | Semanas |
|---------|-------------|---------|
| Caderno do Guerreiro (versão simples, texto livre) | Média | 1 |
| Linha do tempo do aluno (jornada visual) | Média | 1.5 |
| Notificações push (presença, graduação, elogio) | Média | 1 |
| Controle financeiro básico (receber, prever, inadimplência) | Alta | 2 |
| Canal de comunicação interno (professor ↔ aluno) | Média | 1.5 |
| Relatório de evolução do aluno (compartilhável com pais) | Média | 1 |

**Total estimado Should Have: ~8 semanas**

---

### COULD HAVE — O que vira viralização

| Feature | Complexidade | Semanas |
|---------|-------------|---------|
| Caderno do Sensei (diário do professor) | Média | 1 |
| Calendário com scripts de aula | Alta | 2 |
| Álbum de conquistas (card visual por graduação) | Média | 1 |
| Migração de base de alunos (CSV import) | Média | 1 |

**Total estimado Could Have: ~5 semanas**

---

### WON'T HAVE NOW (Fase 2+)

- Avaliações públicas de academias
- Integração com federações (IBJJF, CBJ)
- KPIs avançados (taxa de retenção, LTV, funil)
- Gamificação completa (rankings, badges desbloqueáveis)
- Vídeo-aulas
- Marketplace de equipamentos (kimono/faixa)
- IA para análise de lutas
- Multi-idioma completo
- QR Code para check-in
- Reconhecimento facial
- **Plano Enterprise** (conta mãe para associações e redes) — Fase 3
- **White Label** (App Meu Campo, App Meu Estúdio, etc.) — Fase 4
- **Marketplace de Serviços Criativos** (prestadores cadastrados) — Fase 3 (versão manual pode entrar no Sprint 4)
- **Parceiros com desconto** (comissão automatizada) — Fase 2 (versão por link entra no MVP)

---

## Proposta de Faseamento Real

### Sprint 1 — "O app funciona" (semanas 1–4)
Objetivo: professor consegue cadastrar alunos, registrar presença e registrar graduação.

- Auth (professor + aluno)
- Cadastro de dojo e turmas
- Cadastro de alunos
- Presença básica
- Graduação simples (sem cálculo automático ainda)

### Sprint 2 — "O app é inteligente" (semanas 5–8)
Objetivo: o sistema começa a trabalhar por conta do professor.

- Cálculo automático de critérios de graduação
- Alertas (graduação próxima, presença baixa, aniversário)
- Dashboard do professor
- Certificado digital (PDF simples)

### Sprint 3 — "O aluno ama o app" (semanas 9–12)
Objetivo: o aluno usa o app todos os dias, não só para confirmar presença.

- Caderno do Guerreiro
- Linha do tempo da jornada
- Notificações push
- Perfil do aluno + privacidade
- Painel do responsável

### Sprint 4 — "O app se sustenta" (semanas 13–16)
Objetivo: professor paga e não cancela.

- Controle financeiro (cobrar mensalidade dos alunos)
- Canal de comunicação interno
- Integração com Asaas (Pix, boleto, cartão)
- Admin básico (dono da plataforma)

### Sprint 5 — "O app impressiona" (semanas 17–20)
Objetivo: first impression perfeita, ready para tráfego pago.

- Calendário com scripts de aula
- Caderno do Sensei
- Álbum de conquistas
- Importação CSV (migração de base)
- Onboarding guiado (professor novo configura tudo em 10 minutos)

**Total estimado (MVP completo): 20 semanas (5 meses)**

---

## Critérios de Lançamento (Definition of Done do MVP)

O MVP está pronto para lançamento quando:

- [ ] Cristiano (beta) usa por 30 dias sem reclamar do fluxo básico
- [ ] Pelo menos 5 alunos reais do dojo do Cristiano usam o app regularmente
- [ ] Um aluno recebeu certificado de graduação pelo app
- [ ] O financeiro está funcionando (Cristiano cobrou pelo menos uma mensalidade via app)
- [ ] O app está na App Store (iOS) e Play Store (Android)
- [ ] Nenhum dado de teste está em produção

---

## North Star Metric

**"Número de professores que abrem o app pelo menos 3x por semana"**

Um professor que abre o app antes de cada aula está usando ativamente. Esse é o sinal de que ele não cancela.

---

## Decisões Abertas

- [ ] Qual Sprint é o critério mínimo para começar a cobrar? (sugestão: após Sprint 4)
- [ ] Calendário com scripts de aula é SHOULD ou COULD? (o doc original diz MVP — mas é complexo)
- [ ] Começar pelo iOS (mais difícil de publicar) ou Android?
- [ ] Desenvolver app nativo ou começar com PWA para validar mais rápido?

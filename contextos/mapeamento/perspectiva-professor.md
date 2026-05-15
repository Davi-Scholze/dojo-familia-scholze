# Perspectiva do Professor / Gestor — App Meu Dojo
> Mapa completo da experiência do professor na plataforma.
> Fonte: App_Meu_Dojo_Contexto_Mestre.md + análise de mercado
> Última atualização: 2026-05-13

---

## Quem é esse usuário

Professor/gestor de academia de judô ou jiu-jitsu. Pode ser:
- Professor autônomo (dá aulas em escola, parque, garagem)
- Dono de academia pequena (20–80 alunos)
- Dono de academia profissional (80–300 alunos, equipes de competição)

**Perfil do Cristiano (usuário beta):** dono do Dojô Família Scholze, professor de judô, testa o app no próprio dojo antes de vender.

---

## Fluxo Completo (MVP)

### 1. Descoberta e Cadastro

**Como chega:**
- Tráfego pago (Instagram/Google) com carrossel de vendas
- Indicação de outro professor
- Parte do ecossistema Dojo Família Showzy

**Tela de entrada:**
- Escolha: "Sou professor" ou "Sou aluno"
- Professor também tem perfil de usuário comum (pode explorar academias)

**Dados do cadastro profissional:**
- Nome completo + foto
- Graduação atual (faixa) e modalidade (judô/jiu-jitsu/ambas)
- Anos de experiência
- Filiação a federação (opcional no MVP)

---

### 2. Escolha do Plano SaaS ✅ MVP

| Plano | Para quem | Limite sugerido |
|-------|-----------|-----------------|
| Básico | Professor autônomo, alunos recreativos | Até 30 alunos |
| Intermediário | Academia mista (recreativo + competitivo) | Até 100 alunos |
| Premium | Academia focada em competição | Ilimitado |

**Decisão pendente:** features exatas por plano. Ver `perspectiva-comercial.md`.

---

### 3. Criação do Dojo ✅ MVP

Dados obrigatórios:
- Nome do dojo + logo + foto/banner
- Modalidades (judô, jiu-jitsu, ambas)
- Endereço (para busca por proximidade pelos alunos)
- Links de Instagram, YouTube (opcional)
- Descrição livre

**Decisão em aberto:** professor pode ter múltiplos dojos na mesma conta? → Ver `arquitetura-tecnica.md`. Decisão crítica de banco de dados.

---

### 4. Estrutura Operacional ✅ MVP

**Turmas:**
- Criar turmas por modalidade e horário
- Ex: "Judô Infantil — Terça/Quinta 17h", "BJJ Adulto — Segunda/Quarta/Sexta 20h"
- Aluno matriculado em uma ou mais turmas

**Planos de mensalidade:**
- Professor cria seus próprios planos
- Valores e periodicidade customizáveis
- Ex: "Mensal R$180", "Trimestral R$480"

**Cadastro de alunos:**
- Manual (professor preenche dados)
- Link de convite (aluno se cadastra pelo link da academia)
- Importação em massa (CSV) — para migrar base existente
- **Migração deve ser simples e eficiente** — ponto de atrito crítico na adesão

---

### 5. Script e Plano de Aula ✅ MVP

**O que o professor pode criar:**
- Plano de cada aula: aquecimento, técnica principal, randori/sparring, encerramento
- Script filosófico (intenção da aula, valores, mensagem para os alunos)
- Feedback pós-aula (resumo do que aconteceu)

**Reutilização:** linkar mesmo script a múltiplas datas — não recriar do zero toda semana.

**Acesso do aluno:** via calendário, aluno vê o script da aula do dia (antes e depois).

---

### 6. Calendário Integrado ✅ MVP

- Professor define o calendário da academia (dias de aula, feriados, eventos)
- Cada data de aula tem script anexado
- Aluno acessa e vê o script do dia pelo calendário
- Aluno pode comentar dentro da aula no calendário
- Aluno pode referenciar o Caderno do Guerreiro nos comentários
- Professor reutiliza scripts em novas datas

---

### 7. Caderno do Sensei ✅ MVP

*(nome a confirmar: Caderno do Sensei / Diário do Mestre / Livro do Sensei / Caderno do Tatame)*

- Versão do Caderno do Guerreiro para o professor
- Anotações pessoais e reflexões pedagógicas
- Histórico das aulas dadas com observações
- Diário filosófico e técnico — **privado do professor**
- Nunca visível para alunos

---

### 8. Controle de Presença ✅ MVP

**Fluxo padrão:**
1. Aluno confirma presença antes da aula (pelo app)
2. Aluno pode avisar ausência mesmo em cima da hora
3. Professor vê lista de presença antes de entrar no tatame
4. Professor pode corrigir presença manualmente após a aula
5. Justificativas registradas (viagem, doença, trabalho)

**⚠️ Decisão de offline:** e se não houver internet? Confirmar presença offline e sincronizar depois. Ver `arquitetura-tecnica.md`.

**Referência de mercado:** Kimono (França) usa QR Code físico para check-in — opção para fase futura.

---

### 9. Registro por Aluno ✅ MVP

O professor pode anotar sobre cada aluno:
- Observações livres por aula
- Elogios e destaques (visíveis para pais/responsáveis)
- Marcos técnicos (primeira raspagem, primeiro choke, etc.)
- Evolução de peso (para categorias de competição)

---

### 10. Graduação — Coração do App ✅ MVP

**Conceito:** o sistema acompanha a jornada de cada aluno e avisa quando está próximo de evoluir.

**Parâmetros base:**
- Jiu-jitsu: padrões IBJJF (tempo mínimo por faixa + presença mínima)
- Judô: padrões CBJ (kyu e dan)

**Configurável:**
- Professor pode ajustar qualquer parâmetro por turma ou por aluno individualmente
- Critérios: tempo na faixa atual + % de presença mínima
- Cálculo automático contínuo

**Fluxo de aviso:**
1. Sistema calcula % de cumprimento dos critérios
2. Alerta ao professor: "João está a 90% dos requisitos para faixa azul"
3. Professor decide quando realizar a cerimônia

---

### 11. Cerimônia de Graduação ✅ MVP

- Registro com data + foto da cerimônia
- Histórico permanente e imutável
- Geração automática de certificado digital (PDF baixável e compartilhável)
- Notificação especial enviada para pais/responsáveis
- Entrada automática na linha do tempo do aluno

---

### 12. Alertas Inteligentes ✅ MVP

O sistema avisa o professor automaticamente:

| Alerta | Condição | Urgência |
|--------|----------|----------|
| Aluno próximo de graduação | Acima de 80% dos critérios | Informativo |
| Presença baixa | Abaixo de 60% no mês | Atenção |
| Aluno sumido | Sem presença há 14+ dias | Urgente |
| Inadimplência | Mensalidade em atraso | Urgente |
| Aniversário do aluno | Dia do aniversário | Celebração |
| Aniversário de entrada | Dia que completou X anos no dojo | Celebração |

---

### 13. Painel Inicial (Dashboard) ✅ MVP

Primeira tela que o professor vê ao abrir o app:

- Total de alunos ativos
- Graduações próximas (top 5)
- Alunos com presença baixa (top 5)
- Aniversariantes do mês
- Receita prevista no mês
- Inadimplência atual (R$ e quantidade)

---

### 14. Controle Financeiro ✅ MVP

**O que tem no MVP:**
- Visão do que recebeu e do que tem a receber
- Histórico de pagamentos por aluno
- Alertas de inadimplência com ação (enviar cobrança)
- Previsão de receita mensal
- Gestão de múltiplos planos
- Formas de pagamento: PIX, cartão de crédito, boleto

**Futuro:**
- Cartão recorrente automático
- Antecipação de recebíveis
- Multi-moeda (internacional)
- Emissão de notas fiscais

---

### 15. Comunicação ✅ MVP

- Canal direto dentro do app (sem precisar de WhatsApp)
- Mensagem individual para aluno
- Mensagem em massa por turma
- Notificações push para eventos, avisos e alertas

---

### 16. Relatório de Evolução do Aluno ✅ MVP

- Linha do tempo completa da jornada
- Tempo total na academia
- Histórico de graduações
- Frequência por período
- **Compartilhável com pais** (link ou PDF)

---

### 17. KPIs Avançados ⏳ FUTURO

- Taxa de retenção mensal
- Taxa de evolução técnica por turma
- Frequência média por aluno
- Receita por aluno (LTV)
- Comparativos mensais e anuais
- Performance por turma
- Funil de captação

---

### 18. Avaliações Públicas ⏳ FUTURO

- Alunos deixam avaliações do professor/academia
- Visível para novos alunos na busca
- Constrói reputação na plataforma

---

### 19. Integrações com Federações ⏳ FUTURO

- IBJJF, CBJJ, CBJ e outras
- Importação automática de resultados de competições
- Histórico oficial vitalício integrado ao perfil do aluno

---

## Referências de UX para Este Perfil

| Produto | O que aprender |
|---------|---------------|
| **Kicksite** | Promoção de faixa em 1 clique — fluxo mais eficiente que o mercado |
| **OnMat** | Dashboard em tempo real, 4.8/5 Capterra — benchmark de satisfação |
| **Zen Planner** | Financeiro completo — referência para o módulo de cobrança |
| **Strava** | Painel de atividades esportivas — referência de UX motivacional |

---

## Decisões Abertas (resolver antes de codar)

- [ ] Professor pode ter múltiplos dojos? (crítico para DB)
- [ ] Nome final do Caderno do Sensei
- [ ] Script de aula é MVP ou Fase 2? (o doc confirma MVP)
- [ ] Qual o limite mínimo de alunos no plano Básico?
- [ ] Offline mode para presença?

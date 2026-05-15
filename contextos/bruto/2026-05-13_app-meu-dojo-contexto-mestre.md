# 🏯 APP MEU DOJO — DOCUMENTO MESTRE DE CONTEXTO
## Versão Final da Sessão de Estruturação
### Pronto para ser usado como contexto inicial em uma nova sessão

---

## 📌 COMO USAR ESTE DOCUMENTO

Este documento contém TODO o contexto, ideias e decisões organizadas da sessão original de estruturação do projeto App Meu Dojo. Para continuar em uma nova sessão:

1. Abra uma nova conversa com Claude
2. Cole este documento inteiro como primeira mensagem (ou anexe o arquivo)
3. Diga: "Esse é o contexto do meu projeto. Continue de onde paramos."
4. Claude assumirá o contexto completo e continuará a estruturação

---

## 🌎 VISÃO GERAL DO PROJETO

**Nome:** App Meu Dojo
**Tagline:** A jornada do seu aluno, na palma da sua mão.

**O que é:** Plataforma internacional (mobile + desktop) de gestão e desenvolvimento de praticantes de judô e jiujítsu — usada por professores e alunos do mundo inteiro, conectando dojos, federações, vendedores e a jornada individual de cada lutador.

**Ecossistema:** Faz parte da Dojo Família Showzy.

**Visão máxima:**
- Alunos pedem para o professor se cadastrar na plataforma
- Professores não conseguem mais imaginar gerir o dojo sem ela
- O ecossistema gera receita para todos — professores, alunos, vendedores, plataforma
- Une gestão + emoção + comunidade + comércio + dados em um só lugar

**Funciona para:** grandes academias profissionais, pequenas academias de bairro, professores autônomos, aulas para crianças em escolas, atletas de carreira internacional, praticantes recreativos.

---

## 🧭 ABORDAGEM DE DESENVOLVIMENTO

- Pensar grande na visão, executar pequeno na entrega
- Começar pelo MVP mais simples e eficiente possível
- Ideias fora do MVP vão para "Ideias Futuras" — nada se perde
- Objetivo: ganhar dinheiro com o app desde o MVP via modelo SaaS

**Três entregáveis finais:**
1. Regras de negócio (este documento)
2. Protótipo visual do app
3. Documento técnico para o desenvolvedor

---

## 🖥️ PLATAFORMA

- Mobile (iOS e Android) — uso principal do professor nas aulas e do aluno no dia a dia
- Desktop (web) — gestão administrativa, financeiro, relatórios
- Sincronização em tempo real
- Multi-idioma e multi-moeda (preparado para internacionalização)

---

## 👥 PERFIS DE USUÁRIO

**MVP:**
1. Professor / Gestor
2. Aluno maior de idade
3. Responsável / Pai de aluno menor

**Visão completa (futuro):**
4. Dono / Administrador da plataforma
5. Vendedor parceiro
6. Vendedor de marketplace
7. Produção / Costureira
8. Federação / Confederação

---

## 💰 MODELO DE NEGÓCIO — SaaS COM 3 PLANOS

**Plano Básico**
- Professor autônomo / escolas pequenas
- Alunos recreativos, sem competição
- Controle simples — alunos, presença, mensalidade, faixa

**Plano Intermediário**
- Academias mistas (recreativos + competitivos)
- Recursos intermediários

**Plano Premium**
- Academias focadas em competição
- Recursos avançados — competições, gestão de equipe, dados completos

**Pagamento:** assinatura mensal recorrente (cartão, boleto, PIX)

**Estratégia de captação:**
- Tráfego pago em redes sociais
- Carrossel de vendas
- Reviews públicas de professores e alunos como prova social

---

# 👨‍🎓 PERSPECTIVA DO ALUNO

## 1. A Chegada do Aluno

**Cenário A — indicado pelo professor** ✅ MVP
Link direto leva à academia dentro do app.

**Cenário B — descobre sozinho** ✅ MVP
Baixa o app, pesquisa por nome ou proximidade, compara, vê avaliações.

## 2. Cadastro Inicial

- Cadastro básico (email, senha, dados pessoais e médicos) ✅ MVP
- Pode pular para apenas explorar academias ✅ MVP
- Cadastro completo obrigatório para matrícula ✅ MVP
- Aluno menor de idade: responsável é o titular ✅ MVP
- Graduação anterior informada ✅ MVP
- Validação automática de certificados externos ⏳ FUTURO

## 3. Exploração de Academias

- Busca por nome ou proximidade ✅ MVP
- Visualização de planos, valores e informações gerais ✅ MVP
- Avaliações públicas de academias ⏳ FUTURO
- Aula experimental com feedback ("gostou? quer ficar?") ✅ MVP

## 4. Matrícula e Pagamento

- Assinatura de plano: cartão, boleto, débito automático ✅ MVP
- Gestão financeira: plano atual, vencimentos, histórico, avisos ✅ MVP

## 5. Entrada na Academia

- Boas-vindas e visualização dos parceiros de equipe ✅ MVP
- Painel inicial: presença, graduação, frequência, observações ✅ MVP
- Status em campeonatos ⏳ FUTURO

## 6. Perfil do Aluno

- Personalização (foto do aluno, do professor, do dojo) ✅ MVP
- Controle de privacidade — aluno escolhe o que outros veem ✅ MVP
- Informações fora da academia (rede maior, eventos, comunidade) ⏳ FUTURO

## 7. Jornada e Evolução (coração emocional)

✅ MVP:
- Linha do tempo da jornada
- Elogios e comentários do professor
- Marcos técnicos
- Notificação de aniversário de entrada na academia
- Álbum de conquistas (card visual por graduação)
- Barra de progresso até a próxima graduação
- Certificado digital de graduação (baixável e compartilhável)

⏳ FUTURO:
- Histórico vitalício oficial integrado às federações

## 8. Uso Diário

✅ MVP:
- Confirmar presença / avisar ausência
- Agenda integrada com lembretes
- Canal direto com professor (sem WhatsApp)
- Notificações inteligentes

## 9. Caderno do Guerreiro ✅ MVP (versão simples)

**Conceito:** cada aula vira uma página do diário pessoal do aluno. Ele anota o que aprendeu, o que aconteceu na aula (começo/meio/fim), o que o professor passou, e pode fazer revisão técnica antes da próxima aula. **Diferencial único — nenhum concorrente tem isso.**

⏳ FUTURO:
- Integração com conteúdo pedagógico do professor
- Tags por técnica, busca, compartilhamento entre colegas

## 10. Conteúdo Pedagógico

✅ MVP:
- Acesso ao script da aula via calendário (revisão antes/depois)

⏳ FUTURO:
- Vídeo-aulas da academia

## 11. Experiência Gamificada

✅ MVP:
- Filosofia visual "como um jogo" — interface atrativa, simples, qualquer pessoa usa

⏳ FUTURO:
- Ranking pessoal e do dojo
- Conquistas desbloqueáveis
- Compartilhamento em redes sociais

## 12. Competições

⏳ FUTURO:
- Histórico de competições, links de lutas, resultados via federações

## 13. Comércio

⏳ FUTURO (Fases 3 e 4):
- Loja, parceiros do professor, marketplace aberto

## 14. KPIs e Relatórios do Aluno

✅ MVP: frequência, graduação, tempo na academia, observações do professor
⏳ FUTURO: indicadores avançados com IA, análise por técnica e posição, calendário completo

---

# 👨‍🏫 PERSPECTIVA DO PROFESSOR / ACADEMIA

## 1. Descoberta do App ✅ MVP
- Tráfego pago, carrossel de vendas, reviews
- Parte do ecossistema Dojo Família Showzy

## 2. Cadastro Inicial

- Tela de entrada com escolha: "Sou professor" ou "Sou aluno" ✅ MVP
- Professor também é usuário comum — pode explorar academias e reviews ✅ MVP
- Cadastro do professor com dados profissionais (graduação, modalidade, experiência) ✅ MVP

## 3. Escolha do Plano (SaaS) ✅ MVP
Três planos: Básico, Intermediário, Premium

## 4. Criação do Dojo ✅ MVP

- Nome, logo, foto/banner, endereço
- Modalidades (Judô, Jiujítsu, ambas)
- Descrição, links do Instagram, YouTube e redes sociais
- Limitações de recursos por plano

⏳ FUTURO: Integração nativa com Instagram, YouTube, federações

## 5. Estrutura Operacional ✅ MVP

- Gestão de turmas por modalidade e horário
- Criação de planos de mensalidade próprios
- Cadastro de alunos: manual, link, importação em massa
- Migração de base de alunos antiga — precisa ser simples e eficiente

## 6. Script e Plano de Aula ✅ MVP

- Criação do plano de cada aula
- **Reutilização** — linkar mesmo script a outras datas
- Script filosófico (essência e valores da aula)
- Feedback da aula (resumo após cada aula)
- **Acesso do aluno ao script** via calendário

## 7. Calendário Integrado ✅ MVP

- Professor define o calendário da academia
- Cada aula tem script anexado
- Aluno acessa e vê o script do dia
- Aluno pode comentar dentro da aula
- Aluno pode referenciar seu Caderno do Guerreiro nos comentários
- Reutilização de scripts em novas datas

## 8. Caderno do Sensei ✅ MVP

*(nome provisório — opções: Caderno do Sensei, Diário do Mestre, Livro do Sensei, Caderno do Tatame)*

- Versão do Caderno do Guerreiro para o professor
- Anotações pessoais, reflexões pedagógicas
- Histórico das aulas dadas com observações
- Diário filosófico e técnico — privado do professor

## 9. Controle de Presença ✅ MVP

- Aluno confirma presença antes da aula
- Aluno avisa ausência mesmo em cima da hora
- Professor pode corrigir
- Justificativas registradas

## 10. Registro por Aluno e por Aula ✅ MVP

- Anotações livres sobre cada aluno
- Elogios e destaques visíveis para pais
- Marcos técnicos (graduações, graus, quilos)

## 11. Graduação — Coração do App ✅ MVP

**Conceito central:** O professor acompanha a jornada individual de cada aluno com base em tempo e presença — e o sistema avisa quando esse aluno está pronto ou se aproximando de uma evolução.

- Parâmetros base: IBJJF (jiujítsu) e CBJ (judô)
- Professor pode ajustar qualquer parâmetro por aluno ou turma
- Critérios: tempo e presença
- Cálculo automático de percentual de presença
- Tudo configurável

## 12. Cerimônia de Graduação ✅ MVP

- Registro com data e foto
- Histórico permanente
- Notificação especial para pais

## 13. Alertas Inteligentes ✅ MVP

- Aluno próximo de graduação
- Aluno com presença baixa
- Aluno sumido (sem presença há X tempo)
- Inadimplência
- Aniversariantes

## 14. Painel Inicial ✅ MVP

- Total de alunos ativos
- Graduações próximas
- Presença baixa
- Aniversariantes do mês
- Receita prevista
- Inadimplência atual

## 15. Controle Financeiro ✅ MVP

- O que recebeu / o que tem a receber
- Histórico de pagamentos
- Alertas de inadimplência
- Previsão de receita
- Múltiplos planos
- PIX, cartão, boleto

⏳ FUTURO: cartão recorrente, antecipação de recebíveis, multi-moeda, emissão fiscal

## 16. Comunicação ✅ MVP

- Canal direto dentro do app
- Mensagens individuais e em massa por turma

## 17. Relatório de Evolução do Aluno ✅ MVP

- Linha do tempo da jornada
- Tempo na academia, graduações, frequência
- Compartilhável com pais

## 18. Datas Importantes ✅ MVP

- Aniversário do aluno
- Aniversário de entrada na academia
- Lembretes para reforçar o vínculo

## 19. KPIs e Relatórios

✅ MVP básico: total de alunos, graduações próximas, inadimplência, receita prevista

⏳ FUTURO:
- Taxa de retenção
- Taxa de evolução técnica
- Frequência média
- Receita por aluno
- Comparativos mensais e anuais
- Performance por turma
- Funil de captação
- Avaliações recebidas dos alunos

## 20. Avaliações Públicas do Professor ⏳ FUTURO

- Constrói reputação na plataforma
- Atrai novos alunos

## 21. Competições e Federações ⏳ FUTURO

- IBJJF, CBJJ, CBJ e outras
- Resultados importados automaticamente
- Histórico oficial vitalício

## 22. Inteligência Artificial ⏳ FUTURO

- Análise de lutas
- Relatório de desenvolvimento

## 23. Ecossistema Comercial ⏳ FUTURO (Fases 3 e 4)

- Parcerias com vendedores (comissão)
- Marketplace aberto

---

# 🔍 ANÁLISE DE MERCADO — CONCORRENTES

**Principais players:**
- BJJ Control — instabilidade nas atualizações
- DojoApp — foco financeiro, voltado para grandes academias
- MyBelt — genérico, só jiujítsu
- Kanri — não notifica antes da aula
- BlackBelt — gamificado mas complexo
- Base BJJ — foco 100% jiujítsu
- NextFit — referência em financeiro, mas genérico

**Diferenciais reais do App Meu Dojo:**
1. Vínculo emocional com a família (álbum de conquistas, certificados)
2. Anotações qualitativas por aula (diário de desenvolvimento)
3. Foco simultâneo em Judô e Jiujítsu
4. Estabilidade e simplicidade
5. Comunicação dentro do app
6. Visão internacional desde a concepção
7. Integração com federações (futuro)
8. Ecossistema de comércio que gera receita para o professor
9. Gamificação respeitosa e motivacional
10. KPIs e dados estratégicos para todos os perfis
11. **Caderno do Guerreiro e Caderno do Sensei — únicos no mercado**

---

# 📋 FASES DO PRODUTO

| Fase | O que é |
|---|---|
| **1 — MVP** | Gestão completa de alunos, turmas, graduações, financeiro, comunicação, cadernos, calendário, certificado digital |
| **2 — Crescimento** | Integração com federações, KPIs avançados, gamificação, vídeos de lutas |
| **3 — Parceiros** | Vendedores parceiros do professor, comissões |
| **4 — Marketplace** | Marketplace aberto, comércio internacional |
| **5 — Inteligência** | IA para análise de lutas, recomendações, previsões |

---

# 🔮 IDEIAS FUTURAS — REGISTRADAS

**Presença:**
- Reconhecimento facial
- Registro via foto do treino em grupo
- QR Code para check-in presencial

**Documentação:**
- Upload e validação de certificados externos

**Loja e Comércio:**
- Loja do professor (produtos próprios, aulas, cursos)
- Parcerias com vendedores (Fase 3)
- Marketplace aberto (Fase 4)
- Cupons e descontos exclusivos

**Módulo de Produção:**
- Perfil específico para costureiras
- Ordens de serviço pelo app
- Status de pedidos

**Integração com Federações:**
- IBJJF, CBJJ, CBJ e outras
- Resultados automatizados
- Histórico oficial vitalício
- Certificados validados

**Vídeos de Lutas:**
- Link das lutas no perfil
- Galeria pessoal

**Avaliação por IA:**
- Análise técnica das lutas
- Feedback automático para aluno
- Relatório de desenvolvimento

**Financeiro Avançado:**
- Pagamento recorrente em cartão
- Multi-moedas
- Antecipação de recebíveis
- Emissão fiscal

**Engajamento:**
- Vídeo-aulas
- Ranking pessoal e do dojo
- Gamificação completa
- Mural da academia
- Modo competição
- Compartilhamento em redes sociais

**Internacional:**
- Multi-idioma
- Multi-moeda
- Conformidade regional

---

# ⬜ PERSPECTIVAS AINDA A MAPEAR

- **Dono / Criador do app** — administração da plataforma global, suporte aos professores, parcerias
- **Perspectiva Comercial** — modelo de negócio detalhado, preços, estratégia de venda
- **Perspectiva do Vendedor** — UX do parceiro e do marketplace
- **Perspectiva da Federação** — UX institucional

---

# 🎯 POSICIONAMENTO ESTRATÉGICO

**Não é "mais um sistema de gestão de academia".**

É uma **plataforma de jornada do lutador** — conectando professor, aluno, família, comércio e federações em um único ecossistema:

- **Profissional** para o professor
- **Emocional** para a família
- **Motivadora** para o aluno
- **Lucrativa** para todos os envolvidos
- **Global** desde a concepção

---

# 📝 PRÓXIMOS PASSOS PARA A PRÓXIMA SESSÃO

1. Validar o nome do Caderno do Sensei
2. Confirmar promoção do "acesso ao script da aula" para MVP
3. Mapear a perspectiva do dono/criador da plataforma
4. Mapear a perspectiva comercial
5. Iniciar a estruturação técnica do MVP
6. Criar o protótipo visual
7. Preparar o documento técnico para o desenvolvedor

---

# 📌 OBSERVAÇÕES IMPORTANTES DA SESSÃO

- Tudo deve ser pensado em grande na visão, mas executado pequeno no MVP
- O criador é professor e dono de academia — testa o app no próprio dojo antes de vender
- O objetivo é ganhar dinheiro com o app via SaaS desde o MVP
- Próxima sessão será no computador para estruturar o MVP de fato
- Sessão posterior será para começar a codar

---

*Documento mestre do App Meu Dojo.*
*Versão final da sessão de estruturação inicial.*
*Pronto para ser usado como contexto base em uma nova sessão.*

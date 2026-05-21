# **Meu Dojo — Detalhamento de Fluxos e Funcionalidades (Versão Final MVP)**

Este documento organiza, estrutura e complementa as ideias de fluxos operacionais para o aplicativo Meu Dojo, focando na rotina diária do professor, no gerenciamento de aulas, interação com alunos, gestão financeira e modelo de adoção. O foco é manter o escopo enxuto para a primeira versão, garantindo funcionalidades que retêm os usuários logo nos primeiros 30 dias.

## **1\. Visão Geral das Aulas do Dia (Dashboard Principal do Professor)**

O ponto de partida diário do professor ao abrir o aplicativo. Apresenta uma visão cronológica e clara do dia de trabalho.

| Elemento Visual | Descrição da Funcionalidade | Complemento Sugerido   |
| :---- | :---- | :---- |
| **Timeline Cronológica** | Lista de todas as aulas agendadas para a data atual, ordenadas por horário de início. | Indicador visual de "Aula Atual". |
| **Identificação da Turma** | Exibição clara do nome da turma (ex: Infantil A, Adulto Avançado). | Tag com a modalidade ou foco da turma. |
| **Contador de Alunos e RSVP** | Métrica rápida mostrando o total de alunos matriculados e quantos já confirmaram presença via app. | Indicadores visuais de avisos prévios deixados pelos alunos. |

### **1.1. Lista de Alunos e Controle de Presença (Diário de Classe)**

Ao selecionar uma aula do dia, o professor acessa a lista específica de alunos daquela turma.

* **Cards dos Alunos:** Exibe a foto do aluno, nome, graduação atual e o status de presença. Se o aluno marcou "Não Vou" no seu app, o sistema já reflete a ausência, mas o professor pode sobrescrever (editar) caso o aluno acabe comparecendo de surpresa.  
* **Modal de Resumo Rápido e Alertas:** Ao clicar no aluno, abre-se um pop-up com as informações essenciais. Se o aluno/responsável enviou um aviso prévio (ex: "Estou com o dedo machucado, vou treinar leve" ou "Doente, não vou"), um ícone de alerta vermelho/amarelo brilha no card e o aviso aparece em destaque no modal. O status financeiro discreto também aparece aqui.  
* **Ação de Presença Simplificada:** Switch para marcar presente/ausente de forma ágil.

### **1.1.1. Ficha Completa do Aluno e Gestão de Graduação**

Caso o professor clique em "Ver Perfil Completo", ele acessa o cadastro avançado:

* **Dados Pessoais, Contato e Médicos:** Informações completas do aluno e contatos de emergência do responsável.  
* **Gestão Manual de Graduação:** Além do cálculo automatizado do sistema, o professor tem a liberdade de entrar no perfil a qualquer momento para atualizar a faixa do aluno ou adicionar os graus conquistados.  
* **Histórico e Métricas:** Gráficos de evolução e tempo de permanência em cada faixa.

### **1.2. Objetivos e Planejamento Pedagógico da Aula**

O aplicativo atua como o guia técnico do professor.

* **Objetivos do Dia e Gerais:** Foco da aula e do ciclo letivo. O professor pode anexar vídeos, links ou temas específicos para enriquecer a aula e torná-los visíveis para os alunos no app deles.  
* **Edição Rápida:** Botão de ajuste rápido para alterar o foco da aula diretamente pelo celular.

## **2\. Fechamento do Dia (Resumo e Avaliação Pós-Aula)**

Ao final do expediente, o professor encerra o dia e consolida os dados.

| Bloco do Resumo | Dados Coletados / Exibidos   |
| :---- | :---- |
| **Consolidado e Frequência** | Lista de turmas, horas de tatame ativas e alunos que efetivamente treinaram. |
| **Avaliação do Planejamento** | Pergunta binária: "Foi possível cumprir o planejamento para hoje? (Sim/Não)". |
| **Observações do Tatame (Geral)** | Anotações gerais sobre o andamento e o clima da turma. |
| **Feedback Individual** | O professor pode selecionar alunos específicos daquela aula e deixar observações ou feedbacks direcionados (elogios, pontos de correção). Isso será enviado direto para o app do aluno. |

## **3\. Visão do Aluno e do Responsável (O App do Aluno)**

O ecossistema interativo que conecta quem treina (ou quem paga) com o andamento das aulas do dojo. Este é o diferencial do MVP para gerar engajamento.

* **Pré-Aula (Agenda e Check-in):** Visualização de cronograma, temas da aula e envio ativo de Confirmação de Presença (RSVP) com possibilidade de envio de mensagens curtas/avisos ao Sensei.  
* **Pós-Aula (Resumo e Interação):** Recebimento do resumo da aula, feedbacks direcionados pelo professor e possibilidade de o aluno/responsável responder ao Sensei.  
* **Caderno de Treino Online (Caderno do Guerreiro):** Espaço particular para o aluno registrar anotações sobre sua própria evolução e consultar seu histórico completo de aulas.

## **4\. Gestão Financeira e Mensalidades**

Um módulo projetado para resolver a inadimplência e desorganização financeira, preservando o bom relacionamento entre Sensei, aluno e responsável por meio da simplicidade e da privacidade.

### **4.1. A Experiência do Aluno / Responsável (Privacidade e Praticidade)**

* **Status Imediato (Sem Fricção):** Ao abrir o app, a situação é comunicada visualmente: "Em Dia" (Verde), "Vence em X dias" (Amarelo), ou "Pendente/Atrasado" (Vermelho).  
* **Pagamento Rápido (1 Clique):** O app exibe notificações interativas. Com apenas um clique, o aluno/responsável pode gerar o "Pix Copia e Cola" ou efetuar o pagamento rapidamente, reduzindo o atrito para quem não usa débito automático.  
* **Privacidade e Segurança:** O professor gerencia cobranças, mas não tem acesso a dados bancários sigilosos. Apenas o status de pagamento é compartilhado.  
* **Histórico e Comprovantes:** Lista completa de pagamentos efetuados com opção de baixar recibos.

### **4.2. A Visão do Professor (O "Financeiro do Dojo")**

* **Dashboard Centralizado:** Exibição de Receita Prevista, Receita Realizada e Inadimplência.  
* **Controle de Negociações Humanizado:** Status editável para "Negociado/Acordo". Pausa as notificações de cobrança automática e altera a cor no painel se o aluno avisou do atraso verbalmente.  
* **Discrição no Tatame:** O status da mensalidade aparece sutilmente no Modal de Resumo Rápido da lista de presença, dando contexto ao professor sem expor o aluno.

## **5\. Onboarding e Modelo de Adoção (Go-to-Market)**

Estratégia para reduzir a barreira de entrada e construir confiança com o professor antes da cobrança.

* **Trial de 30 Dias (Risco Zero):** O professor pode iniciar o uso do sistema completo gratuitamente, transacionando dinheiro real e gerando links de PIX para testar na prática a redução da inadimplência.  
* **Portabilidade:** Garantia de exportação completa de dados se decidir não assinar, eliminando o medo de ficar "preso".

## **6\. Aspectos Transversais Essenciais (Complementos para o MVP)**

Para garantir que esse ecossistema funcione sem falhas no lançamento, os seguintes pontos estruturais complementares foram adicionados:

* **Canal de Suporte e Feedback (Bug Report):** Um botão no app de fácil acesso para que os primeiros usuários (professores e alunos) possam reportar bugs ou dar sugestões direto para o desenvolvedor, acelerando a melhoria do sistema.  
* **Infraestrutura de Notificações (Push e Email):** Para que a função de RSVP e avisos rápidos funcione em tempo real, as Push Notifications são cruciais. Para questões financeiras (recibos e faturas), envios de fallback por email são essenciais.  
* **Privacidade e Tratamento de Dados (Foco Infantil):** Uma tela simples de "Termos de Uso e Consentimento" no primeiro acesso, essencial pois o aplicativo lida com dados de saúde e presença de menores de idade informados pelos pais.  
* **Recuperação de Acesso Simplificada:** Fluxo automatizado de "Esqueci minha senha" para evitar gargalos operacionais e sobrecarga de suporte logo no início do uso.
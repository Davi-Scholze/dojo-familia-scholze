# 10 Decisões MVP + Análise do fluxo de desenvolvimento desejado

> Bruto sagrado (Regra 2). Input do Davi sessão 4 de 2026-05-21 após mapeamento FaceDojo + Next Fit.
> Contexto: respostas às 10 decisões pendentes + restrição financeira + visão sobre fluxo orgânico de dev com KOD.AI.

## Respostas às 10 decisões

| # | Decisão | Resposta | Nota adicional |
|---|---|---|---|
| 1 | Facescan via WhatsApp no MVP? | **Incluir + simplificar** | "Talvez deixar só dentro do sistema... tira foto pelo app e dali compartilha no WhatsApp se quiser. Vamos pesquisando" |
| 2 | Internacionalização? | **Mais idiomas** | (estrutura i18n desde MVP, traduz vários — não só PT-BR) |
| 3 | Stack face recognition | **Recomendação aceita** | MAS lente custo deve revisar (ver restrição abaixo) |
| 4 | Dunning recuperação pagamento | **Sim, com recuperação** | (Asaas retry + fallback PIX) |
| 5 | Avaliações físicas (toggle) | **Sim** | |
| 6 | Alertas preditivos churn | **Sim** | |
| 7 | Métricas próprias tracking | **Sim** | |
| 8 | CRM + funil de vendas | **Com CRM** | NO MVP, não Fase 2 |
| 9 | Pricing transparente | **Manter público** | |
| 10 | Marketing message principal | **(a) plataforma completa** | "Mas isso não é o mais importante pra agora" |

## Restrição financeira GERAL (princípio crítico)

> "Lembre que não tenho muito dinheiro para agora... eu ganharia vendendo o sistema"

**Implicação operacional:**
- Custo fixo o mais baixo possível no MVP
- Evitar custos variáveis altos (que crescem com escala)
- Self-host quando possível vs. managed services
- Free tier de fornecedores até primeira receita
- Escalar infra conforme receita real (não pré-otimizar)
- Receita virá de vender o sistema (R$80-450/mês × N academias)

## Próximo concorrente

Davi disse "Pronto, pode ir para o próximo" mas **NÃO mandou nome novo**.
Mapeados até agora: FaceDojo + Next Fit (todos os concorrentes que ele forneceu no início).
KOD.AI precisa pedir próximo nome/URL.

## Análise solicitada pelo Davi

### 1. KOD.AI pede mais contexto quando precisa?
- Links, prints, fotos, vídeos
- Sugerir CRIAR contexto também (dos concorrentes — ex: notebook novo via Deep Search)

### 2. Visão de fluxo de desenvolvimento desejado

Davi descreve assim (literalmente):

> "Passo o máximo de contexto bruto → KODAI arruma tudo e já cria um mapa → vou dando contexto IA vai arrumando tudo ao mesmo tempo no mapa e esqueleto principal. Depois que o esqueleto já está minimamente pronto, fluxo também, com isso temos o mapa — aí seguimos criando pra valer, criamos, testamos, pegamos referências, testamos, criamos, mudamos, implementamos — tudo isso de forma orgânica mas de forma que em tempo real a IA possa ir espelhando tudo isso em contexto, de forma que a gente não perca contextos, saiba que 'esse descartamos', 'esse melhoramos', 'esse está funcionando'. Entendeu?"

**Pergunta direta:** "Para isso gostaria de saber se na verdade com o KODAI isso tudo já é possível e muito mais?"

### 3. Outros itens importantes

#### 3.1 Gestão financeira completo e fácil
(reforço do que já está no escopo MeuDojo)

#### 3.2 Pack/contexto universal NOVO sugerido
- **"Teste de penetração - contexto universal para testar segurança dos sistemas feitos com KODAI"**
- Candidato a pack `seguranca/pentest-automated` no upstream

#### 3.3 Pergunta sobre capacidade de KODAI lidar com contextos multi-uso
- "Você sabe lidar com os contextos de forma perfeita?"
- "Exemplo: Mandei uma foto... vc consegue entender se vc pode usar isso como referência para design futuro e ao mesmo tempo pegar o conteúdo?"

#### 3.4 Workflow desejado pra atendimento de cliente
Davi descreve:

> "Pego referências visuais do meu clientes, prints... copio e colo coisas, links... a partir disso o KODAI já mapeia e entende o atual, com isso já pesquisa o melhor, para chegarmos ao cliente com a proposta TOP, claro, tudo isso o dev vai ir melhorando e buscando outras referências"

**Candidato a skill nova:** `/proposta-cliente` no upstream KOD.AI

## Próximas ações sugeridas (pra esta sessão ou próxima)

1. Aplicar as 10 decisões nos contextos relevantes (universal + específico MeuDojo)
2. Re-avaliar Decisão 3 (face recognition) sob lente de custo → propor CompreFace self-hosted
3. Pedir próximo concorrente pro Davi
4. Responder honestamente sobre KOD.AI atual vs. fluxo desejado
5. Registrar pendências novas: pack pentest, skill /proposta-cliente, skill /pedir-contexto, skill /espelhar

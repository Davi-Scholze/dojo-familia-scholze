# Visão revisada do MeuDojo + Regra crítica "não perder contextos"

> Bruto sagrado (Regra 2 KOD.AI). Input do Davi sessão 4 de 2026-05-21
> após mapeamento Kicksite + reporte limitação WebFetch OnMat/Kimono.
> Esse contexto MUDA significativamente a estratégia do MeuDojo.

## 1. Visão revisada — o que MeuDojo realmente é

Davi clarificou (texto original, preservado):

> "Quero arrumar e definir / quero sua opnião sobre algo: Eu falei do app meudojo… varias coisas… mas o que eu realmente queria: **Um modelo muito bom mas adaptável para eu vender sistemas completos para as academias de Judô e Jiujitsu**… de forma que na venda da proposta eu consiga valores bem altos como de **15k… 5k… 1k… 20k…** e aí **além disso ainda tivesse recorrência…** como você pode ver, com alguns concorrentes da KODAI fazem, o pessoal hoje consegue ganhar bastante dinheiro assim… vendendo os sistemas completos ou mais completos ainda vendendo o sistema + frameworks… e ainda as vezes conseguem mensalidades. **Se eu fizer apps genéricos demais não consigo oferecer personalização, não consigo por muito valor em cima**… minha vontade hoje ainda não é app generalizado é **uma base boa e funcional testada mas que posso personalizar deixar grande ou pequena em questão de funcionalidades** que eu posso negociar com um professor de colégio a academias grandes."

### Síntese do que isso significa

- **MeuDojo NÃO é SaaS B2B puro** (modelo Kicksite/Next Fit) com pricing tabelado R$80-450/mês
- **MeuDojo É:** base sólida adaptável vendida como **PROJETO PERSONALIZADO** com tickets R$1k-20k + recorrência opcional
- **Modelo de venda híbrido** inspirado no Kelvin Cleto / DFY-DWY-DIY (já mapeado em `KODAI/2-PACKS/packs/comercial/modelos-venda-ia`)
- **Escalável:** desde professor de colégio (ticket menor, escopo enxuto) até academia grande (ticket maior, escopo completo)
- **Diferenciação por personalização** = preserva margem alta (não comoditiza)

### Tickets-alvo declarados

| Ticket | Provável escopo | Cliente típico |
|---|---|---|
| R$1k | Setup mínimo + treinamento (DIY com base) | Professor autônomo |
| R$5k | Setup médio + customização leve + onboarding | Academia pequena (≤30 alunos) |
| R$15k | Setup completo + customização média + integração federação + suporte 6 meses | Academia média (30-100 alunos) |
| R$20k+ | Tudo + multi-dojo + parcerias institucionais + suporte premium | Academia grande/rede |
| **Recorrência** | Mensalidade pós-projeto (manutenção + features novas + suporte) | Todos os tickets acima |

### Como muda o roadmap MeuDojo

| Antes (SaaS genérico) | Agora (modelo adaptável vendável) |
|---|---|
| 1 produto fechado | Base sólida + **módulos opcionais** |
| Gating por plano (R$80/150/350) | **Escopo por proposta** (cada cliente diferente) |
| Self-service trial sem cartão | Venda consultiva + proposta + setup + treinamento |
| Captura via Instagram Ads | Captura via rede do Davi/Cristiano + indicação |
| Onboarding self-service | Onboarding humano (consultoria embutida) |
| Receita: mensalidade × N clientes | Receita: ticket projeto + mensalidade |

**Implicação técnica crítica:** features precisam ser **modulares de verdade** (ligadas/desligadas por cliente sem fork de código). Cada deploy = config específica do cliente.

## 2. Regra crítica nova: KOD.AI NÃO pode perder contextos

Davi escreveu (texto original):

> "KODAI não pode perder contextos para atrás, pedidos, dúvidas… pequenos ou grandes. **situação comum: Eu mando mensagem em vários tópicos com várias coisas, IA analisa e ordena, começa a fazer e às vezes perde 2 ou 3 contextos deixados para trás. isso n pode acontecer.**"

> "sei que andei bastante contexto, mas **não perca nem um por favor!!**"

### Implicação operacional

- TODO ponto de mensagem do Davi deve virar TODO/pendência ANTES de processar qualquer um
- Usar `TodoWrite` no início de QUALQUER mensagem que tenha 2+ pontos distintos
- Marcar cada ponto como completed somente quando endereçado (não acumular)
- Sinalizar honestamente se algum ponto vai ficar pra próxima sessão (não silenciar)
- Se mensagem tem 7 pontos e eu só processo 4, devo IMEDIATAMENTE listar os 3 não-processados antes de fechar a resposta

### Memória persistente derivada

Criar memory `feedback_nao_perder_contextos.md` em
`C:\Users\usuario\.claude\projects\c--Users-usuario-Documents-Projetos-Dev-Pessoais\memory\`.

Conteúdo essencial:
- Regra: NUNCA deixar ponto da mensagem sem processamento
- Como aplicar: TodoWrite no início + cada ponto vira tarefa + marcar conforme processado
- Padrão de falha observado pelo Davi: "IA começa a fazer e perde 2-3 contextos no caminho"
- Mitigação: enumerar todos os pontos no início da resposta + processar em ordem

## 3. Pedido explícito do Davi

> "Quero arrumar e definir / **quero sua opnião sobre algo**"

Davi pede opinião consultiva sobre o modelo de venda revisado. Resposta deve:
- Reconhecer o modelo (DFY/DWY/DIY + framework + recorrência)
- Comparar com modelo Kelvin Cleto (já mapeado)
- Apontar trade-offs honestos
- Recomendar caminho
- Identificar risco

## 4. Decisão sobre próxima frente

Davi respondeu **"C"** à pergunta anterior:

> "Pausa concorrentes, segue pra outra frente (criar uma das 4 skills novas que propus? Pack pentest? Skill /proposta-cliente?)"

= concorda em PAUSAR mapeamento de concorrentes e atacar outra frente.

Frentes candidatas (das que foram propostas):
- **Skill /pedir-contexto** — KOD.AI pede ativo quando detecta gap
- **Skill /espelhar** (ou hook PostToolUse) — atualiza mapa/handoff em tempo real
- **Skill /status-decisao** — marca features como descartado/em-progresso/funcionando
- **Skill /proposta-cliente** — workflow completo proposta TOP pra cliente
- **Pack seguranca/pentest-automated** — contexto universal pra testar segurança dos sistemas KOD.AI

## 5. Pontos a endereçar nesta sessão (resumo)

1. ✓ Salvar bruto (este arquivo)
2. ⏳ Memory `feedback_nao_perder_contextos`
3. ⏳ Atualizar memory `project_dojo` (nova visão)
4. ⏳ Atualizar conceito universal `verticalizacao-saas-b2b` (modelo híbrido)
5. ⏳ Criar `modelo-de-venda-2026-05-21.md` no repo dojo
6. ⏳ Atualizar PENDENCIAS.md pasta-mãe
7. ⏳ Commit + push tudo
8. ⏳ Opinião consultiva sobre modelo de venda
9. ⏳ Comparar com Kelvin Cleto (já mapeado)
10. ⏳ Recomendar próxima frente C
11. ⏳ Explicar impacto no roadmap MeuDojo (modular vs gating)

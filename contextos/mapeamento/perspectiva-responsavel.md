# Perspectiva do Responsável / Pai de Aluno Menor — App Meu Dojo
> Mapa completo da experiência do responsável na plataforma.
> Fonte: App_Meu_Dojo_Contexto_Mestre.md + expansão própria (perspectiva não totalmente mapeada no doc original)
> Última atualização: 2026-05-13

---

## Quem é esse usuário

Pai, mãe ou responsável legal de um aluno menor de idade (até 17 anos). Na plataforma, o responsável é o **titular do cadastro** do menor — a criança não tem login próprio.

**Contexto emocional:** este usuário é frequentemente o maior promotor do app. Quando o filho recebe o certificado de graduação, o pai compartilha em grupo de família. Quando vê o elogio do professor, vira fã da academia. O responsável é a porta de entrada para indicações e o principal motivo de renovação da matrícula.

---

## Como Chega ao App ✅ MVP

- Indicado pelo professor (link da academia)
- Já baixou porque o filho pratica e o professor pediu

---

## Fluxo Completo (MVP)

### 1. Cadastro do Responsável ✅ MVP

O responsável cria a conta — não o menor:

- Email e senha do responsável
- Nome completo do responsável
- CPF e relação com o menor (pai, mãe, avó, tutor)
- Telefone para notificações urgentes

**Dados do aluno menor (inseridos pelo responsável):**
- Nome completo da criança
- Data de nascimento
- Foto (opcional)
- Dados médicos: condições de saúde, alergias, medicações, restrições físicas
- Contato de emergência secundário

**LGPD — fluxo obrigatório:**
- Termo de consentimento para coleta de dados do menor (Lei 13.709/2018, art. 14)
- Aceite explícito de autorização de atividade física
- Assinatura digital do responsável com data e hora registradas
- **⚠️ Decisão técnica:** esse termo precisa ser armazenado e auditável — nunca deletável

---

### 2. O que o Responsável Vê ✅ MVP

O responsável tem acesso a um painel focado no filho:

**Presença:**
- Histórico de presenças e ausências
- Taxa de frequência do mês e acumulada

**Jornada e evolução:**
- Linha do tempo completa (mesma que o aluno vê)
- Graduação atual e progresso para a próxima
- Certificados de graduação baixáveis

**Feedbacks do professor:**
- Elogios e observações registradas pelo professor
- Marcos técnicos

**Financeiro:**
- Plano atual e valor
- Próximo vencimento
- Histórico de pagamentos
- Avisos de inadimplência

**O que o responsável NÃO vê:**
- Dados de outros alunos
- Anotações privadas do professor sobre outros alunos
- Caderno do Guerreiro (é do filho — privacidade dele)

---

### 3. Notificações Especiais ✅ MVP

O responsável recebe notificações prioritárias:

| Evento | Notificação |
|--------|------------|
| Graduação do filho | Push + email + card comemorativo |
| Aniversário de entrada no dojo | Push comemorativo |
| Elogio do professor | Push com a mensagem |
| Ausência não justificada | Push informativo |
| Mensalidade próxima do vencimento | Push + email |
| Inadimplência | Push + email |

---

### 4. Comunicação com o Professor ✅ MVP

- Canal de mensagens dentro do app
- Responsável pode mandar mensagem para o professor
- Professor pode responder diretamente
- Histórico registrado (sem depender de WhatsApp)

---

### 5. Pagamento ✅ MVP

- O responsável paga a mensalidade do filho
- Cartão de crédito, boleto, PIX
- Recorrência automática (débito mensal)
- Recibo digital para cada pagamento

---

### 6. Cadastro de Múltiplos Filhos ✅ MVP

- Uma conta pode ter múltiplos menores vinculados
- Ex: dois irmãos na mesma academia, ou em academias diferentes
- Alternância simples entre perfis de filhos

---

## Diferencial Emocional para o Responsável

Este perfil é o que mais gera **viralização orgânica** do app.

| Momento | Impacto |
|---------|---------|
| Certificado de graduação chegando no celular | "Eu nunca tive isso quando eu era criança" |
| Elogio do professor visível no app | Compartilhamento em grupo de família |
| Linha do tempo com todas as conquistas do filho | Memória emocional — nunca vai desinstalar |
| Presença e frequência visíveis | Transparência que gera confiança na academia |

---

## LGPD — Regras Específicas para Menores

A Lei 13.709/2018, artigo 14, exige:

1. **Consentimento explícito** do responsável para qualquer dado do menor
2. **Dados de saúde** são dados sensíveis — tratamento diferenciado
3. **Direito ao esquecimento** — responsável pode solicitar exclusão de todos os dados do menor
4. **Portabilidade** — responsável pode exportar os dados do filho
5. **Acesso** — responsável pode ver todos os dados coletados sobre o filho

**Fluxo técnico obrigatório:**
- Termo de consentimento armazenado com timestamp e versão do documento
- Log de alterações nos dados do menor
- Fluxo de exclusão de dados implementado desde o MVP

---

## Decisões Abertas

- [ ] O aluno menor tem login próprio quando completa 18 anos? (migração de conta)
- [ ] Responsável pode ver o Caderno do Guerreiro do filho? (privacidade vs. transparência)
- [ ] Múltiplos responsáveis podem ser cadastrados para o mesmo aluno? (pais separados)
- [ ] O professor pode comunicar-se com responsável e aluno menor separadamente?

# Perspectiva do Aluno — App Meu Dojo
> Mapa completo da experiência do aluno na plataforma.
> Fonte: App_Meu_Dojo_Contexto_Mestre.md
> Última atualização: 2026-05-13

---

## Quem é esse usuário

Praticante de judô ou jiu-jitsu, maior de idade (18+). Alunos menores têm um responsável como titular — ver `perspectiva-responsavel.md`.

**Perfis:**
- Aluno recreativo (pratica por saúde, hobby, autodefesa)
- Aluno competitivo (participa de campeonatos, busca evolução técnica acelerada)
- Aluno que retornou às artes marciais (teve pausa na vida adulta)

---

## Como Chega ao App

**Cenário A — indicado pelo professor** ✅ MVP
- Professor envia link direto para a academia dentro do app
- Aluno baixa, abre o link, cai diretamente na página da academia

**Cenário B — descobre sozinho** ✅ MVP
- Baixa o app por conta própria
- Pesquisa academia por nome ou por proximidade geográfica
- Compara academias, vê informações e decide

---

## Fluxo Completo (MVP)

### 1. Cadastro Inicial ✅ MVP

**Dados básicos:**
- Email e senha
- Nome completo, data de nascimento
- Foto de perfil (opcional)

**Dados médicos (privados):**
- Condições de saúde relevantes para atividade física
- Alergias, medicações
- Visível apenas para o professor — nunca para outros alunos

**Graduação anterior:**
- Informa faixa atual e modalidade (se já praticou antes)
- Validação automática de certificados externos ⏳ FUTURO

**Flexibilidade:**
- Pode pular o cadastro completo para apenas explorar academias ✅ MVP
- Cadastro completo é obrigatório para fazer matrícula ✅ MVP

---

### 2. Exploração de Academias ✅ MVP

- Busca por nome da academia
- Busca por proximidade (geolocalização)
- Visualiza planos, valores e informações gerais
- Avaliações públicas de outros alunos ⏳ FUTURO
- Solicitar aula experimental ✅ MVP

**Aula Experimental ✅ MVP:**
- Aluno se inscreve para aula experimental
- Após a aula: feedback automático ("Gostou? Quer ficar?")
- Se sim: inicia fluxo de matrícula direto

---

### 3. Matrícula e Pagamento ✅ MVP

- Escolha do plano de mensalidade oferecido pela academia
- Formas de pagamento: cartão de crédito, boleto, PIX
- Débito automático recorrente ✅ MVP

**Gestão financeira do aluno:**
- Plano atual e valor
- Próximo vencimento
- Histórico de pagamentos
- Avisos de cobrança em atraso

---

### 4. Entrada na Academia ✅ MVP

Primeira tela após a matrícula:
- Mensagem de boas-vindas do professor
- Visualização dos parceiros de equipe (colegas de turma)
- Painel pessoal: presença, graduação, frequência, observações do professor

---

### 5. Perfil do Aluno ✅ MVP

**Personalizável:**
- Foto do aluno
- Foto do professor e do dojo (identificação visual)
- Apelido/nome de guerra (opcional)

**Controle de privacidade:**
- Aluno escolhe o que outros alunos podem ver
- Dados médicos: nunca visíveis para outros alunos
- Progresso técnico: visível, oculto ou só para o professor

---

### 6. Jornada e Evolução — Coração Emocional ✅ MVP

Este módulo é o principal diferencial do app na visão do aluno.

**Linha do tempo da jornada:**
- Cada marco registrado cronologicamente
- Graduações, elogios do professor, primeiras técnicas, eventos

**Álbum de conquistas:**
- Card visual por graduação
- Fotos da cerimônia de graduação
- Compartilhável em redes sociais ⏳ FUTURO

**Barra de progresso:**
- Percentual de cumprimento dos critérios para a próxima faixa
- Baseado em tempo na faixa atual + presença

**Certificado digital de graduação:**
- Gerado automaticamente após cada graduação
- Baixável em PDF, compartilhável por WhatsApp/Instagram
- Com dados da academia, professor, data e assinatura digital

**Elogios e comentários do professor:**
- Visíveis na linha do tempo do aluno
- Notificação especial quando o professor deixa um elogio

**Marcos técnicos:**
- Professor registra: "João executou o ippon seoi nage perfeitamente pela 1ª vez"
- Visível na linha do tempo do aluno

**Notificação de aniversário de entrada:**
- "Hoje faz 1 ano que você entrou no dojo!" + card comemorativo

---

### 7. Uso Diário ✅ MVP

**Confirmar presença:**
- Aluno confirma que vai para a aula antes de sair de casa
- Registra ausência com justificativa mesmo em cima da hora

**Agenda integrada:**
- Calendário com os horários das turmas do aluno
- Lembretes automáticos (X horas antes da aula)

**Canal direto com o professor:**
- Mensagem dentro do app
- Sem precisar de WhatsApp ou email

**Notificações inteligentes:**
- Lembrete de aula
- Aviso de ausência registrada
- Novidade na linha do tempo
- Elogio do professor

---

### 8. Caderno do Guerreiro ✅ MVP (versão simples)

**Conceito:** cada aula vira uma página do diário pessoal do aluno.

**O aluno registra:**
- O que aprendeu na aula (técnica principal)
- O que aconteceu (começo, meio e fim da aula)
- O que o professor passou
- Reflexão pessoal (como se sentiu, o que quer melhorar)

**Para que serve:**
- Revisão técnica antes da próxima aula
- Memória emocional da jornada
- Material para o professor entender a percepção do aluno

**Por que é único:** nenhum concorrente tem isso. É o principal motivo do aluno não desinstalar o app.

**Futuro:**
- Integração com conteúdo pedagógico do professor
- Tags por técnica (busca "quando aprendi o armlock?")
- Compartilhamento entre colegas
- Busca por todas as entradas

---

### 9. Acesso ao Script da Aula ✅ MVP

- Via calendário integrado, aluno vê o plano da aula do dia
- Pode revisar o script antes de ir para a aula
- Pode revisar depois da aula
- Pode comentar dentro da aula (visível para o professor)
- Pode referenciar o Caderno do Guerreiro nos comentários

---

### 10. Experiência Gamificada ✅ MVP (visual)

- Interface visual "como um jogo" — atrativa, simples, qualquer pessoa usa
- Barra de progresso de graduação como mecânica de jogo
- Álbum de conquistas como coleção de conquistas

**Futuro:**
- Ranking pessoal e do dojo
- Conquistas desbloqueáveis (badges)
- Compartilhamento em redes sociais

---

### 11. Competições ⏳ FUTURO

- Histórico de competições com resultados
- Links para vídeos de lutas
- Resultados importados automaticamente via federações

---

### 12. Comércio ⏳ FUTURO (Fases 3–4)

- Loja da academia
- Parceiros do professor (kimonos, acessórios)
- Marketplace aberto

---

## Diferencial Emocional para o Aluno

O app precisa fazer o aluno sentir que sua jornada está sendo **documentada e valorizada**. Não é só gestão — é memória.

| Momento emocional | Como o app cria isso |
|-------------------|---------------------|
| Primeiro dia | Card de boas-vindas, foto com o professor |
| Primeira graduação | Certificado digital, notificação especial para pais |
| Aniversário de 1 ano | Notificação comemorativa com linha do tempo |
| Elogio do professor | Notificação especial, entrada na linha do tempo |
| Aula difícil | Caderno do Guerreiro para processar a experiência |

---

## Referências de UX para Este Perfil

| Produto | O que aprender |
|---------|---------------|
| **Duolingo** | Barra de progresso motivacional, streak diário |
| **Strava** | Registro de atividade física com linha do tempo |
| **Nike Run Club** | Conquistas, badges, elogios automáticos |
| **BeMyApp** | Jornada visual do usuário em apps mobile |

---

## Decisões Abertas

- [ ] Aluno vê a barra de progresso de graduação em tempo real? (provavelmente sim)
- [ ] Caderno do Guerreiro tem campo de texto livre ou estrutura por etapas da aula?
- [ ] Compartilhamento do certificado: é link público ou PDF?
- [ ] Aluno pode bloquear completamente a visibilidade do perfil para outros alunos?

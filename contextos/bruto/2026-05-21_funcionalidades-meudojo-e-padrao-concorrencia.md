# Funcionalidades do App Meu Dojo + Padrão Operacional pra Concorrentes

> Bruto sagrado (Regra 2 KOD.AI). Capturado em sessão 4 de 2026-05-21.
> Input do Davi após reorganização de foco (KOD.AI piloto dojo).

## Funcionalidades principais (10)

### 1. Facescan via grupo WhatsApp
Marca presença automaticamente lendo fotos enviadas pro grupo de WhatsApp da academia. Não exclui marcação manual pelo app — ambos coexistem.

### 2. Mensalidade integrada
- **Para professor:** fácil de monitorar, rastrear, oferecer planos e faturar
- **Para aluno:** fácil de cadastrar, fácil de pagar, fácil de lembrar (push notifications pra PIX automático ou cartão recorrente)

### 3. Controle e gestão de turmas + alunos
Operação core do dojô.

### 4. Diário do Guerreiro (aluno) + Diário do Sensei (professor)
Já capturado nas perspectivas absorvidas — diferencial emocional.

### 5. Integração com sistema de federação (Judô e Jiu-Jitsu)
- Status de graduação (validação cruzada com federação)
- Informações da equipe
- Ranking
- Histórico de campeonatos
- **Acesso direto aos vídeos** que a federação disponibiliza — aluno e professor veem lutas com 1 clique

### 6. Facilidade de acesso a vídeos
Busca rápida + interface limpa.

### 7. Frame-skip em alta qualidade pra análise de golpes
Slow-motion + frame-by-frame pra análise técnica. Funcionalidade técnica diferenciada.

### 8. Hanking interno + avisos gerais + alunos destaques
**Micro rede social interna por academia.** Cada dojô tem sua "comunidade fechada" dentro do app.

### 9. Controle de graduação
Já capturado.

### 10. Loja da academia integrada
Catálogo + gestão de pedidos do dojô na palma da mão (kimonos, faixas, equipamento).

## Funcionalidades complementares (ecossistema Família Showzy)

Possíveis serviços agregados que viajam JUNTO do sistema principal:

- **Contabilidade pra academia** (parceria mãe Denize / Decon)
- **Seguro** (parceria irmão)
- **Integração com outros parceiros** (a definir conforme demanda)

## Padrão operacional pra concorrentes

**Regra estabelecida nesta sessão (instrução ativa pro KOD.AI):**

Para **todo concorrente** que Davi enviar (insta / canal YouTube / site / nome), KOD.AI precisa:

1. **Investigar profundamente** sobre o concorrente (features, posicionamento, pricing, UX, tração, reviews)
2. **Mapear matriz comparativa:**
   - O que o app MeuDojo já tem
   - O que o concorrente tem que MeuDojo NÃO tem
3. **Implementar (ou propor implementação) do que falta** no MeuDojo
4. **Garantir que usuários prefiram MeuDojo** — não basta paridade, precisa superioridade defensável

**Trigger esperado:** Davi envia URL/nome → KOD.AI dispara workflow completo automaticamente (sem precisar pedir confirmação a cada passo).

## Categorização (pra absorção curada)

| Material | Onde vai | Bucket sugerido |
|---|---|---|
| 10 funcionalidades principais | Universais → `gestao-academia-esportiva-br/conceitos/features-canonicas-saas-academia.md` (novo) | C |
| Add-ons ecossistema | Específico do Showzy → fica no repo dojo apenas | (não absorver universal) |
| Padrão operacional pra concorrente | Universal → vira **skill nova** `/mapear-concorrente` em `KODAI/1-ESQUELETO/skills-universais/` | nova skill |

## Features novas vs já capturadas no `gestao-academia-esportiva-br` DRAFT

| # | Feature | Status no contexto-domínio |
|---|---|---|
| 1 | **Facescan via WhatsApp** | ⚠ NOVO — não capturado (diferencial inovador, vale como técnica de presença alternativa ao QR code do Kimono francês) |
| 2 | Mensalidade integrada (prof + aluno) | ✓ Capturado (perspectiva-comercial + verticalizacao-saas-b2b) |
| 3 | Controle turmas + alunos | ✓ Capturado (perspectiva-professor) |
| 4 | Diário do Guerreiro + Sensei | ✓ Capturado (DOMINIO seção jornada emocional) |
| 5 | **Integração federação esportiva** | ⚠ NOVO — listada como "Won't Have Now" mas Davi quer no MVP (?) — precisa confirmar |
| 6 | Acesso a vídeos | ⚠ NOVO — não capturado explicitamente |
| 7 | **Frame-skip alta qualidade** | ⚠ NOVO — não capturado (diferencial técnico) |
| 8 | **Micro rede social interna por academia** (hanking + avisos + destaques) | ⚠ PARCIAL — capturado como "comunicação interna", mas não como "rede social" completa |
| 9 | Controle de graduação | ✓ Capturado |
| 10 | Loja integrada | ⚠ PARCIAL — capturado como marketplace B2B (instrutor → distribuidor); aqui é também B2C (aluno → loja do dojô) |

**5 features novas universais** identificadas que podem virar conceito novo OU expansão dos existentes:
- Facescan via WhatsApp (presença alternativa)
- Integração federação esportiva (validação cruzada + vídeos)
- Acesso a vídeos institucionais (interface)
- Frame-skip pra análise de golpes (diferencial técnico)
- Loja B2C interna (além do marketplace B2B)

## Próximas ações sugeridas

1. **Atualizar `gestao-academia-esportiva-br/` no KOD.AI** com 1 conceito novo: `conceitos/features-diferenciadoras-saas-vertical-esportivo.md` (5 features universais acima)
2. **Criar skill `/mapear-concorrente`** em `KODAI/1-ESQUELETO/skills-universais/` operacionalizando o padrão (input: URL/nome → workflow de 4 passos)
3. **Aguardar Davi enviar primeiro concorrente** pra rodar a skill nova end-to-end (validação prática)

---
Tipo: ripd
Sistema: Dojô Família Scholze
Versao: 1.0 (esqueleto inicial)
Atualizado: 2026-05-26
Status: DRAFT — esqueleto pre-MVP. Atualizar a cada Sprint que adicionar campo PII novo
Responsavel: Davi Pereira Scholze (controlador) + Sensei Cristiano (operador local)
Aplica-se: producao + staging
---

# RIPD — Registro de Operações de Tratamento de Dados Pessoais

> Documento canônico LGPD (Lei 13.709/2018) Art. 37. **Esqueleto inicial criado em 2026-05-26 ANTES de qualquer dado real de aluno entrar no sistema** (pré-Sprint 1b). Atualizar a cada Sprint que adiciona campo PII novo. Pai (Sensei Cristiano) NÃO PODE usar sistema com alunos reais até este RIPD estar completo + checkbox de consentimento + página `/legal/privacidade` publicada + tabela `consentimentos_lgpd` na migration 0003.

---

## 1. Identificação do controlador

**Controlador:** Davi Pereira Scholze (fundador KOD.AI, desenvolvedor do sistema)
- Email contato LGPD: pablomota.jj@gmail.com (ou scholzecr@gmail.com — definir)
- CPF: (preencher antes de publicar `/legal/privacidade`)

**Operador:** Sensei Cristiano (uso operacional local — professor responsável)
- Tipo: utilizador final no dia-a-dia
- Não é "operador" no sentido LGPD Art. 5º VII (que seria terceirização técnica) — é **agente do controlador**

**DPO (Encarregado de Tratamento de Dados):** Davi Pereira Scholze (acumula função inicial — bootstrap radical)
- Quando faturamento permitir contratar DPO externo, atualizar este campo

---

## 2. Finalidades do tratamento

| Finalidade | Base legal LGPD | Categoria de dados |
|---|---|---|
| Autenticação de usuário (Magic Link) | Art. 7, V — execução de contrato | Email |
| Identificação no dashboard ("Bem-vindo Sensei") | Art. 7, V — execução de contrato | Nome completo |
| Multi-tenant isolation (qual dojo o user pertence) | Art. 7, V — execução de contrato | dojo_id (não-PII, mas associativo) |
| Diferenciação de permissões (admin/professor/aluno/responsavel) | Art. 7, V — execução de contrato | role |
| **[FUTURO Sprint 1b]** Cadastro de aluno menor pelo responsável | Art. 14 — regime especial (consentimento responsável) | Nome aluno, data nascimento, foto, faixa, graduações |
| **[FUTURO Sprint 1c]** Registro de presença em aulas | Art. 7, V — execução de contrato | Aluno-id, aula-id, timestamp, presente/falta |
| **[FUTURO Sprint 2]** Cobrança mensalidade (Asaas) | Art. 7, V — execução de contrato | Nome responsável, CPF, email, telefone, endereço, dados pagamento |
| **[FUTURO Sprint 2]** Anotações médicas (alergias, condições) | Art. 11 — categoria sensível, consentimento específico | Dados saúde aluno menor |
| **[FUTURO Sprint 3]** Notificações push (PWA) | Art. 7, V — execução de contrato | Expo push token |
| **[FUTURO Sprint 4]** Reconhecimento facial check-in (face-recognition pack) | Art. 11 — biometria sensível + Art. 14 menor | Embedding facial (não foto), aluno-id |

---

## 3. Dados pessoais tratados — estado ATUAL (Fase 0 + Sprint 1a)

### Tabela `auth.users` (gerenciada pelo Supabase Auth)

| Campo | PII? | Sensível? | Retenção | Onde aparece |
|---|---|---|---|---|
| `id` (uuid) | Não (anonimizador) | Não | Indefinido (chave primária) | Tudo |
| `email` | **SIM** | Não | Enquanto user ativo + 6 meses pós-deleção | Magic Link auth |
| `created_at` | Não | Não | Indefinido | Auditoria |

### Tabela `public.profiles`

| Campo | PII? | Sensível? | Retenção | Notas |
|---|---|---|---|---|
| `id` (uuid → auth.users.id) | Não (associativo) | Não | Indefinido | FK pra auth.users |
| `dojo_id` (uuid → dojos.id) | Não (associativo) | Não | Indefinido | Multi-tenant key |
| `role` (enum) | Não | Não | Indefinido | RLS routing |
| `full_name` (text) | **SIM** | Não | Enquanto user ativo + 6 meses pós-deleção | Display no dashboard |
| `created_at` | Não | Não | Indefinido | Auditoria |

### Tabela `public.dojos`

| Campo | PII? | Sensível? | Retenção |
|---|---|---|---|
| `id` (uuid) | Não | Não | Indefinido |
| `nome` (text) | Não | Não | Indefinido (pode conter nome de pessoa se for "Dojô Família Scholze") |
| `slug` (text URL-safe) | Não | Não | Indefinido |
| `created_at` | Não | Não | Indefinido |

---

## 4. Compartilhamento de dados com terceiros

| Terceiro | Dados compartilhados | Finalidade | Acordo | Localização |
|---|---|---|---|---|
| **Supabase Inc.** (DBaaS) | Tudo (banco fica lá) | Hosting Postgres + Auth + Realtime | Termos Supabase (https://supabase.com/legal/privacy) | sa-east-1 (São Paulo) |
| **Vercel Inc.** (hosting Next.js) | Não armazena dados; só serve frontend | Hosting estático + SSR | Termos Vercel (https://vercel.com/legal/privacy-policy) | Edge global |
| **Anthropic** (Claude, se usado em features IA assistivas) | Apenas se feature IA-assistiva ativada (NÃO no MVP) | Análise/sugestão IA | Termos Anthropic (https://www.anthropic.com/legal/privacy) | US |
| **[FUTURO Sprint 2] Asaas** (pagamentos BR) | Nome, CPF, email, telefone, dados pagamento | Processamento PIX/cartão/boleto | Termos Asaas (https://www.asaas.com/politica-de-privacidade) | Brasil |
| **[FUTURO Sprint 3] Apple/Google** (push notifications) | Expo push token | Entrega notificação | Termos Apple/Google | Global |

**TODOS terceiros LISTADOS são SUB-OPERADORES no sentido LGPD Art. 5º VII**. Política de privacidade pública precisa enumerá-los.

---

## 5. Medidas de segurança aplicadas (Art. 46)

### Implementadas (Fase 0 + Sprint 1a)

- ✓ **Row-Level Security (RLS) Supabase** em todas tabelas tenant-scoped (`dojos`, `profiles`)
- ✓ **Function `current_user_dojo_id()` SECURITY DEFINER** — evita recursão RLS + isolamento multi-tenant físico
- ✓ **Auth via Magic Link** — sem armazenamento de senha
- ✓ **HTTPS obrigatório** (Vercel default + Supabase default)
- ✓ **Secrets em `.env.local` gitignored** — memória `feedback_tudo_dentro_do_repo_do_sistema`
- ✓ **DDL com aprovação humana** — regra `.claude/rules/sql-migrations.md` no projeto pasta-mãe
- ✓ **TypeScript estrito** — reduz superficie de bugs que vazem PII

### Pendentes (Sprint 1b+)

- ⚠ **Honeypot + timer 3s em forms públicos** (Sprint 1b — form cadastro convite professor)
- ⚠ **Disclaimer LGPD em todos forms** (Sprint 1b)
- ⚠ **Checkbox consentimento explícito** (Sprint 1b — Art. 8)
- ⚠ **Captura IP + timestamp do consentimento** (Sprint 1b — tabela `consentimentos_lgpd`)
- ⚠ **Endpoint DSR** `/api/lgpd/dsr` (Sprint 4 — Art. 18 acesso/correção/deleção/portabilidade)
- ⚠ **`pg_crypto` em dados saúde** (Sprint 2 — alergias, condições médicas em coluna criptografada)
- ⚠ **Validação webhook Asaas** (Sprint 2 — assinatura HMAC)
- ⚠ **Backup verificado + retenção declarada** (Sprint 2)
- ⚠ **Logs sem PII** — política `_negocio/contextos/integracao-supabase.md` Sprint 2
- ⚠ **Política de privacidade publicada** em `/legal/privacidade` (Sprint 1b — Art. 9)

---

## 6. Direitos do titular (Art. 18)

Titular pode exercer:
1. **Confirmação** da existência de tratamento (Art. 18, I) — resposta em ≤15 dias
2. **Acesso** aos dados (Art. 18, II) — exportação em JSON+ZIP via DSR endpoint (Sprint 4)
3. **Correção** de dados incompletos/inexatos (Art. 18, III) — formulário dashboard (Sprint 1b)
4. **Anonimização, bloqueio ou eliminação** de dados desnecessários (Art. 18, IV) — DSR endpoint
5. **Portabilidade** a outro fornecedor (Art. 18, V) — JSON exportável
6. **Eliminação** dos dados após término (Art. 18, VI) — `subject_deleted_at` em `consentimentos_lgpd` cascateando
7. **Informação** sobre compartilhamento (Art. 18, VII) — esta seção (item 4 deste RIPD)
8. **Revogação do consentimento** (Art. 18, IX) — toggle no dashboard

**Canal de exercício (até DSR endpoint ficar pronto Sprint 4):**
- Email: pablomota.jj@gmail.com OU scholzecr@gmail.com (definir antes de publicar `/legal/privacidade`)
- Prazo de resposta: 15 dias úteis (Art. 19 §1º)

---

## 7. Regime ESPECIAL para crianças e adolescentes (Art. 14)

**ALERTA P0:** Sistema vai processar dados de **alunos menores** (judô infantil é público típico). Regime especial LGPD Art. 14 aplica:

### Regras invioláveis ANTES de Sprint 1c (cadastro alunos)

1. **Consentimento específico e destacado de PELO MENOS UM dos responsáveis legais** (Art. 14 §1º)
2. **Melhor interesse do menor** prevalece sobre conveniência operacional (Art. 14 §3º)
3. **Não condicionar participação no serviço** ao fornecimento de mais dados além do mínimo necessário (Art. 14 §3º)
4. **Informações em linguagem clara, simples, adequada à idade** (Art. 14 §6º)
5. **Dados de saúde** (alergias, condições médicas) → **categoria sensível Art. 11** → consentimento adicional + criptografia obrigatória
6. **Direito ao esquecimento desde o MVP** (Art. 14 §6º + Art. 18, IV) — endpoint DSR funcional antes de ativar Sprint 1c

### Implementação técnica obrigatória (Sprint 1c)

- Tabela `consentimentos_lgpd` (migration 0003) com `aluno_id`, `responsavel_id`, `termo_versao`, `termo_hash`, `aceito_em`, `ip`, `user_agent`, `subject_deleted_at`
- Migration 0004 — coluna `condicoes_medicas` + `alergias` em `alunos` com `pg_crypto` aplicado
- Validation: insert em `alunos` exige row correspondente em `consentimentos_lgpd` com `subject_deleted_at IS NULL`
- Cascateamento: delete em `consentimentos_lgpd` → marca `subject_deleted_at` em `alunos` (soft delete, hard delete via job assíncrono Art. 14 §6º + Art. 18 IV)

---

## 8. Sub-processadores documentados

Lista de TODOS terceiros que tocam dados (item 4 desenvolvido + atualizado):

| Sub-processador | Função | Dados acessados | Localização | Status compliance |
|---|---|---|---|---|
| Supabase Inc. | DBaaS (Postgres + Auth) | TUDO | sa-east-1 (BR) | GDPR + SOC 2 Type II — informação suficiente |
| Vercel Inc. | Hosting frontend + SSR | Apenas em-trânsito | Edge global | GDPR + SOC 2 — OK |
| Anthropic PBC | LLM (apenas features IA-assistivas, NÃO MVP) | Apenas no momento da requisição | US | GDPR + privacy policy — OK |
| Asaas (FUTURO Sprint 2) | Pagamentos | Nome, CPF, email, telefone, valor | BR | LGPD nativo — OK |
| Apple/Google (FUTURO Sprint 3) | Push notifications | Push token + payload | Global | TOS específicos |

---

## 9. Incidentes de segurança (Art. 48)

Em caso de incidente de segurança que possa acarretar risco ou dano relevante:

1. **Comunicar ANPD** em prazo razoável (≤2 dias úteis após confirmação)
2. **Comunicar titulares afetados** quando risco relevante
3. **Registro do incidente** em `docs/lgpd/incidents/<data>-<descricao>.md`
4. **Análise de causa-raiz** + medidas mitigatórias
5. **Atualização deste RIPD** se mudou superfície de risco

**Canal interno:** abrir issue privada no repo `dojo-familia-scholze` com label `incident-lgpd`.

---

## 10. Histórico de versões deste RIPD

| Versão | Data | Mudança | Responsável |
|---|---|---|---|
| 1.0 | 2026-05-26 | Esqueleto inicial criado ANTES de Sprint 1b (cadastro professor). Estado: Fase 0 + Sprint 1a (auth + dashboard básico). 1 controlador, 1 operador, 3 sub-processadores, 4 finalidades atuais + 7 futuras. | Davi Scholze |

**Próxima atualização:** ao iniciar Sprint 1b (form cadastro professor) — adicionar honeypot + timer 3s + checkbox consentimento + captura IP/timestamp + tabela `consentimentos_lgpd`.

---

## Cross-ref upstream KOD.AI

- Política universal: [`KODAI/1-ESQUELETO/politicas/lgpd.md`](../../../KODAI/1-ESQUELETO/politicas/lgpd.md)
- Conceito-domínio: [`KODAI/3-CONTEXTOS-DOMINIO/gestao-academia-esportiva-br/conceitos/lgpd-menor-saas-educacao.md`](../../../KODAI/3-CONTEXTOS-DOMINIO/gestao-academia-esportiva-br/conceitos/lgpd-menor-saas-educacao.md)
- Audit que motivou criação: [`KODAI/docs/LGPD-AUDIT-PROJETOS-CONSUMIDORES.md`](../../../KODAI/docs/LGPD-AUDIT-PROJETOS-CONSUMIDORES.md)
- Skills upstream (pendentes — D12 do handoff KOD.AI 2026-05-26): `/lgpd-ripd` (gerador) + `/lgpd-dsr-endpoint` (gerador) + pack `seguranca/lgpd-by-design/`
- Agent: `lgpd-auditor` (pasta-mãe Davi `.claude/agents/lgpd-auditor.md` — pendente absorção upstream)

---

## ⚠ Gates ATIVADOS por este RIPD

1. **Pai NÃO pode usar com alunos reais** até Sprint 1c completar tabela `consentimentos_lgpd` + DSR endpoint mínimo (email)
2. **Sprint 1b spec MUST incluir** seção "LGPD compliance" com checkbox consentimento + honeypot + timer + captura IP/timestamp
3. **Migration 0003 MUST criar** `consentimentos_lgpd` ANTES de inserir qualquer aluno real
4. **Migration 0004 MUST aplicar** `pg_crypto` em colunas saúde ANTES de coletar
5. **Página `/legal/privacidade` MUST existir** ANTES de form público novo (Sprint 1b)

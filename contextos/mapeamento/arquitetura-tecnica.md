# Arquitetura Técnica — App Meu Dojo
> Decisões técnicas, stack, modelo de dados e padrões de desenvolvimento.
> Última atualização: 2026-05-13

---

## Stack Definida

| Camada | Decisão | Justificativa |
|--------|---------|--------------|
| **Mobile** | React Native + Expo SDK + TypeScript | Cross-platform, Davi já conhece React |
| **Navegação** | Expo Router v3 | File-based routing, integração nativa com Expo |
| **Backend** | Supabase | Auth + DB + Realtime + Storage + Edge Functions em um lugar |
| **Banco de dados** | PostgreSQL (via Supabase) | Relacional, multi-tenant via RLS |
| **Autenticação** | Supabase Auth | Magic link + email/senha, sem construir do zero |
| **Armazenamento** | Supabase Storage | Fotos de alunos, logos de dojos, certificados PDF |
| **Push Notifications** | Expo Notifications + Supabase Edge Functions | Nativo do Expo, sem serviço adicional no MVP |
| **Pagamentos** | Asaas | Pix, boleto, cartão recorrente — especializado em BR |
| **Geração de PDF** | react-native-html-to-pdf ou server-side | Certificados de graduação |
| **Animações** | React Native Reanimated 3 | Performance nativa |
| **Web Admin** | React + Vite (mesmo da Decon) | Reutilizar skill já desenvolvida |
| **Build** | EAS Build + EAS Submit | Deploy para iOS e Android |
| **Deploy Web** | Vercel | Frontend web e Edge Functions |

---

## Decisão Crítica: Multi-Tenant

O app é multi-tenant: cada dojo é um tenant isolado. Alunos de um dojo nunca veem dados de outro.

**Implementação via Supabase Row Level Security (RLS):**

Toda tabela tem uma coluna `dojo_id`. As policies do PostgreSQL garantem que cada usuário só acessa os dados do seu dojo.

```sql
-- Exemplo: alunos só veem sua própria academia
CREATE POLICY "alunos_veem_proprio_dojo" ON alunos
  FOR SELECT USING (
    dojo_id = (SELECT dojo_id FROM perfis WHERE user_id = auth.uid())
  );
```

---

## Decisão Crítica: Múltiplos Dojos por Professor

**Opção A — 1 conta = 1 dojo** (mais simples, limita crescimento)
- Cada professor tem exatamente 1 dojo
- Para criar outro dojo, cria outra conta

**Opção B — 1 conta = N dojos** (recomendado para Premium)
- Professor acessa múltiplos dojos com o mesmo login
- Alterna entre dojos na interface
- Necessário para professores que dão aulas em múltiplos lugares

**Recomendação:** implementar Opção A no MVP (mais simples) com estrutura de dados já preparada para Opção B no futuro. A tabela `professor_dojo` (relação N:N) permite isso.

---

## Modelo de Dados Conceitual (ERD Simplificado)

```
USUARIOS (Supabase Auth)
  └── PERFIS (tipo: professor / aluno / responsavel / admin)
      └── PROFESSOR_DOJO (N:N — 1 professor pode ter N dojos no futuro)
          └── DOJOS
              ├── TURMAS
              │   └── TURMA_ALUNO (aluno em múltiplas turmas)
              ├── ALUNOS
              │   ├── GRADUACOES (histórico de faixas)
              │   ├── PRESENCAS (por aula/data)
              │   ├── ANOTACOES_PROFESSOR (por aluno)
              │   ├── RESPONSAVEIS (para menores)
              │   └── CADERNO_GUERREIRO (entradas do diário)
              ├── AULAS
              │   ├── SCRIPTS_AULA (plano de aula reutilizável)
              │   └── COMENTARIOS_AULA
              ├── CADERNO_SENSEI (privado do professor)
              ├── MENSALIDADES (planos e valores)
              ├── PAGAMENTOS
              └── MENSAGENS (canal interno)
```

---

## Autenticação Multi-Perfil

Um email pode ser professor E aluno (o Cristiano, por exemplo, é professor no dojô dele e poderia ser aluno em outro lugar).

**Fluxo:**
1. Usuário cria conta com email
2. Supabase Auth gerencia o login
3. Tabela `perfis` define os roles do usuário (`professor`, `aluno`, `responsavel`, `admin`)
4. Um usuário pode ter múltiplos roles
5. No login, o app detecta os roles e mostra a tela correta

---

## Offline-First (Decisão Pendente)

**Problema:** academia sem internet no horário da aula, professor em competição.

**Features que precisam funcionar offline:**
- Confirmar presença (crítico — acontece toda aula)
- Ver lista de alunos da turma (consulta frequente)
- Ver histórico de presença (consulta eventual)

**Opções técnicas:**
- **Expo SQLite + sync** — banco local no dispositivo, sincroniza quando volta o sinal
- **TanStack Query + optimistic updates** — funciona para UI mas não para offline real
- **WatermelonDB** — banco offline reativo para React Native (mais complexo)

**Recomendação para MVP:** implementar otimistic updates (parece offline mas não é) e marcar offline-first real como Fase 2. Aceitar a limitação temporariamente.

---

## Notificações Push

**Fluxo:**
1. Supabase trigger detecta evento (graduação próxima, presença baixa, pagamento atrasado)
2. Supabase Edge Function dispara push via Expo Push API
3. App recebe a notificação, abre tela correta

**Tokens de push:** armazenados em `perfis.expo_push_token`

---

## Geração de Certificado PDF

**Opções:**
- **react-native-html-to-pdf** — gera PDF no dispositivo a partir de HTML/CSS
- **Supabase Edge Function** — gera PDF server-side (mais consistente, mais controle)

**Recomendação:** Edge Function — garante o mesmo visual em todos os dispositivos, armazena o PDF no Supabase Storage, gera link permanente e compartilhável.

---

## Segurança

- **RLS em todas as tabelas** — nenhuma query passa sem verificação de dojo_id
- **Service Role Key** nunca no client — apenas em Edge Functions
- **Variáveis de ambiente:** `.env` local, Vercel Env Vars em produção
- **Dados médicos:** colunas criptografadas no PostgreSQL (pg_crypto)
- **LGPD menores:** termo de consentimento imutável — tabela sem DELETE policy para admins
- **Webhooks Asaas:** validar assinatura antes de processar
- **Expo SecureStore** — para armazenar tokens de refresh no dispositivo

---

## Estrutura de Pastas do App

```
dojo-familia-scholze/
├── app/                        ← Expo Router (screens)
│   ├── (auth)/                 ← Login, cadastro
│   ├── (professor)/            ← Área do professor
│   │   ├── dashboard/
│   │   ├── alunos/
│   │   ├── turmas/
│   │   ├── graduacao/
│   │   ├── financeiro/
│   │   └── caderno-sensei/
│   ├── (aluno)/                ← Área do aluno
│   │   ├── jornada/
│   │   ├── caderno-guerreiro/
│   │   ├── presenca/
│   │   └── financeiro/
│   └── (responsavel)/          ← Área do responsável
├── components/                 ← Componentes reutilizáveis
│   ├── ui/                     ← Botões, inputs, cards genéricos
│   ├── professor/              ← Componentes específicos do professor
│   └── aluno/                  ← Componentes específicos do aluno
├── hooks/                      ← Hooks customizados
├── lib/
│   ├── supabase.ts             ← Cliente Supabase
│   └── notifications.ts       ← Utilitários de push
├── services/                   ← Chamadas de API e lógica de negócio
│   ├── graduacao.ts            ← Lógica de cálculo de graduação
│   ├── presenca.ts
│   └── financeiro.ts
├── types/                      ← TypeScript types e interfaces
├── constants/                  ← Cores, tamanhos, config
└── supabase/
    ├── migrations/             ← SQL migrations
    └── functions/              ← Edge Functions
```

---

## Padrões de Código

- **TypeScript strict** — sem `any`, sem atalhos
- **Um arquivo por componente**
- **Hooks para lógica** — componentes ficam "burros", lógica fica nos hooks
- **Services para API** — nenhum componente faz query direta ao Supabase
- **Constants para cores** — nunca hardcodar `#C0392B` nos componentes
- **Commits em português** — `feat(graduação): adiciona cálculo automático de critérios`

---

## Decisões Abertas

- [ ] Offline-first real no MVP ou apenas optimistic updates?
- [ ] Começar por iOS ou Android? (iOS exige Apple Developer Account $99/ano)
- [ ] PDF server-side (Edge Function) ou client-side (react-native-html-to-pdf)?
- [ ] TypeScript strict desde o início? (recomendado sim)
- [ ] Usar Supabase realtime para presença ao vivo na tela do professor?

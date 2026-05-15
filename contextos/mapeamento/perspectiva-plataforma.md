# Perspectiva do Dono da Plataforma — App Meu Dojo
> Mapa da perspectiva de administração global da plataforma.
> Esta perspectiva ainda não estava mapeada no documento original.
> Fonte: App_Meu_Dojo_Contexto_Mestre.md + expansão própria
> Última atualização: 2026-05-14

---

## Quem é esse usuário

**Davi Scholze** (desenvolvedor e co-fundador) e **Cristiano Scholze** (pai, professor, co-fundador e primeiro cliente beta).

No contexto da plataforma:
- São os operadores do SaaS
- Gerenciam todos os dojos cadastrados
- Têm visibilidade de toda a plataforma
- Tomam decisões sobre preços, features e suporte

**Nomenclatura resolvida (2026-05-14):**
- **Showzy** = empresa principal (Davi + esposa como sócios). Dona do App Meu Dojo e todos os produtos.
- **Scholze** = família / sobrenome. "Dojo Família Scholze" = o dojo do pai (Cristiano), que é o 1º cliente.
- **Família como parceiros estratégicos, não sócios** — protege o negócio e as relações familiares.

---

## Ecossistema Família Showzy

A empresa opera como ecossistema onde cada membro da família participa como parceiro estratégico — não como sócio. Isso protege o negócio e as relações familiares.

| Membro | Papel | Contribuição |
|--------|-------|-------------|
| **Davi** | Sócio principal | Desenvolvimento, IA, sistemas, tráfego pago |
| **Esposa do Davi** | Sócia principal | Câmera profissional, edição, design, identidade visual |
| **Mãe (Denize)** | Parceira estratégica | Empresa de contabilidade — indicada dentro da plataforma, ganha clientes novos via app |
| **Pai (Cristiano)** | Investidor + 1º cliente | Dojo Família Scholze — primeiro case de sucesso e financiador inicial |
| **Irmão** | Parceiro de seguros | Indicação de seguro do local dentro da plataforma |

---

## Responsabilidades do Dono da Plataforma

### 1. Gestão de Contas de Professores

- Visualizar todos os professores cadastrados
- Ver status de cada conta (trial, ativo, inadimplente, cancelado)
- Intervir manualmente em situações de suporte
- Bloquear ou reativar contas

### 2. Dashboard da Plataforma (Admin Panel)

Métricas globais em tempo real:

| Métrica | Descrição |
|---------|-----------|
| Total de professores ativos | MRR consolidado |
| Total de alunos na plataforma | Saúde do ecossistema |
| Churn do mês | Cancelamentos vs. novas adesões |
| Taxa de trial → pago | Eficiência de conversão |
| Receita por plano (Básico/Intermediário/Premium) | Mix de planos |
| Professores em trial (e quando vencem) | Oportunidade de conversão |
| Inadimplência total | Risco de receita |

### 3. Gestão Financeira da Plataforma

- Receita mensal recorrente (MRR) consolidada
- Repasse de taxas do gateway de pagamento (Asaas/Pagar.me)
- Acompanhar custo de infraestrutura vs. receita
- Relatório de margem líquida

### 4. Suporte a Professores

- Fila de tickets de suporte
- Histórico de interações por professor
- Envio de comunicados globais (manutenção, novidades)
- Chat de suporte interno

### 5. Gestão de Features por Plano

- Configurar o que cada plano acessa
- Ativar features experimentais para grupos de professores (beta testing)
- Controlar limites (máximo de alunos por plano)

### 6. Gestão de Conteúdo da Plataforma (futuro)

- Moderar avaliações públicas de academias
- Remover conteúdo inadequado
- Gerenciar página pública de cada academia

### 7. Integrações e Parceiros (futuro)

- Gestão de vendedores parceiros (Fase 3)
- Aprovação de entrada no marketplace (Fase 4)
- Contratos com federações (Fase 2+)

---

## Estrutura Técnica do Admin Panel

**MVP:** painel web simples (não precisa ser mobile)
**Stack:** React + Vite (mesmo da Decon) ou Next.js
**Acesso:** protegido por login com role `platform_admin`
**Deploy:** Vercel (separado do app principal)

---

## Estratégia de Crescimento (visão do dono)

### Curto prazo (0–6 meses pós-MVP)
- Cristiano testando no próprio dojo — feedback direto
- Onboardar manualmente os primeiros 10–20 professores
- Corrigir tudo que atrapalha antes de investir em tráfego pago

### Médio prazo (6–18 meses)
- Escalar via tráfego pago e indicações
- Integrar com federações estaduais (credibilidade)
- Preparar marketplace B2B com o Dojô Família Scholze como primeiro vendedor

### Longo prazo (18+ meses)
- Expansão internacional (inglês, espanhol)
- Marketplace aberto de equipamentos
- IA para análise de lutas

---

## Arquitetura White Label (Expansão Futura)

O sistema foi desenhado para ser um único backend com marcas diferentes na camada de apresentação — "um sistema só por baixo, marcas diferentes em cima".

| App | Modalidade | Terminologia própria |
|-----|-----------|---------------------|
| App Meu Dojo | Judô, Jiujítsu, Caratê, Muay Thai | Sensei, tatame, faixa |
| App Meu Campo | Futsal, Futebol, Society | Técnico, campo, posição |
| App Meu Estúdio | Dança, Ballet, Ginástica | Instrutor, estúdio, nível |
| App Minha Piscina | Natação, Hidroginástica | Treinador, piscina, graduação |
| App Minha Quadra | Tênis, Vôlei, Basquete | Técnico, quadra, ranking |
| App Minha Aula | Música, Idiomas, Reforço | Professor, sala, progresso |

**Regra arquitetural:** o App Meu Dojo já deve ser construído com esta extensibilidade em mente (campos de "modalidade", terminologia configurável), mesmo que o white label só seja ativado na Fase 4+.

---

## Plano Enterprise (Futuro)

Para grandes organizações que precisam de conta mãe com múltiplos professores e modalidades.

**Públicos:**
- Associações esportivas com múltiplos professores afiliados
- Colégios com múltiplas atividades (judô + natação + dança num único painel)
- Redes de academias e franquias
- Grandes organizações de jiujítsu (ex: GFTeam, Alliance, Checkmat)

**Características:**
- Conta mãe que administra todos os professores, turmas e modalidades
- Dashboard consolidado com métricas de toda a rede
- Ticket muito maior — organizações pagam mais por controle centralizado
- Integração com federações estaduais e nacionais

**Fase:** Won't Have Now — MVP e Fase 2 são para professores individuais primeiro.

---

## Estratégia de Desenvolvimento: 3 Claude Projects

Arquitetura de coordenação para o desenvolvimento usando 3 sessões Claude em paralelo:

| Project | Foco | Responsabilidade |
|---------|------|-----------------|
| **Orquestrador** | Contexto geral completo | Coordena os outros dois. Atualiza arquivo mestre no Drive. Você opera aqui estrategicamente. |
| **Pedreiro 1** | Backend, DB, regras de negócio | Antes de agir: lê o arquivo mestre. Depois: reporta ao orquestrador. |
| **Pedreiro 2** | Frontend, UX, protótipo visual | Mesmo fluxo de consulta e reporte. |

**Arquivo mestre no Drive** = cérebro compartilhado entre os 3 projects. Toda ação passa por registro aqui. Os projects se comunicam via orquestrador — nunca diretamente.

**Status:** a implementar antes do Sprint 1.

---

## Infraestrutura que o Dono Gerencia

Ver `infraestrutura-custos.md` para detalhes completos.

| Serviço | Quando migrar |
|---------|--------------|
| Supabase Free → Pro | Quando se aproximar de 500MB de DB ou 50k MAU |
| Vercel Free → Pro | Antes de qualquer uso comercial |
| EAS Free → Production | Antes de submeter para App Store / Play Store |
| Asaas | Desde o MVP (aceitar pagamentos de professores) |

---

## Decisões Abertas

- [x] ~~Confirmar nomenclatura~~ — **RESOLVIDO**: Showzy = empresa, Scholze = família/dojo do pai
- [ ] O admin panel é construído no MVP ou apenas após primeiros 10 professores?
- [ ] Cristiano tem perfil diferente de admin ou é o mesmo que professor?
- [ ] Quem faz o suporte no início? (Davi? Cristiano? Automação?)
- [ ] A plataforma será registrada como empresa? CNPJ? (impacto no Asaas)
- [ ] Marketplace de Serviços Criativos: começar no MVP (versão manual) ou só Fase 2?
- [ ] Irmão (seguros) e mãe (contabilidade): integração via link externo ou formulário interno no MVP?
- [ ] Arquivo mestre do Drive para os 3 Claude Projects: criar antes do Sprint 1?

# Infraestrutura e Custos — App Meu Dojo
> Planejamento de infraestrutura, custos mensais e critérios de upgrade.
> Inclui planejamento para planos pagos do Supabase e Vercel pós-MVP.
> Última atualização: 2026-05-13

---

## Serviços Necessários

| Serviço | Função | Plano inicial | Custo inicial |
|---------|--------|--------------|--------------|
| Supabase | DB + Auth + Storage + Realtime + Edge Functions | Free | R$0 |
| Vercel | Deploy web admin + domínio | Free (Hobby) | R$0 |
| Expo EAS | Build iOS + Android | Free (30 builds/mês) | R$0 |
| Asaas | Pagamentos BR (Pix, boleto, cartão) | Free | R$0 + taxas |
| Apple Developer | Publicar na App Store | Obrigatório | US$99/ano (~R$574) |
| Google Play | Publicar na Play Store | Taxa única | US$25 (~R$145) |
| Domínio (appmeuodojo.com.br ou similar) | Identidade da plataforma | GoDaddy/Registro.br | ~R$50/ano |

**Custo total antes do primeiro cliente:** ~R$770 no ano 1 (fixo) + taxas variáveis de pagamento.

---

## Limites dos Planos Gratuitos

### Supabase Free
| Limite | Valor | Quando atinge |
|--------|-------|--------------|
| Banco de dados | 500 MB | ~50.000 alunos cadastrados |
| Storage | 1 GB | ~2.000 fotos de alunos (500KB cada) |
| MAU (Monthly Active Users) | 50.000 | Crescimento explosivo |
| Projetos simultâneos | 2 | Suficiente (1 prod + 1 dev) |
| Edge Functions | 500k invocações/mês | Suficiente para MVP |
| Banda | 5 GB/mês | Suficiente para MVP |

**Atenção:** projetos inativos no Supabase Free são pausados após 1 semana. Usar o app regularmente (Cristiano) evita isso.

### Vercel Free (Hobby)
| Limite | Valor |
|--------|-------|
| Uso comercial | ❌ Não permitido |
| Bandwidth | 100 GB/mês |
| Deployments | ilimitados |

**⚠️ Importante:** o plano Free da Vercel não permite uso comercial. Antes de cobrar qualquer professor, migrar para Pro.

### Expo EAS Free
| Limite | Valor |
|--------|-------|
| Builds por mês | 30 |
| Submissões para stores | Incluídas |
| Updates OTA | 1000 por mês |

Suficiente para desenvolvimento e beta. Pode precisar de upgrade para releases frequentes.

---

## Quando Migrar para Planos Pagos

### Critério 1 — Antes de cobrar o primeiro professor

**Vercel Pro: $20/mês (~R$116)**
- Obrigatório para uso comercial
- Migrar junto com a abertura do plano pago do app

**Supabase Pro: $25/mês (~R$145) por projeto**
- Não urgente no início
- Migrar quando DB ultrapassar 400MB ou storage 800MB

### Critério 2 — Quando atingir ~50 professores ativos

**Supabase Pro** (se ainda no Free):
- 8 GB de banco de dados
- 100 GB de storage
- Point-in-Time Recovery (backups contínuos) — crítico para dados de alunos
- Suporte por email

### Critério 3 — Quando atingir ~200 professores ativos

**Expo EAS Production: $29/mês (~R$168)**
- Builds prioritários
- Nenhum limite de builds
- Análise de erros em produção

---

## Simulação de Custos por Escala

| Professores | MRR (est.) | Custo Infra | Margem Bruta |
|------------|-----------|------------|-------------|
| 0 (beta) | R$0 | R$65/mês* | -R$65 |
| 10 | R$1.200 | R$120 | R$1.080 (90%) |
| 50 | R$9.000 | R$260 | R$8.740 (97%) |
| 100 | R$18.000 | R$430 | R$17.570 (97%) |
| 500 | R$80.000 | R$1.500 | R$78.500 (98%) |

*R$65/mês = Apple Developer R$48 + domínio R$4 + Vercel R$13 (estimativa mês a mês)

**Observação:** taxas do Asaas (gateway de pagamento para as mensalidades dos alunos) são pagas pelos próprios alunos ou embutidas no plano do professor. Cartão: ~2.99% + R$0.49 por transação.

---

## Taxas do Asaas (referência para o professor)

O professor usa o Asaas para cobrar seus alunos (mensalidades):

| Método | Taxa |
|--------|------|
| PIX | Gratuito para volume < R$500/mês, 0.99% acima |
| Boleto | R$2,99 por boleto |
| Cartão de crédito | 2.99% + R$0.49 por transação |
| Débito automático em cartão | 2.99% |

**O professor paga o Asaas, não o app.** O app apenas integra via API.

---

## Plano de Upgrade Supabase

### Free → Pro ($25/mês)
**Gatilho:** DB > 400MB ou storage > 800MB ou 1ª receita significativa

**O que muda:**
- 8 GB banco, 100 GB storage
- PITR (backup contínuo — restaurar até qualquer ponto)
- Sem pausa de projeto inativo
- Suporte por email

### Pro → Team ($599/mês)
**Gatilho:** empresa formada + necessidade de SOC 2 / HIPAA
Muito longe no futuro — não considerar agora.

---

## Plano de Upgrade Vercel

### Free → Pro ($20/mês)
**Gatilho:** antes de cobrar o primeiro professor (uso comercial)

**O que muda:**
- Uso comercial permitido
- Web Analytics incluído
- Speed Insights incluído
- 1 TB de bandwidth

### Pro → Enterprise (contato)
**Gatilho:** time de engenharia grande ou conformidade corporativa
Não relevante no horizonte atual.

---

## Plano de Upgrade Expo EAS

### Free → Production ($29/mês)
**Gatilho:** mais de 30 builds/mês ou releases semanais em produção

**O que muda:**
- Builds ilimitados
- Filas prioritárias
- Análise de crashes em produção

---

## Resumo: O que Fazer Antes de Qualquer Venda

1. **Migrar Vercel para Pro** ($20/mês) — uso comercial é obrigatório
2. **Garantir que Supabase não está pausando** — usar regularmente ou migrar para Pro
3. **Ter Apple Developer Account ativa** ($99/ano) — sem isso não tem App Store
4. **CNPJ para o Asaas** — verificar se pode operar como PF ou precisa de PJ
5. **Termo de serviço e política de privacidade** — obrigatório para App Store, Play Store e LGPD

---

## Decisões Abertas

- [ ] A plataforma vai operar com CNPJ próprio ou como PF do Cristiano inicialmente?
- [ ] O Asaas aceita PF para receber mensalidades SaaS? (verificar)
- [ ] Domínio: appmeuodojo.com.br, meudojo.app, ou outro?
- [ ] Conta Apple Developer: Cristiano (PF) ou empresa?

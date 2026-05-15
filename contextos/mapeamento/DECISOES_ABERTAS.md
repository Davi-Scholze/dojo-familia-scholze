# Decisões Abertas — App Meu Dojo
> Consolidado de todas as decisões pendentes dos arquivos de mapeamento.
> Dividido em: resolvidas agora (técnicas) e pendentes (precisam do Davi/Cristiano).
> Última atualização: 2026-05-13

---

## ✅ RESOLVIDAS AGORA (recomendações técnicas)

### Multi-dojo por professor
**Decisão:** 1 conta = 1 dojo no MVP. Banco de dados preparado para N:N desde o início.  
**Por quê:** simplifica o MVP em meses de trabalho. A tabela `professor_dojo` (N:N) garante que expandir para multi-dojo no futuro não exige refatoração.

### Offline para presença
**Decisão:** Optimistic updates no MVP (parece offline, sincroniza quando volta o sinal). Offline real apenas na Fase 2.  
**Por quê:** WatermelonDB ou Expo SQLite adicionariam 4–6 semanas de complexidade. Não vale no MVP.

### iOS ou Android primeiro?
**Decisão:** Android primeiro.  
**Por quê:** Google Play = US$25 taxa única, sem review rigoroso. App Store = US$99/ano + review demorado. No Brasil, Android é dominante. Cristiano valida no Android, depois vai para iOS.

### Trial com ou sem cartão de crédito?
**Decisão:** 30 dias grátis, sem cartão de crédito.  
**Por quê:** a conversão de trial-sem-cartão é maior. Quando o professor tem alunos no app após 30 dias, o custo de trocar é alto — ele vai pagar. Referência: OnMat usa esse modelo.

### PDF do certificado: server-side ou client-side?
**Decisão:** Supabase Edge Function (server-side).  
**Por quê:** garantia de visual idêntico em qualquer dispositivo. PDF fica armazenado no Supabase Storage com link permanente e compartilhável.

### TypeScript strict desde o início?
**Decisão:** Sim, obrigatório.  
**Por quê:** migrar de JS para TS strict depois exige refatoração massiva. Começa certo.

### Supabase Realtime para presença ao vivo?
**Decisão:** Sim, usar Realtime.  
**Por quê:** professor vê alunos confirmando presença em tempo real antes da aula começar — experiência única que nenhum concorrente entrega.

### Caderno do Guerreiro: texto livre ou etapas guiadas?
**Decisão:** Texto livre no MVP + perguntas guiadas opcionais (começo/meio/fim da aula).  
**Por quê:** menos barreira para começar. Quem quiser guia usa, quem não quiser escreve livremente.

### Certificado digital: só PDF ou também link?
**Decisão:** Ambos — PDF baixável (para WhatsApp de família) + link público imutável (para LinkedIn/Instagram).  
**Por quê:** certificado compartilhado em redes sociais vira marketing orgânico do app.

### Múltiplos responsáveis por aluno menor?
**Decisão:** Sim — até 2 responsáveis por aluno.  
**Por quê:** pais separados é a realidade de muitas famílias. Ambos precisam receber notificações de graduação.

### Plano anual com desconto?
**Decisão:** Oferecer no MVP — 2 meses grátis (equivale a ~17% de desconto).  
**Por quê:** melhora o cashflow e reduz churn. Professor que paga anual raramente cancela.

### PIX para assinatura do professor?
**Decisão:** Sim, aceitar PIX — mas com lógica manual: se não renovar em 5 dias, acesso suspenso automaticamente.  
**Por quê:** cartão recorrente automatiza melhor, mas PIX é preferência de muitos professores BR. Oferecer os dois.

### Apple Developer Account (iOS): PF ou empresa?
**Decisão:** Cristiano como PF Individual ($99/ano) no início.  
**Por quê:** mais simples e rápido de criar. Migrar para conta de empresa (Organization) é possível depois sem perder o app publicado.

### Sprint mínimo para começar a cobrar professores?
**Decisão:** Após Sprint 4 (financeiro funcionando + Cristiano validou por pelo menos 30 dias).  
**Por quê:** não cobrar antes de ter um produto que o Cristiano usa com confiança.

### Calendário com scripts de aula: SHOULD ou COULD?
**Decisão:** COULD — vai para Sprint 5.  
**Por quê:** o documento original classifica como MVP, mas é tecnicamente complexo (reutilização de scripts entre datas, acesso do aluno, comentários). O app funciona sem isso nos primeiros sprints.

### Admin panel do Davi/Cristiano: no MVP ou depois?
**Decisão:** Básico no Sprint 4 — apenas métricas globais e gestão de contas de professores.  
**Por quê:** Davi precisa ver MRR e intervir em casos de suporte antes de abrir para mais professores.

### Caderno do Guerreiro: responsável vê o diário do filho?
**Decisão:** Não — o Caderno do Guerreiro é privado do aluno.  
**Por quê:** o valor emocional do caderno vem de ser um espaço seguro e pessoal. Responsável vê a linha do tempo e os feedbacks do professor, mas não o diário.

---

## ⏳ PENDENTES (precisam do Davi ou Cristiano)

### 🎨 Referências de design para o app
**Status:** aguardando Davi enviar prints e referências visuais reais.

**Enquanto isso — os melhores sites para pesquisar:**

| Site | Por que usar | URL |
|------|-------------|-----|
| **Mobbin** | Melhor acervo de apps reais em produção (iOS + Android). Pesquise "fitness app", "sports", "martial arts". Fluxos completos, não só telas. | mobbin.com |
| **Pageflows** | Fluxos gravados em vídeo — vê o app funcionando de verdade, não só prints | pageflows.com |
| **Dribbble** | Conceitos de UI. Pesquise "dojo app", "martial arts UI", "belt progression", "fitness tracker" | dribbble.com |
| **Behance** | Cases completos com contexto, fluxo e raciocínio do designer | behance.net |
| **UI Sources** | Patterns de UI mobile organizados por tipo de tela | uisources.com |
| **Godly** | Curadoria de sites minimalistas premium | godly.website |
| **Awwwards Mobile** | Premiados mobile internacional | awwwards.com/websites/mobile/ |

**Referências de esporte/luta já mapeadas** (em `biblioteca-web-design-internacional.md`):
- ufc.com, bellator.com → branding de combate
- dazn.com → mini-sites de eventos esportivos
- redbull.com → imersão em eventos esportivos
- Awwwards Sports: Stōkt, Double Play → UX mobile esportiva

**O que enviar quando tiver as referências:**
- Print do hero (primeira tela)
- Uma seção que você gostou com animação ou interação
- Versão mobile (F12 → dispositivo)
- O que especificamente te atraiu em cada uma

---

### Nome do Caderno do Sensei
**Status:** aguardando decisão do Cristiano.  
**Opções em aberto:** Caderno do Sensei / Diário do Mestre / Livro do Sensei / Caderno do Tatame

---

### ✅ Nomenclatura da marca: Showzy vs Scholze
**Status:** RESOLVIDO em 2026-05-14.  
**Decisão:** Showzy = empresa (Davi + esposa como sócios, dona do App Meu Dojo e todos os produtos). Scholze = família/sobrenome. "Dojo Família Scholze" = o dojo do pai (Cristiano), que é o 1º cliente. Repo permanece `dojo-familia-scholze` pois referencia o cliente beta, não a empresa.

---

### CNPJ para operar a plataforma
**Status:** aguardando decisão.  
**Contexto:** o Asaas aceita PF para receber pagamentos. Mas CNPJ protege juridicamente, permite emissão de nota fiscal e tem melhor tratamento tributário para SaaS. Recomendação: abrir MEI ou ME antes de ter mais de 10 clientes pagantes.

---

### Domínio do app
**Status:** aguardando preferência do Davi.  
**Sugestões:**
- `meudojo.app` — curto, internacional, moderno
- `appmeuodojo.com.br` — descritivo, nacional
- `dojofamilia.app` — conecta com a marca

---

### Professor vê o script da aula antes ou depois de criar?
**Status:** detalhe de UX a definir com Cristiano (usuário real).  
**Contexto:** o professor cria o script antes da aula e pode editá-lo depois. O aluno acessa via calendário. A ordem do fluxo de criação precisa de validação com o Cristiano na prática.

---

### Marketplace de Serviços Criativos: MVP manual ou só Fase 2?
**Status:** aguardando decisão do Davi.  
**Opções:**
- A) MVP manual: professor solicita dentro do app → Davi/esposa executam → simples e validável
- B) Só na Fase 3: construir o marketplace com prestadores cadastrados

---

### Parceiros no MVP: link externo ou formulário interno?
**Status:** aguardando decisão do Davi.  
**Contexto:** para Denize (contabilidade) e irmão (seguros), o MVP pode ser um simples link/WhatsApp dentro do app. Formulário interno integrado é mais trabalho.  
**Recomendação:** link externo no MVP, formulário na Fase 2.

---

### Arquivo mestre do Drive para os 3 Claude Projects
**Status:** aguardando criação antes do Sprint 1.  
**Contexto:** ideia de coordenar desenvolvimento com 3 Claude Projects (Orquestrador, Pedreiro Backend, Pedreiro Frontend) usando um arquivo no Google Drive como cérebro compartilhado. Precisa ser configurado antes de iniciar o código.

---

### Enterprise: quando adicionar ao roadmap?
**Status:** aguardando decisão do Davi.  
**Contexto:** plano para associações, colégios e redes. Ticket muito maior. Mas adicionar ao roadmap antes da Fase 3 é prematuro — focar em validar o produto para professores individuais primeiro.

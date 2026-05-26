---
brief: dojo-familia-scholze landing publico v8
data: 2026-05-26
status: lockado-retroativamente (pós feedback v6 rejeitado)
metodo: design-brief-locker (KODAI upstream 1-ESQUELETO/skills-universais/design-brief-locker/)
locker: Claude Opus 4.7 (sessão Davi 2026-05-26)
versao_anterior: v6 (rejeitada — "30% pior, 2% melhor")
versao_atual_codigo: v7 (commit f65e508 — fix kanji ambient + bgImages athletes B&W)
proxima_versao: v8 (aplicará este brief no ciclo VER→PROPOR→TESTAR→REPORTAR)
---

# Brief Visual — Dojô Família Scholze (landing público)

## Decision Layer (6 frases lockadas)

### 1. Sensação

> **"Que respeita quem foi sensei dos seus pais."**

A pessoa que chega no site precisa sentir que está entrando num lugar com história, herança, peso de tatame de décadas — não numa academia genérica nova de bairro. Tem o ritmo de quem não precisa provar nada.

Banidas: moderno, profissional, premium, elegante. Não cabem aqui.

### 2. Audiência

**Pra quem é:**

> A mãe que está procurando uma academia de Judô pra filho de 7 anos e quer que ele seja formado por alguém que sabe o nome de cada criança da turma, não por uma franquia.

Também: adulto de 35-50 que treinou na infância, parou, e agora quer voltar — mas só num lugar que tem cerimônia de graduação de verdade, com tatame compartilhado entre pais e filhos.

**Pra quem NÃO é:**

> Não é pra quem está procurando "academia de MMA pra emagrecer" e nunca ouviu "Ceder pra Vencer".

Também não pra: competidor profissional que precisa de logística de viagens internacionais, gym-bro que quer treino funcional, pessoa que escolhe pelo Instagram com mais seguidores.

### 3. Objeto-herói

> **A faixa preta usada — gasta nas pontas, com nome bordado.**

Não a foto do Sensei (apesar de ele ser o sistema). Não o kanji (decoração, não objeto). Não a fachada do dojo (lugar genérico). A faixa preta com sinais de uso é a única coisa que conta a história inteira: décadas de treino, graduação real, herança transmitida.

No v7 atual: o herói é a foto de atleta B&W stock (Nathan Dumlao). Vai pra v8: idealmente foto da faixa real do Sensei pai do Davi, fundo escuro, rim light suave. Fallback: foto stock de faixa preta gasta (busca específica).

### 4. Job (one verb)

> **Acolher.**

Não converter. Não impressionar. Não vender. **Acolher** — receber alguém que está chegando pela primeira vez no mundo do Judô (ou voltando depois de 20 anos) e dizer "tem lugar pra você aqui".

Tudo no site é medido contra isso: pacing devagar (não tem CTA agressivo), copy em tom de convite (não em tom de pitch), cores quentes em pequenas doses (vermelho do hinomaru não usado pra escala industrial, usado como sinal de presença).

### 5. Corte

**Lista de competidores analisados** (resumo do mapeamento KOD.AI pasta `_negocio/contextos/bruto/dojo/`):
- Gracie Barra (franquia internacional BJJ)
- Cordeiro Jiu-Jitsu (academia BR popular)
- Academia local Curitiba média

**Seções típicas desses competidores que ESTAMOS CORTANDO:**

- ❌ Logo wall de academias parceiras / federações cheio
- ❌ Carrossel de fotos lifestyle (atleta com troféu, jovens "estilo de vida saudável")
- ❌ Comparativo de planos em grid 3-col tipo SaaS
- ❌ Bloco "depoimentos em vídeo" com 6+ cards
- ❌ Hub de blog/notícias/eventos
- ❌ Footer de 8 colunas com mapa do site
- ❌ Pop-up de captura de email
- ❌ Banner "primeira aula grátis" piscando
- ❌ Métricas vaidosas ("500+ alunos formados!")
- ❌ Chat-bot "fale conosco" no canto

**O que SOBREVIVE:**

1. Hero com objeto-herói + 1 frase de feeling
2. Sobre o Sensei (1 foto B&W + 1 parágrafo curto) — quem ele é, não currículo
3. 2 modalidades (Judô + Jiu-Jitsu) com filosofia, não features
4. Filosofia / citação Jigoro Kano (já no site v7 — manter)
5. Locais & planos (sem grid SaaS — apenas 2 cards de sede)
6. Contato direto (WhatsApp + endereço, sem formulário burocrático)

6 seções totais. Cada uma respira porque o ruído ao redor sumiu.

### 6. Memória de 3 segundos

**Versão fraca (o que aconteceu na v6):**
> "Site de academia. Tinha cerejeira e kanji. Parecia decoração japonesa de restaurante."

**Versão sharp (alvo da v8):**
> "Uma faixa preta gasta em destaque, com nome bordado. A palavra ACOLHER ou um verbo similar em letras gigantes. Parecia um lugar de família, não de academia."

---

## Reference Library (3 buckets × 3-5 refs)

### Bucket 1 — Feeling refs (NÃO sites)

| Ref | O que ESPECIFICAMENTE está funcionando |
|---|---|
| Frames B&W do filme "Sanjuro" (Kurosawa, 1962) | Composição central, dignidade do velho sensei sem cara de impressionar |
| Fotografia de Hiroshi Sugimoto (seascapes B&W) | Tempo parado, atmosfera de respeito, mínimo de elementos |
| Capas do livro "Hagakure" edição moderna | Tipografia grande + uma única imagem icônica, sem ruído |
| Editoriais Apartamento Magazine sobre artesãos | Foto B&W + texto longo + zero ornamento, foco no humano |
| Capa do disco "Time Out" de Dave Brubeck | Tipografia sans extrema + 1 imagem central, nada mais |

### Bucket 2 — Structural refs (sites pra layout logic)

| Ref | Lógica estrutural roubada |
|---|---|
| aesop.com | Restraint espacial — cada seção como vitrine de museu, muito espaço entre elementos |
| massimodutti.com (página de produto) | Hero com 1 objeto centralizado, copy mínima, tipografia editorial |
| readymag.com (presentations) | Stacking vertical com 1 ideia por viewport, sem grids complexos |
| arc.net (Browser Company landing) | Hero com 1 frase grande + sub minúscula + zero ornamento |
| muji.com (página produto) | Hierarquia tipográfica extrema, monocromático, foto única |

### Bucket 3 — Detail refs (micro-interactions, hover, scroll)

| Ref | Detalhe roubado |
|---|---|
| stripe.com/payments (cor shift entre seções) | Transição suave de cor de fundo quando muda contexto |
| linear.app (hero entrance) | Fade-in lento (1.2s) + slight upward motion no load, sem bounce |
| apple.com/airpods (scroll triggered reveal) | Imagem do produto crescendo de 80% pra 100% conforme scroll |
| readme.com (cursor sutil em CTA) | Botão escurece levemente + ícone se move 2px no hover |
| are.na (transitions entre páginas) | Page transition em fade (não slide), mantém continuidade |

---

## Three Logics (3 frases extraídas)

### Lógica 1 — Cor

> **Preto profundo dominante (>80% da tela), branco quase puro pra texto, vermelho hinomaru SÓ em 3 lugares: linha de destaque sob seção, CTA primário, hover de link. Quando a cor vermelha aparece, é sinal — não decoração. Tudo o resto é P&B fotográfico (atletas em movimento, faixas, tatame).**

Tokens já no projeto:
- `dojo-black` (#0A0A0A) — fundo dominante
- `dojo-white` (#F5F5F5) — texto, fotos
- `dojo-red` (#D32F2F) — acentos pontuais (NÃO escala industrial)
- `dojo-gray` (#1A1A1A) — divisores sutis

### Lógica 2 — Tipografia

> **Duas famílias e ponto: 1 display sem-serifa condensada extrema (Migra / Editorial New / PP Right Grotesk) usada em escala 4-8rem pra headlines emocionais ("Sobre", "Filosofia"). 1 sans regular (Inter ou Söhne) em 0.875-1rem pra tudo funcional. Nada no meio. Os kanjis vivem em scale grande mas NUNCA como decoração ambient — só dentro de cards de modalidade ou na seção filosofia.**

Implementação atual usa Cormorant Garamond (serif) + Inter (sans) — funciona, mas avaliar trocar serif por display condensada pra mais peso editorial na v8.

### Lógica 3 — Espaço

> **Stacked vertical, 1 seção = 1 viewport mínimo, conteúdo centralizado com max-width 5xl (1024px). Generoso `py-20 sm:py-24 lg:py-32` entre seções — respiração é a regra. Nada de grids horizontais densos (exceto os 2 cards de modalidade, que vivem em 2-col só em lg+). Hero ocupa 100vh com objeto-herói centralizado, copy empurrada pra borda inferior. Toda página tem 1 momento de "respiro" — uma seção totalmente vazia exceto por 1 frase ou 1 imagem.**

Implementação atual: `mx-auto max-w-5xl` consistente em /sobre, /modalidades, /contato. Manter. Hero do home precisa upgrade pra 100vh real (atualmente é menor).

---

## 4 Prompts Ready-to-Use

### Prompt 1 — Pra IA de Copy (Claude/GPT)

```
Você é copywriter sênior brasileiro especializado em marcas de artes marciais
tradicionais. Escreva copy do site Dojô Família Scholze com este brief:

BRIEF:
- Sensação: "Que respeita quem foi sensei dos seus pais"
- Audiência: mãe procurando Judô pra filho de 7 anos OU adulto 35-50 voltando depois de décadas
- Anti-audiência: quem procura "MMA pra emagrecer" ou compara academia por seguidores no Instagram
- Objeto-herói: faixa preta usada com nome bordado
- Job: ACOLHER (não converter, não impressionar, não vender)
- Memória 3s: "lugar de família, não de academia"

TOM:
- Pacing devagar, sem CTA agressivo
- Convite, não pitch
- Frases curtas, peso emocional
- 1 frase por tela

PALAVRAS BANIDAS: moderno, limpo, minimalista, premium, profissional,
elegante, sleek, bonito, completo, ideal, melhor.

OUTPUT (JSON):
{
  "hero_headline": "máx 4 palavras",
  "hero_subheadline": "máx 12 palavras",
  "sobre_sensei_headline": "máx 4 palavras",
  "sobre_sensei_paragrafo": "máx 60 palavras — quem ele é, não currículo",
  "modalidades_headline": "máx 4 palavras",
  "judo_pitch": "máx 25 palavras — filosofia, não features",
  "jiujitsu_pitch": "máx 25 palavras — idem",
  "filosofia_intro": "máx 8 palavras antes da citação Jigoro Kano",
  "locais_headline": "máx 3 palavras",
  "contato_headline": "máx 3 palavras",
  "cta_primario": "máx 2 palavras",
  "footer_line": "1 frase final"
}
```

### Prompt 2 — Pra IA de Asset (Midjourney/OpenArt/Kling)

```
Gera o hero visual pro site Dojô Família Scholze.

OBJETO-HERÓI: faixa preta gasta de Judô, com nome bordado em japonês,
fim de fibra desgastada nas pontas pela cintura.

SENSAÇÃO: lugar com herança, peso de décadas de tatame, dignidade silenciosa
(NÃO drama, NÃO action, NÃO cinematic moderno).

LÓGICA COR: fundo preto profundo (#0A0A0A) dominante. Faixa preta destacada
por rim light suave do canto superior direito. Único toque de cor: vermelho
profundo (#D32F2F) discreto nos pontos costurados do nó. P&B no resto.

LÓGICA ESPAÇO: faixa enrolada centralizada no frame, 60% da altura da tela,
flutuando levemente sobre superfície de tatame (textura sutil), fundo
preto fade-out nas bordas. Sem ambiente, sem dojo atrás, sem pessoa.

REFS DE SENSAÇÃO:
- Frames B&W "Sanjuro" (Kurosawa) — dignidade contida
- Hiroshi Sugimoto seascapes — atmosfera de tempo parado
- Capas Hagakure edição moderna — minimalismo respeitoso

OUTPUT esperado:
- 4K, fundo escuro (não transparente — quero o atmosphere)
- Estilo: cinematic still photography (não 3D render, não illustration)
- Lens: 85mm, leve depth of field no fundo

Tools sugeridas:
- Midjourney v6+ com --ar 16:9 --style raw --stylize 100
- Recraft pra variants vetoriais (se quiser ilustração)
- Pra vídeo loop B&W de luta de judo (pendente do Davi):
  Kling 3.0 prompt: "judo match black and white, two athletes mid-throw,
  slow motion 60fps, cinematic lighting, dark background, monochrome,
  seamless loop 8 seconds, no audio, no text"
```

### Prompt 3 — Pra IA de Design (Figma / spec)

```
Desenha layout v8 do Dojô Família Scholze com este spec.

DECISÕES VISUAIS:
- Sensação: "respeita quem foi sensei dos seus pais"
- Hero: faixa preta gasta centralizada
- Job: acolher

LÓGICAS DE ESTILO:
- Cor: preto >80% + branco texto + vermelho hinomaru pontual (3 lugares só)
- Tipo: 1 display condensada extrema (4-8rem) + 1 sans regular (1rem) — nada no meio
- Espaço: stacked vertical, 1 seção = 1 viewport, max-w-5xl centralizado,
  generoso py-20+

SEÇÕES (na ordem):
1. Hero (100vh, faixa centralizada, headline + sub + 1 CTA)
2. Sobre o Sensei (foto B&W + parágrafo curto, sem currículo)
3. Filosofia (citação Jigoro Kano em serif italic large)
4. 2 Modalidades (Judô + Jiu-Jitsu, 2 cards lado-a-lado em lg+)
5. Locais & Planos (2 cards de sede, sem grid SaaS)
6. Contato (WhatsApp grande + endereço, sem formulário)

REGRAS DE LAYOUT:
- Hero: objeto-herói centro morto, copy nos terços inferiores
- Toda seção respira: py-20 sm:py-24 lg:py-32
- 1 momento de respiro entre seções 3 e 4 (seção totalmente vazia exceto
  por 1 kanji ou 1 linha "Ceder pra Vencer")
- Mobile-first: tudo stacka em 1 coluna <768px

DELIVERABLE: Figma frame com hero + 3 seções below-fold.

PRÉ-REQUISITO: revisar packs/design/website-premium-animated PLAYBOOK
Fase 03 (strip background) antes de copiar refs do bucket structure.
```

### Prompt 4 — Pra IA de Dev (Claude Code / Cursor)

```
Implementa v8 do Dojô Família Scholze landing público.

REPO: Repositorios/dojo-familia-scholze
STACK: Next.js 15 App Router + TypeScript + Tailwind v3 + Framer Motion +
@dojo-fs/ui (design tokens)

ASSETS:
- /public/images/hero-faixa.webp (gerar via Midjourney — ver Prompt 2)
- /public/copy.json (gerar via Claude — ver Prompt 1)

ESTRUTURA DE ARQUIVOS:
- apps/site/app/(public)/page.tsx → home com 6 seções
- apps/site/app/(public)/sobre/page.tsx → upgrade pra ancorar em brief
- apps/site/app/(public)/modalidades/page.tsx → manter v7 + remover qualquer kanji ambient remanescente
- apps/site/app/(public)/contato/page.tsx → manter v7
- apps/site/components/Hero.tsx → criar component novo com objeto-herói

STYLE TOKENS (já presentes em packages/ui/tokens.ts):
- bg-dojo-black, text-dojo-white, border-dojo-red — usar sempre via classe Tailwind
- NUNCA hex inline (#000, #fff, #D32F2F)

FONTES (no app/layout.tsx):
- Avaliar trocar Cormorant Garamond por display condensada (Migra/Editorial
  New) pra mais peso editorial — pendente decisão Davi

FEATURES POR SEÇÃO:

Hero (100vh):
- Faixa centralizada com Framer Motion variant heroReveal (fade + scale 0.95→1, duration 1.2s)
- Headline com staggerWords variant (60ms por palavra)
- Subheadline fade-in com delay 0.8s
- CTA single-button, magnético dentro de 40px no hover (motion.button com onMouseMove)

Sobre o Sensei:
- Foto B&W (grayscale full) com hover → grayscale-0 transition 700ms
- Texto em fadeOnly variant
- ZERO ornamento decorativo

Filosofia:
- Citação Jigoro Kano em serif italic 2.5-3rem
- quoteReveal variant (fade + slide-up + slight letter-spacing animation)
- Borda superior + inferior fina cinza divisora

2 Modalidades:
- Grid 1-col mobile, 2-col lg+ (já implementado em v7 /sobre — replicar)
- Cards com hover grayscale-0 transition
- Kanji INSIDE do card (NÃO ambient bg)

Locais & Planos:
- 2 cards de sede com endereço + horário + plano básico
- Accordion fechado por padrão pra detalhes de plano (Radix UI)

Contato:
- WhatsApp button GIGANTE (já implementado v7 /contato — replicar no home)
- Endereço com link Google Maps

OBRIGATÓRIO:
- useReducedMotion() em todo componente animado, fallback fadeOnly
- Imagens com next/image (lazy, explicit width/height, sizes)
- Texto contrast AA mínimo (4.5:1) — testar com axe-core
- Mobile-first, 3 viewports validados (1920/768/390)

VALIDAÇÃO (regra path-scoped ui-cycle-trigger.md):
- Fase 0 (BRIEF): este brief já lockado → ✓
- Fase 1 (VER): screenshot v7 atual antes de qualquer Edit
- Fase 2 (ANALISAR): comparar v7 vs este brief, listar lacunas
- Fase 3 (PROPOR): diff por seção
- Fase 4 (TESTAR): screenshot pós em 3 viewports
- Fase 5 (REPORTAR): antes/depois/brief obedecido

COMMIT:
feat(landing-v8): aplica brief lockado — faixa heroína, 6 seções, ritmo acolhedor
```

---

## Launch (Fase 11 do playbook website-premium-animated)

Repo já tem CI/CD configurado:

```bash
git add apps/site/
git commit -m "feat(landing-v8): aplica brief lockado design-brief-locker"
git push origin master
```

Vercel auto-deploy. Polling:
```bash
node scripts/wait-deploys.mjs
```

Quando READY → smoke test em https://dojofs-davi-scholzes-projects.vercel.app:
- /ver / (home)
- /ver /sobre
- /ver /modalidades
- /ver /contato

Em 3 viewports (1920/768/390). Reportar antes/depois ao Davi.

---

## Lacunas do v7 vs este brief (gap analysis)

| Decisão | v7 atual | Gap pra v8 |
|---|---|---|
| Hero objeto-herói | Foto Nathan Dumlao stock B&W | Trocar por faixa gasta (Midjourney) ou foto da faixa real do Sensei |
| Hero altura | ~80vh com padding interno | Precisa 100vh real |
| Copy hero | Headline genérica ("Dojô Família Scholze") | Aplicar Prompt 1 — headline 4 palavras emocional |
| CTA primário | Botão padrão sem magnetismo | Adicionar motion magnético |
| Filosofia | Citação Kano presente, ok | Avaliar trocar Cormorant por display condensada |
| 2 modalidades | Implementado em /sobre — sucesso | Replicar na home também |
| Locais & Planos | 2 cards já existem | Adicionar accordion Radix pra detalhes |
| Contato home | Só link pra /contato | Trazer WhatsApp button grande pra home (resolve "Acolher") |
| Vídeo loop | Pendente (Kling 3.0) | Gerar B&W judo loop 8s, embed como bg sutil do hero |
| Animações | Framer Motion presets (heroReveal, cardEnter) | Adicionar staggerWords no hero + magnético no CTA |

---

## Decisões pendentes do Davi pra v8

1. **Foto do herói:** usar faixa real do Sensei pai (precisaria pedir foto) ou gerar via Midjourney (faster)?
2. **Display font:** manter Cormorant Garamond serif ou trocar pra display condensada (Migra/Editorial New)?
3. **Vídeo loop:** quer que eu gere via Kling 3.0 agora ou adia v9?
4. **Headline:** rodar Prompt 1 numa IA agora ou ele mesmo quer escrever?
5. **Trazer WhatsApp gigante pra home:** mexe na decisão "acolher" — ok ou descaracteriza?

→ Pra v8 começar, preciso dessas 5 respostas. Sem elas, fica genérico de novo.

---

## Compliance

- ✅ Banned words: nenhuma palavra banida usada em decision layer, lógicas ou prompts
- ✅ PT-BR mantendo termos técnicos universais
- ✅ Anti-pollution: tradução + adaptação do Decision Maker, não cópia literal
- ✅ Atribuição preservada (origem Textura Agency no manifest do pack)
- ✅ File path determinístico: `_negocio/contextos/briefs/2026-05-26_landing-publico-v8.md`
- ✅ Compatível com regra path-scoped `.claude/rules/ui-cycle-trigger.md` v1.1 (Fase 0)

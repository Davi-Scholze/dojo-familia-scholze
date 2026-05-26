# `_negocio/identidade/inbox/` — fluxo de assets visuais

> Como entregar fotos, prints, vídeos e refs visuais pra IA usar no Dojô Família Scholze.

## Por que existe esta pasta

Antes desta estrutura, assets visuais chegavam soltos (anexo no chat, link colado, "use essa foto que eu mandei"). Resultado: IA usava errado, perdia contexto, virava bagunça.

Agora tem um caminho único, autoexplicativo, que sobrevive ao fechar da sessão.

## Estrutura

```
_negocio/identidade/
├── inbox/                          ← VOCÊ joga aqui
│   ├── README.md                   ← este arquivo
│   ├── _TEMPLATE-README.md         ← modelo pra cada sessão (copie + preencha)
│   └── <YYYY-MM-DD>_<descricao-curta>/
│       ├── README.md               ← preenchido por você (template acima)
│       ├── originais/              ← fotos/vídeos em qualquer formato/tamanho
│       └── prints/                 ← prints de tela, refs, screenshots
│
└── _curado/                        ← IA mexe aqui depois (não toque)
    └── <YYYY-MM-DD>_<descricao>/   ← versões otimizadas, renomeadas, prontas pro código
```

## Fluxo de trabalho

### 1. Você cria sessão nova

```
inbox/2026-05-26_sessao-fotos-sensei/
```

Nome em **kebab-case**, começando com data ISO (YYYY-MM-DD).

### 2. Você copia o template README

```bash
cp _TEMPLATE-README.md 2026-05-26_sessao-fotos-sensei/README.md
```

Ou simplesmente copia o arquivo no Explorer/Finder.

### 3. Você joga os arquivos brutos

- Fotos / vídeos → `originais/`
- Prints, refs visuais, capturas de Instagram → `prints/`

Qualquer formato (.jpg, .heic, .mov, .png, .mp4). Qualquer tamanho. Eu otimizo depois.

### 4. Você preenche o README

Mínimo:
- O que é cada arquivo (1 frase)
- Quais têm autorização pra uso público
- Sugestão sua de onde usar (hero / sobre / modalidades / contato — ou "não sei, você decide")

### 5. Você cola o caminho pra mim

> "Olha, joguei a sessão `inbox/2026-05-26_sessao-fotos-sensei/`, dá uma olhada e organiza"

### 6. Eu faço

- Leio o README inteiro
- Comprimo originais → WebP (qualidade 80%, <2MB)
- Renomeio com nomes semânticos (`sensei-hero.webp`, `faixa-preta-detalhe.webp`)
- Movo versões otimizadas pra `_curado/<mesma-data>_<mesma-descricao>/`
- Copio pra `apps/site/public/images/` quando uso no código
- Atualizo o README da sessão com seção "## Status: curado por IA em <data>" listando o que foi feito
- Te peço OK antes de aplicar em cada seção do site

## Regras

- ✅ Originais NUNCA são apagados — ficam em `originais/` pra sempre como fonte da verdade
- ✅ Toda foto de pessoa precisa autorização (LGPD + respeito) — declarar no README
- ✅ Nome de arquivo no `originais/` pode ser qualquer coisa (`DSC_0001.jpg`, `IMG_4521.heic`) — eu renomeio
- ❌ Não jogue arquivos sensíveis aqui (documentos, CPF, dados de aluno) — esta pasta vai pro git
- ❌ Não edite `_curado/` — é meu workspace
- ❌ Não use esta pasta pra contexto de negócio (texto, ideias) — isso vai em `_negocio/contextos/bruto/`

## Casos de uso típicos

| Situação | Pasta |
|---|---|
| Foto da faixa do Sensei pai (hero) | `inbox/<data>_objeto-heroi/` |
| Sessão de fotos com o Sensei dando aula | `inbox/<data>_sessao-sensei/` |
| Print de site competidor pra ref de layout | `inbox/<data>_refs-competidores/` |
| Imagem gerada por Nano Banana (cerejeira B&W) | `inbox/<data>_assets-ia/` |
| Vídeo loop B&W de luta de judô (Pexels download) | `inbox/<data>_videos-fundo/` |
| Logo do Dojô em vetor (SVG/AI) | `inbox/<data>_logos/` |

## Sobre o `.gitignore`

Esta pasta VAI pro git por padrão (assets de identidade são parte do produto). Se houver foto sensível pontual, declarar no README e mover pra fora antes de commit.

## Histórico de sessões

(IA preenche conforme vai curando)

- _nenhuma ainda — primeira sessão pendente do Davi mandar_

---
tipo: indice-assets
classificacao: bruto-sagrado
data: 2026-05-21
origem: stakeholder-pai (Sensei Cristiano Scholze)
status: parcial — 4 de ~9 assets entregues
tema: identidade-visual-oficial-dojo
---

# INDEX — Assets oficiais entregues 2026-05-21

> 4 arquivos reais entregues pelo pai (Sensei Cristiano Scholze).
> Bruto sagrado — NUNCA alterar. Para variações/derivações, usar nova pasta.

## Inventário entregue

| Arquivo | Tipo | Uso recomendado |
|---|---|---|
| `2026-05-21_logo-redondo-branco-oficial.png` | Logo redondo, versão branca | Fundos escuros (avatar app, splash dark, banner header dark) |
| `2026-05-21_logo-retangular-preto-oficial.png` | Logo retangular, alta resolução, fundo preto | Hero sections, capas, materiais impressos, headers app |
| `2026-05-21_banner-youtube-oficial.png` | Banner canal YouTube (cinza-grafite) | Capa do canal YT, ou base pra outros banners horizontais |
| `2026-05-21_certificado-template-oficial.pdf` | Template de certificado de graduação | Geração automatizada de certificado quando aluno sobe faixa |

## Especificação visual confirmada

### Logo
- Forma: flor estilizada 5 pétalas + ponto vermelho central
- Variações entregues: redondo (branco em fundo preto) + retangular (com texto "JUDÔ & BJJ" e "FAMÍLIA SCHOLZE")
- Anel externo do logo redondo: "CEDER PARA VENCER • JUDÔ E JIU-JITSU • FAMÍLIA SCHOLZE"

### Slogan e identidade textual
- **Slogan principal:** "CEDER PARA VENCER"
- **Kanji acompanhante:** 柔道 (Judô) + 柔術 (Jiu-Jitsu)
- **Marca completa:** "DOJÔ FAMÍLIA SCHOLZE"
- **Modalidades oficiais:** Judô + Jiu-Jitsu (BJJ)

### Paleta confirmada (extraída visualmente dos assets)
- **Preto puro:** `#000000` (fundo institucional)
- **Vermelho-sangue:** aproximadamente `#D32F2F` ou `#E53935` (faixa, ponto central, detalhes)
- **Branco puro:** `#FFFFFF` (logo em fundo escuro, texto sobre vermelho)
- **Cinza-grafite (banner YT):** aproximadamente `#3E3E3E` (alternativa neutra ao preto puro)

> Pendente: confirmar hex exatos via amostragem do PNG; abrir no Photoshop/Figma e pegar valores precisos antes de popular `design-guide.md`.

### Tipografia
- Headlines: sans-serif bold caixa-alta (provável CornerStoreJF — mencionada no print de pasta)
- Subheaders: sans-serif regular
- Slogan: sans-serif bold com tracking aumentado

## Hierarquia organizacional confirmada (via certificado)

- **Sensei Cristiano Scholze** (pai do Davi) — comanda o dojô, assina certificados
- **Davi Pereira Scholze** — co-signatário do certificado (organizador/admin)
- **Localização:** Curitiba/PR
- **Filosofia institucional:** Jigoro Kano (fundador do Judô) — citação "Somente se aproxima da perfeição, quem a procura com constância, sabedoria e, sobretudo, humildade."

## Sistema de graduação (extraído do certificado)

- Estrutura: certificado emitido por faixa conquistada (ex no template: "Faixa Roxa")
- Modalidades: Judô e Jiu-Jitsu (faixas distintas por modalidade)
- Documentação: certificado físico A4 horizontal com tema visual japonês tradicional
  (cerejeira, pagode, torii, ponto central)
- Disparo do certificado: progressão de faixa (evento gerido pelo Sensei)

## Estilo visual do certificado (referência pra app)

- Tema: japonês tradicional refinado (não kitsch)
- Elementos: pagode, torii, ramos de cerejeira, kanji
- Borda: ornamental com cores institucionais (vermelho + preto)
- Tipografia título: bold display sans-serif
- Tipografia corpo: serif elegante (talvez Italianno ou similar pra nomes manuscritos)
- Citação Jigoro Kano: rodapé centralizado

## Pendências ainda em aberto

(da pasta visualizada no print de assets do pai)

- [ ] **Logo redondo PRETO** (versão para fundos claros — temos só branco)
- [ ] **Logo retangular BRANCO** (versão para fundos claros — temos só preto)
- [ ] **Fonte CornerStoreJF.ttf** (precisa pra Tailwind/CSS)
- [ ] **Patch Lapela.pdf** (versão impressa do logo para kimono)
- [ ] **Guia IDENTIDADE VISUAL** (PDF/MD oficial com regras de uso)
- [ ] **Logos em SVG** (vetorial — fundamental pra app responsivo)
- [ ] **Hex codes exatos** da paleta (vermelho oficial: confirmar via amostragem)

## Uso futuro (próximos passos quando aplicar)

1. **Popular `design-guide.md`** do repo dojo com:
   - Hex exatos da paleta
   - Logos linkados (relative paths)
   - Tipografia oficial configurada
2. **Configurar Tailwind do app** com tokens da identidade
3. **Gerar templates de certificado** programaticamente (pdfkit / puppeteer) usando o PDF como referência visual
4. **Splash screen do app mobile** = logo redondo branco em fundo preto puro
5. **Avatar default do professor no app** = logo redondo
6. **Capa do app desktop** = layout do banner YouTube adaptado

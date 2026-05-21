---
tipo: imagem
classificacao: bruto-sagrado
sub-tipo: meta-evidencia-pendente-arquivos
data: 2026-05-21
origem: stakeholder-pai (dojo-familia-scholze)
descricao: Print de pasta (Google Drive ou pasta local) mostrando os arquivos da identidade visual oficial do Dojo. Prova a EXISTENCIA dos assets, nao os entrega.
tema: identidade-visual-dojo
ocr: |
  Banner Youtube.png
  Copia de Patch...
  Font CornerStoreJF.txt
  IDENTIDADE VISUAL
  Logo Retangular...
  Patch Lapela.pdf
  Scholze Certificado...
  Scholze Logo Redondo
pendente:
  - CRITICO: Davi precisa pegar os arquivos reais dessa pasta (logo .svg/.png alta, fonte .ttf, banner) e copiar pra _negocio/identidade/logos-e-marca/. Sem isso, design-guide do app nao tem fonte editavel.
related:
  - ../presenca-digital/2026-05-21_canal-youtube.png (banner em uso)
---

# Print de pasta — Assets de Identidade do Dojo (incompleto)

Print de pasta de arquivos (provavelmente Google Drive ou pasta local do pai)
listando os assets oficiais da identidade visual do Dojo. **NAO sao os
arquivos em si — eh prova de que existem.**

## Inventario visivel no print

| Asset | Tipo | Status |
|---|---|---|
| Logo Redondo (flor 5 petalas + ponto vermelho) | logo principal | pendente arquivo |
| Logo Retangular (banner JUDO & BJJ FAMILIA SCHOLZE) | logo secundario | pendente arquivo |
| Banner YouTube | imagem dimensao especifica | pendente arquivo |
| Patch Lapela | versao impressa do logo (kimono) | pendente arquivo |
| Scholze Certificado | template de certificado | pendente arquivo |
| Font CornerStoreJF | tipografia oficial (.ttf?) | pendente arquivo |
| IDENTIDADE VISUAL | guia (pasta ou arquivo?) | pendente arquivo |

## Acao critica

**Davi precisa pegar os arquivos reais dessa pasta** (provavelmente do pai
via Google Drive ou WhatsApp) e copiar pra:

```
_negocio/identidade/logos-e-marca/
  oficial/
    logo-redondo.svg (ou .png alta)
    logo-retangular.svg
    banner-youtube.png
    patch-lapela.pdf
    certificado-template.pdf
    font/CornerStoreJF.ttf
    guia-identidade-visual.pdf
```

Sem esses arquivos:
- design-guide.md do app fica abstrato (sem hex colors confirmadas, sem fonte real)
- /content-creator gera carrosseis sem o logo oficial
- App final usa fontes/cores aproximadas, nao a marca real

## Pendencia derivada

- [ ] **Davi pede ao pai os arquivos reais** (Drive link ou zip)
- [ ] Copiar para `_negocio/identidade/logos-e-marca/oficial/`
- [ ] Extrair hex codes do vermelho oficial e popular `design-guide.md`
- [ ] Instalar `CornerStoreJF.ttf` no projeto e configurar Tailwind

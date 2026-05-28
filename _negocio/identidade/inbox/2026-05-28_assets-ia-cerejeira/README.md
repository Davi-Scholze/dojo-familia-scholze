# Cerejeira — assets gerados Nano Banana (Google AI Studio)

> Pétala cerejeira B&W gerada via Nano Banana pra fundo cinematográfico v8 Dojô. Convertido pra WebM otimizado em 2 resoluções pra web.

## Arquivos

| Arquivo | Tamanho | Resolução | Codec | Áudio | Uso recomendado |
|---|---|---|---|---|---|
| `cerejeira-original.mp4` | 3.6MB | (preservar metadata) | H.264 | sim | **BRUTO SAGRADO** — nunca usar em web |
| `cerejeira-720p.webm` | 1.6MB | 1280×720 | VP9 CRF 35 | não | Alternativa qualidade alta (hero desktop premium) |
| `cerejeira-480p.webm` | **524KB** | 854×480 (provavelmente) | VP9 CRF 42 | não | **RECOMENDADO** pra hero v8 — performance mobile |

## Recomendação técnica pra v8 Dojô

```html
<video
  autoplay
  loop
  muted
  playsinline
  preload="metadata"
  style="opacity: 0.3; mix-blend-mode: lighten;"
>
  <source src="/assets/cerejeira-480p.webm" type="video/webm" />
  <!-- Fallback estático se WebM não suportado -->
</video>
```

**Decisões:**
- `autoplay + loop + muted + playsinline`: requisitos pra autoplay em mobile (iOS Safari + Android)
- `preload="metadata"`: não baixa o vídeo até hero aparecer (LCP friendly)
- `opacity: 0.3 + mix-blend-mode: lighten`: cerejeira ambient sem dominar a cena
- Sem áudio: reduz peso 30-40% + não interfere em vídeo de fundo decorativo
- 480p suficiente pra fundo decorativo blur (não é primary content)

## Performance esperada

- LCP impact: **~50-150ms** (preload metadata + lazy load real)
- CLS impact: **0** (vídeo absoluto/fixed, não desloca layout)
- Bundle adicional: **524KB** (cacheable após first load)
- Mobile cellular impact: aceitável (<1s download em 4G)

## Cuidados

- **Respeitar `prefers-reduced-motion`** — desabilitar autoplay se usuário pediu reduzido:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .cerejeira-bg { animation: none; }
    video.cerejeira { display: none; }
  }
  ```
- Testar em Safari iOS (codec VP9 + autoplay quirks)
- Fallback estático pra browsers sem WebM (raro 2026+)

## Versionamento

- 2026-05-28 v1: original 3.6MB + 720p 1.6MB + 480p 524KB

## Cross-refs

- Pack `midia/carrossel-visual` (estilo visual base)
- Política `1-ESQUELETO/politicas/estilo-visual-fallback.md` (Inter + paleta sóbria)
- Brief v8 lockado: `_negocio/contextos/briefs/2026-05-26_landing-publico-v8.md`

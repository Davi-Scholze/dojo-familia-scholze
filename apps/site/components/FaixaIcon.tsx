/**
 * FaixaIcon — ícone SVG inline de faixa de artes marciais (judô / jiu-jitsu).
 *
 * Substitui o badge colorido literal por uma representação visual estilizada:
 * retângulo principal + nó central + grades/listras opcionais na ponta (sistema IBJJF).
 *
 * Cores são valores hex literais (exceção semântica — cores REAIS das faixas,
 * não tokens da marca). Documentado em modalidades/page.tsx.
 *
 * A11y: aria-label automático com nome da cor + grades; role="img".
 */

interface FaixaIconProps {
  /** Cor visual da faixa (hex) */
  hex: string;
  /** Nome da cor pra a11y (ex: "Branca", "Azul", "Marrom") */
  nome: string;
  /** Grades/listras na ponta direita (sistema IBJJF — 0 a 6) */
  grades?: number;
  /** Cor das grades (default: branco; usar "red" pra dans de preta) */
  gradeColor?: "white" | "red";
  /** Indica se faixa é listrada (vermelha/preta coral, vermelha/branca) */
  stripe?: "black" | "white";
  /** Tamanho do ícone */
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: { w: 48, h: 16 },
  md: { w: 72, h: 24 },
  lg: { w: 96, h: 32 },
};

export function FaixaIcon({
  hex,
  nome,
  grades = 0,
  gradeColor = "white",
  stripe,
  size = "md",
}: FaixaIconProps) {
  const { w, h } = SIZE_MAP[size];

  // Cor da grade
  const gradeFill = gradeColor === "red" ? "#DC2626" : "#FFFFFF";

  // Brightness reduzida pro nó (parece dobra/sombra)
  const noColor = hex === "#0A0A0A" || hex === "#111111" ? "#1F1F1F" : hex;

  // Stroke pra dar profundidade (mais visível em faixas claras)
  const isDark = ["#0A0A0A", "#111111", "#1F1F1F", "#7F1D1D", "#92400E"].includes(hex);
  const strokeColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)";

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 96 32"
      role="img"
      aria-label={`Faixa ${nome}${grades > 0 ? `, ${grades} graus` : ""}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Corpo principal da faixa */}
      <rect
        x="2"
        y="8"
        width="92"
        height="16"
        rx="1.5"
        fill={hex}
        stroke={strokeColor}
        strokeWidth="0.5"
      />

      {/* Stripe central (vermelha/preta coral, vermelha/branca) */}
      {stripe && (
        <rect
          x="2"
          y="14"
          width="92"
          height="4"
          fill={stripe === "white" ? "#FFFFFF" : "#0A0A0A"}
        />
      )}

      {/* Nó central — pequeno retângulo destacado */}
      <rect
        x="38"
        y="6"
        width="20"
        height="20"
        rx="1"
        fill={noColor}
        stroke={strokeColor}
        strokeWidth="0.5"
      />

      {/* Pontas do nó (acima + abaixo) */}
      <path
        d="M 42 6 L 42 3 L 44 3 L 44 6 Z"
        fill={noColor}
      />
      <path
        d="M 52 26 L 52 29 L 54 29 L 54 26 Z"
        fill={noColor}
      />

      {/* Grades/listras na ponta direita (IBJJF) */}
      {grades > 0 && (
        <g>
          {Array.from({ length: grades }).map((_, i) => (
            <rect
              key={i}
              x={70 + i * 4}
              y="10"
              width="2.5"
              height="12"
              fill={gradeFill}
              opacity="0.85"
            />
          ))}
        </g>
      )}
    </svg>
  );
}

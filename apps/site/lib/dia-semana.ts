/**
 * Helpers de dia-da-semana em timezone BR.
 * Vercel runtime = UTC; precisa converter explicitamente pra America/Sao_Paulo.
 */

const TZ_BR = "America/Sao_Paulo";

export const DIAS_SHORT_PT = {
  dom: "Domingo",
  seg: "Segunda",
  ter: "Terça",
  qua: "Quarta",
  qui: "Quinta",
  sex: "Sexta",
  sab: "Sábado",
} as const;

export type DiaSemanaShort = keyof typeof DIAS_SHORT_PT;

const ORDER: DiaSemanaShort[] = [
  "dom",
  "seg",
  "ter",
  "qua",
  "qui",
  "sex",
  "sab",
];

/**
 * Dia da semana de "hoje" no timezone BR, no formato curto usado em
 * turmas.horario_recorrente: 'seg' | 'ter' | ... | 'dom'.
 */
export function diaSemanaHojeBR(now: Date = new Date()): DiaSemanaShort {
  // Converte pra string local BR e re-parse — Date.getDay() depois reflete BR.
  const brStr = now.toLocaleString("en-US", { timeZone: TZ_BR });
  const brDate = new Date(brStr);
  return ORDER[brDate.getDay()];
}

/**
 * Data ISO YYYY-MM-DD de hoje em BR (não-naive, baseado em America/Sao_Paulo).
 */
export function dataHojeBR(now: Date = new Date()): string {
  // en-CA → YYYY-MM-DD; sv-SE seria equivalente
  return now.toLocaleDateString("en-CA", { timeZone: TZ_BR });
}

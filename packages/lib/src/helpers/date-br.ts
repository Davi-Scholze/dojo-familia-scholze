/**
 * Helpers de data — formato brasileiro.
 *
 * Convenções:
 * - Entrada: ISO 8601 (`YYYY-MM-DD` ou `YYYY-MM-DDTHH:mm:ssZ`)
 * - Saída: `DD/MM/YYYY` ou `DD/MM/YYYY HH:mm`
 *
 * Timezone padrão: America/Sao_Paulo (BRT/BRST conforme época do ano).
 */

const TZ_BR = "America/Sao_Paulo";

/**
 * Formata data ISO pra `DD/MM/YYYY` em pt-BR.
 *
 * @example formatDateBR("2026-05-25") => "25/05/2026"
 */
export function formatDateBR(isoDate: string): string {
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", {
    timeZone: TZ_BR,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Formata datetime ISO pra `DD/MM/YYYY HH:mm` em pt-BR.
 */
export function formatDateTimeBR(isoDateTime: string): string {
  const d = new Date(isoDateTime);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString("pt-BR", {
    timeZone: TZ_BR,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Diferença em anos completos entre 2 datas ISO (idade).
 *
 * @example diffYears("2010-01-15", "2026-05-25") => 16
 */
export function diffYears(fromIso: string, toIso: string): number {
  const from = new Date(fromIso);
  const to = new Date(toIso);
  if (isNaN(from.getTime()) || isNaN(to.getTime())) return 0;
  let years = to.getFullYear() - from.getFullYear();
  const aniversarioPassou =
    to.getMonth() > from.getMonth() ||
    (to.getMonth() === from.getMonth() && to.getDate() >= from.getDate());
  if (!aniversarioPassou) years -= 1;
  return years;
}

/**
 * Helpers de moeda — Real brasileiro (BRL).
 *
 * Convenção interna: valores armazenados em **centavos (integer)** pra evitar
 * arredondamento float. Conversão pra display via formatBRL.
 */

/**
 * Formata centavos como `R$ 1.234,56`.
 *
 * @example formatBRL(12350) => "R$ 123,50"
 * @example formatBRL(8000000) => "R$ 80.000,00"
 */
export function formatBRL(centavos: number): string {
  if (!Number.isFinite(centavos)) return "R$ 0,00";
  const reais = centavos / 100;
  return reais.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Parse string formato BR (`"R$ 123,50"` ou `"123,50"`) pra centavos integer.
 * Retorna NaN se input inválido.
 *
 * @example parseBRL("R$ 123,50") => 12350
 * @example parseBRL("1.234,56") => 123456
 */
export function parseBRL(input: string): number {
  if (typeof input !== "string") return NaN;
  const cleaned = input
    .replace(/R\$\s?/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();
  const reais = parseFloat(cleaned);
  if (!Number.isFinite(reais)) return NaN;
  return Math.round(reais * 100);
}

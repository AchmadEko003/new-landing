export function formatCurrency(
  value: number | string,
  locale: string = "id-ID",
  currency: string = "IDR",
): string {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(number)) return "-";
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  // Replace dots with commas for thousand separators
  return formatted.replace(/\./g, ",");
}

export function formatCompactCurrency(
  value: number | string,
  locale: string = "id-ID",
  currency: string = "IDR",
): string {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(number)) return "-";

  // For amounts >= 2,000,000, use compact notation
  if (number >= 2000000) {
    if (number >= 1000000000) {
      // Billions
      const billions = number / 1000000000;
      return `Rp ${billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(1)}M`;
    } else if (number >= 1000000) {
      // Millions
      const millions = number / 1000000;
      return `Rp ${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}Jt`;
    }
  }

  // For smaller amounts, use regular formatting
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  // Replace dots with commas for thousand separators
  return formatted.replace(/\./g, ",");
}

function formatCurrency(value, locale = "id-ID", currency = "IDR") {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(number)) return "-";
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
  return formatted.replace(/\./g, ",");
}

export { formatCurrency as f };
//# sourceMappingURL=currency.mjs.map

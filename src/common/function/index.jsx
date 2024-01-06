export function formatNumberWithPeriods(number) {
  const numberFormat = Number(number);
  return numberFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

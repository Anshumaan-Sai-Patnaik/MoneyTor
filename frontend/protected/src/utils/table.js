export const fmt = (n) => Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Compact form for the dashboard tiles: 31428.55 -> "31.43k"
export const compact = (n) => {
  const value = Number(n || 0);
  return Math.abs(value) >= 1000 ? `${(value / 1000).toFixed(2)}k` : fmt(value);
};

export const pct = (n) => `${n >= 0 ? "+" : ""}${Number(n || 0).toFixed(2)}%`;

// Day change is derived from the instrument's previous close, never stored.
export const dayChange = (price, prevClose) =>
  prevClose ? ((price - prevClose) / prevClose) * 100 : 0;

export const thClass = "whitespace-nowrap px-2.5 py-3.5 text-right text-xs font-light text-gray-500";
export const tdClass = "whitespace-nowrap px-2.5 py-2.5 text-right text-sm text-gray-600";

export const signClass = (value) => (Number(value) < 0 ? "text-red-500" : "text-green-600");

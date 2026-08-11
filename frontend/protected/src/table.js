export const fmt = (n) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const thClass = "whitespace-nowrap px-2.5 py-3.5 text-right text-xs font-light text-gray-500";
export const tdClass = "whitespace-nowrap px-2.5 py-2.5 text-right text-sm text-gray-600";

export const signClass = (value) => (String(value).startsWith("-") ? "text-red-500" : "text-green-600");

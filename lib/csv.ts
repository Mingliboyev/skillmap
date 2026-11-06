export function escapeCsv(value:unknown){if(value==null)return"";const text=typeof value==="object"?JSON.stringify(value):String(value);return/[",\r\n]/.test(text)?`"${text.replaceAll('"','""')}"`:text}
export function toCsv<T extends Record<string,unknown>>(rows:T[],columns:(keyof T)[]){return[columns.map(escapeCsv).join(","),...rows.map(row=>columns.map(c=>escapeCsv(row[c])).join(","))].join("\r\n")}
export const UTF8_BOM="\uFEFF";

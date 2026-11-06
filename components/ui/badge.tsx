import type { ReactNode } from "react";
export function Badge({children}:{children:ReactNode}) { return <span className="inline-flex max-w-full rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-[.1em] text-teal-900">{children}</span> }

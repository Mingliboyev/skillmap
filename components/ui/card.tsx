import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
export function Card({className,...props}:HTMLAttributes<HTMLDivElement>) { return <div className={cn("rounded-2xl border border-ui-border bg-surface p-6 text-primary-text shadow-[0_12px_35px_rgba(15,23,42,.06)]",className)} {...props}/> }

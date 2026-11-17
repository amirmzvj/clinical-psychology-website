"use client";

import { useState } from "react";
import { cn, toFa } from "@/lib/utils";

export type FaqItem = { id: number; question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<number | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-sand-200 overflow-hidden rounded-3xl border border-sand-300 bg-white/80">
      {items.map((item, index) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right transition hover:bg-brand-50/40 sm:px-6"
            >
              <span className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.65rem] font-bold transition",
                    open ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700",
                  )}
                >
                  {toFa(index + 1)}
                </span>
                <span className={cn("text-sm font-bold", open ? "text-brand-800" : "text-ink-800")}>
                  {item.question}
                </span>
              </span>
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-transform duration-300",
                  open
                    ? "rotate-45 border-brand-500 bg-brand-500 text-white"
                    : "border-sand-300 text-ink-500",
                )}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pr-14 text-sm leading-8 text-ink-500 sm:px-6 sm:pr-16">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

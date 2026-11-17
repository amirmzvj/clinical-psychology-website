"use client";

import { useCallback, useEffect, useState } from "react";
import { cn, toFa } from "@/lib/utils";

export type TestimonialItem = {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
};

export default function TestimonialSlider({ items }: { items: TestimonialItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (direction: number) => {
      setIndex((current) => (current + direction + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const timer = window.setInterval(() => go(1), 6500);
    return () => window.clearInterval(timer);
  }, [go, paused, items.length]);

  if (items.length === 0) return null;
  const active = items[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="card relative overflow-hidden p-7 sm:p-10">
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-100/60 blur-2xl" />
        <svg
          viewBox="0 0 24 24"
          className="relative h-9 w-9 text-brand-300"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.5 5C6.5 6.6 4.8 9.3 4.8 12.6c0 3.3 1.9 5.4 4.5 5.4 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1 .2.3-1.6 1.6-3.1 3.4-4.1L9.5 5Zm9 0c-3 1.6-4.7 4.3-4.7 7.6 0 3.3 1.9 5.4 4.5 5.4 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1 .2.3-1.6 1.6-3.1 3.4-4.1L18.5 5Z" />
        </svg>

        <blockquote className="relative mt-5 min-h-[8.5rem] text-[0.98rem] leading-9 text-ink-700 sm:min-h-[7rem] sm:text-[1.05rem]">
          {active.quote}
        </blockquote>

        <div className="relative mt-6 flex items-center justify-between gap-4 border-t border-sand-200 pt-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-md shadow-brand-900/20">
              {active.initials}
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900">{active.name}</p>
              <p className="text-[0.7rem] text-ink-500">{active.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gold-500" aria-label={`امتیاز ${active.rating} از ۵`}>
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <svg
                key={starIndex}
                viewBox="0 0 24 24"
                className={cn("h-4 w-4", starIndex < active.rating ? "fill-current" : "fill-sand-300")}
                aria-hidden
              >
                <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.4l6.6-.9 2.9-6Z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {items.map((item, dotIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`نظر ${toFa(dotIndex + 1)}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                dotIndex === index ? "w-7 bg-brand-600" : "w-1.5 bg-sand-300 hover:bg-brand-300",
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="نظر قبلی"
            className="grid h-9 w-9 place-items-center rounded-full border border-sand-300 bg-white text-ink-700 transition hover:border-brand-400 hover:text-brand-700"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="نظر بعدی"
            className="grid h-9 w-9 place-items-center rounded-full border border-sand-300 bg-white text-ink-700 transition hover:border-brand-400 hover:text-brand-700"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "دربارهٔ من" },
  { href: "/services", label: "خدمات" },
  { href: "/assessment", label: "ارزیابی کودک" },
  { href: "/blog", label: "مقالات" },
  { href: "/contact", label: "تماس" },
];

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="زهرا زینالی — صفحهٔ اصلی">
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 text-lg font-black text-white shadow-lg shadow-brand-900/25 transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_60%)]" />
        <span className="relative">ز</span>
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-[0.98rem] font-extrabold tracking-tight",
            tone === "light" ? "text-white" : "text-ink-900",
          )}
        >
          زهرا زینالی
        </span>
        <span
          className={cn(
            "text-[0.68rem] font-medium",
            tone === "light" ? "text-brand-200/80" : "text-ink-500",
          )}
        >
          روانشناس کودک و نوجوان
        </span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-[0_18px_40px_-32px_rgba(10,26,23,0.55)]" : "bg-transparent",
      )}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="منوی اصلی">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(item.href) ? "text-brand-700" : "text-ink-700/80 hover:text-brand-700",
              )}
            >
              {item.label}
              {isActive(item.href) ? (
                <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-l from-brand-600 to-brand-300" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 rounded-full border border-sand-300 bg-white/70 px-3.5 py-2 text-xs font-bold text-ink-800 transition hover:border-brand-400 hover:text-brand-700 xl:inline-flex"
            dir="ltr"
          >
            <span className="text-brand-600">☎</span>
            {SITE.phone}
          </a>
          <Link href="/booking" className="btn btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            رزرو نوبت
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-sand-300 bg-white/80 text-ink-800 transition hover:border-brand-300 hover:text-brand-700 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-sand-300/60 bg-sand-50/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-x flex flex-col gap-1 py-4" aria-label="منوی موبایل">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm font-medium transition",
                isActive(item.href) ? "bg-brand-50 text-brand-800" : "text-ink-700 hover:bg-white",
              )}
            >
              {item.label}
            </Link>
          ))}
          <a href={SITE.phoneHref} className="btn btn-outline mt-1 w-full" dir="ltr">
            ☎ {SITE.phone}
          </a>
          <Link href="/booking" className="btn btn-primary w-full">
            رزرو نوبت
          </Link>
        </nav>
      </div>
    </header>
  );
}

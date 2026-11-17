import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { ARTICLES, SITE } from "@/lib/content";
import { formatDateFa, toFa } from "@/lib/utils";

export const metadata: Metadata = {
  title: "مقالات روانشناسی کودک و نوجوان",
  description:
    "مقالات تخصصی و کاربردی دربارهٔ رفتار کودک، اضطراب، بازی‌درمانی، بیش‌فعالی، شب‌ادراری و بلوغ؛ نوشتهٔ زهرا زینالی.",
};

export default function BlogPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="absolute left-0 top-24 h-64 w-64 rounded-full bg-gold-300/25 blur-3xl" />
        </div>
        <div className="container-x relative pb-10 pt-10 lg:pt-14">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="مقالات"
              title={
                <>
                  دنیای کودک را <span className="gradient-text">بیشتر</span> بشناسید
                </>
              }
              description="نوشته‌های کوتاه، علمی و قابل اجرا دربارهٔ رفتار، هیجان و رشد کودک و نوجوان؛ بدون اصطلاحات پیچیده."
            />
          </Reveal>
        </div>
      </section>

      {featured ? (
        <section className="container-x pb-8">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="card group grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip">{featured.category}</span>
                  <span className="text-[0.68rem] text-ink-500">
                    {formatDateFa(featured.publishedAt)} • {toFa(featured.readMinutes)} دقیقه مطالعه
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-extrabold leading-9 text-ink-900 transition group-hover:text-brand-800 sm:text-2xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[0.88rem] leading-8 text-ink-500">{featured.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-brand-700 transition group-hover:gap-3">
                  خواندن مقاله
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="relative flex items-center justify-center bg-gradient-to-br from-brand-100 via-brand-50 to-sand-100 p-8">
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,#ffffff_0%,transparent_50%)]" />
                <span className="relative text-7xl drop-shadow-sm">{featured.emoji}</span>
              </div>
            </Link>
          </Reveal>
        </section>
      ) : null}

      <section className="container-x pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article, index) => (
            <Reveal key={article.slug} delay={index * 70}>
              <Link href={`/blog/${article.slug}`} className="card group flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sand-100 text-lg">
                    {article.emoji}
                  </span>
                  <span className="text-[0.65rem] font-semibold text-brand-700">{article.category}</span>
                </div>
                <h3 className="mt-4 text-base font-extrabold leading-7 text-ink-900 transition group-hover:text-brand-800">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-[0.82rem] leading-7 text-ink-500">
                  {article.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-sand-200 pt-3 text-[0.68rem] text-ink-500">
                  <span>{formatDateFa(article.publishedAt)}</span>
                  <span>{toFa(article.readMinutes)} دقیقه</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-sand-300 bg-white/70 p-7 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-extrabold text-ink-900">سؤالی دربارهٔ رفتار کودک دارید؟</h2>
              <p className="mt-1 text-sm text-ink-500">
                در تلگرام پیام بدهید یا برای رزرو نوبت تماس بگیرید.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={SITE.telegramHref} target="_blank" rel="noreferrer" className="btn btn-outline">
                تلگرام {SITE.telegram}
              </a>
              <Link href="/booking" className="btn btn-primary">
                رزرو نوبت
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/reveal";
import { ARTICLES, SITE } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { formatDateFa, toFa } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) return { title: "مقاله یافت نشد" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: "article" },
  };
}

function renderContent(content: string) {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={index} className="mt-8 mb-3 text-xl font-extrabold text-ink-900">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("> ")) {
      return (
        <blockquote
          key={index}
          className="my-6 rounded-2xl border-r-[3px] border-brand-400 bg-brand-50/70 px-5 py-4 text-[0.92rem] font-medium leading-8 text-brand-900"
        >
          {block.replace("> ", "")}
        </blockquote>
      );
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").map((line) => line.replace(/^-\s*/, ""));
      return (
        <ul key={index} className="my-4 space-y-2 pr-5">
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="list-disc text-[0.92rem] leading-8 text-ink-700">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="mb-4 text-[0.95rem] leading-9 text-ink-700">
        {block}
      </p>
    );
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);

  if (!article) notFound();

  const related = ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
        </div>
        <div className="container-x relative pb-8 pt-10 lg:pt-14">
          <Reveal>
            <nav className="flex items-center gap-2 text-[0.7rem] text-ink-500" aria-label="مسیر صفحه">
              <Link href="/" className="hover:text-brand-700">
                خانه
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-brand-700">
                مقالات
              </Link>
              <span>/</span>
              <span className="text-ink-800">{article.category}</span>
            </nav>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="chip">{article.category}</span>
              <span className="text-[0.68rem] text-ink-500">
                {formatDateFa(article.publishedAt)} • {toFa(article.readMinutes)} دقیقه مطالعه
              </span>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.45] text-ink-900 sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-8 text-ink-500">{article.excerpt}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <Reveal>
            <article className="card p-6 sm:p-9">
              <div className="mb-6 flex items-center gap-3 rounded-2xl bg-sand-50 p-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg">
                  {article.emoji}
                </span>
                <div>
                  <p className="text-xs font-bold text-ink-900">نوشتهٔ زهرا زینالی</p>
                  <p className="text-[0.68rem] text-ink-500">روانشناس کودک و نوجوان</p>
                </div>
              </div>
              <div className="prose-fa">{renderContent(article.content)}</div>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-sand-200 pt-5">
                {article.tags.map((tag) => (
                  <span key={tag} className="chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={100} className="space-y-4">
            <div className="card overflow-hidden">
              <img
                src={IMAGES.playroom}
                alt="اتاق بازی کودک"
                className="h-40 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h2 className="text-sm font-extrabold text-ink-900">این موضوع برایتان آشناست؟</h2>
                <p className="mt-1.5 text-[0.78rem] leading-6 text-ink-500">
                  برای رزرو نوبت کافی است تماس بگیرید یا در تلگرام پیام بدهید؛ همکاران ما ساعت جلسه
                  را هماهنگ می‌کنند.
                </p>
                <a href={SITE.phoneHref} className="btn btn-primary mt-4 w-full !py-2.5 text-xs" dir="ltr">
                  ☎ {SITE.phone}
                </a>
                <a
                  href={SITE.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline mt-2 w-full !py-2.5 text-xs"
                >
                  پیام در تلگرام
                </a>
              </div>
            </div>

            <div className="card p-5">
              <h2 className="text-sm font-extrabold text-ink-900">مقالات مرتبط</h2>
              <ul className="mt-3 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="group flex items-start gap-2.5 text-[0.78rem] leading-6 text-ink-700"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-sand-100 text-sm">
                        {item.emoji}
                      </span>
                      <span className="transition group-hover:text-brand-800">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-200 bg-brand-50/70 p-5">
              <p className="text-xs font-bold text-brand-900">ابزارهای ارزیابی استاندارد کودک</p>
              <p className="mt-1 text-[0.75rem] leading-6 text-ink-700">
                پرسشنامه‌های معتبر SDQ، SNAP-IV و اضطراب کودک را تکمیل و گزارش را برای روانشناس
                دانلود کنید.
              </p>
              <Link href="/assessment" className="btn btn-outline mt-3 w-full !py-2 text-xs">
                شروع ارزیابی
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

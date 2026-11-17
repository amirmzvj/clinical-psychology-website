/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Counter from "@/components/counter";
import FaqAccordion from "@/components/faq-accordion";
import Marquee from "@/components/marquee";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TestimonialSlider from "@/components/testimonial-slider";
import { ARTICLES, FAQS, SITE, SPECIALTIES, TESTIMONIALS } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { formatDateFa, toFa } from "@/lib/utils";

export default function HomePage() {
  const latestArticles = ARTICLES.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-10 h-80 w-80 animate-breathe rounded-full bg-brand-200/50 blur-3xl" />
          <div className="absolute -left-20 top-40 h-72 w-72 animate-float-slow rounded-full bg-clay-300/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-gold-300/25 blur-3xl" />
        </div>

        <div className="container-x relative grid gap-12 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-800 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
                </span>
                پذیرش کودک و نوجوان {SITE.ages} — جلسات حضوری
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.1rem] font-black leading-[1.35] text-ink-900 sm:text-5xl sm:leading-[1.3] lg:text-[3.3rem]">
                دنیای کودک را
                <br />
                <span className="gradient-text">از درون خودش</span> بفهمیم
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-9 text-ink-500">
                من <strong className="font-bold text-ink-800">زهرا زینالی</strong> هستم؛ دانش‌آموختهٔ
                کارشناسی ارشد روانشناسی بالینی. در اتاق بازی و گفت‌وگو، به کودک کمک می‌کنم
                احساساتش را بشناسد و به والدین یاد می‌دهم چطور در خانه همراه او باشند.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/booking" className="btn btn-primary !px-6 !py-3.5 text-[0.95rem]">
                  رزرو نوبت کودک و نوجوان
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/assessment" className="btn btn-outline !px-6 !py-3.5 text-[0.95rem]">
                  ارزیابی رفتار کودک
                </Link>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 space-x-reverse">
                    {["ا", "س", "ن", "ف"].map((letter, index) => (
                      <span
                        key={letter}
                        className="grid h-9 w-9 place-items-center rounded-full border-2 border-sand-100 bg-gradient-to-br from-brand-500 to-brand-700 text-[0.7rem] font-bold text-white"
                        style={{ zIndex: 4 - index }}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs leading-5 text-ink-500">
                    <span className="block font-bold text-ink-800">۳۲۰ جلسهٔ درمانی</span>
                    همراهی والدین و کودک در مسیر رشد
                  </div>
                </div>
                <div className="h-10 w-px bg-sand-300" />
                <div className="text-xs leading-5 text-ink-500">
                  <span className="block font-bold text-ink-800">۳ سال تجربهٔ بالینی</span>
                  کارشناسی ارشد روانشناسی بالینی
                </div>
              </div>
            </Reveal>
          </div>

          {/* visual */}
          <Reveal delay={180} className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[2.8rem] bg-gradient-to-br from-brand-200/60 via-white/40 to-clay-300/40 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.4rem] border border-white/70 bg-white shadow-[0_40px_90px_-50px_rgba(10,26,23,0.6)]">
                <img
                  src={IMAGES.hero}
                  alt="جلسهٔ بازی‌درمانی کودک"
                  className="h-[26rem] w-full object-cover sm:h-[30rem]"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent p-5 pt-16">
                  <p className="text-sm font-bold text-white">اتاق بازی و درمان کودک</p>
                  <p className="mt-0.5 text-[0.72rem] text-white/70">
                    بازی، زبان کودک است؛ ما آن را می‌شنویم
                  </p>
                </div>
              </div>

              <div className="absolute -left-5 bottom-24 animate-float-slow rounded-2xl border border-white/70 bg-white/90 p-3.5 shadow-xl shadow-ink-900/10 backdrop-blur">
                <p className="text-[0.65rem] text-ink-500">تجربهٔ بالینی</p>
                <p className="mt-0.5 text-lg font-extrabold text-ink-900">۳ سال</p>
              </div>

              <div className="absolute -bottom-4 right-6 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3.5 py-2 shadow-lg backdrop-blur">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-[0.65rem] text-brand-800">
                  ✓
                </span>
                <span className="text-[0.7rem] font-semibold text-ink-800">
                  عضو انجمن روانشناسی کودک ایران
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="border-y border-sand-300/70 bg-white/50 py-4 backdrop-blur">
          <Marquee items={SPECIALTIES} />
        </div>
      </section>

      {/* --------------------------------------------------------------- STATS */}
      <section className="container-x -mt-2 py-14">
        <Reveal>
          <div className="grid gap-4 rounded-3xl border border-sand-300 bg-white/70 p-6 shadow-[0_30px_70px_-60px_rgba(10,26,23,0.6)] sm:grid-cols-3 lg:p-8">
            {[
              { value: 3, suffix: " سال", label: "تجربهٔ بالینی", hint: "روانشناسی کودک و نوجوان" },
              { value: 320, suffix: "", label: "جلسهٔ درمانی", hint: "جلسات حضوری در مطب" },
              { value: 3, suffix: " تا ۱۸ سال", label: "گروه سنی", hint: "پیش از دبستان تا نوجوانی" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1 px-2 py-2 text-center sm:text-right">
                <span className="text-3xl font-black text-brand-700">
                  <Counter value={item.value} suffix={item.suffix} />
                </span>
                <span className="text-sm font-bold text-ink-800">{item.label}</span>
                <span className="text-[0.7rem] text-ink-500">{item.hint}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* --------------------------------------------------------------- ABOUT */}
      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal className="relative">
            <div className="grid grid-cols-2 gap-3">
              <img
                src={IMAGES.motherChild}
                alt="بازی مادر و کودک"
                className="h-56 w-full rounded-3xl object-cover shadow-lg shadow-ink-900/10 sm:h-64"
                loading="lazy"
              />
              <img
                src={IMAGES.art}
                alt="نقاشی کودک در جلسهٔ هنردرمانی"
                className="mt-6 h-56 w-full rounded-3xl object-cover shadow-lg shadow-ink-900/10 sm:h-64"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 right-4 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
              <p className="text-[0.65rem] text-ink-500">مطب تخصصی</p>
              <p className="text-xs font-bold text-ink-900">{SITE.addressShort}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading
              align="start"
              eyebrow="دربارهٔ من"
              title={
                <>
                  کودک را نباید «درست» کرد؛ باید <span className="gradient-text">فهمید</span>
                </>
              }
              description="رویکرد من ترکیبی از بازی‌درمانی، درمان شناختی-رفتاری کودک و آموزش والدین است؛ با این باور که رفتار کودک، زبان اوست و والدین، مهم‌ترین همراه درمان."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "کارشناسی ارشد روانشناسی بالینی",
                "عضو انجمن روانشناسی کودک ایران",
                "۳ سال تجربهٔ بالینی کودک و نوجوان",
                "ارزیابی و درمان ADHD و اختلالات یادگیری",
                "بازی‌درمانی و مشاورهٔ فرزندپروری",
                "برگزاری ۳۲۰ جلسهٔ درمانی حضوری",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[0.85rem] text-ink-700">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-[0.6rem] text-brand-800">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/about" className="btn btn-primary">
                بیشتر دربارهٔ من
              </Link>
              <div className="text-right">
                <p className="font-[cursive] text-xl text-brand-800">زهرا زینالی</p>
                <p className="text-[0.65rem] text-ink-500">کارشناسی ارشد روانشناسی بالینی</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- ASSESSMENT */}
      <section className="container-x py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-sand-100 p-7 sm:p-10">
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-brand-200/50 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="chip">ابزارهای علمی و رایگان برای والدین</span>
                <h2 className="mt-4 text-2xl font-extrabold leading-snug text-ink-900 sm:text-3xl">
                  نگران رفتار، تمرکز یا اضطراب کودک‌تان هستید؟
                  <br className="hidden sm:block" /> با ابزارهای استاندارد ارزیابی کنید.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-8 text-ink-500">
                  سه پرسشنامهٔ معتبر بالینی ویژهٔ والدین (غربالگری جامع رفتاری–هیجانی SDQ، نقص توجه
                  و بیش‌فعالی SNAP-IV و اضطراب کودک اسپنس) با نمره‌گذاری دقیق زیرمقیاس‌ها و امکان{" "}
                  <strong className="font-bold text-ink-800">دانلود برگهٔ گزارش</strong> برای ارائه
                  به روانشناس در جلسه.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/assessment" className="btn btn-primary">
                    شروع ارزیابی و دریافت گزارش
                  </Link>
                  <Link href="/booking" className="btn btn-outline">
                    رزرو نوبت
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto grid h-44 w-44 place-items-center">
                <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full -rotate-90">
                  <circle cx="80" cy="80" r="66" fill="none" stroke="#e2d7c4" strokeWidth="10" />
                  <circle
                    cx="80"
                    cy="80"
                    r="66"
                    fill="none"
                    stroke="#1c9c86"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 66}
                    strokeDashoffset={2 * Math.PI * 66 * 0.25}
                  />
                </svg>
                <div className="text-center">
                  <p className="text-3xl font-black text-ink-900">{toFa(3)}</p>
                  <p className="text-[0.68rem] font-medium text-ink-500">آزمون استاندارد</p>
                  <p className="text-[0.6rem] text-brand-700">+ دانلود گزارش</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* -------------------------------------------------------- TESTIMONIALS */}
      <section className="container-x pb-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="تجربهٔ والدین"
              title={
                <>
                  حرف‌های والدینی که <span className="gradient-text">مسیر را</span> طی کرده‌اند
                </>
              }
              description="روایت تجربهٔ چند نفر از والدینی که همراه با فرزندشان در جلسات بازی‌درمانی، ارزیابی و مشاورهٔ فرزندپروری شرکت کرده‌اند؛ با اجازهٔ والدین و حفظ کامل حریم خصوصی کودک."
            />
          </Reveal>

          <Reveal delay={100}>
            <TestimonialSlider items={TESTIMONIALS} />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- ARTICLES */}
      <section className="container-x pb-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              align="start"
              eyebrow="مقالات"
              title={
                <>
                  از <span className="gradient-text">دنیای کودک</span> بیشتر بدانید
                </>
              }
              description="نوشته‌های کوتاه و کاربردی دربارهٔ رفتار، اضطراب، بازی و بلوغ؛ برای والدینی که می‌خواهند بهتر بفهمند."
            />
            <Link href="/blog" className="btn btn-outline">
              همهٔ مقالات
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {latestArticles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 80}>
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
                  <span>{toFa(article.readMinutes)} دقیقه مطالعه</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ FAQ */}
      <section className="container-x pb-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="سؤال‌های متداول"
              title={
                <>
                  هر آنچه والدین <span className="gradient-text">می‌پرسند</span>
                </>
              }
              description="اگر پاسخ سؤال‌تان را پیدا نکردید، در تلگرام پیام بدهید یا با مطب تماس بگیرید."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={SITE.telegramHref} target="_blank" rel="noreferrer" className="btn btn-outline">
                پرسش در تلگرام
              </a>
              <a href={SITE.phoneHref} className="btn btn-outline" dir="ltr">
                ☎ {SITE.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- FINAL CTA */}
      <section className="container-x pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-7 py-12 text-white sm:px-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl" />
              <div className="absolute -bottom-20 left-1/4 h-64 w-64 rounded-full bg-clay-500/15 blur-3xl" />
            </div>
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-extrabold leading-snug sm:text-3xl">
                  برای رزرو نوبت، فقط تماس بگیرید یا در تلگرام پیام بدهید.
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-7 text-white/60">
                  رزرو نوبت به‌صورت تلفنی و تلگرامی انجام می‌شود؛ ظرفیت هر هفته محدود است تا کیفیت
                  جلسات کودک و نوجوان حفظ شود.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={SITE.phoneHref} className="btn btn-primary" dir="ltr">
                  ☎ {SITE.phone}
                </a>
                <a href={SITE.telegramHref} target="_blank" rel="noreferrer" className="btn btn-ghost-light">
                  تلگرام {SITE.telegram}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

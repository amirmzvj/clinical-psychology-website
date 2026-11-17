/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/faq-accordion";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { FAQS, SITE } from "@/lib/content";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "رزرو نوبت",
  description:
    "رزرو نوبت مشاورهٔ کودک و نوجوان فقط با تماس تلفنی، مراجعه به آدرس مطب یا پیام در تلگرام انجام می‌شود.",
};

const STEPS = [
  {
    title: "تماس یا پیام تلگرام",
    text: "با شمارهٔ مطب تماس بگیرید یا در تلگرام پیام بدهید و بگویید برای چه سنی و چه مسئله‌ای نیاز به جلسه دارید.",
    icon: "📞",
  },
  {
    title: "هماهنگی ساعت جلسه",
    text: "همکاران ما ساعت آزاد جلسهٔ حضوری در مطب را با شما هماهنگ می‌کنند.",
    icon: "🗓️",
  },
  {
    title: "حضور در جلسه",
    text: "در زمان هماهنگ‌شده، همراه با کودک به مطب مراجعه کنید. جلسه در فضای آرام و امن مطب برگزار می‌شود.",
    icon: "🧸",
  },
];

export default function BookingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="absolute -left-16 top-32 h-64 w-64 rounded-full bg-clay-300/25 blur-3xl" />
        </div>

        <div className="container-x relative pb-10 pt-10 lg:pt-14">
          <Reveal>
            <div className="max-w-2xl">
              <span className="chip">رزرو نوبت</span>
              <h1 className="mt-5 text-3xl font-black leading-[1.4] text-ink-900 sm:text-4xl">
                نوبت کودک و نوجوان را <span className="gradient-text">تلفنی یا تلگرامی</span> رزرو کنید
              </h1>
              <p className="mt-3 text-[0.95rem] leading-8 text-ink-500">
                رزرو نوبت فقط از طریق تماس تلفنی، مراجعه به آدرس مطب و پیام در تلگرام انجام می‌شود.
                کافی است با ما تماس بگیرید یا پیام بدهید تا ساعت جلسه هماهنگ شود.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          {/* تلفن */}
          <Reveal>
            <div className="card flex h-full flex-col p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-xl ring-1 ring-brand-100">
                📞
              </span>
              <h2 className="mt-4 text-base font-extrabold text-ink-900">تماس تلفنی</h2>
              <p className="mt-1 text-[0.78rem] leading-6 text-ink-500">
                سریع‌ترین راه برای رزرو نوبت و پرسش‌های اولیه.
              </p>
              <div className="mt-4 space-y-2 text-sm font-bold text-ink-800">
                <a href={SITE.phoneHref} className="block transition hover:text-brand-700" dir="ltr">
                  ☎ {SITE.phone}
                </a>
              </div>
              <a href={SITE.phoneHref} className="btn btn-primary mt-5 w-full !py-2.5 text-xs" dir="ltr">
                تماس با مطب
              </a>
            </div>
          </Reveal>

          {/* آدرس */}
          <Reveal delay={80}>
            <div className="card flex h-full flex-col p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-clay-300/30 text-xl ring-1 ring-clay-300/40">
                📍
              </span>
              <h2 className="mt-4 text-base font-extrabold text-ink-900">آدرس مطب</h2>
              <p className="mt-1 text-[0.78rem] leading-6 text-ink-500">{SITE.address}</p>
              <p className="mt-3 text-[0.72rem] leading-6 text-ink-500">
                دسترسی آسان در محدودهٔ پزشکی هفده شهریور تبریز؛ فضای آرام و مناسب کودک و نوجوان.
              </p>
              <a
                href={SITE.mapHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline mt-auto w-full !py-2.5 text-xs"
              >
                مسیریابی روی نقشه
              </a>
            </div>
          </Reveal>

          {/* تلگرام */}
          <Reveal delay={160}>
            <div className="card flex h-full flex-col p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-xl ring-1 ring-sky-100">
                ✈️
              </span>
              <h2 className="mt-4 text-base font-extrabold text-ink-900">تلگرام</h2>
              <p className="mt-1 text-[0.78rem] leading-6 text-ink-500">
                برای پرسش‌های کوتاه، ارسال خلاصهٔ وضعیت کودک و هماهنگی ساعت.
              </p>
              <p className="mt-4 text-sm font-bold text-ink-800" dir="ltr">
                {SITE.telegram}
              </p>
              <a
                href={SITE.telegramHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary mt-auto w-full !py-2.5 text-xs"
              >
                پیام در تلگرام
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-12">
        <Reveal>
          <SectionHeading
            eyebrow="مراحل رزرو"
            title={
              <>
                در سه قدم، <span className="gradient-text">نوبت</span> شما ثبت می‌شود
              </>
            }
            description="بدون فرم و بدون ثبت اطلاعات در سایت؛ رزرو مستقیماً با مطب هماهنگ می‌شود."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 80}>
              <div className="card h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-lg ring-1 ring-brand-100">
                    {step.icon}
                  </span>
                  <span className="text-3xl font-black text-brand-100">{index + 1}</span>
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-[0.8rem] leading-7 text-ink-500">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-sand-300 bg-white shadow-lg shadow-ink-900/5">
              <img
                src={IMAGES.playroom}
                alt="اتاق بازی و انتظار کودک"
                className="h-64 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="text-sm font-extrabold text-ink-900">ساعت کاری و شرایط جلسه</h3>
                <ul className="mt-3 space-y-2 text-[0.78rem] leading-6 text-ink-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-100 text-[0.55rem] text-brand-800">
                      ✓
                    </span>
                    {SITE.hours}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-100 text-[0.55rem] text-brand-800">
                      ✓
                    </span>
                    گروه سنی: {SITE.ages}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-100 text-[0.55rem] text-brand-800">
                      ✓
                    </span>
                    تمامی جلسات کودک، نوجوان و والدین فقط به‌صورت حضوری در مطب برگزار می‌شوند
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-100 text-[0.55rem] text-brand-800">
                      ✓
                    </span>
                    لغو جلسه تا ۲۴ ساعت قبل از زمان تعیین‌شده
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-sand-100 p-7">
              <h3 className="text-lg font-extrabold text-ink-900">راه‌های ارتباطی</h3>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-sand-200 bg-white/80 px-4 py-3 transition hover:border-brand-300"
                >
                  <span className="text-ink-500">تلفن مطب</span>
                  <span className="font-bold text-ink-900" dir="ltr">
                    {SITE.phone}
                  </span>
                </a>
                <a
                  href={SITE.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-sand-200 bg-white/80 px-4 py-3 transition hover:border-brand-300"
                >
                  <span className="text-ink-500">تلگرام</span>
                  <span className="font-bold text-ink-900" dir="ltr">
                    {SITE.telegram}
                  </span>
                </a>
                <div className="flex items-start justify-between gap-3 rounded-2xl border border-sand-200 bg-white/80 px-4 py-3">
                  <span className="shrink-0 text-ink-500">آدرس</span>
                  <span className="text-left text-xs font-bold leading-6 text-ink-900">
                    {SITE.address}
                  </span>
                </div>
              </div>
              <p className="mt-4 rounded-xl bg-white/70 px-4 py-3 text-[0.72rem] leading-6 text-ink-500 ring-1 ring-sand-200">
                نکته: رزرو نوبت فقط از طریق راه‌های ارتباطی بالا انجام می‌شود. هیچ فرم آنلاین یا
                پرداخت اینترنتی در این سایت وجود ندارد.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="سؤال‌های متداول"
              title={
                <>
                  دربارهٔ <span className="gradient-text">رزرو و جلسات</span>
                </>
              }
            />
            <Link href="/contact" className="btn btn-outline mt-5">
              تماس و آدرس مطب
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={FAQS.slice(0, 4)} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

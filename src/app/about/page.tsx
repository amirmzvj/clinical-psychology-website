/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { CREDENTIALS, SITE } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { toFa } from "@/lib/utils";

export const metadata: Metadata = {
  title: "دربارهٔ زهرا زینالی",
  description:
    "زهرا زینالی، روانشناس کودک و نوجوان؛ تحصیلات، تجربهٔ بازی‌درمانی، رویکرد درمانی و ارزش‌های حرفه‌ای.",
};

const VALUES = [
  {
    icon: "🤍",
    title: "فضای بدون قضاوت",
    text: "کودک در اتاق بازی می‌تواند هر احساسی را تجربه کند؛ بدون ترس از تنبیه یا سرزنش.",
  },
  {
    icon: "🔒",
    title: "محرمانگی مطلق",
    text: "همهٔ محتوای جلسات کودک و نوجوان محرمانه است و جز در موارد قانونی ثبت نمی‌شود.",
  },
  {
    icon: "🧩",
    title: "بازی، زبان کودک",
    text: "از بازی، هنر و قصه استفاده می‌کنیم تا کودک حرفی را بزند که با کلمه نمی‌گوید.",
  },
  {
    icon: "🤝",
    title: "همراهی والدین",
    text: "والدین مهم‌ترین همراه درمان هستند؛ بازخورد و تمرین خانگی، بخشی از جلسه است.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="absolute -left-16 top-32 h-64 w-64 rounded-full bg-clay-300/25 blur-3xl" />
        </div>
        <div className="container-x relative grid gap-10 pb-14 pt-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:pt-14">
          <Reveal>
            <span className="chip">دربارهٔ من</span>
            <h1 className="mt-5 text-3xl font-black leading-[1.4] text-ink-900 sm:text-4xl lg:text-[2.9rem]">
              زهرا زینالی
              <span className="mt-2 block text-lg font-bold text-brand-700 sm:text-xl">
                کارشناس ارشد روانشناسی بالینی • روانشناس کودک و نوجوان
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-[0.95rem] leading-9 text-ink-500">
              سه سال است که به‌صورت تخصصی در کنار کودکان، نوجوانان و والدینشان نشسته‌ام؛ در جلساتی که
              گاهی با یک عروسک شروع می‌شوند و با یک قدم کوچک به پایان می‌رسند. باور من این است که
              رفتار کودک، زبان اوست و اگر آن زبان را بفهمیم، تغییر ممکن می‌شود.
            </p>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-9 text-ink-500">
              در درمان، از ترکیب بازی‌درمانی، درمان شناختی-رفتاری کودک و آموزش والدین استفاده
              می‌کنم. تمرکز تخصصی من بر اضطراب کودک، بیش‌فعالی و ADHD، اختلالات یادگیری و مسائل بلوغ
              و نوجوانی است.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/booking" className="btn btn-primary">
                رزرو نوبت
              </Link>
              <Link href="/services" className="btn btn-outline">
                مشاهدهٔ خدمات
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rounded-[2.6rem] bg-gradient-to-br from-brand-200/60 to-clay-300/40 blur-2xl" />
              <img
                src={IMAGES.therapist}
                alt="زهرا زینالی در جلسهٔ مشاوره"
                className="relative h-[26rem] w-full rounded-[2.2rem] object-cover object-top shadow-2xl shadow-ink-900/20 sm:h-[30rem]"
              />
              <div className="absolute -bottom-5 -right-3 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
                <p className="text-[0.65rem] text-ink-500">شمارهٔ نظام روانشناسی</p>
                <p className="text-sm font-extrabold text-ink-900" dir="ltr">
                  ۸۰۱۹۰
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={index * 70}>
              <div className="card h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-lg ring-1 ring-brand-100">
                  {value.icon}
                </span>
                <h3 className="mt-4 text-sm font-extrabold text-ink-900">{value.title}</h3>
                <p className="mt-2 text-[0.8rem] leading-7 text-ink-500">{value.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-10">
        <Reveal>
          <SectionHeading
            eyebrow="مسیر تحصیلی و حرفه‌ای"
            title={
              <>
                از کلاس درس تا <span className="gradient-text">اتاق بازی</span>
              </>
            }
            description="هر مرحله از تحصیل و تجربهٔ بالینی، ابزار تازه‌ای برای درک بهتر دنیای کودک به من داد."
          />
        </Reveal>

        <div className="relative mx-auto mt-10 max-w-3xl">
          <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-brand-300 via-sand-300 to-transparent sm:right-6" />
          <div className="space-y-5">
            {CREDENTIALS.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="relative pr-12 sm:pr-16">
                  <span className="absolute right-0 top-1 grid h-8 w-8 place-items-center rounded-full border-2 border-brand-300 bg-white text-[0.6rem] font-bold text-brand-700 sm:h-10 sm:w-10 sm:text-[0.7rem]">
                    {item.year}
                  </span>
                  <div className="card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-extrabold text-ink-900">{item.title}</h3>
                      <span className="text-[0.7rem] font-semibold text-brand-700">{item.place}</span>
                    </div>
                    <p className="mt-2 text-[0.82rem] leading-7 text-ink-500">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-white sm:p-12">
            <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-brand-500/25 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <h2 className="text-2xl font-extrabold leading-snug sm:text-3xl">
                  «کودک را نباید درست کرد؛ باید فهمید.»
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-8 text-white/60">
                  اگر حس می‌کنید رفتار کودک‌تان تغییر کرده یا نمی‌دانید از کجا شروع کنید، یک گفت‌وگوی
                  اولیه می‌تواند مسیر را روشن کند. رزرو نوبت فقط با تماس یا پیام تلگرام انجام می‌شود.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={SITE.phoneHref} className="btn btn-primary" dir="ltr">
                    ☎ {SITE.phone}
                  </a>
                  <a
                    href={SITE.telegramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost-light"
                  >
                    پیام در تلگرام
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { value: "۳ سال", label: "تجربهٔ بالینی" },
                  { value: "۳۲۰", label: "جلسهٔ درمانی" },
                  { value: "۳ تا ۱۸", label: "سال (گروه سنی)" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xl font-black text-brand-300">{toFa(item.value)}</p>
                    <p className="mt-1 text-[0.68rem] text-white/60">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

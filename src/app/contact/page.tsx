/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/faq-accordion";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { FAQS, SITE } from "@/lib/content";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "تماس و آدرس مطب",
  description:
    "آدرس مطب (تبریز، هفده شهریور، ساختمان پزشکان پارسا)، شمارهٔ تماس، ساعت کاری و آیدی تلگرام زهرا زینالی، روانشناس کودک و نوجوان.",
};

const CONTACT_CARDS = [
  {
    icon: "📞",
    title: "تلفن مطب",
    lines: [SITE.phone],
    action: { label: "تماس", href: SITE.phoneHref },
  },
  {
    icon: "📍",
    title: "آدرس مطب",
    lines: [SITE.address],
    action: { label: "مسیریابی", href: SITE.mapHref },
  },
  {
    icon: "✈️",
    title: "تلگرام",
    lines: [SITE.telegram, "پاسخگویی در ساعات کاری"],
    action: { label: "پیام در تلگرام", href: SITE.telegramHref },
  },
  {
    icon: "🕘",
    title: "ساعت کاری",
    lines: [SITE.hours, "روزهای جمعه جلسه نداریم"],
    action: { label: "رزرو نوبت", href: "/booking" },
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="absolute -left-16 top-32 h-64 w-64 rounded-full bg-clay-300/25 blur-3xl" />
        </div>
        <div className="container-x relative pb-10 pt-10 lg:pt-14">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="تماس"
              title={
                <>
                  با ما <span className="gradient-text">در ارتباط</span> باشید
                </>
              }
              description="برای رزرو نوبت و پرسش‌های مربوط به درمان کودک و نوجوان، با شمارهٔ مطب تماس بگیرید یا در تلگرام پیام بدهید."
            />
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 60}>
              <div className="card flex h-full flex-col p-5">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-lg ring-1 ring-brand-100">
                  {card.icon}
                </span>
                <h3 className="mt-3 text-sm font-extrabold text-ink-900">{card.title}</h3>
                <div className="mt-2 flex-1 space-y-1 text-[0.78rem] leading-6 text-ink-500">
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <a
                  href={card.action.href}
                  target={card.action.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="mt-3 text-[0.72rem] font-bold text-brand-700 hover:text-brand-800"
                >
                  {card.action.label} ←
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-14">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-sand-300 bg-white shadow-lg shadow-ink-900/5">
              <img
                src={IMAGES.office}
                alt="فضای مطب"
                className="h-60 w-full object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-sm font-extrabold text-ink-900">مطب تخصصی کودک و نوجوان</h3>
                <p className="mt-1.5 text-[0.82rem] leading-7 text-ink-500">
                  {SITE.address}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-[0.72rem]">
                  <div className="rounded-xl bg-sand-50 p-3">
                    <p className="text-ink-500">موقعیت</p>
                    <p className="mt-0.5 font-bold text-ink-800">هفده شهریور تبریز</p>
                  </div>
                  <div className="rounded-xl bg-sand-50 p-3">
                    <p className="text-ink-500">ساختمان</p>
                    <p className="mt-0.5 font-bold text-ink-800">پزشکان پارسا</p>
                  </div>
                  <div className="rounded-xl bg-sand-50 p-3">
                    <p className="text-ink-500">اتاق بازی</p>
                    <p className="mt-0.5 font-bold text-ink-800">مجهز و ایمن</p>
                  </div>
                  <div className="rounded-xl bg-sand-50 p-3">
                    <p className="text-ink-500">حریم خصوصی</p>
                    <p className="mt-0.5 font-bold text-ink-800">کاملاً محرمانه</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={SITE.phoneHref} className="btn btn-primary !py-2.5 text-xs" dir="ltr">
                    ☎ {SITE.phone}
                  </a>
                  <a
                    href={SITE.telegramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline !py-2.5 text-xs"
                  >
                    تلگرام {SITE.telegram}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="space-y-4">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
              <p className="text-xs font-bold text-amber-900">وضعیت اورژانسی</p>
              <p className="mt-1 text-[0.75rem] leading-6 text-amber-900/80">
                اگر کودک شما در خطر جدی است یا رفتار آسیب‌زننده به خود دارد، لطفاً با اورژانس
                اجتماعی ۱۲۳ یا اورژانس ۱۱۵ تماس بگیرید. این وب‌سایت پاسخگوی وضعیت‌های اورژانسی
                نیست.
              </p>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-extrabold text-ink-900">پیش از تماس، این نکته را بدانید</h3>
              <ul className="mt-3 space-y-2 text-[0.78rem] leading-6 text-ink-700">
                <li>• برای رزرو نوبت، سن کودک و مسئلهٔ اصلی را در پیام بنویسید.</li>
                <li>• جلسهٔ اول معمولاً با حضور والدین و برای ارزیابی است.</li>
                <li>• همهٔ جلسات به‌صورت حضوری در مطب و هزینه در زمان رزرو اعلام می‌شود.</li>
                <li>• اطلاعات شما و کودک‌تان کاملاً محرمانه است.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-200 bg-brand-50/70 p-5">
              <p className="text-xs font-bold text-brand-900">رزرو نوبت</p>
              <p className="mt-1 text-[0.75rem] leading-6 text-ink-700">
                رزرو فقط با تماس تلفنی، آدرس مطب و تلگرام انجام می‌شود.
              </p>
              <Link href="/booking" className="btn btn-primary mt-3 w-full !py-2.5 text-xs">
                مشاهدهٔ راه‌های رزرو
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-10">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="سؤال‌های متداول"
              title={
                <>
                  پاسخ پرسش‌های <span className="gradient-text">والدین</span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={FAQS} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

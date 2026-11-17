import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/faq-accordion";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { FAQS, SERVICES, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "خدمات کودک و نوجوان",
  description:
    "بازی‌درمانی، درمان اضطراب کودک، بیش‌فعالی و ADHD، اختلالات یادگیری، شب‌ادراری، مشاورهٔ فرزندپروری و رواندرمانی نوجوان؛ جلسات حضوری در تبریز.",
};

export default function ServicesPage() {
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
              eyebrow="خدمات تخصصی"
              title={
                <>
                  مسیر درمانِ <span className="gradient-text">متناسب با کودک شما</span>
                </>
              }
              description="هر خدمت با نقشهٔ درمانی مشخص و مدت جلسهٔ روشن به‌صورت حضوری در مطب ارائه می‌شود. در جلسهٔ اول، دربارهٔ مناسب‌ترین مسیر تصمیم می‌گیریم و هزینهٔ هر جلسه در زمان رزرو نوبت اعلام می‌شود."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-6 flex flex-wrap gap-2">
              {SERVICES.map((service) => (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="rounded-full border border-sand-300 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ink-700 transition hover:border-brand-400 hover:text-brand-700"
                >
                  {service.icon} {service.title}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-14">
        <div className="space-y-5">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 50}>
              <article id={service.slug} className="card scroll-mt-24 overflow-hidden p-6 sm:p-8">
                <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-xl ring-1 ring-brand-200/70">
                        {service.icon}
                      </span>
                      <div>
                        <h2 className="text-lg font-extrabold text-ink-900">{service.title}</h2>
                        <p className="text-xs font-semibold text-brand-700">{service.tagline}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-[0.88rem] leading-8 text-ink-500">{service.description}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-[0.82rem] text-ink-700">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-[0.6rem] text-brand-800">
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-sand-200 bg-sand-50/70 p-5">
                    <div className="flex items-center justify-between text-xs text-ink-500">
                      <span>گروه سنی</span>
                      <span className="font-bold text-ink-800">{service.ageRange}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-ink-500">
                      <span>مدت جلسه</span>
                      <span className="font-bold text-ink-800">{service.duration}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-ink-500">
                      <span>نوع جلسه</span>
                      <span className="font-bold text-ink-800">حضوری در مطب</span>
                    </div>
                    <div className="mt-3 border-t border-sand-200 pt-3">
                      <p className="text-[0.73rem] leading-6 text-ink-500">
                        هزینهٔ جلسه در زمان رزرو نوبت توسط روانشناس اعلام می‌شود.
                      </p>
                    </div>
                    <a href={SITE.phoneHref} className="btn btn-primary mt-4 w-full !py-2.5 text-xs" dir="ltr">
                      ☎ رزرو تلفنی
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
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="سؤال‌های متداول"
              title={
                <>
                  دربارهٔ <span className="gradient-text">جلسات کودک</span> بدانید
                </>
              }
              description="پاسخ پرسش‌های پرتکرار والدین دربارهٔ شکل جلسات، حضور والدین و شرایط لغو."
            />
            <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 text-xs leading-7 text-ink-700">
              <p className="font-bold text-brand-900">هزینهٔ جلسات</p>
              <p className="mt-1">
                هزینهٔ هر جلسه بسته به نوع جلسه در زمان رزرو نوبت توسط روانشناس اعلام می‌شود. برای
                اطلاع از جزئیات و هماهنگی زمان مراجعه، با مطب تماس بگیرید یا در تلگرام پیام بدهید.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={FAQS} />
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-sand-300 bg-white/70 p-7 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-extrabold text-ink-900">
                مطمئن نیستید کدام خدمت مناسب کودک شماست؟
              </h2>
              <p className="mt-1 text-sm text-ink-500">
                یک جلسهٔ ارزیابی اولیه، مسیر را روشن می‌کند. برای هماهنگی تماس بگیرید.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/assessment" className="btn btn-outline">
                ارزیابی رفتار کودک
              </Link>
              <a href={SITE.phoneHref} className="btn btn-primary" dir="ltr">
                ☎ {SITE.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

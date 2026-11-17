import type { Metadata } from "next";
import Link from "next/link";
import AssessmentQuiz from "@/components/assessment-quiz";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { ASSESSMENT_TOOLS } from "@/lib/assessment";
import { SITE } from "@/lib/content";
import { toFa } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ابزارهای ارزیابی استاندارد کودک و نوجوان",
  description:
    "سه پرسشنامهٔ رایگان و معتبر ویژهٔ والدین: غربالگری نقاط قوت و دشواری‌ها (SDQ)، نقص توجه و بیش‌فعالی (SNAP-IV) و اضطراب کودک اسپنس (SCAS-P) همراه با تحلیل دقیق و دانلود گزارش برای ارائه به روانشناس.",
};

const TOOL_HIGHLIGHTS = [
  {
    icon: "🧩",
    title: "غربالگری جامع SDQ (۲۵ سؤال)",
    text: "سنجش استاندارد ۵ بُعد هیجانی، رفتاری، بیش‌فعالی/توجه، رابطه با همسالان و رفتار اجتماعی مطلوب بر پایهٔ گودمن.",
  },
  {
    icon: "⚡",
    title: "مقیاس SNAP-IV ویژهٔ ADHD (۱۸ سؤال)",
    text: "سنجش دقیق نقص توجه و بیش‌فعالی–تکانشگری منطبق با ملاک‌های DSM-5 همراه با میانگین و شمارش علائم بارز.",
  },
  {
    icon: "🌊",
    title: "مقیاس اضطراب اسپنس SCAS-P (۱۶ سؤال)",
    text: "تفکیک چهار نوع اضطراب جدایی، اضطراب اجتماعی، نگرانی فراگیر و ترس‌های اختصاصی و علائم بدنی.",
  },
];

export default function AssessmentPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-gold-300/25 blur-3xl" />
      </div>

      <div className="container-x relative pb-16 pt-10 lg:pt-14">
        <Reveal>
          <SectionHeading
            align="start"
            eyebrow="ابزارهای علمی و رایگان برای والدین"
            title={
              <>
                ارزیابی استاندارد <span className="gradient-text">کودک و نوجوان</span>
              </>
            }
            description="سه پرسشنامهٔ معتبر بالینی ویژهٔ والدین با نمره‌گذاری واقعی زیرمقیاس‌ها، نقاط برش استاندارد و امکان دانلود کارنامه (تصویر PNG و برگهٔ PDF کامل همراه با ریز پاسخ‌ها) برای ارائه به روانشناس در جلسهٔ حضوری."
          />
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.42fr_0.58fr] lg:items-start">
          <Reveal>
            <AssessmentQuiz />
          </Reveal>

          <Reveal delay={100} className="space-y-4">
            <div className="card p-5">
              <h2 className="text-sm font-extrabold text-ink-900">مبنای علمی این سه ابزار</h2>
              <div className="mt-3 space-y-3.5">
                {TOOL_HIGHLIGHTS.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-base ring-1 ring-brand-100">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-ink-900">{item.title}</p>
                      <p className="mt-0.5 text-[0.72rem] leading-6 text-ink-500">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h2 className="text-sm font-extrabold text-ink-900">دانلود و ارائه به روانشناس</h2>
              <ul className="mt-3 space-y-2 text-[0.75rem] leading-6 text-ink-700">
                <li>• در پایان هر آزمون، کارنامهٔ کامل زیرمقیاس‌ها و شاخص‌های بالینی صادر می‌شود.</li>
                <li>• می‌توانید تصویر باکیفیت گزارش (PNG) را در گوشی ذخیره کنید یا برگهٔ A4 کامل با ریز پاسخ‌ها را به‌صورت PDF دانلود و چاپ نمایید.</li>
                <li>• تمام محاسبات در مرورگر دستگاه شما انجام می‌شود و هیچ اطلاعاتی در سایت ذخیره نمی‌شود.</li>
                <li>• پرسشنامه‌های غربالگری کمک‌کننده و دقیق‌اند، اما تشخیص نهایی فقط در مصاحبهٔ حضوری بالینی انجام می‌شود.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-200 bg-brand-50/70 p-5">
              <p className="text-xs font-bold text-brand-900">همراه با برگهٔ گزارش مراجعه کنید</p>
              <p className="mt-1 text-[0.75rem] leading-6 text-ink-700">
                پس از دانلود نتیجه، برای رزرو جلسهٔ حضوری در مطب ({SITE.address}) تماس بگیرید یا در
                تلگرام پیام بدهید.
              </p>
              <a href={SITE.phoneHref} className="btn btn-primary mt-3 w-full !py-2.5 text-xs" dir="ltr">
                ☎ {SITE.phone}
              </a>
              <a
                href={SITE.telegramHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline mt-2 w-full !py-2.5 text-xs"
              >
                پیام در تلگرام ({SITE.telegram})
              </a>
            </div>

            <p className="px-1 text-[0.68rem] leading-6 text-ink-500">
              تعداد ابزارها: {toFa(ASSESSMENT_TOOLS.length)} پرسشنامهٔ استاندارد • بدون ثبت اطلاعات
              در سرور •{" "}
              <Link href="/services" className="font-bold text-brand-700">
                مشاهدهٔ خدمات تخصصی
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

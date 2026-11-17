import Link from "next/link";
import { Logo } from "@/components/site-header";
import { SERVICES, SITE } from "@/lib/content";

const QUICK_LINKS = [
  { href: "/about", label: "دربارهٔ زهرا زینالی" },
  { href: "/services", label: "خدمات کودک و نوجوان" },
  { href: "/assessment", label: "ارزیابی رفتار کودک" },
  { href: "/blog", label: "مقالات تخصصی" },
  { href: "/booking", label: "رزرو نوبت" },
  { href: "/contact", label: "تماس و آدرس مطب" },
];

const SOCIALS = [
  {
    href: SITE.telegramHref,
    label: "تلگرام",
    icon: "M21.9 4.3 2.9 11.6c-.9.4-.9 1.6 0 1.9l4.6 1.5 1.8 5.4c.2.6 1 .8 1.4.3l2.5-2.6 4.6 3.4c.7.5 1.6.1 1.8-.7l3-14.6c.2-.9-.7-1.6-1.7-1.2ZM9.6 14.4l9-5.6-7.3 6.6-.3 3.2-1.4-4.2Z",
  },
  {
    href: SITE.instagramHref,
    label: "اینستاگرام",
    icon: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm0 10.6a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4Zm6.6-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink-900 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-1/4 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
      </div>

      <div className="container-x relative">
        <div className="grid gap-8 border-b border-white/10 py-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold leading-snug sm:text-3xl">
              برای رزرو نوبت، فقط یک <span className="text-brand-300">تماس</span> یا پیام تلگرام
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
              رزرو نوبت به‌صورت تلفنی و از طریق تلگرام انجام می‌شود. ظرفیت هر هفته محدود است تا
              کیفیت جلسات کودک و نوجوان حفظ شود.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href={SITE.phoneHref} className="btn btn-primary" dir="ltr">
              ☎ {SITE.phone}
            </a>
            <a href={SITE.telegramHref} target="_blank" rel="noreferrer" className="btn btn-ghost-light">
              پیام در تلگرام
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/55">
              زهرا زینالی، روانشناس کودک و نوجوان. همراهی علمی و انسانی برای اضطراب، بیش‌فعالی،
              اختلالات یادگیری و رشد سالم کودک و نوجوان.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/5 text-white/70 transition hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-brand-500/20 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">دسترسی سریع</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/55">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-brand-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">خدمات</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/55">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link href={`/services#${service.slug}`} className="transition hover:text-brand-300">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">راه‌های ارتباطی</h3>
            <div className="mt-4 space-y-2.5 text-sm text-white/55">
              <p className="flex items-center gap-2">
                <span className="text-brand-300">📍</span> {SITE.addressShort}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-brand-300">📞</span>
                <a href={SITE.phoneHref} className="transition hover:text-brand-300" dir="ltr">
                  {SITE.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-brand-300">✈️</span>
                <a
                  href={SITE.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-brand-300"
                  dir="ltr"
                >
                  {SITE.telegram}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-brand-300">🕘</span> {SITE.hours}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© ۱۴۰۴ زهرا زینالی — تمامی حقوق محفوظ است.</p>
          <p className="max-w-xl leading-6">
            محتوای این وب‌سایت جایگزین تشخیص و درمان تخصصی نیست. در موارد اورژانسی با اورژانس
            اجتماعی ۱۲۳ تماس بگیرید.
          </p>
          <a href={SITE.telegramHref} target="_blank" rel="noreferrer" className="transition hover:text-brand-300">
            پشتیبانی تلگرام
          </a>
        </div>
      </div>
    </footer>
  );
}

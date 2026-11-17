import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ScrollProgress from "@/components/scroll-progress";
import BackToTop from "@/components/back-to-top";

const siteUrl = "https://zahra-zeinali.ir";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "زهرا زینالی | روانشناس کودک و نوجوان",
    template: "%s | زهرا زینالی",
  },
  description:
    "زهرا زینالی، کارشناس ارشد روانشناسی بالینی و روانشناس کودک و نوجوان؛ بازی‌درمانی، درمان اضطراب کودک، بیش‌فعالی و ADHD، اختلالات یادگیری، شب‌ادراری و مشاورهٔ فرزندپروری. جلسات حضوری؛ رزرو با تلفن، آدرس مطب و تلگرام.",
  keywords: [
    "روانشناس کودک",
    "روانشناس نوجوان",
    "زهرا زینالی",
    "بازی‌درمانی",
    "درمان اضطراب کودک",
    "بیش‌فعالی ADHD",
    "اختلالات یادگیری",
    "شب‌ادراری کودک",
    "مشاوره فرزندپروری",
    "رواندرمانی نوجوان",
  ],
  authors: [{ name: "زهرا زینالی" }],
  creator: "زهرا زینالی",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: "زهرا زینالی",
    title: "زهرا زینالی | روانشناس کودک و نوجوان",
    description:
      "فضایی امن برای رشد کودک و نوجوان؛ بازی‌درمانی، درمان اضطراب، بیش‌فعالی، اختلالات یادگیری و مشاورهٔ والدین.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "زهرا زینالی — روانشناس کودک و نوجوان" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "زهرا زینالی | روانشناس کودک و نوجوان",
    description: "بازی‌درمانی، اضطراب کودک، ADHD و مشاورهٔ والدین؛ فقط جلسات حضوری در مطب.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  category: "health",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Psychologist",
  name: "زهرا زینالی",
  alternateName: "Zahra Zeinali",
  description:
    "روانشناس کودک و نوجوان؛ متخصص بازی‌درمانی، درمان اضطراب کودک، بیش‌فعالی و ADHD، اختلالات یادگیری و مشاورهٔ فرزندپروری.",
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  medicalSpecialty: "Psychiatric",
  areaServed: "IR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "تبریز",
    addressRegion: "آذربایجان شرقی",
    addressCountry: "IR",
    streetAddress: "هفده شهریور، ساختمان پزشکان پارسا",
  },
  telephone: "+989924997268",
  email: "hello@zahra-zeinali.ir",
  openingHours: "Sa-Th 09:00-19:00",
  sameAs: ["https://instagram.com", "https://t.me/psycology_zn"],
  makesOffer: [
    "بازی‌درمانی کودک",
    "درمان اضطراب کودک",
    "بیش‌فعالی و ADHD",
    "اختلالات یادگیری",
    "شب‌ادراری و عادت‌های عصبی",
    "مشاورهٔ فرزندپروری",
    "رواندرمانی نوجوان",
    "هنردرمانی کودک",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0f7d6c" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen text-ink-800 antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-sand-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,#d3f3e9_0%,transparent_45%),radial-gradient(circle_at_85%_5%,#f7e6d8_0%,transparent_40%),radial-gradient(circle_at_50%_110%,#e8f1ec_0%,transparent_55%)]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#0a1a17_1px,transparent_1px),linear-gradient(to_bottom,#0a1a17_1px,transparent_1px)] [background-size:64px_64px]" />
        </div>
        <ScrollProgress />
        <SiteHeader />
        <main className="relative">{children}</main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}

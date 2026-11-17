import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="text-7xl">🧭</span>
      <h1 className="mt-6 text-3xl font-black text-ink-900 sm:text-4xl">
        این صفحه پیدا نشد
      </h1>
      <p className="mt-3 max-w-md text-sm leading-8 text-ink-500">
        ممکن است نشانی را اشتباه وارد کرده باشید یا این صفحه جابه‌جا شده باشد. از مسیرهای زیر
        ادامه دهید.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          بازگشت به خانه
        </Link>
        <Link href="/services" className="btn btn-outline">
          خدمات درمانی
        </Link>
        <Link href="/booking" className="btn btn-outline">
          دریافت نوبت
        </Link>
      </div>
    </section>
  );
}

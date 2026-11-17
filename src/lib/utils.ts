export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert latin digits inside any string/number to Persian digits. */
export function toFa(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);
}

export function formatPrice(value: number): string {
  return toFa(value.toLocaleString("en-US"));
}

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("fa-IR", {
  day: "numeric",
  month: "long",
});

const timeFormatter = new Intl.DateTimeFormat("fa-IR", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDateFa(value: Date | string | null | undefined): string {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return dateFormatter.format(date);
}

export function formatShortDateFa(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return shortDateFormatter.format(date);
}

export function formatTimeFa(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return timeFormatter.format(date);
}

export function timeAgoFa(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  const diff = Date.now() - date.getTime();
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "همین حالا";
  if (minutes < 60) return `${toFa(minutes)} دقیقه پیش`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${toFa(hours)} ساعت پیش`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${toFa(days)} روز پیش`;
  return formatDateFa(date);
}

export type DayOption = {
  iso: string;
  weekday: string;
  day: string;
  month: string;
  isFriday: boolean;
};

/** Builds the next `count` days (local time) for the booking calendar. */
export function getUpcomingDays(count = 10, from = new Date()): DayOption[] {
  const days: DayOption[] = [];
  for (let index = 0; index < count; index += 1) {
    const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + index);
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate(),
    ).padStart(2, "0")}`;
    days.push({
      iso,
      weekday: new Intl.DateTimeFormat("fa-IR", { weekday: "short" }).format(date),
      day: toFa(date.getDate()),
      month: new Intl.DateTimeFormat("fa-IR", { month: "short" }).format(date),
      isFriday: date.getDay() === 5,
    });
  }
  return days;
}

export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export function slotLabel(slot: string): string {
  const hour = Number(slot.split(":")[0]);
  const period = hour < 12 ? "صبح" : "بعدازظهر";
  return `${period} ${toFa(slot)}`;
}

export const STATUS_LABELS: Record<string, string> = {
  pending: "در انتظار تأیید",
  confirmed: "تأیید شده",
  done: "برگزار شده",
  canceled: "لغو شده",
  new: "جدید",
  read: "خوانده شده",
  replied: "پاسخ داده شده",
};

export const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 ring-amber-200",
  confirmed: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  done: "bg-sky-100 text-sky-800 ring-sky-200",
  canceled: "bg-rose-100 text-rose-800 ring-rose-200",
  new: "bg-amber-100 text-amber-800 ring-amber-200",
  read: "bg-sky-100 text-sky-800 ring-sky-200",
  replied: "bg-emerald-100 text-emerald-800 ring-emerald-200",
};

export function trackingCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let index = 0; index < 6; index += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `ZZ-${code}`;
}

export function isValidIranPhone(value: string): boolean {
  const normalized = value.replace(/[\s-]/g, "");
  return /^(\+98|0)?9\d{9}$/.test(normalized);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

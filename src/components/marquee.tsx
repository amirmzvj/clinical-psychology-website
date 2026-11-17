import { cn } from "@/lib/utils";

export default function Marquee({
  items,
  className,
  tone = "light",
}: {
  items: string[];
  className?: string;
  tone?: "light" | "dark";
}) {
  const doubled = [...items, ...items];
  return (
    <div
      dir="ltr"
      className={cn(
        "relative flex overflow-hidden",
        tone === "dark" ? "text-white/70" : "text-ink-700/70",
        className,
      )}
    >
      <div className="flex w-max animate-marquee items-center gap-8 pr-8">
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} dir="rtl" className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-sm font-medium">{item}</span>
            <span className={tone === "dark" ? "text-brand-400" : "text-brand-400"}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

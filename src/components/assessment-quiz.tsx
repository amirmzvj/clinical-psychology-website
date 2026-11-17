"use client";

import { useState } from "react";
import {
  ASSESSMENT_TOOLS,
  evaluateAssessment,
  GENDER_LABELS,
  getToolById,
  IMPACT_OPTIONS,
  RESPONDENT_LABELS,
  type Band,
  type ChildProfile,
  type FullAssessmentReport,
  type SubscaleStatus,
  type ToolId,
} from "@/lib/assessment";
import { SITE } from "@/lib/content";
import {
  downloadFullReportHtml,
  downloadReportPng,
  printReportPdf,
} from "@/lib/report-export";
import { cn, toFa } from "@/lib/utils";

type Stage = "select" | "profile" | "questions" | "result";

const BAND_COLORS: Record<Band, { ring: string; text: string; bg: string }> = {
  low: {
    ring: "#1c9c86",
    text: "text-brand-800",
    bg: "bg-brand-50 ring-brand-200",
  },
  moderate: {
    ring: "#d9a441",
    text: "text-amber-800",
    bg: "bg-amber-50 ring-amber-200",
  },
  high: {
    ring: "#e07a5f",
    text: "text-clay-600",
    bg: "bg-rose-50 ring-rose-200",
  },
};

const SUBSCALE_STYLES: Record<
  SubscaleStatus,
  { badge: string; bar: string; border: string }
> = {
  normal: {
    badge: "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
    bar: "from-brand-400 to-brand-600",
    border: "border-sand-200",
  },
  borderline: {
    badge: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
    bar: "from-amber-300 to-amber-500",
    border: "border-amber-200",
  },
  clinical: {
    badge: "bg-rose-50 text-rose-800 ring-1 ring-rose-200",
    bar: "from-clay-400 to-clay-600",
    border: "border-rose-200",
  },
};

function ScoreGauge({
  score,
  max,
  percent,
  label,
  band,
}: {
  score: number;
  max: number;
  percent: number;
  label: string;
  band: Band;
}) {
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(3, percent));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative grid h-40 w-40 shrink-0 place-items-center">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#e2d7c4" strokeWidth="12" />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={BAND_COLORS[band].ring}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute px-3 text-center">
        <div className="text-2xl font-black text-ink-900">
          {toFa(score)}
          <span className="text-xs font-semibold text-ink-500">/{toFa(max)}</span>
        </div>
        <div className="mt-0.5 text-[0.64rem] leading-4 text-ink-500">{label}</div>
      </div>
    </div>
  );
}

export default function AssessmentQuiz() {
  const [stage, setStage] = useState<Stage>("select");
  const [selectedToolId, setSelectedToolId] = useState<ToolId>("sdq");
  const [profile, setProfile] = useState<ChildProfile>({
    childName: "",
    age: 8,
    gender: "unspecified",
    respondent: "mother",
    parentNote: "",
    impact: -1,
  });
  const [answers, setAnswers] = useState<number[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [report, setReport] = useState<FullAssessmentReport | null>(null);
  const [showAllItems, setShowAllItems] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const tool = getToolById(selectedToolId);
  const totalSteps = tool.questions.length + 1; // سؤالات اصلی + ۱ سؤال اثرگذاری عملکردی
  const isImpactStep = stepIndex === tool.questions.length;

  function openToolProfile(toolId: ToolId) {
    const nextTool = getToolById(toolId);
    setSelectedToolId(toolId);
    setProfile((prev) => ({
      ...prev,
      age:
        prev.age >= nextTool.minAge && prev.age <= nextTool.maxAge
          ? prev.age
          : nextTool.defaultAge,
      impact: -1,
    }));
    setAnswers(nextTool.questions.map(() => -1));
    setStepIndex(0);
    setReport(null);
    setShowAllItems(false);
    setExportNotice(null);
    setStage("profile");
  }

  function startQuestions() {
    setAnswers(tool.questions.map(() => -1));
    setProfile((prev) => ({ ...prev, impact: -1 }));
    setStepIndex(0);
    setStage("questions");
  }

  function chooseQuestionAnswer(value: number) {
    const updated = [...answers];
    updated[stepIndex] = value;
    setAnswers(updated);
    window.setTimeout(() => {
      setStepIndex((curr) => Math.min(curr + 1, tool.questions.length));
    }, 150);
  }

  function chooseImpactAnswer(value: number) {
    setProfile((prev) => ({ ...prev, impact: value }));
  }

  function finishAssessment() {
    const firstMissing = answers.findIndex((a) => a < 0);
    if (firstMissing !== -1) {
      setStepIndex(firstMissing);
      return;
    }
    const safeProfile: ChildProfile = {
      ...profile,
      impact: profile.impact >= 0 ? profile.impact : 0,
    };
    const evaluated = evaluateAssessment(tool.id, answers, safeProfile);
    setReport(evaluated);
    setShowAllItems(false);
    setExportNotice(null);
    setStage("result");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function resetToSelector() {
    setStage("select");
    setReport(null);
    setExportNotice(null);
    setShowAllItems(false);
  }

  async function handleDownloadPng() {
    if (!report || downloadingPng) return;
    setDownloadingPng(true);
    setExportNotice(null);
    try {
      await downloadReportPng(report);
      setExportNotice(
        "تصویر کارنامه (PNG) دانلود شد. می‌توانید آن را در گوشی نگه دارید یا در جلسه به روانشناس نشان دهید.",
      );
    } finally {
      setDownloadingPng(false);
    }
  }

  function handlePrintPdf() {
    if (!report) return;
    printReportPdf(report);
    setExportNotice(
      "برگهٔ کامل A4 باز شد؛ در پنجرهٔ چاپ گزینهٔ «Save as PDF» را برای ذخیرهٔ PDF یا چاپ انتخاب کنید.",
    );
  }

  function handleDownloadFullHtml() {
    if (!report) return;
    downloadFullReportHtml(report);
    setExportNotice(
      "فایل کامل گزارش (شامل جدول زیرمقیاس‌ها و ریز پاسخ همهٔ سؤالات) دانلود شد.",
    );
  }

  /* ------------------------------------------------------------------------ */
  /* مرحلهٔ ۱: انتخاب ابزار ارزیابی                                             */
  /* ------------------------------------------------------------------------ */
  if (stage === "select") {
    return (
      <div className="space-y-5">
        <div className="grid gap-4">
          {ASSESSMENT_TOOLS.map((item) => (
            <article
              key={item.id}
              className="card relative overflow-hidden p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-2xl ring-1 ring-brand-200/70">
                    {item.icon}
                  </span>
                  <div>
                    <span className="chip text-[0.68rem]">{item.badge}</span>
                    <h2 className="mt-1.5 text-lg font-extrabold text-ink-900 sm:text-xl">
                      {item.title}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 text-[0.7rem]">
                  <span className="rounded-full bg-sand-100 px-3 py-1 font-semibold text-ink-700">
                    سن {item.ageRange}
                  </span>
                  <span className="rounded-full bg-sand-100 px-3 py-1 font-semibold text-ink-700">
                    {toFa(item.questions.length)} سؤال
                  </span>
                  <span className="rounded-full bg-sand-100 px-3 py-1 font-semibold text-ink-700">
                    حدود {toFa(item.estimatedMinutes)} دقیقه
                  </span>
                </div>
              </div>

              <p className="mt-3.5 text-[0.86rem] leading-8 text-ink-600">{item.summary}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.subscales.map((sub) => (
                  <span
                    key={sub.key}
                    className={cn(
                      "rounded-xl px-2.5 py-1 text-[0.7rem] font-medium ring-1",
                      sub.isStrength
                        ? "bg-brand-50/80 text-brand-800 ring-brand-200"
                        : "bg-sand-50 text-ink-700 ring-sand-200",
                    )}
                  >
                    {sub.label}
                  </span>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-sand-50/80 p-3.5 ring-1 ring-sand-200/80">
                <p className="text-[0.72rem] font-bold text-ink-800">چه زمانی این آزمون مناسب‌تر است؟</p>
                <ul className="mt-1.5 space-y-1 text-[0.76rem] leading-6 text-ink-600">
                  {item.whenToUse.map((reason) => (
                    <li key={reason} className="flex items-start gap-2">
                      <span className="mt-1 text-brand-600">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-sand-200 pt-4">
                <p className="text-[0.7rem] text-ink-500">
                  همراه با نمره‌گذاری استاندارد زیرمقیاس‌ها و{" "}
                  <strong className="font-bold text-brand-800">دانلود برگهٔ گزارش ویژهٔ روانشناس</strong>
                </p>
                <button
                  type="button"
                  onClick={() => openToolProfile(item.id)}
                  className="btn btn-primary !px-5 !py-2.5 text-xs sm:text-sm"
                >
                  شروع این ارزیابی
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* مرحلهٔ ۲: مشخصات پایه برای تحلیل سنی دقیق و درج روی برگهٔ دانلودی          */
  /* ------------------------------------------------------------------------ */
  if (stage === "profile") {
    const ageOptions: number[] = [];
    for (let a = tool.minAge; a <= tool.maxAge; a += 1) {
      ageOptions.push(a);
    }

    return (
      <div className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="chip">
            {tool.icon} {tool.shortTitle}
          </span>
          <button
            type="button"
            onClick={resetToSelector}
            className="text-xs font-semibold text-ink-500 transition hover:text-brand-700"
          >
            تغییر آزمون ←
          </button>
        </div>

        <h2 className="mt-4 text-xl font-extrabold text-ink-900 sm:text-2xl">
          مشخصات پایه پیش از شروع پرسشنامه
        </h2>
        <p className="mt-2 text-xs leading-7 text-ink-500 sm:text-sm">
          سن کودک برای دقت تحلیل بالینی استفاده می‌شود و سایر موارد اختیاری‌اند تا روی برگهٔ دانلودی
          گزارش (برای ارائه به روانشناس) درج شوند. هیچ اطلاعاتی به سرور ارسال یا ذخیره نمی‌شود.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="child-age" className="label">
              سن کودک / نوجوان (الزامی)
            </label>
            <select
              id="child-age"
              value={profile.age}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, age: Number(e.target.value) }))
              }
              className="field"
            >
              {ageOptions.map((age) => (
                <option key={age} value={age}>
                  {toFa(age)} سال
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="respondent" className="label">
              تکمیل‌کنندهٔ پرسشنامه
            </label>
            <select
              id="respondent"
              value={profile.respondent}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  respondent: e.target.value as ChildProfile["respondent"],
                }))
              }
              className="field"
            >
              <option value="mother">مادر</option>
              <option value="father">پدر</option>
              <option value="guardian">سرپرست / مراقب اصلی</option>
            </select>
          </div>

          <div>
            <label htmlFor="child-name" className="label">
              نام کوچک یا نام مستعار کودک (اختیاری — برای برگهٔ گزارش)
            </label>
            <input
              id="child-name"
              type="text"
              maxLength={40}
              placeholder="مثلاً: آرتین"
              value={profile.childName}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, childName: e.target.value }))
              }
              className="field"
            />
          </div>

          <div>
            <label htmlFor="child-gender" className="label">
              جنسیت کودک (اختیاری)
            </label>
            <select
              id="child-gender"
              value={profile.gender}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  gender: e.target.value as ChildProfile["gender"],
                }))
              }
              className="field"
            >
              <option value="unspecified">ترجیح می‌دهم ثبت نشود</option>
              <option value="girl">دختر</option>
              <option value="boy">پسر</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="parent-note" className="label">
              توضیح کوتاه برای روانشناس (اختیاری — در برگهٔ دانلودی ثبت می‌شود)
            </label>
            <textarea
              id="parent-note"
              rows={2}
              maxLength={240}
              placeholder="مثلاً: از شروع سال تحصیلی جدید علائم بیشتر شده است / معلم هم دربارهٔ تمرکز تذکر داده است..."
              value={profile.parentNote}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, parentNote: e.target.value }))
              }
              className="field resize-none"
            />
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-brand-50/70 p-4 text-xs leading-7 text-ink-700 ring-1 ring-brand-200/80">
          <p className="font-bold text-brand-900">راهنمای پاسخ‌دهی دقیق:</p>
          <p className="mt-1">
            {tool.timeframePrompt} لطفاً هر جمله را بر اساس رفتار واقعی و معمول فرزندتان (نه فقط یک
            روز خاص یا یک اتفاق تکرارنشده) پاسخ دهید تا نتیجهٔ تحلیل کاملاً دقیق و واقعی باشد.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={resetToSelector} className="btn btn-outline text-xs sm:text-sm">
            بازگشت به فهرست آزمون‌ها
          </button>
          <button type="button" onClick={startQuestions} className="btn btn-primary text-xs sm:text-sm">
            شروع سؤالات ({toFa(tool.questions.length)} پرسش)
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* مرحلهٔ ۳: پاسخ‌دهی به گویه‌ها + سؤال پایانی اثرگذاری عملکردی               */
  /* ------------------------------------------------------------------------ */
  if (stage === "questions") {
    const answeredMain = answers.filter((v) => v >= 0).length;
    const answeredTotal = answeredMain + (profile.impact >= 0 ? 1 : 0);
    const progress = Math.round((answeredTotal / totalSteps) * 100);
    const currentQ = !isImpactStep ? tool.questions[stepIndex] : null;
    const currentSub = currentQ
      ? tool.subscales.find((s) => s.key === currentQ.subscale)
      : null;
    const allReady = answeredMain === tool.questions.length && profile.impact >= 0;

    return (
      <div className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-500">
          <span className="font-semibold text-ink-700">
            {tool.icon} {tool.shortTitle}
          </span>
          <button
            type="button"
            onClick={resetToSelector}
            className="text-[0.72rem] text-ink-500 transition hover:text-brand-700"
          >
            انصراف و تغییر آزمون
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
          <span>
            {isImpactStep
              ? "پرسش پایانی: میزان اثرگذاری روزمره"
              : `گویهٔ ${toFa(stepIndex + 1)} از ${toFa(tool.questions.length)}`}
          </span>
          <span className="font-semibold text-brand-700">{toFa(progress)}٪ تکمیل‌شده</span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-sand-200">
          <div
            className="h-full rounded-full bg-gradient-to-l from-brand-600 to-brand-300 transition-all duration-300"
            style={{ width: `${Math.max(4, progress)}%` }}
          />
        </div>

        {/* نوار پرش سریع بین سؤالات */}
        <div className="mt-3 flex flex-wrap gap-1">
          {tool.questions.map((q, qIdx) => {
            const done = answers[qIdx] >= 0;
            const current = stepIndex === qIdx;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setStepIndex(qIdx)}
                aria-label={`رفتن به سؤال ${toFa(qIdx + 1)}`}
                className={cn(
                  "h-6 min-w-6 rounded-lg px-1 text-[0.65rem] font-bold transition",
                  current
                    ? "bg-brand-600 text-white ring-2 ring-brand-300"
                    : done
                      ? "bg-brand-100 text-brand-800 hover:bg-brand-200"
                      : "bg-sand-100 text-ink-500 hover:bg-sand-200",
                )}
              >
                {toFa(qIdx + 1)}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setStepIndex(tool.questions.length)}
            aria-label="سؤال اثرگذاری روزمره"
            className={cn(
              "h-6 rounded-lg px-2 text-[0.63rem] font-bold transition",
              isImpactStep
                ? "bg-brand-600 text-white ring-2 ring-brand-300"
                : profile.impact >= 0
                  ? "bg-brand-100 text-brand-800"
                  : "bg-sand-100 text-ink-500",
            )}
          >
            اثرگذاری
          </button>
        </div>

        {!isImpactStep && currentQ ? (
          <div className="mt-7 min-h-[12rem]">
            <p className="text-[0.72rem] font-semibold text-brand-700">
              {currentSub?.label}
            </p>
            <h3 className="mt-2 text-lg font-extrabold leading-9 text-ink-900 sm:text-xl">
              {toFa(currentQ.id)}. {currentQ.text}
            </h3>
            <p className="mt-1 text-xs text-ink-500">{tool.timeframePrompt}</p>

            <div
              className={cn(
                "mt-5 grid gap-2.5",
                tool.scale.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
              )}
            >
              {tool.scale.map((option) => {
                const active = answers[stepIndex] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => chooseQuestionAnswer(option.value)}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-right transition",
                      active
                        ? "border-brand-500 bg-brand-50 text-brand-900 shadow-[0_16px_30px_-24px_rgba(15,125,108,0.9)]"
                        : "border-sand-300 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50/40",
                    )}
                  >
                    <span>
                      <span className="block text-sm font-bold">{option.label}</span>
                      <span className="mt-0.5 block text-[0.68rem] leading-5 text-ink-500">
                        {option.hint}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[0.6rem]",
                        active
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-sand-300 text-transparent",
                      )}
                    >
                      ✓
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-7 min-h-[12rem]">
            <p className="text-[0.72rem] font-semibold text-brand-700">
              مکمل بالینی اثرگذاری عملکردی (Impact Supplement)
            </p>
            <h3 className="mt-2 text-lg font-extrabold leading-9 text-ink-900 sm:text-xl">
              به‌طور کلی، موارد مطرح‌شده چقدر باعث آزار کودک یا اختلال در زندگی روزمرهٔ او (در خانه،
              درس، خواب یا دوستی‌ها) شده است؟
            </h3>
            <p className="mt-1 text-xs text-ink-500">
              این پرسش در استانداردهای بالینی برای سنجش شدت واقعی مشکل و نیاز به مداخله به کار می‌رود.
            </p>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {IMPACT_OPTIONS.map((option) => {
                const active = profile.impact === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => chooseImpactAnswer(option.value)}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-right transition",
                      active
                        ? "border-brand-500 bg-brand-50 text-brand-900 shadow-[0_16px_30px_-24px_rgba(15,125,108,0.9)]"
                        : "border-sand-300 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50/40",
                    )}
                  >
                    <span>
                      <span className="block text-sm font-bold">{option.label}</span>
                      <span className="mt-0.5 block text-[0.68rem] leading-5 text-ink-500">
                        {option.hint}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[0.6rem]",
                        active
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-sand-300 text-transparent",
                      )}
                    >
                      ✓
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-7 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() =>
              stepIndex === 0
                ? setStage("profile")
                : setStepIndex((v) => Math.max(0, v - 1))
            }
            className="btn btn-outline text-xs sm:text-sm"
          >
            {stepIndex === 0 ? "مشخصات پایه" : "پرسش قبل"}
          </button>

          {isImpactStep ? (
            <button
              type="button"
              onClick={finishAssessment}
              disabled={!allReady}
              className="btn btn-primary text-xs disabled:opacity-45 sm:text-sm"
            >
              محاسبهٔ دقیق و نمایش کارنامه
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStepIndex((v) => Math.min(tool.questions.length, v + 1))}
              disabled={answers[stepIndex] < 0}
              className="btn btn-primary text-xs disabled:opacity-40 sm:text-sm"
            >
              پرسش بعد
            </button>
          )}
        </div>

        {isImpactStep && answeredMain < tool.questions.length ? (
          <p className="mt-3 text-center text-xs text-amber-700">
            هنوز {toFa(tool.questions.length - answeredMain)} سؤال بدون پاسخ مانده است؛ روی شماره‌های
            خاکستری بالا بزنید تا تکمیل شوند.
          </p>
        ) : null}
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* مرحلهٔ ۴: نمایش کارنامهٔ بالینی + دانلود برای ارائه به روانشناس            */
  /* ------------------------------------------------------------------------ */
  if (!report) return null;

  const bandStyle = BAND_COLORS[report.band];
  const otherTools = ASSESSMENT_TOOLS.filter((t) => t.id !== report.toolId);

  return (
    <div className="space-y-5">
      {/* نوار ویژهٔ دانلود گزارش برای روانشناس */}
      <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-5 text-white shadow-lg sm:p-6">
        <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-brand-500/25 blur-2xl" />
        <div className="relative flex flex-col gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-bold text-brand-200 ring-1 ring-white/15">
              📄 آمادهٔ ارائه به روانشناس
            </span>
            <h3 className="mt-2 text-base font-extrabold sm:text-lg">
              دانلود برگهٔ نتیجهٔ ارزیابی برای نشان دادن به روانشناس
            </h3>
            <p className="mt-1 text-xs leading-6 text-white/70">
              می‌توانید تصویر خلاصهٔ کارنامه را در گوشی ذخیره کنید یا برگهٔ کامل A4 (شامل جدول
              زیرمقیاس‌ها، شاخص‌های بالینی و ریز پاسخ تک‌تک سؤالات) را به‌صورت PDF ذخیره یا چاپ کنید.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={downloadingPng}
              className="btn btn-primary !px-4 !py-2.5 text-xs disabled:opacity-60"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {downloadingPng ? "در حال آماده‌سازی تصویر..." : "دانلود تصویر کارنامه (PNG)"}
            </button>

            <button
              type="button"
              onClick={handlePrintPdf}
              className="btn btn-ghost-light !px-4 !py-2.5 text-xs"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              چاپ / ذخیرهٔ PDF کامل (A4)
            </button>

            <button
              type="button"
              onClick={handleDownloadFullHtml}
              className="btn btn-ghost-light !px-4 !py-2.5 text-xs"
            >
              دانلود فایل کامل با ریز پاسخ‌ها
            </button>
          </div>

          {exportNotice ? (
            <p className="rounded-xl bg-brand-500/20 px-3.5 py-2 text-xs text-brand-100 ring-1 ring-brand-400/30">
              ✓ {exportNotice}
            </p>
          ) : null}
        </div>
      </div>

      {/* کارت خلاصهٔ نتیجهٔ کلی */}
      <div className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-200 pb-4 text-xs text-ink-500">
          <span className="font-bold text-ink-800">{report.toolTitle}</span>
          <span>
            تاریخ: {report.completedAtFa} • کد:{" "}
            <strong className="font-mono text-ink-700" dir="ltr">
              {report.reportCode}
            </strong>
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-[0.72rem]">
          {report.profile.childName.trim() ? (
            <span className="rounded-full bg-sand-100 px-3 py-1 font-semibold text-ink-800">
              کودک: {report.profile.childName.trim()}
            </span>
          ) : null}
          <span className="rounded-full bg-sand-100 px-3 py-1 font-semibold text-ink-800">
            سن: {toFa(report.profile.age)} سال
          </span>
          {report.profile.gender !== "unspecified" ? (
            <span className="rounded-full bg-sand-100 px-3 py-1 font-semibold text-ink-800">
              جنسیت: {GENDER_LABELS[report.profile.gender]}
            </span>
          ) : null}
          <span className="rounded-full bg-sand-100 px-3 py-1 font-semibold text-ink-800">
            تکمیل‌کننده: {RESPONDENT_LABELS[report.profile.respondent]}
          </span>
          <span className="rounded-full bg-sand-100 px-3 py-1 font-semibold text-ink-800">
            اثرگذاری روزمره: {report.impactLabel}
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
          <ScoreGauge
            score={report.totalScore}
            max={report.totalMax}
            percent={report.gaugePercent}
            label={report.totalLabel}
            band={report.band}
          />
          <div className="flex-1 text-center sm:text-right">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1",
                bandStyle.bg,
                bandStyle.text,
              )}
            >
              {report.bandLabel}
            </span>
            <h2 className="mt-3 text-xl font-extrabold leading-9 text-ink-900 sm:text-2xl">
              {report.headline}
            </h2>
            <p className={cn("mt-1 text-xs font-bold", bandStyle.text)}>{report.patternLabel}</p>
            <p className="mt-1.5 text-[0.72rem] text-ink-500">{report.totalCutoffHint}</p>
          </div>
        </div>

        <div className="mt-6 space-y-2.5 rounded-2xl bg-sand-50/80 p-4 ring-1 ring-sand-200/80 sm:p-5">
          <h3 className="text-sm font-extrabold text-ink-900">تحلیل بالینی نتیجه</h3>
          {report.summaryParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-[0.84rem] leading-8 text-ink-700">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* تفکیک زیرمقیاس‌ها */}
      <div className="card p-6 sm:p-8">
        <h3 className="text-lg font-extrabold text-ink-900">
          نمرات تفکیکی زیرمقیاس‌ها و مقایسه با محدودهٔ استاندارد
        </h3>
        <p className="mt-1 text-xs text-ink-500">
          هر زیرمقیاس به‌طور مستقل بر اساس نقاط برش استاندارد سنجیده شده است.
        </p>

        <div className="mt-5 space-y-3.5">
          {report.subscales.map((sub) => {
            const style = SUBSCALE_STYLES[sub.status];
            return (
              <div
                key={sub.key}
                className={cn("rounded-2xl border bg-white/90 p-4", style.border)}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-extrabold text-ink-900">{sub.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-ink-900">
                      {toFa(sub.score)} از {toFa(sub.maxScore)}
                    </span>
                    <span className={cn("rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold", style.badge)}>
                      {sub.statusLabel}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-sand-200">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-l transition-all duration-700",
                      style.bar,
                    )}
                    style={{ width: `${Math.max(5, sub.percent)}%` }}
                  />
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[0.7rem] text-ink-500">
                  <span>محدودهٔ طبیعی: {sub.normalRangeLabel}</span>
                  {sub.meta ? <span className="font-semibold text-ink-700">{sub.meta}</span> : null}
                </div>

                <p className="mt-2 text-xs leading-7 text-ink-600">{sub.interpretation}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* شاخص‌های ویژهٔ روانشناس + ریز پاسخ‌ها */}
      <div className="card p-6 sm:p-8">
        <h3 className="text-lg font-extrabold text-ink-900">
          خلاصهٔ تخصصی ویژهٔ روانشناس
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {report.clinicianMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-sand-200 bg-sand-50/70 p-3.5"
            >
              <p className="text-[0.7rem] text-ink-500">{metric.label}</p>
              <p className="mt-1 text-sm font-extrabold text-ink-900">{metric.value}</p>
              {metric.note ? (
                <p className="mt-0.5 text-[0.68rem] leading-5 text-ink-500">{metric.note}</p>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-4 text-[0.72rem] leading-6 text-ink-500">{report.clinicianNote}</p>

        <div className="mt-5 border-t border-sand-200 pt-4">
          <button
            type="button"
            onClick={() => setShowAllItems((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl bg-sand-50 px-4 py-3 text-xs font-bold text-ink-800 transition hover:bg-sand-100"
          >
            <span>
              مشاهدهٔ ریز پاسخ به همهٔ {toFa(report.allItems.length)} سؤال (ثبت‌شده در برگهٔ PDF)
            </span>
            <span>{showAllItems ? "بستن ▲" : "نمایش ▼"}</span>
          </button>

          {showAllItems ? (
            <div className="mt-3 overflow-x-auto rounded-2xl border border-sand-200">
              <table className="w-full text-right text-xs">
                <thead className="bg-sand-100 text-ink-700">
                  <tr>
                    <th className="p-2.5 font-bold">#</th>
                    <th className="p-2.5 font-bold">متن گویه</th>
                    <th className="p-2.5 font-bold">پاسخ والد</th>
                    <th className="p-2.5 text-center font-bold">نمره</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200 bg-white">
                  {report.allItems.map((item) => (
                    <tr
                      key={item.number}
                      className={item.isElevated ? "bg-rose-50/40" : undefined}
                    >
                      <td className="p-2.5 font-bold text-ink-500">{toFa(item.number)}</td>
                      <td className="p-2.5 leading-6 text-ink-800">
                        {item.text}
                        {item.reverse ? (
                          <span className="mr-1 text-[0.65rem] font-semibold text-brand-700">
                            (گویهٔ معکوس)
                          </span>
                        ) : null}
                      </td>
                      <td
                        className={cn(
                          "whitespace-nowrap p-2.5 font-semibold",
                          item.isElevated ? "text-clay-600" : "text-ink-700",
                        )}
                      >
                        {item.selectedLabel}
                      </td>
                      <td className="whitespace-nowrap p-2.5 text-center font-bold text-ink-900">
                        {toFa(item.scoredValue)}/{toFa(item.maxItemValue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>

      {/* توصیه‌های کاربردی برای والدین + اقدام بعدی */}
      <div className="card p-6 sm:p-8">
        <h3 className="text-lg font-extrabold text-ink-900">راهکارهای عملی پیشنهادی برای والدین</h3>
        <ul className="mt-4 space-y-3">
          {report.parentSteps.map((step, idx) => (
            <li key={step} className="flex items-start gap-3 text-sm leading-8 text-ink-700">
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-[0.7rem] font-bold text-brand-800">
                {toFa(idx + 1)}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2.5 border-t border-sand-200 pt-5">
          <button
            type="button"
            onClick={handleDownloadPng}
            disabled={downloadingPng}
            className="btn btn-primary text-xs"
          >
            دانلود تصویر گزارش (PNG)
          </button>
          <button type="button" onClick={handlePrintPdf} className="btn btn-outline text-xs">
            چاپ / ذخیرهٔ PDF کامل
          </button>
          <a
            href={SITE.telegramHref}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline text-xs"
          >
            رزرو نوبت و ارسال در تلگرام
          </a>
          <a href={SITE.phoneHref} className="btn btn-outline text-xs" dir="ltr">
            ☎ {SITE.phone}
          </a>
        </div>

        <div className="mt-6 rounded-2xl bg-sand-50 p-4 ring-1 ring-sand-200">
          <p className="text-xs font-bold text-ink-800">انجام سایر ارزیابی‌های استاندارد:</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {otherTools.map((other) => (
              <button
                key={other.id}
                type="button"
                onClick={() => openToolProfile(other.id)}
                className="rounded-xl border border-sand-300 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 transition hover:border-brand-400 hover:text-brand-700"
              >
                {other.icon} {other.shortTitle}
              </button>
            ))}
            <button
              type="button"
              onClick={resetToSelector}
              className="rounded-xl border border-sand-300 bg-white px-3.5 py-2 text-xs font-semibold text-ink-500 transition hover:text-ink-800"
            >
              بازگشت به فهرست همهٔ ابزارها
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  GENDER_LABELS,
  RESPONDENT_LABELS,
  type FullAssessmentReport,
  type SubscaleStatus,
} from "@/lib/assessment";
import { SITE } from "@/lib/content";
import { toFa } from "@/lib/utils";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function statusPalette(status: SubscaleStatus, isStrength: boolean) {
  if (status === "normal") {
    return {
      bg: "#eefaf6",
      border: "#a8e7d7",
      text: "#0e6458",
      bar: isStrength ? "#0f7d6c" : "#1c9c86",
    };
  }
  if (status === "borderline") {
    return {
      bg: "#fef9ec",
      border: "#f3d88b",
      text: "#92600e",
      bar: "#d9a441",
    };
  }
  return {
    bg: "#fef2f2",
    border: "#f5b8ac",
    text: "#a63d28",
    bar: "#e07a5f",
  };
}

function bandPalette(band: FullAssessmentReport["band"]) {
  if (band === "low") {
    return { bg: "#eefaf6", border: "#74d3be", text: "#0e6458", accent: "#0f7d6c" };
  }
  if (band === "moderate") {
    return { bg: "#fef9ec", border: "#e3bf6a", text: "#8a5a0c", accent: "#d9a441" };
  }
  return { bg: "#fff1ee", border: "#e79a83", text: "#9e3823", accent: "#c95f45" };
}

function safeFileSlug(report: FullAssessmentReport): string {
  const date = report.completedAtIso.slice(0, 10);
  return `gozaresh-${report.toolId}-${report.profile.age}sal-${date}`;
}

/* ========================================================================== */
/* ساخت HTML استاندارد A4 برای چاپ / ذخیرهٔ PDF و دانلود برگهٔ کامل روانشناس    */
/* ========================================================================== */
export function buildClinicalReportHtml(report: FullAssessmentReport, autoPrint = false): string {
  const bColor = bandPalette(report.band);
  const childDisplay = report.profile.childName.trim() || "ثبت‌نشده (بی‌نام)";
  const genderDisplay = GENDER_LABELS[report.profile.gender];
  const respondentDisplay = RESPONDENT_LABELS[report.profile.respondent];

  const subscalesHtml = report.subscales
    .map((sub) => {
      const c = statusPalette(sub.status, sub.isStrength);
      return `
      <tr>
        <td style="font-weight:700;color:#0a1a17;">
          ${escapeHtml(sub.label)}
          ${sub.meta ? `<div style="font-size:10.5px;font-weight:500;color:#4b5b57;margin-top:3px;">${escapeHtml(sub.meta)}</div>` : ""}
        </td>
        <td style="text-align:center;font-weight:800;white-space:nowrap;color:#0a1a17;">
          ${toFa(sub.score)} از ${toFa(sub.maxScore)}
          <div style="width:90px;height:6px;background:#efe8db;border-radius:99px;overflow:hidden;margin:5px auto 0;">
            <div style="width:${Math.max(4, sub.percent)}%;height:100%;background:${c.bar};border-radius:99px;"></div>
          </div>
        </td>
        <td style="text-align:center;font-size:11px;color:#4b5b57;white-space:nowrap;">${escapeHtml(sub.normalRangeLabel)}</td>
        <td style="text-align:center;white-space:nowrap;">
          <span style="display:inline-block;padding:3px 9px;border-radius:99px;font-size:10.5px;font-weight:700;background:${c.bg};color:${c.text};border:1px solid ${c.border};">
            ${escapeHtml(sub.statusLabel)}
          </span>
        </td>
        <td style="font-size:11px;color:#334541;line-height:1.7;">${escapeHtml(sub.interpretation)}</td>
      </tr>`;
    })
    .join("");

  const metricsHtml = report.clinicianMetrics
    .map(
      (m) => `
      <div style="border:1px solid #e2d7c4;border-radius:10px;padding:9px 11px;background:#fcfaf6;">
        <div style="font-size:10.5px;color:#4b5b57;">${escapeHtml(m.label)}</div>
        <div style="font-size:13px;font-weight:800;color:#0a1a17;margin-top:3px;">${escapeHtml(m.value)}</div>
        ${m.note ? `<div style="font-size:10px;color:#5c6d68;margin-top:2px;">${escapeHtml(m.note)}</div>` : ""}
      </div>`,
    )
    .join("");

  const itemsHtml = report.allItems
    .map(
      (item) => `
      <tr style="${item.isElevated ? "background:#fff8f5;" : ""}">
        <td style="text-align:center;font-weight:700;color:#4b5b57;">${toFa(item.number)}</td>
        <td style="font-size:11px;color:#12211e;">
          ${escapeHtml(item.text)}
          ${item.reverse ? `<span style="font-size:9.5px;color:#0f7d6c;font-weight:700;"> (معکوس)</span>` : ""}
        </td>
        <td style="font-size:10.5px;color:#4b5b57;white-space:nowrap;">${escapeHtml(item.subscaleLabel.split(" (")[0])}</td>
        <td style="text-align:center;font-size:11px;font-weight:${item.isElevated ? "800" : "600"};color:${item.isElevated ? "#a63d28" : "#1d302c"};white-space:nowrap;">
          ${escapeHtml(item.selectedLabel)}
        </td>
        <td style="text-align:center;font-size:11px;font-weight:700;color:#0a1a17;white-space:nowrap;">
          ${toFa(item.scoredValue)} / ${toFa(item.maxItemValue)}
        </td>
      </tr>`,
    )
    .join("");

  const paragraphsHtml = report.summaryParagraphs
    .map((p) => `<p style="margin:0 0 7px;font-size:12px;line-height:1.9;color:#1d302c;">${escapeHtml(p)}</p>`)
    .join("");

  const stepsHtml = report.parentSteps
    .map((s) => `<li style="margin-bottom:5px;font-size:11.5px;line-height:1.8;color:#1d302c;">${escapeHtml(s)}</li>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>گزارش ارزیابی کودک — ${escapeHtml(report.toolShortTitle)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 20px;
      font-family: "Vazirmatn", Tahoma, "Segoe UI", sans-serif;
      background: #f4efe6;
      color: #12211e;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .sheet {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid #e2d7c4;
      box-shadow: 0 20px 50px -30px rgba(10,26,23,0.25);
    }
    .toolbar {
      max-width: 860px;
      margin: 0 auto 14px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: #0a1a17;
      color: #fff;
      padding: 10px 16px;
      border-radius: 12px;
      font-size: 12px;
    }
    .toolbar button {
      font-family: inherit;
      background: #1c9c86;
      color: #fff;
      border: none;
      border-radius: 999px;
      padding: 8px 18px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .header {
      background: linear-gradient(135deg, #0a1a17, #0f423c 60%, #0f7d6c);
      color: #fff;
      padding: 22px 26px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      gap: 14px;
    }
    .body { padding: 22px 26px; }
    .section { margin-top: 18px; }
    .section-title {
      font-size: 13.5px;
      font-weight: 800;
      color: #0a1a17;
      margin: 0 0 9px;
      padding-bottom: 5px;
      border-bottom: 1.5px solid #efe8db;
    }
    table { width: 100%; border-collapse: collapse; }
    th, td {
      border: 1px solid #e6decb;
      padding: 7px 9px;
      vertical-align: middle;
      text-align: right;
    }
    th {
      background: #f7f3ec;
      font-size: 11px;
      font-weight: 800;
      color: #1d302c;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    @media (max-width: 640px) {
      body { padding: 8px; }
      .body, .header { padding: 14px; }
      .meta-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .metrics-grid { grid-template-columns: 1fr; }
    }
    @media print {
      @page { size: A4 portrait; margin: 10mm; }
      body { background: #fff; padding: 0; }
      .toolbar { display: none !important; }
      .sheet { box-shadow: none; border: none; border-radius: 0; max-width: 100%; }
      tr { page-break-inside: avoid; }
      .avoid-break { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <span>برای ذخیره به‌صورت PDF یا چاپ روی کاغذ A4 (جهت ارائه به روانشناس) روی دکمهٔ روبه‌رو بزنید.</span>
    <button type="button" onclick="window.print()">چاپ / ذخیره به صورت PDF</button>
  </div>

  <div class="sheet">
    <div class="header">
      <div>
        <div style="font-size:11px;color:#a8e7d7;font-weight:700;">برگهٔ گزارش غربالگری کودک و نوجوان — ویژهٔ ارائه به روانشناس</div>
        <h1 style="margin:6px 0 4px;font-size:18px;font-weight:900;">${escapeHtml(report.toolTitle)}</h1>
        <div style="font-size:11px;color:rgba(255,255,255,0.78);" dir="ltr">${escapeHtml(report.englishCode)}</div>
      </div>
      <div style="text-align:left;font-size:11px;line-height:1.8;color:rgba(255,255,255,0.88);">
        <div style="font-weight:800;font-size:12.5px;color:#fff;">${escapeHtml(SITE.name)} — کارشناس ارشد روانشناسی بالینی</div>
        <div>${escapeHtml(SITE.address)}</div>
        <div>تاریخ تکمیل: ${escapeHtml(report.completedAtFa)} | کد: <span dir="ltr">${escapeHtml(report.reportCode)}</span></div>
      </div>
    </div>

    <div class="body">
      <div class="meta-grid avoid-break">
        <div style="background:#fcfaf6;border:1px solid #e2d7c4;border-radius:10px;padding:8px 10px;">
          <div style="font-size:10px;color:#4b5b57;">نام / نام مستعار کودک</div>
          <div style="font-size:12.5px;font-weight:800;margin-top:2px;">${escapeHtml(childDisplay)}</div>
        </div>
        <div style="background:#fcfaf6;border:1px solid #e2d7c4;border-radius:10px;padding:8px 10px;">
          <div style="font-size:10px;color:#4b5b57;">سن و جنسیت</div>
          <div style="font-size:12.5px;font-weight:800;margin-top:2px;">${toFa(report.profile.age)} ساله • ${escapeHtml(genderDisplay)}</div>
        </div>
        <div style="background:#fcfaf6;border:1px solid #e2d7c4;border-radius:10px;padding:8px 10px;">
          <div style="font-size:10px;color:#4b5b57;">تکمیل‌کنندهٔ پرسشنامه</div>
          <div style="font-size:12.5px;font-weight:800;margin-top:2px;">${escapeHtml(respondentDisplay)}</div>
        </div>
        <div style="background:#fcfaf6;border:1px solid #e2d7c4;border-radius:10px;padding:8px 10px;">
          <div style="font-size:10px;color:#4b5b57;">اثرگذاری بر زندگی روزمره</div>
          <div style="font-size:12px;font-weight:800;margin-top:2px;">${escapeHtml(report.impactLabel)}</div>
        </div>
      </div>

      ${
        report.profile.parentNote.trim()
          ? `<div class="avoid-break" style="margin-top:10px;background:#f7f3ec;border:1px solid #e2d7c4;border-radius:10px;padding:9px 12px;font-size:11.5px;line-height:1.8;">
              <strong>توضیح تکمیلی والد برای روانشناس:</strong> ${escapeHtml(report.profile.parentNote.trim())}
            </div>`
          : ""
      }

      <div class="section avoid-break" style="background:${bColor.bg};border:1.5px solid ${bColor.border};border-radius:14px;padding:14px 16px;">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px;">
          <div>
            <span style="display:inline-block;padding:3px 10px;border-radius:99px;background:#fff;color:${bColor.text};border:1px solid ${bColor.border};font-size:11px;font-weight:800;">
              ${escapeHtml(report.bandLabel)}
            </span>
            <h2 style="margin:7px 0 2px;font-size:15px;font-weight:900;color:#0a1a17;">${escapeHtml(report.headline)}</h2>
            <div style="font-size:11.5px;font-weight:700;color:${bColor.text};">${escapeHtml(report.patternLabel)}</div>
          </div>
          <div style="text-align:center;background:#fff;border:1px solid ${bColor.border};border-radius:12px;padding:8px 16px;min-width:130px;">
            <div style="font-size:10px;color:#4b5b57;">${escapeHtml(report.totalLabel)}</div>
            <div style="font-size:21px;font-weight:900;color:${bColor.accent};">${toFa(report.totalScore)} <span style="font-size:12px;color:#4b5b57;">از ${toFa(report.totalMax)}</span></div>
          </div>
        </div>
        ${paragraphsHtml}
      </div>

      <div class="section">
        <h3 class="section-title">جدول نمرات زیرمقیاس‌ها و نقاط برش استاندارد</h3>
        <table>
          <thead>
            <tr>
              <th style="width:24%;">زیرمقیاس</th>
              <th style="width:15%;text-align:center;">نمرهٔ کسب‌شده</th>
              <th style="width:15%;text-align:center;">محدودهٔ طبیعی</th>
              <th style="width:16%;text-align:center;">وضعیت</th>
              <th style="width:30%;">تفسیر بالینی</th>
            </tr>
          </thead>
          <tbody>${subscalesHtml}</tbody>
        </table>
      </div>

      <div class="section avoid-break">
        <h3 class="section-title">شاخص‌های کلیدی ویژهٔ بررسی روانشناس</h3>
        <div class="metrics-grid">${metricsHtml}</div>
        <p style="margin:9px 0 0;font-size:10.5px;line-height:1.8;color:#4b5b57;">${escapeHtml(report.clinicianNote)}</p>
      </div>

      <div class="section avoid-break">
        <h3 class="section-title">راهکارهای پیشنهادی اولیه برای والدین</h3>
        <ul style="margin:0;padding-right:18px;">${stepsHtml}</ul>
      </div>

      <div class="section">
        <h3 class="section-title">ریز پاسخ به تک‌تک گویه‌ها (${toFa(report.allItems.length)} سؤال — ${escapeHtml(report.timeframePrompt)})</h3>
        <table>
          <thead>
            <tr>
              <th style="width:6%;text-align:center;">#</th>
              <th style="width:52%;">گویه</th>
              <th style="width:18%;">زیرمقیاس</th>
              <th style="width:14%;text-align:center;">پاسخ والد</th>
              <th style="width:10%;text-align:center;">نمره</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
      </div>

      <div class="section avoid-break" style="border:1px dashed #cbbda3;border-radius:12px;padding:12px 14px;background:#fcfaf6;">
        <div style="font-size:11px;font-weight:800;color:#1d302c;margin-bottom:26px;">محل یادداشت بالینی روانشناس در جلسهٔ حضوری:</div>
        <div style="border-bottom:1px dotted #cbbda3;margin-bottom:18px;"></div>
        <div style="border-bottom:1px dotted #cbbda3;"></div>
      </div>

      <div style="margin-top:16px;padding-top:10px;border-top:1px solid #efe8db;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;font-size:10px;color:#5c6d68;line-height:1.7;">
        <div>توجه علمی: این برگه نتیجهٔ پرسشنامهٔ غربالگری والدین است و جایگزین مصاحبهٔ بالینی و تشخیص قطعی روانشناس نیست.</div>
        <div>مطب ${escapeHtml(SITE.name)} • ${escapeHtml(SITE.address)} • تلفن: <span dir="ltr">${escapeHtml(SITE.phone)}</span> • تلگرام: <span dir="ltr">${escapeHtml(SITE.telegram)}</span></div>
      </div>
    </div>
  </div>
  ${
    autoPrint
      ? `<script>
          window.addEventListener("load", function () {
            setTimeout(function () { window.print(); }, 450);
          });
        </script>`
      : ""
  }
</body>
</html>`;
}

export function downloadFullReportHtml(report: FullAssessmentReport): void {
  const html = buildClinicalReportHtml(report, false);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeFileSlug(report)}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function printReportPdf(report: FullAssessmentReport): void {
  const html = buildClinicalReportHtml(report, true);
  const popup = window.open("", "_blank");
  if (!popup) {
    // اگر مرورگر پنجره جدید را مسدود کرد، فایل کامل گزارش مستقیماً دانلود شود
    downloadFullReportHtml(report);
    return;
  }
  popup.document.open();
  popup.document.write(html);
  popup.document.close();
}

/* ========================================================================== */
/* تولید تصویر باکیفیت PNG از کارنامهٔ بالینی (مناسب موبایل، گالری و تلگرام)   */
/* ========================================================================== */

function wrapRtlLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const lines: string[] = [];
  let current = words[0];

  for (let i = 1; i < words.length; i += 1) {
    const candidate = `${current} ${words[i]}`;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = words[i];
    }
  }
  lines.push(current);
  return lines;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export async function downloadReportPng(report: FullAssessmentReport): Promise<void> {
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // ادامه با فونت موجود
    }
  }

  const fontFamily = '"Vazirmatn", Tahoma, sans-serif';
  const W = 1040;
  const PAD = 44;
  const INNER = W - PAD * 2;
  const rightX = W - PAD;

  // یک بوم موقت برای محاسبهٔ دقیق ارتفاع تمام خطوط فارسی
  const measureCanvas = document.createElement("canvas");
  measureCanvas.width = W;
  measureCanvas.height = 200;
  const mctx = measureCanvas.getContext("2d");
  if (!mctx) {
    downloadFullReportHtml(report);
    return;
  }
  mctx.direction = "rtl";

  mctx.font = `500 15px ${fontFamily}`;
  const summaryLinesList = report.summaryParagraphs.map((p) => wrapRtlLines(mctx, p, INNER - 48));
  const summaryLineCount = summaryLinesList.reduce((acc, l) => acc + l.length, 0);

  const parentNoteText = report.profile.parentNote.trim();
  mctx.font = `500 14px ${fontFamily}`;
  const noteLines = parentNoteText
    ? wrapRtlLines(mctx, `توضیح والد: ${parentNoteText}`, INNER - 36)
    : [];

  const topElevated = report.elevatedItems.slice(0, 8);
  mctx.font = `500 13.5px ${fontFamily}`;
  const elevatedWrapped = topElevated.map((it) =>
    wrapRtlLines(
      mctx,
      `• سؤال ${toFa(it.number)} (${it.subscaleLabel.split(" (")[0]}): ${it.text} ← پاسخ: «${it.selectedLabel}»`,
      INNER - 36,
    ),
  );
  const elevatedLineCount = elevatedWrapped.reduce((acc, l) => acc + l.length, 0);

  // محاسبه ارتفاع کل بوم
  let totalHeight = 165; // هدر
  totalHeight += 28 + 82; // مشخصات کودک
  if (noteLines.length > 0) {
    totalHeight += 14 + noteLines.length * 24 + 22;
  }
  totalHeight += 22 + 112 + summaryLineCount * 26 + report.summaryParagraphs.length * 8 + 24; // باکس خلاصه
  totalHeight += 28 + 38 + report.subscales.length * 88; // زیرمقیاس‌ها
  const metricRows = Math.ceil(report.clinicianMetrics.length / 2);
  totalHeight += 24 + 38 + metricRows * 82; // شاخص‌های روانشناس
  if (topElevated.length > 0) {
    totalHeight += 24 + 38 + elevatedLineCount * 24 + topElevated.length * 6 + 26;
  }
  totalHeight += 110; // فوتر و سلب مسئولیت

  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = totalHeight * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    downloadFullReportHtml(report);
    return;
  }

  ctx.scale(scale, scale);
  ctx.direction = "rtl";
  ctx.textBaseline = "top";

  // پس‌زمینه
  ctx.fillStyle = "#fcfaf6";
  ctx.fillRect(0, 0, W, totalHeight);

  // هدر سرمه‌ای–سبز
  const headerGrad = ctx.createLinearGradient(W, 0, 0, 165);
  headerGrad.addColorStop(0, "#0a1a17");
  headerGrad.addColorStop(0.6, "#0f423c");
  headerGrad.addColorStop(1, "#0f7d6c");
  ctx.fillStyle = headerGrad;
  ctx.fillRect(0, 0, W, 165);

  ctx.textAlign = "right";
  ctx.fillStyle = "#a8e7d7";
  ctx.font = `700 14px ${fontFamily}`;
  ctx.fillText("برگهٔ گزارش غربالگری کودک و نوجوان — ویژهٔ ارائه به روانشناس", rightX, 28);

  ctx.fillStyle = "#ffffff";
  ctx.font = `900 24px ${fontFamily}`;
  ctx.fillText(report.toolTitle, rightX, 56);

  ctx.fillStyle = "rgba(255,255,255,0.82)";
  ctx.font = `500 13.5px ${fontFamily}`;
  ctx.fillText(
    `${SITE.name} — کارشناس ارشد روانشناسی بالینی  |  ${SITE.address}`,
    rightX,
    98,
  );
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = `500 12.5px ${fontFamily}`;
  ctx.fillText(
    `تاریخ تکمیل: ${report.completedAtFa}   •   کد گزارش: ${report.reportCode}   •   ${report.englishCode}`,
    rightX,
    126,
  );

  let y = 190;

  // کارت‌های مشخصات کودک
  const infoItems = [
    { label: "نام / نام مستعار کودک", value: report.profile.childName.trim() || "ثبت‌نشده" },
    {
      label: "سن و جنسیت",
      value: `${toFa(report.profile.age)} ساله • ${GENDER_LABELS[report.profile.gender]}`,
    },
    { label: "تکمیل‌کنندهٔ فرم", value: RESPONDENT_LABELS[report.profile.respondent] },
    { label: "اثرگذاری روزمره", value: report.impactLabel },
  ];
  const gap = 12;
  const colW = (INNER - gap * 3) / 4;
  infoItems.forEach((item, idx) => {
    const cardX = W - PAD - colW * (idx + 1) - gap * idx;
    drawRoundedRect(ctx, cardX, y, colW, 76, 14);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#e2d7c4";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#5b6b67";
    ctx.font = `500 12px ${fontFamily}`;
    ctx.fillText(item.label, cardX + colW - 14, y + 14);

    ctx.fillStyle = "#0a1a17";
    ctx.font = `800 14.5px ${fontFamily}`;
    ctx.fillText(item.value, cardX + colW - 14, y + 40, colW - 28);
  });
  y += 92;

  // یادداشت والد در صورت ثبت
  if (noteLines.length > 0) {
    const noteH = noteLines.length * 24 + 22;
    drawRoundedRect(ctx, PAD, y, INNER, noteH, 12);
    ctx.fillStyle = "#f7f3ec";
    ctx.fill();
    ctx.strokeStyle = "#e2d7c4";
    ctx.stroke();

    ctx.fillStyle = "#1d302c";
    ctx.font = `600 13.5px ${fontFamily}`;
    noteLines.forEach((line, i) => {
      ctx.fillText(line, rightX - 18, y + 12 + i * 24);
    });
    y += noteH + 16;
  }

  // باکس نتیجهٔ کلی
  const bPal = bandPalette(report.band);
  const summaryH = 112 + summaryLineCount * 26 + report.summaryParagraphs.length * 8 + 18;
  drawRoundedRect(ctx, PAD, y, INNER, summaryH, 18);
  ctx.fillStyle = bPal.bg;
  ctx.fill();
  ctx.strokeStyle = bPal.border;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // باکس نمره کل سمت چپ
  drawRoundedRect(ctx, PAD + 20, y + 18, 175, 78, 14);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = bPal.border;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#4b5b57";
  ctx.font = `600 12px ${fontFamily}`;
  ctx.fillText(report.totalLabel, PAD + 20 + 87.5, y + 30);
  ctx.fillStyle = bPal.accent;
  ctx.font = `900 24px ${fontFamily}`;
  ctx.fillText(`${toFa(report.totalScore)} از ${toFa(report.totalMax)}`, PAD + 20 + 87.5, y + 54);

  // عنوان و برچسب نتیجه سمت راست
  ctx.textAlign = "right";
  ctx.fillStyle = bPal.text;
  ctx.font = `800 13px ${fontFamily}`;
  ctx.fillText(`سطح غربالگری: ${report.bandLabel}`, rightX - 22, y + 20);

  ctx.fillStyle = "#0a1a17";
  ctx.font = `900 19px ${fontFamily}`;
  ctx.fillText(report.headline, rightX - 22, y + 45, INNER - 230);

  ctx.fillStyle = bPal.text;
  ctx.font = `700 13.5px ${fontFamily}`;
  ctx.fillText(report.patternLabel, rightX - 22, y + 76, INNER - 230);

  let sy = y + 112;
  ctx.fillStyle = "#1d302c";
  ctx.font = `500 14.5px ${fontFamily}`;
  summaryLinesList.forEach((lines) => {
    lines.forEach((line) => {
      ctx.fillText(line, rightX - 22, sy);
      sy += 26;
    });
    sy += 8;
  });

  y += summaryH + 26;

  // بخش زیرمقیاس‌ها
  ctx.fillStyle = "#0a1a17";
  ctx.font = `900 17px ${fontFamily}`;
  ctx.fillText("نمرات تفکیکی زیرمقیاس‌ها و محدودهٔ هنجار", rightX, y);
  y += 34;

  report.subscales.forEach((sub) => {
    const sPal = statusPalette(sub.status, sub.isStrength);
    drawRoundedRect(ctx, PAD, y, INNER, 78, 14);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#e2d7c4";
    ctx.lineWidth = 1;
    ctx.stroke();

    // نام زیرمقیاس
    ctx.textAlign = "right";
    ctx.fillStyle = "#0a1a17";
    ctx.font = `800 15px ${fontFamily}`;
    ctx.fillText(sub.label, rightX - 18, y + 13);

    // محدوده طبیعی و متا
    ctx.fillStyle = "#5b6b67";
    ctx.font = `500 12px ${fontFamily}`;
    const metaLine = sub.meta
      ? `${sub.meta}  •  محدودهٔ طبیعی: ${sub.normalRangeLabel}`
      : `محدودهٔ طبیعی: ${sub.normalRangeLabel}`;
    ctx.fillText(metaLine, rightX - 18, y + 36, INNER - 290);

    // قرص وضعیت و نمره سمت چپ
    ctx.textAlign = "left";
    ctx.fillStyle = sPal.text;
    ctx.font = `800 13.5px ${fontFamily}`;
    ctx.fillText(
      `${toFa(sub.score)} از ${toFa(sub.maxScore)}  |  ${sub.statusLabel}`,
      PAD + 18,
      y + 15,
    );

    // نوار پیشرفت (از راست به چپ)
    const barX = PAD + 18;
    const barY = y + 58;
    const barW = INNER - 36;
    drawRoundedRect(ctx, barX, barY, barW, 8, 4);
    ctx.fillStyle = "#efe8db";
    ctx.fill();

    const fillW = Math.max(10, Math.round((sub.percent / 100) * barW));
    drawRoundedRect(ctx, barX + barW - fillW, barY, fillW, 8, 4);
    ctx.fillStyle = sPal.bar;
    ctx.fill();

    ctx.textAlign = "right";
    y += 88;
  });

  // بخش شاخص‌های کلیدی روانشناس
  y += 14;
  ctx.fillStyle = "#0a1a17";
  ctx.font = `900 17px ${fontFamily}`;
  ctx.fillText("شاخص‌های کلیدی ویژهٔ روانشناس", rightX, y);
  y += 34;

  const mColW = (INNER - 14) / 2;
  report.clinicianMetrics.forEach((metric, idx) => {
    const row = Math.floor(idx / 2);
    const col = idx % 2;
    const mx = col === 0 ? rightX - mColW : PAD;
    const my = y + row * 80;

    drawRoundedRect(ctx, mx, my, mColW, 70, 12);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#e2d7c4";
    ctx.stroke();

    ctx.fillStyle = "#5b6b67";
    ctx.font = `500 11.5px ${fontFamily}`;
    ctx.fillText(metric.label, mx + mColW - 14, my + 10, mColW - 28);

    ctx.fillStyle = "#0a1a17";
    ctx.font = `800 14.5px ${fontFamily}`;
    ctx.fillText(metric.value, mx + mColW - 14, my + 29, mColW - 28);

    if (metric.note) {
      ctx.fillStyle = "#697975";
      ctx.font = `500 11px ${fontFamily}`;
      ctx.fillText(metric.note, mx + mColW - 14, my + 50, mColW - 28);
    }
  });
  y += metricRows * 80 + 16;

  // گویه‌های برجسته گزارش‌شده توسط والد
  if (topElevated.length > 0) {
    ctx.fillStyle = "#0a1a17";
    ctx.font = `900 17px ${fontFamily}`;
    const extraCount = report.elevatedItems.length - topElevated.length;
    const titleSuffix =
      extraCount > 0 ? ` (${toFa(topElevated.length)} مورد اول از ${toFa(report.elevatedItems.length)})` : ` (${toFa(topElevated.length)} مورد)`;
    ctx.fillText(`گویه‌های برجستهٔ گزارش‌شده توسط والد${titleSuffix}`, rightX, y);
    y += 34;

    const elevH = elevatedLineCount * 24 + topElevated.length * 6 + 20;
    drawRoundedRect(ctx, PAD, y, INNER, elevH, 14);
    ctx.fillStyle = "#fffaf7";
    ctx.fill();
    ctx.strokeStyle = "#f0cfc5";
    ctx.stroke();

    let ey = y + 12;
    ctx.fillStyle = "#1d302c";
    ctx.font = `500 13.5px ${fontFamily}`;
    elevatedWrapped.forEach((lines) => {
      lines.forEach((line) => {
        ctx.fillText(line, rightX - 18, ey);
        ey += 24;
      });
      ey += 6;
    });
    y += elevH + 18;
  }

  // فوتر
  ctx.strokeStyle = "#e2d7c4";
  ctx.beginPath();
  ctx.moveTo(PAD, y + 8);
  ctx.lineTo(W - PAD, y + 8);
  ctx.stroke();

  ctx.fillStyle = "#5b6b67";
  ctx.font = `600 12px ${fontFamily}`;
  ctx.fillText(
    "توجه علمی: این گزارش نتیجهٔ غربالگری استاندارد والدین است و جایگزین مصاحبهٔ بالینی و تشخیص قطعی روانشناس نیست.",
    rightX,
    y + 22,
  );
  ctx.fillStyle = "#0f6458";
  ctx.font = `700 12.5px ${fontFamily}`;
  ctx.fillText(
    `رزرو نوبت حضوری:  ${SITE.phone}   |   تلگرام: ${SITE.telegram}   |   ${SITE.address}`,
    rightX,
    y + 48,
  );

  await new Promise<void>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          downloadFullReportHtml(report);
          resolve();
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${safeFileSlug(report)}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 4000);
        resolve();
      },
      "image/png",
      1,
    );
  });
}

import type { Bill } from "@/hooks/useBills";
import logo from "@/assets/logo-hires.png";
import seal from "@/assets/company-seal.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const fmt = (v: number | null | undefined) =>
  v == null || Number.isNaN(v) ? "-" : `Rs. ${Number(v).toLocaleString("en-IN")}`;

const MSME = "UDYAM Reg. No: TN-03-0046434";
const COMPANY = "Roadlink Tours and Travels";
const ADDRESS = "Coimbatore, Tamil Nadu";
const CONTACT = "+91 82481 99154";

const tripTypeLabel = (t?: string | null) =>
  t === "half_day" ? "Half Day Rent" :
  t === "pickup_drop" ? "Pick Up & Drop" :
  "Full Day Rent";

// Format "HH:MM" 24h string → "hh:mm AM/PM"
const time12 = (t?: string | null): string => {
  if (!t) return "-";
  const [hh, mm] = t.split(":").map(Number);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return t;
  const p = hh >= 12 ? "PM" : "AM";
  const h12 = ((hh + 11) % 12) + 1;
  return `${String(h12).padStart(2, "0")}:${String(mm).padStart(2, "0")} ${p}`;
};

const formatMinutes = (m: number | null | undefined): string =>
  m == null ? "-" : `${Math.floor(m / 60)}h ${m % 60}m`;

// Convert an integer amount (rupees) to Indian words
const numToWords = (n: number): string => {
  if (!Number.isFinite(n) || n <= 0) return "";
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const two = (x: number): string => x < 20 ? a[x] : `${b[Math.floor(x / 10)]}${x % 10 ? " " + a[x % 10] : ""}`;
  const three = (x: number): string => {
    const h = Math.floor(x / 100), r = x % 100;
    return `${h ? a[h] + " Hundred" + (r ? " " : "") : ""}${r ? two(r) : ""}`;
  };
  let num = Math.round(n);
  const crore = Math.floor(num / 10000000); num %= 10000000;
  const lakh = Math.floor(num / 100000); num %= 100000;
  const thousand = Math.floor(num / 1000); num %= 1000;
  const rest = num;
  const parts: string[] = [];
  if (crore) parts.push(`${two(crore)} Crore`);
  if (lakh) parts.push(`${two(lakh)} Lakh`);
  if (thousand) parts.push(`${two(thousand)} Thousand`);
  if (rest) parts.push(three(rest));
  return `Rupees ${parts.join(" ").trim()} Only`;
};

// Rows shown on the printed/PDF invoice. Parking & Tollgate, Permit and
// Night Halt are intentionally excluded from the printout (still saved in DB).
const buildChargeRows = (bill: Bill): [string, number][] => {
  const b = bill as unknown as {
    day_rent?: number | null; driver_bata?: number | null;
    extra_hours_amount?: number | null; extra_km_amount?: number | null;
    trip_type?: string | null; other_charges?: number | null;
  };
  const days = bill.total_days ?? 1;
  const rows: [string, number][] = [];
  if (b.day_rent) {
    const label = tripTypeLabel(b.trip_type);
    const total = b.trip_type === "pickup_drop" ? Number(b.day_rent) : Number(b.day_rent) * days;
    const calc = b.trip_type === "pickup_drop"
      ? `${label} = Rs. ${Number(b.day_rent).toLocaleString("en-IN")}`
      : `${label} — Rs. ${Number(b.day_rent).toLocaleString("en-IN")} × ${days} Day${days === 1 ? "" : "s"}`;
    rows.push([calc, total]);
  }
  if (bill.parking_tollgate) rows.push(["Parking & Tollgate", Number(bill.parking_tollgate)]);
  if (bill.permit) rows.push(["Permit", Number(bill.permit)]);
  if (bill.night_halt) rows.push(["Night Halt", Number(bill.night_halt)]);
  if (b.driver_bata) rows.push([`Driver Bata × ${days} Day${days === 1 ? "" : "s"}`, Number(b.driver_bata) * days]);
  if (b.extra_hours_amount) rows.push(["Additional Hourly Charges", Number(b.extra_hours_amount)]);
  if (b.extra_km_amount) rows.push(["Additional Kilometer Charges", Number(b.extra_km_amount)]);
  if (b.other_charges) rows.push(["Other Charges", Number(b.other_charges)]);
  return rows;
};

/**
 * Opens a browser print dialog with a clean printable invoice for the given
 * bill. The header includes the website logo and MSME UDYAM number.
 */
export const printBill = (bill: Bill) => {
  const win = window.open("", "_blank", "width=900,height=1000");
  if (!win) return;
  const bx = bill as unknown as {
    trip_type?: string; pickup?: string; drop_location?: string;
    customer_phone?: string; customer_address?: string; department?: string;
  };
  const charges = buildChargeRows(bill);
  const totalMins = bill.total_time_minutes ?? null;
  const totalHoursDisplay = formatMinutes(totalMins);
  const addlHours = bill.extra_hours != null ? Number(bill.extra_hours) : null;
  const addlKm = bill.extra_km != null ? Number(bill.extra_km) : null;
  const total = Number(bill.total_amount ?? 0);
  const advance = Number(bill.advance ?? 0);
  const balance = Number(bill.balance ?? (total - advance));

  win.document.write(`<!doctype html><html><head><title>Invoice ${bill.bill_no ?? ""}</title>
  <style>
    @page { size: A4; margin: 12mm; }
    * { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 0; padding: 0; font-size: 12px; }
    .header { display: flex; align-items: center; gap: 18px; border-bottom: 2px solid #1d4ed8; padding-bottom: 12px; margin-bottom: 14px; }
    .header img.logo { width: 170px; height: auto; object-fit: contain; }
    .brand h1 { margin: 0 0 4px; color: #1d4ed8; font-size: 20px; letter-spacing: 0.3px; }
    .brand .line { color: #475569; font-size: 11px; }
    .brand .msme { font-weight: 700; color: #0f5132; font-size: 11px; margin-top: 3px; }
    .title-block { margin-left: auto; text-align: right; }
    .title-block h2 { margin: 0; color: #1d4ed8; font-size: 26px; letter-spacing: 3px; }
    .title-block div { font-size: 11px; color: #334155; }
    .info { display: flex; gap: 12px; margin-bottom: 12px; }
    .info .box { flex: 1; border: 1px solid #cbd5e1; border-radius: 4px; overflow: hidden; }
    .info .box h3 { margin: 0; padding: 6px 10px; background: #eff6ff; color: #1e40af; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .info table { width: 100%; border-collapse: collapse; }
    .info td { padding: 5px 10px; font-size: 11px; vertical-align: top; border-bottom: 1px solid #f1f5f9; }
    .info td:first-child { font-weight: 600; color: #64748b; width: 90px; }
    table.charges { width: 100%; border-collapse: collapse; margin-top: 6px; }
    table.charges th, table.charges td { border: 1px solid #cbd5e1; padding: 7px 10px; font-size: 12px; }
    table.charges th { background: #1d4ed8; color: #fff; text-align: left; }
    table.charges th:last-child, table.charges td:last-child { text-align: right; width: 130px; white-space: nowrap; }
    table.charges tr.detail td { background: #f8fafc; font-style: italic; color: #475569; }
    .summary { display: flex; margin-top: 14px; gap: 14px; }
    .words { flex: 1; font-size: 11px; font-style: italic; color: #334155; }
    .totals { width: 260px; border: 1px solid #1d4ed8; border-radius: 4px; overflow: hidden; }
    .totals .row { display: flex; justify-content: space-between; padding: 6px 12px; font-size: 12px; }
    .totals .row.bal { background: #eff6ff; font-weight: 700; color: #059669; font-size: 14px; }
    .footer { margin-top: 20px; display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #cbd5e1; padding-top: 10px; }
    .footer .thanks { color: #1d4ed8; font-weight: 700; font-size: 12px; }
    .footer .gen { color: #94a3b8; font-size: 10px; margin-top: 2px; }
    .sign { text-align: center; }
    .sign img { width: 140px; height: auto; display: block; margin: 0 auto -6px; }
    .sign .line { width: 160px; border-top: 1px solid #64748b; margin: 0 auto; }
    .sign .lbl { font-weight: 700; font-size: 11px; color: #334155; margin-top: 3px; }
  </style></head><body>
    <div class="header">
      <img class="logo" src="${logo}" alt="Roadlink" />
      <div class="brand">
        <h1>${COMPANY}</h1>
        <div class="line">${ADDRESS}</div>
        <div class="line">Contact: ${CONTACT}</div>
        <div class="msme">${MSME}</div>
      </div>
      <div class="title-block">
        <h2>INVOICE</h2>
        <div><strong>Bill No:</strong> ${bill.bill_no ?? "-"}</div>
        <div><strong>Date:</strong> ${bill.bill_date ?? "-"}</div>
      </div>
    </div>
    <div class="info">
      <div class="box">
        <h3>Customer Information</h3>
        <table>
          <tr><td>Customer Name</td><td>${bill.customer_name ?? "-"}</td></tr>
          <tr><td>Department</td><td>${bx.department ?? "-"}</td></tr>
          <tr><td>Trip Type</td><td>${tripTypeLabel(bx.trip_type)}</td></tr>
          <tr><td>Place / Destination</td><td>${bill.place ?? "-"}</td></tr>
        </table>
      </div>
      <div class="box">
        <h3>Trip Information</h3>
        <table>
          <tr><td>Date</td><td>${bill.start_date ?? "-"} → ${bill.end_date ?? "-"} (${bill.total_days ?? "-"} Day${(bill.total_days ?? 0) === 1 ? "" : "s"})</td></tr>
          <tr><td>Vehicle</td><td>${bill.vehicle_type ?? "-"}${bill.vehicle_number ? ` (${bill.vehicle_number})` : ""}</td></tr>
          <tr><td>Start Time</td><td>${time12(bill.start_time)}</td></tr>
          <tr><td>End Time</td><td>${time12(bill.end_time)}</td></tr>
          <tr><td>Total Time</td><td>${totalHoursDisplay}</td></tr>
          <tr><td>Additional Hours</td><td>${addlHours != null && addlHours > 0 ? `${addlHours} Hours` : "-"}</td></tr>
          <tr><td>Additional KM</td><td>${addlKm != null && addlKm > 0 ? `${addlKm} km` : "-"}</td></tr>
        </table>
      </div>
    </div>
    <table class="charges">
      <thead><tr><th>Description</th><th>Amount</th></tr></thead>
      <tbody>
        ${charges.length ? charges.map(([k, v]) => `<tr><td>${k}</td><td>${fmt(v)}</td></tr>`).join("") : `<tr><td>No charges</td><td>-</td></tr>`}
      </tbody>
    </table>
    <div class="summary">
      <div class="words"><strong>Amount in Words:</strong><br/>${numToWords(total)}${bill.remarks ? `<br/><br/><strong>Remarks:</strong> ${bill.remarks}` : ""}</div>
      <div class="totals">
        <div class="row"><span>Sub Total</span><span>${fmt(total)}</span></div>
        <div class="row"><span>Advance</span><span>${fmt(advance)}</span></div>
        <div class="row bal"><span>Balance</span><span>${fmt(balance)}</span></div>
      </div>
    </div>
    <div class="footer">
      <div>
        <div class="thanks">Thank you for choosing Roadlink Tours and Travels!</div>
        <div class="gen">Generated by Roadlink</div>
      </div>
      <div class="sign">
        <img src="${seal}" alt="Seal" />
        <div class="line"></div>
        <div class="lbl">Authorized Signature</div>
      </div>
    </div>
    <script>window.onload = () => { window.print(); };</script>
  </body></html>`);
  win.document.close();
};

const loadImageDataUrl = (src: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no canvas ctx"));
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = src;
  });

/**
 * Generates and downloads a PDF for the bill. Includes logo and MSME number
 * in the header. Parking / Permit / Night Halt are excluded from the print.
 */
export const downloadBillPdf = async (bill: Bill) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  const bx = bill as unknown as {
    trip_type?: string; pickup?: string; drop_location?: string;
    customer_phone?: string; customer_address?: string;
  };

  // ===== Header with larger logo =====
  const logoW = 150;
  const logoH = 84; // 16:9 ratio
  try {
    const logoData = await loadImageDataUrl(logo);
    doc.addImage(logoData, "PNG", margin, margin - 8, logoW, logoH);
  } catch { /* ignore */ }

  const textLeft = margin + logoW + 16;
  doc.setFont("helvetica", "bold").setFontSize(18).setTextColor(29, 78, 216);
  doc.text(COMPANY, textLeft, margin + 14);
  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(80, 80, 80);
  doc.text(ADDRESS, textLeft, margin + 30);
  doc.text(`Contact: ${CONTACT}`, textLeft, margin + 42);
  doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(15, 81, 50);
  doc.text(MSME, textLeft, margin + 56);

  // INVOICE label right side
  doc.setFont("helvetica", "bold").setFontSize(24).setTextColor(29, 78, 216);
  doc.text("INVOICE", pageWidth - margin, margin + 16, { align: "right" });
  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(60, 60, 60);
  doc.text(`Bill No: ${bill.bill_no ?? "-"}`, pageWidth - margin, margin + 32, { align: "right" });
  doc.text(`Date: ${bill.bill_date ?? "-"}`, pageWidth - margin, margin + 44, { align: "right" });
  doc.text(`Category: ${(bill as unknown as { bill_category?: string }).bill_category ?? "-"}`, pageWidth - margin, margin + 56, { align: "right" });

  const dividerY = margin + logoH + 4;
  doc.setDrawColor(29, 78, 216).setLineWidth(1.2);
  doc.line(margin, dividerY, pageWidth - margin, dividerY);

  // ===== Customer & Trip Info (two columns) =====
  let y = dividerY + 16;
  const colWidth = (contentWidth - 12) / 2;

  const drawInfoBox = (x: number, top: number, title: string, rows: [string, string][]) => {
    doc.setFillColor(239, 246, 255);
    doc.rect(x, top, colWidth, 16, "F");
    doc.setFont("helvetica", "bold").setFontSize(10).setTextColor(30, 64, 175);
    doc.text(title, x + 8, top + 11);
    doc.setDrawColor(210, 220, 235).setLineWidth(0.5);
    let ry = top + 22;
    doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(30, 30, 30);
    rows.forEach(([k, v]) => {
      doc.setFont("helvetica", "bold").setTextColor(80, 80, 80);
      doc.text(k, x + 8, ry);
      doc.setFont("helvetica", "normal").setTextColor(20, 20, 20);
      const lines = doc.splitTextToSize(v || "-", colWidth - 90);
      doc.text(lines, x + 90, ry);
      ry += Math.max(12, lines.length * 11);
    });
    doc.setDrawColor(210, 220, 235);
    doc.rect(x, top, colWidth, ry - top + 4);
    return ry + 4;
  };

  const customerRows: [string, string][] = [
    ["Name", bill.customer_name ?? "-"],
    ["Phone", bx.customer_phone ?? "-"],
    ["Address", bx.customer_address ?? "-"],
  ];
  const tripRows: [string, string][] = [
    ["Trip Type", tripTypeLabel(bx.trip_type)],
    ["Pickup", bx.pickup ?? "-"],
    ["Drop", bx.drop_location ?? "-"],
    ["Vehicle", `${bill.vehicle_type ?? "-"}${bill.vehicle_number ? ` (${bill.vehicle_number})` : ""}`],
    ["Dates", `${bill.start_date ?? "-"} → ${bill.end_date ?? "-"} (${bill.total_days ?? "-"} day${(bill.total_days ?? 0) === 1 ? "" : "s"})`],
  ];
  const custEnd = drawInfoBox(margin, y, "Customer Information", customerRows);
  const tripEnd = drawInfoBox(margin + colWidth + 12, y, "Trip Information", tripRows);
  y = Math.max(custEnd, tripEnd) + 10;

  // ===== Charges table =====
  const chargeRows = buildChargeRows(bill);
  const timeStr = `Time: ${bill.start_time ?? "-"} to ${bill.end_time ?? "-"}`;
  const kmStr = `Kilometer: ${bill.start_km ?? "-"} to ${bill.end_km ?? "-"} (Total: ${bill.total_km ?? "-"} km)`;
  const totalMinsPdf = bill.total_time_minutes ?? null;
  const totalTimeStr = `Total Time: ${totalMinsPdf != null ? `${Math.floor(totalMinsPdf / 60)}h ${totalMinsPdf % 60}m` : "-"}`;
  const addlHrsPdf = bill.extra_hours != null ? Number(bill.extra_hours) : null;
  const bodyRows: (string | { content: string; styles?: Record<string, unknown> })[][] = [
    [{ content: timeStr, styles: { fontStyle: "italic", textColor: [71, 85, 105], fillColor: [248, 250, 252] } },
     { content: "-", styles: { halign: "right", fillColor: [248, 250, 252] } }],
    [{ content: totalTimeStr, styles: { fontStyle: "italic", textColor: [71, 85, 105], fillColor: [248, 250, 252] } },
     { content: "-", styles: { halign: "right", fillColor: [248, 250, 252] } }],
    ...(addlHrsPdf != null && addlHrsPdf > 0 ? [[
      { content: `Additional Hours: ${addlHrsPdf} Hours`, styles: { fontStyle: "italic", textColor: [71, 85, 105], fillColor: [248, 250, 252] } },
      { content: "-", styles: { halign: "right", fillColor: [248, 250, 252] } },
    ]] : []),
    [{ content: kmStr, styles: { fontStyle: "italic", textColor: [71, 85, 105], fillColor: [248, 250, 252] } },
     { content: "-", styles: { halign: "right", fillColor: [248, 250, 252] } }],
    ...(chargeRows.length ? chargeRows.map(([k, v]) => [k, fmt(v)] as string[]) : [["No charges", "-"]]),
  ];
  autoTable(doc, {
    startY: y,
    head: [["Description", "Amount"]],
    body: bodyRows as unknown as string[][],
    theme: "grid",
    headStyles: { fillColor: [29, 78, 216], textColor: [255, 255, 255], fontStyle: "bold" },
    styles: { fontSize: 10, cellPadding: 6, overflow: "linebreak" },
    columnStyles: {
      0: { cellWidth: contentWidth - 130 },
      1: { cellWidth: 130, halign: "right" },
    },
    margin: { left: margin, right: margin },
  });

  const afterTable = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y + 40;

  // ===== Payment Summary =====
  const total = Number(bill.total_amount ?? 0);
  const advance = Number(bill.advance ?? 0);
  const balance = Number(bill.balance ?? (total - advance));
  const sumY = afterTable + 14;
  const boxW = 240;
  const boxX = pageWidth - margin - boxW;
  doc.setDrawColor(29, 78, 216).setLineWidth(0.6);
  doc.rect(boxX, sumY, boxW, 74);
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(60, 60, 60);
  doc.text("Sub Total", boxX + 12, sumY + 18);
  doc.text(fmt(total), boxX + boxW - 12, sumY + 18, { align: "right" });
  doc.text("Advance", boxX + 12, sumY + 36);
  doc.text(fmt(advance), boxX + boxW - 12, sumY + 36, { align: "right" });
  doc.setFillColor(239, 246, 255);
  doc.rect(boxX, sumY + 46, boxW, 28, "F");
  doc.setFont("helvetica", "bold").setFontSize(13).setTextColor(5, 150, 105);
  doc.text("Balance", boxX + 12, sumY + 65);
  doc.text(fmt(balance), boxX + boxW - 12, sumY + 65, { align: "right" });

  // Amount in words
  doc.setFont("helvetica", "italic").setFontSize(9).setTextColor(60, 60, 60);
  const words = numToWords(total);
  const wrapped = doc.splitTextToSize(`Amount in Words: ${words}`, contentWidth - boxW - 20);
  doc.text(wrapped, margin, sumY + 18);

  if (bill.remarks) {
    doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(80, 80, 80);
    doc.text("Remarks:", margin, sumY + 50);
    doc.setFont("helvetica", "normal").setTextColor(30, 30, 30);
    const rem = doc.splitTextToSize(bill.remarks, contentWidth - boxW - 20);
    doc.text(rem, margin, sumY + 62);
  }

  // ===== Footer with company seal =====
  const footerY = pageHeight - margin - 30;
  const sealSize = 80;
  try {
    const sealData = await loadImageDataUrl(seal);
    doc.addImage(sealData, "PNG", pageWidth - margin - sealSize - 20, footerY - sealSize - 4, sealSize, sealSize);
  } catch { /* ignore */ }
  doc.setDrawColor(200, 200, 200).setLineWidth(0.5);
  doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10);
  doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(29, 78, 216);
  doc.text("Thank you for choosing Roadlink Tours and Travels!", margin, footerY + 2);
  doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(120, 120, 120);
  doc.text("Generated by Roadlink", margin, footerY + 16);
  doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(60, 60, 60);
  doc.text("Authorized Signature", pageWidth - margin, footerY + 2, { align: "right" });
  doc.setDrawColor(120, 120, 120);
  doc.line(pageWidth - margin - 130, footerY - 4, pageWidth - margin, footerY - 4);

  doc.save(`Bill-${bill.bill_no ?? "roadlink"}.pdf`);
};
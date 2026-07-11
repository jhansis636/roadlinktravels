import type { Bill } from "@/hooks/useBills";
import logo from "@/assets/logo.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const fmt = (v: number | null | undefined) =>
  v == null || Number.isNaN(v) ? "-" : `₹${Number(v).toLocaleString("en-IN")}`;

const MSME = "UDYAM Reg. No: TN-03-0046434";
const COMPANY = "Roadlink Tours and Travels";
const ADDRESS = "Coimbatore, Tamil Nadu";
const CONTACT = "+91 82481 99154";

const tripTypeLabel = (t?: string | null) =>
  t === "half_day" ? "Half Day Rent" :
  t === "pickup_drop" ? "Pick Up & Drop" :
  "Full Day Rent";

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
const buildRows = (bill: Bill): [string, string][] => [
  ["Bill Date", bill.bill_date ?? "-"],
  ["Bill Category", (bill as unknown as { bill_category?: string }).bill_category ?? "-"],
  ["Trip Type", tripTypeLabel((bill as unknown as { trip_type?: string }).trip_type)],
  ["Customer", bill.customer_name ?? "-"],
  ["Customer Phone", (bill as unknown as { customer_phone?: string }).customer_phone ?? "-"],
  ["Customer Address", (bill as unknown as { customer_address?: string }).customer_address ?? "-"],
  ["Pickup", (bill as unknown as { pickup?: string }).pickup ?? "-"],
  ["Drop", (bill as unknown as { drop_location?: string }).drop_location ?? "-"],
  ["Place / Destination", bill.place ?? "-"],
  ["Vehicle Type", bill.vehicle_type ?? "-"],
  ["Vehicle Number", bill.vehicle_number ?? "-"],
  ["Start Date → End Date", `${bill.start_date ?? "-"} → ${bill.end_date ?? "-"}`],
  ["Total Days", bill.total_days?.toString() ?? "-"],
  ["Start Time → End Time", `${bill.start_time ?? "-"} → ${bill.end_time ?? "-"}`],
  ["Total Time (minutes)", bill.total_time_minutes?.toString() ?? "-"],
  ["Start KM → End KM", `${bill.start_km ?? "-"} → ${bill.end_km ?? "-"}`],
  ["Total KM", bill.total_km?.toString() ?? "-"],
  ["Advance", fmt(bill.advance)],
  ["Remarks", bill.remarks ?? "-"],
];

const buildChargeRows = (bill: Bill): [string, number][] => {
  const b = bill as unknown as {
    day_rent?: number | null; driver_bata?: number | null;
    extra_hours_amount?: number | null; extra_km_amount?: number | null;
    trip_type?: string | null;
  };
  const days = bill.total_days ?? 1;
  const rows: [string, number][] = [];
  if (b.day_rent) {
    const label = tripTypeLabel(b.trip_type);
    const total = b.trip_type === "pickup_drop" ? Number(b.day_rent) : Number(b.day_rent) * days;
    rows.push([`${label}${b.trip_type !== "pickup_drop" ? ` × ${days} day(s)` : ""}`, total]);
  }
  if (b.driver_bata) rows.push([`Driver Bata × ${days} day(s)`, Number(b.driver_bata) * days]);
  if (b.extra_hours_amount) rows.push(["Extra Hours", Number(b.extra_hours_amount)]);
  if (b.extra_km_amount) rows.push(["Extra Kilometer", Number(b.extra_km_amount)]);
  if (bill.parking_tollgate) rows.push(["Parking & Tollgate", Number(bill.parking_tollgate)]);
  if (bill.permit) rows.push(["Permit", Number(bill.permit)]);
  if (bill.night_halt) rows.push(["Night Halt", Number(bill.night_halt)]);
  return rows;
};

/**
 * Opens a browser print dialog with a clean printable invoice for the given
 * bill. The header includes the website logo and MSME UDYAM number.
 */
export const printBill = (bill: Bill) => {
  const win = window.open("", "_blank", "width=900,height=1000");
  if (!win) return;
  const rows = buildRows(bill);

  win.document.write(`<!doctype html><html><head><title>Bill ${bill.bill_no ?? ""}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #0f172a; padding: 32px; }
    .header { display: flex; align-items: center; gap: 16px; border-bottom: 2px solid #1d4ed8; padding-bottom: 12px; margin-bottom: 16px; }
    .header img { width: 80px; height: 80px; object-fit: contain; }
    .brand h1 { margin: 0 0 2px; color: #1d4ed8; font-size: 22px; }
    .brand .msme { font-weight: 700; color: #0f5132; font-size: 13px; margin-top: 2px; }
    .sub { color: #64748b; margin-bottom: 24px; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
    th { background: #eff6ff; color: #1e40af; }
    .total { margin-top: 24px; text-align: right; font-size: 16px; font-weight: 600; color: #0f172a; }
    .balance { text-align: right; font-size: 14px; color: #059669; }
    @media print { body { padding: 16px; } }
  </style></head><body>
    <div class="header">
      <img src="${logo}" alt="Roadlink" />
      <div class="brand">
        <h1>${COMPANY}</h1>
        <div class="sub" style="margin:0">${CONTACT}</div>
        <div class="msme">${MSME}</div>
      </div>
    </div>
    <div class="meta">
      <div><strong>Bill No:</strong> ${bill.bill_no ?? "-"}</div>
      <div><strong>Date:</strong> ${bill.bill_date ?? "-"}</div>
    </div>
    <table>
      <tbody>
        ${rows.map(([k, v]) => `<tr><th style="width:40%">${k}</th><td>${v}</td></tr>`).join("")}
      </tbody>
    </table>
    <div class="total">Total: ${fmt(bill.total_amount)}</div>
    <div class="balance">Balance: ${fmt(bill.balance)}</div>
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
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;

  // Header: logo + company block, all sized to fit inside the page margins.
  const logoSize = 48;
  const headerTop = margin;
  const textLeft = margin + logoSize + 14;

  try {
    const logoData = await loadImageDataUrl(logo);
    doc.addImage(logoData, "PNG", margin, headerTop, logoSize, logoSize);
  } catch {
    // logo failed — continue without it
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(29, 78, 216);
  doc.text(COMPANY, textLeft, headerTop + 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(CONTACT, textLeft, headerTop + 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 81, 50);
  doc.text(MSME, textLeft, headerTop + 44);

  const headerBottom = headerTop + logoSize + 8;
  doc.setDrawColor(29, 78, 216);
  doc.setLineWidth(1.5);
  doc.line(margin, headerBottom, pageWidth - margin, headerBottom);

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`Bill No: ${bill.bill_no ?? "-"}`, margin, headerBottom + 18);
  doc.text(`Date: ${bill.bill_date ?? "-"}`, pageWidth - margin, headerBottom + 18, { align: "right" });

  const tableStart = headerBottom + 28;
  autoTable(doc, {
    startY: tableStart,
    head: [["Field", "Value"]],
    body: buildRows(bill),
    theme: "striped",
    headStyles: { fillColor: [239, 246, 255], textColor: [30, 64, 175] },
    styles: { fontSize: 9, cellPadding: 5, overflow: "linebreak" },
    columnStyles: {
      0: { cellWidth: 170, fontStyle: "bold" },
      1: { cellWidth: pageWidth - margin * 2 - 170 },
    },
    margin: { left: margin, right: margin },
  });

  const finalY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? tableStart + 40;
  const totalsBase = Math.min(finalY + 20, pageHeight - margin - 60);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`Total: ${fmt(bill.total_amount)}`, pageWidth - margin, totalsBase, { align: "right" });
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(10);
  doc.text(`Advance: ${fmt(bill.advance)}`, pageWidth - margin, totalsBase + 16, { align: "right" });
  doc.setTextColor(5, 150, 105);
  doc.setFont("helvetica", "bold");
  doc.text(`Balance: ${fmt(bill.balance)}`, pageWidth - margin, totalsBase + 32, { align: "right" });

  doc.save(`Bill-${bill.bill_no ?? "roadlink"}.pdf`);
};
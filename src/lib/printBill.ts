import type { Bill } from "@/hooks/useBills";
import logo from "@/assets/logo.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const fmt = (v: number | null | undefined) =>
  v == null || Number.isNaN(v) ? "-" : `₹${Number(v).toLocaleString("en-IN")}`;

const MSME = "UDYAM Reg. No: TN-03-0046434";
const COMPANY = "Roadlink Tours and Travels";
const CONTACT = "Coimbatore, Tamil Nadu · +91 82481 99154";

// Rows shown on the printed/PDF invoice. Parking & Tollgate, Permit and
// Night Halt are intentionally excluded from the printout (still saved in DB).
const buildRows = (bill: Bill): [string, string][] => [
  ["Bill Date", bill.bill_date ?? "-"],
  ["Customer", bill.customer_name ?? "-"],
  ["Place / Destination", bill.place ?? "-"],
  ["Vehicle Type", bill.vehicle_type ?? "-"],
  ["Vehicle Number", bill.vehicle_number ?? "-"],
  ["Start Date → End Date", `${bill.start_date ?? "-"} → ${bill.end_date ?? "-"}`],
  ["Total Days", bill.total_days?.toString() ?? "-"],
  ["Start Time → End Time", `${bill.start_time ?? "-"} → ${bill.end_time ?? "-"}`],
  ["Total Time (minutes)", bill.total_time_minutes?.toString() ?? "-"],
  ["Extra Hours", bill.extra_hours_enabled ? (bill.extra_hours ?? "-").toString() : "-"],
  ["Start KM → End KM", `${bill.start_km ?? "-"} → ${bill.end_km ?? "-"}`],
  ["Total KM", bill.total_km?.toString() ?? "-"],
  ["Per KM Rate", fmt(bill.per_km_rate)],
  ["Extra KM", bill.extra_km?.toString() ?? "-"],
  ["Advance", fmt(bill.advance)],
  ["Remarks", bill.remarks ?? "-"],
];

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
  const margin = 40;

  try {
    const logoData = await loadImageDataUrl(logo);
    doc.addImage(logoData, "PNG", margin, 30, 60, 60);
  } catch {
    // logo failed — continue without it
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(29, 78, 216);
  doc.text(COMPANY, margin + 75, 55);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(CONTACT, margin + 75, 72);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 81, 50);
  doc.text(MSME, margin + 75, 88);

  doc.setDrawColor(29, 78, 216);
  doc.setLineWidth(1.5);
  doc.line(margin, 100, pageWidth - margin, 100);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.text(`Bill No: ${bill.bill_no ?? "-"}`, margin, 120);
  doc.text(`Date: ${bill.bill_date ?? "-"}`, pageWidth - margin, 120, { align: "right" });

  autoTable(doc, {
    startY: 135,
    head: [["Field", "Value"]],
    body: buildRows(bill),
    theme: "striped",
    headStyles: { fillColor: [239, 246, 255], textColor: [30, 64, 175] },
    styles: { fontSize: 10, cellPadding: 6 },
    columnStyles: { 0: { cellWidth: 180, fontStyle: "bold" } },
    margin: { left: margin, right: margin },
  });

  const finalY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 200;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`Total: ${fmt(bill.total_amount)}`, pageWidth - margin, finalY + 24, { align: "right" });
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(11);
  doc.text(`Balance: ${fmt(bill.balance)}`, pageWidth - margin, finalY + 42, { align: "right" });

  doc.save(`Bill-${bill.bill_no ?? "roadlink"}.pdf`);
};
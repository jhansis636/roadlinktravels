import type { DriverBill } from "@/hooks/useDriverBills";
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

const buildChargeRows = (bill: DriverBill): [string, number][] => {
  const rows: [string, number][] = [];
  const add = (label: string, v: number | null | undefined) => {
    if (v != null && Number(v) !== 0) rows.push([label, Number(v)]);
  };
  add("Trip Amount", bill.trip_amount);
  add("Day Rent", bill.day_rent);
  add("Driver Bata", bill.driver_bata);
  add("Night Halt", bill.night_halt);
  add("Parking", bill.parking);
  add("Tollgate", bill.tollgate);
  add("Permit", bill.permit);
  if (bill.extra_hours_amount) rows.push([`Extra Hours${bill.extra_hours ? ` (${bill.extra_hours} hrs)` : ""}`, Number(bill.extra_hours_amount)]);
  if (bill.extra_km_amount) rows.push([`Extra KM${bill.extra_km ? ` (${bill.extra_km} km)` : ""}`, Number(bill.extra_km_amount)]);
  add("Other Charges", bill.other_charges);
  return rows;
};

export const printDriverBill = (bill: DriverBill) => {
  const win = window.open("", "_blank", "width=900,height=1000");
  if (!win) return;
  const rows: [string, string][] = [
    ["Bill Date", bill.bill_date ?? "-"],
    ["Bill Category", bill.bill_category ?? "-"],
    ["Trip Type", tripTypeLabel(bill.trip_type)],
    ["Customer", bill.customer_name ?? "-"],
    ["Driver", bill.driver_name ?? "-"],
    ["Pickup", bill.pickup ?? "-"],
    ["Drop", bill.drop_location ?? "-"],
    ["Place", bill.place ?? "-"],
    ["Vehicle Type", bill.vehicle_type ?? "-"],
    ["Vehicle Number", bill.vehicle_number ?? "-"],
    ["Start Date → End Date", `${bill.start_date ?? "-"} → ${bill.end_date ?? "-"}`],
    ["Total Days", bill.total_days?.toString() ?? "-"],
    ["Start Time → End Time", `${bill.start_time ?? "-"} → ${bill.end_time ?? "-"}`],
    ["Start KM → End KM", `${bill.start_km ?? "-"} → ${bill.end_km ?? "-"}`],
    ["Total KM", bill.total_km?.toString() ?? "-"],
    ["Advance", fmt(bill.advance)],
    ["Remarks", bill.remarks ?? "-"],
  ];
  const charges = buildChargeRows(bill);

  win.document.write(`<!doctype html><html><head><title>Driver Bill ${bill.bill_no}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #0f172a; padding: 32px; }
    .header { display: flex; align-items: center; gap: 16px; border-bottom: 2px solid #b45309; padding-bottom: 12px; margin-bottom: 16px; }
    .header img { width: 80px; height: 80px; object-fit: contain; }
    .brand h1 { margin: 0 0 2px; color: #b45309; font-size: 22px; }
    .brand .msme { font-weight: 700; color: #0f5132; font-size: 13px; margin-top: 2px; }
    .label { color: #b45309; font-weight: 800; font-size: 18px; letter-spacing: 2px; }
    .meta { display: flex; justify-content: space-between; margin: 12px 0 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
    th { background: #fef3c7; color: #92400e; }
    .total { margin-top: 20px; text-align: right; font-size: 16px; font-weight: 700; color: #0f172a; }
    .balance { text-align: right; font-size: 14px; color: #059669; }
    @media print { body { padding: 16px; } }
  </style></head><body>
    <div class="header">
      <img src="${logo}" alt="Roadlink" />
      <div class="brand">
        <h1>${COMPANY}</h1>
        <div style="color:#64748b">${CONTACT}</div>
        <div class="msme">${MSME}</div>
      </div>
    </div>
    <div class="label">DRIVER BILL</div>
    <div class="meta">
      <div><strong>Bill No:</strong> ${bill.bill_no}</div>
      <div><strong>Date:</strong> ${bill.bill_date}</div>
    </div>
    <table><tbody>
      ${rows.map(([k, v]) => `<tr><th style="width:40%">${k}</th><td>${v}</td></tr>`).join("")}
    </tbody></table>
    <h3 style="margin-top:20px;color:#b45309">Charges</h3>
    <table>
      <thead><tr><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
      <tbody>
        ${charges.length ? charges.map(([k, v]) => `<tr><td>${k}</td><td style="text-align:right">${fmt(v)}</td></tr>`).join("") : `<tr><td colspan="2">No charges</td></tr>`}
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

export const downloadDriverBillPdf = async (bill: DriverBill) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  const logoSize = 56;
  try {
    const logoData = await loadImageDataUrl(logo);
    doc.addImage(logoData, "PNG", margin, margin, logoSize, logoSize);
  } catch { /* ignore */ }

  const textLeft = margin + logoSize + 14;
  doc.setFont("helvetica", "bold").setFontSize(17).setTextColor(180, 83, 9);
  doc.text(COMPANY, textLeft, margin + 18);
  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(80, 80, 80);
  doc.text(ADDRESS, textLeft, margin + 32);
  doc.text(`Contact: ${CONTACT}`, textLeft, margin + 44);
  doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(15, 81, 50);
  doc.text(MSME, textLeft, margin + 56);

  doc.setFont("helvetica", "bold").setFontSize(22).setTextColor(180, 83, 9);
  doc.text("DRIVER BILL", pageWidth - margin, margin + 20, { align: "right" });
  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(60, 60, 60);
  doc.text(`Bill No: ${bill.bill_no}`, pageWidth - margin, margin + 36, { align: "right" });
  doc.text(`Date: ${bill.bill_date}`, pageWidth - margin, margin + 48, { align: "right" });
  doc.text(`Category: ${bill.bill_category ?? "-"}`, pageWidth - margin, margin + 60, { align: "right" });

  const dividerY = margin + logoSize + 14;
  doc.setDrawColor(180, 83, 9).setLineWidth(1.2);
  doc.line(margin, dividerY, pageWidth - margin, dividerY);

  let y = dividerY + 18;
  const colWidth = (contentWidth - 12) / 2;

  const drawInfoBox = (x: number, top: number, title: string, rows: [string, string][]) => {
    doc.setFillColor(254, 243, 199);
    doc.rect(x, top, colWidth, 16, "F");
    doc.setFont("helvetica", "bold").setFontSize(10).setTextColor(146, 64, 14);
    doc.text(title, x + 8, top + 11);
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

  const partiesRows: [string, string][] = [
    ["Customer", bill.customer_name ?? "-"],
    ["Driver", bill.driver_name ?? "-"],
    ["Phone", bill.customer_phone ?? "-"],
    ["Address", bill.customer_address ?? "-"],
  ];
  const tripRows: [string, string][] = [
    ["Trip Type", tripTypeLabel(bill.trip_type)],
    ["Pickup", bill.pickup ?? "-"],
    ["Drop", bill.drop_location ?? "-"],
    ["Vehicle", `${bill.vehicle_type ?? "-"}${bill.vehicle_number ? ` (${bill.vehicle_number})` : ""}`],
    ["Dates", `${bill.start_date ?? "-"} → ${bill.end_date ?? "-"} (${bill.total_days ?? "-"} day${(bill.total_days ?? 0) === 1 ? "" : "s"})`],
    ["Time", `${bill.start_time ?? "-"} → ${bill.end_time ?? "-"}`],
    ["Kilometer", `${bill.start_km ?? "-"} → ${bill.end_km ?? "-"} (Total: ${bill.total_km ?? "-"})`],
  ];
  const custEnd = drawInfoBox(margin, y, "Parties", partiesRows);
  const tripEnd = drawInfoBox(margin + colWidth + 12, y, "Trip Information", tripRows);
  y = Math.max(custEnd, tripEnd) + 10;

  const chargeRows = buildChargeRows(bill);
  autoTable(doc, {
    startY: y,
    head: [["Description", "Amount (INR)"]],
    body: chargeRows.length ? chargeRows.map(([k, v]) => [k, fmt(v)]) : [["No charges", "-"]],
    theme: "grid",
    headStyles: { fillColor: [180, 83, 9], textColor: [255, 255, 255], fontStyle: "bold" },
    styles: { fontSize: 10, cellPadding: 6 },
    columnStyles: {
      0: { cellWidth: contentWidth - 140 },
      1: { cellWidth: 140, halign: "right" },
    },
    margin: { left: margin, right: margin },
  });

  const afterTable = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y + 40;

  const total = Number(bill.total_amount ?? 0);
  const advance = Number(bill.advance ?? 0);
  const balance = Number(bill.balance ?? (total - advance));
  const sumY = afterTable + 14;
  const boxW = 220;
  const boxX = pageWidth - margin - boxW;
  doc.setDrawColor(180, 83, 9).setLineWidth(0.6);
  doc.rect(boxX, sumY, boxW, 68);
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(60, 60, 60);
  doc.text("Sub Total", boxX + 10, sumY + 16);
  doc.text(fmt(total), boxX + boxW - 10, sumY + 16, { align: "right" });
  doc.text("Advance", boxX + 10, sumY + 32);
  doc.text(fmt(advance), boxX + boxW - 10, sumY + 32, { align: "right" });
  doc.setFillColor(254, 243, 199);
  doc.rect(boxX, sumY + 42, boxW, 26, "F");
  doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(5, 150, 105);
  doc.text("Balance", boxX + 10, sumY + 60);
  doc.text(fmt(balance), boxX + boxW - 10, sumY + 60, { align: "right" });

  doc.setFont("helvetica", "italic").setFontSize(9).setTextColor(60, 60, 60);
  const words = numToWords(total);
  const wrapped = doc.splitTextToSize(`Amount in Words: ${words}`, contentWidth - boxW - 20);
  doc.text(wrapped, margin, sumY + 16);

  if (bill.remarks) {
    doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(80, 80, 80);
    doc.text("Remarks:", margin, sumY + 46);
    doc.setFont("helvetica", "normal").setTextColor(30, 30, 30);
    const rem = doc.splitTextToSize(bill.remarks, contentWidth - boxW - 20);
    doc.text(rem, margin, sumY + 58);
  }

  const footerY = pageHeight - margin - 30;
  doc.setDrawColor(200, 200, 200).setLineWidth(0.5);
  doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10);
  doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(180, 83, 9);
  doc.text("Driver Payment Slip — Roadlink Tours and Travels", margin, footerY + 2);
  doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(120, 120, 120);
  doc.text("Generated by Roadlink", margin, footerY + 16);
  doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(60, 60, 60);
  doc.text("Authorized Signature", pageWidth - margin, footerY + 2, { align: "right" });
  doc.setDrawColor(120, 120, 120);
  doc.line(pageWidth - margin - 120, footerY - 4, pageWidth - margin, footerY - 4);

  doc.save(`DriverBill-${bill.bill_no}.pdf`);
};
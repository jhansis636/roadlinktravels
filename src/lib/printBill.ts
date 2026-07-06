import type { Bill } from "@/hooks/useBills";

const fmt = (v: number | null | undefined) =>
  v == null || Number.isNaN(v) ? "-" : `₹${Number(v).toLocaleString("en-IN")}`;

/**
 * Opens a browser print dialog with a clean printable invoice for the given
 * bill. PDF is intentionally not generated here — the user prints from the
 * browser dialog.
 */
export const printBill = (bill: Bill) => {
  const win = window.open("", "_blank", "width=900,height=1000");
  if (!win) return;

  const rows = [
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
    ["Parking & Tollgate", fmt(bill.parking_tollgate)],
    ["Permit", fmt(bill.permit)],
    ["Night Halt", fmt(bill.night_halt)],
    ["Extra KM", bill.extra_km?.toString() ?? "-"],
    ["Advance", fmt(bill.advance)],
    ["Remarks", bill.remarks ?? "-"],
  ];

  win.document.write(`<!doctype html><html><head><title>Bill ${bill.bill_no ?? ""}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #0f172a; padding: 32px; }
    h1 { margin: 0 0 4px; color: #1d4ed8; }
    .sub { color: #64748b; margin-bottom: 24px; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
    th { background: #eff6ff; color: #1e40af; }
    .total { margin-top: 24px; text-align: right; font-size: 16px; font-weight: 600; color: #0f172a; }
    .balance { text-align: right; font-size: 14px; color: #059669; }
    @media print { body { padding: 16px; } }
  </style></head><body>
    <h1>Roadlink Tours and Travels</h1>
    <div class="sub">Coimbatore, Tamil Nadu · +91 82481 99154</div>
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
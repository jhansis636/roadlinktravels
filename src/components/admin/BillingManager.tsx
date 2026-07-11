import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Plus, Minus, Loader2, Save, Eraser, Printer,
  Pencil, Trash2, Eye, Search, RotateCcw, Download,
} from "lucide-react";
import { useBills, useSaveBill, useDeleteBill, type Bill } from "@/hooks/useBills";
import { useVehicleTariffs } from "@/hooks/useVehicleTariffs";
import { useCustomers } from "@/hooks/useCustomers";
import { printBill, downloadBillPdf } from "@/lib/printBill";
import { toast } from "@/hooks/use-toast";

// ---------- helpers ----------

const todayISO = () => new Date().toISOString().slice(0, 10);

const num = (v: string): number | null => {
  if (v === "" || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const timeToMinutes = (t: string): number | null => {
  if (!t) return null;
  const [h, m] = t.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
};

const formatDuration = (mins: number | null) => {
  if (mins == null) return "";
  const sign = mins < 0 ? "-" : "";
  const abs = Math.abs(mins);
  return `${sign}${Math.floor(abs / 60)}h ${abs % 60}m`;
};

const diffDays = (a: string, b: string): number | null => {
  if (!a || !b) return null;
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  if (Number.isNaN(da) || Number.isNaN(db)) return null;
  return Math.max(1, Math.round((db - da) / 86400000) + 1);
};

// ---------- 12-hour time picker ----------
// Stores value as "HH:MM" 24-hour string (matches HTML <input type="time">).
const to12h = (v: string): { h: string; m: string; p: "AM" | "PM" } => {
  if (!v) return { h: "", m: "", p: "AM" };
  const [hh, mm] = v.split(":").map(Number);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return { h: "", m: "", p: "AM" };
  const p: "AM" | "PM" = hh >= 12 ? "PM" : "AM";
  const h12 = ((hh + 11) % 12) + 1;
  return { h: String(h12).padStart(2, "0"), m: String(mm).padStart(2, "0"), p };
};
const from12h = (h: string, m: string, p: "AM" | "PM"): string => {
  if (!h || !m) return "";
  let hh = Number(h) % 12;
  if (p === "PM") hh += 12;
  return `${String(hh).padStart(2, "0")}:${m}`;
};

const Time12Input = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const { h, m, p } = to12h(value);
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const mins = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));
  const update = (nh: string, nm: string, np: "AM" | "PM") => onChange(from12h(nh, nm, np));
  return (
    <div className="flex gap-1">
      <Select value={h} onValueChange={(v) => update(v, m || "00", p)}>
        <SelectTrigger className="w-[70px]"><SelectValue placeholder="HH" /></SelectTrigger>
        <SelectContent>{hours.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={m} onValueChange={(v) => update(h || "12", v, p)}>
        <SelectTrigger className="w-[70px]"><SelectValue placeholder="MM" /></SelectTrigger>
        <SelectContent>{mins.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={p} onValueChange={(v) => update(h || "12", m || "00", v as "AM" | "PM")}>
        <SelectTrigger className="w-[70px]"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

// ---------- amount → words (Indian numbering) ----------
const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const twoDigit = (n: number): string => (n < 20 ? ones[n] : `${tens[Math.floor(n / 10)]}${n % 10 ? " " + ones[n % 10] : ""}`);
const threeDigit = (n: number): string => {
  const h = Math.floor(n / 100), r = n % 100;
  return `${h ? ones[h] + " Hundred" + (r ? " " : "") : ""}${r ? twoDigit(r) : ""}`;
};
const amountToWords = (amt: number): string => {
  if (!Number.isFinite(amt)) return "";
  const n = Math.round(amt);
  if (n === 0) return "Zero Rupees Only";
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  const parts = [
    crore ? `${twoDigit(crore)} Crore` : "",
    lakh ? `${twoDigit(lakh)} Lakh` : "",
    thousand ? `${twoDigit(thousand)} Thousand` : "",
    rest ? threeDigit(rest) : "",
  ].filter(Boolean);
  return `${parts.join(" ")} Rupees Only`;
};

// ---------- CSV export ----------
const csvEscape = (v: unknown): string => {
  if (v == null) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const exportBillsCsv = (rows: Bill[]) => {
  const headers = [
    "Bill No", "Date", "Category", "Trip Type", "Customer", "Phone", "Pickup", "Drop", "Place",
    "Vehicle Type", "Vehicle Number",
    "Start Date", "End Date", "Total Days",
    "Start Time", "End Time", "Total Minutes",
    "Extra Hours", "Extra Hours Amount",
    "Start KM", "End KM", "Total KM", "Per KM Rate",
    "Extra KM", "Extra KM Amount",
    "Day Rent", "Driver Bata",
    "Parking/Tollgate", "Permit", "Night Halt",
    "Advance", "Total Amount", "Balance", "Status", "Remarks",
  ];
  const body = rows.map((b) => {
    const bx = b as unknown as {
      bill_category?: string | null; trip_type?: string | null;
      customer_phone?: string | null; pickup?: string | null; drop_location?: string | null;
      day_rent?: number | null; driver_bata?: number | null;
      extra_hours_amount?: number | null; extra_km_amount?: number | null;
    };
    return [
      b.bill_no, b.bill_date, bx.bill_category ?? "", bx.trip_type ?? "",
      b.customer_name, bx.customer_phone ?? "", bx.pickup ?? "", bx.drop_location ?? "", b.place ?? "",
      b.vehicle_type ?? "", b.vehicle_number ?? "",
      b.start_date ?? "", b.end_date ?? "", b.total_days ?? "",
      b.start_time ?? "", b.end_time ?? "", b.total_time_minutes ?? "",
      b.extra_hours ?? "", bx.extra_hours_amount ?? "",
      b.start_km ?? "", b.end_km ?? "", b.total_km ?? "", b.per_km_rate ?? "",
      b.extra_km ?? "", bx.extra_km_amount ?? "",
      bx.day_rent ?? "", bx.driver_bata ?? "",
      b.parking_tollgate ?? "", b.permit ?? "", b.night_halt ?? "",
      b.advance ?? "", b.total_amount ?? "", b.balance ?? "", b.status ?? "", b.remarks ?? "",
    ].map(csvEscape).join(",");
  });
  const csv = [headers.map(csvEscape).join(","), ...body].join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bills-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// ---------- form state ----------

interface FormState {
  id?: string;
  bill_category: string;
  trip_type: "half_day" | "full_day" | "pickup_drop";
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  pickup: string;
  drop: string;
  place: string;
  bill_date: string;
  vehicle_type: string;
  vehicle_number: string;
  start_time: string;
  end_time: string;
  extra_hours_enabled: boolean;
  extra_hours: string;
  extra_hours_amount: string;
  extra_km_enabled: boolean;
  start_km: string;
  end_km: string;
  start_date: string;
  end_date: string;
  day_rent: string;
  driver_bata: string;
  parking_tollgate: string;
  permit: string;
  night_halt: string;
  extra_km: string;
  extra_km_amount: string;
  advance: string;
  remarks: string;
  total_amount_override: string; // manual override; empty = auto
}

const emptyForm = (): FormState => ({
  bill_category: "",
  trip_type: "full_day",
  customer_name: "",
  customer_phone: "",
  customer_address: "",
  pickup: "",
  drop: "",
  place: "",
  bill_date: todayISO(),
  vehicle_type: "",
  vehicle_number: "",
  start_time: "",
  end_time: "",
  extra_hours_enabled: false,
  extra_hours: "",
  extra_hours_amount: "",
  extra_km_enabled: false,
  start_km: "",
  end_km: "",
  start_date: todayISO(),
  end_date: todayISO(),
  day_rent: "",
  driver_bata: "",
  parking_tollgate: "",
  permit: "",
  night_halt: "",
  extra_km: "",
  extra_km_amount: "",
  advance: "",
  remarks: "",
  total_amount_override: "",
});

const billToForm = (b: Bill): FormState => ({
  id: b.id,
  bill_category: (b as unknown as { bill_category?: string | null }).bill_category ?? "",
  trip_type: ((): FormState["trip_type"] => {
    const t = (b as unknown as { trip_type?: string | null }).trip_type;
    if (t === "half_day" || t === "full_day" || t === "pickup_drop") return t;
    return "full_day";
  })(),
  customer_name: b.customer_name,
  customer_phone: (b as unknown as { customer_phone?: string | null }).customer_phone ?? "",
  customer_address: (b as unknown as { customer_address?: string | null }).customer_address ?? "",
  pickup: (b as unknown as { pickup?: string | null }).pickup ?? "",
  drop: (b as unknown as { drop_location?: string | null }).drop_location ?? "",
  place: b.place ?? "",
  bill_date: b.bill_date ?? todayISO(),
  vehicle_type: b.vehicle_type ?? "",
  vehicle_number: b.vehicle_number ?? "",
  start_time: b.start_time ?? "",
  end_time: b.end_time ?? "",
  extra_hours_enabled: (b.extra_hours_enabled ?? false) || b.extra_hours != null,
  extra_hours: b.extra_hours?.toString() ?? "",
  extra_hours_amount: (b as unknown as { extra_hours_amount?: number | null }).extra_hours_amount?.toString() ?? "",
  extra_km_enabled: b.extra_km != null,
  start_km: b.start_km?.toString() ?? "",
  end_km: b.end_km?.toString() ?? "",
  start_date: b.start_date ?? todayISO(),
  end_date: b.end_date ?? todayISO(),
  day_rent: (b as unknown as { day_rent?: number | null }).day_rent?.toString() ?? "",
  driver_bata: (b as unknown as { driver_bata?: number | null }).driver_bata?.toString() ?? "",
  parking_tollgate: b.parking_tollgate?.toString() ?? "",
  permit: b.permit?.toString() ?? "",
  night_halt: b.night_halt?.toString() ?? "",
  extra_km: b.extra_km?.toString() ?? "",
  extra_km_amount: (b as unknown as { extra_km_amount?: number | null }).extra_km_amount?.toString() ?? "",
  advance: b.advance?.toString() ?? "",
  remarks: b.remarks ?? "",
  total_amount_override: b.total_amount != null ? String(b.total_amount) : "",
});

// ---------- component ----------

const BillingManager = () => {
  const { data: bills, isLoading } = useBills();
  const saveBill = useSaveBill();
  const deleteBill = useDeleteBill();
  const { data: tariffs } = useVehicleTariffs();
  const { data: customers } = useCustomers();

  const vehicles = useMemo(
    () =>
      (tariffs ?? []).map((t) => ({
        value: t.vehicle_type,
        label: t.vehicle_type,
        perKmRate: t.per_km_rate != null ? Number(t.per_km_rate) : undefined,
        perDayRate: t.day_rent != null ? Number(t.day_rent) : undefined,
        halfDayRate: t.half_day_rate != null ? Number(t.half_day_rate) : undefined,
        pickupDropRate: t.pickup_drop_rate != null ? Number(t.pickup_drop_rate) : undefined,
        perHourRate: t.per_hour_rate != null ? Number(t.per_hour_rate) : undefined,
        driverBataPerDay: t.driver_bata != null ? Number(t.driver_bata) : undefined,
      })),
    [tariffs],
  );
  const getVehicleByName = (name: string) => vehicles.find((v) => v.value === name);
  const [form, setForm] = useState<FormState>(emptyForm());

  // derived values
  const selectedVehicle = form.vehicle_type ? getVehicleByName(form.vehicle_type) : undefined;
  const perKmRate = selectedVehicle?.perKmRate;
  const perDayRate = selectedVehicle?.perDayRate;
  const halfDayRate = selectedVehicle?.halfDayRate;
  const pickupDropRate = selectedVehicle?.pickupDropRate;
  const perHourRate = selectedVehicle?.perHourRate;
  const driverBataPerDay = selectedVehicle?.driverBataPerDay;

  // Per-trip-type base rate used to auto-populate Day Rent field
  const tripBaseRate =
    form.trip_type === "half_day" ? halfDayRate :
    form.trip_type === "pickup_drop" ? pickupDropRate :
    perDayRate;

  const totalMinutes = useMemo(() => {
    const s = timeToMinutes(form.start_time);
    const e = timeToMinutes(form.end_time);
    if (s == null || e == null) return null;
    const diff = e - s;
    return diff < 0 ? diff + 24 * 60 : diff;
  }, [form.start_time, form.end_time]);

  const totalKm = useMemo(() => {
    const s = num(form.start_km);
    const e = num(form.end_km);
    if (s == null || e == null) return null;
    return Math.max(0, e - s);
  }, [form.start_km, form.end_km]);

  const kmCharge = useMemo(() => {
    if (totalKm == null || perKmRate == null) return null;
    return totalKm * perKmRate;
  }, [totalKm, perKmRate]);

  const totalDays = useMemo(
    () => diffDays(form.start_date, form.end_date),
    [form.start_date, form.end_date],
  );

  // Auto-populate Day Rent + Driver Bata from selected vehicle and trip type.
  // Admin can still overwrite; changing either resets to the tariff value.
  useEffect(() => {
    setForm((f) => ({
      ...f,
      day_rent: tripBaseRate != null ? String(tripBaseRate) : "",
      driver_bata: driverBataPerDay != null ? String(driverBataPerDay) : "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.vehicle_type, form.trip_type]);

  // Live Total Amount. Trip-type driven: uses tariff base rate for the chosen
  // trip type. Extra Hours and Extra KM are fully manual amounts.
  const calc = useMemo(() => {
    const days = totalDays ?? 1;
    const rentValue = num(form.day_rent) ?? tripBaseRate ?? 0;
    // Pickup & Drop is a fixed one-way charge; others multiply by days.
    const rentCharge = form.trip_type === "pickup_drop" ? rentValue : rentValue * days;
    const bata = (num(form.driver_bata) ?? 0) * days;
    const extraHoursCharge = form.extra_hours_enabled ? (num(form.extra_hours_amount) ?? 0) : 0;
    const extraKmCharge = form.extra_km_enabled ? (num(form.extra_km_amount) ?? 0) : 0;
    const parking = num(form.parking_tollgate) ?? 0;
    const permit = num(form.permit) ?? 0;
    const nightHalt = num(form.night_halt) ?? 0;
    const total = Math.round(
      rentCharge + bata + extraKmCharge + extraHoursCharge + parking + permit + nightHalt,
    );
    const advance = num(form.advance) ?? 0;
    return { total, advance };
  }, [
    totalDays, tripBaseRate, form.trip_type,
    form.day_rent, form.driver_bata,
    form.extra_hours_enabled, form.extra_hours_amount,
    form.extra_km_enabled, form.extra_km_amount,
    form.parking_tollgate, form.permit, form.night_halt, form.advance,
  ]);

  // Manual override: use the override value when it's a valid number, else auto.
  const overrideNum = num(form.total_amount_override);
  const totalAmount = overrideNum != null ? overrideNum : calc.total;
  const balance = Math.max(0, totalAmount - calc.advance);
  const amountWords = useMemo(() => (totalAmount > 0 ? amountToWords(totalAmount) : ""), [totalAmount]);

  // When trip/tariff inputs change, clear the manual override so auto-recalc kicks in.
  useEffect(() => {
    setForm((f) => ({ ...f, total_amount_override: "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.vehicle_type, form.trip_type,
    form.start_date, form.end_date, form.start_time, form.end_time,
    form.day_rent, form.driver_bata,
    form.extra_hours_enabled, form.extra_hours_amount,
    form.extra_km_enabled, form.extra_km_amount,
    form.parking_tollgate, form.permit, form.night_halt,
  ]);

  // filters + search
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterVehicle, setFilterVehicle] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterTripType, setFilterTripType] = useState("");
  const [search, setSearch] = useState("");
  // Default view = current calendar month. "All" clears this.
  const [showAll, setShowAll] = useState(false);

  const anyFilterActive =
    !!fromDate || !!toDate || !!filterCustomer || !!filterVehicle ||
    !!filterCategory || !!filterTripType || !!search.trim();

  const monthBounds = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);
    return { start, end };
  }, []);

  const filteredBills = useMemo(() => {
    if (!bills) return [];
    const q = search.trim().toLowerCase();
    const applyMonth = !showAll && !anyFilterActive;
    return bills.filter((b) => {
      if (applyMonth) {
        const d = b.bill_date ?? "";
        if (d < monthBounds.start || d > monthBounds.end) return false;
      }
      if (fromDate && (b.bill_date ?? "") < fromDate) return false;
      if (toDate && (b.bill_date ?? "") > toDate) return false;
      if (filterCustomer && b.customer_name !== filterCustomer) return false;
      if (filterVehicle && b.vehicle_type !== filterVehicle) return false;
      const bCat = (b as unknown as { bill_category?: string | null }).bill_category ?? "";
      const bTrip = (b as unknown as { trip_type?: string | null }).trip_type ?? "";
      if (filterCategory && bCat !== filterCategory) return false;
      if (filterTripType && bTrip !== filterTripType) return false;
      if (q) {
        const hay = [
          b.customer_name, b.vehicle_number, b.place, b.bill_no, bCat, bTrip,
        ].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [bills, fromDate, toDate, filterCustomer, filterVehicle, filterCategory, filterTripType, search, showAll, anyFilterActive, monthBounds]);

  const [viewBill, setViewBill] = useState<Bill | null>(null);

  const resetForm = () => setForm(emptyForm());

  const startEdit = (b: Bill) => {
    setForm(billToForm(b));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async () => {
    if (!form.bill_category) {
      toast({ title: "Bill Category required", description: "Choose Official, Personal, or Other.", variant: "destructive" });
      return;
    }
    if (!form.customer_name.trim()) {
      toast({ title: "Customer required", description: "Enter a customer name.", variant: "destructive" });
      return;
    }
    const saved = await saveBill.mutateAsync({
      id: form.id,
      bill_category: form.bill_category,
      billing_basis: form.billing_basis,
      customer_id: null,
      customer_name: form.customer_name.trim(),
      place: form.place || null,
      bill_date: form.bill_date,
      vehicle_type: form.vehicle_type || null,
      vehicle_number: form.vehicle_number || null,
      start_time: form.start_time || null,
      end_time: form.end_time || null,
      total_time_minutes: totalMinutes,
      extra_hours_enabled: form.extra_hours_enabled,
      extra_hours: form.extra_hours_enabled ? num(form.extra_hours) : null,
      start_km: num(form.start_km),
      end_km: num(form.end_km),
      total_km: totalKm,
      per_km_rate: perKmRate ?? null,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      total_days: totalDays,
      parking_tollgate: num(form.parking_tollgate),
      permit: num(form.permit),
      night_halt: num(form.night_halt),
      extra_km: num(form.extra_km),
      advance: num(form.advance),
      remarks: form.remarks || null,
      total_amount: totalAmount || null,
      balance: totalAmount ? balance : null,
      status: "draft",
    });
    setForm(billToForm(saved));
  };

  return (
    <div className="space-y-6">
      {/* ============ BILLING FORM ============ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <FileText className="h-5 w-5" />
            {form.id ? `Edit Bill` : "Billing"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Information */}
          <section className="rounded-xl border bg-card p-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label>Bill Category <span className="text-destructive">*</span></Label>
                <Select value={form.bill_category} onValueChange={(v) => setForm({ ...form, bill_category: v })}>
                  <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Official">Official</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Billing Basis <span className="text-destructive">*</span></Label>
                <Select value={form.billing_basis} onValueChange={(v) => setForm({ ...form, billing_basis: v as "kilometer" | "hourly" })}>
                  <SelectTrigger><SelectValue placeholder="Select Basis" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly Basis</SelectItem>
                    <SelectItem value="kilometer">Kilometer Basis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="hidden md:block" />
              <div>
                 <Label>Customer Name</Label>
                 <Input
                   list="billing-customer-list"
                   placeholder="Search or enter customer name"
                   value={form.customer_name}
                   onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                 />
                 <datalist id="billing-customer-list">
                   {(customers ?? []).map((c) => (
                     <option key={c.id} value={c.name} />
                   ))}
                 </datalist>
              </div>
              <div>
                <Label>Place / Destination</Label>
                <Input value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} placeholder="Enter Place / Destination" />
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" value={form.bill_date} onChange={(e) => setForm({ ...form, bill_date: e.target.value })} />
              </div>
            </div>
          </section>

          {/* Vehicle Details */}
          <section className="rounded-xl border bg-card p-4">
            <h3 className="text-primary font-semibold mb-3">Vehicle Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Vehicle Type</Label>
                <Select value={form.vehicle_type} onValueChange={(v) => setForm({ ...form, vehicle_type: v })}>
                  <SelectTrigger><SelectValue placeholder="Select Vehicle Type" /></SelectTrigger>
                  <SelectContent>
                    {vehicles.map((v) => (
                      <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Vehicle Number (Manual Entry)</Label>
                <Input value={form.vehicle_number} onChange={(e) => setForm({ ...form, vehicle_number: e.target.value })} placeholder="Enter Vehicle Number" />
              </div>
            </div>
          </section>

          {/* Trip Details */}
          <section className="rounded-xl border bg-card p-4">
            <h3 className="text-primary font-semibold mb-3">Trip Details</h3>
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Time */}
              <div className="rounded-lg border p-3">
                <h4 className="text-primary font-medium mb-2">Time</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Start Time</Label><Time12Input value={form.start_time} onChange={(v) => setForm({ ...form, start_time: v })} /></div>
                  <div><Label>End Time</Label><Time12Input value={form.end_time} onChange={(v) => setForm({ ...form, end_time: v })} /></div>
                </div>
                <div className="mt-3">
                  <Label>Total Time</Label>
                  <div className="flex gap-2 items-start">
                    <Input readOnly value={formatDuration(totalMinutes)} placeholder="--" className="bg-muted" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setForm({ ...form, extra_hours_enabled: !form.extra_hours_enabled, extra_hours: form.extra_hours_enabled ? "" : form.extra_hours })}
                    >
                      {form.extra_hours_enabled ? <><Minus className="h-4 w-4 mr-1" />Remove Extra Hours</> : <><Plus className="h-4 w-4 mr-1" />Extra Hours</>}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Enter extra hours manually in Additional Charges</p>
                </div>
              </div>

              {/* Kilometer */}
              <div className="rounded-lg border p-3">
                <h4 className="text-primary font-medium mb-2">
                  {form.billing_basis === "hourly" ? "Hourly Rate" : "Kilometer"}
                </h4>
                {form.billing_basis === "hourly" ? (
                  <div className="space-y-3">
                    <div>
                      <Label>Per Hour Rate</Label>
                      <Input readOnly value={perHourRate != null ? `₹${perHourRate}` : ""} placeholder="--" className="bg-muted" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Hourly charge = Total Time (hrs) × Per Hour Rate
                    </p>
                  </div>
                ) : (
                <>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Start KM</Label><Input type="number" min="0" value={form.start_km} onChange={(e) => setForm({ ...form, start_km: e.target.value })} placeholder="0" /></div>
                  <div><Label>End KM</Label><Input type="number" min="0" value={form.end_km} onChange={(e) => setForm({ ...form, end_km: e.target.value })} placeholder="0" /></div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <Label>Total KM</Label>
                    <Input readOnly value={totalKm ?? ""} placeholder="--" className="bg-muted" />
                  </div>
                  <div>
                    <Label>Per KM Rate</Label>
                    <Input readOnly value={perKmRate != null ? `₹${perKmRate}` : ""} placeholder="--" className="bg-muted" />
                  </div>
                </div>
                {kmCharge != null && (
                  <p className="text-xs text-primary mt-2">Kilometer Charge: ₹{kmCharge.toLocaleString("en-IN")}</p>
                )}
                </>
                )}
              </div>

              {/* Date */}
              <div className="rounded-lg border p-3">
                <h4 className="text-primary font-medium mb-2">Date</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Start Date</Label><Input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} /></div>
                  <div><Label>End Date</Label><Input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} /></div>
                </div>
                <div className="mt-3">
                  <Label>Total Days</Label>
                  <Input readOnly value={totalDays ?? ""} placeholder="--" className="bg-muted" />
                </div>
                <div className="mt-3">
                  <Label>Day Rent</Label>
                  <Input
                    type="number"
                    value={form.day_rent}
                    onChange={(e) => setForm({ ...form, day_rent: e.target.value })}
                    placeholder={perDayRate != null ? String(perDayRate) : "Enter Day Rent"}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Additional Charges */}
          <section className="rounded-xl border bg-card p-4">
            <h3 className="text-primary font-semibold mb-3">Additional Charges (Inputs Only)</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><Label>Parking & Tollgate</Label><Input type="number" value={form.parking_tollgate} onChange={(e) => setForm({ ...form, parking_tollgate: e.target.value })} placeholder="Enter Amount" /></div>
              <div><Label>Permit</Label><Input type="number" value={form.permit} onChange={(e) => setForm({ ...form, permit: e.target.value })} placeholder="Enter Amount" /></div>
              <div><Label>Night Halt</Label><Input type="number" value={form.night_halt} onChange={(e) => setForm({ ...form, night_halt: e.target.value })} placeholder="Enter Amount" /></div>
              <div>
                <Label>Driver Bata</Label>
                <Input
                  type="number"
                  value={form.driver_bata}
                  onChange={(e) => setForm({ ...form, driver_bata: e.target.value })}
                  placeholder={driverBataPerDay != null ? String(driverBataPerDay) : "Enter Amount"}
                />
              </div>
              {form.extra_hours_enabled && (
                <div>
                  <Label>Extra Hours</Label>
                  <Input type="number" value={form.extra_hours} onChange={(e) => setForm({ ...form, extra_hours: e.target.value })} placeholder="Enter Hours" />
                  {perHourRate != null && (
                    <p className="text-xs text-muted-foreground mt-1">Rate: ₹{perHourRate}/hr</p>
                  )}
                </div>
              )}
              {form.billing_basis === "kilometer" && (
                <div><Label>Extra KM</Label><Input type="number" value={form.extra_km} onChange={(e) => setForm({ ...form, extra_km: e.target.value })} placeholder="Enter KM" /></div>
              )}
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-xl border bg-card p-4">
            <h3 className="text-primary font-semibold mb-3">Payment</h3>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <Label>Advance</Label>
                <Input type="number" value={form.advance} onChange={(e) => setForm({ ...form, advance: e.target.value })} placeholder="Enter Amount" />
              </div>
              <div className="md:col-span-2">
                <Label>Remarks</Label>
                <Textarea rows={2} value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} placeholder="Enter Remarks" />
              </div>
              <div className="space-y-2">
                <div><Label>Amount in Words</Label><Input readOnly value={amountWords} placeholder="--" className="bg-muted" /></div>
              </div>
              <div className="md:col-span-4 grid grid-cols-2 gap-3 max-w-md ml-auto">
                <Label className="self-center">
                  Total {overrideNum != null && <span className="text-xs text-amber-600">(manual)</span>}
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={overrideNum != null ? form.total_amount_override : (totalAmount ? String(totalAmount) : "")}
                    onChange={(e) => setForm({ ...form, total_amount_override: e.target.value })}
                    placeholder="--"
                    className="bg-blue-50 dark:bg-blue-950/30"
                  />
                  {overrideNum != null && (
                    <Button type="button" variant="outline" size="icon" title="Reset to auto"
                      onClick={() => setForm({ ...form, total_amount_override: "" })}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Label className="self-center">Balance</Label>
                <Input readOnly value={totalAmount ? `₹${balance.toLocaleString("en-IN")}` : ""} placeholder="--" className="bg-green-50 dark:bg-green-950/30" />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="grid gap-3 sm:grid-cols-4">
            <Button onClick={handleSave} disabled={saveBill.isPending} className="bg-primary hover:bg-primary/90">
              {saveBill.isPending ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
              {form.id ? "Update Bill" : "Save Bill"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const b = bills?.find((x) => x.id === form.id);
                if (b) printBill(b);
                else toast({ title: "Save the bill first", description: "Print is available after the bill is saved." });
              }}
              className="border-green-600 text-green-700 hover:bg-green-50"
            >
              <Printer className="h-4 w-4 mr-1" /> Print
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                const b = bills?.find((x) => x.id === form.id);
                if (!b) {
                  toast({ title: "Save the bill first", description: "PDF is available after the bill is saved." });
                  return;
                }
                try {
                  await downloadBillPdf(b);
                } catch (e) {
                  toast({ title: "PDF failed", description: (e as Error).message, variant: "destructive" });
                }
              }}
              className="border-blue-600 text-blue-700 hover:bg-blue-50"
            >
              <FileText className="h-4 w-4 mr-1" /> Download PDF
            </Button>
            <Button variant="outline" onClick={resetForm} className="border-destructive text-destructive hover:bg-destructive/10">
              <Eraser className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ============ FILTERS + BILLS TABLE ============ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Bills Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={showAll ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAll((s) => !s)}
            >
              {showAll ? "Showing All" : "All"}
            </Button>
            <span className="text-xs text-muted-foreground">
              {showAll || anyFilterActive
                ? "Showing bills across all months"
                : `Showing bills for ${new Date().toLocaleString("en-IN", { month: "long", year: "numeric" })}`}
            </span>
            <div className="ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportBillsCsv(filteredBills)}
                disabled={filteredBills.length === 0}
                className="border-green-600 text-green-700 hover:bg-green-50"
              >
                <Download className="h-4 w-4 mr-1" /> Export CSV
              </Button>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
            <div><Label>From Date</Label><Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /></div>
            <div><Label>To Date</Label><Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} /></div>
            <div>
              <Label>Bill Category</Label>
              <Select value={filterCategory || "all"} onValueChange={(v) => setFilterCategory(v === "all" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Official">Official</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Billing Basis</Label>
              <Select value={filterBasis || "all"} onValueChange={(v) => setFilterBasis(v === "all" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="hourly">Hourly Basis</SelectItem>
                  <SelectItem value="kilometer">Kilometer Basis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Customer</Label>
              <Select value={filterCustomer || "all"} onValueChange={(v) => setFilterCustomer(v === "all" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {Array.from(new Set(bills?.map((b) => b.customer_name) ?? [])).map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Vehicle Type</Label>
              <Select value={filterVehicle || "all"} onValueChange={(v) => setFilterVehicle(v === "all" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {vehicles.map((v) => (
                    <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-6">
              <Label>Search</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground" />
                  <Input
                    className="pl-8"
                    placeholder="Bill no, customer, vehicle number, place, category, basis"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={() => { setFromDate(""); setToDate(""); setFilterCustomer(""); setFilterVehicle(""); setFilterCategory(""); setFilterBasis(""); setSearch(""); setShowAll(false); }}>
                  <RotateCcw className="h-4 w-4 mr-1" /> Reset
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : filteredBills.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No bills found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill No</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Basis</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vehicle Type</TableHead>
                    <TableHead>Vehicle Number</TableHead>
                    <TableHead>Place</TableHead>
                    <TableHead className="text-right">Total KM</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-mono text-xs">{b.bill_no}</TableCell>
                      <TableCell>{b.bill_date}</TableCell>
                      <TableCell>{(b as unknown as { bill_category?: string | null }).bill_category ?? "-"}</TableCell>
                      <TableCell className="capitalize">{(b as unknown as { billing_basis?: string }).billing_basis ?? "kilometer"}</TableCell>
                      <TableCell className="font-medium">{b.customer_name}</TableCell>
                      <TableCell>{b.vehicle_type ?? "-"}</TableCell>
                      <TableCell>{b.vehicle_number ?? "-"}</TableCell>
                      <TableCell>{b.place ?? "-"}</TableCell>
                      <TableCell className="text-right">{b.total_km ?? "-"}</TableCell>
                      <TableCell><Badge variant="outline">{b.status}</Badge></TableCell>
                      <TableCell className="text-right space-x-1 whitespace-nowrap">
                        <Button size="icon" variant="ghost" onClick={() => setViewBill(b)}><Eye className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => startEdit(b)}><Pencil className="h-4 w-4" /></Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          title="Download PDF"
                          onClick={async () => {
                            try { await downloadBillPdf(b); }
                            catch (e) { toast({ title: "PDF failed", description: (e as Error).message, variant: "destructive" }); }
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => printBill(b)}><Printer className="h-4 w-4" /></Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete bill {b.bill_no}?</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => deleteBill.mutate(b.id)}
                              >Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View dialog */}
      <AlertDialog open={!!viewBill} onOpenChange={(o) => !o && setViewBill(null)}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Bill {viewBill?.bill_no}</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-left space-y-1 text-sm text-foreground">
                <div><strong>Date:</strong> {viewBill?.bill_date}</div>
                <div><strong>Category:</strong> {viewBill ? ((viewBill as unknown as { bill_category?: string | null }).bill_category ?? "-") : "-"}</div>
                <div><strong>Billing Basis:</strong> {viewBill ? (((viewBill as unknown as { billing_basis?: string }).billing_basis ?? "kilometer") === "hourly" ? "Hourly Basis" : "Kilometer Basis") : "-"}</div>
                <div><strong>Customer:</strong> {viewBill?.customer_name}</div>
                <div><strong>Place:</strong> {viewBill?.place ?? "-"}</div>
                <div><strong>Vehicle:</strong> {viewBill?.vehicle_type ?? "-"} · {viewBill?.vehicle_number ?? "-"}</div>
                <div><strong>Total KM:</strong> {viewBill?.total_km ?? "-"} @ ₹{viewBill?.per_km_rate ?? "-"}/km</div>
                <div><strong>Total Days:</strong> {viewBill?.total_days ?? "-"}</div>
                <div><strong>Remarks:</strong> {viewBill?.remarks ?? "-"}</div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            {viewBill && <AlertDialogAction onClick={() => printBill(viewBill)}>Print</AlertDialogAction>}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BillingManager;
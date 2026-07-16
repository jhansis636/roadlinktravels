import { useMemo, useState, useEffect } from "react";
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
  UserRound, Loader2, Save, Eraser, Printer, Pencil, Trash2, Eye,
  Search, RotateCcw, Download, FileText,
} from "lucide-react";
import {
  useDriverBills, useSaveDriverBill, useDeleteDriverBill, type DriverBill,
} from "@/hooks/useDriverBills";
import { useCustomers } from "@/hooks/useCustomers";
import { useBills, type Bill } from "@/hooks/useBills";
import { useVehicleTariffs } from "@/hooks/useVehicleTariffs";
import { printDriverBill, downloadDriverBillPdf } from "@/lib/printDriverBill";
import { toast } from "@/hooks/use-toast";

const todayISO = () => new Date().toISOString().slice(0, 10);
const num = (v: string): number | null => {
  if (v === "" || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

// 12-hour time picker (stores "HH:MM" 24h)
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
const Time12Input = ({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) => {
  const { h, m, p } = to12h(value);
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const mins = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));
  const update = (nh: string, nm: string, np: "AM" | "PM") => onChange(from12h(nh, nm, np));
  return (
    <div className="flex gap-1">
      <Select value={h} onValueChange={(v) => update(v, m || "00", p)} disabled={disabled}>
        <SelectTrigger className="w-[70px]"><SelectValue placeholder="HH" /></SelectTrigger>
        <SelectContent>{hours.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={m} onValueChange={(v) => update(h || "12", v, p)} disabled={disabled}>
        <SelectTrigger className="w-[70px]"><SelectValue placeholder="MM" /></SelectTrigger>
        <SelectContent>{mins.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={p} onValueChange={(v) => update(h || "12", m || "00", v as "AM" | "PM")} disabled={disabled}>
        <SelectTrigger className="w-[70px]"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

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
  return [
    crore && `${twoDigit(crore)} Crore`,
    lakh && `${twoDigit(lakh)} Lakh`,
    thousand && `${twoDigit(thousand)} Thousand`,
    rest && threeDigit(rest),
  ].filter(Boolean).join(" ") + " Rupees Only";
};

interface FormState {
  id?: string;
  source_bill_id: string | null;
  bill_no: string;
  bill_date: string;
  bill_category: string;
  trip_type: string;
  customer_name: string;
  department: string;
  driver_name: string;
  customer_phone: string;
  customer_address: string;
  pickup: string;
  drop: string;
  place: string;
  vehicle_type: string;
  vehicle_number: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  start_km: string;
  end_km: string;
  extra_km_source: string; // Additional Kilometers copied from source bill (read-only display)
  trip_amount: string;
  day_rent: string;
  driver_bata: string;
  night_halt: string;
  parking: string;
  tollgate: string;
  permit: string;
  extra_hours: string;
  extra_hours_amount: string;
  extra_km: string;
  extra_km_amount: string;
  other_charges: string;
  advance: string;
  remarks: string;
}

const emptyForm = (): FormState => ({
  source_bill_id: null,
  bill_no: "",
  bill_date: todayISO(),
  bill_category: "",
  trip_type: "full_day",
  customer_name: "",
  department: "",
  driver_name: "",
  customer_phone: "",
  customer_address: "",
  pickup: "",
  drop: "",
  place: "",
  vehicle_type: "",
  vehicle_number: "",
  start_date: todayISO(),
  end_date: todayISO(),
  start_time: "",
  end_time: "",
  start_km: "",
  end_km: "",
  extra_km_source: "",
  trip_amount: "",
  day_rent: "",
  driver_bata: "",
  night_halt: "",
  parking: "",
  tollgate: "",
  permit: "",
  extra_hours: "",
  extra_hours_amount: "",
  extra_km: "",
  extra_km_amount: "",
  other_charges: "",
  advance: "",
  remarks: "",
});

const billToForm = (b: DriverBill): FormState => ({
  id: b.id,
  source_bill_id: b.source_bill_id,
  bill_no: b.bill_no,
  bill_date: b.bill_date ?? todayISO(),
  bill_category: b.bill_category ?? "",
  trip_type: b.trip_type ?? "full_day",
  customer_name: b.customer_name,
  department: (b as unknown as { department?: string | null }).department ?? "",
  driver_name: b.driver_name ?? "",
  customer_phone: b.customer_phone ?? "",
  customer_address: b.customer_address ?? "",
  pickup: b.pickup ?? "",
  drop: b.drop_location ?? "",
  place: b.place ?? "",
  vehicle_type: b.vehicle_type ?? "",
  vehicle_number: b.vehicle_number ?? "",
  start_date: b.start_date ?? todayISO(),
  end_date: b.end_date ?? todayISO(),
  start_time: b.start_time ?? "",
  end_time: b.end_time ?? "",
  start_km: b.start_km?.toString() ?? "",
  end_km: b.end_km?.toString() ?? "",
  extra_km_source: b.extra_km?.toString() ?? "",
  trip_amount: b.trip_amount?.toString() ?? "",
  day_rent: b.day_rent?.toString() ?? "",
  driver_bata: b.driver_bata?.toString() ?? "",
  night_halt: b.night_halt?.toString() ?? "",
  parking: b.parking?.toString() ?? "",
  tollgate: b.tollgate?.toString() ?? "",
  permit: b.permit?.toString() ?? "",
  extra_hours: b.extra_hours?.toString() ?? "",
  extra_hours_amount: b.extra_hours_amount?.toString() ?? "",
  extra_km: b.extra_km?.toString() ?? "",
  extra_km_amount: b.extra_km_amount?.toString() ?? "",
  other_charges: b.other_charges?.toString() ?? "",
  advance: b.advance?.toString() ?? "",
  remarks: b.remarks ?? "",
});

const DriverBillsManager = ({
  prefill,
  onConsumePrefill,
}: {
  prefill?: Partial<FormState> | null;
  onConsumePrefill?: () => void;
}) => {
  const { data: bills, isLoading } = useDriverBills();
  const save = useSaveDriverBill();
  const remove = useDeleteDriverBill();
  const { data: customers } = useCustomers();
  const { data: customerBills } = useBills();
  const { data: tariffs } = useVehicleTariffs();
  const vehicleOptions = useMemo(
    () => (tariffs ?? []).map((t) => t.vehicle_type),
    [tariffs],
  );

  // Helpers to compute Total Time & Additional Hours from Start/End Time.
  const computeTimes = (start?: string | null, end?: string | null) => {
    if (!start || !end) return { totalMin: null as number | null, addlHrs: null as number | null };
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    if ([sh, sm, eh, em].some(Number.isNaN)) return { totalMin: null, addlHrs: null };
    let diff = eh * 60 + em - (sh * 60 + sm);
    if (diff < 0) diff += 24 * 60;
    const addlHrs = diff > 600 ? Math.round(((diff - 600) / 60) * 100) / 100 : null;
    return { totalMin: diff, addlHrs };
  };

  const [form, setForm] = useState<FormState>(emptyForm());
  const locked = !!form.source_bill_id;
  const { totalMin: computedTotalMin, addlHrs: computedAddlHrs } = computeTimes(form.start_time, form.end_time);
  const totalTimeDisplay = computedTotalMin != null ? `${Math.floor(computedTotalMin / 60)}h ${computedTotalMin % 60}m` : "";

  const totalDays = useMemo(() => {
    if (!form.start_date || !form.end_date) return null;
    return Math.max(1, Math.round((new Date(form.end_date).getTime() - new Date(form.start_date).getTime()) / 86400000) + 1);
  }, [form.start_date, form.end_date]);
  const totalKm = useMemo(() => {
    const s = num(form.start_km);
    const e = num(form.end_km);
    return s != null && e != null ? Math.max(0, e - s) : null;
  }, [form.start_km, form.end_km]);

  // Populate the form from an existing Customer Bill.
  const applySourceBill = (b: Bill) => {
    const bx = b as unknown as {
      trip_type?: string; pickup?: string; drop_location?: string;
      customer_phone?: string; customer_address?: string;
      department?: string; driver_bata?: number | null;
    };
    setForm((f) => ({
      ...f,
      source_bill_id: b.id,
      bill_no: b.bill_no ?? "",
      bill_date: b.bill_date ?? f.bill_date,
      bill_category: (b as unknown as { bill_category?: string }).bill_category ?? "",
      trip_type: bx.trip_type ?? "full_day",
      customer_name: b.customer_name ?? "",
      department: bx.department ?? "",
      customer_phone: bx.customer_phone ?? "",
      customer_address: bx.customer_address ?? "",
      place: b.place ?? "",
      pickup: bx.pickup ?? "",
      drop: bx.drop_location ?? "",
      vehicle_type: b.vehicle_type ?? "",
      vehicle_number: b.vehicle_number ?? "",
      start_date: b.start_date ?? f.start_date,
      end_date: b.end_date ?? f.end_date,
      start_time: b.start_time ?? "",
      end_time: b.end_time ?? "",
      start_km: b.start_km?.toString() ?? "",
      end_km: b.end_km?.toString() ?? "",
      extra_hours: b.extra_hours?.toString() ?? "",
      extra_km_source: b.extra_km?.toString() ?? "",
    }));
  };

  useEffect(() => {
    if (prefill) {
      setForm((f) => ({ ...emptyForm(), ...f, ...prefill } as FormState));
      window.scrollTo({ top: 0, behavior: "smooth" });
      onConsumePrefill?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill]);

  const totals = useMemo(() => {
    const fields: (keyof FormState)[] = [
      "trip_amount", "day_rent", "driver_bata", "night_halt", "parking", "tollgate",
      "permit", "extra_hours_amount", "extra_km_amount", "other_charges",
    ];
    const total = Math.round(fields.reduce((s, k) => s + (num(form[k] as string) ?? 0), 0));
    const advance = num(form.advance) ?? 0;
    const balance = Math.max(0, total - advance);
    return { total, advance, balance };
  }, [form]);

  const amountWords = useMemo(
    () => (totals.total > 0 ? amountToWords(totals.total) : ""),
    [totals.total],
  );

  const resetForm = () => setForm(emptyForm());

  const handleSave = async () => {
    if (!form.bill_no.trim()) {
      toast({ title: "Bill No required", variant: "destructive" });
      return;
    }
    if (!form.customer_name.trim()) {
      toast({ title: "Customer required", variant: "destructive" });
      return;
    }
    const saved = await save.mutateAsync({
      id: form.id,
      source_bill_id: form.source_bill_id,
      bill_no: form.bill_no.trim(),
      bill_date: form.bill_date,
      bill_category: form.bill_category || null,
      trip_type: form.trip_type || null,
      customer_name: form.customer_name.trim(),
      department: form.department || null,
      driver_name: form.driver_name || null,
      customer_phone: form.customer_phone || null,
      customer_address: form.customer_address || null,
      pickup: form.pickup || null,
      drop_location: form.drop || null,
      place: form.place || null,
      vehicle_type: form.vehicle_type || null,
      vehicle_number: form.vehicle_number || null,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      total_days: totalDays,
      start_time: form.start_time || null,
      end_time: form.end_time || null,
      total_time_minutes: computedTotalMin,
      start_km: num(form.start_km),
      end_km: num(form.end_km),
      total_km: totalKm,
      trip_amount: num(form.trip_amount),
      day_rent: num(form.day_rent),
      driver_bata: num(form.driver_bata),
      night_halt: num(form.night_halt),
      parking: num(form.parking),
      tollgate: num(form.tollgate),
      permit: num(form.permit),
      extra_hours: num(form.extra_hours) ?? computedAddlHrs,
      extra_hours_amount: num(form.extra_hours_amount),
      extra_km: num(form.extra_km_source) ?? num(form.extra_km),
      extra_km_amount: num(form.extra_km_amount),
      other_charges: num(form.other_charges),
      advance: num(form.advance),
      total_amount: totals.total || null,
      balance: totals.total ? totals.balance : null,
      remarks: form.remarks || null,
      status: "draft",
    } as never);
    setForm(billToForm(saved));
  };

  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!bills) return [];
    const q = search.trim().toLowerCase();
    if (!q) return bills;
    return bills.filter((b) => {
      const hay = [b.bill_no, b.customer_name, b.driver_name, b.vehicle_type, b.vehicle_number, b.place]
        .filter(Boolean).join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [bills, search]);

  const [viewBill, setViewBill] = useState<DriverBill | null>(null);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <UserRound className="h-5 w-5" />
            {form.id ? `Edit Driver Bill` : "Driver Bill"}
            {form.source_bill_id && <Badge variant="outline" className="ml-2">Linked to Customer Bill</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header info */}
          <section className="rounded-xl border bg-card p-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label>Bill No <span className="text-destructive">*</span> <span className="text-xs text-muted-foreground">(select customer bill)</span></Label>
                <div className="flex gap-1">
                  <Input
                    list="driverbill-billno-list"
                    value={form.bill_no}
                    onChange={(e) => {
                      const bn = e.target.value;
                      const match = (customerBills ?? []).find((b) => b.bill_no === bn);
                      if (match) applySourceBill(match);
                      else setForm({ ...form, bill_no: bn, source_bill_id: null });
                    }}
                    placeholder="Search Bill No"
                  />
                  {form.source_bill_id && (
                    <Button type="button" size="icon" variant="outline" title="Unlink customer bill"
                      onClick={() => setForm({ ...form, source_bill_id: null })}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <datalist id="driverbill-billno-list">
                  {(customerBills ?? []).map((b) => (
                    <option key={b.id} value={b.bill_no ?? ""}>{b.customer_name}</option>
                  ))}
                </datalist>
              </div>
              <div>
                <Label>Bill Date</Label>
                <Input type="date" value={form.bill_date} onChange={(e) => setForm({ ...form, bill_date: e.target.value })} />
              </div>
              <div>
                <Label>Bill Category</Label>
                <Select value={form.bill_category || "none"} onValueChange={(v) => setForm({ ...form, bill_category: v === "none" ? "" : v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">—</SelectItem>
                    <SelectItem value="Official">Official</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Trip Type</Label>
                <Select value={form.trip_type} onValueChange={(v) => setForm({ ...form, trip_type: v })} disabled={locked}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half_day">Half Day Rent</SelectItem>
                    <SelectItem value="full_day">Full Day Rent</SelectItem>
                    <SelectItem value="pickup_drop">Pick Up & Drop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Customer Name</Label>
                <Input
                  list="driverbill-customer-list"
                  value={form.customer_name}
                  onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                  placeholder="Search or enter customer"
                  readOnly={locked}
                  className={locked ? "bg-muted" : ""}
                />
                <datalist id="driverbill-customer-list">
                  {(customers ?? []).map((c) => <option key={c.id} value={c.name} />)}
                </datalist>
              </div>
              <div>
                <Label>Department</Label>
                <Input
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  placeholder="Department"
                  readOnly={locked}
                  className={locked ? "bg-muted" : ""}
                />
              </div>
              <div>
                <Label>Driver Name</Label>
                <Input
                  list="driverbill-driver-list"
                  value={form.driver_name}
                  onChange={(e) => setForm({ ...form, driver_name: e.target.value })}
                  placeholder="Search or enter driver"
                />
                {/* Ready for future Driver Master. Currently seeded from existing driver names on saved bills. */}
                <datalist id="driverbill-driver-list">
                  {Array.from(new Set((bills ?? []).map((b) => b.driver_name).filter(Boolean) as string[])).map((n) => (
                    <option key={n} value={n} />
                  ))}
                </datalist>
              </div>
              <div>
                <Label>Customer Phone</Label>
                <Input value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} readOnly={locked} className={locked ? "bg-muted" : ""} />
              </div>
              <div>
                <Label>Customer Address</Label>
                <Input value={form.customer_address} onChange={(e) => setForm({ ...form, customer_address: e.target.value })} readOnly={locked} className={locked ? "bg-muted" : ""} />
              </div>
              <div>
                <Label>Place / Destination</Label>
                <Input value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} readOnly={locked} className={locked ? "bg-muted" : ""} />
              </div>
              <div>
                <Label>Pickup</Label>
                <Input value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })} readOnly={locked} className={locked ? "bg-muted" : ""} />
              </div>
              <div>
                <Label>Drop</Label>
                <Input value={form.drop} onChange={(e) => setForm({ ...form, drop: e.target.value })} readOnly={locked} className={locked ? "bg-muted" : ""} />
              </div>
            </div>
          </section>

          {/* Vehicle */}
          <section className="rounded-xl border bg-card p-4">
            <h3 className="text-amber-700 font-semibold mb-3">Vehicle Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Vehicle Type</Label>
                <Select value={form.vehicle_type || undefined} onValueChange={(v) => setForm({ ...form, vehicle_type: v })} disabled={locked}>
                  <SelectTrigger><SelectValue placeholder="Select Vehicle Type" /></SelectTrigger>
                  <SelectContent>
                    {vehicleOptions.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Vehicle Number</Label>
                <Input value={form.vehicle_number} onChange={(e) => setForm({ ...form, vehicle_number: e.target.value })} readOnly={locked} className={locked ? "bg-muted" : ""} />
              </div>
            </div>
          </section>

          {/* Trip */}
          <section className="rounded-xl border bg-card p-4">
            <h3 className="text-amber-700 font-semibold mb-3">Trip Details</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div><Label>Start Date</Label><Input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} readOnly={locked} className={locked ? "bg-muted" : ""} /></div>
              <div><Label>End Date</Label><Input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} readOnly={locked} className={locked ? "bg-muted" : ""} /></div>
              <div><Label>Total Days</Label><Input readOnly value={totalDays ?? ""} className="bg-muted" /></div>
              <div><Label>Start Time</Label><Time12Input value={form.start_time} onChange={(v) => setForm({ ...form, start_time: v })} disabled={locked} /></div>
              <div><Label>End Time</Label><Time12Input value={form.end_time} onChange={(v) => setForm({ ...form, end_time: v })} disabled={locked} /></div>
              <div><Label>Total Time</Label><Input readOnly value={totalTimeDisplay} className="bg-muted" /></div>
              <div><Label>Start KM</Label><Input type="number" value={form.start_km} onChange={(e) => setForm({ ...form, start_km: e.target.value })} readOnly={locked} className={locked ? "bg-muted" : ""} /></div>
              <div><Label>End KM</Label><Input type="number" value={form.end_km} onChange={(e) => setForm({ ...form, end_km: e.target.value })} readOnly={locked} className={locked ? "bg-muted" : ""} /></div>
              <div><Label>Total KM</Label><Input readOnly value={totalKm ?? ""} className="bg-muted" /></div>
              <div><Label>Additional Hours</Label><Input readOnly value={form.extra_hours || (computedAddlHrs != null ? String(computedAddlHrs) : "")} className="bg-amber-50 dark:bg-amber-950/30" /></div>
              <div><Label>Additional Kilometers</Label><Input readOnly value={form.extra_km_source || ""} className="bg-amber-50 dark:bg-amber-950/30" /></div>
            </div>
          </section>

          {/* Manual Charges */}
          <section className="rounded-xl border bg-card p-4">
            <h3 className="text-amber-700 font-semibold mb-3">Driver Charges (Manual)</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><Label>Trip Amount</Label><Input type="number" value={form.trip_amount} onChange={(e) => setForm({ ...form, trip_amount: e.target.value })} /></div>
              <div><Label>Day Rent</Label><Input type="number" value={form.day_rent} onChange={(e) => setForm({ ...form, day_rent: e.target.value })} /></div>
              <div><Label>Driver Bata</Label><Input type="number" value={form.driver_bata} onChange={(e) => setForm({ ...form, driver_bata: e.target.value })} /></div>
              <div><Label>Night Halt</Label><Input type="number" value={form.night_halt} onChange={(e) => setForm({ ...form, night_halt: e.target.value })} /></div>
              <div><Label>Parking</Label><Input type="number" value={form.parking} onChange={(e) => setForm({ ...form, parking: e.target.value })} /></div>
              <div><Label>Tollgate</Label><Input type="number" value={form.tollgate} onChange={(e) => setForm({ ...form, tollgate: e.target.value })} /></div>
              <div><Label>Permit</Label><Input type="number" value={form.permit} onChange={(e) => setForm({ ...form, permit: e.target.value })} /></div>
              <div><Label>Other Charges</Label><Input type="number" value={form.other_charges} onChange={(e) => setForm({ ...form, other_charges: e.target.value })} /></div>
              <div><Label>Extra Hours</Label><Input type="number" value={form.extra_hours} onChange={(e) => setForm({ ...form, extra_hours: e.target.value })} /></div>
              <div><Label>Extra Hours Amount</Label><Input type="number" value={form.extra_hours_amount} onChange={(e) => setForm({ ...form, extra_hours_amount: e.target.value })} /></div>
              <div><Label>Extra KM</Label><Input type="number" value={form.extra_km} onChange={(e) => setForm({ ...form, extra_km: e.target.value })} /></div>
              <div><Label>Extra KM Amount</Label><Input type="number" value={form.extra_km_amount} onChange={(e) => setForm({ ...form, extra_km_amount: e.target.value })} /></div>
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-xl border bg-card p-4">
            <h3 className="text-amber-700 font-semibold mb-3">Payment</h3>
            <div className="grid gap-4 md:grid-cols-4">
              <div><Label>Advance</Label><Input type="number" value={form.advance} onChange={(e) => setForm({ ...form, advance: e.target.value })} /></div>
              <div className="md:col-span-2">
                <Label>Remarks</Label>
                <Textarea rows={2} value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
              </div>
              <div><Label>Amount in Words</Label><Input readOnly value={amountWords} className="bg-muted" /></div>
              <div className="md:col-span-4 grid grid-cols-2 gap-3 max-w-md ml-auto">
                <Label className="self-center">Total</Label>
                <Input readOnly value={totals.total ? `₹${totals.total.toLocaleString("en-IN")}` : ""} className="bg-amber-50 dark:bg-amber-950/30" />
                <Label className="self-center">Balance</Label>
                <Input readOnly value={totals.total ? `₹${totals.balance.toLocaleString("en-IN")}` : ""} className="bg-green-50 dark:bg-green-950/30" />
              </div>
            </div>
          </section>

          <div className="grid gap-3 sm:grid-cols-4">
            <Button onClick={handleSave} disabled={save.isPending} className="bg-amber-600 hover:bg-amber-700 text-white">
              {save.isPending ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
              {form.id ? "Update Driver Bill" : "Save Driver Bill"}
            </Button>
            <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50"
              onClick={() => {
                const b = bills?.find((x) => x.id === form.id);
                if (b) printDriverBill(b);
                else toast({ title: "Save first" });
              }}>
              <Printer className="h-4 w-4 mr-1" /> Print
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50"
              onClick={async () => {
                const b = bills?.find((x) => x.id === form.id);
                if (!b) { toast({ title: "Save first" }); return; }
                try { await downloadDriverBillPdf(b); }
                catch (e) { toast({ title: "PDF failed", description: (e as Error).message, variant: "destructive" }); }
              }}>
              <FileText className="h-4 w-4 mr-1" /> Download PDF
            </Button>
            <Button variant="outline" onClick={resetForm} className="border-destructive text-destructive hover:bg-destructive/10">
              <Eraser className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserRound className="h-5 w-5" /> Driver Bills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground" />
              <Input className="pl-8" placeholder="Bill no, customer, driver, vehicle, place"
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Button variant="outline" onClick={() => setSearch("")}><RotateCcw className="h-4 w-4 mr-1" /> Reset</Button>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No driver bills found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill No</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-mono text-xs">{b.bill_no}</TableCell>
                      <TableCell>{b.customer_name}</TableCell>
                      <TableCell>{b.driver_name ?? "-"}</TableCell>
                      <TableCell>{[b.vehicle_type, b.vehicle_number].filter(Boolean).join(" · ") || "-"}</TableCell>
                      <TableCell className="text-right">{b.total_amount != null ? `₹${Number(b.total_amount).toLocaleString("en-IN")}` : "-"}</TableCell>
                      <TableCell className="text-right">{b.balance != null ? `₹${Number(b.balance).toLocaleString("en-IN")}` : "-"}</TableCell>
                      <TableCell><Badge variant="outline">{b.status}</Badge></TableCell>
                      <TableCell className="text-right space-x-1 whitespace-nowrap">
                        <Button size="icon" variant="ghost" onClick={() => setViewBill(b)}><Eye className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => { setForm(billToForm(b)); window.scrollTo({ top: 0, behavior: "smooth" }); }}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" title="Download PDF"
                          onClick={async () => {
                            try { await downloadDriverBillPdf(b); }
                            catch (e) { toast({ title: "PDF failed", description: (e as Error).message, variant: "destructive" }); }
                          }}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => printDriverBill(b)}><Printer className="h-4 w-4" /></Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete driver bill {b.bill_no}?</AlertDialogTitle>
                              <AlertDialogDescription>This does not affect the linked customer bill.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => remove.mutate(b.id)}>Delete</AlertDialogAction>
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

      <AlertDialog open={!!viewBill} onOpenChange={(o) => !o && setViewBill(null)}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Driver Bill {viewBill?.bill_no}</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-left space-y-1 text-sm text-foreground">
                <div><strong>Date:</strong> {viewBill?.bill_date}</div>
                <div><strong>Customer:</strong> {viewBill?.customer_name}</div>
                <div><strong>Driver:</strong> {viewBill?.driver_name ?? "-"}</div>
                <div><strong>Vehicle:</strong> {viewBill?.vehicle_type ?? "-"} · {viewBill?.vehicle_number ?? "-"}</div>
                <div><strong>Total:</strong> ₹{viewBill?.total_amount ?? "-"}</div>
                <div><strong>Balance:</strong> ₹{viewBill?.balance ?? "-"}</div>
                <div><strong>Remarks:</strong> {viewBill?.remarks ?? "-"}</div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            {viewBill && <AlertDialogAction onClick={() => printDriverBill(viewBill)}>Print</AlertDialogAction>}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export type DriverBillPrefill = Partial<FormState>;
export default DriverBillsManager;
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useBills } from "@/hooks/useBills";
import { TrendingUp, Receipt, Wallet, AlertCircle, BarChart3 } from "lucide-react";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const RevenueDashboard = () => {
  const { data: bills = [] } = useBills();
  const now = new Date();
  const [year, setYear] = useState(String(now.getFullYear()));
  const [month, setMonth] = useState("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"monthly" | "yearly">("monthly");

  const years = useMemo(() => {
    const s = new Set<string>();
    bills.forEach((b) => b.bill_date && s.add(b.bill_date.slice(0, 4)));
    s.add(String(now.getFullYear()));
    return Array.from(s).sort().reverse();
  }, [bills, now]);

  const scoped = useMemo(() => bills.filter((b) => {
    if (!b.bill_date) return false;
    if (year !== "all" && b.bill_date.slice(0, 4) !== year) return false;
    if (month !== "all" && b.bill_date.slice(5, 7) !== month) return false;
    const q = search.trim().toLowerCase();
    if (q && !`${b.bill_no} ${b.customer_name} ${b.vehicle_type ?? ""} ${b.place ?? ""}`.toLowerCase().includes(q)) return false;
    return true;
  }), [bills, year, month, search]);

  const kpis = useMemo(() => {
    const total = scoped.reduce((s, b) => s + Number(b.total_amount ?? 0), 0);
    const advance = scoped.reduce((s, b) => s + Number(b.advance ?? 0), 0);
    const balance = scoped.reduce((s, b) => s + Number(b.balance ?? 0), 0);
    return { total, advance, balance, count: scoped.length, avg: scoped.length ? total / scoped.length : 0 };
  }, [scoped]);

  const chartData = useMemo(() => {
    const src = view === "yearly" ? bills : bills.filter((b) => b.bill_date?.slice(0, 4) === year);
    const buckets = new Map<string, number>();
    src.forEach((b) => {
      if (!b.bill_date) return;
      const key = view === "yearly" ? b.bill_date.slice(0, 4) : b.bill_date.slice(0, 7);
      buckets.set(key, (buckets.get(key) ?? 0) + Number(b.total_amount ?? 0));
    });
    return Array.from(buckets.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => ({ label: k, revenue: Math.round(v) }));
  }, [bills, view, year]);

  const months = [
    ["01", "Jan"], ["02", "Feb"], ["03", "Mar"], ["04", "Apr"], ["05", "May"], ["06", "Jun"],
    ["07", "Jul"], ["08", "Aug"], ["09", "Sep"], ["10", "Oct"], ["11", "Nov"], ["12", "Dec"],
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-primary"><BarChart3 className="h-5 w-5" /> Revenue Dashboard</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <Label>Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Month</Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  {months.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Chart View</Label>
              <Select value={view} onValueChange={(v) => setView(v as "monthly" | "yearly")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Search</Label>
              <Input placeholder="Bill / Customer / Vehicle" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            <KPI icon={<TrendingUp className="h-4 w-4" />} label="Total Revenue" value={inr(kpis.total)} tone="text-primary" />
            <KPI icon={<Receipt className="h-4 w-4" />} label="Total Bills" value={String(kpis.count)} />
            <KPI icon={<Wallet className="h-4 w-4" />} label="Paid (Advance)" value={inr(kpis.advance)} tone="text-emerald-600" />
            <KPI icon={<AlertCircle className="h-4 w-4" />} label="Pending Balance" value={inr(kpis.balance)} tone="text-amber-600" />
            <KPI icon={<BarChart3 className="h-4 w-4" />} label="Avg Bill Value" value={inr(kpis.avg)} />
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold mb-3 text-primary">{view === "yearly" ? "Yearly Revenue" : `Monthly Revenue (${year})`}</h3>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="label" fontSize={12} />
                  <YAxis fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => inr(v)} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill No</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Advance</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoped.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs">{b.bill_no}</TableCell>
                    <TableCell>{b.bill_date}</TableCell>
                    <TableCell>{b.customer_name}</TableCell>
                    <TableCell>{b.vehicle_type ?? "-"}</TableCell>
                    <TableCell className="text-right">{inr(Number(b.total_amount ?? 0))}</TableCell>
                    <TableCell className="text-right text-emerald-600">{inr(Number(b.advance ?? 0))}</TableCell>
                    <TableCell className="text-right text-amber-600">{inr(Number(b.balance ?? 0))}</TableCell>
                  </TableRow>
                ))}
                {scoped.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-6">No bills for selected period</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const KPI = ({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone?: string }) => (
  <div className="rounded-xl border bg-card p-4">
    <div className="flex items-center gap-2 text-xs text-muted-foreground">{icon}{label}</div>
    <div className={`mt-2 text-xl font-bold ${tone ?? "text-foreground"}`}>{value}</div>
  </div>
);

export default RevenueDashboard;
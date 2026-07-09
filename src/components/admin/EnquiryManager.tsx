import { useMemo, useState } from "react";
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
import { Loader2, Save, Eraser, Pencil, Trash2, MessageSquare } from "lucide-react";
import {
  useEnquiries, useSaveEnquiry, useDeleteEnquiry, type Enquiry,
} from "@/hooks/useEnquiries";
import { useCustomers } from "@/hooks/useCustomers";
import { useVehicleTariffs } from "@/hooks/useVehicleTariffs";

const today = () => new Date().toISOString().slice(0, 10);

interface FormState {
  id?: string;
  customer_name: string;
  customer_id: string;
  date_from: string;
  date_to: string;
  pickup_location: string;
  drop_place: string;
  vehicle_type: string;
  category: string;
  status: string;
  remarks: string;
}

const empty: FormState = {
  customer_name: "", customer_id: "", date_from: today(), date_to: today(),
  pickup_location: "", drop_place: "", vehicle_type: "",
  category: "", status: "open", remarks: "",
};

const EnquiryManager = () => {
  const { data: enquiries, isLoading } = useEnquiries();
  const { data: customers } = useCustomers();
  const { data: tariffs } = useVehicleTariffs();
  const save = useSaveEnquiry();
  const remove = useDeleteEnquiry();
  const [form, setForm] = useState<FormState>(empty);

  const totalDays = useMemo(() => {
    if (!form.date_from || !form.date_to) return null;
    const a = new Date(form.date_from).getTime();
    const b = new Date(form.date_to).getTime();
    if (Number.isNaN(a) || Number.isNaN(b)) return null;
    return Math.max(1, Math.round((b - a) / 86400000) + 1);
  }, [form.date_from, form.date_to]);

  const handleCustomerName = (name: string) => {
    const match = (customers ?? []).find((c) => c.name.toLowerCase() === name.toLowerCase());
    setForm({ ...form, customer_name: name, customer_id: match?.id ?? "" });
  };

  const startEdit = (e: Enquiry) => {
    setForm({
      id: e.id,
      customer_name: e.customer_name,
      customer_id: e.customer_id ?? "",
      date_from: e.date_from ?? today(),
      date_to: e.date_to ?? today(),
      pickup_location: e.pickup_location ?? "",
      drop_place: e.drop_place ?? "",
      vehicle_type: e.vehicle_type ?? "",
      category: e.category ?? "",
      status: e.status ?? "open",
      remarks: e.remarks ?? "",
    });
  };

  const handleSave = async () => {
    if (!form.customer_name.trim()) return;
    await save.mutateAsync({
      id: form.id,
      customer_name: form.customer_name.trim(),
      customer_id: form.customer_id || null,
      date_from: form.date_from || null,
      date_to: form.date_to || null,
      total_days: totalDays,
      pickup_location: form.pickup_location.trim() || null,
      drop_place: form.drop_place.trim() || null,
      vehicle_type: form.vehicle_type || null,
      category: form.category || null,
      status: form.status,
      remarks: form.remarks.trim() || null,
    });
    setForm(empty);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {form.id ? `Edit Enquiry` : "New Enquiry"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Customer Name *</Label>
              <Input list="enq-cust-list" value={form.customer_name}
                onChange={(e) => handleCustomerName(e.target.value)}
                placeholder="Search or type customer name" />
              <datalist id="enq-cust-list">
                {(customers ?? []).map((c) => <option key={c.id} value={c.name} />)}
              </datalist>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={form.category || "none"} onValueChange={(v) => setForm({ ...form, category: v === "none" ? "" : v })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">-</SelectItem>
                  <SelectItem value="Official">Official</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="converted">Converted to Bill</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date From</Label>
              <Input type="date" value={form.date_from} onChange={(e) => setForm({ ...form, date_from: e.target.value })} />
            </div>
            <div>
              <Label>Date To</Label>
              <Input type="date" value={form.date_to} onChange={(e) => setForm({ ...form, date_to: e.target.value })} />
            </div>
            <div>
              <Label>Total Days</Label>
              <Input readOnly value={totalDays ?? ""} className="bg-muted" />
            </div>
            <div>
              <Label>Pickup Location</Label>
              <Input value={form.pickup_location} onChange={(e) => setForm({ ...form, pickup_location: e.target.value })} />
            </div>
            <div>
              <Label>Drop Place</Label>
              <Input value={form.drop_place} onChange={(e) => setForm({ ...form, drop_place: e.target.value })} />
            </div>
            <div>
              <Label>Vehicle Type</Label>
              <Select value={form.vehicle_type || "none"} onValueChange={(v) => setForm({ ...form, vehicle_type: v === "none" ? "" : v })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">-</SelectItem>
                  {(tariffs ?? []).map((t) => (
                    <SelectItem key={t.id} value={t.vehicle_type}>{t.vehicle_type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <Label>Remarks</Label>
              <Textarea rows={2} value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={save.isPending}>
              {save.isPending ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
              {form.id ? "Update Enquiry" : "Save Enquiry"}
            </Button>
            <Button variant="outline" onClick={() => setForm(empty)}>
              <Eraser className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Enquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : !enquiries?.length ? (
            <p className="text-center text-muted-foreground py-8">No enquiries yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Enquiry No</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Drop</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enquiries.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-mono text-xs">{e.enquiry_no}</TableCell>
                      <TableCell className="font-medium">{e.customer_name}</TableCell>
                      <TableCell>{e.category ?? "-"}</TableCell>
                      <TableCell>{e.date_from ?? "-"}</TableCell>
                      <TableCell>{e.date_to ?? "-"}</TableCell>
                      <TableCell>{e.total_days ?? "-"}</TableCell>
                      <TableCell>{e.pickup_location ?? "-"}</TableCell>
                      <TableCell>{e.drop_place ?? "-"}</TableCell>
                      <TableCell>{e.vehicle_type ?? "-"}</TableCell>
                      <TableCell><Badge variant="outline">{e.status}</Badge></TableCell>
                      <TableCell className="text-right space-x-1 whitespace-nowrap">
                        <Button size="icon" variant="ghost" onClick={() => startEdit(e)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete enquiry {e.enquiry_no}?</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => remove.mutate(e.id)}>Delete</AlertDialogAction>
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
    </div>
  );
};

export default EnquiryManager;
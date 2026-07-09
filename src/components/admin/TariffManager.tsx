import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Plus, Pencil, Trash2, Car } from "lucide-react";
import {
  useVehicleTariffs, useSaveVehicleTariff, useDeleteVehicleTariff,
  type VehicleTariff,
} from "@/hooks/useVehicleTariffs";

interface FormState {
  id?: string;
  vehicle_type: string;
  day_rent: string;
  per_km_rate: string;
  extra_km_rate: string;
  driver_bata: string;
  per_hour_rate: string;
  sort_order: string;
}

const empty: FormState = {
  vehicle_type: "", day_rent: "", per_km_rate: "", extra_km_rate: "",
  driver_bata: "", per_hour_rate: "", sort_order: "0",
};

const toNum = (v: string) => (v === "" ? null : Number(v));

const TariffManager = () => {
  const { data: tariffs, isLoading } = useVehicleTariffs();
  const save = useSaveVehicleTariff();
  const remove = useDeleteVehicleTariff();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);

  const startNew = () => { setForm(empty); setOpen(true); };
  const startEdit = (t: VehicleTariff) => {
    setForm({
      id: t.id,
      vehicle_type: t.vehicle_type,
      day_rent: t.day_rent?.toString() ?? "",
      per_km_rate: t.per_km_rate?.toString() ?? "",
      extra_km_rate: t.extra_km_rate?.toString() ?? "",
      driver_bata: t.driver_bata?.toString() ?? "",
      per_hour_rate: t.per_hour_rate?.toString() ?? "",
      sort_order: t.sort_order?.toString() ?? "0",
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicle_type.trim()) return;
    await save.mutateAsync({
      id: form.id,
      vehicle_type: form.vehicle_type.trim(),
      day_rent: toNum(form.day_rent),
      per_km_rate: toNum(form.per_km_rate),
      extra_km_rate: toNum(form.extra_km_rate),
      driver_bata: toNum(form.driver_bata),
      per_hour_rate: toNum(form.per_hour_rate),
      sort_order: Number(form.sort_order) || 0,
    });
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" /> Vehicle Tariffs
        </CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={startNew}><Plus className="h-4 w-4 mr-1" />Add Vehicle</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{form.id ? "Edit Tariff" : "Add Tariff"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label>Vehicle Type *</Label>
                <Input required value={form.vehicle_type}
                  onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Day Rent (₹)</Label><Input type="number" value={form.day_rent}
                  onChange={(e) => setForm({ ...form, day_rent: e.target.value })} /></div>
                <div><Label>Per KM Rate (₹)</Label><Input type="number" value={form.per_km_rate}
                  onChange={(e) => setForm({ ...form, per_km_rate: e.target.value })} /></div>
                <div><Label>Extra KM Rate (₹)</Label><Input type="number" value={form.extra_km_rate}
                  onChange={(e) => setForm({ ...form, extra_km_rate: e.target.value })} /></div>
                <div><Label>Driver Bata (₹/day)</Label><Input type="number" value={form.driver_bata}
                  onChange={(e) => setForm({ ...form, driver_bata: e.target.value })} /></div>
                <div><Label>Per Hour Rate (₹)</Label><Input type="number" value={form.per_hour_rate}
                  onChange={(e) => setForm({ ...form, per_hour_rate: e.target.value })} /></div>
                <div><Label>Sort Order</Label><Input type="number" value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={save.isPending}>
                  {save.isPending && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : !tariffs?.length ? (
          <p className="text-center text-muted-foreground py-8">No tariffs yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle Type</TableHead>
                  <TableHead className="text-right">Day Rent</TableHead>
                  <TableHead className="text-right">Per KM</TableHead>
                  <TableHead className="text-right">Extra KM</TableHead>
                  <TableHead className="text-right">Driver Bata</TableHead>
                  <TableHead className="text-right">Per Hour</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tariffs.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.vehicle_type}</TableCell>
                    <TableCell className="text-right">{t.day_rent != null ? `₹${Number(t.day_rent).toLocaleString("en-IN")}` : "-"}</TableCell>
                    <TableCell className="text-right">{t.per_km_rate != null ? `₹${t.per_km_rate}` : "-"}</TableCell>
                    <TableCell className="text-right">{t.extra_km_rate != null ? `₹${t.extra_km_rate}` : "-"}</TableCell>
                    <TableCell className="text-right">{t.driver_bata != null ? `₹${t.driver_bata}` : "-"}</TableCell>
                    <TableCell className="text-right">{t.per_hour_rate != null ? `₹${t.per_hour_rate}` : "-"}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(t)}>
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
                            <AlertDialogTitle>Delete {t.vehicle_type}?</AlertDialogTitle>
                            <AlertDialogDescription>This tariff will be removed.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => remove.mutate(t.id)}>Delete</AlertDialogAction>
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
  );
};

export default TariffManager;
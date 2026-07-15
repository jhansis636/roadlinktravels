import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface DriverBill {
  id: string;
  source_bill_id: string | null;
  bill_no: string;
  bill_date: string;
  bill_category: string | null;
  trip_type: string | null;
  customer_name: string;
  driver_name: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  pickup: string | null;
  drop_location: string | null;
  place: string | null;
  vehicle_type: string | null;
  vehicle_number: string | null;
  start_date: string | null;
  end_date: string | null;
  total_days: number | null;
  start_time: string | null;
  end_time: string | null;
  total_time_minutes: number | null;
  start_km: number | null;
  end_km: number | null;
  total_km: number | null;
  trip_amount: number | null;
  day_rent: number | null;
  driver_bata: number | null;
  night_halt: number | null;
  parking: number | null;
  tollgate: number | null;
  permit: number | null;
  extra_hours: number | null;
  extra_hours_amount: number | null;
  extra_km: number | null;
  extra_km_amount: number | null;
  other_charges: number | null;
  advance: number | null;
  total_amount: number | null;
  balance: number | null;
  status: string;
  remarks: string | null;
  created_at: string;
  updated_at: string;
}

export type DriverBillInput = Partial<Omit<DriverBill, "id" | "created_at" | "updated_at">> & {
  bill_no: string;
  customer_name: string;
};

export const useDriverBills = () =>
  useQuery({
    queryKey: ["driver_bills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("driver_bills" as never)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as DriverBill[];
    },
  });

export const useDriverBillBySource = (sourceBillId: string | null | undefined) =>
  useQuery({
    queryKey: ["driver_bills", "by_source", sourceBillId ?? ""],
    enabled: !!sourceBillId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("driver_bills" as never)
        .select("*")
        .eq("source_bill_id", sourceBillId as string)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as DriverBill) ?? null;
    },
  });

export const useSaveDriverBill = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DriverBillInput & { id?: string }) => {
      if (payload.id) {
        const { id, ...updates } = payload;
        const { data, error } = await supabase
          .from("driver_bills" as never)
          .update(updates as never)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data as unknown as DriverBill;
      }
      const { data, error } = await supabase
        .from("driver_bills" as never)
        .insert(payload as never)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as DriverBill;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["driver_bills"] });
      toast({ title: "Driver bill saved" });
    },
    onError: (e: Error) =>
      toast({ title: "Save failed", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteDriverBill = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("driver_bills" as never).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["driver_bills"] });
      toast({ title: "Driver bill deleted" });
    },
    onError: (e: Error) =>
      toast({ title: "Delete failed", description: e.message, variant: "destructive" }),
  });
};
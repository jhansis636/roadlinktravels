import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

export type VehicleTariff = Database["public"]["Tables"]["vehicle_tariffs"]["Row"];
export type VehicleTariffInsert = Database["public"]["Tables"]["vehicle_tariffs"]["Insert"];

export const useVehicleTariffs = () =>
  useQuery({
    queryKey: ["vehicle_tariffs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicle_tariffs")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("vehicle_type", { ascending: true });
      if (error) throw error;
      return (data ?? []) as VehicleTariff[];
    },
  });

export const useSaveVehicleTariff = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: VehicleTariffInsert & { id?: string }) => {
      if (payload.id) {
        const { id, ...updates } = payload;
        const { data, error } = await supabase
          .from("vehicle_tariffs").update(updates).eq("id", id).select().single();
        if (error) throw error;
        return data as VehicleTariff;
      }
      const { data, error } = await supabase
        .from("vehicle_tariffs").insert(payload).select().single();
      if (error) throw error;
      return data as VehicleTariff;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vehicle_tariffs"] });
      toast({ title: "Tariff saved" });
    },
    onError: (e: Error) =>
      toast({ title: "Save failed", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteVehicleTariff = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("vehicle_tariffs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vehicle_tariffs"] });
      toast({ title: "Tariff deleted" });
    },
    onError: (e: Error) =>
      toast({ title: "Delete failed", description: e.message, variant: "destructive" }),
  });
};
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

export type Bill = Database["public"]["Tables"]["bills"]["Row"];
export type BillInsert = Database["public"]["Tables"]["bills"]["Insert"];
export type BillUpdate = Database["public"]["Tables"]["bills"]["Update"];

export const useBills = () =>
  useQuery({
    queryKey: ["bills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bills")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Bill[];
    },
  });

export const useSaveBill = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: BillInsert & { id?: string }) => {
      if (payload.id) {
        const { id, ...updates } = payload;
        const { data, error } = await supabase
          .from("bills")
          .update(updates as BillUpdate)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data as Bill;
      }
      const { data, error } = await supabase
        .from("bills")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data as Bill;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
      toast({ title: "Bill saved" });
    },
    onError: (e: Error) =>
      toast({ title: "Save failed", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteBill = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bills").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
      toast({ title: "Bill deleted" });
    },
    onError: (e: Error) =>
      toast({ title: "Delete failed", description: e.message, variant: "destructive" }),
  });
};
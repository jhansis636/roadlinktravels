import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Customer {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  department: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type CustomerInput = Partial<Omit<Customer, "id" | "created_at" | "updated_at">> & {
  name: string;
};

export const useCustomers = () =>
  useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Customer[];
    },
  });

export const useSaveCustomer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CustomerInput & { id?: string }) => {
      if (payload.id) {
        const { id, ...updates } = payload;
        const { data, error } = await supabase
          .from("customers")
          .update(updates)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data as Customer;
      }
      const { data, error } = await supabase
        .from("customers")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data as Customer;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers"] });
      toast({ title: "Customer saved" });
    },
    onError: (e: Error) =>
      toast({ title: "Save failed", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteCustomer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("customers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers"] });
      toast({ title: "Customer removed" });
    },
    onError: (e: Error) =>
      toast({ title: "Delete failed", description: e.message, variant: "destructive" }),
  });
};
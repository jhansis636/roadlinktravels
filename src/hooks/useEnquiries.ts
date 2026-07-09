import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

export type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
export type EnquiryInsert = Database["public"]["Tables"]["enquiries"]["Insert"];

export const useEnquiries = () =>
  useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Enquiry[];
    },
  });

export const useSaveEnquiry = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: EnquiryInsert & { id?: string }) => {
      if (payload.id) {
        const { id, ...updates } = payload;
        const { data, error } = await supabase
          .from("enquiries").update(updates).eq("id", id).select().single();
        if (error) throw error;
        return data as Enquiry;
      }
      const { data, error } = await supabase
        .from("enquiries").insert(payload).select().single();
      if (error) throw error;
      return data as Enquiry;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["enquiries"] });
      toast({ title: "Enquiry saved" });
    },
    onError: (e: Error) =>
      toast({ title: "Save failed", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteEnquiry = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("enquiries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["enquiries"] });
      toast({ title: "Enquiry deleted" });
    },
    onError: (e: Error) =>
      toast({ title: "Delete failed", description: e.message, variant: "destructive" }),
  });
};
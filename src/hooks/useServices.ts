import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string | null;
  image_url: string | null;
  features: string[];
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useServices = (activeOnly = false) => {
  return useQuery({
    queryKey: ["services", activeOnly],
    queryFn: async () => {
      let query = supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (activeOnly) {
        query = query.eq("is_active", true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return (data || []).map(item => ({
        ...item,
        features: Array.isArray(item.features) ? item.features : []
      })) as Service[];
    },
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (service: Omit<Service, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("services")
        .insert(service)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Service added", description: "The service has been published." });
    },
    onError: (error) => {
      toast({ title: "Error adding service", description: error.message, variant: "destructive" });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Service> & { id: string }) => {
      const { data, error } = await supabase
        .from("services")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Service updated", description: "Your changes have been saved." });
    },
    onError: (error) => {
      toast({ title: "Error updating service", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Service deleted", description: "The service has been removed." });
    },
    onError: (error) => {
      toast({ title: "Error deleting service", description: error.message, variant: "destructive" });
    },
  });
};

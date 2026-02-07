import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Vehicle {
  id: string;
  name: string;
  image_url: string | null;
  capacity: string;
  rating: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Vehicle[];
    },
  });
};

export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Vehicle>;
    }) => {
      const { data, error } = await supabase
        .from("vehicles")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehicle updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update vehicle: " + error.message);
    },
  });
};

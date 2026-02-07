import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SliderImage {
  id: string;
  page_name: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSliderImages = (pageName?: string, activeOnly: boolean = true) => {
  return useQuery({
    queryKey: ["slider_images", pageName, activeOnly],
    queryFn: async () => {
      let query = supabase
        .from("slider_images")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (pageName) {
        query = query.eq("page_name", pageName);
      }
      
      if (activeOnly) {
        query = query.eq("is_active", true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as SliderImage[];
    },
  });
};

export const useCreateSliderImage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (image: Omit<SliderImage, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("slider_images")
        .insert([image])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slider_images"] });
      toast({ title: "Image added", description: "Slider image has been added successfully." });
    },
    onError: (error) => {
      toast({ title: "Error adding image", description: error.message, variant: "destructive" });
    },
  });
};

export const useUpdateSliderImage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<SliderImage> & { id: string }) => {
      const { data, error } = await supabase
        .from("slider_images")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slider_images"] });
      toast({ title: "Image updated", description: "Slider image has been updated successfully." });
    },
    onError: (error) => {
      toast({ title: "Error updating image", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteSliderImage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("slider_images")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slider_images"] });
      toast({ title: "Image deleted", description: "Slider image has been removed." });
    },
    onError: (error) => {
      toast({ title: "Error deleting image", description: error.message, variant: "destructive" });
    },
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Testimonial {
  id: string;
  customer_name: string;
  location: string | null;
  rating: number;
  review_text: string;
  avatar_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useTestimonials = (activeOnly = false) => {
  return useQuery({
    queryKey: ["testimonials", activeOnly],
    queryFn: async () => {
      let query = supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (activeOnly) {
        query = query.eq("is_active", true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Testimonial[];
    },
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (testimonial: Omit<Testimonial, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("testimonials")
        .insert(testimonial)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Testimonial added", description: "The testimonial has been published." });
    },
    onError: (error) => {
      toast({ title: "Error adding testimonial", description: error.message, variant: "destructive" });
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Testimonial> & { id: string }) => {
      const { data, error } = await supabase
        .from("testimonials")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Testimonial updated", description: "Your changes have been saved." });
    },
    onError: (error) => {
      toast({ title: "Error updating testimonial", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Testimonial deleted", description: "The testimonial has been removed." });
    },
    onError: (error) => {
      toast({ title: "Error deleting testimonial", description: error.message, variant: "destructive" });
    },
  });
};

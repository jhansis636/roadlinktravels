import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BannerImage {
  id: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BannerSettings {
  id: string;
  mode: "single" | "slider";
  slide_duration: number;
  transition_effect: "fade" | "slide";
}

export const useBannerImages = (activeOnly = true) => {
  return useQuery({
    queryKey: ["banner_images", activeOnly],
    queryFn: async () => {
      let query = supabase
        .from("banner_images")
        .select("*")
        .order("display_order", { ascending: true });
      if (activeOnly) query = query.eq("is_active", true);
      const { data, error } = await query;
      if (error) throw error;
      return data as BannerImage[];
    },
  });
};

export const useBannerSettings = () => {
  return useQuery({
    queryKey: ["banner_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("banner_settings")
        .select("*")
        .limit(1)
        .single();
      if (error) throw error;
      return data as BannerSettings;
    },
  });
};

export const useCreateBannerImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { image_url: string; title?: string | null; subtitle?: string | null; display_order: number; is_active?: boolean }) => {
      const { data, error } = await supabase.from("banner_images").insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["banner_images"] }),
  });
};

export const useUpdateBannerImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BannerImage> & { id: string }) => {
      const { data, error } = await supabase.from("banner_images").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["banner_images"] }),
  });
};

export const useDeleteBannerImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("banner_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["banner_images"] }),
  });
};

export const useUpdateBannerSettings = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (updates: Partial<Omit<BannerSettings, "id">>) => {
      const { data: existing } = await supabase.from("banner_settings").select("id").limit(1).single();
      if (!existing) throw new Error("No settings row");
      const { data, error } = await supabase.from("banner_settings").update(updates).eq("id", existing.id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["banner_settings"] }),
  });
};

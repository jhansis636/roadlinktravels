import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface TourPlaceImage {
  id: string;
  page_slug: string;
  place_name: string;
  image_url: string;
}

export const useAllTourPlaceImages = () => {
  return useQuery({
    queryKey: ["tour_place_images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tour_place_images")
        .select("id, page_slug, place_name, image_url");
      if (error) throw error;
      return (data || []) as TourPlaceImage[];
    },
    staleTime: 60_000,
  });
};

export const useTourPlaceImagesByPage = (pageSlug: string) => {
  return useQuery({
    queryKey: ["tour_place_images", pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tour_place_images")
        .select("id, page_slug, place_name, image_url")
        .eq("page_slug", pageSlug);
      if (error) throw error;
      return (data || []) as TourPlaceImage[];
    },
    enabled: !!pageSlug,
  });
};

export const useUpsertTourPlaceImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { page_slug: string; place_name: string; image_url: string }) => {
      const { data, error } = await supabase
        .from("tour_place_images")
        .upsert(payload, { onConflict: "page_slug,place_name" })
        .select()
        .single();
      if (error) throw error;
      return data as TourPlaceImage;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["tour_place_images"] });
      qc.invalidateQueries({ queryKey: ["tour_place_images", vars.page_slug] });
      toast({ title: "Image saved" });
    },
    onError: (e: any) => toast({ title: "Save failed", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteTourPlaceImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tour_place_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tour_place_images"] });
      toast({ title: "Image removed" });
    },
    onError: (e: any) => toast({ title: "Delete failed", description: e.message, variant: "destructive" }),
  });
};
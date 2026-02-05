import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export interface PageContent {
  id: string;
  page_name: string;
  section_key: string;
  section_order: number;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  metadata: Json;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const usePageContent = (pageName?: string) => {
  return useQuery({
    queryKey: ["page_content", pageName],
    queryFn: async () => {
      let query = supabase
        .from("page_content")
        .select("*")
        .order("section_order", { ascending: true });
      
      if (pageName) {
        query = query.eq("page_name", pageName);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as PageContent[];
    },
  });
};

export const useUpsertPageContent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (content: Partial<PageContent> & { page_name: string; section_key: string }) => {
      const payload = {
        page_name: content.page_name,
        section_key: content.section_key,
        section_order: content.section_order ?? 0,
        title: content.title ?? null,
        subtitle: content.subtitle ?? null,
        content: content.content ?? null,
        image_url: content.image_url ?? null,
        metadata: content.metadata ?? {},
        is_active: content.is_active ?? true,
      };
      
      const { data, error } = await supabase
        .from("page_content")
        .upsert([payload], { onConflict: "page_name,section_key" })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page_content"] });
      toast({ title: "Content saved", description: "Your changes have been published." });
    },
    onError: (error) => {
      toast({ title: "Error saving content", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeletePageContent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("page_content")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page_content"] });
      toast({ title: "Section deleted", description: "The section has been removed." });
    },
    onError: (error) => {
      toast({ title: "Error deleting section", description: error.message, variant: "destructive" });
    },
  });
};

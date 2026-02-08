import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PageVideo {
  id: string;
  page_name: string;
  youtube_url: string;
  title: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const usePageVideos = (pageName?: string, activeOnly = false) => {
  return useQuery({
    queryKey: ["page_videos", pageName, activeOnly],
    queryFn: async () => {
      let query = supabase
        .from("page_videos")
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
      return data as PageVideo[];
    },
  });
};

export const useCreatePageVideo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (video: Omit<PageVideo, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("page_videos")
        .insert(video)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page_videos"] });
      toast({ title: "Video added", description: "The video has been published." });
    },
    onError: (error) => {
      toast({ title: "Error adding video", description: error.message, variant: "destructive" });
    },
  });
};

export const useUpdatePageVideo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PageVideo> & { id: string }) => {
      const { data, error } = await supabase
        .from("page_videos")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page_videos"] });
      toast({ title: "Video updated", description: "Your changes have been saved." });
    },
    onError: (error) => {
      toast({ title: "Error updating video", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeletePageVideo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("page_videos")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page_videos"] });
      toast({ title: "Video deleted", description: "The video has been removed." });
    },
    onError: (error) => {
      toast({ title: "Error deleting video", description: error.message, variant: "destructive" });
    },
  });
};

// Helper to extract YouTube video ID from various URL formats
export const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

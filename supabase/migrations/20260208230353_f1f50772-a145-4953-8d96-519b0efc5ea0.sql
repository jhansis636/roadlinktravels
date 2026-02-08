-- Create a table for page videos (YouTube URLs)
CREATE TABLE public.page_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  title TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_name, youtube_url)
);

-- Enable RLS
ALTER TABLE public.page_videos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage page videos"
ON public.page_videos
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can read active page videos"
ON public.page_videos
FOR SELECT
USING (is_active = true);

-- Add trigger for updated_at
CREATE TRIGGER update_page_videos_updated_at
BEFORE UPDATE ON public.page_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
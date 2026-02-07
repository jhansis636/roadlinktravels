-- Create slider_images table for managing page sliders
CREATE TABLE public.slider_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.slider_images ENABLE ROW LEVEL SECURITY;

-- Admins can manage all slider images
CREATE POLICY "Admins can manage slider images"
ON public.slider_images
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can read active slider images
CREATE POLICY "Anyone can read active slider images"
ON public.slider_images
FOR SELECT
USING (is_active = true);

-- Add trigger for updated_at
CREATE TRIGGER update_slider_images_updated_at
BEFORE UPDATE ON public.slider_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
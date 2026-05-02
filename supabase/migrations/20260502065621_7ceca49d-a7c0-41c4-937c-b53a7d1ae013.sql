-- Table for admin-managed place images per tour package page
CREATE TABLE public.tour_place_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL,
  place_name TEXT NOT NULL,
  image_url TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (page_slug, place_name)
);

ALTER TABLE public.tour_place_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tour place images"
ON public.tour_place_images FOR SELECT
USING (true);

CREATE POLICY "Admins can insert tour place images"
ON public.tour_place_images FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update tour place images"
ON public.tour_place_images FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete tour place images"
ON public.tour_place_images FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_tour_place_images_updated_at
BEFORE UPDATE ON public.tour_place_images
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_tour_place_images_page ON public.tour_place_images(page_slug);
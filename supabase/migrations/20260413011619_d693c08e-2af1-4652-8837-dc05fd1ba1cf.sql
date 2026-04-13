
-- Banner images table
CREATE TABLE public.banner_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.banner_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active banner images"
ON public.banner_images FOR SELECT
USING (true);

CREATE POLICY "Admins can insert banner images"
ON public.banner_images FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update banner images"
ON public.banner_images FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete banner images"
ON public.banner_images FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Banner settings table (single row)
CREATE TABLE public.banner_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mode TEXT NOT NULL DEFAULT 'single' CHECK (mode IN ('single', 'slider')),
  slide_duration INT NOT NULL DEFAULT 4,
  transition_effect TEXT NOT NULL DEFAULT 'fade' CHECK (transition_effect IN ('fade', 'slide')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.banner_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view banner settings"
ON public.banner_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can insert banner settings"
ON public.banner_settings FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update banner settings"
ON public.banner_settings FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default settings
INSERT INTO public.banner_settings (mode, slide_duration, transition_effect)
VALUES ('single', 4, 'fade');

-- Triggers for updated_at
CREATE TRIGGER update_banner_images_updated_at
BEFORE UPDATE ON public.banner_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_banner_settings_updated_at
BEFORE UPDATE ON public.banner_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

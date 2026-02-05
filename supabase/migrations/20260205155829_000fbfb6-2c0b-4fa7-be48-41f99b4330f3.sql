-- Create table for page content sections
CREATE TABLE public.page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL,
  section_key TEXT NOT NULL,
  section_order INTEGER NOT NULL DEFAULT 0,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_name, section_key)
);

-- Enable RLS
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Public can read active content
CREATE POLICY "Anyone can read active content"
ON public.page_content
FOR SELECT
USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can manage all content"
ON public.page_content
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_page_content_updated_at
BEFORE UPDATE ON public.page_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create table for testimonials (separate for easier management)
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  location TEXT,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  avatar_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can read active testimonials
CREATE POLICY "Anyone can read active testimonials"
ON public.testimonials
FOR SELECT
USING (is_active = true);

-- Admins can manage testimonials
CREATE POLICY "Admins can manage testimonials"
ON public.testimonials
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create table for services
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT,
  image_url TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public can read active services
CREATE POLICY "Anyone can read active services"
ON public.services
FOR SELECT
USING (is_active = true);

-- Admins can manage services
CREATE POLICY "Admins can manage services"
ON public.services
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
-- Create vehicles table for dynamic vehicle management
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  capacity TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Admins can manage vehicles
CREATE POLICY "Admins can manage vehicles" 
ON public.vehicles 
FOR ALL 
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Anyone can read active vehicles
CREATE POLICY "Anyone can read active vehicles" 
ON public.vehicles 
FOR SELECT 
USING (is_active = true);

-- Add trigger for updated_at
CREATE TRIGGER update_vehicles_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default vehicles
INSERT INTO public.vehicles (name, capacity, display_order) VALUES
('Honda Amaze', '4 Seater', 1),
('Ertiga', '7 Seater', 2),
('Innova Crysta', '7 Seater', 3),
('Innova Hycross', '7 Seater', 4),
('Tempo Traveller', '14 or 18 Seater', 5),
('Force Urbania', '12 or 18 Seater', 6),
('Mini Coach Van', '20 Seater', 7),
('Tourist Bus', '45 Seater', 8);
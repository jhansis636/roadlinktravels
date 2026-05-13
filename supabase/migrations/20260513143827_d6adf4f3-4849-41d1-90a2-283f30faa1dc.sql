-- Add is_luxury column to vehicles table
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS is_luxury BOOLEAN NOT NULL DEFAULT false;

-- Add description column to vehicles table
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Insert luxury sedan vehicles
INSERT INTO public.vehicles (name, image_url, capacity, rating, display_order, is_active, is_luxury, description)
VALUES
  ('Audi', NULL, '5 Seats', 5, 10, true, true, 'Executive luxury sedan with premium comfort.'),
  ('Mercedes-Benz', NULL, '5 Seats', 5, 11, true, true, 'Elite chauffeur experience with unmatched elegance.'),
  ('BMW', NULL, '5 Seats', 5, 12, true, true, 'Performance luxury sedan for business and leisure travel.'),
  ('Jaguar', NULL, '5 Seats', 5, 13, true, true, 'Refined British luxury with superior comfort.');
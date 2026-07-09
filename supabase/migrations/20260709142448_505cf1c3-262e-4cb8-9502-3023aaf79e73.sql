
-- 1. Extend customers
ALTER TABLE public.customers
  ADD COLUMN IF NOT EXISTS department TEXT;

-- 2. Vehicle tariffs
CREATE TABLE IF NOT EXISTS public.vehicle_tariffs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_type TEXT NOT NULL UNIQUE,
  day_rent NUMERIC,
  per_km_rate NUMERIC,
  extra_km_rate NUMERIC,
  driver_bata NUMERIC,
  per_hour_rate NUMERIC,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.vehicle_tariffs TO authenticated;
GRANT ALL ON public.vehicle_tariffs TO service_role;

ALTER TABLE public.vehicle_tariffs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage vehicle tariffs"
  ON public.vehicle_tariffs FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_vehicle_tariffs_updated_at
  BEFORE UPDATE ON public.vehicle_tariffs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Enquiries
CREATE SEQUENCE IF NOT EXISTS public.enquiry_no_seq START 1;

CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_no TEXT UNIQUE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  date_from DATE,
  date_to DATE,
  total_days INT,
  pickup_location TEXT,
  drop_place TEXT,
  vehicle_type TEXT,
  category TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  remarks TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage enquiries"
  ON public.enquiries FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.generate_enquiry_no()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.enquiry_no IS NULL OR NEW.enquiry_no = '' THEN
    NEW.enquiry_no := 'ENQ' || lpad(nextval('public.enquiry_no_seq')::text, 6, '0');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_enquiry_no
  BEFORE INSERT ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.generate_enquiry_no();

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Seed vehicle tariffs
INSERT INTO public.vehicle_tariffs (vehicle_type, day_rent, per_km_rate, extra_km_rate, driver_bata, per_hour_rate, sort_order) VALUES
  ('Swift', 2600, 13, 12, 400, 260, 10),
  ('Etios', 2600, 13, 12, 400, 260, 20),
  ('Ciaz or Amaze', 3000, 14, 13, 400, 300, 30),
  ('Ertiga', 3200, 17, 14, 400, 320, 40),
  ('Innova', 3400, 18, 16, 500, 340, 50),
  ('Crysta', 4600, 20, 17, 500, 460, 60),
  ('Hycross', 5100, 22, 18, 500, 510, 70),
  ('Audi', 13000, 85, 75, 900, 1300, 80),
  ('Benz', 13000, 85, 75, 900, 1300, 90),
  ('BMW', 13000, 85, 75, 900, 1300, 100),
  ('Jaguar', 13000, 85, 75, 900, 1300, 110),
  ('Tempo Traveller', 5000, 30, 20, 600, 500, 120),
  ('Urbania', 6500, 38, 30, 600, 650, 130),
  ('Coach Van', 5500, 45, 40, 800, 550, 140)
ON CONFLICT (vehicle_type) DO NOTHING;

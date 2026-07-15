
CREATE TABLE public.driver_bills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_bill_id uuid UNIQUE REFERENCES public.bills(id) ON DELETE SET NULL,
  bill_no text NOT NULL,
  bill_date date NOT NULL DEFAULT CURRENT_DATE,
  bill_category text,
  trip_type text,
  customer_name text NOT NULL,
  driver_name text,
  customer_phone text,
  customer_address text,
  pickup text,
  drop_location text,
  place text,
  vehicle_type text,
  vehicle_number text,
  start_date date,
  end_date date,
  total_days integer,
  start_time text,
  end_time text,
  total_time_minutes integer,
  start_km numeric,
  end_km numeric,
  total_km numeric,
  trip_amount numeric,
  day_rent numeric,
  driver_bata numeric,
  night_halt numeric,
  parking numeric,
  tollgate numeric,
  permit numeric,
  extra_hours numeric,
  extra_hours_amount numeric,
  extra_km numeric,
  extra_km_amount numeric,
  other_charges numeric,
  advance numeric,
  total_amount numeric,
  balance numeric,
  status text NOT NULL DEFAULT 'draft',
  remarks text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.driver_bills TO authenticated;
GRANT ALL ON public.driver_bills TO service_role;

ALTER TABLE public.driver_bills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read driver_bills" ON public.driver_bills FOR SELECT USING (true);
CREATE POLICY "Public insert driver_bills" ON public.driver_bills FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update driver_bills" ON public.driver_bills FOR UPDATE USING (true);
CREATE POLICY "Public delete driver_bills" ON public.driver_bills FOR DELETE USING (true);

CREATE TRIGGER update_driver_bills_updated_at
BEFORE UPDATE ON public.driver_bills
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

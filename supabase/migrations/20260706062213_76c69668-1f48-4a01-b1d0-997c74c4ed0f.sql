-- Customers table
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT ALL ON public.customers TO service_role;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage customers" ON public.customers
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Sequence for bill numbers (RL000001 …)
CREATE SEQUENCE IF NOT EXISTS public.bill_no_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_bill_no()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.bill_no IS NULL OR NEW.bill_no = '' THEN
    NEW.bill_no := 'RL' || lpad(nextval('public.bill_no_seq')::text, 6, '0');
  END IF;
  RETURN NEW;
END;
$$;

-- Bills table
CREATE TABLE public.bills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bill_no TEXT UNIQUE,
  bill_date DATE NOT NULL DEFAULT CURRENT_DATE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  place TEXT,
  vehicle_type TEXT,
  vehicle_number TEXT,
  start_time TEXT,
  end_time TEXT,
  total_time_minutes INTEGER,
  extra_hours_enabled BOOLEAN NOT NULL DEFAULT false,
  extra_hours NUMERIC,
  start_km NUMERIC,
  end_km NUMERIC,
  total_km NUMERIC,
  per_km_rate NUMERIC,
  start_date DATE,
  end_date DATE,
  total_days INTEGER,
  parking_tollgate NUMERIC,
  permit NUMERIC,
  night_halt NUMERIC,
  extra_km NUMERIC,
  advance NUMERIC,
  remarks TEXT,
  total_amount NUMERIC,
  balance NUMERIC,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bills TO authenticated;
GRANT ALL ON public.bills TO service_role;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage bills" ON public.bills
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_bills_bill_no
  BEFORE INSERT ON public.bills
  FOR EACH ROW EXECUTE FUNCTION public.generate_bill_no();

CREATE TRIGGER trg_bills_updated_at
  BEFORE UPDATE ON public.bills
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_bills_date ON public.bills(bill_date DESC);
CREATE INDEX idx_bills_customer ON public.bills(customer_id);
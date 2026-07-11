
ALTER TABLE public.bills
  ADD COLUMN IF NOT EXISTS trip_type text,
  ADD COLUMN IF NOT EXISTS pickup text,
  ADD COLUMN IF NOT EXISTS drop_location text,
  ADD COLUMN IF NOT EXISTS day_rent numeric,
  ADD COLUMN IF NOT EXISTS driver_bata numeric,
  ADD COLUMN IF NOT EXISTS extra_hours_amount numeric,
  ADD COLUMN IF NOT EXISTS extra_km_amount numeric,
  ADD COLUMN IF NOT EXISTS customer_phone text,
  ADD COLUMN IF NOT EXISTS customer_address text;

ALTER TABLE public.vehicle_tariffs
  ADD COLUMN IF NOT EXISTS half_day_rate numeric,
  ADD COLUMN IF NOT EXISTS pickup_drop_rate numeric;

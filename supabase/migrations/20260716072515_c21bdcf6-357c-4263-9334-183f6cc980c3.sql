ALTER TABLE public.bills ADD COLUMN IF NOT EXISTS department text;
ALTER TABLE public.driver_bills ADD COLUMN IF NOT EXISTS department text;
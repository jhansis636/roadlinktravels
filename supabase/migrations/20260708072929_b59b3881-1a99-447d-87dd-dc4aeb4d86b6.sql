ALTER TABLE public.bills 
  ADD COLUMN IF NOT EXISTS bill_category text,
  ADD COLUMN IF NOT EXISTS billing_basis text NOT NULL DEFAULT 'kilometer';
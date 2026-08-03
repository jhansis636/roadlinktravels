DROP POLICY IF EXISTS "Public read driver_bills" ON public.driver_bills;
DROP POLICY IF EXISTS "Public insert driver_bills" ON public.driver_bills;
DROP POLICY IF EXISTS "Public update driver_bills" ON public.driver_bills;
DROP POLICY IF EXISTS "Public delete driver_bills" ON public.driver_bills;

REVOKE ALL ON public.driver_bills FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.driver_bills TO authenticated;
GRANT ALL ON public.driver_bills TO service_role;

CREATE POLICY "Admins manage driver_bills"
ON public.driver_bills
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Users can check their own role" ON public.user_roles;
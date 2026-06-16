
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
CREATE POLICY "Anyone can create valid bookings"
ON public.bookings FOR INSERT TO anon, authenticated
WITH CHECK (
  length(customer_name) BETWEEN 2 AND 100
  AND length(phone_number) BETWEEN 10 AND 15
  AND length(pickup_location) BETWEEN 2 AND 200
  AND length(destination) BETWEEN 2 AND 200
  AND (email IS NULL OR length(email) <= 255)
);

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_customer_name_len CHECK (length(customer_name) BETWEEN 2 AND 100),
  ADD CONSTRAINT bookings_phone_len CHECK (length(phone_number) BETWEEN 10 AND 15),
  ADD CONSTRAINT bookings_email_len CHECK (email IS NULL OR length(email) <= 255),
  ADD CONSTRAINT bookings_pickup_len CHECK (length(pickup_location) BETWEEN 2 AND 200),
  ADD CONSTRAINT bookings_destination_len CHECK (length(destination) BETWEEN 2 AND 200);

CREATE POLICY "Admins can insert user roles"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update user roles"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete user roles"
ON public.user_roles FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

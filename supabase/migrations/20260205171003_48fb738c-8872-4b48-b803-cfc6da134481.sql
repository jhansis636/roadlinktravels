-- Drop existing restrictive policies and recreate as permissive
-- This allows admins full access OR public read access for active content

-- PAGE_CONTENT TABLE
DROP POLICY IF EXISTS "Admins can manage all content" ON public.page_content;
DROP POLICY IF EXISTS "Anyone can read active content" ON public.page_content;

-- Create permissive policies for page_content
CREATE POLICY "Admins can manage all content"
ON public.page_content
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can read active content"
ON public.page_content
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- SERVICES TABLE
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
DROP POLICY IF EXISTS "Anyone can read active services" ON public.services;

-- Create permissive policies for services
CREATE POLICY "Admins can manage services"
ON public.services
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can read active services"
ON public.services
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- TESTIMONIALS TABLE
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can read active testimonials" ON public.testimonials;

-- Create permissive policies for testimonials
CREATE POLICY "Admins can manage testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can read active testimonials"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- BOOKINGS TABLE - also fix these
DROP POLICY IF EXISTS "Admins can delete bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- Create permissive policies for bookings
CREATE POLICY "Admins can view all bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
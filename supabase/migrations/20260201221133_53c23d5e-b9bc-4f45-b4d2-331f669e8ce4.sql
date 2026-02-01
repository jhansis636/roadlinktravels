-- Create enum for booking status
CREATE TYPE public.booking_status AS ENUM ('new', 'confirmed', 'completed');

-- Create enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin');

-- Create bookings table (public can insert, only admins can view/manage)
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status booking_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on both tables
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check if user has admin role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Bookings RLS Policies
-- Anyone can insert a booking (public booking form)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Only admins can view bookings
CREATE POLICY "Admins can view all bookings"
ON public.bookings
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update bookings
CREATE POLICY "Admins can update bookings"
ON public.bookings
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete bookings
CREATE POLICY "Admins can delete bookings"
ON public.bookings
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- User roles RLS policies
-- Only admins can view roles
CREATE POLICY "Admins can view roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
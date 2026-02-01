-- Allow users to check their own role
CREATE POLICY "Users can check their own role"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);
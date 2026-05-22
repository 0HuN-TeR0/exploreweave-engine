
-- Restrict execution of security definer helpers
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;

-- Restrict media bucket listing to admins (individual file reads still public via URL)
DROP POLICY IF EXISTS "media_public_read" ON storage.objects;
CREATE POLICY "media_admin_list" ON storage.objects FOR SELECT
  USING (bucket_id = 'media' AND public.is_admin(auth.uid()));

-- Validate inquiry submissions to prevent abuse
CREATE OR REPLACE FUNCTION public.validate_inquiry()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF length(NEW.name) < 1 OR length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Invalid name length';
  END IF;
  IF length(NEW.email) < 5 OR length(NEW.email) > 200 OR NEW.email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;
  IF length(NEW.message) < 1 OR length(NEW.message) > 2000 THEN
    RAISE EXCEPTION 'Invalid message length';
  END IF;
  IF NEW.phone IS NOT NULL AND length(NEW.phone) > 30 THEN
    RAISE EXCEPTION 'Invalid phone';
  END IF;
  NEW.status := 'new';
  RETURN NEW;
END; $$;

CREATE TRIGGER trg_validate_inquiry BEFORE INSERT ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.validate_inquiry();

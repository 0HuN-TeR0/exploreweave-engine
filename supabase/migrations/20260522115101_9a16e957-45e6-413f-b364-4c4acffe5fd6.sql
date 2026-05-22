
-- Roles enum
CREATE TYPE public.app_role AS ENUM ('owner', 'admin');

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- User roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer role checker
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('owner','admin'))
$$;

-- Tours
CREATE TABLE public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  image_url TEXT,
  duration TEXT,
  location TEXT,
  group_size TEXT,
  price TEXT,
  difficulty TEXT,
  rating NUMERIC(2,1) DEFAULT 4.8,
  reviews INTEGER DEFAULT 0,
  short_description TEXT,
  long_description TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;

-- Site content
CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Inquiries
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  tour_id UUID REFERENCES public.tours(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Admin invites
CREATE TABLE public.admin_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_invites ENABLE ROW LEVEL SECURITY;

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_tours_updated BEFORE UPDATE ON public.tours
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_site_content_updated BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create profile + assign owner role to first user, or consume invite
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  user_count INTEGER;
  invite_token TEXT;
  invite_record public.admin_invites%ROWTYPE;
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)));

  SELECT count(*) INTO user_count FROM public.user_roles WHERE role = 'owner';

  IF user_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'owner');
  ELSE
    invite_token := NEW.raw_user_meta_data->>'invite_token';
    IF invite_token IS NOT NULL THEN
      SELECT * INTO invite_record FROM public.admin_invites
        WHERE token = invite_token AND used_at IS NULL AND expires_at > now() AND lower(email) = lower(NEW.email);
      IF FOUND THEN
        INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
        UPDATE public.admin_invites SET used_at = now() WHERE id = invite_record.id;
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS POLICIES

-- profiles
CREATE POLICY "profiles_self_select" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin(auth.uid()));
CREATE POLICY "profiles_self_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- user_roles
CREATE POLICY "roles_admin_select" ON public.user_roles FOR SELECT USING (public.is_admin(auth.uid()) OR user_id = auth.uid());
CREATE POLICY "roles_owner_insert" ON public.user_roles FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'owner'));
CREATE POLICY "roles_owner_delete" ON public.user_roles FOR DELETE USING (public.has_role(auth.uid(), 'owner') AND role <> 'owner');

-- tours
CREATE POLICY "tours_public_read" ON public.tours FOR SELECT USING (published = true OR public.is_admin(auth.uid()));
CREATE POLICY "tours_admin_insert" ON public.tours FOR INSERT WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "tours_admin_update" ON public.tours FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "tours_admin_delete" ON public.tours FOR DELETE USING (public.is_admin(auth.uid()));

-- site_content
CREATE POLICY "content_public_read" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "content_admin_write" ON public.site_content FOR INSERT WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "content_admin_update" ON public.site_content FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "content_admin_delete" ON public.site_content FOR DELETE USING (public.is_admin(auth.uid()));

-- inquiries
CREATE POLICY "inquiries_public_insert" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "inquiries_admin_select" ON public.inquiries FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "inquiries_admin_update" ON public.inquiries FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "inquiries_admin_delete" ON public.inquiries FOR DELETE USING (public.is_admin(auth.uid()));

-- admin_invites
CREATE POLICY "invites_admin_select" ON public.admin_invites FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "invites_admin_insert" ON public.admin_invites FOR INSERT WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "invites_admin_delete" ON public.admin_invites FOR DELETE USING (public.is_admin(auth.uid()));

-- Storage bucket for media
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "media_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "media_admin_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND public.is_admin(auth.uid()));
CREATE POLICY "media_admin_update" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND public.is_admin(auth.uid()));
CREATE POLICY "media_admin_delete" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND public.is_admin(auth.uid()));

-- Seed default site content
INSERT INTO public.site_content (key, value) VALUES
  ('hero', '{"title":"MTB TOURS NEPAL","subtitle":"World''s best mountain bike tours in the Himalayas","cta":"Explore Tours"}'),
  ('marquee', '{"text":"HIMALAYAN TRAILS • EPIC DESCENTS • EXPERT GUIDES • SMALL GROUPS • UNFORGETTABLE RIDES"}'),
  ('about', '{"title":"Locally Owned. Locally Operated.","body":"We are a Nepali-owned mountain biking company with decades of riding experience in the Himalayas."}'),
  ('footer', '{"text":"© MTB Tours Nepal. All rights reserved.","email":"info@mtbtoursnepal.com","phone":"+977 000 000 000"}')
ON CONFLICT (key) DO NOTHING;

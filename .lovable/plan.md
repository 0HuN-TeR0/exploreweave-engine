## Admin Panel for MTB Tours Nepal

Build a WordPress-style admin panel where non-technical owners can manage everything, with the public site staying open and the admin area locked down.

### What the admin can manage
1. **Tours** — create / edit / delete tours (title, image, duration, location, group size, price, difficulty, description, rating)
2. **Site content** — hero headline & subtext, scrolling marquee text, about section, footer text (key/value content store)
3. **Media library** — upload images, browse, copy URL, delete
4. **Bookings / inquiries inbox** — view contact-form submissions, mark as read/archived
5. **Admin users** — owner invites additional admins by email; can revoke

### Access model
- Public site (`/`, `/tours`, `/tours/:id`) stays open to everyone
- `/admin/*` requires login **and** the `admin` role
- First user to sign up becomes owner automatically; after that, signup is closed and new admins must be invited from the panel
- A public contact form on tour-detail pages writes into the inquiries table

### Database (Lovable Cloud)
- `profiles` — id (FK auth.users), email, display_name, created_at
- `user_roles` — id, user_id, role (enum: admin, owner) — separate table to prevent privilege escalation
- `tours` — id, slug, title, image_url, duration, location, group_size, price, difficulty, rating, reviews, short_description, long_description, published, sort_order, created_at, updated_at
- `site_content` — key (PK, text), value (jsonb), updated_at — for hero/marquee/about/footer copy
- `inquiries` — id, name, email, phone, tour_id (nullable), message, status (new/read/archived), created_at
- `admin_invites` — id, email, token, invited_by, expires_at, used_at
- Storage bucket `media` (public read, admin-only write)
- Security definer function `has_role(user_id, role)` to avoid recursive RLS
- Trigger on first signup → assign `owner` role + close signups; later signups only accepted if a matching invite exists

### RLS
- `tours`, `site_content`: public can SELECT published rows; only admins INSERT/UPDATE/DELETE
- `inquiries`: anyone can INSERT; only admins can SELECT/UPDATE/DELETE
- `profiles`: user reads own + admins read all
- `user_roles`: only admins read/write
- `media` bucket: public read, admin write/delete

### Frontend
- `/auth` — login + accept-invite signup (token in URL)
- `/admin` — dashboard with stats
- `/admin/tours` + `/admin/tours/new` + `/admin/tours/:id/edit`
- `/admin/content` — edit hero, marquee, about, footer inline
- `/admin/media` — upload, grid, copy-URL, delete
- `/admin/inquiries` — inbox list + detail drawer
- `/admin/users` — list admins, send invite, revoke
- `ProtectedRoute` wrapper checks session + admin role; redirects to `/auth`
- Public pages refactored to read tours + site_content from the database (with sensible fallbacks while empty)
- Inquiry form added to TourDetail page

### Security
- `onAuthStateChange` listener set up before `getSession` (avoids stale session bugs)
- Roles stored in dedicated `user_roles` table, checked via `has_role()` security-definer function
- All admin mutations gated by RLS (not just UI)
- Invite tokens are random 32-byte values, single-use, 7-day expiry
- Zod validation on all forms (lengths, email format, sanitised text)
- Auto session refresh + logout on token expiry
- Bookings list never exposed in client-side public bundles

### Build order
1. Migration: enum, tables, RLS, trigger, storage bucket
2. Auth pages + `ProtectedRoute` + role hook
3. Admin layout + dashboard
4. Tours CRUD page
5. Site content editor
6. Media library
7. Inquiries inbox + invite system
8. Refactor public Index/Tours/TourDetail to read from DB + add inquiry form

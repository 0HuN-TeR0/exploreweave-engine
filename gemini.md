# Data Schema and Logic

## 1. Supabase Collections & Schemas

### `site_content`
Used for global SEO settings and static content.
- `key`: "seo_settings"
- `value`: (JSONB)
  ```json
  {
    "global_title": "MTB Tours Nepal",
    "global_description": "Explore the Himalayas on premium mountain bikes.",
    "global_keywords": "MTB, Nepal, Mountain Biking, Himalayas",
    "og_image": "https://url.to/image.jpg"
  }
  ```

### `tours`
Used for individual tours. We will add specific SEO columns via a Supabase migration to store page-specific meta tags.
- `seo_title` (text)
- `seo_description` (text)
- `seo_keywords` (text)

## 2. Payload Shape
- **Frontend App**: React SPA compiled by Vite.
- **Routing**: Transition from `HashRouter` to `BrowserRouter` to enable clean URLs (`/tours/abc` instead of `/#/tours/abc`), which is critical for proper SEO bot crawling.
- **Deployment**: Static Site on Render with rewrite rule `/* -> /index.html`.

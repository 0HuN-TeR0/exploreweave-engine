import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export function SEO({ title, description, keywords, ogImage }: SEOProps) {
  const siteTitle = title ? `${title} | MTB Tours Nepal` : "MTB Tours Nepal";
  const defaultDesc = "Explore the Himalayas on premium mountain bikes.";

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />
    </Helmet>
  );
}

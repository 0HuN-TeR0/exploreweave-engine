import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useSiteContent = () => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("site_content").select("*").then(({ data }) => {
      const map: Record<string, any> = {};
      data?.forEach((r: any) => (map[r.key] = r.value));
      setContent(map);
      setLoading(false);
    });
  }, []);
  return { content, loading };
};

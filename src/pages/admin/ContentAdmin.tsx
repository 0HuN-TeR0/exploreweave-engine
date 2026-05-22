import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Section = { key: string; label: string; fields: { name: string; label: string; type?: "text" | "textarea" }[] };

const sections: Section[] = [
  { key: "hero", label: "Hero (homepage banner)", fields: [
    { name: "title", label: "Title" },
    { name: "subtitle", label: "Subtitle", type: "textarea" },
    { name: "cta", label: "Button text" },
  ]},
  { key: "marquee", label: "Marquee (scrolling text)", fields: [
    { name: "text", label: "Scrolling text", type: "textarea" },
  ]},
  { key: "about", label: "About section", fields: [
    { name: "title", label: "Title" },
    { name: "body", label: "Body", type: "textarea" },
  ]},
  { key: "footer", label: "Footer", fields: [
    { name: "text", label: "Footer text" },
    { name: "email", label: "Contact email" },
    { name: "phone", label: "Phone" },
  ]},
];

const ContentAdmin = () => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_content").select("*");
      const map: Record<string, any> = {};
      data?.forEach((r) => (map[r.key] = r.value));
      setValues(map);
      setLoading(false);
    })();
  }, []);

  const save = async (key: string) => {
    const { error } = await supabase.from("site_content").upsert({ key, value: values[key] ?? {} });
    if (error) toast.error(error.message); else toast.success(`${key} saved`);
  };

  if (loading) return <AdminLayout><div>Loading…</div></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-4xl font-black uppercase mb-6">Site Content</h1>
      <div className="space-y-8 max-w-2xl">
        {sections.map((s) => (
          <div key={s.key} className="border border-border p-6">
            <h2 className="text-xl font-bold uppercase mb-4">{s.label}</h2>
            <div className="space-y-3">
              {s.fields.map((f) => (
                <div key={f.name}>
                  <Label>{f.label}</Label>
                  {f.type === "textarea" ? (
                    <Textarea
                      rows={3}
                      value={values[s.key]?.[f.name] ?? ""}
                      onChange={(e) => setValues({ ...values, [s.key]: { ...values[s.key], [f.name]: e.target.value } })}
                    />
                  ) : (
                    <Input
                      value={values[s.key]?.[f.name] ?? ""}
                      onChange={(e) => setValues({ ...values, [s.key]: { ...values[s.key], [f.name]: e.target.value } })}
                    />
                  )}
                </div>
              ))}
              <Button onClick={() => save(s.key)}>Save {s.label}</Button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ContentAdmin;

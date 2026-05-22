import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";

type Tour = {
  id: string;
  slug: string;
  title: string;
  image_url: string | null;
  duration: string | null;
  location: string | null;
  group_size: string | null;
  price: string | null;
  difficulty: string | null;
  rating: number | null;
  reviews: number | null;
  short_description: string | null;
  long_description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  published: boolean;
  sort_order: number;
};

const empty = (): Partial<Tour> => ({
  slug: "", title: "", image_url: "", duration: "", location: "", group_size: "",
  price: "", difficulty: "Moderate", rating: 4.8, reviews: 0, short_description: "",
  long_description: "", seo_title: "", seo_description: "", seo_keywords: "", published: true, sort_order: 0,
});

const ToursAdmin = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [editing, setEditing] = useState<Partial<Tour> | null>(null);

  const load = async () => {
    const { data, error } = await supabase.from("tours").select("*").order("sort_order").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setTours(data as Tour[]);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    if (!editing.title || !editing.slug) { toast.error("Title and slug are required"); return; }
    const payload = { ...editing, slug: editing.slug!.toLowerCase().replace(/[^a-z0-9-]/g, "-") };
    const { error } = editing.id
      ? await supabase.from("tours").update(payload).eq("id", editing.id)
      : await supabase.from("tours").insert(payload as any);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); setEditing(null); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this tour?")) return;
    const { error } = await supabase.from("tours").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); load(); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight">Tours</h1>
          <p className="text-muted-foreground mt-2">Manage your tour catalog and their SEO settings.</p>
        </div>
        <Button className="rounded-xl shadow-lg shadow-primary/25" onClick={() => setEditing(empty())}><Plus className="h-4 w-4 mr-2" />New tour</Button>
      </div>

      <div className="bg-card/40 backdrop-blur-md border border-border/50 shadow-xl rounded-2xl overflow-hidden">
        {tours.length === 0 && <div className="p-10 text-center text-muted-foreground">No tours yet. Add your first one.</div>}
        <div className="divide-y divide-border/50">
        {tours.map((t) => (
          <div key={t.id} className="p-4 md:p-6 flex items-center gap-6 hover:bg-card/60 transition-colors">
            {t.image_url ? (
              <img src={t.image_url} alt={t.title} className="h-16 w-24 md:h-20 md:w-32 object-cover rounded-lg shadow-md" />
            ) : (
              <div className="h-16 w-24 md:h-20 md:w-32 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">No image</div>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg truncate mb-1">{t.title}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-medium">{t.published ? "Published" : "Draft"}</span>
                <span>•</span>
                <span>{t.location}</span>
                <span>•</span>
                <span>{t.duration}</span>
                <span>•</span>
                <span className="font-semibold">${t.price}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-xl" onClick={() => setEditing(t)}><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="outline" className="rounded-xl hover:bg-destructive hover:text-destructive-foreground hover:border-destructive" onClick={() => remove(t.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto p-4 md:p-10 flex items-start justify-center">
          <div className="w-full max-w-4xl border border-border/50 bg-card shadow-2xl rounded-2xl p-6 md:p-8 mt-10 mb-10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
              <h2 className="text-2xl font-black uppercase tracking-tight">{editing.id ? "Edit tour" : "New tour"}</h2>
              <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setEditing(null)}><X className="h-5 w-5" /></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><Label>Title *</Label><Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
              <div><Label>Slug *</Label><Input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="e.g. annapurna-circuit" /></div>
              <div className="md:col-span-2"><Label>Image URL</Label><Input value={editing.image_url ?? ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} placeholder="Paste an image URL from Media library" /></div>
              <div><Label>Duration</Label><Input value={editing.duration ?? ""} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} placeholder="e.g. 14 days" /></div>
              <div><Label>Location</Label><Input value={editing.location ?? ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></div>
              <div><Label>Group size</Label><Input value={editing.group_size ?? ""} onChange={(e) => setEditing({ ...editing, group_size: e.target.value })} /></div>
              <div><Label>Price (USD)</Label><Input value={editing.price ?? ""} onChange={(e) => setEditing({ ...editing, price: e.target.value })} /></div>
              <div><Label>Difficulty</Label><Input value={editing.difficulty ?? ""} onChange={(e) => setEditing({ ...editing, difficulty: e.target.value })} /></div>
              <div><Label>Rating</Label><Input type="number" step="0.1" min="0" max="5" value={editing.rating ?? 0} onChange={(e) => setEditing({ ...editing, rating: parseFloat(e.target.value) })} /></div>
              <div><Label>Reviews count</Label><Input type="number" value={editing.reviews ?? 0} onChange={(e) => setEditing({ ...editing, reviews: parseInt(e.target.value) || 0 })} /></div>
              <div><Label>Sort order</Label><Input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} /></div>
              <div className="flex items-end gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={!!editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
                  Published (visible to public)
                </label>
              </div>
              <div className="md:col-span-2"><Label>Short description</Label><Textarea rows={2} className="rounded-xl" value={editing.short_description ?? ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} /></div>
              <div className="md:col-span-2"><Label>Long description</Label><Textarea rows={6} className="rounded-xl" value={editing.long_description ?? ""} onChange={(e) => setEditing({ ...editing, long_description: e.target.value })} /></div>
              
              <div className="md:col-span-2 mt-6 pt-6 border-t border-border/50">
                <h3 className="font-bold uppercase text-sm mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-primary rounded-full inline-block" /> SEO Settings
                </h3>
              </div>
              <div className="md:col-span-2"><Label>SEO Title</Label><Input className="rounded-xl" value={editing.seo_title ?? ""} onChange={(e) => setEditing({ ...editing, seo_title: e.target.value })} placeholder="Optimal: 50-60 chars" /></div>
              <div className="md:col-span-2"><Label>Meta Description</Label><Textarea rows={2} className="rounded-xl" value={editing.seo_description ?? ""} onChange={(e) => setEditing({ ...editing, seo_description: e.target.value })} placeholder="Optimal: 150-160 chars" /></div>
              <div className="md:col-span-2"><Label>Meta Keywords</Label><Input className="rounded-xl" value={editing.seo_keywords ?? ""} onChange={(e) => setEditing({ ...editing, seo_keywords: e.target.value })} placeholder="Comma separated keywords" /></div>
            </div>
            <div className="mt-8 flex gap-3 justify-end border-t border-border/50 pt-6">
              <Button variant="outline" className="rounded-xl" onClick={() => setEditing(null)}>Cancel</Button>
              <Button className="rounded-xl shadow-lg shadow-primary/25" onClick={save}>Save Tour</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ToursAdmin;

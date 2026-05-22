import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Phone, Trash2 } from "lucide-react";

type Inquiry = {
  id: string; name: string; email: string; phone: string | null;
  message: string; status: string; created_at: string; tour_id: string | null;
};

const InquiriesAdmin = () => {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const load = async () => {
    const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message); else setItems(data as Inquiry[]);
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    await supabase.from("inquiries").update({ status }).eq("id", id);
    load();
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    await supabase.from("inquiries").delete().eq("id", id);
    setSelected(null);
    load();
  };

  return (
    <AdminLayout>
      <h1 className="text-4xl font-black uppercase mb-6">Inquiries</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        <div className="border border-border divide-y divide-border max-h-[70vh] overflow-y-auto">
          {items.length === 0 && <div className="p-6 text-muted-foreground">No inquiries yet.</div>}
          {items.map((i) => (
            <button
              key={i.id}
              onClick={() => { setSelected(i); if (i.status === "new") setStatus(i.id, "read"); }}
              className={`w-full text-left p-4 hover:bg-muted ${selected?.id === i.id ? "bg-muted" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold truncate">{i.name}</span>
                {i.status === "new" && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5">NEW</span>}
              </div>
              <div className="text-xs text-muted-foreground truncate">{i.email}</div>
              <div className="text-sm truncate mt-1">{i.message}</div>
              <div className="text-xs text-muted-foreground mt-1">{new Date(i.created_at).toLocaleString()}</div>
            </button>
          ))}
        </div>
        <div className="border border-border p-6">
          {selected ? (
            <div>
              <h2 className="text-2xl font-bold">{selected.name}</h2>
              <div className="flex gap-4 text-sm text-muted-foreground mt-2 flex-wrap">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-1 hover:text-foreground"><Mail className="h-3 w-3" />{selected.email}</a>
                {selected.phone && <a href={`tel:${selected.phone}`} className="flex items-center gap-1 hover:text-foreground"><Phone className="h-3 w-3" />{selected.phone}</a>}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{new Date(selected.created_at).toLocaleString()} • Status: {selected.status}</div>
              <div className="mt-6 whitespace-pre-wrap">{selected.message}</div>
              <div className="mt-8 flex gap-2 flex-wrap">
                <Button variant="outline" onClick={() => setStatus(selected.id, "new")}>Mark new</Button>
                <Button variant="outline" onClick={() => setStatus(selected.id, "read")}>Mark read</Button>
                <Button variant="outline" onClick={() => setStatus(selected.id, "archived")}>Archive</Button>
                <Button variant="outline" onClick={() => remove(selected.id)}><Trash2 className="h-4 w-4 mr-2" />Delete</Button>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground">Select an inquiry to read it.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default InquiriesAdmin;

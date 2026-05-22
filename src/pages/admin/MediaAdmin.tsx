import { useEffect, useRef, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Trash2, Upload } from "lucide-react";

type FileItem = { name: string; url: string };

const MediaAdmin = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data, error } = await supabase.storage.from("media").list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
    if (error) { toast.error(error.message); return; }
    const items = (data ?? []).filter((d) => d.name && !d.name.startsWith(".")).map((d) => ({
      name: d.name,
      url: supabase.storage.from("media").getPublicUrl(d.name).data.publicUrl,
    }));
    setFiles(items);
  };

  useEffect(() => { load(); }, []);

  const upload = async (filesToUpload: FileList | null) => {
    if (!filesToUpload || filesToUpload.length === 0) return;
    setUploading(true);
    for (const file of Array.from(filesToUpload)) {
      if (file.size > 10 * 1024 * 1024) { toast.error(`${file.name} is too large (max 10MB)`); continue; }
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, { cacheControl: "3600" });
      if (error) toast.error(`${file.name}: ${error.message}`); else toast.success(`Uploaded ${file.name}`);
    }
    setUploading(false);
    load();
  };

  const remove = async (name: string) => {
    if (!confirm("Delete this file?")) return;
    const { error } = await supabase.storage.from("media").remove([name]);
    if (error) toast.error(error.message); else { toast.success("Deleted"); load(); }
  };

  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied");
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-black uppercase">Media</h1>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => upload(e.target.files)} />
        <Button onClick={() => inputRef.current?.click()} disabled={uploading}>
          <Upload className="h-4 w-4 mr-2" />{uploading ? "Uploading…" : "Upload"}
        </Button>
      </div>

      {files.length === 0 ? (
        <div className="border border-border p-12 text-center text-muted-foreground">
          No images yet. Upload some to use them in tours and content.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((f) => (
            <div key={f.name} className="border border-border group">
              <img src={f.url} alt={f.name} className="aspect-square object-cover w-full" />
              <div className="p-2 flex gap-1">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => copy(f.url)}>
                  <Copy className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => remove(f.name)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default MediaAdmin;

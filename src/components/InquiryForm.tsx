import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

export const InquiryForm = ({ tourId }: { tourId?: string }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error("Please fill in valid name, email, and message."); return; }
    setSubmitting(true);
    const { error } = await supabase.from("inquiries").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
      tour_id: tourId ?? null,
    });
    setSubmitting(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Thanks — we'll reply soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 border border-border p-6">
      <h3 className="text-2xl font-black uppercase">Enquire about this tour</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={100} /></div>
        <div><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={200} /></div>
      </div>
      <div><Label>Phone (optional)</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={30} /></div>
      <div><Label>Message *</Label><Textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required maxLength={2000} /></div>
      <Button type="submit" disabled={submitting} className="w-full">{submitting ? "Sending…" : "Send enquiry"}</Button>
    </form>
  );
};

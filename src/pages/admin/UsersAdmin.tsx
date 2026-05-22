import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Trash2 } from "lucide-react";
import { z } from "zod";

type RoleRow = { id: string; user_id: string; role: string };
type Profile = { id: string; email: string | null; display_name: string | null };
type Invite = { id: string; email: string; token: string; expires_at: string; used_at: string | null };

const UsersAdmin = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const load = async () => {
    const [{ data: r }, { data: p }, { data: i }] = await Promise.all([
      supabase.from("user_roles").select("*"),
      supabase.from("profiles").select("id, email, display_name"),
      supabase.from("admin_invites").select("*").order("created_at", { ascending: false }),
    ]);
    setRoles((r as RoleRow[]) ?? []);
    setProfiles((p as Profile[]) ?? []);
    setInvites((i as Invite[]) ?? []);
    setIsOwner(!!(r as RoleRow[])?.find((x) => x.user_id === user?.id && x.role === "owner"));
  };

  useEffect(() => { load(); }, [user?.id]);

  const sendInvite = async () => {
    try { z.string().trim().email().max(255).parse(inviteEmail); }
    catch { toast.error("Enter a valid email"); return; }
    const token = crypto.randomUUID() + "-" + crypto.randomUUID();
    const { error } = await supabase.from("admin_invites").insert({
      email: inviteEmail.toLowerCase().trim(),
      token,
      invited_by: user?.id,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Invite created — copy and share the link");
    setInviteEmail("");
    load();
  };

  const inviteLink = (inv: Invite) =>
    `${window.location.origin}/#/auth?invite=${inv.token}&email=${encodeURIComponent(inv.email)}`;

  const copyLink = (inv: Invite) => {
    navigator.clipboard.writeText(inviteLink(inv));
    toast.success("Invite link copied");
  };

  const revokeInvite = async (id: string) => {
    await supabase.from("admin_invites").delete().eq("id", id);
    load();
  };

  const revokeAdmin = async (roleId: string, userId: string) => {
    if (userId === user?.id) { toast.error("You can't revoke yourself"); return; }
    if (!confirm("Revoke admin access for this user?")) return;
    const { error } = await supabase.from("user_roles").delete().eq("id", roleId);
    if (error) toast.error(error.message); else { toast.success("Revoked"); load(); }
  };

  return (
    <AdminLayout>
      <h1 className="text-4xl font-black uppercase mb-6">Admin Users</h1>

      <div className="border border-border p-6 mb-8 max-w-xl">
        <h2 className="text-xl font-bold uppercase mb-4">Invite a new admin</h2>
        {!isOwner ? (
          <p className="text-sm text-muted-foreground">Only the owner can invite admins.</p>
        ) : (
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Label>Email</Label>
              <Input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="new-admin@example.com" />
            </div>
            <Button onClick={sendInvite}>Create invite</Button>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-3">
          A signup link is generated below. Share it with the invitee — it works only with the email above and expires in 7 days.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-border p-6">
          <h2 className="text-xl font-bold uppercase mb-4">Current admins</h2>
          <div className="space-y-2">
            {roles.map((r) => {
              const p = profiles.find((x) => x.id === r.user_id);
              return (
                <div key={r.id} className="flex items-center justify-between border border-border p-3">
                  <div>
                    <div className="font-bold">{p?.display_name ?? p?.email ?? r.user_id.slice(0, 8)}</div>
                    <div className="text-xs text-muted-foreground">{p?.email} • {r.role}</div>
                  </div>
                  {isOwner && r.role !== "owner" && (
                    <Button size="sm" variant="outline" onClick={() => revokeAdmin(r.id, r.user_id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="border border-border p-6">
          <h2 className="text-xl font-bold uppercase mb-4">Pending invites</h2>
          <div className="space-y-2">
            {invites.length === 0 && <p className="text-sm text-muted-foreground">No invites.</p>}
            {invites.map((i) => (
              <div key={i.id} className="border border-border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold">{i.email}</div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => copyLink(i)}><Copy className="h-3 w-3" /></Button>
                    <Button size="sm" variant="outline" onClick={() => revokeInvite(i.id)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {i.used_at ? `Used ${new Date(i.used_at).toLocaleDateString()}` : `Expires ${new Date(i.expires_at).toLocaleDateString()}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersAdmin;

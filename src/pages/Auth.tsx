import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const emailSchema = z.string().trim().email().max(255);
const passwordSchema = z.string().min(8).max(72);

const Auth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const inviteToken = params.get("invite");
  const inviteEmail = params.get("email") ?? "";
  const denied = params.get("denied");
  const [mode, setMode] = useState<"login" | "signup">(inviteToken ? "signup" : "login");
  const [email, setEmail] = useState(inviteEmail);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate("/admin", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
    } catch {
      toast.error("Enter a valid email and a password of at least 8 characters.");
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth`,
            data: {
              display_name: name || email.split("@")[0],
              invite_token: inviteToken ?? undefined,
            },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm, then log in.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in.");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-border p-8 bg-card">
        <Link to="/" className="text-2xl font-bold italic block mb-2">MTB Tours Nepal</Link>
        <h1 className="text-3xl font-black uppercase mb-6">
          {mode === "signup" ? "Create account" : "Admin sign in"}
        </h1>
        {denied && (
          <div className="mb-4 p-3 border border-destructive text-destructive text-sm">
            Your account does not have admin access.
          </div>
        )}
        {inviteToken && (
          <div className="mb-4 p-3 border border-border text-sm">
            You were invited as an admin. Complete signup with the invited email.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <Label>Display name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
            </div>
          )}
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Please wait…" : mode === "signup" ? "Sign up" : "Sign in"}
          </Button>
        </form>
        {!inviteToken && (
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground w-full text-center"
          >
            {mode === "login"
              ? "First time? Create the owner account (only the first signup gets owner)."
              : "Already have an account? Sign in"}
          </button>
        )}
        <Link to="/" className="block mt-6 text-center text-sm text-muted-foreground hover:text-foreground">
          ← Back to site
        </Link>
      </div>
    </div>
  );
};

export default Auth;

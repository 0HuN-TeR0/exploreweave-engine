import { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Bike, FileText, Image, Inbox, Users, LogOut, ExternalLink } from "lucide-react";

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/tours", label: "Tours", icon: Bike },
  { to: "/admin/content", label: "Site Content", icon: FileText },
  { to: "/admin/media", label: "Media", icon: Image },
  { to: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { to: "/admin/users", label: "Admin Users", icon: Users },
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background/95 text-foreground flex selection:bg-primary/30">
      <aside className="w-72 border-r border-border/50 bg-card/40 backdrop-blur-3xl p-6 hidden md:flex flex-col shadow-2xl z-10 relative">
        <Link to="/" className="text-lg font-bold italic mb-8">MTB Tours Nepal</Link>
        <nav className="space-y-1 flex-1">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              end={i.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium tracking-wide transition-all duration-300 rounded-xl ${
                  isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 translate-x-1" : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground hover:translate-x-1"
                }`
              }
            >
              <i.icon className="h-4 w-4" />
              {i.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-6 space-y-2">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <ExternalLink className="h-3 w-3" /> View public site
          </a>
          <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
          <Button variant="outline" size="sm" className="w-full rounded-xl hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={async () => { await signOut(); navigate("/auth"); }}>
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-12 overflow-x-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-background -z-10 pointer-events-none" />
        <div className="md:hidden mb-4 flex items-center justify-between">
          <Link to="/" className="font-bold italic">MTB Tours Nepal</Link>
          <Button variant="outline" size="sm" className="rounded-xl" onClick={async () => { await signOut(); navigate("/auth"); }}>Sign out</Button>
        </div>
        <div className="md:hidden mb-6 flex flex-wrap gap-2">
          {items.map((i) => (
            <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) =>
              `px-4 py-2 text-xs font-medium rounded-xl border transition-all ${isActive ? "bg-primary text-primary-foreground border-primary shadow-md" : "border-border/50 hover:bg-accent/50 text-muted-foreground"}`
            }>{i.label}</NavLink>
          ))}
        </div>
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

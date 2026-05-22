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
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 border-r border-border p-6 hidden md:flex flex-col">
        <Link to="/" className="text-lg font-bold italic mb-8">MTB Tours Nepal</Link>
        <nav className="space-y-1 flex-1">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              end={i.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm uppercase tracking-wide transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
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
          <Button variant="outline" size="sm" className="w-full" onClick={async () => { await signOut(); navigate("/auth"); }}>
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <div className="md:hidden mb-4 flex items-center justify-between">
          <Link to="/" className="font-bold italic">MTB Tours Nepal</Link>
          <Button variant="outline" size="sm" onClick={async () => { await signOut(); navigate("/auth"); }}>Sign out</Button>
        </div>
        <div className="md:hidden mb-6 flex flex-wrap gap-2">
          {items.map((i) => (
            <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) =>
              `px-3 py-1 text-xs uppercase border ${isActive ? "bg-primary text-primary-foreground border-primary" : "border-border"}`
            }>{i.label}</NavLink>
          ))}
        </div>
        {children}
      </main>
    </div>
  );
};

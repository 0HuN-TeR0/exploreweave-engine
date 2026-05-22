import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const Stat = ({ label, value, to }: { label: string; value: number | string; to: string }) => (
  <Link to={to} className="block border border-border p-6 hover:bg-muted transition-colors">
    <div className="text-xs uppercase text-muted-foreground tracking-wide">{label}</div>
    <div className="text-4xl font-black mt-2">{value}</div>
  </Link>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ tours: 0, inquiries: 0, newInquiries: 0, admins: 0 });

  useEffect(() => {
    (async () => {
      const [t, i, ni, u] = await Promise.all([
        supabase.from("tours").select("*", { count: "exact", head: true }),
        supabase.from("inquiries").select("*", { count: "exact", head: true }),
        supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("user_roles").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        tours: t.count ?? 0,
        inquiries: i.count ?? 0,
        newInquiries: ni.count ?? 0,
        admins: u.count ?? 0,
      });
    })();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-4xl font-black uppercase mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage your site content, tours, and inquiries.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Tours" value={stats.tours} to="/admin/tours" />
        <Stat label="New inquiries" value={stats.newInquiries} to="/admin/inquiries" />
        <Stat label="Total inquiries" value={stats.inquiries} to="/admin/inquiries" />
        <Stat label="Admin users" value={stats.admins} to="/admin/users" />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

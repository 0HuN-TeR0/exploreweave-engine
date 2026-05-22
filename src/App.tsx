import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import ToursAdmin from "./pages/admin/ToursAdmin";
import ContentAdmin from "./pages/admin/ContentAdmin";
import MediaAdmin from "./pages/admin/MediaAdmin";
import InquiriesAdmin from "./pages/admin/InquiriesAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/tours" element={<ProtectedRoute><ToursAdmin /></ProtectedRoute>} />
            <Route path="/admin/content" element={<ProtectedRoute><ContentAdmin /></ProtectedRoute>} />
            <Route path="/admin/media" element={<ProtectedRoute><MediaAdmin /></ProtectedRoute>} />
            <Route path="/admin/inquiries" element={<ProtectedRoute><InquiriesAdmin /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UsersAdmin /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

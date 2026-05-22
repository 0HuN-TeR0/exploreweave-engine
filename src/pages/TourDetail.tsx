import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { InquiryForm } from "@/components/InquiryForm";

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    // id could be slug or uuid
    const isUuid = /^[0-9a-f-]{36}$/i.test(id);
    const q = supabase.from("tours").select("*").eq(isUuid ? "id" : "slug", id).maybeSingle();
    q.then(({ data }) => { setTour(data); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-background"><Navbar /><div className="pt-40 text-center text-foreground">Loading…</div></div>
  );

  if (!tour) return (
    <div className="min-h-screen bg-background"><Navbar />
      <div className="pt-40 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">Tour not found</h1>
        <Link to="/tours"><Button variant="outline">Back to tours</Button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        {tour.image_url && (
          <div className="relative h-[60vh] overflow-hidden">
            <img src={tour.image_url} alt={tour.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              {tour.difficulty && <Badge className="mb-4">{tour.difficulty}</Badge>}
              <h1 className="text-5xl md:text-6xl font-black uppercase mb-4">{tour.title}</h1>
              <div className="flex gap-6 flex-wrap text-sm text-muted-foreground">
                {tour.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{tour.location}</span>}
                {tour.duration && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{tour.duration}</span>}
                {tour.group_size && <span className="flex items-center gap-1"><Users className="h-4 w-4" />{tour.group_size}</span>}
                {tour.rating && <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" />{tour.rating} ({tour.reviews} reviews)</span>}
              </div>
            </div>
            {tour.short_description && <p className="text-xl">{tour.short_description}</p>}
            {tour.long_description && <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{tour.long_description}</div>}
          </div>
          <aside className="space-y-6">
            <div className="border border-border p-6">
              <div className="text-xs uppercase text-muted-foreground">From</div>
              <div className="text-4xl font-black">${tour.price}</div>
            </div>
            <InquiryForm tourId={tour.id} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;

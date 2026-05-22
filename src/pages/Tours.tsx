import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TourCard from "@/components/TourCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Tours = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  useEffect(() => {
    supabase.from("tours").select("*").eq("published", true).order("sort_order").then(({ data }) => {
      setTours(data ?? []);
    });
  }, []);

  const filtered = tours.filter((t) => {
    if (searchQuery && !`${t.title} ${t.location}`.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedDifficulty !== "all" && t.difficulty?.toLowerCase() !== selectedDifficulty) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-muted py-32 mt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-primary mb-4">Explore Our Tours</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover breathtaking mountain bike adventures across the Himalayas
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 -mt-8">
        <div className="bg-card border border-border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tours..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger><SelectValue placeholder="Difficulty" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="challenging">Challenging</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">No tours match your search.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((tour) => (
              <TourCard
                key={tour.id}
                id={tour.slug ?? tour.id}
                title={tour.title}
                image={tour.image_url ?? ""}
                duration={tour.duration ?? ""}
                location={tour.location ?? ""}
                groupSize={tour.group_size ?? ""}
                price={tour.price ?? ""}
                rating={tour.rating ?? 4.8}
                reviews={tour.reviews ?? 0}
                difficulty={tour.difficulty ?? undefined}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Tours;

import { useState } from "react";
import Navbar from "@/components/Navbar";
import TourCard from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import tourEverest from "@/assets/tour-everest.jpg";
import tourAnnapurna from "@/assets/tour-annapurna.jpg";
import tourKathmandu from "@/assets/tour-kathmandu.jpg";
import tourPokhara from "@/assets/tour-pokhara.jpg";

const Tours = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const tours = [
    {
      id: "1",
      title: "Everest Base Camp Trek",
      image: tourEverest,
      duration: "14 days",
      location: "Khumbu, Nepal",
      groupSize: "Max 12",
      price: "1,299",
      rating: 4.9,
      reviews: 247,
      difficulty: "Challenging",
    },
    {
      id: "2",
      title: "Annapurna Circuit Adventure",
      image: tourAnnapurna,
      duration: "18 days",
      location: "Annapurna, Nepal",
      groupSize: "Max 10",
      price: "1,499",
      rating: 4.8,
      reviews: 189,
      difficulty: "Moderate",
    },
    {
      id: "3",
      title: "Kathmandu Cultural Heritage Tour",
      image: tourKathmandu,
      duration: "5 days",
      location: "Kathmandu Valley",
      groupSize: "Max 15",
      price: "599",
      rating: 4.7,
      reviews: 312,
      difficulty: "Easy",
    },
    {
      id: "4",
      title: "Pokhara Adventure Package",
      image: tourPokhara,
      duration: "7 days",
      location: "Pokhara, Nepal",
      groupSize: "Max 8",
      price: "799",
      rating: 4.9,
      reviews: 156,
      difficulty: "Easy",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Explore Our Tours
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Discover breathtaking adventures and cultural experiences across Nepal
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-lg shadow-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tours..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="short">1-7 days</SelectItem>
                <SelectItem value="medium">8-14 days</SelectItem>
                <SelectItem value="long">15+ days</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
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

      {/* Tours Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tours;

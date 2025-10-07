import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  Users,
  Star,
  Calendar,
  CheckCircle2,
  Mountain,
  Utensils,
  Hotel,
} from "lucide-react";
import tourEverest from "@/assets/tour-everest.jpg";

const TourDetail = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch based on id
  const tour = {
    title: "Everest Base Camp Trek",
    image: tourEverest,
    duration: "14 days",
    location: "Khumbu, Nepal",
    groupSize: "Max 12",
    price: "1,299",
    rating: 4.9,
    reviews: 247,
    difficulty: "Challenging",
    description:
      "Embark on the adventure of a lifetime with our Everest Base Camp Trek. This iconic journey takes you through stunning Himalayan landscapes, traditional Sherpa villages, and offers breathtaking views of the world's highest peaks.",
    highlights: [
      "Visit Everest Base Camp at 5,364m",
      "Stunning views of Mt. Everest, Lhotse, and Nuptse",
      "Experience Sherpa culture and hospitality",
      "Trek through Sagarmatha National Park",
      "Visit ancient Buddhist monasteries",
      "Professional English-speaking guide",
    ],
    included: [
      "Airport transfers",
      "All accommodation during trek",
      "Three meals a day during trek",
      "Professional trekking guide",
      "Porters and necessary permits",
      "First aid medical kit",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
          <Badge className="mb-4 bg-secondary">{tour.difficulty}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {tour.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-secondary text-secondary" />
              <span className="font-semibold">{tour.rating}</span>
              <span>({tour.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {tour.description}
                </p>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Highlights</h2>
                <ul className="space-y-3">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.included.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-elevated">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground">Price per person</p>
                  <p className="text-4xl font-bold text-primary">${tour.price}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Group Size</span>
                    </div>
                    <span className="font-semibold">{tour.groupSize}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mountain className="h-4 w-4" />
                      <span className="text-sm">Difficulty</span>
                    </div>
                    <Badge variant="secondary">{tour.difficulty}</Badge>
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  Book This Tour
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Free cancellation up to 24 hours before departure
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;

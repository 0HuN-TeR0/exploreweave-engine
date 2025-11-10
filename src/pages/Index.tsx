import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import TourCard from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Shield, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-nepal.jpg";
import tourEverest from "@/assets/tour-everest.jpg";
import tourAnnapurna from "@/assets/tour-annapurna.jpg";
import tourKathmandu from "@/assets/tour-kathmandu.jpg";
import tourPokhara from "@/assets/tour-pokhara.jpg";

const Index = () => {
  const featuredTours = [
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
  ];

  const features = [
    {
      icon: Mountain,
      title: "Hand Crafted Adventures",
      description: "Off the beaten track experiences curated by passionate local riders who live and breathe the Himalayas",
    },
    {
      icon: Shield,
      title: "Transparent Pricing",
      description: "No hidden fees, no surprises. What you see is what you get—accommodation, meals, permits, and full support",
    },
    {
      icon: Users,
      title: "Full Support Team",
      description: "Hassle-free riding with backup crew, mechanical support, and luggage transport. Focus on the ride, we handle the rest",
    },
    {
      icon: Award,
      title: "Local Expertise",
      description: "Led by seasoned local riders with years of mountain experience and deep cultural knowledge",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Mountain biking in the Himalayas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-primary uppercase leading-none mb-6 drop-shadow-2xl">
            Earth's<br />
            Highest<br />
            <span className="italic">Playground</span>
          </h1>
        </div>
      </section>

      {/* Marquee */}
      <Marquee text="Guided mountain bike tours across the Himalayas crafted by passionate riders, for riders who seek real adventure, rugged terrain, and the ride of a lifetime.       " />

      {/* World's Best Tours Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-black uppercase mb-8 text-primary">
            World's Best<br />Mountain Bike Tours
          </h2>
          
          <div className="space-y-8 text-lg text-muted-foreground">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Hand crafted, off the beaten track adventures</h3>
              <p className="leading-relaxed">
                Every MTB Tours Nepal adventure is hand-crafted by passionate local riders who live and breathe the landscapes they guide through. We don't follow generic cookie-cutter itineraries—we create immersive, off-the-beaten-path experiences that take you deep into hidden valleys, remote trails, and culturally rich regions rarely seen by outsiders.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Transparent Pricing with No Hidden Fees</h3>
              <p className="leading-relaxed">
                Transparency is core to our philosophy. With MTB Tours Nepal, what you see is what you get—no surprises, no upsells, and no fine print. Our base pricing covers everything: accommodation, meals, permits, mechanical support, and more.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Hassle-Free Riding with Full Support</h3>
              <p className="leading-relaxed">
                From the moment you arrive, we handle everything—permits, accommodation, meals, luggage transport, route planning, and mechanical support. You ride light and worry-free, knowing that our backup team is always close by.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Led by Seasoned Riders</h3>
              <p className="leading-relaxed">
                Our guides and crew are 100% local, with years of experience riding and navigating the rugged Himalayan terrain. They bring not only technical expertise but deep cultural understanding and a genuine connection to the land.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-center">
            Find Your Perfect Holiday
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            From windswept high passes to lush valleys and alpine trails, our tours offer incredible diversity of riding and landscape
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/tours">
              <Button variant="outline" size="lg">
                View All Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                <feature.icon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Mountain biking adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">
            Ready for Your Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Join riders who have discovered the magic of Nepal's mountain trails with us
          </p>
          <Button variant="default" size="lg" className="text-lg">
            Start Planning Your Trip
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="text-xl font-bold italic">MTB Tours Nepal</span>
              <p className="text-sm text-muted-foreground mt-4">
                Your trusted partner for unforgettable Himalayan mountain biking adventures.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 uppercase text-sm tracking-wide">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/tours" className="hover:text-primary transition-colors">Tours</Link></li>
                <li><Link to="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 uppercase text-sm tracking-wide">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Travel Tips</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 uppercase text-sm tracking-wide">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cancellation Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 MTB Tours Nepal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

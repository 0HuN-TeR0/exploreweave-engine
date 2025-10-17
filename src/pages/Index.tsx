import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TourCard from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Users, Shield, Star } from "lucide-react";
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
      title: "Expert Guides",
      description: "Local guides with years of trekking experience and mountain expertise",
    },
    {
      icon: Users,
      title: "Small Groups",
      description: "Intimate group sizes for a personalized adventure experience",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Comprehensive safety measures and emergency support throughout",
    },
    {
      icon: Star,
      title: "Highly Rated",
      description: "Trusted by thousands of adventurers with 4.8+ average rating",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Nepal Himalayas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 drop-shadow-lg">
            Discover the Himalayas
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto drop-shadow">
            Embark on unforgettable adventures through Nepal's breathtaking landscapes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tours">
              <Button variant="hero" size="lg" className="text-lg px-8">
                Explore Tours
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-background/80 backdrop-blur">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Adventures</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked tours showcasing the best of Nepal's natural beauty and cultural heritage
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/tours">
            <Button variant="hero" size="lg">
              View All Tours
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose MTB Tours Nepal</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our professional team and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-elevated transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Ready for Your Adventure?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of adventurers who have discovered the magic of Nepal with us
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="text-lg px-8 shadow-elevated hover:scale-105 transition-all"
              >
                Start Planning Your Trip
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mountain className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">MTB Tours Nepal</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for unforgettable Himalayan adventures.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/tours" className="hover:text-primary transition-colors">Tours</Link></li>
                <li><Link to="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Travel Tips</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
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

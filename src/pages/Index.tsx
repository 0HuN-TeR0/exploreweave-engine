import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import TourCard from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-nepal.jpg";
import tourEverest from "@/assets/tour-everest.jpg";
import tourAnnapurna from "@/assets/tour-annapurna.jpg";
import tourKathmandu from "@/assets/tour-kathmandu.jpg";
import tourPokhara from "@/assets/tour-pokhara.jpg";

const Index = () => {
  const featuredTours = [
    {
      id: "1",
      title: "The Triple Crown",
      subtitle: "Nepal",
      image: tourAnnapurna,
      duration: "12 Days",
      details: "Manang, Mustang, Kathmandu | Mostly Dirt, Some Tarmac | Spring, Autumn",
      description: "An unforgettable mountain bike journey through the breathtaking Manang and Mustang Valleys of Nepal, deep in the heart of the Himalayas.",
      price: "1,499",
    },
    {
      id: "2",
      title: "Everest Base Camp",
      subtitle: "Nepal",
      image: tourEverest,
      duration: "14 Days",
      details: "Khumbu, Namche, Tengboche | Mostly Tarmac and Trails | Spring, Autumn",
      description: "Ride to the base of the world's highest peak through stunning Sherpa villages and ancient monasteries in the Khumbu region.",
      price: "1,899",
    },
    {
      id: "3",
      title: "Kathmandu Valley Explorer",
      subtitle: "Nepal",
      image: tourKathmandu,
      duration: "7 Days",
      details: "Kathmandu, Nagarkot, Dhulikhel | Mixed Terrain | Year Round",
      description: "Experience the perfect blend of cultural heritage and trail riding through the ancient temples and hilltop villages of the Kathmandu Valley.",
      price: "899",
    },
    {
      id: "4",
      title: "Pokhara Adventure",
      subtitle: "Nepal",
      image: tourPokhara,
      duration: "10 Days",
      details: "Pokhara, Sarangkot, Begnas | Trails and Singletrack | Spring, Autumn, Winter",
      description: "Explore the stunning lakeside city of Pokhara and its surrounding hills with epic singletrack, stunning Annapurna views, and endless adventure.",
      price: "1,299",
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
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-primary uppercase leading-none drop-shadow-2xl">
            Earth's<br />
            Highest<br />
            <span className="italic">Playground</span>
          </h1>
        </div>
      </section>

      {/* Marquee */}
      <Marquee text="❖  Guided mountain bike tours across the Himalayas crafted by passionate riders, for riders who seek real adventure, rugged terrain, and the ride of a lifetime.       " />

      {/* World's Best Tours Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-black lowercase mb-12 text-foreground">
            world's best<br />mountain bike tours
          </h2>
          
          <div className="space-y-12 text-base md:text-lg text-muted-foreground">
            <div>
              <a href="#" className="text-xl md:text-2xl font-bold text-foreground mb-4 block hover:text-primary transition-colors">
                Hand crafted, off the beaten track adventures
              </a>
              <p className="leading-relaxed">
                Every MTB Tours Nepal adventure is hand-crafted by passionate local riders who live and breathe the landscapes they guide through. We don't follow generic cookie-cutter itineraries—we create immersive, off-the-beaten-path experiences that take you deep into hidden valleys, remote trails, and culturally rich regions rarely seen by outsiders. Our routes are thoughtfully curated to strike the perfect balance of adventure, comfort, and cultural connection. We pay attention to every small detail, from the rhythm of each day's ride to the selection of cozy local stays, ensuring every aspect of your journey is smooth, meaningful, and unforgettable.
              </p>
            </div>

            <div>
              <a href="#" className="text-xl md:text-2xl font-bold text-foreground mb-4 block hover:text-primary transition-colors">
                Transparent Pricing with No Hidden Fees
              </a>
              <p className="leading-relaxed">
                Transparency is core to our philosophy. With MTB Tours Nepal, what you see is what you get—no surprises, no upsells, and no fine print. Our base pricing covers everything: accommodation, meals, permits, mechanical support, and more. Any optional upgrades or customizations are presented clearly at the time of booking. This transparent approach means you can focus entirely on the adventure, without ever worrying about your wallet once the ride begins.
              </p>
            </div>

            <div>
              <a href="#" className="text-xl md:text-2xl font-bold text-foreground mb-4 block hover:text-primary transition-colors">
                Hassle-Free Riding with Full Support
              </a>
              <p className="leading-relaxed">
                From the moment you arrive, we handle everything—permits, accommodation, meals, luggage transport, route planning, and mechanical support. You ride light and worry-free, knowing that our backup team is always close by with tools, spares, and solutions. Whether you need a quick tune-up or help with your gear, we've got your back. Our fully supported tours let you immerse in the experience, free of stress or logistical distractions.
              </p>
            </div>

            <div>
              <a href="#" className="text-xl md:text-2xl font-bold text-foreground mb-4 block hover:text-primary transition-colors">
                Led by Seasoned Riders, Powered by Local Knowledge
              </a>
              <p className="leading-relaxed">
                Our guides and crew are 100% local, with years of experience riding and navigating the rugged Himalayan terrain. They bring not only technical expertise but deep cultural understanding, local storytelling, and a genuine connection to the land. This local-first approach ensures your ride is more than just scenic—it's grounded in authenticity, hospitality, and a true sense of place. By keeping our operations entirely local, we ensure that your journey directly supports the communities you ride through.
              </p>
            </div>

            <div>
              <a href="#" className="text-xl md:text-2xl font-bold text-foreground mb-4 block hover:text-primary transition-colors">
                Ride Satisfaction Guarantee
              </a>
              <p className="leading-relaxed">
                We stand behind every ride we offer. If your experience falls short of expectations, we'll work with you to make it right. Your satisfaction is our priority, and we go above and beyond to ensure each journey is one you'll want to relive.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border"></div>

      {/* Featured Tours */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-4xl md:text-5xl font-black mb-6">Find Your Perfect Holiday</h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-4xl">
          From the windswept high passes of Manang to the lush, rolling valleys of Pokhara, and the cultural richness of the Kathmandu Valley, our tours offer an incredible diversity of riding and landscape. Expect everything from high-altitude trails to dense forests and river-carved gorges—each ride a striking contrast, showcasing the Himalayas in all her raw, majestic variety.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredTours.map((tour) => (
            <Link key={tour.id} to={`/tours/${tour.id}`} className="group">
              <div className="relative overflow-hidden aspect-[4/3] mb-4">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                  {tour.title}
                </h3>
                <p className="text-lg font-semibold text-muted-foreground">{tour.subtitle}</p>
                <p className="text-sm uppercase tracking-wide text-muted-foreground">{tour.details}</p>
                <p className="text-base text-muted-foreground leading-relaxed">{tour.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="border-t border-border"></div>

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
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">
            Ready for Your Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Join riders who have discovered the magic of Nepal's mountain trails with us
          </p>
          <Button variant="outline" size="lg" className="text-lg">
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

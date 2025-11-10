import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Star } from "lucide-react";

interface TourCardProps {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  duration: string;
  details?: string;
  description?: string;
  location?: string;
  groupSize?: string;
  price: string;
  rating?: number;
  reviews?: number;
  difficulty?: string;
}

const TourCard = ({
  id,
  title,
  subtitle,
  image,
  duration,
  details,
  description,
  location,
  groupSize,
  price,
  rating,
  reviews,
  difficulty,
}: TourCardProps) => {
  // If it's the old format (with location and groupSize), show old card style
  if (location && groupSize && rating && reviews) {
    return (
      <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 bg-card border-border">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {difficulty && (
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-bold">
              {difficulty}
            </Badge>
          )}
        </div>
        
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{location}</span>
          </div>
          
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{groupSize}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold">{rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">From</p>
            <p className="text-2xl font-black text-foreground">${price}</p>
          </div>
          <Link to={`/tours/${id}`}>
            <Button variant="outline" size="sm">Learn More</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  // New format matching Himalayan Rides style
  return (
    <Link to={`/tours/${id}`} className="group block">
      <div className="relative overflow-hidden aspect-[4/3] mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
          {title}
        </h3>
        {subtitle && <p className="text-lg font-semibold text-muted-foreground">{subtitle}</p>}
        {details && <p className="text-sm uppercase tracking-wide text-muted-foreground">{details}</p>}
        {description && <p className="text-base text-muted-foreground leading-relaxed">{description}</p>}
      </div>
    </Link>
  );
};

export default TourCard;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl md:text-2xl font-bold text-foreground italic tracking-tight">
              MTB Tours Nepal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/tours" className="text-foreground hover:text-primary transition-colors font-medium uppercase text-sm tracking-wide">
              MTB Tours
            </Link>
            <Link to={isAdmin ? "/admin" : "/auth"}>
              <Button variant="outline" size="sm" className="ml-4">
                {isAdmin ? "Admin" : "Sign in"}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/tours"
              className="block px-4 py-2 hover:bg-muted transition-colors uppercase text-sm tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              MTB Tours
            </Link>
            <Button variant="outline" size="sm" className="w-full">
              Menu
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

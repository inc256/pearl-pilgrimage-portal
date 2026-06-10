import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Hajj", href: "/hajj" },
  { label: "Umrah", href: "/umrah" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
  // { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="font-heading text-lg lg:text-xl font-bold text-primary">
          Pearl Hijja & Umra
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {/* <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Client Portal
          </Button> */}
          <Button size="sm" className="bg-[#5C0120] text-white hover:bg-[#4a0019]">
            <Link to="/contact">Book Now</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-b border-border px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            {/* <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1">
              Client Portal
            </Button> */}
            <Button size="sm" className="bg-[#5C0120] text-white hover:bg-[#4a0019] flex-1">
              <Link to="/contact">Book Now</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

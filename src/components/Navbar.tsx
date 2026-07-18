import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Booking", href: "/booking" },
  { label: "Hajj", href: "/hajj" },
  { label: "Umrah", href: "/umrah" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logo color: white on homepage hero, burgundy elsewhere
  const logoClass = isHome 
    ? (scrolled ? "text-[#5C0120]" : "text-white") 
    : "text-[#5C0120]";

  // Desktop link colors
  const linkClass = isHome 
    ? (scrolled ? "text-foreground/80 hover:text-primary" : "text-white/80 hover:text-white") 
    : "text-[#5C0120] hover:text-[#4a0019]";
  
  const contactLinkClass = isHome 
    ? linkClass 
    : "text-[#5C0120] hover:text-[#4a0019] transition-colors";

  // Mobile menu icon color: white on homepage hero (not scrolled), burgundy elsewhere
  const menuIconClass = isHome && !scrolled ? "text-white" : "text-[#5C0120]";

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled || !isHome 
        ? "bg-white border-b border-[rgba(92,1,32,0.1)] shadow-sm" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 flex h-16 items-center justify-between transition-all duration-300 lg:h-20">
        <Link
          to="/"
          className={`font-heading text-lg lg:text-xl font-bold transition-colors ${logoClass}`}
        >
          Pearl Hijja & Umra
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium transition-colors ${link.label === "Contact Us" ? contactLinkClass : linkClass}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild size="sm" className="bg-[#5C0120] text-white hover:bg-[#4a0019] rounded-none">
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>

        {/* Mobile hamburger - white on homepage hero, burgundy elsewhere */}
        <button 
          onClick={() => setOpen(!open)} 
          className={`lg:hidden transition-colors ${menuIconClass}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu - white background with burgundy text */}
      {open && (
        <div className="lg:hidden bg-white border-b border-[rgba(92,1,32,0.1)] px-4 pb-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium transition-colors text-[#5C0120] hover:text-[#4a0019] hover:bg-[#faf0f3] px-3 rounded-[5px]`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            <Link 
              to="/booking" 
              className="flex-1 bg-[#5C0120] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#4a0019] rounded-[5px]"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
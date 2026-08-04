import { Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-lg font-bold mb-3">Pearl Hijja</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Premium Hajj & Umrah services from Uganda. Your trusted partner for a blessed pilgrimage.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#hajj" className="hover:text-primary-foreground transition-colors">Hajj Packages</a></li>
              <li><a href="#umrah" className="hover:text-primary-foreground transition-colors">Umrah Packages</a></li>
              <li><a href="#gallery" className="hover:text-primary-foreground transition-colors">Gallery</a></li>
              <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Contact Us</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:0705447319" className="hover:text-primary-foreground">0705447319</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:0702184524" className="hover:text-primary-foreground">0702184524</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:0756505926" className="hover:text-primary-foreground">0756505926</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Pearl Hijja and Umrah Services (U) Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

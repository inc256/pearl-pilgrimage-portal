import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useContactInfo } from "@/hooks/useSupabase";

const iconMap: Record<string, React.ReactNode> = {
  phone: <Phone className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  address: <MapPin className="h-4 w-4" />,
  hours: <Clock className="h-4 w-4" />,
};

const Footer = () => {
  const { data: contactInfo } = useContactInfo();

  const getContactByType = (type: string) => {
    return contactInfo?.find(c => c.type === type);
  };

  const phone = getContactByType("phone");
  const email = getContactByType("email");
  const address = getContactByType("address");
  const hours = getContactByType("hours");

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
              {phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{phone.value}</span>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{email.value}</span>
                </li>
              )}
              {address && (
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{address.value}</span>
                </li>
              )}
              {hours && (
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{hours.value}</span>
                </li>
              )}
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

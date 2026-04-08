import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Get in Touch</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Contact Us</h2>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Phone className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-foreground">Phone</h4>
                <p className="text-muted-foreground text-sm">+256 700 000 000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-foreground">Email</h4>
                <p className="text-muted-foreground text-sm">info@pearlhijja.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-foreground">Office</h4>
                <p className="text-muted-foreground text-sm">Kampala, Uganda</p>
              </div>
            </div>

            <a
              href="https://wa.me/256700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Your Name" className="bg-card" />
            <Input placeholder="Email Address" type="email" className="bg-card" />
            <Input placeholder="Phone Number" className="bg-card" />
            <Textarea placeholder="Your Message" rows={4} className="bg-card" />
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-secondary">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

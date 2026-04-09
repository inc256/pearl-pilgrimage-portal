import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Get in Touch</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Contact Us</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Have questions about your pilgrimage? We're here to help you plan your sacred journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">First Name</label>
                      <Input placeholder="Your first name" className="w-full" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Last Name</label>
                      <Input placeholder="Your last name" className="w-full" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input type="email" placeholder="your@email.com" className="w-full" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" className="w-full" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                    <Input placeholder="How can we help?" className="w-full" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                    <Textarea placeholder="Your message..." rows={5} className="w-full" />
                  </div>
                  <Button type="submit" className="w-full bg-[#5C0120] text-white hover:bg-[#4a0019]">
                    Send Message
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Phone</h4>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">+1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-muted-foreground">info@pearlpilgrimage.com</p>
                      <p className="text-muted-foreground">bookings@pearlpilgrimage.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Office</h4>
                      <p className="text-muted-foreground">123 Pilgrim Street</p>
                      <p className="text-muted-foreground">Makkah, Saudi Arabia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Office Hours</h4>
                      <p className="text-muted-foreground">Sunday - Thursday: 9AM - 6PM</p>
                      <p className="text-muted-foreground">Friday - Saturday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  ExternalLink
} from "lucide-react";
import { useContactInfo } from "@/hooks/useSupabase";
import { AlertCircle } from "lucide-react";

const Contact = () => {
  const { data: contactInfo, isLoading: contactLoading, error: contactError } = useContactInfo();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'phone': return <Phone className="text-primary" size={20} />;
      case 'email': return <Mail className="text-primary" size={20} />;
      case 'address': return <MapPin className="text-primary" size={20} />;
      case 'hours': return <Clock className="text-primary" size={20} />;
      default: return <Phone className="text-primary" size={20} />;
    }
  };

  // Google Maps embed URL (Liberty Tower Kampala)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7465!2d32.5825!3d0.3136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbbd9f8c3f8f9%3A0x6c8f5a9e2b4d3e1f!2sLiberty%20House%2C%20Kampala!5e0!3m2!1sen!2sug!4v1234567890!5m2!1sen!2sug";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary/10 to-primary/5 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <MessageCircle size={16} />
                <span className="text-sm font-medium">We're Here to Help</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Get in Touch
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Ready to begin your sacred journey? Our pilgrimage specialists are here to guide you every step of the way.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Grid Layout - Side by side on large devices, stacked on mobile */}
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              
              {/* Contact Information Column */}
              <div className="bg-card rounded-2xl shadow-lg border p-6 md:p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                
                {contactLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : contactError ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                    <AlertCircle className="inline mr-2" size={20} />
                    Error loading contact information. Please refresh the page.
                  </div>
                ) : contactInfo && contactInfo.length > 0 ? (
                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <div key={info.id} className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          {getIcon(info.icon || info.type || 'phone')}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{info.label}</h4>
                          <p className="text-muted-foreground whitespace-pre-line">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Phone Numbers */}
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Phone className="text-primary" size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">Phone Numbers</h4>
                        <div className="space-y-1">
                          <a href="tel:0705447319" className="text-muted-foreground hover:text-primary block transition-colors">
                            0705 447 319
                          </a>
                          <a href="tel:0702184524" className="text-muted-foreground hover:text-primary block transition-colors">
                            0702 184 524
                          </a>
                          <a href="tel:0756505926" className="text-muted-foreground hover:text-primary block transition-colors">
                            0756 505 926
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    {/* <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Mail className="text-primary" size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">Email Address</h4>
                        <a href="mailto:info@pearlhijja.com" className="text-muted-foreground hover:text-primary transition-colors">
                          info@pearlhijja.com
                        </a>
                      </div>
                    </div> */}

                    {/* Office Address */}
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <MapPin className="text-primary" size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">Office Location</h4>
                        <p className="text-muted-foreground mb-2">
                          Liberty Tower Kampala Road, Room L4B09
                        </p>
                        <a
                          href="https://maps.app.goo.gl/esYLE53h6KW7Et4q6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary text-sm hover:underline"
                        >
                          <ExternalLink size={14} />
                          Get Directions on Google Maps
                        </a>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Clock className="text-primary" size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                        <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-muted-foreground">Saturday: 10:00 AM - 2:00 PM</p>
                        <p className="text-muted-foreground">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Action Buttons */}
                <div className="mt-8 pt-6 border-t space-y-3">
                  <a
                    href="https://wa.me/256756505926"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                  >
                    <MessageCircle size={20} />
                    Chat on WhatsApp
                  </a>
                  <a
                    href="https://tiktok.com/@pearlhijjaandumrah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    Follow on TikTok
                  </a>
                </div>
              </div>

              {/* Find Us Here Column - Google Maps */}
              <div className="bg-card rounded-2xl shadow-lg border overflow-hidden flex flex-col">
                <div className="p-6 pb-2">
                  <h2 className="font-heading text-2xl font-bold text-foreground">Find Us Here</h2>
                  <p className="text-muted-foreground text-sm mt-1">Liberty Tower, Kampala Road</p>
                </div>
                <div className="h-80 md:h-96 w-full flex-1">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location Map"
                    className="hover:opacity-95 transition-opacity"
                  ></iframe>
                </div>
                <div className="p-4 bg-muted/30">
                  <a
                    href="https://maps.app.goo.gl/esYLE53h6KW7Et4q6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline flex items-center justify-center gap-1"
                  >
                    <ExternalLink size={14} />
                    Open in Google Maps for detailed directions
                  </a>
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

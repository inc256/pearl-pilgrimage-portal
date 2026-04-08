import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Bus, Calendar, Utensils, Check, BookOpen, Shield } from "lucide-react";

const packageIncludes = [
  "Visa", "5-star accommodations", "Return flight",
  "Ground transport", "VIP Mina tents"
];

const hajjPackages = [
  {
    title: "Hajj Premium Package",
    price: "$8,500",
    dates: "12th May – 5th June",
    description: "The most comprehensive Hajj experience with luxury accommodations and VIP services",
    features: [
      "Emirates Airlines flights",
      "Fairmont Makkah Hotel (5-star)",
      "Zamzam Pullman Madinah",
      "VIP air-conditioned Mina tents",
      "Private air-conditioned Arafat tent",
      "Breakfast & dinner in Madinah",
      "All meals in Mina",
      "Private luxury bus transport",
      "Pre-travel lectures included",
      "Official send-off ceremony",
      "Practical sessions in Makkah"
    ]
  },
  {
    title: "Hajj Economy Package",
    price: "$6,500",
    dates: "15th May – 8th June",
    description: "Quality Hajj experience at an affordable price",
    features: [
      "Saudi Airlines flights",
      "Makkah Hilton (4-star)",
      "Madinah Hilton Hotel",
      "Standard air-conditioned Mina tents",
      "Shared transport",
      "Breakfast included",
      "Group guide services",
      "Travel preparation sessions"
    ]
  }
];

const Hajj = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Sacred Journey</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Hajj Packages 2026</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Begin your sacred pilgrimage with our carefully planned Hajj packages. We ensure a spiritual and comfortable journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {hajjPackages.map((pkg, index) => (
              <div key={pkg.title} className="max-w-5xl mx-auto bg-card rounded-lg border border-border p-6 md:p-10 mb-12">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{pkg.title}</h2>
                  <p className="text-muted-foreground mt-2">{pkg.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <Calendar className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-foreground">Travel Dates</h4>
                        <p className="text-muted-foreground text-sm">{pkg.dates}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Plane className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-foreground">Flight</h4>
                        <p className="text-muted-foreground text-sm">{index === 0 ? "Emirates" : "Saudi Airlines"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bus className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-foreground">Transport</h4>
                        <p className="text-muted-foreground text-sm">{index === 0 ? "Private luxury buses" : "Shared transport"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <Hotel className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-foreground">Accommodation</h4>
                        <p className="text-muted-foreground text-sm">{index === 0 ? "Fairmont Hotel (5-star)" : "Hilton Hotel (4-star)"}</p>
                        <p className="text-muted-foreground text-sm">{index === 0 ? "Zamzam Pullman" : "Madinah Hilton"}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Mina & Arafat</h4>
                      <p className="text-muted-foreground text-sm">{index === 0 ? "Class A VIP air-conditioned tents" : "Standard air-conditioned tents"}</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {index === 0 && (
                      <div className="flex items-start gap-3">
                        <BookOpen className="text-primary mt-1 shrink-0" size={20} />
                        <div>
                          <h4 className="font-semibold text-foreground">Lectures</h4>
                          <p className="text-muted-foreground text-sm">Pre-travel lectures</p>
                          <p className="text-muted-foreground text-sm">Send-off ceremony</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <Utensils className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-foreground">Meals</h4>
                        <p className="text-muted-foreground text-sm">{index === 0 ? "Full board in Mina" : "Breakfast included"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <p className="text-3xl font-bold text-primary">{pkg.price}</p>
                      <p className="text-muted-foreground text-sm">per person</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {packageIncludes.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          <Check size={14} className="text-primary" /> {item}
                        </span>
                      ))}
                    </div>
                    <Button size="lg" className="bg-green-600 text-white hover:bg-green-700 whitespace-nowrap">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="max-w-3xl mx-auto mt-16">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Complete visa processing",
                  "Round-trip flights",
                  "5-star or 4-star hotel accommodations",
                  "All ground transportation",
                  "Professional tour guides",
                  "24/7 support in Saudi Arabia",
                  "Airport transfers",
                  "Meals as specified",
                  "Emergency assistance"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-muted-foreground">
                    <Check size={16} className="text-primary" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Hajj;

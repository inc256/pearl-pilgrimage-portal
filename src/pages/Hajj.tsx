import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, Hotel, Bus, Calendar, Utensils, Check, BookOpen, Shield } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useHajjPackages } from "@/hooks/useSupabase";
import { transformPackageForDisplay, DisplayPackage } from "@/lib/packageUtils";

const packageIncludes = [
  "Visa", "5-star accommodations", "Return flight",
  "Ground transport", "VIP Mina tents"
];

const fallbackHajjPackages = [
  {
    title: "Hajj Premium Package",
    price: 31119500,
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
    ],
    hotelMakkah: "Fairmont Hotel (5-star)",
    hotelMadinah: "Zamzam Pullman",
    transport: "Private luxury buses",
    meals: "Full board in Mina",
    minaArafat: "Class A VIP air-conditioned tents",
    lectures: ["Pre-travel lectures", "Send-off ceremony"]
  },
  {
    title: "Hajj Economy Package",
    price: 23805500,
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
    ],
    hotelMakkah: "Hilton Hotel (4-star)",
    hotelMadinah: "Madinah Hilton",
    transport: "Shared transport",
    meals: "Breakfast included",
    minaArafat: "Standard air-conditioned tents",
    lectures: ["Travel preparation sessions"]
  }
];

const Hajj = () => {
  const { data: packages, isLoading, error } = useHajjPackages();
  const { formatPrice } = useCurrency();

  const displayPackages = packages && packages.length > 0
    ? packages.map(pkg => {
        const transformed = transformPackageForDisplay({
          package: pkg,
          flights: [],
          hotels: [],
          transports: [],
          minaArafat: null,
          meals: null,
          lectures: [],
          includes: []
        });
        return {
          title: pkg.name || 'Hajj Package',
          price: pkg.price || null,
          dates: pkg.start_date && pkg.end_date 
            ? `${new Date(pkg.start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} – ${new Date(pkg.end_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`
            : 'Flexible dates',
          description: transformed.description,
          features: transformed.features,
          hotelMakkah: transformed.hotels.makkah.name,
          hotelMadinah: transformed.hotels.madinah.name,
          transport: transformed.transport,
          meals: transformed.meals.makkah,
          minaArafat: transformed.minaArafat.mina,
          lectures: transformed.lectures.map(l => l.title),
        };
      })
    : null;

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
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">Error loading Hajj packages. Please try again later.</p>
              </div>
            ) : !displayPackages ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No Hajj packages available at the moment. Please check back later.</p>
              </div>
            ) : (
              displayPackages.map((pkg: DisplayPackage, index: number) => (
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
                          <p className="text-muted-foreground text-sm">{pkg.features.find((f: string) => f.toLowerCase().includes('flight')) || "Premium airlines"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Bus className="text-primary mt-1 shrink-0" size={20} />
                        <div>
                          <h4 className="font-semibold text-foreground">Transport</h4>
                          <p className="text-muted-foreground text-sm">{pkg.transport}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <Hotel className="text-primary mt-1 shrink-0" size={20} />
                        <div>
                          <h4 className="font-semibold text-foreground">Accommodation</h4>
                          <p className="text-muted-foreground text-sm">{pkg.hotelMakkah}</p>
                          <p className="text-muted-foreground text-sm">{pkg.hotelMadinah}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Mina & Arafat</h4>
                        <p className="text-muted-foreground text-sm">{pkg.minaArafat}</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {pkg.lectures && pkg.lectures.length > 0 && (
                        <div className="flex items-start gap-3">
                          <BookOpen className="text-primary mt-1 shrink-0" size={20} />
                          <div>
                            <h4 className="font-semibold text-foreground">Lectures</h4>
                            {pkg.lectures.map((lecture: string, i: number) => (
                              <p key={i} className="text-muted-foreground text-sm">{lecture}</p>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <Utensils className="text-primary mt-1 shrink-0" size={20} />
                        <div>
                          <h4 className="font-semibold text-foreground">Meals</h4>
                          <p className="text-muted-foreground text-sm">{pkg.meals}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div>
                        <p className="text-3xl font-bold text-primary">{pkg.price ? formatPrice(Number(pkg.price)) : 'Contact for pricing'}</p>
                        <p className="text-muted-foreground text-sm">per person</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {packageIncludes.map((item) => (
                          <span key={item} className="inline-flex items-center gap-1 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            <Check size={14} className="text-primary" /> {item}
                          </span>
                        ))}
                      </div>
                      <Button size="lg" className="bg-[#5C0120] text-white hover:bg-[#4a0019] whitespace-nowrap">
                        <Link to="/contact">Book Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}

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
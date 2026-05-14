import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Plane, Hotel, Bus, Utensils, Tent, BookOpen } from "lucide-react";
import { useAllPackages } from "@/hooks/useSupabase";
import { Package, FlightInfo, Accommodation, Transportation, MinaArafat, Meals, Lecture, IncludeItem } from "@/types/supabase";

const fallbackPackages = [
  {
    title: "Hajj Premium Package",
    description: "Complete Hajj experience with 5-star accommodations",
    price: "$8,500",
    type: "hajj",
    features: ["Visa Included", "5-Star Hotels", "Private Transport", "VIP Tents", "Flight Tickets", "Guided Tours"],
    link: "/hajj"
  },
  {
    title: "Umrah Standard Package",
    description: "Comfortable Umrah journey with quality accommodations",
    price: "$3,200",
    type: "umrah",
    features: ["Visa Included", "4-Star Hotels", "Transport", "Flight Tickets", "Guided Tours"],
    link: "/umrah"
  },
  {
    title: "Umrah VIP Package",
    description: "Luxury Umrah experience with premium services",
    price: "$5,800",
    type: "umrah",
    features: ["Visa Included", "5-Star Hotels", "Private Transport", "VIP Tents", "Flight Tickets", "Personal Guide"],
    link: "/umrah"
  },
  {
    title: "Hajj Economy Package",
    description: "Affordable Hajj with quality accommodations",
    price: "$6,500",
    type: "hajj",
    features: ["Visa Included", "4-Star Hotels", "Transport", "Flight Tickets", "Group Guide"],
    link: "/hajj"
  }
];

const Packages = () => {
  const { data: packages, isLoading, error } = useAllPackages();

  // Helper to parse JSON safely
  const parseJson = <T,>(jsonString: string, fallback: T): T => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return fallback;
    }
  };

  const displayPackages = packages && packages.length > 0
    ? packages.map((pkg: Package) => {
        const flights: FlightInfo = parseJson(pkg.flights, { notes: "", return: "", airline: "", departure: "" });
        const accommodations: Accommodation[] = parseJson(pkg.accommodations, []);
        const transportation: Transportation = parseJson(pkg.transportation, { type: "", description: "" });
        const minaArafat: MinaArafat = parseJson(pkg.mina_arafat, { minaTentType: "", tentFeatures: "", arafatDetails: "" });
        const meals: Meals = parseJson(pkg.meals, { mina: "", makkah: "", madinah: "" });
        const lectures: Lecture[] = parseJson(pkg.lectures, []);
        const includes: IncludeItem[] = parseJson(pkg.includes, []);

        return {
          ...pkg,
          parsedFlights: flights,
          parsedAccommodations: accommodations,
          parsedTransportation: transportation,
          parsedMinaArafat: minaArafat,
          parsedMeals: meals,
          parsedLectures: lectures,
          parsedIncludes: includes,
        };
      })
    : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Our Packages</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Choose Your Pilgrimage</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Select from our carefully curated Hajj and Umrah packages designed to make your journey comfortable and memorable
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">Error loading packages. Please try again later.</p>
              </div>
            ) : !displayPackages ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No packages available at the moment. Please check back later.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
                {displayPackages.map((pkg, index) => {
                  const hasFlights = pkg.parsedFlights.airline || pkg.parsedFlights.notes || pkg.parsedFlights.return || pkg.parsedFlights.departure;
                  const hasAccommodations = pkg.parsedAccommodations.length > 0;
                  const hasTransportation = pkg.parsedTransportation.type || pkg.parsedTransportation.description;
                  const hasMinaArafat = pkg.parsedMinaArafat.minaTentType || pkg.parsedMinaArafat.tentFeatures || pkg.parsedMinaArafat.arafatDetails;
                  const hasMeals = pkg.parsedMeals.mina || pkg.parsedMeals.makkah || pkg.parsedMeals.madinah;
                  const hasLectures = pkg.parsedLectures.length > 0;
                  const hasIncludes = pkg.parsedIncludes.length > 0;

                  return (
                    <div key={`${pkg.name}-${index}`} className="bg-card rounded-lg border border-border p-6 md:p-8">
                      <div className="mb-6">
                        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{pkg.name || 'Package'}</h3>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          {pkg.price && (
                            <span className="text-xl font-semibold text-primary">{pkg.price} / person</span>
                          )}
                          {(pkg.start_date || pkg.end_date) && (
                            <span>
                              {pkg.start_date ? new Date(pkg.start_date).toLocaleDateString() : 'TBD'} - {pkg.end_date ? new Date(pkg.end_date).toLocaleDateString() : 'TBD'}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {hasFlights && (
                          <div className="flex items-start gap-2">
                            <Plane className="text-primary mt-0.5 shrink-0" size={18} />
                            <div className="text-sm">
                              <p className="font-medium text-foreground">Flight</p>
                              <p className="text-muted-foreground">{pkg.parsedFlights.airline || 'Available'}</p>
                            </div>
                          </div>
                        )}

                        {hasAccommodations && (
                          <div className="flex items-start gap-2">
                            <Hotel className="text-primary mt-0.5 shrink-0" size={18} />
                            <div className="text-sm">
                              <p className="font-medium text-foreground">Accommodation</p>
                              <p className="text-muted-foreground">{pkg.parsedAccommodations.map(a => `${a.city}: ${a.name}`).join(', ') || 'Included'}</p>
                            </div>
                          </div>
                        )}

                        {hasTransportation && (
                          <div className="flex items-start gap-2">
                            <Bus className="text-primary mt-0.5 shrink-0" size={18} />
                            <div className="text-sm">
                              <p className="font-medium text-foreground">Transportation</p>
                              <p className="text-muted-foreground">{pkg.parsedTransportation.type || 'Included'}</p>
                            </div>
                          </div>
                        )}

                        {hasMeals && (
                          <div className="flex items-start gap-2">
                            <Utensils className="text-primary mt-0.5 shrink-0" size={18} />
                            <div className="text-sm">
                              <p className="font-medium text-foreground">Meals</p>
                              <p className="text-muted-foreground">Included</p>
                            </div>
                          </div>
                        )}

                        {hasMinaArafat && pkg.type === 'hajj' && (
                          <div className="flex items-start gap-2">
                            <Tent className="text-primary mt-0.5 shrink-0" size={18} />
                            <div className="text-sm">
                              <p className="font-medium text-foreground">Mina & Arafat</p>
                              <p className="text-muted-foreground">VIP Tents</p>
                            </div>
                          </div>
                        )}

                        {hasLectures && (
                          <div className="flex items-start gap-2">
                            <BookOpen className="text-primary mt-0.5 shrink-0" size={18} />
                            <div className="text-sm">
                              <p className="font-medium text-foreground">Lectures</p>
                              <p className="text-muted-foreground">Included</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {hasIncludes && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-foreground mb-3">What's Included</h4>
                          <div className="flex flex-wrap gap-2">
                            {pkg.parsedIncludes.slice(0, 6).map((item, i) => (
                              <span key={i} className="inline-flex items-center gap-1 text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                                <Check size={12} className="text-primary" /> {item.text}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <Link to={pkg.type === 'hajj' ? '/hajj' : '/umrah'}>
                        <Button className="w-full bg-[#5C0120] text-white hover:bg-[#4a0019]">
                          View {pkg.type === 'hajj' ? 'Hajj' : 'Umrah'} Packages <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
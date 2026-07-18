import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useHajjPackages } from "@/hooks/useSupabase";
import { transformPackageForDisplay } from "@/lib/packageUtils";

const Hajj = () => {
  const { data: packages, isLoading, error } = useHajjPackages();
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 slide-right">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Sacred Journey</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Hajj Packages 2026</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Begin your sacred pilgrimage with our carefully planned Hajj packages. We ensure a spiritual and comfortable journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">Error loading Hajj packages. Please try again later.</p>
              </div>
            ) : !packages || packages.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No Hajj packages available at the moment. Please check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-slide">
                {packages.map((pkg) => {
                  const transformed = transformPackageForDisplay({
                    package: pkg,
                    flights: [],
                    hotels: [],
                    transports: [],
                    minaArafat: null,
                    meals: null,
                    lectures: [],
                    includes: [],
                  });

                  return (
                    <div key={pkg.id} className="flex justify-center slide-right">
                      <PackageCard
                        title={pkg.name || 'Hajj Package'}
                        dates={transformed.dates}
                        price={pkg.price ? formatPrice(Number(pkg.price)) : 'Contact'}
                        typeLabel="Hajj"
                        description={transformed.description}
                        flight={transformed.flight.airline}
                        accommodation={`${transformed.hotels.makkah.name} / ${transformed.hotels.madinah.name}`}
                        transport={transformed.transport}
                        includes={transformed.includes.slice(0, 4)}
                        ctaHref={`/booking?packageId=${String(pkg.id)}`}
                        responsive={true}
                        layout="grid"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mt-16 slide-right">
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
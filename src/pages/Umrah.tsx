import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useUmrahPackages } from "@/hooks/useSupabase";
import { transformPackageForDisplay } from "@/lib/packageUtils";

const Umrah = () => {
  const { data: packages, isLoading, error } = useUmrahPackages();
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-16 bg-[radial-gradient(circle_at_top_left,_rgba(92,1,32,0.08),_transparent_35%),_radial-gradient(circle_at_bottom_right,_rgba(92,1,32,0.08),_transparent_40%)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 slide-right">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Spiritual Journey</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Umrah Packages 2026</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Embark on a spiritual journey with our thoughtfully designed Umrah packages. Experience comfort and devotion.
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
                <p className="text-red-500">Error loading Umrah packages. Please try again later.</p>
              </div>
            ) : !packages || packages.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No Umrah packages available at the moment. Please check back later.</p>
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
                        title={pkg.name || 'Umrah Package'}
                        dates={transformed.dates}
                        price={pkg.price ? formatPrice(Number(pkg.price)) : 'Contact'}
                        typeLabel="Umrah"
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
      </div>
      <Footer />
    </div>
  );
};

export default Umrah;
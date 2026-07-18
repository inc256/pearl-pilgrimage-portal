import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import { useAllPackages } from "@/hooks/useSupabase";
import { Package } from "@/types/supabase";
import { useCurrency } from "@/contexts/CurrencyContext";
import { transformPackageForDisplay } from "@/lib/packageUtils";

const Packages = () => {
  const { data: packages, isLoading, error } = useAllPackages();
  const { formatPrice } = useCurrency();

  const parseJson = <T,>(jsonString: string, fallback: T): T => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return fallback;
    }
  };

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
            ) : !packages || packages.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No packages available at the moment. Please check back later.</p>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                {packages.map((pkg: Package) => {
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
                  const ctaHref = pkg.type === 'hajj' ? '/hajj' : pkg.type === 'umrah' ? '/umrah' : '/booking';

                  return (
                    <PackageCard
                      key={pkg.id}
                      title={pkg.name || `${pkg.type?.toUpperCase() || 'Package'} ${pkg.id}`}
                      dates={transformed.dates}
                      price={pkg.price ? formatPrice(Number(pkg.price)) : 'Contact'}
                      typeLabel={pkg.type?.toUpperCase() || 'Package'}
                      description={transformed.description}
                      flight={transformed.flight.airline}
                      accommodation={`${transformed.hotels.makkah.name} / ${transformed.hotels.madinah.name}`}
                      transport={transformed.transport}
                      includes={transformed.includes.slice(0, 4)}
                      ctaHref={ctaHref}
                    />
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

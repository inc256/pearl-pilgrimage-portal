import PackageCard from "@/components/PackageCard";
import { useHajjPackages } from "@/hooks/useSupabase";
import { transformPackageForDisplay } from "@/lib/packageUtils";
import { useCurrency } from "@/contexts/CurrencyContext";

const HajjPackage = () => {
  const { data: packages, isLoading, error } = useHajjPackages();
  const { formatPrice } = useCurrency();

  if (isLoading) {
    return (
      <section id="hajj" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Premium Experience</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Hajj Packages</h2>
          </div>
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !packages || packages.length === 0) {
    return null;
  }

  return (
    <section id="hajj" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-accent font-medium text-sm uppercase tracking-[0.3em] mb-3">Premium Experience</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Hajj Packages</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-base md:text-lg">
            Explore our premium Hajj journeys enriched with luxury stays and expert support.
          </p>
        </div>

        {/* Grid layout - full width, 1 col mobile, 2 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <PackageCard
                key={pkg.id}
                title={pkg.name || 'Hajj Package'}
                dates={transformed.dates}
                price={pkg.price ? formatPrice(Number(pkg.price)) : 'Contact'}
                typeLabel="Hajj"
                description={transformed.description}
                // Pass the raw Supabase JSON straight through - PackageCard
                // parses flights/accommodations/transportation itself, hides
                // the flight row when empty, and shows per-hotel star ratings.
                flight={pkg.flights}
                accommodation={pkg.accommodations}
                transport={pkg.transportation}
                includes={transformed.includes.slice(0, 4)}
                ctaHref={`/booking?packageId=${String(pkg.id)}`}
                orientation="landscape"
                layout="grid"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HajjPackage;
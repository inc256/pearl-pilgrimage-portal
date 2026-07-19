import PackageCard from "@/components/PackageCard";
import { useUmrahPackages } from "@/hooks/useSupabase";
import { transformPackageForDisplay } from "@/lib/packageUtils";
import { useCurrency } from "@/contexts/CurrencyContext";

const UmrahPackagesCarousel = () => {
  const { data: packages, isLoading, error } = useUmrahPackages();
  const { formatPrice } = useCurrency();

  if (isLoading) {
    return (
      <section id="umrah" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Pilgrimage Packages</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Umrah Packages</h2>
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
    <section id="umrah" className="py-24 bg-[radial-gradient(circle_at_top_left,_rgba(92,1,32,0.08),_transparent_35%),_radial-gradient(circle_at_bottom_right,_rgba(92,1,32,0.08),_transparent_40%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-accent font-medium text-sm uppercase tracking-[0.3em] mb-3">Pilgrimage Packages</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Umrah Packages</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-base md:text-lg">
            Choose from our curated Umrah packages with refined accommodations and premium transport.
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto pb-4 px-4 sm:-mx-8 sm:px-8">
          <div className="flex gap-6 min-w-[max-content] snap-x snap-mandatory">
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
                  title={pkg.name || 'Umrah Package'}
                  dates={transformed.dates}
                  price={pkg.price ? formatPrice(Number(pkg.price)) : 'Contact'}
                  typeLabel="Umrah"
                  description={transformed.description}
                  // Pass the raw Supabase JSON straight through - PackageCard
                  // parses flights/accommodations/transportation itself, hides
                  // the flight row when empty, and shows per-hotel star ratings.
                  flight={pkg.flights}
                  accommodation={pkg.accommodations}
                  transport={pkg.transportation}
                  includes={transformed.includes.slice(0, 4)}
                  ctaHref={`/booking?packageId=${String(pkg.id)}`}
                  orientation="portrait"
                  layout="carousel"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UmrahPackagesCarousel;
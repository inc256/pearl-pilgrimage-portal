import { Button } from "@/components/ui/button";
import { Plane, Hotel, Bus, Calendar, DollarSign, Check } from "lucide-react";
import { useUmrahPackages } from "@/hooks/useSupabase";
import { transformPackageForDisplay } from "@/lib/packageUtils";
import { Link } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useEffect, useState } from "react";

const UmrahPackages = () => {
  const { data: packages, isLoading, error } = useUmrahPackages();
  const { formatPrice, currency } = useCurrency();
  const [refreshKey, setRefreshKey] = useState(0);

  // Force re-render when currency changes
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
    console.log('UmrahPackages currency changed to:', currency);
  }, [currency]);

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

  const featuredPackage = packages[0];
  const transformed = transformPackageForDisplay({
    package: featuredPackage,
    flights: [],
    hotels: [],
    transports: [],
    minaArafat: null,
    meals: null,
    lectures: [],
    includes: [],
  });

  return (
    <section id="umrah" className="py-20 bg-background" key={refreshKey}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Pilgrimage Packages</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{featuredPackage.name || 'Umrah Packages'}</h2>
          <p className="text-sm text-muted-foreground mt-2">Showing prices in: {currency}</p>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-lg border border-border p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Travel Dates</h4>
                  <p className="text-muted-foreground text-sm">{transformed.dates}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Plane className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Flight</h4>
                  <p className="text-muted-foreground text-sm">{transformed.flight.airline}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bus className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Transportation</h4>
                  <p className="text-muted-foreground text-sm">{transformed.transport}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Hotel className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Accommodation</h4>
                  <p className="text-muted-foreground text-sm">Makkah: {transformed.hotels.makkah.name}</p>
                  <p className="text-muted-foreground text-sm">Madinah: {transformed.hotels.madinah.name}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Lectures & Ceremonies</h4>
                {transformed.lectures.length > 0 ? (
                  transformed.lectures.slice(0, 2).map((lecture, i) => (
                    <p key={i} className="text-muted-foreground text-sm">{lecture.title}</p>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">Pre-travel lectures included</p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                <DollarSign size={20} />
                <span className="font-semibold text-lg">
                  {formatPrice(Number(featuredPackage.price || 0))} / person
                </span>
              </div>
                <div className="flex flex-wrap gap-3">
                  {transformed.includes.length > 0 ? (
                    transformed.includes.slice(0, 4).map((item) => (
                      <span key={item} className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Check size={14} className="text-primary" /> {item}
                      </span>
                    ))
                  ) : (
                    ["Visa", "Flight", "Hotel", "Transport"].map((item) => (
                      <span key={item} className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Check size={14} className="text-primary" /> {item}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <Link to="/umrah">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-secondary whitespace-nowrap">
                  View Umrah Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UmrahPackages;
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Bus, Calendar, Utensils, Check, BookOpen, DollarSign } from "lucide-react";
import { useHajjPackages } from "@/hooks/useSupabase";
import { transformPackageForDisplay } from "@/lib/packageUtils";
import { Link } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";

const HajjPackage = () => {
  const { data: packages, isLoading, error } = useHajjPackages();
  const { formatPrice, currency } = useCurrency();

  console.log('Current currency in HajjPackage:', currency);

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

  const featuredPackage = packages[0];
  console.log('Package price:', featuredPackage.price);
  console.log('Formatted price:', formatPrice(featuredPackage.price));
  
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
    <section id="hajj" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Premium Experience</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{featuredPackage.name || 'Hajj Packages'}</h2>
          <p className="text-sm text-muted-foreground mt-2">💰 Displaying in: {currency}</p>
        </div>

        <div className="max-w-5xl mx-auto bg-card rounded-lg border border-border p-6 md:p-10">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-5">
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
                  <h4 className="font-semibold text-foreground">Transport</h4>
                  <p className="text-muted-foreground text-sm">{transformed.transport}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Hotel className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Accommodation</h4>
                  <p className="text-muted-foreground text-sm">Makkah: {transformed.hotels.makkah.name}</p>
                  <p className="text-muted-foreground text-sm">Madinah: {transformed.hotels.madinah.name}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Mina & Arafat</h4>
                <p className="text-muted-foreground text-sm">{transformed.minaArafat.mina}</p>
                <p className="text-muted-foreground text-sm">{transformed.minaArafat.arafat}</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <BookOpen className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Lectures</h4>
                  {transformed.lectures.length > 0 ? (
                    transformed.lectures.slice(0, 3).map((lecture, i) => (
                      <p key={i} className="text-muted-foreground text-sm">{lecture.title}</p>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">Pre-travel lectures included</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Utensils className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Meals</h4>
                  <p className="text-muted-foreground text-sm">Makkah: {transformed.meals.makkah}</p>
                  <p className="text-muted-foreground text-sm">Madinah: {transformed.meals.madinah}</p>
                  <p className="text-muted-foreground text-sm">Mina: {transformed.meals.mina}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                {featuredPackage.price && (
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign size={20} />
                  <span className="font-semibold text-lg">
                    {formatPrice(Number(featuredPackage.price))} / person
                  </span>
                </div>
              )}
                <div className="flex flex-wrap gap-3">
                  {transformed.includes.length > 0 ? (
                    transformed.includes.slice(0, 5).map((item) => (
                      <span key={item} className="inline-flex items-center gap-1 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        <Check size={14} className="text-primary" /> {item}
                      </span>
                    ))
                  ) : (
                    ["Visa", "Accommodation", "Flight", "Transport", "Meals"].map((item) => (
                      <span key={item} className="inline-flex items-center gap-1 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        <Check size={14} className="text-primary" /> {item}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <Link to="/hajj">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-secondary whitespace-nowrap">
                  View Hajj Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HajjPackage;
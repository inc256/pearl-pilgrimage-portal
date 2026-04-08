import { Button } from "@/components/ui/button";
import { Plane, Hotel, Bus, Calendar, Utensils, Check, BookOpen } from "lucide-react";

const packageIncludes = [
  "Visa", "5-star accommodations", "Return flight",
  "Ground transport", "VIP Mina tents"
];

const HajjPackage = () => {
  return (
    <section id="hajj" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Premium Experience</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Hajj 2026 Premium Package</h2>
        </div>

        <div className="max-w-5xl mx-auto bg-card rounded-lg border border-border p-6 md:p-10">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Calendar className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Travel Dates</h4>
                  <p className="text-muted-foreground text-sm">12th May – 5th June</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Plane className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Flight</h4>
                  <p className="text-muted-foreground text-sm">Emirates</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bus className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Transport</h4>
                  <p className="text-muted-foreground text-sm">Private luxury buses</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Hotel className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Accommodation</h4>
                  <p className="text-muted-foreground text-sm">Makkah: Fairmont Hotel</p>
                  <p className="text-muted-foreground text-sm">Aziziya: Al-Maqam Suites</p>
                  <p className="text-muted-foreground text-sm">Madinah: Zamzam Pullman Hotel</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Mina & Arafat</h4>
                <p className="text-muted-foreground text-sm">Class A VIP air-conditioned tents</p>
                <p className="text-muted-foreground text-sm">Private air-conditioned tent (Arafat)</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <BookOpen className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Lectures</h4>
                  <p className="text-muted-foreground text-sm">Two lectures before travel</p>
                  <p className="text-muted-foreground text-sm">Official send-off ceremony</p>
                  <p className="text-muted-foreground text-sm">Practical sessions in Makkah</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Utensils className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Meals</h4>
                  <p className="text-muted-foreground text-sm">Madinah: Breakfast & dinner</p>
                  <p className="text-muted-foreground text-sm">Makkah: Breakfast only</p>
                  <p className="text-muted-foreground text-sm">Mina: All meals included</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex flex-wrap gap-3">
                {packageIncludes.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    <Check size={14} className="text-primary" /> {item}
                  </span>
                ))}
              </div>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-secondary whitespace-nowrap">
                Reserve Your Spot
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HajjPackage;

import { Button } from "@/components/ui/button";
import { Plane, Hotel, Bus, Calendar, DollarSign, Check } from "lucide-react";

const includes = ["Visa", "Historical sites tour", "5 Star Hotel", "Return Flight"];

const UmrahPackages = () => {
  return (
    <section id="umrah" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Pilgrimage Packages</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Ramadhan Umrah Packages</h2>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-lg border border-border p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Dates */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Travel Dates</h4>
                  <p className="text-muted-foreground text-sm">Early Ramadhan: 17th Feb – 26th Feb</p>
                  <p className="text-muted-foreground text-sm">Late Ramadhan: 5th – 19th March</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Plane className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Flight</h4>
                  <p className="text-muted-foreground text-sm">Qatar Airways</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bus className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Transportation</h4>
                  <p className="text-muted-foreground text-sm">Private Buses</p>
                </div>
              </div>
            </div>

            {/* Hotels */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Hotel className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-foreground">Accommodation</h4>
                  <p className="text-muted-foreground text-sm">Makkah: Hilton Convention Hotel (5-Star)</p>
                  <p className="text-muted-foreground text-sm">Madinah: Dar Eiman Al Haram Hotel (5-Star)</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Lectures & Ceremonies</h4>
                <p className="text-muted-foreground text-sm">Send-off ceremony in Uganda</p>
                <p className="text-muted-foreground text-sm">Practical session in Madinah</p>
              </div>
            </div>
          </div>

          {/* Price & Includes */}
          <div className="border-t border-border pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="text-accent" size={20} />
                  <span className="font-heading text-2xl font-bold text-foreground">2,950 USD</span>
                  <span className="text-muted-foreground text-sm">/ person</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {includes.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <Check size={14} className="text-primary" /> {item}
                    </span>
                  ))}
                </div>
              </div>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-secondary whitespace-nowrap">
                Book This Package
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UmrahPackages;

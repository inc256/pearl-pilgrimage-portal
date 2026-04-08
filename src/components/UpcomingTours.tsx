import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import tourTurkey from "@/assets/tour-turkey.jpg";
import tourEgypt from "@/assets/tour-egypt.jpg";
import tourMorocco from "@/assets/tour-morocco.jpg";

const tours = [
  {
    title: "Turkey Islamic Tour",
    description: "Explore Istanbul's magnificent mosques, bazaars, and rich Ottoman heritage on this guided spiritual journey.",
    image: tourTurkey,
  },
  {
    title: "Egypt Historical Tour",
    description: "Visit the pyramids, Islamic Cairo, and historic mosques in this unforgettable cultural experience.",
    image: tourEgypt,
  },
  {
    title: "Morocco Cultural Tour",
    description: "Discover the beauty of Marrakech, Fes, and Morocco's stunning Islamic architecture and traditions.",
    image: tourMorocco,
  },
];

const UpcomingTours = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Explore More</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Upcoming Tours</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tours.map((tour) => (
            <div key={tour.title} className="bg-card rounded-lg border border-border overflow-hidden group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{tour.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{tour.description}</p>
                <Button variant="ghost" size="sm" className="text-primary hover:text-secondary p-0">
                  Learn More <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingTours;

import { useTours } from "@/hooks/useSupabase";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ErrorDisplay } from "./ErrorDisplay";
import { LoadingSpinner } from "./LoadingSpinner";

const UpcomingTours = () => {
  const { data: tours, isLoading, error, refetch } = useTours();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Explore More</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Upcoming Tours</h2>
        </div>

        {isLoading ? (
          <LoadingSpinner text="Loading tours..." />
        ) : error ? (
          <ErrorDisplay
            title="Failed to load tours"
            message="We couldn't load the upcoming tours. Please try again."
            onRetry={() => refetch()}
          />
        ) : tours && tours.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-card rounded-lg border border-border overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={tour.image_url || ""}
                    alt={tour.title || "Tour image"}
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
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No upcoming tours available yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingTours;

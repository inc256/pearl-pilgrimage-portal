import { Star } from "lucide-react";
import { useHotels } from "@/hooks/useSupabase";
import { ErrorDisplay } from "./ErrorDisplay";
import { LoadingSpinner } from "./LoadingSpinner";

const HotelsSection = () => {
  const { data: hotels, isLoading, error, refetch } = useHotels();

  if (!hotels || hotels.length === 0) {
    return null;
  }

  return (
    <section id="hotels" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Partner Hotels</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Premium Accommodations</h2>
        </div>

        {isLoading ? (
          <LoadingSpinner text="Loading hotels..." />
        ) : error ? (
          <ErrorDisplay
            title="Failed to load hotels"
            message="We couldn't load the hotel information. Please try again."
            onRetry={() => refetch()}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-card rounded-lg border border-border overflow-hidden">
                {hotel.image_url && (
                  <div className="aspect-[3/2] overflow-hidden">
                    <img 
                      src={hotel.image_url} 
                      alt={hotel.name || "Hotel"} 
                      loading="lazy" 
                      width={800} 
                      height={600} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-heading text-sm font-semibold text-foreground">{hotel.name}</h3>
                  <p className="text-muted-foreground text-xs mb-2">{hotel.city}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: hotel.stars || 0 }).map((_, j) => (
                      <Star key={j} size={12} className="text-accent fill-accent" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelsSection;

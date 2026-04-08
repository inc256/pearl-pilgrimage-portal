import { Star } from "lucide-react";
import galleryHotel from "@/assets/gallery-hotel.jpg";
import galleryClockTower from "@/assets/gallery-clocktower.jpg";

const hotels = [
  { name: "Hilton Convention Hotel", location: "Makkah", stars: 5, image: galleryHotel },
  { name: "Dar Eiman Al Haram", location: "Madinah", stars: 5, image: galleryClockTower },
  { name: "Fairmont Hotel", location: "Makkah", stars: 5, image: galleryHotel },
  { name: "Zamzam Pullman Hotel", location: "Madinah", stars: 5, image: galleryClockTower },
];

const HotelsSection = () => {
  return (
    <section id="hotels" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Partner Hotels</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Premium Accommodations</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {hotels.map((hotel, i) => (
            <div key={i} className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={hotel.image} alt={hotel.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-sm font-semibold text-foreground">{hotel.name}</h3>
                <p className="text-muted-foreground text-xs mb-2">{hotel.location}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: hotel.stars }).map((_, j) => (
                    <Star key={j} size={12} className="text-accent fill-accent" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelsSection;

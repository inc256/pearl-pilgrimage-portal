import galleryMadinah from "@/assets/gallery-madinah.jpg";
import galleryPilgrims from "@/assets/gallery-pilgrims.jpg";
import galleryHotel from "@/assets/gallery-hotel.jpg";
import galleryGroup from "@/assets/gallery-group.jpg";
import galleryClockTower from "@/assets/gallery-clocktower.jpg";
import galleryArafat from "@/assets/gallery-arafat.jpg";

const images = [
  { src: galleryMadinah, alt: "Madinah Mosque Interior" },
  { src: galleryPilgrims, alt: "Pilgrims at Kaaba" },
  { src: galleryHotel, alt: "Luxury Hotel Room" },
  { src: galleryGroup, alt: "Group Photo in Makkah" },
  { src: galleryClockTower, alt: "Makkah Clock Tower" },
  { src: galleryArafat, alt: "Mount Arafat" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Memories</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Gallery</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {images.map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

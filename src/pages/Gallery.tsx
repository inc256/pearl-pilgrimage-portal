import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import galleryMadinah from "@/assets/gallery-madinah.jpg";
import galleryPilgrims from "@/assets/gallery-pilgrims.jpg";
import galleryHotel from "@/assets/gallery-hotel.jpg";
import galleryGroup from "@/assets/gallery-group.jpg";
import galleryClockTower from "@/assets/gallery-clocktower.jpg";
import galleryArafat from "@/assets/gallery-arafat.jpg";

const allImages = [
  { src: galleryMadinah, alt: "Madinah Mosque Interior" },
  { src: galleryPilgrims, alt: "Pilgrims at Kaaba" },
  { src: galleryHotel, alt: "Luxury Hotel Room" },
  { src: galleryGroup, alt: "Group Photo in Makkah" },
  { src: galleryClockTower, alt: "Makkah Clock Tower" },
  { src: galleryArafat, alt: "Mount Arafat" },
  { src: galleryMadinah, alt: "Madinah Sunrise" },
  { src: galleryPilgrims, alt: "Tawaf Circle" },
  { src: galleryHotel, alt: "Hotel Lobby" },
  { src: galleryGroup, alt: "Group Dua" },
  { src: galleryClockTower, alt: "Makkah at Night" },
  { src: galleryArafat, alt: "Prayer at Arafat" },
  { src: galleryMadinah, alt: "Qibla Direction" },
  { src: galleryPilgrims, alt: "Sa'i Between Safa and Marwa" },
  { src: galleryHotel, alt: "Restaurant View" },
  { src: galleryGroup, alt: "Umrah Group 2025" },
  { src: galleryClockTower, alt: "Grand Mosque Exterior" },
  { src: galleryArafat, alt: "Jabal Rahma" },
];

const Gallery = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Memories</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Gallery</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Experience the beauty of the holy cities through our collection of memorable moments from our pilgrims.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allImages.map((img, i) => (
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
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;

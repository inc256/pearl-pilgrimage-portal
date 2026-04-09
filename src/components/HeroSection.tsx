import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-makkah.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Masjid al-Haram in Makkah"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
          Experience Hajj & Umrah with Comfort, Guidance, and Trust
        </h1>
        <p className="text-primary-foreground/80 text-base sm:text-lg mb-8 max-w-xl mx-auto font-body">
          Premium pilgrimage and travel services tailored for your spiritual journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-secondary text-base px-8">
            <a href="#umrah">View Packages</a>
          </Button>
          <Button size="lg" variant="outline" className="border-[#5C0120] text-[#5C0120] hover:bg-[#5C0120] hover:text-white text-base px-8">
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UmrahPackages from "@/components/UmrahPackages";
import HajjPackage from "@/components/HajjPackage";
import UpcomingTours from "@/components/UpcomingTours";
import HotelsSection from "@/components/HotelsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GallerySection from "@/components/GallerySection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <UmrahPackages />
      <HajjPackage />
      <UpcomingTours />
      <HotelsSection />
      <GallerySection limit={6} />
      <FAQSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;

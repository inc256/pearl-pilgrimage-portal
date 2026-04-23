import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UmrahPackages from "@/components/UmrahPackages";
import HajjPackage from "@/components/HajjPackage";
import HotelsSection from "@/components/HotelsSection";
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
      <HotelsSection />
      <GallerySection limit={6} />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;

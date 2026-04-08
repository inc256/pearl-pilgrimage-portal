import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UmrahPackages from "@/components/UmrahPackages";
import HajjPackage from "@/components/HajjPackage";
import UpcomingTours from "@/components/UpcomingTours";
import HotelsSection from "@/components/HotelsSection";
import GallerySection from "@/components/GallerySection";
import BlogSection from "@/components/BlogSection";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <UmrahPackages />
      <HajjPackage />
      <UpcomingTours />
      <HotelsSection />
      <GallerySection />
      <BlogSection />
      <TeamSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;

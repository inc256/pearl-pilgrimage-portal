import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UmrahPackagesCarousel from "@/components/UmrahPackagesCarousel";
import HajjPackageCarousel from "@/components/HajjPackageCarousel";
import HotelsSection from "@/components/HotelsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    navigate("/booking");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection onBookNow={handleBookNowClick} />
      <UmrahPackagesCarousel />
      <HajjPackageCarousel />
      <HotelsSection />
      <Footer />
    </div>
  );
};

export default Index;
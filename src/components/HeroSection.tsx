import { useEffect, useMemo, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import heroOne from "@/assets/Hero/hero1.jpg";
import heroTwo from "@/assets/Hero/hero2.jpg";
import heroThree from "@/assets/Hero/hero3.jpg";
import heroFour from "@/assets/Hero/hero4.jpeg";
import heroFive from "@/assets/Hero/hero5.webp";
import heroSix from "@/assets/Hero/hero6.jpg";

const slides = [
  {
    title: "Your journey to the sacred House of Allah begins here",
    subtitle: "Experience a spiritually enriching Umrah with our premium services, designed to bring you closer to your faith.",
    image: heroOne,
  },
  {
    title: "Professional media coverage for your spiritual journey",
    subtitle: "Our dedicated media team captures every sacred moment, preserving your pilgrimage memories forever.",
    image: heroTwo,
  },
  {
    title: "Your trusted team of pilgrimage specialists",
    subtitle: "A dedicated team of professionals committed to making your Hajj and Umrah experience seamless and memorable.",
    image: heroThree,
  },
  {
    title: "Making dreams come true, one pilgrimage at a time",
    subtitle: "Witness the joy of a son surprising his father with the gift of Umrah - creating memories that last a lifetime.",
    image: heroFour,
  },
  {
    title: "State-of-the-art facilities",
    subtitle: "Visit our modern offices where we plan and coordinate every detail of your sacred journey.",
    image: heroFive,
  },
  {
    title: "Strategic planning for your perfect pilgrimage",
    subtitle: "Our team collaborates tirelessly to ensure every aspect of your journey exceeds expectations.",
    image: heroSix,
  }
];

interface HeroSectionProps {
  onBookNow?: () => void;
}

const HeroSection = ({ onBookNow }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const slide = useMemo(() => slides[current], [current]);

  // Detect if device supports touch
  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
    // On touch devices, show controls initially
    setShowControls(hasTouch);
  }, []);

  const goToPrevious = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    resetControlsTimeout();
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    resetControlsTimeout();
  };

  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleInteraction = () => {
    resetControlsTimeout();
  };

  // Handle touch events on the section
  const handleTouchStart = () => {
    resetControlsTimeout();
  };

  // Handle mouse movement on desktop
  const handleMouseMove = () => {
    if (!isTouchDevice) {
      resetControlsTimeout();
    }
  };

  // Handle swipe gestures
  let touchStartX = 0;
  let touchStartY = 0;
  
  const handleTouchStartSwipe = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchEndSwipe = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-slide timer
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden fade-slide select-none"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchStartCapture={handleTouchStartSwipe}
      onTouchEndCapture={handleTouchEndSwipe}
      onClick={handleInteraction}
    >
      {/* Style tag to force override any global border-radius */}
      <style>
        {`
          .hero-image-container,
          .hero-image-container img,
          .hero-image-container > * {
            border-radius: 0 !important;
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            -webkit-border-radius: 0 !important;
            -moz-border-radius: 0 !important;
          }
          
          .controls-transition {
            transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
          }
          
          .controls-hidden {
            opacity: 0;
            pointer-events: none;
            transform: scale(0.9);
          }
          
          .controls-visible {
            opacity: 1;
            pointer-events: auto;
            transform: scale(1);
          }
        `}
      </style>

      {/* Image container with class for CSS override */}
      <div className="hero-image-container absolute inset-0 overflow-hidden">
        <img 
          src={slide.image} 
          alt={slide.title}
          className="h-full w-full object-cover transition-opacity duration-1000"
          style={{
            borderRadius: '0 !important',
            borderTopLeftRadius: '0 !important',
            borderTopRightRadius: '0 !important',
            borderBottomLeftRadius: '0 !important',
            borderBottomRightRadius: '0 !important',
            WebkitBorderRadius: '0 !important',
            MozBorderRadius: '0 !important',
          }}
        />
      </div>
      
      {/* Overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(92,1,32,0.20),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(92,1,32,0.15),_transparent_45%)]" />

      {/* Navigation Arrows - with auto-hide */}
      <button
        onClick={goToPrevious}
        className={`absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110 lg:left-8 controls-transition ${
          showControls ? 'controls-visible' : 'controls-hidden'
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className={`absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110 lg:right-8 controls-transition ${
          showControls ? 'controls-visible' : 'controls-hidden'
        }`}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Content - positioned towards bottom with flex-end */}
      <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-24 sm:pb-28 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h1 
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight md:leading-tight slide-right"
            style={{
              textShadow: '0 2px 30px rgba(92,1,32,0.5), 0 4px 50px rgba(92,1,32,0.35), 0 8px 70px rgba(0,0,0,0.4), 0 12px 90px rgba(0,0,0,0.2)'
            }}
          >
            {slide.title}
          </h1>
          <p 
            className="mx-auto mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 text-white/95 slide-right"
            style={{
              textShadow: '0 2px 20px rgba(92,1,32,0.4), 0 4px 30px rgba(92,1,32,0.25), 0 6px 40px rgba(0,0,0,0.3)'
            }}
          >
            {slide.subtitle}
          </p>

          {/* Location link for slide 5 - shown only on the office slide */}
          {current === 4 && (
            <div className="mt-3 flex justify-center">
              <a 
                href="https://maps.app.goo.gl/esYLE53h6KW7Et4q6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/95 hover:text-white transition-colors text-xs sm:text-sm bg-black/25 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 hover:bg-black/35"
                style={{
                  textShadow: '0 1px 12px rgba(0,0,0,0.4)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Liberty Tower Kampala Road, Room L4B09
              </a>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row scale-reveal">
            {onBookNow ? (
              <Button onClick={onBookNow} size="lg" className="bg-[#5C0120] text-white hover:bg-[#4a0019] px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all min-w-[140px] sm:min-w-[160px]">
                Book Now
              </Button>
            ) : (
              <Button asChild size="lg" className="bg-[#5C0120] text-white hover:bg-[#4a0019] px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all min-w-[140px] sm:min-w-[160px]">
                <Link to="/booking">Book Now</Link>
              </Button>
            )}
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-[#5C0120] bg-white text-[#5C0120] hover:bg-[#5C0120] hover:text-white hover:border-[#5C0120] px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px] sm:min-w-[160px]"
            >
              <Link to="/contact">Contact</Link>
            </Button>
          </div>

          {/* Slide indicator dots - positioned higher with more bottom padding */}
          <div className="mt-8 sm:mt-10 flex justify-center gap-2 sm:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-2 w-8 sm:h-2.5 sm:w-10 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "bg-white scale-110" 
                    : "bg-white/30 hover:bg-white/70"
                }`}
                onClick={() => {
                  setCurrent(index);
                  resetControlsTimeout();
                }}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - centered horizontally with left-1/2 transform */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 z-20 -translate-x-1/2">
        <button
          onClick={scrollToNextSection}
          className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-[10px] sm:text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
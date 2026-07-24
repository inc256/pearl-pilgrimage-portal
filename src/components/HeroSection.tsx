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

  const handleTouchStart = () => {
    resetControlsTimeout();
  };

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
      className="relative h-[100dvh] w-full overflow-hidden fade-slide select-none"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchStartCapture={handleTouchStartSwipe}
      onTouchEndCapture={handleTouchEndSwipe}
      onClick={handleInteraction}
    >
      {/* Style tag to force override any global border-radius */}
      <style>
        {`
          .hero-image-container {
            position: absolute;
            inset: 0;
            overflow: hidden;
            will-change: transform;
          }
          
          .hero-image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            will-change: opacity;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
          
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

          /* Scroll indicator visibility */
          .scroll-indicator {
            opacity: 0.85;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          
          .scroll-indicator:hover {
            opacity: 1;
            transform: scale(1.05);
          }

          .scroll-indicator .chevron {
            filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
          }

          @media (max-height: 700px) {
            .hero-content {
              padding-bottom: 5rem !important;
            }
            .hero-title {
              font-size: 1.5rem !important;
              line-height: 1.3 !important;
            }
            .hero-subtitle {
              font-size: 0.875rem !important;
              margin-top: 0.5rem !important;
            }
            .hero-buttons {
              margin-top: 1rem !important;
              gap: 0.5rem !important;
            }
            .hero-dots {
              margin-top: 0.75rem !important;
            }
          }

          @media (max-height: 600px) {
            .hero-content {
              padding-bottom: 3.5rem !important;
            }
            .hero-title {
              font-size: 1.25rem !important;
            }
            .hero-subtitle {
              font-size: 0.75rem !important;
            }
            .hero-buttons {
              margin-top: 0.5rem !important;
            }
            .hero-dots {
              margin-top: 0.5rem !important;
              gap: 0.5rem !important;
            }
            .hero-dots button {
              height: 0.375rem !important;
              width: 1.5rem !important;
            }
          }

          /* Ensure image container maintains aspect ratio */
          .hero-image-wrapper {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }
        `}
      </style>

      {/* Image container with hardware acceleration */}
      <div className="hero-image-wrapper">
        <div className="hero-image-container">
          <img 
            src={slide.image} 
            alt={slide.title}
            className="h-full w-full object-cover transition-opacity duration-1000"
            loading="eager"
            draggable="false"
          />
        </div>
      </div>
      
      {/* Overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(92,1,32,0.20),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(92,1,32,0.15),_transparent_45%)] pointer-events-none" />

      {/* Navigation Arrows - with auto-hide */}
      <button
        onClick={goToPrevious}
        className={`absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 p-2 sm:p-3 text-white backdrop-blur-sm transition-all hover:scale-110 controls-transition ${
          showControls ? 'controls-visible' : 'controls-hidden'
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={goToNext}
        className={`absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 p-2 sm:p-3 text-white backdrop-blur-sm transition-all hover:scale-110 controls-transition ${
          showControls ? 'controls-visible' : 'controls-hidden'
        }`}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Content - positioned towards bottom with flex-end */}
      <div className="hero-content relative z-10 flex h-full flex-col justify-end px-3 sm:px-4 pb-20 sm:pb-24 md:pb-28 lg:px-8">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h1 
            className="hero-title font-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold tracking-tight text-white leading-tight md:leading-tight slide-right"
            style={{
              textShadow: '0 2px 30px rgba(92,1,32,0.5), 0 4px 50px rgba(92,1,32,0.35), 0 8px 70px rgba(0,0,0,0.4), 0 12px 90px rgba(0,0,0,0.2)'
            }}
          >
            {slide.title}
          </h1>
          <p 
            className="hero-subtitle mx-auto mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-8 text-white/95 slide-right"
            style={{
              textShadow: '0 2px 20px rgba(92,1,32,0.4), 0 4px 30px rgba(92,1,32,0.25), 0 6px 40px rgba(0,0,0,0.3)'
            }}
          >
            {slide.subtitle}
          </p>

          {/* Location link for slide 5 - shown only on the office slide */}
          {current === 4 && (
            <div className="mt-2 sm:mt-3 flex justify-center">
              <a 
                href="https://maps.app.goo.gl/esYLE53h6KW7Et4q6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-white/95 hover:text-white transition-colors text-[10px] sm:text-xs md:text-sm bg-black/30 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border border-white/20 hover:bg-black/40"
                style={{
                  textShadow: '0 1px 12px rgba(0,0,0,0.4)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="hidden xs:inline">Liberty Tower Kampala Road, Room L4B09</span>
                <span className="xs:hidden">Liberty Tower, Rm L4B09</span>
              </a>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="hero-buttons mt-4 sm:mt-6 md:mt-8 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 sm:flex-row scale-reveal">
            {onBookNow ? (
              <Button onClick={onBookNow} size="lg" className="bg-[#5C0120] text-white hover:bg-[#4a0019] px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-xs sm:text-sm md:text-base shadow-lg hover:shadow-xl transition-all min-w-[100px] sm:min-w-[140px] md:min-w-[160px] h-auto">
                Book Now
              </Button>
            ) : (
              <Button asChild size="lg" className="bg-[#5C0120] text-white hover:bg-[#4a0019] px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-xs sm:text-sm md:text-base shadow-lg hover:shadow-xl transition-all min-w-[100px] sm:min-w-[140px] md:min-w-[160px] h-auto">
                <Link to="/booking">Book Now</Link>
              </Button>
            )}
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-[#5C0120] bg-white text-[#5C0120] hover:bg-[#5C0120] hover:text-white hover:border-[#5C0120] px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-xs sm:text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 min-w-[100px] sm:min-w-[140px] md:min-w-[160px] h-auto"
            >
              <Link to="/contact">Contact</Link>
            </Button>
          </div>

          {/* Slide indicator dots */}
          <div className="hero-dots mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex justify-center gap-1.5 sm:gap-2 md:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-1.5 w-6 sm:h-2 sm:w-8 md:h-2.5 md:w-10 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "bg-white scale-110" 
                    : "bg-white/40 hover:bg-white/70"
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

      {/* Scroll Indicator - improved visibility */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-1/2 z-20 -translate-x-1/2 pointer-events-none">
        <button
          onClick={scrollToNextSection}
          className="scroll-indicator pointer-events-auto flex flex-col items-center gap-0.5 sm:gap-1 text-white transition-colors group"
          aria-label="Scroll down"
        >
          <span className="text-[8px] sm:text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase opacity-90 group-hover:opacity-100 bg-black/30 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/10">
            Scroll
          </span>
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-50 animate-pulse"></div>
            <ChevronDown className="chevron h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-bounce text-white drop-shadow-lg relative" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
import { Star, Globe, X, ChevronLeft, ChevronRight, Expand, Shrink } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHotels } from "@/hooks/useSupabase";
import { ErrorDisplay } from "./ErrorDisplay";
import { LoadingSpinner } from "./LoadingSpinner";

// Import Pannellum
import "pannellum";
import "pannellum/build/pannellum.css";

// Types for Pannellum
declare global {
  interface Window {
    pannellum: any;
  }
}

import goldenTulip360A from "@/assets/HDRI/Golden Tulip Al-Answar Hotel/Street View 360.jpg";
import goldenTulip360B from "@/assets/HDRI/Golden Tulip Al-Answar Hotel/Street View 360 2.jpg";
import goldenTulip360C from "@/assets/HDRI/Golden Tulip Al-Answar Hotel/Street View 360 3.jpg";
import infinity360A from "@/assets/HDRI/Infinity Hotel/Street View 360 1.jpg";
import infinity360B from "@/assets/HDRI/Infinity Hotel/Street View 360 2.jpg";
import infinity360C from "@/assets/HDRI/Infinity Hotel/Street View 360 3.jpg";
import infinity360D from "@/assets/HDRI/Infinity Hotel/Street View 360 4.jpg";

const hotel360Images: Record<string, string[]> = {
  goldenTulip: [goldenTulip360A, goldenTulip360B, goldenTulip360C],
  infinity: [infinity360A, infinity360B, infinity360C, infinity360D],
};

const hotel360Names: Record<string, string> = {
  goldenTulip: "Golden Tulip Al-Answar Hotel",
  infinity: "Infinity Hotel",
};

const getHotel360Key = (name?: string | null) => {
  const normalized = name?.trim().toLowerCase() || "";
  if (normalized.includes("golden tulip")) return "goldenTulip";
  if (normalized.includes("infinity")) return "infinity";
  return null;
};

const getHotelImage = (hotel: { image: string | null; name?: string | null }) => {
  const key = getHotel360Key(hotel.name);
  if (key && hotel360Images[key]) {
    return hotel360Images[key][0];
  }
  return (
    hotel.image ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  );
};

// Pannellum Viewer Component
const PanoramaViewer = ({
  image,
  title,
  onClose,
}: {
  image: string;
  title: string;
  onClose: () => void;
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!viewerRef.current || !window.pannellum) return;

    // Initialize Pannellum viewer
    viewerInstanceRef.current = window.pannellum.viewer(viewerRef.current, {
      type: "equirectangular",
      panorama: image,
      autoLoad: true,
      showZoomCtrl: true,
      showFullscreenCtrl: true,
      compass: true,
      mouseZoom: true,
      draggable: true,
      keyboard: true,
      friction: 0.95,
      pitch: 10,
      yaw: 0,
      hfov: 100,
      minPitch: -90,
      maxPitch: 90,
      minHfov: 30,
      maxHfov: 120,
      hotSpots: [],
    });

    return () => {
      if (viewerInstanceRef.current) {
        viewerInstanceRef.current.destroy();
        viewerInstanceRef.current = null;
      }
    };
  }, [image]);

  return (
    <div className="relative h-full w-full bg-black">
      <div ref={viewerRef} className="h-full w-full" />
      <div className="absolute left-4 top-4 z-20 rounded-full bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
        <Globe size={14} className="inline mr-2" />
        {title}
      </div>
    </div>
  );
};

const HotelsSection = () => {
  const { data: hotels, isLoading, error, refetch } = useHotels();
  const [previewHotelKey, setPreviewHotelKey] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const previewImages = useMemo(
    () => (previewHotelKey && hotel360Images[previewHotelKey]) || [],
    [previewHotelKey]
  );
  const previewTitle = previewHotelKey ? hotel360Names[previewHotelKey] : null;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!previewImages.length) return;
      if (event.key === "Escape") {
        setPreviewHotelKey(null);
        setPreviewIndex(0);
      }
      if (event.key === "ArrowLeft") {
        setPreviewIndex((current) => Math.max(current - 1, 0));
      }
      if (event.key === "ArrowRight") {
        setPreviewIndex((current) => Math.min(current + 1, previewImages.length - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewImages.length]);

  const openFullscreen = () => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  const closeFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const goToPrev = () => {
    setPreviewIndex((current) => Math.max(current - 1, 0));
  };

  const goToNext = () => {
    setPreviewIndex((current) => Math.min(current + 1, previewImages.length - 1));
  };

  if (!hotels || hotels.length === 0) {
    return null;
  }

  return (
    <section id="hotels" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 slide-right">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">
            Partner Hotels
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Premium Accommodations
          </h2>
        </div>

        {isLoading ? (
          <LoadingSpinner text="Loading hotels..." />
        ) : error ? (
          <ErrorDisplay
            title="Failed to load hotels"
            message="We couldn't load the hotel information. Please try again."
            onRetry={() => refetch()}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {hotels.map((hotel) => {
              const key = getHotel360Key(hotel.name);
              const previewImage = getHotelImage(hotel);
              const is360 = Boolean(key && hotel360Images[key]);

              return (
                <button
                  type="button"
                  key={hotel.id}
                  onClick={() => {
                    if (key) {
                      setPreviewHotelKey(key);
                      setPreviewIndex(0);
                    }
                  }}
                  className="group text-left bg-card rounded-none border border-border overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-[3/2] overflow-hidden relative">
                    <img
                      src={previewImage}
                      alt={hotel.name || "Hotel"}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {is360 && (
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#5C0120]/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                        <Globe size={14} />
                        360 View
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      {hotel.name}
                    </h3>
                    <p className="text-[#5C0120] text-xs mb-2 uppercase tracking-[0.18em]">
                      {hotel.city}
                    </p>
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: hotel.stars || 0 }).map((_, j) => (
                        <Star key={j} size={12} className="text-[#5C0120] fill-[#5C0120]" />
                      ))}
                    </div>
                    {is360 && (
                      <p className="text-[0.82rem] text-[#5C0120]">
                        Tap to explore immersive 360° panorama
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 360° Panorama Modal */}
      {previewHotelKey && previewImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <div
            ref={containerRef}
            className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl scale-reveal"
          >
            {/* Close Button - Top Right */}
            <button
              type="button"
              onClick={() => {
                setPreviewHotelKey(null);
                setPreviewIndex(0);
              }}
              className="absolute right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black/90 hover:scale-105"
            >
              <X size={22} />
            </button>

            {/* Panorama Viewer */}
            <div className="relative h-[75vh] min-h-[500px] w-full bg-black">
              <PanoramaViewer
                image={previewImages[previewIndex]}
                title={previewTitle || "360° Panorama"}
                onClose={() => {
                  setPreviewHotelKey(null);
                  setPreviewIndex(0);
                }}
              />

              {/* Image Counter - Bottom Center */}
              <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                {previewIndex + 1} / {previewImages.length}
              </div>

              {/* Fullscreen Button - Bottom Right */}
              <button
                type="button"
                onClick={isFullscreen ? closeFullscreen : openFullscreen}
                className="absolute bottom-6 right-6 z-20 inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black/80 hover:scale-105"
              >
                {isFullscreen ? <Shrink size={18} /> : <Expand size={18} />}
                {isFullscreen ? "Exit" : "Fullscreen"}
              </button>
            </div>

            {/* Footer with Navigation */}
            <div className="flex flex-col gap-3 border-t border-white/10 bg-black/95 px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5C0120]">
                  {previewTitle}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Drag to look around • Use arrow buttons or keyboard ← →
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-200">
                <button
                  type="button"
                  onClick={goToPrev}
                  disabled={previewIndex === 0}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-medium">
                  {previewIndex + 1} / {previewImages.length}
                </span>
                <button
                  type="button"
                  onClick={goToNext}
                  disabled={previewIndex === previewImages.length - 1}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HotelsSection;
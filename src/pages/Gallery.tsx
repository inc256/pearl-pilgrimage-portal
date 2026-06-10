import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGallery } from "@/hooks/useSupabase";
import { useState, useEffect, useCallback } from "react";
import { GalleryImage } from "@/types/supabase";
import defaultVideoThumbnail from "/src/assets/Pearl Burganda.jpg";

const Gallery = () => {
  const { data: galleryImages, isLoading, error } = useGallery();
  const [selectedMedia, setSelectedMedia] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const isVideo = (item: GalleryImage) => item.media_type === 'video';

  const getMediaUrl = (img: GalleryImage) => {
    // Use image_url for both images and videos
    return img.image_url || '/placeholder-image.jpg';
  };

  const getThumbnailUrl = (img: GalleryImage) => {
    // For videos, use the default thumbnail
    if (isVideo(img)) {
      return defaultVideoThumbnail;
    }
    // For images, use the original image_url
    return img.image_url || '/placeholder-image.jpg';
  };

  const handleOpenMedia = (media: GalleryImage, index: number) => {
    setSelectedMedia(media);
    setSelectedIndex(index);
  };

  const handleCloseMedia = () => {
    setSelectedMedia(null);
    setSelectedIndex(-1);
  };

  const handlePrevious = useCallback(() => {
    if (!galleryImages || selectedIndex <= 0) return;
    const newIndex = selectedIndex - 1;
    setSelectedMedia(galleryImages[newIndex]);
    setSelectedIndex(newIndex);
  }, [galleryImages, selectedIndex]);

  const handleNext = useCallback(() => {
    if (!galleryImages || selectedIndex >= galleryImages.length - 1) return;
    const newIndex = selectedIndex + 1;
    setSelectedMedia(galleryImages[newIndex]);
    setSelectedIndex(newIndex);
  }, [galleryImages, selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMedia) return;
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        handleCloseMedia();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, handlePrevious, handleNext]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading gallery...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-500">Error loading gallery. Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!galleryImages || galleryImages.length === 0) {
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
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center py-20">
                <p className="text-muted-foreground">No gallery images available at the moment. Please check back later.</p>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }

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
              {galleryImages.map((image, index) => {
                const thumbnailUrl = getThumbnailUrl(image);
                const mediaUrl = getMediaUrl(image);
                const isVideoItem = isVideo(image);
                
                return (
                  <div
                    key={image.id}
                    className="group relative overflow-hidden rounded-lg bg-muted aspect-square cursor-pointer"
                    onClick={() => handleOpenMedia(image, index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleOpenMedia(image, index); }}
                  >
                    {isVideoItem ? (
                      <>
                        <img
                          src={thumbnailUrl}
                          alt={image.alt_text || image.title || 'Gallery video thumbnail'}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src !== defaultVideoThumbnail && target.src !== '/placeholder-image.jpg') {
                              target.src = defaultVideoThumbnail;
                            }
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary ml-1">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <p className="text-white text-sm font-medium truncate">{image.title}</p>
                        </div>
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10">
                          Video
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={thumbnailUrl}
                          alt={image.alt_text || image.title || 'Gallery image'}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src !== '/placeholder-image.jpg') {
                              target.src = '/placeholder-image.jpg';
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <div className="text-center text-white p-4">
                            {image.title && (
                              <h3 className="font-semibold text-sm mb-1">{image.title}</h3>
                            )}
                            {image.category && (
                              <p className="text-xs opacity-90">{image.category}</p>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Media Preview Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={handleCloseMedia}
        >
          <div
            className="relative max-w-6xl w-full bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseMedia}
              className="absolute top-4 right-4 z-20 text-white hover:text-accent transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70"
              aria-label="Close media"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous button */}
            {selectedIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-accent transition-colors bg-black/50 rounded-full p-3 hover:bg-black/70"
                aria-label="Previous"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {selectedIndex < galleryImages.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-accent transition-colors bg-black/50 rounded-full p-3 hover:bg-black/70"
                aria-label="Next"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Media counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
              {selectedIndex + 1} / {galleryImages.length}
            </div>

            {/* Title overlay */}
            {selectedMedia.title && (
              <div className="absolute bottom-20 left-4 right-4 z-20 bg-black/50 text-white p-3 rounded-lg backdrop-blur-sm">
                <h3 className="font-semibold">{selectedMedia.title}</h3>
                {selectedMedia.description && (
                  <p className="text-sm text-white/80 mt-1">{selectedMedia.description}</p>
                )}
              </div>
            )}

            {/* Media content */}
            <div className="relative w-full min-h-[50vh] max-h-[90vh] flex items-center justify-center">
              {isVideo(selectedMedia) ? (
                <video
                  key={selectedMedia.id}
                  src={getMediaUrl(selectedMedia)}
                  poster={defaultVideoThumbnail}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[85vh] object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    console.error('Video failed to load:', target.src);
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const img = document.createElement('img');
                      img.src = defaultVideoThumbnail;
                      img.alt = selectedMedia.alt_text || selectedMedia.title || 'Gallery media';
                      img.className = 'max-w-full max-h-[85vh] object-contain';
                      parent.appendChild(img);
                      
                      const errorMsg = document.createElement('div');
                      errorMsg.className = 'text-white text-center p-4 mt-4';
                      errorMsg.innerHTML = '<p class="text-red-400">Video failed to load. Please check the file format.</p>';
                      parent.appendChild(errorMsg);
                    }
                  }}
                >
                  <source src={getMediaUrl(selectedMedia)} type="video/mp4" />
                  <source src={getMediaUrl(selectedMedia)} type="video/webm" />
                  <source src={getMediaUrl(selectedMedia)} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={getMediaUrl(selectedMedia)}
                  alt={selectedMedia.alt_text || selectedMedia.title || 'Gallery image'}
                  className="max-w-full max-h-[85vh] object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== '/placeholder-image.jpg') {
                      target.src = '/placeholder-image.jpg';
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
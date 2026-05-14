import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGallery } from "@/hooks/useSupabase";
import { useState } from "react";
import { GalleryImage } from "@/types/supabase";

const Gallery = () => {
  const { data: galleryImages, isLoading, error } = useGallery();
  const [selectedMedia, setSelectedMedia] = useState<GalleryImage | null>(null);

  const isVideo = (item: GalleryImage) => item.media_type === 'video' || Boolean(item.video_url);

  const getThumbnailUrl = (img: GalleryImage) => {
    return img.image_url || '/placeholder-image.jpg';
  };

  const handleOpenMedia = (media: GalleryImage) => {
    setSelectedMedia(media);
  };

  const handleCloseMedia = () => {
    setSelectedMedia(null);
  };

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
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg bg-muted aspect-square cursor-pointer"
                  onClick={() => handleOpenMedia(image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleOpenMedia(image); }}
                >
                  {isVideo(image) ? (
                    <>
                      <img
                        src={getThumbnailUrl(image)}
                        alt={image.alt_text || image.title || 'Gallery video thumbnail'}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== '/placeholder.svg') {
                            target.src = '/placeholder.svg';
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
                    </>
                  ) : (
                    <>
                      <img
                        src={getThumbnailUrl(image)}
                        alt={image.alt_text || image.title || 'Gallery image'}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== '/placeholder.svg') {
                            target.src = '/placeholder.svg';
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
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Media Preview Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleCloseMedia}
        >
          <div
            className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseMedia}
              className="absolute -top-10 right-0 text-white hover:text-accent transition-colors"
              aria-label="Close media"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {isVideo(selectedMedia) && selectedMedia.video_url ? (
              <video
                src={selectedMedia.video_url}
                poster={getThumbnailUrl(selectedMedia)}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const img = document.createElement('img');
                    img.src = getThumbnailUrl(selectedMedia);
                    img.alt = selectedMedia.alt_text || selectedMedia.title || 'Gallery media';
                    img.className = 'w-full h-full object-contain';
                    parent.appendChild(img);
                  }
                }}
              />
            ) : (
              <img
                src={getThumbnailUrl(selectedMedia)}
                alt={selectedMedia.alt_text || selectedMedia.title || 'Gallery image'}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/placeholder.svg') {
                    target.src = '/placeholder.svg';
                  }
                }}
              />
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;

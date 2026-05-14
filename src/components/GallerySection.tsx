import { useGallery } from "@/hooks/useSupabase";
import { ErrorDisplay } from "./ErrorDisplay";
import { LoadingGrid } from "./LoadingSpinner";
import { useState } from "react";
import { GalleryImage } from "@/types/supabase";

interface GallerySectionProps {
  limit?: number;
}

const GallerySection = ({ limit }: GallerySectionProps) => {
  const { data: images, isLoading, error, refetch } = useGallery();
  const displayImages = limit && images ? images.slice(0, limit) : images;
  const [selectedMedia, setSelectedMedia] = useState<GalleryImage | null>(null);

  if (!displayImages || displayImages.length === 0) {
    return null;
  }

  const isVideo = (item: GalleryImage) => item.media_type === 'video' || Boolean(item.video_url);

  const getThumbnailUrl = (img: GalleryImage) => {
    return img.image_url || '/placeholder.svg';
  };

  const getMediaUrl = (img: GalleryImage) => {
    // For videos, return video_url. For images, return image_url.
    if (isVideo(img)) {
      return img.video_url || null;
    }
    return img.image_url || null;
  };

  const handleOpenMedia = (media: GalleryImage) => {
    setSelectedMedia(media);
  };

  const handleCloseMedia = () => {
    setSelectedMedia(null);
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Memories</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Gallery</h2>
        </div>

        {isLoading ? (
          <LoadingGrid count={limit || 6} />
        ) : error ? (
          <ErrorDisplay
            title="Failed to load gallery"
            message="We couldn't load the gallery images. Please try again."
            onRetry={() => refetch()}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {displayImages.map((img) => (
              <div
                key={img.id}
                className="aspect-square overflow-hidden rounded-lg relative cursor-pointer group"
                onClick={() => handleOpenMedia(img)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleOpenMedia(img); }}
              >
                {isVideo(img) ? (
                  <>
                    <img
                      src={getThumbnailUrl(img)}
                      alt={img.alt_text || img.title || "Gallery video thumbnail"}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== '/placeholder.svg') {
                          target.src = '/placeholder.svg';
                        }
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary ml-1">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {img.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pointer-events-none">
                        <p className="text-white text-sm font-medium truncate">{img.title}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <img
                    src={getThumbnailUrl(img)}
                    alt={img.alt_text || img.title || "Gallery image"}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== '/placeholder.svg') {
                        target.src = '/placeholder.svg';
                      }
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
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
    </section>
  );
};

export default GallerySection;

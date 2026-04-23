import { useGallery } from "@/hooks/useSupabase";
import { ErrorDisplay, ErrorMessage } from "./ErrorDisplay";
import { LoadingGrid } from "./LoadingSpinner";

interface GallerySectionProps {
  limit?: number;
}

const GallerySection = ({ limit }: GallerySectionProps) => {
  const { data: images, isLoading, error, refetch } = useGallery();
  const displayImages = limit && images ? images.slice(0, limit) : images;

  if (!displayImages || displayImages.length === 0) {
    return null;
  }

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
              <div key={img.id} className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={img.image_url || ""}
                  alt={img.alt_text || img.title || "Gallery image"}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;

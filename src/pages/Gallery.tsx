import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGallery } from "@/hooks/useSupabase";

const Gallery = () => {
  const { data: galleryImages, isLoading, error } = useGallery();

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
                <div key={image.id} className="group relative overflow-hidden rounded-lg bg-muted aspect-square">
                  <img
                    src={image.image_url || '/placeholder-image.jpg'}
                    alt={image.alt_text || image.title || 'Gallery image'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      {image.title && (
                        <h3 className="font-semibold text-sm mb-1">{image.title}</h3>
                      )}
                      {image.category && (
                        <p className="text-xs opacity-90">{image.category}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;

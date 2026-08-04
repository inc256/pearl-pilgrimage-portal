import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { useBlogs } from "@/hooks/useSupabase";
import { LoadingScreen } from "@/components/LoadingSpinner";
import type { Blog } from "@/types/supabase";

const Blogs = () => {
  const { data: blogs, isLoading, error } = useBlogs();
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const visibleBlogs = blogs ? blogs.slice(0, visibleCount) : [];
  const hasMore = blogs ? visibleCount < blogs.length : false;
  const toggleView = () => {
    if (!blogs) return;
    setVisibleCount(hasMore ? blogs.length : 6);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20">
          <LoadingScreen text="Loading blog articles..." />
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
            <p className="text-red-500">Error loading blogs. Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20">
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Latest Articles</p>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Blog</h1>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Stay informed with our latest articles about Hajj, Umrah, and pilgrimage experiences.
                </p>
              </div>
            </div>
          </section>
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center py-20">
                <p className="text-muted-foreground">No blog posts available at the moment. Please check back later.</p>
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
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Latest Articles</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Blog</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Stay informed with our latest articles about Hajj, Umrah, and pilgrimage experiences.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {visibleBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {blog.image_url && (
                    <div className="aspect-video bg-muted">
                      <img 
                        src={blog.image_url} 
                        alt={blog.title || 'Blog post'} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {blog.category && (
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {blog.category}
                        </span>
                      )}
                      {blog.published_at && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(blog.published_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long' 
                          })}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-primary hover:text-primary/80"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      Preview <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {blogs?.length > 6 && (
              <div className="mt-12 flex justify-center">
                <Button variant="secondary" onClick={toggleView} className="rounded-full px-8">
                  {hasMore ? "View More Posts" : "Show Less"}
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />

      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 py-6 sm:px-4 sm:py-8">
          <div className="w-full max-w-[95vw] sm:max-w-4xl lg:max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-background/95 shadow-2xl shadow-black/25 backdrop-blur-lg">
            <div className="flex flex-col gap-6 p-5 sm:p-7 md:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.28em] text-primary">Post Preview</p>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground leading-tight">{selectedBlog.title}</h2>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {selectedBlog.category && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-primary">
                        {selectedBlog.category}
                      </span>
                    )}
                    {selectedBlog.published_at && (
                      <span>{new Date(selectedBlog.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}</span>
                    )}
                  </div>
                </div>
                <button
                  className="h-11 w-11 rounded-full border border-border bg-card text-muted-foreground transition hover:bg-primary/10"
                  onClick={() => setSelectedBlog(null)}
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] items-start">
                {selectedBlog.image_url && (
                  <div className="overflow-hidden rounded-[1.5rem] bg-muted min-h-[280px] md:min-h-[320px]">
                    <img
                      src={selectedBlog.image_url}
                      alt={selectedBlog.title || 'Blog image'}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== '/placeholder-image.jpg') {
                          target.src = '/placeholder-image.jpg';
                        }
                      }}
                    />
                  </div>
                )}

                <div className="space-y-6 rounded-[1.5rem] bg-slate-50 p-5 sm:p-6 shadow-sm min-h-[280px] md:min-h-[320px] min-w-0">
                  <div className="max-h-[64vh] overflow-y-auto pr-2 leading-relaxed text-muted-foreground text-sm space-y-6">
                    {(selectedBlog.content || selectedBlog.excerpt)?.includes("<") ? (
                      <div
                        className="space-y-6"
                        dangerouslySetInnerHTML={{ __html: selectedBlog.content || selectedBlog.excerpt || "" }}
                      />
                    ) : (
                      (selectedBlog.content || selectedBlog.excerpt)?.split("\n\n").map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useBlogs } from "@/hooks/useSupabase";

const Blogs = () => {
  const { data: blogs, isLoading, error } = useBlogs();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blogs...</p>
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
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
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
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                      Read More <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;

import { useParams, Link } from "react-router-dom";
import { useBlogs } from "@/hooks/useSupabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingSpinner";
import { ArrowLeft } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blogs, isLoading, error } = useBlogs();
  const blogId = Number(id);
  const blog = blogs?.find((item) => item.id === blogId);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20">
          <LoadingScreen text="Loading blog post..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[50vh] px-4">
          <div className="text-center">
            <p className="text-red-500">Unable to load the blog post. Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 px-4">
          <section className="container mx-auto py-20">
            <div className="text-center">
              <p className="text-accent font-medium uppercase tracking-[0.3em] mb-3">Blog</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">Post not found</h1>
              <p className="text-muted-foreground mb-8">The blog post you are looking for could not be found.</p>
              <Link to="/blogs" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
                <ArrowLeft size={16} /> Back to blog list
              </Link>
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
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <p className="text-accent font-medium uppercase tracking-[0.3em] mb-3">Blog</p>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">{blog.title}</h1>
                {blog.category && <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">{blog.category}</p>}
                {blog.published_at && <p className="text-sm text-muted-foreground">{new Date(blog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
              </div>
              {blog.image_url && (
                <div className="mb-10 overflow-hidden rounded-3xl bg-black/5">
                  <img
                    src={blog.image_url}
                    alt={blog.title || 'Blog hero image'}
                    className="w-full object-cover"
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
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                {blog.content?.includes("<") ? (
                  <div
                    className="space-y-6 text-muted-foreground leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                ) : (
                  blog.content?.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                )}
              </div>
              <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link to="/blogs" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all">
                  <ArrowLeft size={16} /> Back to all posts
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;

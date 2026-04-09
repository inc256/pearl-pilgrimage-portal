import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Preparing for Umrah: A Complete Guide",
    excerpt: "Everything you need to know before embarking on your Umrah journey, from documentation to spiritual preparation.",
    date: "March 2026",
    category: "Guide"
  },
  {
    title: "The Ultimate Hajj Guide for First-Timers",
    excerpt: "Step-by-step guidance on performing Hajj rituals, what to pack, and how to make the most of your pilgrimage.",
    date: "February 2026",
    category: "Guide"
  },
  {
    title: "Travel Tips for Visiting Saudi Arabia",
    excerpt: "Practical advice on weather, etiquette, currency, and getting around the holy cities comfortably.",
    date: "January 2026",
    category: "Travel"
  },
  {
    title: "Understanding the Different Types of Umrah",
    excerpt: "Learn about Umrah al-Mutamattah and Umrah al-Mufradah, and which one suits your journey.",
    date: "December 2025",
    category: "Spiritual"
  },
  {
    title: "What to Pack for Hajj: The Essential Checklist",
    excerpt: "Don't leave home without these essential items for your Hajj journey.",
    date: "November 2025",
    category: "Guide"
  },
  {
    title: "The Spiritual Benefits of Performing Hajj",
    excerpt: "Discover the profound spiritual transformation that Hajj brings to the lives of pilgrims.",
    date: "October 2025",
    category: "Spiritual"
  }
];

const Blogs = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Insights</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">From Our Blog</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Stay informed with the latest articles, guides, and tips for your pilgrimage journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {articles.map((article) => (
                <div key={article.title} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-primary font-medium">{article.category}</span>
                    <p className="text-xs text-muted-foreground">{article.date}</p>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{article.excerpt}</p>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-[#4a0019] p-0">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Button>
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

export default Blogs;

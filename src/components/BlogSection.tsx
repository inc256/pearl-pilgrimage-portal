import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Preparing for Umrah: A Complete Guide",
    excerpt: "Everything you need to know before embarking on your Umrah journey, from documentation to spiritual preparation.",
    date: "March 2026",
  },
  {
    title: "The Ultimate Hajj Guide for First-Timers",
    excerpt: "Step-by-step guidance on performing Hajj rituals, what to pack, and how to make the most of your pilgrimage.",
    date: "February 2026",
  },
  {
    title: "Travel Tips for Visiting Saudi Arabia",
    excerpt: "Practical advice on weather, etiquette, currency, and getting around the holy cities comfortably.",
    date: "January 2026",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Insights</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">From Our Blog</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {articles.map((article) => (
            <div key={article.title} className="bg-card rounded-lg border border-border p-6">
              <p className="text-xs text-muted-foreground mb-3">{article.date}</p>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{article.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{article.excerpt}</p>
              <Button variant="ghost" size="sm" className="text-primary hover:text-secondary p-0">
                Read More <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

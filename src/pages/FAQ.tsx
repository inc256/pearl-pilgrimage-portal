import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";
import { useFaqs } from "@/hooks/useSupabase";

const FAQ = () => {
  const { data: faqs, isLoading, error } = useFaqs();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading FAQs...</p>
          </div>
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
            <p className="text-red-500">Error loading FAQs. Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!faqs || faqs.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20">
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Common Questions</p>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Frequently Asked Questions</h1>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Find answers to commonly asked questions about our Hajj and Umrah packages, booking process, and travel information.
                </p>
              </div>
            </div>
          </section>
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-muted-foreground">No FAQs available at the moment. Please check back later.</p>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }

  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Common Questions</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Frequently Asked Questions</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Find answers to commonly asked questions about our Hajj and Umrah packages, booking process, and travel information.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-12">
              {Object.entries(groupedFaqs).map(([category, categoryFaqs], catIndex) => (
                <div key={category}>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <HelpCircle className="text-primary" size={24} />
                    {category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {categoryFaqs.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={`${catIndex}-${faqIndex}`} 
                        value={`faq-${catIndex}-${faqIndex}`} 
                        className="bg-card border border-border rounded-lg px-5"
                      >
                        <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-[#5C0120] text-white hover:bg-[#4a0019]">
                    Contact Us
                  </Button>
                </Link>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-[#5C0120] text-[#5C0120] hover:bg-[#5C0120] hover:text-white">
                    <MessageCircle className="mr-2" size={18} />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
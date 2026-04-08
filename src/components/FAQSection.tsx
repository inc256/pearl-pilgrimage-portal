import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I book a package?",
    a: "You can book by clicking the 'Book Now' button on any package, contacting us via WhatsApp, or visiting our office in Kampala. A deposit is required to secure your spot.",
  },
  {
    q: "What documents are required?",
    a: "You'll need a valid passport (at least 6 months validity), passport-size photos, proof of vaccination (Meningitis), and completed visa application forms. We assist with the entire process.",
  },
  {
    q: "What payment options are available?",
    a: "We accept bank transfers, mobile money (MTN & Airtel), and cash payments at our office. Installment plans are available for early bookings.",
  },
  {
    q: "How should I prepare for travel?",
    a: "We provide pre-travel lectures and practical sessions covering rituals, packing lists, health tips, and what to expect. Our team guides you every step of the way.",
  },
  {
    q: "Is travel insurance included?",
    a: "Travel insurance is included in all our premium packages. We ensure comprehensive coverage for the duration of your pilgrimage.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Common Questions</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">FAQ</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-5">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

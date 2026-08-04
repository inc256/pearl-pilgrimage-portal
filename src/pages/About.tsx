import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Award, Heart, Users, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useAboutUs } from "@/hooks/useSupabase";
import { LoadingScreen } from "@/components/LoadingSpinner";

const About = () => {
  const { data: aboutSections, isLoading, error } = useAboutUs();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20">
          <LoadingScreen text="Loading about us..." />
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
            <p className="text-red-500">Error loading about us. Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const storySection = aboutSections?.find(section => section.section === 'story');
  const valuesSection = aboutSections?.find(section => section.section === 'values');
  const featuresSection = aboutSections?.find(section => section.section === 'features');

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">About Us</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Your Trusted Pilgrimage Partner</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                We are dedicated to making your sacred journey to Hajj and Umrah a comfortable and spiritually fulfilling experience.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Our Story</h2>
                {storySection?.content ? (
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    {storySection.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Pearl Pilgrimage was established with a singular mission: to provide premium pilgrimage services that allow Muslims to focus on their spiritual journey without worrying about logistics.
                    </p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      With years of experience in organizing Hajj and Umrah trips, we have helped thousands of pilgrims from around the world perform their sacred duties with ease, comfort, and peace of mind.
                    </p>
                  </>
                )}
                <Link to="/contact">
                  <Button className="bg-[#5C0120] text-white hover:bg-[#4a0019]">
                    Contact Us
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <Award className="text-primary mx-auto mb-3" size={32} />
                  <h3 className="font-heading text-xl font-bold text-foreground">15+</h3>
                  <p className="text-muted-foreground text-sm">Years Experience</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <Users className="text-primary mx-auto mb-3" size={32} />
                  <h3 className="font-heading text-xl font-bold text-foreground">10,000+</h3>
                  <p className="text-muted-foreground text-sm">Happy Pilgrims</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <Globe className="text-primary mx-auto mb-3" size={32} />
                  <h3 className="font-heading text-xl font-bold text-foreground">50+</h3>
                  <p className="text-muted-foreground text-sm">Countries Served</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <Shield className="text-primary mx-auto mb-3" size={32} />
                  <h3 className="font-heading text-xl font-bold text-foreground">100%</h3>
                  <p className="text-muted-foreground text-sm">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything we do is guided by our commitment to excellence and spiritual fulfillment.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card p-8 rounded-lg border border-border">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="text-primary" size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Spiritual Integrity</h3>
                <p className="text-muted-foreground">
                  We understand the sacred nature of Hajj and Umrah and ensure every aspect of our service supports your spiritual journey.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg border border-border">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-primary" size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Trust & Reliability</h3>
                <p className="text-muted-foreground">
                  Our proven track record and thousands of satisfied pilgrims speak to our commitment to reliable, transparent services.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg border border-border">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="text-primary" size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">Excellence in Service</h3>
                <p className="text-muted-foreground">
                  From visa processing to accommodations, we strive for excellence in every detail of your pilgrimage experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Why Choose Pearl Pilgrimage?</h2>
              <div className="space-y-4">
                {[
                  "Experienced team with deep knowledge of Hajj and Umrah rituals",
                  "Premium 5-star and 4-star hotel accommodations near the Harams",
                  "Comprehensive visa processing assistance",
                  "Professional guides fluent in multiple languages",
                  "24/7 support available during your pilgrimage",
                  "Flexible payment plans to suit your budget",
                  "Pre-travel preparation sessions and lectures",
                  "Airport transfers and ground transportation included"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                    <Check className="text-[#5C0120] shrink-0" size={20} />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link to="/packages">
                  <Button className="bg-[#5C0120] text-white hover:bg-[#4a0019]">
                    Explore Our Packages
                  </Button>
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

export default About;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useAllPackages } from "@/hooks/useSupabase";

const fallbackPackages = [
  {
    title: "Hajj Premium Package",
    description: "Complete Hajj experience with 5-star accommodations",
    price: "$8,500",
    type: "hajj",
    features: ["Visa Included", "5-Star Hotels", "Private Transport", "VIP Tents", "Flight Tickets", "Guided Tours"],
    link: "/hajj"
  },
  {
    title: "Umrah Standard Package",
    description: "Comfortable Umrah journey with quality accommodations",
    price: "$3,200",
    type: "umrah",
    features: ["Visa Included", "4-Star Hotels", "Transport", "Flight Tickets", "Guided Tours"],
    link: "/umrah"
  },
  {
    title: "Umrah VIP Package",
    description: "Luxury Umrah experience with premium services",
    price: "$5,800",
    type: "umrah",
    features: ["Visa Included", "5-Star Hotels", "Private Transport", "VIP Tents", "Flight Tickets", "Personal Guide"],
    link: "/umrah"
  },
  {
    title: "Hajj Economy Package",
    description: "Affordable Hajj with quality accommodations",
    price: "$6,500",
    type: "hajj",
    features: ["Visa Included", "4-Star Hotels", "Transport", "Flight Tickets", "Group Guide"],
    link: "/hajj"
  }
];

const Packages = () => {
  const { data: packages, isLoading, error } = useAllPackages();

  const displayPackages = packages && packages.length > 0 
    ? packages.map(pkg => ({
        title: pkg.name || 'Package',
        description: `${pkg.type === 'hajj' ? 'Hajj' : 'Umrah'} package`,
        price: pkg.price ? `$${pkg.price.toLocaleString()}` : 'Contact for pricing',
        type: pkg.type || 'umrah',
        features: ["Visa Included", "Hotel Accommodation", "Transport", "Flight Tickets", "Guided Tours"],
        link: pkg.type === 'hajj' ? '/hajj' : '/umrah'
      }))
    : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Our Packages</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Choose Your Pilgrimage</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Select from our carefully curated Hajj and Umrah packages designed to make your journey comfortable and memorable
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">Error loading packages. Please try again later.</p>
              </div>
            ) : !displayPackages ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No packages available at the moment. Please check back later.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {displayPackages.map((pkg, index) => (
                  <div key={`${pkg.title}-${index}`} className="bg-card rounded-lg border border-border p-6 md:p-8">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{pkg.title}</h3>
                    <p className="text-muted-foreground mb-4">{pkg.description}</p>
                    <p className="text-3xl font-bold text-primary mb-6">{pkg.price}</p>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check size={16} className="text-primary" /> {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to={pkg.link}>
                      <Button className="w-full bg-[#5C0120] text-white hover:bg-[#4a0019]">
                        View Details <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
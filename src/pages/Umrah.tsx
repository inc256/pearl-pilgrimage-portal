import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Bus, Calendar, Utensils, Check } from "lucide-react";

const umrahPackages = [
  {
    title: "Umrah VIP Package",
    price: "$5,800",
    dates: "Flexible dates",
    description: "Luxury Umrah experience with premium services and 5-star accommodations",
    features: [
      "Emirates Airlines business class",
      "Fairmont Makkah Hotel (5-star)",
      "Zamzam Pullman Madinah",
      "Private transport throughout",
      "Personal guide services",
      "Airport VIP assistance",
      "Breakfast & dinner included"
    ]
  },
  {
    title: "Umrah Standard Package",
    price: "$3,200",
    dates: "Flexible dates",
    description: "Comfortable Umrah journey with quality accommodations",
    features: [
      "Saudi Airlines economy class",
      "Makkah Hilton (4-star)",
      "Madinah Hilton Hotel",
      "Shared transport",
      "Group guide services",
      "Breakfast included"
    ]
  },
  {
    title: "Umrah Economy Package",
    price: "$2,500",
    dates: "Flexible dates",
    description: "Affordable Umrah for budget-conscious pilgrims",
    features: [
      "Economy flights",
      "3-star hotels near Harams",
      "Standard transport",
      "Group tours",
      "Basic assistance"
    ]
  }
];

const Umrah = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Spiritual Journey</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Umrah Packages</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Experience the blessed journey of Umrah with our tailored packages designed for your comfort and spiritual fulfillment.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {umrahPackages.map((pkg) => (
              <div key={pkg.title} className="max-w-5xl mx-auto bg-card rounded-lg border border-border p-6 md:p-10 mb-12">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{pkg.title}</h2>
                  <p className="text-muted-foreground mt-2">{pkg.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <Calendar className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-foreground">Travel Dates</h4>
                        <p className="text-muted-foreground text-sm">{pkg.dates}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Plane className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-foreground">Flight</h4>
                        <p className="text-muted-foreground text-sm">{pkg.title.includes("VIP") ? "Business Class" : pkg.title.includes("Standard") ? "Economy Class" : "Economy Flights"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bus className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-foreground">Transport</h4>
                        <p className="text-muted-foreground text-sm">{pkg.title.includes("VIP") ? "Private luxury transport" : "Shared transport"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <Hotel className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-foreground">Accommodation</h4>
                        <p className="text-muted-foreground text-sm">{pkg.title.includes("VIP") ? "5-star hotels" : pkg.title.includes("Standard") ? "4-star hotels" : "3-star hotels near Harams"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <Utensils className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-foreground">Meals</h4>
                        <p className="text-muted-foreground text-sm">{pkg.title.includes("VIP") ? "Breakfast & dinner" : pkg.title.includes("Standard") ? "Breakfast included" : "Not included"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <p className="text-3xl font-bold text-primary">{pkg.price}</p>
                      <p className="text-muted-foreground text-sm">per person</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {["Visa", "Flights", "Hotels", "Transport"].map((item) => (
                        <span key={item} className="inline-flex items-center gap-1 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          <Check size={14} className="text-primary" /> {item}
                        </span>
                      ))}
                    </div>
                    <Button size="lg" className="bg-green-600 text-white hover:bg-green-700 whitespace-nowrap">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="max-w-3xl mx-auto mt-16">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Umrah visa processing",
                  "Round-trip flights",
                  "Hotel accommodations",
                  "All ground transportation",
                  "Professional tour guides",
                  "24/7 support in Saudi Arabia",
                  "Airport transfers",
                  "Meals as specified"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-muted-foreground">
                    <Check size={16} className="text-primary" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Umrah;

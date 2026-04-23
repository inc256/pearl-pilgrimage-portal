import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useContactInfo, submitContactMessage } from "@/hooks/useSupabase";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const Contact = () => {
  const { data: contactInfo, isLoading: contactLoading, error: contactError } = useContactInfo();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const submitMutation = useMutation({
    mutationFn: submitContactMessage,
    onSuccess: () => {
      alert('Message sent successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    },
    onError: () => {
      alert('Failed to send message. Please try again.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'phone': return <Phone className="text-primary" size={20} />;
      case 'email': return <Mail className="text-primary" size={20} />;
      case 'address': return <MapPin className="text-primary" size={20} />;
      case 'hours': return <Clock className="text-primary" size={20} />;
      default: return <Phone className="text-primary" size={20} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">Get in Touch</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Contact Us</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Have questions about your pilgrimage? We're here to help you plan your sacred journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">


              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                {contactLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : contactError ? (
                  <p className="text-red-500">Error loading contact information.</p>
                ) : contactInfo && contactInfo.length > 0 ? (
                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <div key={info.id} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          {getIcon(info.icon || info.type || 'phone')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{info.label}</h4>
                          <p className="text-muted-foreground whitespace-pre-line">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                     <div className="flex items-start gap-4">
                       <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                         <Phone className="text-primary" size={20} />
                       </div>
                       <div>
                         <h4 className="font-semibold text-foreground">Phone</h4>
                         <p className="text-muted-foreground"><a href="tel:0705447319" className="hover:text-foreground">0705447319</a></p>
                         <p className="text-muted-foreground"><a href="tel:0702184524" className="hover:text-foreground">0702184524</a></p>
                         <p className="text-muted-foreground"><a href="tel:0756505926" className="hover:text-foreground">0756505926</a></p>
                       </div>
                     </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Mail className="text-primary" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Email</h4>
                        <p className="text-muted-foreground">info@pearlpilgrimage.com</p>
                        <p className="text-muted-foreground">bookings@pearlpilgrimage.com</p>
                      </div>
                    </div>

                     {/* <div className="flex items-start gap-4">
                       <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                         <MapPin className="text-primary" size={20} />
                       </div>
                       <div>
                         <h4 className="font-semibold text-foreground">Office</h4>
                         <p className="text-muted-foreground">123 Pilgrim Street</p>
                         <p className="text-muted-foreground">Makkah, Saudi Arabia</p>
                       </div>
                     </div> */}

                     {/* <div className="flex items-start gap-4">
                       <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                         <Clock className="text-primary" size={20} />
                       </div>
                       <div>
                         <h4 className="font-semibold text-foreground">Office Hours</h4>
                         <p className="text-muted-foreground">Sunday - Thursday: 9AM - 6PM</p>
                         <p className="text-muted-foreground">Friday - Saturday: Closed</p>
                       </div>
                     </div> */}
                     <div className="text-center mt-6 space-y-6">
                       <a
                         href="https://wa.me/256756505926"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg font-medium hover:bg-secondary transition-colors"
                       >
                         Chat on WhatsApp
                       </a>
                       <a
                         href="https://tiktok.com/@pearlhijjaandumrah"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg font-medium hover:bg-secondary transition-colors"
                       >
                         Follow on TikTok
                       </a>
                     </div>
                   </div>
                 )}
               </div>
             </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

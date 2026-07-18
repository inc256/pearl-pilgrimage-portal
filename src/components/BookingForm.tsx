import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllPackages } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { Package } from "@/types/supabase";
import { Loader2, CheckCircle, XCircle, Users, Phone, Mail, User, Package as PackageIcon, CreditCard } from "lucide-react";

const BookingForm = () => {
  const { data: packages, isLoading, error } = useAllPackages();
  const [activeTab, setActiveTab] = useState("book");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [packageId, setPackageId] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("Cash");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (!packageId && packages && packages.length > 0) {
      setPackageId(String(packages[0].id));
    }
  }, [packages, packageId]);

  useEffect(() => {
    const setBookingTab = () => {
      if (window.location.hash === "#booking") {
        setActiveTab("book");
      }
    };

    setBookingTab();
    window.addEventListener("hashchange", setBookingTab);
    return () => window.removeEventListener("hashchange", setBookingTab);
  }, []);

  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('bookingFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFirstName(parsed.firstName || "");
        setLastName(parsed.lastName || "");
        setPhone(parsed.phone || "");
        setEmail(parsed.email || "");
        setNumberOfTravelers(parsed.numberOfTravelers || 1);
        setPaymentPlan(parsed.paymentPlan || "Cash");
        if (parsed.packageId) setPackageId(parsed.packageId);
      } catch (e) {
        console.error("Failed to load saved form data");
      }
    }
  }, []);

  // Save form data to localStorage on change
  useEffect(() => {
    const formData = {
      firstName,
      lastName,
      phone,
      email,
      numberOfTravelers,
      paymentPlan,
      packageId
    };
    localStorage.setItem('bookingFormData', JSON.stringify(formData));
  }, [firstName, lastName, phone, email, numberOfTravelers, paymentPlan, packageId]);

  const selectedPackage = packages?.find((pkg) => String(pkg.id) === packageId);

  const packageLabel = selectedPackage?.name || selectedPackage?.type?.toUpperCase() || "Selected package";

  // Helper function to safely render includes
  const renderIncludes = (includes: any) => {
    if (!includes) return null;
    if (Array.isArray(includes)) {
      return includes.map((item, index) => {
        if (typeof item === 'string') {
          return <li key={index} className="flex items-start gap-2 text-sm">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
            {item}
          </li>;
        }
        if (typeof item === 'object' && item !== null && 'text' in item) {
          return <li key={index} className="flex items-start gap-2 text-sm">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
            {item.text}
          </li>;
        }
        if (typeof item === 'object' && item !== null && 'name' in item) {
          return <li key={index} className="flex items-start gap-2 text-sm">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
            {item.name}
          </li>;
        }
        return <li key={index} className="flex items-start gap-2 text-sm">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
          {JSON.stringify(item)}
        </li>;
      });
    }
    if (typeof includes === 'object' && includes !== null && 'text' in includes) {
      return <li className="flex items-start gap-2 text-sm">
        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
        {includes.text}
      </li>;
    }
    if (typeof includes === 'string') {
      return <li className="flex items-start gap-2 text-sm">
        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
        {includes}
      </li>;
    }
    return null;
  };

  // Helper function to format includes for WhatsApp message
  const formatIncludesForMessage = (includes: any): string => {
    if (!includes) return 'Not specified';
    if (Array.isArray(includes)) {
      return includes.map(item => {
        if (typeof item === 'string') return item;
        if (typeof item === 'object' && item !== null) {
          return item.text || item.name || JSON.stringify(item);
        }
        return String(item);
      }).join(', ');
    }
    if (typeof includes === 'object' && includes !== null) {
      return includes.text || includes.name || JSON.stringify(includes);
    }
    return String(includes);
  };

  // Validation functions
  const validateField = (field: string, value: string): string => {
    switch(field) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'Must be at least 2 characters';
        return '';
      case 'lastName':
        if (!value.trim()) return 'Second name is required';
        if (value.trim().length < 2) return 'Must be at least 2 characters';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[0-9+\s-]{10,15}$/.test(value.trim())) {
          return 'Enter a valid phone number (10-15 digits)';
        }
        return '';
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Enter a valid email address';
        }
        return '';
      case 'numberOfTravelers':
        if (value && (parseInt(value) < 1 || parseInt(value) > 20)) {
          return 'Must be between 1 and 20';
        }
        return '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    newErrors.firstName = validateField('firstName', firstName);
    newErrors.lastName = validateField('lastName', lastName);
    newErrors.phone = validateField('phone', phone);
    newErrors.email = validateField('email', email);
    newErrors.numberOfTravelers = validateField('numberOfTravelers', String(numberOfTravelers));
    
    if (!packageId) {
      newErrors.packageId = 'Please select a package';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setTouched({ ...touched, [field]: true });
    
    if (field === 'firstName') setFirstName(value as string);
    else if (field === 'lastName') setLastName(value as string);
    else if (field === 'phone') setPhone(value as string);
    else if (field === 'email') setEmail(value as string);
    else if (field === 'numberOfTravelers') setNumberOfTravelers(value as number);
    else if (field === 'paymentPlan') setPaymentPlan(value as string);
    else if (field === 'packageId') setPackageId(value as string);
    
    const error = validateField(field, String(value));
    setErrors({ ...errors, [field]: error });
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, field === 'numberOfTravelers' ? String(numberOfTravelers) : 
      field === 'firstName' ? firstName :
      field === 'lastName' ? lastName :
      field === 'phone' ? phone :
      field === 'email' ? email : '');
    setErrors({ ...errors, [field]: error });
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setNumberOfTravelers(1);
    setPaymentPlan("Cash");
    setPackageId(packages && packages.length > 0 ? String(packages[0].id) : "");
    setErrors({});
    setTouched({});
    localStorage.removeItem('bookingFormData');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check all required fields and try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      let packageDetails = "Package details not available";
      if (selectedPackage) {
        packageDetails = [
          `Package Name: ${selectedPackage.name || 'N/A'}`,
          `Type: ${selectedPackage.type?.toUpperCase() || 'N/A'}`,
          `Price: $${selectedPackage.price || 'N/A'}`,
        ].filter(line => line).join('\n');
      }

      const message = [
        "PEARL HIJJA & UMRAH - NEW BOOKING REQUEST",
        "",
        "--------------------------------------------------",
        "",
        "BOOKING DETAILS",
        "",
        `First Name: ${firstName.trim()}`,
        `Second Name: ${lastName.trim()}`,
        `Package: ${packageLabel}`,
        `Number of Travelers: ${numberOfTravelers}`,
        `Payment Plan: ${paymentPlan}`,
        `Telephone: ${phone.trim()}`,
        `Email: ${email.trim() || "Not provided"}`,
        "",
        "--------------------------------------------------",
        "",
        "PACKAGE DETAILS",
        "",
        packageDetails,
        "",
        "--------------------------------------------------",
      ].join("\n");

      const whatsappUrl = `https://api.whatsapp.com/send/?phone=256756505926&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
      window.open(whatsappUrl, "_blank");
      
      setShowConfirmation(true);
      
      toast({
        title: "WhatsApp booking initialized",
        description: "Your booking details are ready to send in WhatsApp.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open WhatsApp. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-10 sm:py-14 md:py-20 bg-[radial-gradient(circle_at_top_left,_rgba(101,32,50,0.08),_transparent_50%),_radial-gradient(circle_at_bottom_right,_rgba(119,38,63,0.08),_transparent_45%)]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-accent font-medium text-xs sm:text-sm uppercase tracking-[0.24em] mb-1.5 sm:mb-2">Booking</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Secure your pilgrimage package.
              </h2>
            </div>
            <TabsList className="w-full sm:w-auto h-11 sm:h-12">
              <TabsTrigger id="booking-tab" value="book" className="flex-1 sm:flex-none rounded-[5px] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base">
                Book
              </TabsTrigger>
              <TabsTrigger value="overview" className="flex-1 sm:flex-none rounded-[5px] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base">
                Overview
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            <div className="rounded-[5px] border border-border bg-card/95 p-5 sm:p-7 md:p-9 shadow-[0_40px_120px_-70px_rgba(101,32,50,0.35)] backdrop-blur-xl">
              <div className="grid gap-6 md:gap-8 lg:gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                    Choose from the latest Hajj and Umrah packages, compare highlights, and then switch to the Book tab to complete your reservation instantly via WhatsApp.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    <div className="rounded-[5px] border border-border bg-background/80 p-4 sm:p-5 md:p-6">
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">Live packages</p>
                      <p className="mt-2 sm:mt-2.5 md:mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">{packages?.length ?? 0}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Available options.</p>
                    </div>
                    <div className="rounded-[5px] border border-border bg-background/80 p-4 sm:p-5 md:p-6">
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">Quick response</p>
                      <p className="mt-2 sm:mt-2.5 md:mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-foreground">WhatsApp</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Instant booking request.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="rounded-[5px] border border-border bg-background/80 p-4 sm:p-5 md:p-6">
                    <h3 className="font-semibold text-foreground mb-2 sm:mb-2.5 text-sm sm:text-base">What's included</h3>
                    <ul className="space-y-2 sm:space-y-2.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />Visa & insurance</li>
                      <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />Premium accommodation</li>
                      <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />Private transport</li>
                    </ul>
                  </div>
                  <div className="rounded-[5px] border border-border bg-background/80 p-4 sm:p-5 md:p-6">
                    <h3 className="font-semibold text-foreground mb-2 sm:mb-2.5 text-sm sm:text-base">How it works</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Select a package, choose payment plan, and submit. We'll open WhatsApp with your details ready to send.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="book">
            <div className="rounded-[5px] border border-border bg-card/95 p-5 sm:p-7 md:p-9 shadow-[0_40px_120px_-70px_rgba(101,32,50,0.35)] backdrop-blur-xl">
              <div className="grid gap-6 md:gap-8 lg:gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
                {/* Left Column - Info */}
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                    Choose from available Hajj and Umrah packages, select a payment plan, and send your booking request directly to WhatsApp.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    <div className="rounded-[5px] border border-border bg-background/80 p-4 sm:p-5 md:p-6">
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">Live packages</p>
                      <p className="mt-2 sm:mt-2.5 md:mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">{packages?.length ?? 0}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Available options.</p>
                    </div>
                    <div className="rounded-[5px] border border-border bg-background/80 p-4 sm:p-5 md:p-6">
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">Quick response</p>
                      <p className="mt-2 sm:mt-2.5 md:mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-foreground">WhatsApp</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Instant confirmation.</p>
                    </div>
                  </div>

                  {/* Package Details Display */}
                  {selectedPackage && (
                    <div className="rounded-[5px] border border-border bg-background/80 p-4 sm:p-5 space-y-2.5">
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">{selectedPackage.name}</h4>
                      <div className="space-y-1.5 text-sm">
                        <p><span className="text-muted-foreground">Type:</span> {selectedPackage.type?.toUpperCase() || 'N/A'}</p>
                        <p><span className="text-muted-foreground">Price:</span> ${selectedPackage.price || 'N/A'} {numberOfTravelers > 1 && `(× ${numberOfTravelers} = $${selectedPackage.price ? selectedPackage.price * numberOfTravelers : 'N/A'})`}</p>
                        {selectedPackage.duration && (
                          <p><span className="text-muted-foreground">Duration:</span> {selectedPackage.duration} days</p>
                        )}
                        {selectedPackage.includes && (
                          <div>
                            <p className="text-muted-foreground mb-1.5">Includes:</p>
                            <ul className="space-y-1.5">
                              {renderIncludes(selectedPackage.includes)}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Booking Summary */}
                  {selectedPackage && (
                    <div className="rounded-[5px] border border-border bg-background/80 p-4 sm:p-5">
                      <h4 className="font-semibold text-foreground mb-2 sm:mb-2.5 text-sm sm:text-base">Booking Summary</h4>
                      <div className="space-y-1.5 text-sm">
                        <p><span className="text-muted-foreground">Package:</span> {selectedPackage.name}</p>
                        <p><span className="text-muted-foreground">Travelers:</span> {numberOfTravelers}</p>
                        <p><span className="text-muted-foreground">Payment:</span> {paymentPlan}</p>
                        <p><span className="text-muted-foreground">Total:</span> ${selectedPackage.price ? selectedPackage.price * numberOfTravelers : 'N/A'}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <Label htmlFor="firstName" className="flex items-center gap-1 text-sm sm:text-base font-medium">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-4.5 sm:w-4.5 text-muted-foreground" />
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(event) => handleFieldChange('firstName', event.target.value)}
                          onBlur={() => handleBlur('firstName')}
                          placeholder="Amina"
                          className={`pl-10 sm:pl-11 h-11 sm:h-12 text-base ${touched.firstName && errors.firstName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {touched.firstName && errors.firstName && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1.5 flex items-center gap-1.5">
                          <XCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="flex items-center gap-1 text-sm sm:text-base font-medium">
                        Second Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-4.5 sm:w-4.5 text-muted-foreground" />
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(event) => handleFieldChange('lastName', event.target.value)}
                          onBlur={() => handleBlur('lastName')}
                          placeholder="Fulanah"
                          className={`pl-10 sm:pl-11 h-11 sm:h-12 text-base ${touched.lastName && errors.lastName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {touched.lastName && errors.lastName && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1.5 flex items-center gap-1.5">
                          <XCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <Label htmlFor="package" className="flex items-center gap-1 text-sm sm:text-base font-medium">
                        Package <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <PackageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-4.5 sm:w-4.5 text-muted-foreground z-10" />
                        <Select
                          value={packageId}
                          onValueChange={(value) => handleFieldChange('packageId', value)}
                          disabled={isLoading || !!error || !packages?.length}
                        >
                          <SelectTrigger id="package" className={`pl-10 sm:pl-11 h-11 sm:h-12 text-base ${errors.packageId ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select a package" />
                          </SelectTrigger>
                          <SelectContent>
                            {isLoading && (
                              <SelectItem value="loading" disabled>
                                Loading packages...
                              </SelectItem>
                            )}
                            {!isLoading && error && (
                              <SelectItem value="error" disabled>
                                Unable to load packages
                              </SelectItem>
                            )}
                            {!isLoading && !error && packages?.length === 0 && (
                              <SelectItem value="empty" disabled>
                                No packages found
                              </SelectItem>
                            )}
                            {packages?.map((pkg) => (
                              <SelectItem key={pkg.id} value={String(pkg.id)}>
                                {pkg.name || `${pkg.type?.toUpperCase() || "Package"} ${pkg.id}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {errors.packageId && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1.5 flex items-center gap-1.5">
                          <XCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                          {errors.packageId}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="paymentPlan" className="flex items-center gap-1 text-sm sm:text-base font-medium">
                        Payment Plan
                      </Label>
                      <div className="relative mt-1.5">
                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-4.5 sm:w-4.5 text-muted-foreground z-10" />
                        <Select
                          value={paymentPlan}
                          onValueChange={(value) => handleFieldChange('paymentPlan', value)}
                        >
                          <SelectTrigger id="paymentPlan" className="pl-10 sm:pl-11 h-11 sm:h-12 text-base">
                            <SelectValue placeholder="Select payment plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="Installments">Installments</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <Label htmlFor="travelers" className="flex items-center gap-1 text-sm sm:text-base font-medium">
                        Travelers <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-4.5 sm:w-4.5 text-muted-foreground" />
                        <Input
                          id="travelers"
                          type="number"
                          min="1"
                          max="20"
                          value={numberOfTravelers}
                          onChange={(e) => handleFieldChange('numberOfTravelers', parseInt(e.target.value) || 1)}
                          onBlur={() => handleBlur('numberOfTravelers')}
                          className={`pl-10 sm:pl-11 h-11 sm:h-12 text-base ${touched.numberOfTravelers && errors.numberOfTravelers ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {touched.numberOfTravelers && errors.numberOfTravelers && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1.5 flex items-center gap-1.5">
                          <XCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                          {errors.numberOfTravelers}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-1 text-sm sm:text-base font-medium">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-4.5 sm:w-4.5 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(event) => handleFieldChange('phone', event.target.value)}
                          onBlur={() => handleBlur('phone')}
                          placeholder="0756 505 926"
                          className={`pl-10 sm:pl-11 h-11 sm:h-12 text-base ${touched.phone && errors.phone ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {touched.phone && errors.phone && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1.5 flex items-center gap-1.5">
                          <XCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-1 text-sm sm:text-base font-medium">
                      Email <span className="text-muted-foreground text-xs sm:text-sm">(optional)</span>
                    </Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-4.5 sm:w-4.5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => handleFieldChange('email', event.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="amina@example.com"
                        className={`pl-10 sm:pl-11 h-11 sm:h-12 text-base ${touched.email && errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1.5 flex items-center gap-1.5">
                        <XCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="rounded-[5px] border border-border bg-background/80 p-4 sm:p-5 text-sm sm:text-base text-muted-foreground">
                    <p className="font-semibold text-foreground text-sm sm:text-base">Note</p>
                    <p className="mt-1">We'll send your booking request via WhatsApp to +256 756 505 926.</p>
                    <p className="mt-1.5 text-xs sm:text-sm">Your form data is automatically saved as a draft.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-[#5C0120] text-white hover:bg-[#4a0019] h-14 sm:h-16 text-base sm:text-lg font-semibold rounded-[5px] px-6 sm:px-8"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2.5 h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send booking request'
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="h-14 sm:h-16 text-base sm:text-lg font-semibold rounded-[5px] px-6 sm:px-8"
                      onClick={resetForm}
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Success Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-5">
          <div className="bg-white rounded-lg p-6 sm:p-7 md:p-8 max-w-md w-full mx-auto animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
              <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-green-500 flex-shrink-0" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Booking Request Sent!</h3>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-5">
              Your booking details have been sent via WhatsApp. We'll confirm your reservation shortly.
            </p>
            <div className="bg-gray-50 rounded p-3 sm:p-4 mb-4 sm:mb-5 text-sm sm:text-base">
              <p className="font-medium">Reference:</p>
              <p className="text-muted-foreground break-words mt-0.5">
                {firstName} {lastName} - {selectedPackage?.name || 'Package'} 
                ({numberOfTravelers} traveler{numberOfTravelers > 1 ? 's' : ''})
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                onClick={() => {
                  setShowConfirmation(false);
                  resetForm();
                }} 
                className="flex-1 h-14 sm:h-16 text-base sm:text-lg font-semibold rounded-[5px]"
              >
                Done
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmation(false)}
                className="h-14 sm:h-16 text-base sm:text-lg font-semibold rounded-[5px]"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingForm;
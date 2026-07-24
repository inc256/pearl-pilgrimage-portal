import { useEffect, useState, useRef } from "react";
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
import { Loader2, CheckCircle, XCircle, Users, Phone, Mail, User, Package as PackageIcon, CreditCard, Banknote, AlertCircle, Copy, Check } from "lucide-react";

const BookingForm = () => {
  const { data: packages, isLoading, error } = useAllPackages();
  const [activeTab, setActiveTab] = useState("book");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [packageId, setPackageId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Deposit");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [displayTravelers, setDisplayTravelers] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();
  const travelersInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!packageId && packages && packages.length > 0) {
      setPackageId(String(packages[0].id));
    }
  }, [packages, packageId]);

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
        setDisplayTravelers(parsed.numberOfTravelers ? String(parsed.numberOfTravelers) : "");
        setPaymentMethod(parsed.paymentMethod || "Bank Deposit");
        if (parsed.packageId) setPackageId(parsed.packageId);
      } catch (e) {
        console.error("Failed to load saved form data");
      }
    }
  }, []);

  useEffect(() => {
    const formData = {
      firstName,
      lastName,
      phone,
      email,
      numberOfTravelers,
      paymentMethod,
      packageId
    };
    localStorage.setItem('bookingFormData', JSON.stringify(formData));
  }, [firstName, lastName, phone, email, numberOfTravelers, paymentMethod, packageId]);

  const selectedPackage = packages?.find((pkg) => String(pkg.id) === packageId);

  // Copy to clipboard function
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      toast({
        title: "Copied!",
        description: `${field} copied to clipboard`,
        duration: 2000,
      });
      setTimeout(() => setCopiedField(null), 2000);
    }).catch(() => {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
        duration: 2000,
      });
    });
  };

  const renderIncludes = (includes: any) => {
    if (!includes) return null;
    if (Array.isArray(includes)) {
      return includes.slice(0, 3).map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-sm">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
          {typeof item === 'string' ? item : item.text || item.name || String(item)}
        </li>
      ));
    }
    if (typeof includes === 'string') {
      return <li className="flex items-start gap-2 text-sm">
        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
        {includes}
      </li>;
    }
    return null;
  };

  const validateField = (field: string, value: string): string => {
    switch(field) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return `${field === 'firstName' ? 'First' : 'Last'} name is required`;
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
        if (value === '') return ''; // Allow empty value during typing
        const num = parseInt(value);
        if (isNaN(num) || num < 1 || num > 99) {
          return 'Must be between 1 and 99';
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
    if (!packageId) newErrors.packageId = 'Please select a package';
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setTouched({ ...touched, [field]: true });
    if (field === 'firstName') setFirstName(value as string);
    else if (field === 'lastName') setLastName(value as string);
    else if (field === 'phone') setPhone(value as string);
    else if (field === 'email') setEmail(value as string);
    else if (field === 'numberOfTravelers') {
      const numValue = value as number;
      setNumberOfTravelers(numValue);
      setDisplayTravelers(numValue.toString());
    }
    else if (field === 'paymentMethod') setPaymentMethod(value as string);
    else if (field === 'packageId') setPackageId(value as string);
    
    const error = validateField(field, String(value));
    setErrors({ ...errors, [field]: error });
  };

  const handleTravelersFocus = () => {
    // Clear the display value when user clicks into the field
    setDisplayTravelers('');
    setTouched({ ...touched, numberOfTravelers: true });
    // If there's a value, select all text so typing replaces it
    if (travelersInputRef.current) {
      setTimeout(() => {
        if (travelersInputRef.current) {
          travelersInputRef.current.select();
        }
      }, 0);
    }
  };

  const handleTravelersChange = (value: string) => {
    setTouched({ ...touched, numberOfTravelers: true });
    setDisplayTravelers(value);
    
    if (value === '') {
      // When empty, keep the number of travelers as 1 but show empty field
      setNumberOfTravelers(1);
      setErrors({ ...errors, numberOfTravelers: '' });
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 1 && numValue <= 99) {
        setNumberOfTravelers(numValue);
        const error = validateField('numberOfTravelers', value);
        setErrors({ ...errors, numberOfTravelers: error });
      } else if (numValue > 99) {
        setErrors({ ...errors, numberOfTravelers: 'Must be between 1 and 99' });
      }
    }
  };

  const handleTravelersBlur = () => {
    setTouched({ ...touched, numberOfTravelers: true });
    if (displayTravelers === '') {
      // If field is empty on blur, keep it empty but maintain 1 as the actual value
      setNumberOfTravelers(1);
      setErrors({ ...errors, numberOfTravelers: '' });
    } else {
      const numValue = parseInt(displayTravelers);
      if (isNaN(numValue) || numValue < 1) {
        setDisplayTravelers('');
        setNumberOfTravelers(1);
        setErrors({ ...errors, numberOfTravelers: '' });
      } else if (numValue > 99) {
        setErrors({ ...errors, numberOfTravelers: 'Must be between 1 and 99' });
      } else {
        const error = validateField('numberOfTravelers', displayTravelers);
        setErrors({ ...errors, numberOfTravelers: error });
      }
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const value = field === 'numberOfTravelers' ? String(numberOfTravelers) : 
      field === 'firstName' ? firstName :
      field === 'lastName' ? lastName :
      field === 'phone' ? phone :
      field === 'email' ? email : '';
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setNumberOfTravelers(1);
    setDisplayTravelers("");
    setPaymentMethod("Bank Deposit");
    setPackageId(packages && packages.length > 0 ? String(packages[0].id) : "");
    setErrors({});
    setTouched({});
    localStorage.removeItem('bookingFormData');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Ensure we have a valid number before submitting
    if (displayTravelers === '') {
      setNumberOfTravelers(1);
    }

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
      const totalPrice = selectedPackage?.price ? selectedPackage.price * numberOfTravelers : 'N/A';
      
      let message = [
        "PEARL HIJJA & UMRAH - NEW BOOKING REQUEST",
        "",
        "────────────────────────────────────",
        "",
        "BOOKING DETAILS",
        "",
        `Name: ${firstName.trim()} ${lastName.trim()}`,
        `Phone: ${phone.trim()}`,
        `Email: ${email.trim() || "Not provided"}`,
        `Package: ${selectedPackage?.name || 'N/A'}`,
        `Travelers: ${numberOfTravelers}`,
        `Total Amount: UGX ${totalPrice}`,
        `Payment Method: ${paymentMethod}`,
      ].join("\n");

      if (paymentMethod === "Bank Deposit") {
        message += [
          "",
          "────────────────────────────────────",
          "",
          "BANK DEPOSIT DETAILS",
          "",
          "Bank: DFCU Bank",
          "Account Name: PEAR HIJJA AND UMRAH SERVICES",
          "Account Number: 01420019634678",
          "",
          "Please send deposit confirmation after payment.",
        ].join("\n");
      }

      message += [
        "",
        "────────────────────────────────────",
      ].join("\n");

      const whatsappUrl = `https://api.whatsapp.com/send/?phone=256756505926&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
      window.open(whatsappUrl, "_blank");
      
      setShowConfirmation(true);
      
      toast({
        title: "Booking request prepared",
        description: "WhatsApp will open with your booking details.",
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
    <section id="booking" className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-accent font-medium text-xs uppercase tracking-[0.24em] mb-1">Booking</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold">
                Secure Your Package
              </h2>
            </div>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="book" className="flex-1">Book</TabsTrigger>
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            <div className="rounded-lg border bg-card/80 p-6 md:p-8 backdrop-blur-sm">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">How It Works</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">1</span>
                      <span>Select your preferred package</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">2</span>
                      <span>Choose payment method (Bank Deposit recommended)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">3</span>
                      <span>Submit via WhatsApp for instant confirmation</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Package Highlights</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">✓ Visa & insurance processing</li>
                    <li className="flex items-center gap-2">✓ Premium accommodation</li>
                    <li className="flex items-center gap-2">✓ Private transport</li>
                    <li className="flex items-center gap-2">✓ 24/7 support</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="book">
            <div className="rounded-lg border bg-card/80 p-6 md:p-8 backdrop-blur-sm">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                {/* Package Summary */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Package Summary</h3>
                  {selectedPackage ? (
                    <div className="space-y-3">
                      <div className="rounded-lg border p-4">
                        <h4 className="font-semibold">{selectedPackage.name}</h4>
                        <div className="mt-2 space-y-1 text-sm">
                          <p className="text-muted-foreground">{selectedPackage.type?.toUpperCase()}</p>
                          <p className="font-medium">UGX {selectedPackage.price?.toLocaleString() || 'N/A'}</p>
                          {selectedPackage.duration && (
                            <p className="text-muted-foreground">{selectedPackage.duration} days</p>
                          )}
                        </div>
                      </div>
                      {selectedPackage.includes && (
                        <div className="rounded-lg border p-4">
                          <p className="text-sm font-medium mb-2">Includes</p>
                          <ul className="space-y-1">
                            {renderIncludes(selectedPackage.includes)}
                          </ul>
                        </div>
                      )}
                      <div className="rounded-lg border p-4 bg-primary/5">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Travelers</span>
                          <span className="font-medium">{numberOfTravelers}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-muted-foreground">Payment</span>
                          <span className="font-medium">{paymentMethod}</span>
                        </div>
                        <div className="flex justify-between text-base font-semibold mt-2 pt-2 border-t">
                          <span>Total</span>
                          <span>UGX {selectedPackage.price ? (selectedPackage.price * numberOfTravelers).toLocaleString() : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <PackageIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>Select a package to see details</p>
                    </div>
                  )}
                </div>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => handleFieldChange('firstName', e.target.value)}
                          onBlur={() => handleBlur('firstName')}
                          placeholder="Amina"
                          className={`pl-9 h-11 ${touched.firstName && errors.firstName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {touched.firstName && errors.firstName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => handleFieldChange('lastName', e.target.value)}
                          onBlur={() => handleBlur('lastName')}
                          placeholder="Fulanah"
                          className={`pl-9 h-11 ${touched.lastName && errors.lastName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {touched.lastName && errors.lastName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="0756 505 926"
                        className={`pl-9 h-11 ${touched.phone && errors.phone ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {touched.phone && errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-muted-foreground text-xs">(optional)</span>
                    </Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="amina@example.com"
                        className={`pl-9 h-11 ${touched.email && errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="package" className="text-sm font-medium">
                        Package <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <PackageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                        <Select
                          value={packageId}
                          onValueChange={(value) => handleFieldChange('packageId', value)}
                          disabled={isLoading || !!error || !packages?.length}
                        >
                          <SelectTrigger className={`pl-9 h-11 ${errors.packageId ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select package" />
                          </SelectTrigger>
                          <SelectContent>
                            {packages?.map((pkg) => (
                              <SelectItem key={pkg.id} value={String(pkg.id)}>
                                {pkg.name || `${pkg.type?.toUpperCase() || "Package"}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {errors.packageId && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> {errors.packageId}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="travelers" className="text-sm font-medium">
                        Travelers <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          ref={travelersInputRef}
                          id="travelers"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={displayTravelers}
                          placeholder="1"
                          onFocus={handleTravelersFocus}
                          onChange={(e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            handleTravelersChange(value);
                          }}
                          onBlur={handleTravelersBlur}
                          className={`pl-9 h-11 ${touched.numberOfTravelers && errors.numberOfTravelers ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {touched.numberOfTravelers && errors.numberOfTravelers && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> {errors.numberOfTravelers}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="paymentMethod" className="text-sm font-medium">
                      Payment Method
                    </Label>
                    <div className="relative mt-1.5">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                      <Select
                        value={paymentMethod}
                        onValueChange={(value) => handleFieldChange('paymentMethod', value)}
                      >
                        <SelectTrigger className="pl-9 h-11">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bank Deposit">Bank Deposit (Recommended)</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Installments">Installments</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {paymentMethod === "Bank Deposit" && (
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <Banknote className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Bank Deposit Details</p>
                          <div className="text-sm space-y-2 mt-1">
                            <p><span className="text-muted-foreground">Bank:</span> DFCU</p>
                            <p><span className="text-muted-foreground">Account Name:</span> PEAR HIJJA AND UMRAH SERVICES</p>
                            <div className="flex items-center gap-2 bg-background/50 rounded p-2 border">
                              <span className="text-muted-foreground text-xs">Account:</span>
                              <span className="font-mono font-medium text-sm select-all">01420019634678</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 ml-auto"
                                onClick={() => copyToClipboard("01420019634678", "Account Number")}
                              >
                                {copiedField === "Account Number" ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Please send deposit confirmation after payment
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-primary hover:bg-primary/90 h-12 text-base font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Submit Booking'
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="h-12 text-base"
                      onClick={resetForm}
                    >
                      Clear
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Your form data is automatically saved as a draft
                  </p>
                </form>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
              <h3 className="text-xl font-semibold">Booking Request Sent!</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Your booking details have been sent via WhatsApp. We'll confirm your reservation shortly.
            </p>
            {paymentMethod === "Bank Deposit" && (
              <div className="bg-primary/5 rounded p-3 mb-4 text-sm">
                <p className="font-medium text-primary">Bank Deposit Reminder</p>
                <div className="mt-2 space-y-1">
                  <p className="text-muted-foreground">Bank: DFCU</p>
                  <p className="text-muted-foreground">Account: PEAR HIJJA AND UMRAH SERVICES</p>
                  <div className="flex items-center gap-2 bg-background rounded p-2 mt-1">
                    <span className="text-xs text-muted-foreground">Account Number:</span>
                    <span className="font-mono font-medium text-sm select-all">01420019634678</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 ml-auto"
                      onClick={() => copyToClipboard("01420019634678", "Account Number")}
                    >
                      {copiedField === "Account Number" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => {
                  setShowConfirmation(false);
                  resetForm();
                }} 
                className="flex-1 h-12 font-semibold"
              >
                Done
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmation(false)}
                className="h-12 font-semibold"
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
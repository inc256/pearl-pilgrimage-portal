import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllPackages, submitBooking } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const { data: packages, isLoading, error } = useAllPackages();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [note, setNote] = useState("");
  const [paymentPreference, setPaymentPreference] = useState("Cash");
  const [packageId, setPackageId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!packageId && packages?.length) {
      const searchPackageId = searchParams.get("packageId");
      const foundPackage = searchPackageId && packages.some((pkg) => String(pkg.id) === searchPackageId);
      setPackageId(foundPackage ? searchPackageId : String(packages[0].id));
    }
  }, [packages, packageId, searchParams]);

  const selectedPackage = packages?.find((pkg) => String(pkg.id) === packageId);

  const validateForm = () => {
    if (!fullName.trim()) {
      setFormError("Please enter your full name.");
      return false;
    }

    if (!phone.trim() || !/^[0-9+\s-]{7,20}$/.test(phone.trim())) {
      setFormError("Please enter a valid phone number.");
      return false;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return false;
    }

    if (!packageId) {
      setFormError("Please select a package.");
      return false;
    }

    if (!travelers || travelers < 1) {
      setFormError("Please enter the number of travelers.");
      return false;
    }

    setFormError("");
    return true;
  };

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setTravelers(1);
    setNote("");
    setPaymentPreference("Deposit");
    setFormError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const parts = fullName.trim().split(/\s+/);
      const firstName = parts.shift() || '';
      const secondName = parts.join(' ') || null;
      const unitPrice = selectedPackage?.price ? Number(selectedPackage.price) : 0;
      const totalAmount = Number((unitPrice * travelers) || 0);

      await submitBooking({
        package_id: Number(packageId),
        first_name: firstName,
        second_name: secondName,
        travelers_no: travelers,
        total_amount: totalAmount,
        payment_method: { method: paymentPreference, details: { phone: phone.trim(), note: note.trim() || null } },
        booking_status: 'pending',
        email: email.trim() || null,
      });

      setSuccessMessage("Your booking request has been submitted. We'll follow up shortly.");
      resetForm();
      toast({
        title: "Booking submitted",
        description: "Your request was saved successfully.",
      });
    } catch (error) {
      setFormError("Unable to submit booking. Please try again later.");
      toast({
        title: "Submission failed",
        description: "There was an error saving your booking.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-10 sm:py-14 md:py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-accent font-medium text-sm uppercase tracking-[0.24em] mb-2">Booking</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Book Your Package</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Choose a package and submit a booking request in minutes. Our team will contact you to confirm details.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-muted bg-card p-6 lg:p-8">
            {successMessage ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-sm text-green-900 mb-6">
                {successMessage}
              </div>
            ) : null}

            {formError ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive-foreground mb-6">
                {formError}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium">Full name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Amina Fulanah"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="0756 505 926"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="amina@example.com"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="package" className="text-sm font-medium">Package</Label>
                  <div className="mt-2">
                    <Select
                      value={packageId}
                      onValueChange={(value) => setPackageId(value)}
                      disabled={isLoading || !!error || !packages?.length}
                    >
                      <SelectTrigger className="w-full">
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
                </div>
                <div>
                  <Label htmlFor="travelers" className="text-sm font-medium">Number of travelers</Label>
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-muted bg-background px-2 py-1">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setTravelers((prev) => Math.max(1, prev - 1))}
                      className="h-10 w-10 p-0"
                    >
                      -
                    </Button>
                    <Input
                      id="travelers"
                      readOnly
                      value={travelers}
                      className="h-10 w-20 text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setTravelers((prev) => Math.min(99, prev + 1))}
                      className="h-10 w-10 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="paymentPreference" className="text-sm font-medium">Payment plan</Label>
                <div className="mt-2">
                  <Select
                    value={paymentPreference}
                    onValueChange={(value) => setPaymentPreference(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Payment plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Installments">Installments</SelectItem>
                      <SelectItem value="Bank">Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="note" className="text-sm font-medium">Optional note</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Any additional requests or details"
                  className="mt-2"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" className="h-12 flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending
                    </span>
                  ) : (
                    "Submit Booking"
                  )}
                </Button>
                <Button type="button" variant="outline" className="h-12" onClick={resetForm}>
                  Clear
                </Button>
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-muted bg-card p-6 lg:p-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-accent uppercase tracking-[0.24em]">Quick summary</p>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">Booking details</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Use the form to request a booking. We save data directly into Supabase and keep the form lightweight.
                </p>
              </div>

              <div className="rounded-2xl bg-background p-5">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">Selected package</div>
                  <div className="text-base font-semibold">{selectedPackage?.name || "No package selected"}</div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Travelers</p>
                      <p className="font-medium">{travelers}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Payment</p>
                      <p className="font-medium">{paymentPreference}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Estimated cost</div>
                  <div className="text-lg font-semibold">
                    {selectedPackage?.price ? `UGX ${(Number(selectedPackage.price) * travelers).toLocaleString()}` : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;

import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAllPackages, useBookings, updateBookingStatus } from "@/hooks/useSupabase";
import { BookingStatus } from "@/types/supabase";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const statusOptions: { value: BookingStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const statusVariant: Record<BookingStatus, "default" | "secondary" | "destructive"> = {
  pending: "secondary",
  confirmed: "default",
  completed: "secondary",
  cancelled: "destructive",
};

const AdminBookings = () => {
  const { data: bookings, isLoading, error } = useBookings();
  const { data: packages } = useAllPackages();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const packageNameMap = useMemo(
    () => new Map(packages?.map((pkg) => [pkg.id, pkg.name || `Package ${pkg.id}`]) ?? []),
    [packages],
  );

  const mutation = useMutation<void, Error, { id: string; status: BookingStatus }>(
    async ({ id, status }) => updateBookingStatus(id, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        toast({
          title: "Booking updated",
          description: "The booking status was updated successfully.",
        });
      },
      onError: () => {
        toast({
          title: "Update failed",
          description: "Unable to update the booking status. Please try again.",
          variant: "destructive",
        });
      },
    },
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 bg-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <p className="text-accent font-medium text-sm uppercase tracking-[0.24em] mb-2">Admin</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Booking Requests</h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Review customer booking requests and update statuses from pending to confirmed, completed, or cancelled.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : error ? (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-destructive">
              Failed to load bookings. Please check your database connection.
            </div>
          ) : !bookings || bookings.length === 0 ? (
            <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
              No bookings have been created yet.
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="gap-4 p-6">
                    <div>
                      <CardTitle className="text-xl">{`${booking.first_name}${booking.second_name ? ' ' + booking.second_name : ''}` || "Guest Booking"}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {packageNameMap.get(booking.package_id ?? 0) || `Package #${booking.package_id}`}
                      </p>
                    </div>
                    <Badge variant={statusVariant[booking.booking_status as BookingStatus] || "secondary"}>
                      {booking.booking_status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-medium">{booking.payment_method?.details?.phone || "-"}</p>
                      <p className="font-medium">{booking.email || "-"}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Travelers</p>
                      <p className="font-medium">{booking.travelers_no ?? 1}</p>
                      <p className="text-sm text-muted-foreground">Payment</p>
                      <p className="font-medium">{booking.payment_method?.method || "N/A"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm text-muted-foreground">Note</p>
                      <p className="whitespace-pre-line text-sm text-foreground">
                        {booking.payment_method?.details?.note || "No additional notes."}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-foreground block mb-2">Status</label>
                      <Select
                        value={booking.booking_status}
                        onValueChange={(value) =>
                          mutation.mutate({ id: booking.id, status: value as BookingStatus })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminBookings;

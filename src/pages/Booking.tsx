import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

const Booking = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
};

export default Booking;

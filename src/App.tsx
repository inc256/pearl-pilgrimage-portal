import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhatsAppButton from "@/components/AIButton.tsx";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import "./index.css"
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Packages from "./pages/Packages.tsx";
import Hajj from "./pages/Hajj.tsx";
import Umrah from "./pages/Umrah.tsx";
import Booking from "./pages/Booking.tsx";
import AdminBookings from "./pages/AdminBookings.tsx";
import Gallery from "./pages/Gallery.tsx";
import Blogs from "./pages/Blogs.tsx";
import Contact from "./pages/Contact.tsx";
import About from "./pages/About.tsx";
import FAQ from "./pages/FAQ.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CurrencyProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/hajj" element={<Hajj />} />
            <Route path="/umrah" element={<Umrah />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
        </HashRouter>
      </CurrencyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
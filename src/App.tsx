import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import WhyUs from "./pages/WhyUs";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public pages with shared layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/why-us" element={<WhyUs />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            
            {/* Admin routes (without shared layout) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Loader2, Home, Info, Briefcase, Award, MessageSquare, Phone, Calendar, Car, Images, Youtube, FileText, PanelTop } from "lucide-react";
import BookingsManager from "@/components/admin/BookingsManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import ServicesManager from "@/components/admin/ServicesManager";
import ContentEditor from "@/components/admin/ContentEditor";
import VehiclesManager from "@/components/admin/VehiclesManager";
import SliderManager from "@/components/admin/SliderManager";
import VideosManager from "@/components/admin/VideosManager";
import QuotationManager from "@/components/admin/QuotationManager";
import BannerManager from "@/components/admin/BannerManager";

const homeContentSections = [
  { key: "hero", label: "Hero Section", fields: ["title", "subtitle", "content", "image_url"] },
  { key: "about_preview", label: "About Preview", fields: ["title", "subtitle", "content"] },
  { key: "cta", label: "Call to Action", fields: ["title", "content"] },
] as const;

const aboutContentSections = [
  { key: "hero", label: "Page Header", fields: ["title", "subtitle"] },
  { key: "story", label: "Our Story", fields: ["title", "content", "image_url"] },
  { key: "mission", label: "Mission Statement", fields: ["title", "content"] },
  { key: "vision", label: "Vision Statement", fields: ["title", "content"] },
] as const;

const whyUsContentSections = [
  { key: "hero", label: "Page Header", fields: ["title", "subtitle"] },
  { key: "main", label: "Main Content", fields: ["title", "content"] },
] as const;

const contactContentSections = [
  { key: "hero", label: "Page Header", fields: ["title", "subtitle"] },
  { key: "address", label: "Address", fields: ["title", "content"] },
  { key: "phone", label: "Phone Numbers", fields: ["content"] },
  { key: "email", label: "Email", fields: ["content"] },
  { key: "hours", label: "Business Hours", fields: ["content"] },
] as const;

const AdminDashboard = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login");
    } else if (!authLoading && user && !isAdmin) {
      signOut();
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate, signOut]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border px-4 py-3 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg">Roadlink Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="whyus" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Why Us</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              <span className="hidden sm:inline">Vehicles</span>
            </TabsTrigger>
            <TabsTrigger value="sliders" className="flex items-center gap-2">
              <Images className="h-4 w-4" />
              <span className="hidden sm:inline">Sliders</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="quotation" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Quotation</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <BookingsManager />
          </TabsContent>

          <TabsContent value="home">
            <ContentEditor
              pageName="home"
              pageTitle="Home"
              sectionConfigs={homeContentSections}
            />
          </TabsContent>

          <TabsContent value="about">
            <ContentEditor
              pageName="about"
              pageTitle="About Us"
              sectionConfigs={aboutContentSections}
            />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="whyus">
            <ContentEditor
              pageName="whyus"
              pageTitle="Why Choose Us"
              sectionConfigs={whyUsContentSections}
            />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>

          <TabsContent value="contact">
            <ContentEditor
              pageName="contact"
              pageTitle="Contact"
              sectionConfigs={contactContentSections}
            />
          </TabsContent>

          <TabsContent value="vehicles">
            <VehiclesManager />
          </TabsContent>

          <TabsContent value="sliders">
            <SliderManager />
          </TabsContent>

          <TabsContent value="quotation">
            <QuotationManager />
          </TabsContent>

          <TabsContent value="videos">
            <VideosManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;

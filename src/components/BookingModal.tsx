import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin, User, CheckCircle } from "lucide-react";

const bookingSchema = z.object({
  pickup_location: z.string().trim().min(2, "Pickup location is required").max(200),
  destination: z.string().trim().min(2, "Destination is required").max(200),
  customer_name: z.string().trim().min(2, "Name is required").max(100),
  phone_number: z.string().trim().min(10, "Valid phone number required").max(15),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
});

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    pickup_location: "",
    destination: "",
    customer_name: "",
    phone_number: "",
    email: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const result = bookingSchema.pick({ pickup_location: true, destination: true }).safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("bookings").insert({
      pickup_location: formData.pickup_location.trim(),
      destination: formData.destination.trim(),
      customer_name: formData.customer_name.trim(),
      phone_number: formData.phone_number.trim(),
      email: formData.email.trim() || null,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSuccess(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after animation completes
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setFormData({
        pickup_location: "",
        destination: "",
        customer_name: "",
        phone_number: "",
        email: "",
      });
      setErrors({});
    }, 200);
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-secondary" />
            </div>
            <DialogTitle className="text-xl mb-2">Booking Received!</DialogTitle>
            <DialogDescription className="text-base">
              Thank you! Your booking has been received. Our team will contact you shortly.
            </DialogDescription>
            <Button onClick={handleClose} className="mt-6">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 1 ? (
              <>
                <MapPin className="h-5 w-5 text-primary" />
                Trip Details
              </>
            ) : (
              <>
                <User className="h-5 w-5 text-primary" />
                Customer Details
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            Step {step} of 2 — {step === 1 ? "Enter your trip information" : "Enter your contact details"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Point *</Label>
                <Input
                  id="pickup"
                  placeholder="e.g., Coimbatore Railway Station"
                  value={formData.pickup_location}
                  onChange={(e) => handleChange("pickup_location", e.target.value)}
                />
                {errors.pickup_location && (
                  <p className="text-sm text-destructive">{errors.pickup_location}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination *</Label>
                <Input
                  id="destination"
                  placeholder="e.g., Ooty, Nilgiris"
                  value={formData.destination}
                  onChange={(e) => handleChange("destination", e.target.value)}
                />
                {errors.destination && (
                  <p className="text-sm text-destructive">{errors.destination}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.customer_name}
                  onChange={(e) => handleChange("customer_name", e.target.value)}
                />
                {errors.customer_name && (
                  <p className="text-sm text-destructive">{errors.customer_name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g., 9876543210"
                  value={formData.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                />
                {errors.phone_number && (
                  <p className="text-sm text-destructive">{errors.phone_number}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step === 2 ? (
              <>
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Confirm Booking
                </Button>
              </>
            ) : (
              <>
                <Button type="button" variant="ghost" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Next
                </Button>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;

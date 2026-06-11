import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Star, Copy, Check, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { toast } from "sonner";

const UPI_ID = "dinesharputharaj-4@okicici";
const UPI_LINK = "upi://pay?pa=dinesharputharaj-4@okicici&pn=Roadlink%20Tours%20and%20Travels";
const GOOGLE_REVIEW_URL = "https://g.page/r/CWb9iblFoyItEBM/review";

const isMobileDevice = () => {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const PaymentReview = () => {
  const [copied, setCopied] = useState(false);
  const isMobile = isMobileDevice();

  const handleCopyUpi = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      toast.success("UPI ID copied to clipboard!", {
        description: "You can now paste it in your UPI app to complete the payment.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy UPI ID automatically.");
    }
  }, []);

  const handleUpiClick = () => {
    if (!isMobile) {
      handleCopyUpi();
      return;
    }
    window.location.href = UPI_LINK;
  };

  return (
    <>
      <SEO
        title="Payment & Customer Review | Roadlink Tours and Travels"
        description="Make instant UPI payments and leave a Google Review for Roadlink Tours and Travels — the best taxi service in Coimbatore."
        path="/payment-review"
        keywords="Coimbatore taxi payment, UPI payment taxi Coimbatore, Roadlink Tours and Travels review, Google review taxi service"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(152,73%,18%)] to-[hsl(152,73%,12%)] text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Payment & Customer Review
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Thank you for choosing Roadlink Tours and Travels. You can make your
            payment instantly via UPI and leave us a Google Review.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Google Review Card */}
            <Card className="group relative overflow-hidden border border-border bg-card p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-500 flex flex-col items-center text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <Star className="w-8 h-8 md:w-10 md:h-10 text-primary fill-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  Google Review
                </h2>
                <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-xs">
                  Loved our service? Share your experience with others on Google.
                </p>
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 h-auto text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group/btn"
                >
                  <a
                    href={GOOGLE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leave a Google Review
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </Card>

            {/* UPI Payment Card */}
            <Card className="group relative overflow-hidden border border-border bg-card p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-500 flex flex-col items-center text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[hsl(152,73%,18%)]/10 flex items-center justify-center mb-5 group-hover:bg-[hsl(152,73%,18%)]/20 transition-colors duration-300">
                  <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-[hsl(152,73%,18%)]" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  UPI Payment
                </h2>
                <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-xs">
                  Pay securely using any UPI app on your mobile device.
                </p>

                {isMobile ? (
                  <Button
                    onClick={handleUpiClick}
                    className="bg-[hsl(152,73%,18%)] text-white hover:bg-[hsl(152,73%,14%)] px-6 py-3 h-auto text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group/btn"
                  >
                    Pay via UPI
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <div className="flex flex-col items-center gap-3 w-full">
                    <div className="bg-muted rounded-lg px-4 py-3 font-mono text-sm md:text-base text-foreground tracking-wide border border-border">
                      {UPI_ID}
                    </div>
                    <Button
                      onClick={handleCopyUpi}
                      variant="outline"
                      className="border-[hsl(152,73%,18%)] text-[hsl(152,73%,18%)] hover:bg-[hsl(152,73%,18%)] hover:text-white px-6 py-3 h-auto text-base font-semibold rounded-xl transition-all duration-300"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy UPI ID
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Help / Contact */}
          <div className="mt-10 md:mt-14 text-center">
            <p className="text-muted-foreground text-sm md:text-base mb-5">
              Facing issues with payment or have questions?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="outline" asChild className="rounded-full">
                <a href="tel:+918248199154" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </Button>
              <Button variant="outline" asChild className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 border-secondary">
                <a
                  href="https://wa.me/918248199154?text=Hi, I need help with payment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Banner */}
      <section className="py-10 md:py-14 bg-muted border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-foreground/80 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Your support and feedback help{" "}
            <span className="text-[hsl(152,73%,18%)] font-semibold">
              Roadlink Tours and Travels
            </span>{" "}
            serve you better.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Link to="/" className="hover:text-primary transition-colors">
              Back to Home
            </Link>
            <span>•</span>
            <Link to="/services" className="hover:text-primary transition-colors">
              Our Services
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentReview;

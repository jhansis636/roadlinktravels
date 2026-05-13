import { useSliderImages } from "@/hooks/useSliderImages";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface PageSliderProps {
  pageName: string;
  aspectRatio?: number;
  className?: string;
  showOverlay?: boolean;
}

const PageSlider = ({ pageName, aspectRatio = 16 / 6, className = "", showOverlay = true }: PageSliderProps) => {
  const { data: images, isLoading } = useSliderImages(pageName, true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (isLoading) {
    return (
      <div className={className}>
        <AspectRatio ratio={aspectRatio}>
          <Skeleton className="w-full h-full" />
        </AspectRatio>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[autoplayPlugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <AspectRatio ratio={aspectRatio}>
                <div className="relative w-full h-full">
                  <img
                    src={image.image_url}
                    alt={image.title || "Slider image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  {showOverlay && (image.title || image.subtitle) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                      <div className="p-4 sm:p-6 md:p-8 text-white">
                        {image.title && (
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                            {image.title}
                          </h3>
                        )}
                        {image.subtitle && (
                          <p className="text-sm sm:text-base text-white/90">
                            {image.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2 sm:left-4 bg-background/80 hover:bg-background border-border" />
            <CarouselNext className="right-2 sm:right-4 bg-background/80 hover:bg-background border-border" />
          </>
        )}
      </Carousel>

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current
                  ? "bg-primary w-4"
                  : "bg-white/60 hover:bg-white/80"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageSlider;

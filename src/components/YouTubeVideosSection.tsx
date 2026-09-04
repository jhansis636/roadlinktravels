import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const videos = [
  { id: "Cx8MjP7PE1I", title: "Roadlink Travels – Journey Highlights" },
  { id: "FwHpS1e14Gk", title: "Roadlink Travels – On the Road" },
];

const YouTubeVideosSection = () => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Videos</h2>
          <p className="text-muted-foreground mt-2">Experience the Roadlink Travels journey.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
          {videos.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActive(v.id)}
              aria-label={`Play video: ${v.title}`}
              className="group relative block w-full text-left rounded-2xl overflow-hidden border border-border bg-card shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes("/default.jpg")) {
                      target.src = `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`;
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-background/25 backdrop-blur-md border border-white/40 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                    <Play className="w-7 h-7 md:w-9 md:h-9 text-primary-foreground fill-current ml-1" />
                  </span>
                </span>
              </AspectRatio>
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{v.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in"
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close video"
              className="absolute -top-11 right-0 flex items-center justify-center w-9 h-9 rounded-full bg-background/90 text-foreground hover:bg-background transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="w-5 h-5" />
            </button>
            <AspectRatio ratio={16 / 9} className="rounded-xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${active}?autoplay=1&rel=0`}
                title="Roadlink Travels video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </AspectRatio>
          </div>
        </div>
      )}
    </section>
  );
};

export default YouTubeVideosSection;

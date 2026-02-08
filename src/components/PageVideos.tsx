import { usePageVideos, extractYouTubeId } from "@/hooks/usePageVideos";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface PageVideosProps {
  pageName: string;
  className?: string;
  title?: string;
}

const PageVideos = ({ pageName, className, title }: PageVideosProps) => {
  const { data: videos, isLoading } = usePageVideos(pageName, true);

  if (isLoading || !videos || videos.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
            {title}
          </h2>
        )}
        <div className={cn(
          "grid gap-6",
          videos.length === 1 ? "max-w-3xl mx-auto" : "md:grid-cols-2"
        )}>
          {videos.map((video) => {
            const videoId = extractYouTubeId(video.youtube_url);
            if (!videoId) return null;

            return (
              <div key={video.id} className="space-y-3">
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title || "YouTube video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </AspectRatio>
                {video.title && (
                  <h3 className="text-lg font-semibold text-foreground text-center">
                    {video.title}
                  </h3>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PageVideos;

import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Image as ImageIcon, Loader2, Save, Trash2 } from "lucide-react";
import { tourPackagesData } from "@/data/tourPackagesData";
import {
  useTourPlaceImagesByPage,
  useUpsertTourPlaceImage,
  useDeleteTourPlaceImage,
} from "@/hooks/useTourPlaceImages";

const PAGE_SLUGS = Object.keys(tourPackagesData);

const PageEditor = ({ slug }: { slug: string }) => {
  const pageData = tourPackagesData[slug];
  const { data: rows, isLoading } = useTourPlaceImagesByPage(slug);
  const upsert = useUpsertTourPlaceImage();
  const remove = useDeleteTourPlaceImage();

  // Unique list of all places across all routes for this page
  const places = useMemo(() => {
    const set = new Set<string>();
    pageData.routes.forEach((r) => r.highlights.forEach((h) => set.add(h)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [pageData]);

  const savedMap = useMemo(() => {
    const m: Record<string, { id: string; url: string }> = {};
    rows?.forEach((r) => (m[r.place_name] = { id: r.id, url: r.image_url }));
    return m;
  }, [rows]);

  const [drafts, setDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    // Seed drafts from saved values when rows load/change
    const next: Record<string, string> = {};
    places.forEach((p) => (next[p] = savedMap[p]?.url ?? ""));
    setDrafts(next);
  }, [places, savedMap]);

  const handleSave = (place: string) => {
    upsert.mutate({ page_slug: slug, place_name: place, image_url: drafts[place]?.trim() || "" });
  };

  const handleClear = (place: string) => {
    const saved = savedMap[place];
    if (saved) remove.mutate(saved.id);
    setDrafts((d) => ({ ...d, [place]: "" }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Paste an image URL (JPG, PNG or WebP) for each place. Leave blank to show the default placeholder on the site.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {places.map((place) => {
          const url = drafts[place] ?? "";
          const saved = savedMap[place]?.url ?? "";
          const dirty = url.trim() !== saved.trim();
          return (
            <Card key={place} className="overflow-hidden">
              <CardContent className="p-3 space-y-2">
                <Label className="text-sm font-semibold">{place}</Label>
                <Input
                  placeholder="https://example.com/photo.jpg"
                  value={url}
                  onChange={(e) => setDrafts((d) => ({ ...d, [place]: e.target.value }))}
                />
                <AspectRatio ratio={3 / 2} className="rounded-md overflow-hidden border bg-muted">
                  {url ? (
                    <img
                      src={url}
                      alt={place}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      <ImageIcon className="h-5 w-5 mr-1" /> No image set
                    </div>
                  )}
                </AspectRatio>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleSave(place)}
                    disabled={!dirty || upsert.isPending}
                  >
                    <Save className="h-3.5 w-3.5 mr-1" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleClear(place)}
                    disabled={!saved && !url}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const TourPlaceImagesManager = () => {
  const [tab, setTab] = useState(PAGE_SLUGS[0]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Tour Package — Place Images
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
            {PAGE_SLUGS.map((slug) => (
              <TabsTrigger key={slug} value={slug} className="text-xs sm:text-sm">
                {tourPackagesData[slug].heading.replace(" from Coimbatore", "")}
              </TabsTrigger>
            ))}
          </TabsList>
          {PAGE_SLUGS.map((slug) => (
            <TabsContent key={slug} value={slug}>
              <PageEditor slug={slug} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TourPlaceImagesManager;
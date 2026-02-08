import { useState } from "react";
import { usePageVideos, useCreatePageVideo, useUpdatePageVideo, useDeletePageVideo, extractYouTubeId } from "@/hooks/usePageVideos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Trash2, Edit2, Save, X, Youtube } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const PAGES = [
  { value: "home", label: "Home" },
  { value: "about", label: "About Us" },
  { value: "services", label: "Services" },
  { value: "whyus", label: "Why Us" },
  { value: "testimonials", label: "Testimonials" },
];

const VideosManager = () => {
  const { data: videos, isLoading } = usePageVideos();
  const createVideo = useCreatePageVideo();
  const updateVideo = useUpdatePageVideo();
  const deleteVideo = useDeletePageVideo();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    page_name: "home",
    youtube_url: "",
    title: "",
    display_order: 0,
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      page_name: "home",
      youtube_url: "",
      title: "",
      display_order: 0,
      is_active: true,
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!formData.youtube_url.trim()) return;

    const videoId = extractYouTubeId(formData.youtube_url);
    if (!videoId) {
      return;
    }

    if (editingId) {
      await updateVideo.mutateAsync({ id: editingId, ...formData });
    } else {
      await createVideo.mutateAsync(formData);
    }
    resetForm();
  };

  const handleEdit = (video: typeof videos extends (infer T)[] ? T : never) => {
    setFormData({
      page_name: video.page_name,
      youtube_url: video.youtube_url,
      title: video.title || "",
      display_order: video.display_order,
      is_active: video.is_active,
    });
    setEditingId(video.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      await deleteVideo.mutateAsync(id);
    }
  };

  const getVideoPreview = (url: string) => {
    const videoId = extractYouTubeId(url);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">YouTube Videos</h2>
          <p className="text-muted-foreground">Manage videos displayed on website pages</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Video
          </Button>
        )}
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Video" : "Add New Video"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="page">Page</Label>
                <Select
                  value={formData.page_name}
                  onValueChange={(value) => setFormData({ ...formData, page_name: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGES.map((page) => (
                      <SelectItem key={page.value} value={page.value}>
                        {page.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">YouTube URL</Label>
              <Input
                id="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.youtube_url}
                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
              />
              {formData.youtube_url && !extractYouTubeId(formData.youtube_url) && (
                <p className="text-sm text-destructive">Invalid YouTube URL</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                placeholder="Video title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>

            {formData.youtube_url && extractYouTubeId(formData.youtube_url) && (
              <div className="max-w-md">
                <Label className="mb-2 block">Preview</Label>
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                  <img
                    src={getVideoPreview(formData.youtube_url) || ""}
                    alt="Video thumbnail"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                disabled={!formData.youtube_url || !extractYouTubeId(formData.youtube_url)}
              >
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Update" : "Save"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {PAGES.map((page) => {
          const pageVideos = videos?.filter((v) => v.page_name === page.value) || [];
          if (pageVideos.length === 0) return null;

          return (
            <Card key={page.value}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{page.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pageVideos.map((video) => (
                    <div
                      key={video.id}
                      className={`border rounded-lg overflow-hidden ${!video.is_active ? "opacity-50" : ""}`}
                    >
                      <AspectRatio ratio={16 / 9} className="bg-muted">
                        <img
                          src={getVideoPreview(video.youtube_url) || ""}
                          alt={video.title || "Video"}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Youtube className="h-12 w-12 text-red-600 bg-white rounded-full p-2" />
                        </div>
                      </AspectRatio>
                      <div className="p-3 space-y-2">
                        <p className="font-medium text-sm truncate">
                          {video.title || "Untitled Video"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {video.youtube_url}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(video)}>
                            <Edit2 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive"
                            onClick={() => handleDelete(video.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {(!videos || videos.length === 0) && !isAdding && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Youtube className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No videos added yet. Click "Add Video" to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideosManager;

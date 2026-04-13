import { useState } from "react";
import {
  useBannerImages,
  useBannerSettings,
  useCreateBannerImage,
  useUpdateBannerImage,
  useDeleteBannerImage,
  useUpdateBannerSettings,
  BannerImage,
} from "@/hooks/useBannerImages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Plus, Pencil, Trash2, Image as ImageIcon, Loader2, Eye, Settings2 } from "lucide-react";

const BannerManager = () => {
  const { data: images, isLoading } = useBannerImages(false);
  const { data: settings } = useBannerSettings();
  const createMutation = useCreateBannerImage();
  const updateMutation = useUpdateBannerImage();
  const deleteMutation = useDeleteBannerImage();
  const settingsMutation = useUpdateBannerSettings();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<BannerImage | null>(null);
  const [formData, setFormData] = useState({ image_url: "", title: "", subtitle: "", display_order: 0, is_active: true });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleOpenDialog = (image?: BannerImage) => {
    if (image) {
      setEditingImage(image);
      setFormData({ image_url: image.image_url, title: image.title || "", subtitle: image.subtitle || "", display_order: image.display_order, is_active: image.is_active });
    } else {
      setEditingImage(null);
      const nextOrder = images?.length ? Math.max(...images.map(i => i.display_order)) + 1 : 0;
      setFormData({ image_url: "", title: "", subtitle: "", display_order: nextOrder, is_active: true });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.image_url.trim()) return;
    if (editingImage) {
      await updateMutation.mutateAsync({ id: editingImage.id, ...formData, title: formData.title || null, subtitle: formData.subtitle || null });
    } else {
      await createMutation.mutateAsync({ ...formData, title: formData.title || null, subtitle: formData.subtitle || null });
    }
    setIsDialogOpen(false);
    setEditingImage(null);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Banner Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Banner Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Label>Mode:</Label>
            <Select
              value={settings?.mode || "single"}
              onValueChange={(v) => settingsMutation.mutate({ mode: v as "single" | "slider" })}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Banner</SelectItem>
                <SelectItem value="slider">Slider Banner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings?.mode === "slider" && (
            <>
              <div className="flex items-center gap-4">
                <Label>Transition:</Label>
                <Select
                  value={settings?.transition_effect || "fade"}
                  onValueChange={(v) => settingsMutation.mutate({ transition_effect: v as "fade" | "slide" })}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fade">Fade</SelectItem>
                    <SelectItem value="slide">Slide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Slide Duration: {settings?.slide_duration || 4}s</Label>
                <Slider
                  value={[settings?.slide_duration || 4]}
                  min={2}
                  max={10}
                  step={1}
                  onValueCommit={(v) => settingsMutation.mutate({ slide_duration: v[0] })}
                  className="w-64"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Banner Images Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Banner Images
          </CardTitle>
          <Button onClick={() => handleOpenDialog()} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Image
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : images && images.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <Card key={image.id} className={`overflow-hidden ${!image.is_active ? "opacity-60" : ""}`}>
                  <AspectRatio ratio={16 / 5}>
                    <img
                      src={image.image_url}
                      alt={image.title || "Banner"}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                  </AspectRatio>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{image.title || "No title"}</p>
                        <p className="text-xs text-muted-foreground">Order: {image.display_order}</p>
                      </div>
                      <Switch
                        checked={image.is_active}
                        onCheckedChange={() => updateMutation.mutate({ id: image.id, is_active: !image.is_active })}
                      />
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setPreviewUrl(image.image_url)}>
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenDialog(image)}>
                        <Pencil className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Banner Image</AlertDialogTitle>
                            <AlertDialogDescription>Are you sure? This cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteMutation.mutate(image.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No banner images yet.</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-1" />
                Add First Banner
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingImage ? "Edit Banner Image" : "Add Banner Image"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Image URL *</Label>
              <Input placeholder="https://example.com/banner.jpg" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
              {formData.image_url && (
                <AspectRatio ratio={16 / 5} className="mt-2 rounded-md overflow-hidden border">
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                </AspectRatio>
              )}
            </div>
            <div className="space-y-2">
              <Label>Title (optional)</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Subtitle (optional)</Label>
              <Input value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input type="number" min={0} value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!formData.image_url.trim() || isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
              {editingImage ? "Save Changes" : "Add Image"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Banner Preview</DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <AspectRatio ratio={16 / 5}>
              <img src={previewUrl} alt="Banner preview" className="w-full h-full object-cover rounded-md" />
            </AspectRatio>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BannerManager;

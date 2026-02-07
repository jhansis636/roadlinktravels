import { useState } from "react";
import { useSliderImages, useCreateSliderImage, useUpdateSliderImage, useDeleteSliderImage, SliderImage } from "@/hooks/useSliderImages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Image as ImageIcon, Loader2, GripVertical } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const PAGES = [
  { key: "home", label: "Home Page" },
  { key: "about", label: "About Page" },
  { key: "services", label: "Services Page" },
  { key: "whyus", label: "Why Us" },
  { key: "testimonials", label: "Testimonials" },
] as const;

type PageKey = typeof PAGES[number]["key"];

interface SliderFormData {
  image_url: string;
  title: string;
  subtitle: string;
  display_order: number;
  is_active: boolean;
}

const defaultFormData: SliderFormData = {
  image_url: "",
  title: "",
  subtitle: "",
  display_order: 0,
  is_active: true,
};

const SliderManager = () => {
  const [selectedPage, setSelectedPage] = useState<PageKey>("home");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<SliderImage | null>(null);
  const [formData, setFormData] = useState<SliderFormData>(defaultFormData);

  const { data: images, isLoading } = useSliderImages(selectedPage, false);
  const createMutation = useCreateSliderImage();
  const updateMutation = useUpdateSliderImage();
  const deleteMutation = useDeleteSliderImage();

  const handleOpenDialog = (image?: SliderImage) => {
    if (image) {
      setEditingImage(image);
      setFormData({
        image_url: image.image_url,
        title: image.title || "",
        subtitle: image.subtitle || "",
        display_order: image.display_order,
        is_active: image.is_active,
      });
    } else {
      setEditingImage(null);
      const nextOrder = images?.length ? Math.max(...images.map(i => i.display_order)) + 1 : 0;
      setFormData({ ...defaultFormData, display_order: nextOrder });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingImage(null);
    setFormData(defaultFormData);
  };

  const handleSubmit = async () => {
    if (!formData.image_url.trim()) return;

    if (editingImage) {
      await updateMutation.mutateAsync({
        id: editingImage.id,
        ...formData,
        title: formData.title || null,
        subtitle: formData.subtitle || null,
      });
    } else {
      await createMutation.mutateAsync({
        page_name: selectedPage,
        ...formData,
        title: formData.title || null,
        subtitle: formData.subtitle || null,
      });
    }
    handleCloseDialog();
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const handleToggleActive = async (image: SliderImage) => {
    await updateMutation.mutateAsync({
      id: image.id,
      is_active: !image.is_active,
    });
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Slider Image Management
        </CardTitle>
        <Button onClick={() => handleOpenDialog()} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Image
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedPage} onValueChange={(v) => setSelectedPage(v as PageKey)}>
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
            {PAGES.map((page) => (
              <TabsTrigger key={page.key} value={page.key} className="text-xs sm:text-sm">
                {page.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {PAGES.map((page) => (
            <TabsContent key={page.key} value={page.key}>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : images && images.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {images.map((image) => (
                    <Card key={image.id} className={`overflow-hidden ${!image.is_active ? "opacity-60" : ""}`}>
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={image.image_url}
                          alt={image.title || "Slider image"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </AspectRatio>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate">
                              {image.title || "No title"}
                            </p>
                            {image.subtitle && (
                              <p className="text-xs text-muted-foreground truncate">
                                {image.subtitle}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              Order: {image.display_order}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Switch
                              checked={image.is_active}
                              onCheckedChange={() => handleToggleActive(image)}
                              aria-label="Toggle active"
                            />
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleOpenDialog(image)}
                          >
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
                                <AlertDialogTitle>Delete Image</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this slider image? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(image.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
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
                  <p>No slider images for this page yet.</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => handleOpenDialog()}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add First Image
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? "Edit Slider Image" : "Add Slider Image"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL *</Label>
                <Input
                  id="image_url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
                {formData.image_url && (
                  <AspectRatio ratio={16 / 9} className="mt-2 rounded-md overflow-hidden border">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </AspectRatio>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title (optional)</Label>
                <Input
                  id="title"
                  placeholder="Slide title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle (optional)</Label>
                <Input
                  id="subtitle"
                  placeholder="Slide subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  min={0}
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!formData.image_url.trim() || isSaving}>
                {isSaving && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                {editingImage ? "Save Changes" : "Add Image"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SliderManager;

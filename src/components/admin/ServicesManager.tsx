import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Save, Plus, Edit2, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  type Service,
} from "@/hooks/useServices";

const ICON_OPTIONS = [
  "Car", "MapPin", "Plane", "Building2", "Users", "Palmtree",
  "Clock", "Shield", "Headphones", "Star", "Heart", "ThumbsUp"
];

const ServicesManager = () => {
  const { data: services, isLoading } = useServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon_name: "Car",
    image_url: "",
    features: [] as string[],
    is_active: true,
    display_order: 0,
  });
  const [newFeature, setNewFeature] = useState("");

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon_name: "Car",
      image_url: "",
      features: [],
      is_active: true,
      display_order: 0,
    });
    setNewFeature("");
    setEditingId(null);
  };

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
      icon_name: service.icon_name || "Car",
      image_url: service.image_url || "",
      features: service.features || [],
      is_active: service.is_active,
      display_order: service.display_order,
    });
    setEditingId(service.id);
    setIsDialogOpen(true);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    if (editingId) {
      updateMutation.mutate(
        { id: editingId, ...formData },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            resetForm();
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setIsDialogOpen(false);
          resetForm();
        },
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div className="p-4 text-center text-muted-foreground">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Services</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Local Taxi Services"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Service description..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select
                  value={formData.icon_name}
                  onValueChange={(value) => setFormData({ ...formData, icon_name: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/service.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label>Features</Label>
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" variant="outline" onClick={addFeature}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm"
                    >
                      {feature}
                      <button type="button" onClick={() => removeFeature(index)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>Active</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending || !formData.title || !formData.description}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Update Service" : "Add Service"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {services?.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No services yet. Click "Add Service" to create one.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {services?.map((service) => (
            <Card key={service.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{service.title}</span>
                      {!service.is_active && (
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">Inactive</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{service.description}</p>
                    {service.features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {service.features.map((feature, i) => (
                          <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Service?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete "{service.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(service.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesManager;

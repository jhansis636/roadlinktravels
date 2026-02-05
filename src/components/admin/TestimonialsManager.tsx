import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Save, Plus, Star, Edit2, X } from "lucide-react";
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
  useTestimonials,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
  type Testimonial,
} from "@/hooks/useTestimonials";

const TestimonialsManager = () => {
  const { data: testimonials, isLoading } = useTestimonials();
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customer_name: "",
    location: "",
    rating: 5,
    review_text: "",
    avatar_url: "",
    is_featured: false,
    is_active: true,
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({
      customer_name: "",
      location: "",
      rating: 5,
      review_text: "",
      avatar_url: "",
      is_featured: false,
      is_active: true,
      display_order: 0,
    });
    setEditingId(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      customer_name: testimonial.customer_name,
      location: testimonial.location || "",
      rating: testimonial.rating,
      review_text: testimonial.review_text,
      avatar_url: testimonial.avatar_url || "",
      is_featured: testimonial.is_featured,
      is_active: testimonial.is_active,
      display_order: testimonial.display_order,
    });
    setEditingId(testimonial.id);
    setIsDialogOpen(true);
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
    return <div className="p-4 text-center text-muted-foreground">Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="customer_name">Customer Name *</Label>
                <Input
                  id="customer_name"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Coimbatore"
                />
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`h-6 w-6 ${star <= formData.rating ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="review_text">Review *</Label>
                <Textarea
                  id="review_text"
                  value={formData.review_text}
                  onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                  placeholder="Customer review text..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label>Featured</Label>
                </div>
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
                disabled={createMutation.isPending || updateMutation.isPending || !formData.customer_name || !formData.review_text}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Update Testimonial" : "Add Testimonial"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {testimonials?.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No testimonials yet. Click "Add Testimonial" to create one.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {testimonials?.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{testimonial.customer_name}</span>
                      {testimonial.location && (
                        <span className="text-sm text-muted-foreground">• {testimonial.location}</span>
                      )}
                      {!testimonial.is_active && (
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">Inactive</span>
                      )}
                      {testimonial.is_featured && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Featured</span>
                      )}
                    </div>
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{testimonial.review_text}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial)}>
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
                          <AlertDialogTitle>Delete Testimonial?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the testimonial from {testimonial.customer_name}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(testimonial.id)}
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

export default TestimonialsManager;

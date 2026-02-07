import { useState } from "react";
import { useVehicles, useUpdateVehicle } from "@/hooks/useVehicles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Car, ImageIcon } from "lucide-react";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

const VehiclesManager = () => {
  const { data: vehicles, isLoading, error } = useVehicles();
  const updateVehicle = useUpdateVehicle();
  const [editingUrls, setEditingUrls] = useState<Record<string, string>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-destructive">
          Failed to load vehicles. Please try again.
        </CardContent>
      </Card>
    );
  }

  const handleUrlChange = (vehicleId: string, url: string) => {
    setEditingUrls((prev) => ({ ...prev, [vehicleId]: url }));
    setImageErrors((prev) => ({ ...prev, [vehicleId]: false }));
  };

  const handleSave = async (vehicleId: string) => {
    const newUrl = editingUrls[vehicleId];
    if (newUrl === undefined) return;

    await updateVehicle.mutateAsync({
      id: vehicleId,
      updates: { image_url: newUrl || null },
    });

    setEditingUrls((prev) => {
      const updated = { ...prev };
      delete updated[vehicleId];
      return updated;
    });
  };

  const getDisplayUrl = (vehicle: { id: string; image_url: string | null }) => {
    if (editingUrls[vehicle.id] !== undefined) {
      return editingUrls[vehicle.id];
    }
    return vehicle.image_url || "";
  };

  const getPreviewUrl = (vehicle: { id: string; image_url: string | null }) => {
    const url = getDisplayUrl(vehicle);
    if (!url || imageErrors[vehicle.id]) {
      return PLACEHOLDER_IMAGE;
    }
    return url;
  };

  const handleImageError = (vehicleId: string) => {
    setImageErrors((prev) => ({ ...prev, [vehicleId]: true }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Vehicle Image Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Upload or paste image URLs for each vehicle. Changes will reflect
            immediately on the Home page.
          </p>

          <div className="grid gap-6">
            {vehicles?.map((vehicle) => {
              const hasChanges = editingUrls[vehicle.id] !== undefined;
              const currentUrl = getDisplayUrl(vehicle);

              return (
                <Card key={vehicle.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Image Preview */}
                      <div className="w-full md:w-40 flex-shrink-0">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted border">
                          <img
                            src={getPreviewUrl(vehicle)}
                            alt={vehicle.name}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(vehicle.id)}
                          />
                        </div>
                      </div>

                      {/* Vehicle Info & URL Input */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">
                            {vehicle.name}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            ({vehicle.capacity})
                          </span>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor={`url-${vehicle.id}`}
                            className="flex items-center gap-1"
                          >
                            <ImageIcon className="h-3 w-3" />
                            Image URL
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id={`url-${vehicle.id}`}
                              type="url"
                              placeholder="https://example.com/image.jpg"
                              value={currentUrl}
                              onChange={(e) =>
                                handleUrlChange(vehicle.id, e.target.value)
                              }
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleSave(vehicle.id)}
                              disabled={!hasChanges || updateVehicle.isPending}
                            >
                              {updateVehicle.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="h-4 w-4" />
                              )}
                              <span className="ml-1 hidden sm:inline">
                                Save
                              </span>
                            </Button>
                          </div>
                          {imageErrors[vehicle.id] && currentUrl && (
                            <p className="text-xs text-destructive">
                              Unable to load image. Please check the URL.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehiclesManager;

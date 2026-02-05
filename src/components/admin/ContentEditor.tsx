import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Save, Plus, GripVertical } from "lucide-react";
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
import { usePageContent, useUpsertPageContent, useDeletePageContent, type PageContent } from "@/hooks/usePageContent";

interface ContentEditorProps {
  pageName: string;
  pageTitle: string;
  sectionConfigs: readonly {
    readonly key: string;
    readonly label: string;
    readonly fields: readonly ("title" | "subtitle" | "content" | "image_url")[];
  }[];
}

const ContentEditor = ({ pageName, pageTitle, sectionConfigs }: ContentEditorProps) => {
  const { data: sections, isLoading } = usePageContent(pageName);
  const upsertMutation = useUpsertPageContent();
  const deleteMutation = useDeletePageContent();
  
  const [editedSections, setEditedSections] = useState<Record<string, Partial<PageContent>>>({});

  useEffect(() => {
    if (sections) {
      const initial: Record<string, Partial<PageContent>> = {};
      sections.forEach((s) => {
        initial[s.section_key] = s;
      });
      setEditedSections(initial);
    }
  }, [sections]);

  const handleFieldChange = (sectionKey: string, field: keyof PageContent, value: string | boolean) => {
    setEditedSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value,
      },
    }));
  };

  const handleSave = (sectionKey: string) => {
    const section = editedSections[sectionKey];
    if (!section) return;
    
    upsertMutation.mutate({
      page_name: pageName,
      section_key: sectionKey,
      title: section.title,
      subtitle: section.subtitle,
      content: section.content,
      image_url: section.image_url,
      is_active: section.is_active ?? true,
      section_order: section.section_order ?? sectionConfigs.findIndex(c => c.key === sectionKey),
    });
  };

  const handleDelete = (sectionId: string) => {
    deleteMutation.mutate(sectionId);
  };

  if (isLoading) {
    return <div className="p-4 text-center text-muted-foreground">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{pageTitle} Content</h2>
      </div>

      {sectionConfigs.map((config) => {
        const section = editedSections[config.key] || {};
        const existingSection = sections?.find((s) => s.section_key === config.key);

        return (
          <Card key={config.key}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{config.label}</CardTitle>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={section.is_active ?? true}
                      onCheckedChange={(checked) => handleFieldChange(config.key, "is_active", checked)}
                    />
                    <Label className="text-sm text-muted-foreground">Active</Label>
                  </div>
                  {existingSection && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Section?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove the {config.label} section content. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(existingSection.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {config.fields.includes("title") && (
                <div className="space-y-2">
                  <Label htmlFor={`${config.key}-title`}>Title</Label>
                  <Input
                    id={`${config.key}-title`}
                    value={section.title || ""}
                    onChange={(e) => handleFieldChange(config.key, "title", e.target.value)}
                    placeholder="Section title"
                  />
                </div>
              )}
              {config.fields.includes("subtitle") && (
                <div className="space-y-2">
                  <Label htmlFor={`${config.key}-subtitle`}>Subtitle</Label>
                  <Input
                    id={`${config.key}-subtitle`}
                    value={section.subtitle || ""}
                    onChange={(e) => handleFieldChange(config.key, "subtitle", e.target.value)}
                    placeholder="Section subtitle"
                  />
                </div>
              )}
              {config.fields.includes("content") && (
                <div className="space-y-2">
                  <Label htmlFor={`${config.key}-content`}>Content</Label>
                  <Textarea
                    id={`${config.key}-content`}
                    value={section.content || ""}
                    onChange={(e) => handleFieldChange(config.key, "content", e.target.value)}
                    placeholder="Section content"
                    rows={4}
                  />
                </div>
              )}
              {config.fields.includes("image_url") && (
                <div className="space-y-2">
                  <Label htmlFor={`${config.key}-image`}>Image URL</Label>
                  <Input
                    id={`${config.key}-image`}
                    value={section.image_url || ""}
                    onChange={(e) => handleFieldChange(config.key, "image_url", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  {section.image_url && (
                    <img
                      src={section.image_url}
                      alt="Preview"
                      className="mt-2 max-h-32 rounded-md border object-cover"
                    />
                  )}
                </div>
              )}
              <Button
                onClick={() => handleSave(config.key)}
                disabled={upsertMutation.isPending}
                className="w-full sm:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Section
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ContentEditor;

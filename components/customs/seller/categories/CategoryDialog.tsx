"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove all non-word chars except hyphen and space
    .replace(/[\s_-]+/g, "-") // Replace spaces and repeated hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

type SubCategoryType = {
  name: string;
  slug: string;
  path: string;
};

type CategoryType = {
  id?: string;
  name: string;
  icon?: string;
  slug?: string;
  path?: string;
  metadata?: {
    children: SubCategoryType[];
  };
};

type CategoryDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentCategory?: CategoryType | null;
  onSave: (category: CategoryType) => void;
};

export const CategoryDialog = ({
  isOpen,
  onOpenChange,
  currentCategory,
  onSave,
}: CategoryDialogProps) => {
  const isEditing = !!currentCategory;
  const dialogTitle = isEditing ? "Edit Category" : "Add New Category";
  const dialogDescription = isEditing
    ? `Editing: ${currentCategory.name}`
    : "Enter the details for the new category.";

  const [form, setForm] = useState({
    name: currentCategory?.name || "",
    slug: currentCategory?.slug || "",
    path: currentCategory?.path || "",
    metadata: {
      children: currentCategory?.metadata?.children || [],
    },
  });

  useEffect(() => {
    // Sync form state when a different category is selected for editing
    if (isOpen) {
      setForm({
        name: currentCategory?.name || "",
        slug: currentCategory?.slug || "",
        path: currentCategory?.path || "",
        metadata: {
          children: currentCategory?.metadata?.children || [],
        },
      });
    }
  }, [currentCategory, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChildChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newChildren = [...form.metadata.children];
    const childToUpdate = { ...newChildren[index] };
    childToUpdate.name = e.target.value;
    childToUpdate.slug = slugify(e.target.value);
    childToUpdate.path = `/search?s=${childToUpdate.slug}`;
    newChildren[index] = childToUpdate;
    setForm({ ...form, metadata: { children: newChildren } });
  };

  const addChild = () => {
    setForm({
      ...form,
      metadata: {
        children: [...form.metadata.children, { name: "", slug: "", path: "" }],
      },
    });
  };

  const removeChild = (index: number) => {
    const newChildren = form.metadata.children.filter((_, i) => i !== index);
    setForm({ ...form, metadata: { children: newChildren } });
  };

  const handleSave = () => {
    if (!form.name) {
      console.error("Name is required.");
      return;
    }

    // Auto-generate slug and path
    const newSlug = slugify(form.name);
    const newPath = `/search?s=${newSlug}`;

    const newCategory = {
      ...form,
      slug: newSlug,
      path: newPath,
      metadata: {
        children: form.metadata.children.filter((c) => c.name.trim() !== ""),
      },
    };

    onSave(
      isEditing ? { ...currentCategory, ...newCategory } : { ...newCategory }
    );
    onOpenChange(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <form className="space-y-4">
        <DialogContent>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
          <DialogHeader>
            <Input
              name="name"
              aria-label="Category Name"
              placeholder="e.g., Laptops & Notebooks"
              value={form.name}
              onChange={handleChange}
            />
            <Input
              aria-label="Slug (Auto-generated)"
              value={slugify(form.name)}
              disabled
              className="bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </DialogHeader>
          <div>
            <h3 className="text-lg font-medium mb-2">Sub-categories</h3>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <div className="space-y-4">
                {form.metadata.children.map((child, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Sub-category name"
                      value={child.name}
                      onChange={(e) => handleChildChange(index, e)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeChild(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addChild}
              className="mt-2"
            >
              Add Sub-category
            </Button>
          </div>
          <DialogFooter>
            <div className="flex justify-end pt-4 space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button onClick={handleSave} disabled={!form.name}>
                <Save className="mr-2 h-4 w-4" />{" "}
                {isEditing ? "Save Changes" : "Create Category"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCallback, useState } from "react";
import { CategoryListView } from "./CategoryListView";
import { Plus } from "lucide-react";
import { CategoryDialog } from "./CategoryDialog";
import { toast } from "sonner";

const Categories = ({ initialCategories }: { initialCategories: any }) => {
  /** @type {[Category[], React.Dispatch<React.SetStateAction<Category[]>>]} */
  const [categories, setCategories] = useState(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  /** @type {[Category | null, React.Dispatch<React.SetStateAction<Category | null>>]} */
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  /** @type {[SortConfig, React.Dispatch<React.SetStateAction<SortConfig>>]} */
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  // --- CRUD Handlers ---
  const handleSaveCategory = useCallback(async (categoryData: any) => {
    if (categoryData?.id) {
      console.log(categoryData);
      // Update existing
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/categories/${categoryData.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update category");
        }

        const updatedCategory = await response.json();
        setCategories((prev: any) =>
          prev.map((c: any) =>
            c.id === updatedCategory.id ? updatedCategory : c
          )
        );
        toast.success("Category updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error updating category.");
      }
    } else {
      // Add new
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/categories`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData),
          }
        );
        if (!response.ok) throw new Error("Failed to create category");
        const createdCategory = await response.json();
        setCategories((prev: any) => [...prev, createdCategory]);
        toast.success("Category created successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error creating category.");
      }
    }
    setEditingCategory(null);
  }, []);

  const handleEdit = useCallback((category: any) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    setCategories((prev: any) => prev.filter((c: any) => c.id !== id));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/categories/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        toast.error("Failed to delete category.");
      } else {
        toast.success("Your category has been deleted.");
      }
    } catch (error) {
      toast.error("Failed to delete category.");
      console.error(error);
    }
  }, []);

  const handleAdd = useCallback(() => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  }, []);

  const requestSort = useCallback(
    (key: any) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    },
    [sortConfig.key, sortConfig.direction]
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 font-[Inter] antialiased">
      <div className="max-w-4xl mx-auto space-y-2">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
              <div>
                <CardTitle>Manage Categories</CardTitle>
              </div>
              <Button
                onClick={handleAdd}
                className="mt-4 sm:mt-0 w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </div>
          </CardHeader>

          {/* Component 2: Category List View */}
          <CategoryListView
            categories={categories}
            searchTerm={searchTerm}
            sortConfig={sortConfig}
            requestSort={requestSort}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            onSearchChange={setSearchTerm}
          />

          <CardFooter className="justify-end">
            <p className="text-xs text-gray-600 dark:text-gray-200">
              Total Categories: {categories.length}
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Component 1: Category Add/Edit Dialog */}
      <CategoryDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        currentCategory={editingCategory}
        onSave={handleSaveCategory}
      />
    </div>
  );
};
export default Categories;

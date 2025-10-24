"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp, Edit, Search, Trash2 } from "lucide-react";
import { useMemo } from "react";
import ConfirmDelete from "./ConfirmDelete";

export const CategoryListView = ({
  categories,
  searchTerm,
  sortConfig,
  requestSort,
  handleEdit,
  handleDelete,
  onSearchChange,
}: {
  categories: any;
  searchTerm: any;
  sortConfig: any;
  requestSort: any;
  handleEdit: any;
  handleDelete: any;
  onSearchChange: any;
}) => {
  /**
   * SortIcon component displays the direction indicator.
   */
  const SortIcon = (columnKey: any) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    );
  };

  // Memoize the filtered and sorted list to prevent unnecessary re-calculations
  const sortedCategories = useMemo(() => {
    let sortableItems = [...categories];

    // 1. Filter
    if (searchTerm) {
      sortableItems = sortableItems.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Sort
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [categories, searchTerm, sortConfig]);

  return (
    <CardContent className="space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-200" />
          <Input
            placeholder="Search categories..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Category Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">No</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="h-auto p-0 inline-flex items-center"
                onClick={() => requestSort("name")}
              >
                Name <SortIcon columnKey="name" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="h-auto p-0 inline-flex items-center"
                onClick={() => requestSort("slug")}
              >
                Slug <SortIcon columnKey="slug" />
              </Button>
            </TableHead>
            <TableHead className="text-center w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCategories.length > 0 ? (
            sortedCategories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell className="text-xs text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium text-gray-800 dark:text-gray-100">
                  {category.name}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-200 font-mono text-xs">
                  {category.slug}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(category)}
                      title="Edit"
                      className=" hover:cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <ConfirmDelete handleDelete={handleDelete} category={category}/>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                {searchTerm
                  ? "No results found for your search."
                  : "No categories yet. Click 'Add Category' to start."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  );
};

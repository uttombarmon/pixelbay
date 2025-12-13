"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, FileJson, CheckCircle, XCircle } from "lucide-react";

export default function AddProductFromJSON() {
  const { data: session } = useSession();
  const [jsonInput, setJsonInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const loadSampleJSON = async () => {
    try {
      const response = await fetch("/sample-product.json");
      const data = await response.json();
      setJsonInput(JSON.stringify(data, null, 2));
      setValidationError("");
      toast.success("Sample JSON loaded!");
    } catch (error) {
      toast.error("Failed to load sample JSON");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setJsonInput(content);
      validateJSON(content);
    };
    reader.readAsText(file);
  };

  const validateJSON = (input: string): boolean => {
    try {
      const parsed = JSON.parse(input);

      // Check required fields
      const required = ["title", "slug", "brand", "gadgetType", "variants"];
      const missing = required.filter((field) => !parsed[field]);

      if (missing.length > 0) {
        setValidationError(`Missing required fields: ${missing.join(", ")}`);
        return false;
      }

      if (!Array.isArray(parsed.variants) || parsed.variants.length === 0) {
        setValidationError("At least one variant is required");
        return false;
      }

      setValidationError("");
      return true;
    } catch (error) {
      setValidationError("Invalid JSON format");
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      toast.error("You must be logged in");
      return;
    }

    if (!validateJSON(jsonInput)) {
      toast.error("Please fix JSON errors first");
      return;
    }

    setLoading(true);
    try {
      const productData = JSON.parse(jsonInput);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/products?userId=${session.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Product created successfully!");
        setJsonInput("");
        setValidationError("");
      } else {
        toast.error(result.error || "Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Add Product from JSON</h1>
        <p className="text-muted-foreground">
          Upload or paste JSON data to quickly add products to your inventory
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: JSON Editor */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={loadSampleJSON}
              variant="outline"
              className="flex-1"
            >
              <FileJson className="w-4 h-4 mr-2" />
              Load Sample
            </Button>
            <label className="flex-1">
              <Button variant="outline" className="w-full" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="relative">
            <Textarea
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value);
                validateJSON(e.target.value);
              }}
              placeholder="Paste your JSON here or load sample..."
              className="min-h-[500px] font-mono text-sm"
            />
            {validationError && (
              <div className="absolute top-2 right-2 flex items-center gap-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 px-3 py-1 rounded-md text-sm">
                <XCircle className="w-4 h-4" />
                {validationError}
              </div>
            )}
            {jsonInput && !validationError && (
              <div className="absolute top-2 right-2 flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-3 py-1 rounded-md text-sm">
                <CheckCircle className="w-4 h-4" />
                Valid JSON
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading || !jsonInput || !!validationError}
            className="w-full"
            size="lg"
          >
            {loading ? "Creating Product..." : "Create Product"}
          </Button>
        </div>

        {/* Right: Instructions */}
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="font-semibold min-w-[24px]">1.</span>
                <span>
                  Click <strong>Load Sample</strong> to see the JSON format, or{" "}
                  <strong>Upload File</strong> to import from a .json file
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[24px]">2.</span>
                <span>Edit the JSON data with your product information</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[24px]">3.</span>
                <span>
                  Validation happens automatically - fix any errors shown
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[24px]">4.</span>
                <span>
                  Click <strong>Create Product</strong> when ready
                </span>
              </li>
            </ol>
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold mb-3">Required Fields</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• title</li>
              <li>• slug</li>
              <li>• brand</li>
              <li>• gadgetType</li>
              <li>• variants (at least one)</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold mb-3">Resources</h3>
            <div className="space-y-2 text-sm">
              <a
                href="/sample-product.json"
                target="_blank"
                className="block text-blue-600 hover:underline"
              >
                → View Sample JSON
              </a>
              <a
                href="/API-GUIDE.md"
                target="_blank"
                className="block text-blue-600 hover:underline"
              >
                → API Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

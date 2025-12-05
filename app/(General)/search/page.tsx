import SearchPageComponent from "@/pages/searchPage/SearchPageComponent";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageComponent />
    </Suspense>
  );
}

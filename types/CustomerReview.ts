export interface CustomerReview {
  id: number;
  name: string;
  avatar: string;
  rating: number; // 1–5
  title: string;
  comment: string;
  date: string; // ISO format
  productSlug: string; // links review to a product
}

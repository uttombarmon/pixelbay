export interface productsData {
  id: string | number;
  title: string;
  slug: string;
  discount?: number;
  price: number;
  orginal_price?: number;
  variantId?: number;
  currency: string;
  productImage: string;
  category: string;
  date?: string;
}

export interface productsData {
  id: string | number;
  title: string;
  slug: string;
  discount?: number;
  price: number;
  orginal_price?: number;
  currency: string;
  image: string;
  category: string;
  date?: string;
}

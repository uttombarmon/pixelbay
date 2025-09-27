export type Category = {
  id: number;
  name: string;
  slug: string;
  path: string;
  metadata: {
    children: Category[];
  };
  created_at: string;
  updated_at: string;
};

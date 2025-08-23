export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string
};

export type CategoryDetail = {
  name: string;
  image: string;
  totalProducts: number;
  totalPages: number;
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  price: string;
  images: {
    url: string;
    altText?: string | null;
  }[];
  tags?: string[];
  description?: string;
};

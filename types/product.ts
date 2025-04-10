export type Product = {
  id: string;
  title: string;
  handle: string;
  price: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
};

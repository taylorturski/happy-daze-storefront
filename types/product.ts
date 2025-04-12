export type Product = {
  id: string;
  title: string;
  handle: string;
  price: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
  tags?: string[];
};

export type CartItem = {
  id: string;
  title: string;
  price: string;
  image: string;
};

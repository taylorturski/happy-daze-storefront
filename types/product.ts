export type ProductVariant = {
  id: string;
  title: string;
  price: string;
  selectedOptions: {
    name: string;
    value: string;
  }[];
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  price: string; // base product price
  currency?: string;
  images: {
    url: string;
    altText?: string | null;
  }[];
  tags?: string[];
  description?: string;

  // Custom builder options
  quantity?: number;
  material?: string;
  headshape?: string;
  finish?: string;
  face?: string;
  neck?: string;
  alignment?: string;

  // Full variant list with pricing + options
  variants?: ProductVariant[];
};

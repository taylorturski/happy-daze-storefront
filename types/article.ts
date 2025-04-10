export type Article = {
  id: string;
  title: string;
  handle: string;
  excerpt?: string;
  publishedAt: string;
  image?: {
    url: string;
    altText: string | null;
  } | null;
};

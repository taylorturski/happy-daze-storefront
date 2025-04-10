export type BlogArticle = {
  id: string;
  title: string;
  handle: string;
  excerpt: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
};

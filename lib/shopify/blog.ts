import {shopifyFetch} from "./client";

export async function getBlogArticles() {
  const query = `
    query {
      blog(handle: "journal") {
        articles(first: 10) {
          edges {
            node {
              id
              title
              handle
              excerpt
              publishedAt
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query);
  return data.blog.articles.edges.map((edge: any) => edge.node);
}

export async function getBlogArticleByHandle(handle: string) {
  const query = `
    query GetArticle($handle: String!) {
      blog(handle: "journal") {
        articleByHandle(handle: $handle) {
          title
          contentHtml
          image {
            url
            altText
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query, {handle});
  return data.blog.articleByHandle;
}

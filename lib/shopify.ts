const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = process.env.SHOPIFY_API_VERSION!;

export async function shopifyFetch(query: string, variables = {}) {
  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": accessToken,
      },
      body: JSON.stringify({query, variables}),
    });

    const json = await res.json();

    if (json.errors) {
      console.error("Shopify API Error:", JSON.stringify(json.errors));
      throw new Error("Shopify API error");
    }

    return json.data;
  } catch (err) {
    console.error("shopifyFetch error:", err);
    throw err;
  }
}

// ** This function is used to get all products from the Shopify store
export async function getAllProducts() {
  const query = `
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

  const data = await shopifyFetch(query);

  return data.products.edges.map(({node}: any) => ({
    id: node.variants.edges[0]?.node.id, // variant ID (for checkout)
    title: node.title,
    handle: node.handle,
    image: node.images.edges[0]?.node || null,
    price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
  }));
}

// ** This function is used to get a single product by handle

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

// ** This function is used to get a single Blog article by handle
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

  const variables = {handle};

  const data = await shopifyFetch(query, variables);
  return data.blog.articleByHandle;
}

// ** This function is used to get the page by handle
export async function getPageByHandle(handle: string) {
  const query = `
    query GetPage($handle: String!) {
      page(handle: $handle) {
        title
        body
      }
    }
  `;

  const variables = {handle};
  const data = await shopifyFetch(query, variables);
  return data.page;
}

// ** This function is used to get products by tag
export async function getProductsByTag(tag: string) {
  const query = `
    query ProductsByTag($query: String!) {
      products(first: 20, query: $query) {
        edges {
          node {
            id
            title
            handle
            tags
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    query: `tag:${tag}`,
  };

  const data = await shopifyFetch(query, variables);

  return data.products.edges.map(({node}: any) => ({
    id: node.variants.edges[0]?.node.id,
    title: node.title,
    handle: node.handle,
    image: node.images.edges[0]?.node || null,
    price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
    tags: node.tags,
  }));
}

// export async function getAllProducts() {
//   const query = `
//   query Products {
//     products(first: 10) {
//       edges {
//         node {
//           id
//           title
//           handle
//           tags
//           variants(first: 1) {
//             edges {
//               node {
//                 id
//               }
//             }
//           }
//           images(first: 1) {
//             edges {
//               node {
//                 url
//                 altText
//               }
//             }
//           }
//           priceRange {
//             minVariantPrice {
//               amount
//               currencyCode
//             }
//           }
//         }
//       }
//     }
//   }
//   `;

//   const data = await shopifyFetch(query);

//   return data.products.edges.map(({node}: any) => ({
//     id: node.variants.edges[0]?.node.id,
//     title: node.title,
//     handle: node.handle,
//     image: node.images.edges[0]?.node || null,
//     price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
//     tags: node.tags,
//   }));
// }

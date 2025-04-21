import {shopifyFetch} from "./client";

export async function getAllProducts() {
  const query = `
    query Products {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query);

  return data.products.edges.map(
    ({
      node,
    }: {
      node: {
        id: string;
        title: string;
        handle: string;
        images: {edges: {node: {url: string; altText: string | null}}[]};
        priceRange: {minVariantPrice: {amount: string; currencyCode: string}};
      };
    }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      images:
        node.images.edges.map(
          (edge: {node: {url: string; altText: string | null}}) => edge.node
        ) || [],
      price: node.priceRange.minVariantPrice.amount, // ← clean float string
      currency: node.priceRange.minVariantPrice.currencyCode,
    })
  );
}

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
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            images(first: 10) {
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

  const data = await shopifyFetch(query, {
    query: `tag:${tag}`,
  });

  return data.products.edges.map(
    ({
      node,
    }: {
      node: {
        id: string;
        title: string;
        handle: string;
        tags: string[];
        images: {edges: {node: {url: string; altText: string | null}}[]};
        priceRange: {minVariantPrice: {amount: string; currencyCode: string}};
        variants: {
          edges: {
            node: {
              id: string;
              title: string;
              price: {amount: string; currencyCode: string};
              selectedOptions: {name: string; value: string}[];
            };
          }[];
        };
      };
    }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      tags: node.tags,
      images:
        node.images.edges.map(
          (edge: {node: {url: string; altText: string | null}}) => edge.node
        ) || [],
      price: node.priceRange.minVariantPrice.amount,
      currency: node.priceRange.minVariantPrice.currencyCode,
      variants: node.variants.edges.map(
        ({
          node: variant,
        }: {
          node: {
            id: string;
            title: string;
            price: {amount: string; currencyCode: string};
            selectedOptions: {name: string; value: string}[];
          };
        }) => ({
          id: variant.id,
          title: variant.title,
          price: `${variant.price.amount} ${variant.price.currencyCode}`,
          selectedOptions: variant.selectedOptions,
        })
      ),
    })
  );
}

export async function getProductByHandle(handle: string) {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        tags
        description
        images(first: 10) {
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
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query, {handle});
  const product = data?.productByHandle;

  if (!product) return null;

  return {
    id: product.variants?.edges?.[0]?.node?.id ?? "",
    title: product.title,
    handle: product.handle,
    images:
      product.images?.edges?.map(
        (edge: {node: {url: string; altText: string | null}}) => edge.node
      ) || [],
    price: product.priceRange?.minVariantPrice?.amount ?? "0.00",
    currency: product.priceRange?.minVariantPrice?.currencyCode ?? "USD",
    tags: product.tags || [],
    description: product.description || "",
  };
}

import {shopifyFetch} from "./client";
import type {Product} from "@/types/product";

type ShopifyResponse = {
  products: {
    edges: {
      node: {
        id: string;
        title: string;
        handle: string;
        priceRange: {
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
        images: {
          edges: {
            node: {
              url: string;
              altText: string | null;
            };
          }[];
        };
        variants: {
          edges: {
            node: {
              id: string;
              title: string;
              price: string;
              selectedOptions: {
                name: string;
                value: string;
              }[];
            };
          }[];
        };
        tags: string[];
        descriptionHtml: string;
      };
    }[];
  };
};

export async function getAllProducts(): Promise<Product[]> {
  const query = `
    query Products {
      products(first: 50, query: "published_status:published") {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
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
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const res: ShopifyResponse = await shopifyFetch(query);
  const edges = res.products.edges;

  return edges.map(({node}) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.descriptionHtml,
    price: node.priceRange.minVariantPrice.amount,
    currency: node.priceRange.minVariantPrice.currencyCode,
    images: node.images.edges.map((edge) => edge.node),
    tags: node.tags,
    variants: node.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      price: edge.node.price,
      selectedOptions: edge.node.selectedOptions,
    })),
  }));
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

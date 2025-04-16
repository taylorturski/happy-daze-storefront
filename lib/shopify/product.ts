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
    id: node.variants.edges[0]?.node.id,
    title: node.title,
    handle: node.handle,
    images: node.images.edges.map((edge: any) => edge.node) || [],
    price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
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

  return data.products.edges.map(({node}: any) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    tags: node.tags,
    images: node.images.edges.map((edge: any) => edge.node) || [],
    variants: node.variants.edges.map(({node: variant}: any) => ({
      id: variant.id,
      title: variant.title,
      price: `${variant.price.amount} ${variant.price.currencyCode}`,
      selectedOptions: variant.selectedOptions,
    })),
  }));
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
  const product = data.productByHandle;

  return {
    id: product.variants.edges[0]?.node.id,
    title: product.title,
    handle: product.handle,
    images: product.images.edges.map((edge: any) => edge.node) || [],
    price: `${product.variants.edges[0]?.node.price.amount} ${product.variants.edges[0]?.node.price.currencyCode}`,
    tags: product.tags,
    description: product.description,
  };
}

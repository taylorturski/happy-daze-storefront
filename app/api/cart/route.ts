export const runtime = "edge";

import {NextResponse} from "next/server";
import {shopifyFetch} from "@/lib/shopify/client";

const noCacheHeaders = {
  "Cache-Control": "no-store, max-age=0",
};

// GET: fetch cart by ID
export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const cartId = searchParams.get("cartId");

  if (!cartId) {
    return NextResponse.json(
      {error: "Missing cart ID"},
      {status: 400, headers: noCacheHeaders}
    );
  }

  const query = `
    query CartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                  }
                  product {
                    title
                    images(first: 1) {
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
              attributes {
                key
                value
              }
            }
          }
        }
      }
    }
  `;

  const variables = {cartId};

  try {
    const res = await shopifyFetch(query, variables);
    const cart = res.cart;

    if (!cart) {
      return NextResponse.json(
        {error: "Cart not found"},
        {status: 404, headers: noCacheHeaders}
      );
    }

    const cartItems = cart.lines.edges.map(
      (edge: {
        node: {
          id: string;
          quantity: number;
          merchandise: {
            id: string;
            product: {title: string; images: {edges: {node: {url: string}}[]}};
            price: {amount: string};
          };
          attributes: {key: string; value: string}[];
        };
      }) => {
        const node = edge.node;
        const merchandise = node.merchandise;

        return {
          lineId: node.id,
          id: merchandise.id,
          title: merchandise.product.title,
          price: parseFloat(merchandise.price.amount),
          image: merchandise.product.images.edges[0]?.node.url || "",
          quantity: node.quantity,
          properties: node.attributes.reduce(
            (
              acc: Record<string, string>,
              attr: {key: string; value: string}
            ) => ({...acc, [attr.key]: attr.value}),
            {}
          ),
        };
      }
    );

    const total = cartItems.reduce(
      (sum: number, item: {price: number; quantity: number}) =>
        sum + item.price * item.quantity,
      0
    );

    return NextResponse.json(
      {cart: cartItems, total},
      {status: 200, headers: noCacheHeaders}
    );
  } catch {
    return NextResponse.json(
      {error: "Failed to fetch cart"},
      {status: 500, headers: noCacheHeaders}
    );
  }
}

// DELETE: remove a line item or clear entire cart
export async function DELETE(req: Request) {
  const {cartId, lineId} = await req.json();

  if (!cartId || !lineId) {
    return NextResponse.json(
      {error: "Missing cartId or lineId"},
      {status: 400, headers: noCacheHeaders}
    );
  }

  // Fetch all line IDs if we want to clear the whole cart
  let lineIdsToRemove = [lineId];

  if (lineId === "ALL") {
    const fetchQuery = `
      query GetCartLineIds($cartId: ID!) {
        cart(id: $cartId) {
          lines(first: 50) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `;

    try {
      const res = await shopifyFetch(fetchQuery, {cartId});
      const edges = res.cart?.lines?.edges || [];
      lineIdsToRemove = edges.map((edge: {node: {id: string}}) => edge.node.id);
    } catch {
      return NextResponse.json(
        {error: "Failed to fetch cart lines"},
        {status: 500, headers: noCacheHeaders}
      );
    }
  }

  const mutation = `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                    }
                    product {
                      title
                      images(first: 1) {
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
                attributes {
                  key
                  value
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lineIds: lineIdsToRemove,
  };

  try {
    const res = await shopifyFetch(mutation, variables);
    const cart = res.cartLinesRemove?.cart;
    const error = res.cartLinesRemove?.userErrors?.[0];

    if (!cart) {
      return NextResponse.json(
        {error: error?.message || "Failed to remove item(s)"},
        {status: 500, headers: noCacheHeaders}
      );
    }

    const cartItems = cart.lines.edges.map(
      (edge: {
        node: {
          id: string;
          quantity: number;
          merchandise: {
            id: string;
            product: {title: string; images: {edges: {node: {url: string}}[]}};
            price: {amount: string};
          };
          attributes: {key: string; value: string}[];
        };
      }) => {
        const node = edge.node;
        const merchandise = node.merchandise;

        return {
          lineId: node.id,
          id: merchandise.id,
          title: merchandise.product.title,
          price: parseFloat(merchandise.price.amount),
          image: merchandise.product.images.edges[0]?.node.url || "",
          quantity: node.quantity,
          properties: node.attributes.reduce(
            (
              acc: Record<string, string>,
              attr: {key: string; value: string}
            ) => ({...acc, [attr.key]: attr.value}),
            {}
          ),
        };
      }
    );

    const total = cartItems.reduce(
      (sum: number, item: {price: number; quantity: number}) =>
        sum + item.price * item.quantity,
      0
    );

    return NextResponse.json(
      {cart: cartItems, total},
      {status: 200, headers: noCacheHeaders}
    );
  } catch {
    return NextResponse.json(
      {error: "Failed to remove items"},
      {status: 500, headers: noCacheHeaders}
    );
  }
}

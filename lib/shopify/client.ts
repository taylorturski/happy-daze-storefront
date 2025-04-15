// lib/shopify/client.ts
export const domain = process.env.SHOPIFY_STORE_DOMAIN!;
export const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
export const apiVersion = process.env.SHOPIFY_API_VERSION!;

export async function shopifyFetch(query: string, variables = {}) {
  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

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
}

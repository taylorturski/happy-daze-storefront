import {shopifyFetch} from "./client";

export async function getPageByHandle(handle: string) {
  const query = `
    query GetPage($handle: String!) {
      page(handle: $handle) {
        title
        body
      }
    }
  `;

  const data = await shopifyFetch(query, {handle});
  return data.page;
}

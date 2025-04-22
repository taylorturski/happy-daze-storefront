export const runtime = "edge";

import {NextResponse} from "next/server";
import {shopifyFetch} from "@/lib/shopify/client";
import {getProductsByTag} from "@/lib/shopify/product";
import {Product, ProductVariant} from "@/types/product";

const noCacheHeaders = {
  "Cache-Control": "no-store, max-age=0",
};

export async function POST(req: Request) {
  const data = await req.json();

  // === 1. Sidebar Checkout: array of cart items ===
  if (Array.isArray(data)) {
    const lines = data.map((item) => ({
      merchandiseId: item.id,
      quantity: item.quantity ?? 1,
      attributes: item.properties
        ? Object.entries(item.properties).map(([key, value]) => ({
            key: key.charAt(0).toUpperCase() + key.slice(1),
            value: value || "N/A",
          }))
        : [],
    }));

    const query = `
      mutation CartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {input: {lines}};

    try {
      const response = await shopifyFetch(query, variables);
      const cart = response.cartCreate?.cart;
      const error = response.cartCreate?.userErrors?.[0];

      if (!cart?.checkoutUrl) {
        return NextResponse.json(
          {error: error?.message || "Checkout creation failed"},
          {status: 500, headers: noCacheHeaders}
        );
      }

      return NextResponse.json(
        {url: cart.checkoutUrl},
        {status: 200, headers: noCacheHeaders}
      );
    } catch (err) {
      console.error("[SIDEBAR CHECKOUT ERROR]", err);
      return NextResponse.json(
        {error: "Server error"},
        {status: 500, headers: noCacheHeaders}
      );
    }
  }

  // === 2. Builder Checkout: single putter with selections ===
  const selections = data;
  const blankProducts: Product[] = await getProductsByTag("blanks");
  const headshape = selections.headshape?.toLowerCase();

  if (!headshape) {
    return NextResponse.json(
      {error: "Missing headshape"},
      {status: 400, headers: noCacheHeaders}
    );
  }

  const matchedProduct = blankProducts.find((product) =>
    product.title.toLowerCase().includes(headshape)
  );

  if (!matchedProduct) {
    return NextResponse.json(
      {error: "Product not found"},
      {status: 404, headers: noCacheHeaders}
    );
  }

  const variant: ProductVariant | undefined = matchedProduct.variants?.find(
    (v) => {
      const mat = v.selectedOptions.find(
        (opt) =>
          opt.name.toLowerCase() === "material" &&
          opt.value
            .toLowerCase()
            .includes((selections.material || "").toLowerCase())
      );
      const finishVal = (selections.finish || "").toLowerCase();
      const matchValue = finishVal.includes("satin") ? "satin" : "torched";
      const fin = v.selectedOptions.find(
        (opt) =>
          opt.name.toLowerCase() === "finish" &&
          opt.value.toLowerCase().includes(matchValue)
      );
      return Boolean(mat && fin);
    }
  );

  if (!variant) {
    return NextResponse.json(
      {error: "No matching variant found"},
      {status: 404, headers: noCacheHeaders}
    );
  }

  const lineItem = {
    merchandiseId: variant.id,
    quantity: 1,
    attributes: Object.entries(selections).map(([key, value]) => ({
      key: key.charAt(0).toUpperCase() + key.slice(1),
      value: value || "N/A",
    })),
  };

  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {input: {lines: [lineItem]}};

  try {
    const response = await shopifyFetch(query, variables);
    const cart = response.cartCreate?.cart;
    const error = response.cartCreate?.userErrors?.[0];

    if (!cart?.checkoutUrl) {
      return NextResponse.json(
        {error: error?.message || "Checkout creation failed"},
        {status: 500, headers: noCacheHeaders}
      );
    }

    return NextResponse.json(
      {
        url: cart.checkoutUrl,
        variantId: variant.id,
        title: matchedProduct.title,
        price: variant.price?.split(" ")[0] ?? matchedProduct.price,
        image: matchedProduct.images?.[0]?.url || "",
      },
      {status: 200, headers: noCacheHeaders}
    );
  } catch (err) {
    console.error("[BUILDER CHECKOUT ERROR]", err);
    return NextResponse.json(
      {error: "Server error"},
      {status: 500, headers: noCacheHeaders}
    );
  }
}

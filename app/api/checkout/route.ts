export const runtime = "nodejs";

import {NextResponse} from "next/server";
import {shopifyFetch} from "@/lib/shopify/client";
import {getProductsByTag} from "@/lib/shopify/product";
import {Product, ProductVariant} from "@/types/product";
import _ from "lodash";

const noCacheHeaders = {
  "Cache-Control": "no-store, max-age=0",
};

const cartCreateMutation = `
mutation CartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart { id checkoutUrl }
    userErrors { field message }
  }
}
`;

const cartLinesAddMutation = `
mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart { id checkoutUrl }
    userErrors { field message }
  }
}
`;

const cartFetchQuery = `
query CartQuery($cartId: ID!) {
  cart(id: $cartId) {
    id
    checkoutUrl
  }
}
`;

async function fetchCart(cartId: string) {
  const res = await shopifyFetch(cartFetchQuery, {cartId});
  return res.cart;
}

function addDiscountToUrl(url: string, code: string) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}discount=${code}`;
}

export async function POST(req: Request) {
  const data = await req.json();
  const cartId = req.headers.get("x-cart-id");

  // === 1. Sidebar Cart flow ===
  if (Array.isArray(data)) {
    interface CartItem {
      id: string;
      quantity?: number;
      properties?: Record<string, string>;
    }

    const grouped = _.groupBy(
      data as CartItem[],
      (item) => item.id + JSON.stringify(item.properties || {})
    );

    const lines = Object.values(grouped).map((items) => {
      const {id, properties} = items[0];
      const totalQty = items.reduce((sum, i) => sum + (i.quantity ?? 1), 0);

      return {
        merchandiseId: id,
        quantity: totalQty,
        attributes: properties
          ? Object.entries(properties).map(([key, value]) => ({
              key: key.charAt(0).toUpperCase() + key.slice(1),
              value: value || "N/A",
            }))
          : [],
      };
    });

    try {
      let finalCartId = cartId ?? null;

      if (finalCartId) {
        await shopifyFetch(cartLinesAddMutation, {cartId: finalCartId, lines});
      } else {
        const res = await shopifyFetch(cartCreateMutation, {
          input: {lines, discountCodes: ["HAPPY10"]},
        });
        const cart = res.cartCreate?.cart;
        const error = res.cartCreate?.userErrors?.[0];

        if (!cart?.checkoutUrl) {
          return NextResponse.json(
            {error: error?.message || "Checkout failed"},
            {status: 500, headers: noCacheHeaders}
          );
        }
        finalCartId = cart.id;
      }

      if (!finalCartId) {
        throw new Error("Cart ID is null");
      }

      const cart = await fetchCart(finalCartId);

      if (!cart?.checkoutUrl) {
        return NextResponse.json(
          {error: "Failed to fetch checkout URL"},
          {status: 500, headers: noCacheHeaders}
        );
      }

      const checkoutUrlWithDiscount = addDiscountToUrl(
        cart.checkoutUrl,
        "HAPPY10"
      );

      return NextResponse.json(
        {cartId: cart.id, url: checkoutUrlWithDiscount},
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

  // === 2. Builder Form flow ===
  const selections = data;
  const blankProducts: Product[] = await getProductsByTag("blanks");
  const headshape = selections?.headshape?.toLowerCase();

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

  try {
    let finalCartId = cartId ?? null;

    if (finalCartId) {
      await shopifyFetch(cartLinesAddMutation, {
        cartId: finalCartId,
        lines: [lineItem],
      });
    } else {
      const res = await shopifyFetch(cartCreateMutation, {
        input: {lines: [lineItem], discountCodes: ["HAPPY10"]},
      });

      const cart = res.cartCreate?.cart;
      const error = res.cartCreate?.userErrors?.[0];

      if (!cart?.checkoutUrl) {
        return NextResponse.json(
          {error: error?.message || "Checkout failed"},
          {status: 500, headers: noCacheHeaders}
        );
      }
      finalCartId = cart.id;
    }

    if (!finalCartId) {
      throw new Error("Cart ID is null");
    }

    const cart = await fetchCart(finalCartId);

    if (!cart?.checkoutUrl) {
      return NextResponse.json(
        {error: "Failed to fetch checkout URL"},
        {status: 500, headers: noCacheHeaders}
      );
    }

    const checkoutUrlWithDiscount = addDiscountToUrl(
      cart.checkoutUrl,
      "HAPPY10"
    );

    return NextResponse.json(
      {
        cartId: cart.id,
        url: checkoutUrlWithDiscount,
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

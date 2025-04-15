// app/api/checkout/route.ts
import {NextResponse} from "next/server";
import {shopifyFetch} from "@/lib/shopify/client";
import {getProductsByTag} from "@/lib/shopify/product";
import {Product} from "@/types/product";

export async function POST(req: Request) {
  const selections = await req.json();

  const blankProducts: Product[] = await getProductsByTag("blanks");
  console.log(
    "Blank products:",
    blankProducts.map((p) => p.title)
  );
  const headshape = selections.headshape?.toLowerCase();

  const matchedProduct = blankProducts.find((product: Product) =>
    product.title.toLowerCase().includes(headshape || "")
  );
  console.log("Trying to match headshape:", headshape);

  if (!matchedProduct) {
    return NextResponse.json({error: "Product not found"}, {status: 404});
  }

  const isTorched =
    selections.finish &&
    [
      "torched-gold",
      "torched-oil-quench",
      "japanese-brown",
      "black-oxide",
    ].includes(selections.finish.toLowerCase());

  const isCarbon = selections.material === "carbon";
  const basePrice = isCarbon ? 650 : 700;
  const finalPrice = isTorched ? basePrice + 100 : basePrice;

  const lineItem = {
    merchandiseId: matchedProduct.id,
    quantity: 1,
    attributes: [
      {key: "Material", value: selections.material || "N/A"},
      {key: "Finish", value: selections.finish || "N/A"},
      {key: "Face Milling", value: selections.face || "N/A"},
      {key: "Neck", value: selections.neck || "N/A"},
      {key: "Alignment", value: selections.alignment || "N/A"},
      {key: "Headshape", value: selections.headshape || "N/A"},
      {key: "Calculated Price", value: `$${finalPrice}`},
    ],
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

  const variables = {
    input: {
      lines: [lineItem],
    },
  };

  try {
    const res = await shopifyFetch(query, variables);
    const cart = res.cartCreate.cart;

    if (!cart?.checkoutUrl) {
      return NextResponse.json(
        {error: "Checkout creation failed"},
        {status: 500}
      );
    }

    return NextResponse.json({url: cart.checkoutUrl});
  } catch (err) {
    console.error("Checkout API error:", err);
    return NextResponse.json({error: "Server error"}, {status: 500});
  }
}
// This code handles the checkout process for a custom putter order. It matches the selected headshape with a product, calculates the price based on material and finish, and creates a checkout URL using Shopify's GraphQL API.

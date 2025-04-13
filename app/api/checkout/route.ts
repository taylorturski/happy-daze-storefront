// app/api/checkout/route.ts
import {NextResponse} from "next/server";
import {shopifyFetch} from "@/lib/shopify/client";
import {Product} from "@/types/product";

export async function POST(req: Request) {
  const cart: Product[] = await req.json();

  const lines = cart.map((item) => ({
    merchandiseId: item.id, // variant ID
    quantity: 1,
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

  const variables = {
    input: {
      lines,
    },
  };

  try {
    const res = await shopifyFetch(query, variables);
    const cart = res.cartCreate.cart;

    if (!cart?.checkoutUrl) {
      console.error(
        "Shopify returned no checkout URL",
        res.cartCreate.userErrors
      );
      return NextResponse.json({error: "Shopify cart error"}, {status: 500});
    }

    return NextResponse.json({url: cart.checkoutUrl});
  } catch (err) {
    console.error("CartCreate error:", err);
    return NextResponse.json({error: "Checkout failed"}, {status: 500});
  }
}

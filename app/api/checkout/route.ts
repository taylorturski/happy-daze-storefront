import {NextResponse} from "next/server";
import {shopifyFetch} from "@/lib/shopify/client";
import {getProductsByTag} from "@/lib/shopify/product";
import {Product} from "@/types/product";

export async function POST(req: Request) {
  const selections = await req.json();

  const blankProducts: Product[] = await getProductsByTag("blanks");

  const headshape = selections.headshape?.toLowerCase();

  const matchedProduct = blankProducts.find((product: Product) =>
    product.title.toLowerCase().includes(headshape || "")
  );

  if (!matchedProduct) {
    return NextResponse.json({error: "Product not found"}, {status: 404});
  }

  // Match correct variant based on selected material & finish
  const variant = matchedProduct.variants?.find((v) => {
    const materialOption = v.selectedOptions.find(
      (opt: {name: string; value: string}) =>
        opt.name.toLowerCase() === "material" &&
        opt.value.toLowerCase().includes(selections.material.toLowerCase())
    );

    const finishOption = v.selectedOptions.find(
      (opt: {name: string; value: string}) =>
        opt.name.toLowerCase() === "finish" &&
        opt.value
          .toLowerCase()
          .includes(
            selections.finish.toLowerCase().includes("satin")
              ? "satin"
              : "torched"
          )
    );

    return materialOption && finishOption;
  });

  if (!variant) {
    return NextResponse.json(
      {error: "No matching variant found"},
      {status: 404}
    );
  }

  const lineItem = {
    merchandiseId: variant.id,
    quantity: 1,
    attributes: [
      {key: "Material", value: selections.material || "N/A"},
      {key: "Finish", value: selections.finish || "N/A"},
      {key: "Face Milling", value: selections.face || "N/A"},
      {key: "Neck", value: selections.neck || "N/A"},
      {key: "Alignment", value: selections.alignment || "N/A"},
      {key: "Headshape", value: selections.headshape || "N/A"},
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

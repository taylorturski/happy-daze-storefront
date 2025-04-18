import {NextResponse} from "next/server";
import {shopifyFetch} from "@/lib/shopify/client";
import {getProductsByTag} from "@/lib/shopify/product";
import {Product, ProductVariant} from "@/types/product";

export async function POST(req: Request) {
  const selections = await req.json();

  const blankProducts: Product[] = await getProductsByTag("blanks");
  const headshape = selections.headshape?.toLowerCase();
  if (!headshape) {
    return NextResponse.json({error: "Missing headshape"}, {status: 400});
  }

  const matchedProduct = blankProducts.find((product) =>
    product.title.toLowerCase().includes(headshape || "")
  );

  if (!matchedProduct) {
    return NextResponse.json({error: "Product not found"}, {status: 404});
  }

  const variant: ProductVariant | undefined = matchedProduct.variants?.find(
    (v) => {
      const materialOption = v.selectedOptions.find(
        (opt) =>
          opt.name.toLowerCase() === "material" &&
          opt.value
            .toLowerCase()
            .includes(selections.material?.toLowerCase() || "")
      );

      const finishOption = v.selectedOptions.find((opt) => {
        const selFinish = selections.finish?.toLowerCase() || "";
        const matchValue = selFinish.includes("satin") ? "satin" : "torched";
        return (
          opt.name.toLowerCase() === "finish" &&
          opt.value.toLowerCase().includes(matchValue)
        );
      });

      return materialOption && finishOption;
    }
  );

  console.log("[CHECKOUT] Incoming selections:", selections);
  console.log("[CHECKOUT] Matched product:", matchedProduct.title);
  console.log("[CHECKOUT] Matched variant:", variant);

  if (!variant) {
    return NextResponse.json(
      {error: "No matching variant found"},
      {status: 404}
    );
  }

  // Build cart line item
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

  const variables = {
    input: {
      lines: [lineItem],
    },
  };

  try {
    const response = await shopifyFetch(query, variables);
    const cart = response.cartCreate?.cart;
    const error = response.cartCreate?.userErrors?.[0];

    if (!cart?.checkoutUrl) {
      console.error("Shopify cartCreate error:", error);
      return NextResponse.json(
        {error: "Checkout creation failed"},
        {status: 500}
      );
    }

    return NextResponse.json({
      url: cart.checkoutUrl,
      variantId: variant.id,
      title: matchedProduct.title,
      price: variant.price?.split(" ")[0] ?? matchedProduct.price,
      image: matchedProduct.images?.[0]?.url || "",
    });
  } catch (err) {
    console.error("Checkout API error:", err);
    return NextResponse.json({error: "Server error"}, {status: 500});
  }
}

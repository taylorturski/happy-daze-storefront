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

  return NextResponse.json({
    variantId: variant.id,
    title: matchedProduct.title,
    price: variant.price,
    image: matchedProduct.images[0]?.url || "",
  });
}

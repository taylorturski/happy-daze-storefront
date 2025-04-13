import {NextResponse} from "next/server";
import {Product} from "@/types/product";

let cart: Product[] = [];

export const addToCart = (product: Product) => {
  cart.push(product);
  return cart;
};

export const getCartTotal = () => {
  return cart.reduce((total, product) => {
    return total + Number(product.price);
  }, 0);
};

export async function POST(req: Request) {
  const product: Product = await req.json();
  const updatedCart = addToCart(product);
  return NextResponse.json({
    cart: updatedCart,
    total: getCartTotal(),
  });
}

export async function GET() {
  return NextResponse.json({cart, total: getCartTotal()});
}

export async function DELETE(req: Request) {
  const {searchParams} = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({error: "Missing product ID"}, {status: 400});
  }

  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
  }

  return NextResponse.json({cart, total: getCartTotal()});
}

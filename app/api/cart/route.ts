import {NextResponse} from "next/server";
import {Product} from "@/types/product";

let cart: Product[] = [];

export const addToCart = (product: Product) => {
  cart.push(product);
  return cart;
};

export const getCartTotal = () => {
  return cart.reduce((total, product) => {
    const price = parseFloat(product.price.split(" ")[0]); // Assuming price is in the format "650.0 USD"
    return total + price;
  }, 0);
};

export async function POST(req: Request) {
  const product: Product = await req.json();
  const updatedCart = addToCart(product);
  return NextResponse.json(updatedCart);
}

export async function GET() {
  return NextResponse.json({cart, total: getCartTotal()});
}

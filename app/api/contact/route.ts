import {NextResponse} from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return NextResponse.json({error: "Missing fields"}, {status: 400});
  }

  console.log("New contact submission:", {name, email, message});

  // You can send this to an email provider or store in a DB
  return NextResponse.json({success: true});
}

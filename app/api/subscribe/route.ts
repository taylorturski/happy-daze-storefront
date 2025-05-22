import {NextResponse} from "next/server";

const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN!;
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION!;

export async function POST(req: Request) {
  const body = await req.json();

  const email = body.email?.trim();
  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();

  if (!email || !firstName || !lastName) {
    return NextResponse.json(
      {error: "Missing email, first name, or last name"},
      {status: 400}
    );
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/customers.json`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_API_TOKEN,
      },
      body: JSON.stringify({
        customer: {
          email,
          first_name: firstName,
          last_name: lastName,
          tags: "newsletter",
          email_marketing_consent: {
            state: "subscribed",
            consent_collected_from: "CUSTOMER",
            opt_in_level: "single_opt_in",
          },
        },
      }),
    });

    const data = await res.json();

    if (
      res.status === 422 &&
      data.errors?.email?.includes("has already been taken")
    ) {
      return NextResponse.json(
        {error: "Already subscribed — you’re covered."},
        {status: 400}
      );
    }

    if (!res.ok) {
      return NextResponse.json({error: "Failed to subscribe"}, {status: 500});
    }

    return NextResponse.json({success: true});
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json({error: "Unexpected error"}, {status: 500});
  }
}

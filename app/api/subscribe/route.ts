import {NextResponse} from "next/server";

const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN!;
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION!;

export async function POST(req: Request) {
  const {email} = await req.json();

  if (!email) {
    return NextResponse.json({error: "Missing email"}, {status: 400});
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
          tags: "newsletter",
          email_marketing_consent: {
            state: "subscribed",
            consent_collected_from: "CUSTOMER",
            opt_in_level: "single_opt_in",
          },
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ Shopify Admin API error:", errText);
      return NextResponse.json({error: "Failed to subscribe"}, {status: 500});
    }

    return NextResponse.json({success: true});
  } catch (err) {
    console.error("🔥 Error subscribing customer:", err);
    return NextResponse.json({error: "Unexpected error"}, {status: 500});
  }
}

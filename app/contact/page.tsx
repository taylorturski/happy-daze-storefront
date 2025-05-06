import {getPageByHandle} from "@/lib/shopify/pages";
import ContactForm from "./ContactForm";
import type {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact | Happy Daze Golf",
    description:
      "Got questions? Want something truly one-off? Reach out and let’s talk.",
    openGraph: {
      title: "Contact | Happy Daze Golf",
      description:
        "Got questions? Want something truly one-off? Reach out and let’s talk.",
      images: [
        {
          url: "https://www.happydaze.golf/og/contact.png",
          width: 1200,
          height: 630,
          alt: "Contact - Happy Daze Golf",
        },
      ],
      url: "https://www.happydaze.golf/contact",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact | Happy Daze Golf",
      description:
        "Got questions? Want something truly one-off? Reach out and let’s talk.",
      images: ["https://www.happydaze.golf/og/contact.png"],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const page = await getPageByHandle("contact");

  return <ContactForm title={page.title} content={page.body} />;
}

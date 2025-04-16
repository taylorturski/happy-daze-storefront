import {getPageByHandle} from "@/lib/shopify/pages";
import ContactForm from "./ContactForm";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: "Contact | Happy Daze Golf",
    description:
      "Have a question about your build? Want to talk shop? We read every message. Reach out directly and we'll get back to you soon.",
    openGraph: {
      title: "Contact | Happy Daze Golf",
      description:
        "Have a question about your build? Want to talk shop? We read every message. Reach out directly and we'll get back to you soon.",
      url: "https://www.happydazegolf.com/contact",
      images: [
        {
          url: "/og/contact.jpg",
          width: 1200,
          height: 630,
          alt: "Contact - Happy Daze Golf",
        },
      ],
    },
  };
}

export default async function ContactPage() {
  const page = await getPageByHandle("contact");

  return <ContactForm title={page.title} content={page.body} />;
}

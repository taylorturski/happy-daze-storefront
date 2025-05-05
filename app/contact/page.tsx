import {getPageByHandle} from "@/lib/shopify/pages";
import ContactForm from "./ContactForm";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const page = await getPageByHandle("contact");

  return <ContactForm title={page.title} content={page.body} />;
}

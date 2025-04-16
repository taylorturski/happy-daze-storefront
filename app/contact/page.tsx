import {getPageByHandle} from "@/lib/shopify/pages";
import PageSection from "@/components/PageSection";

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

  return (
    <PageSection title={page.title}>
      <div
        className="mb-8 font-mono"
        dangerouslySetInnerHTML={{__html: page.body}}
      />
      <form
        action="/api/contact"
        method="POST"
        className="flex flex-col gap-4 max-w-md font-mono">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="border border-black px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="border border-black px-3 py-2"
        />
        <textarea
          name="message"
          placeholder="Your message"
          rows={5}
          required
          className="border border-black px-3 py-2"
        />
        <button
          type="submit"
          className="border-2 border-white px-4 py-2 font-bold bg-black">
          SEND MESSAGE
        </button>
      </form>
    </PageSection>
  );
}

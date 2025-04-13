import {getPageByHandle} from "@/lib/shopify/pages";
import PageSection from "@/components/PageSection";

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
          className="border-2 border-black px-4 py-2 font-bold bg-white">
          Send Message
        </button>
      </form>
    </PageSection>
  );
}

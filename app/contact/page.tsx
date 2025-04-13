import {getPageByHandle} from "@/lib/shopify/pages";
import PageSection from "@/components/PageSection";

export default async function ContactPage() {
  const page = await getPageByHandle("contact");

  return (
    <PageSection title={page.title}>
      <div
        dangerouslySetInnerHTML={{__html: page.body}}
        style={{fontFamily: "monospace", marginBottom: "2rem"}}
      />

      <form
        action="/api/contact"
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          style={{padding: "0.5rem", border: "1px solid black"}}
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          style={{padding: "0.5rem", border: "1px solid black"}}
        />
        <textarea
          name="message"
          placeholder="Your message"
          rows={5}
          required
          style={{padding: "0.5rem", border: "1px solid black"}}
        />
        <button
          type="submit"
          style={{
            border: "2px solid black",
            padding: "0.5rem",
            fontWeight: "bold",
            background: "white",
          }}>
          Send Message
        </button>
      </form>
    </PageSection>
  );
}

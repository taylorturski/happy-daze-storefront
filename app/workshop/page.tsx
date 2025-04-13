import {getPageByHandle} from "@/lib/shopify/pages";
import PageSection from "@/components/PageSection";

export default async function WorkshopPage() {
  const page = await getPageByHandle("workshop");

  const imageUrls = Array.from(
    page.body.matchAll(/<img[^>]+src="([^">]+)"/g) as Iterable<RegExpMatchArray>
  ).map((match) => match[1]);

  return (
    <PageSection title="Workshop">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}>
        {imageUrls.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Workshop Image ${idx + 1}`}
            style={{width: "100%", height: "auto", border: "2px solid black"}}
          />
        ))}
      </div>
    </PageSection>
  );
}

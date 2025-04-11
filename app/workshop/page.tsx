import {getPageByHandle} from "@/lib/shopify";

export default async function WorkshopPage() {
  const page = await getPageByHandle("workshop");

  // Extract only the images from the HTML
  const imageUrls = Array.from(
    page.body.matchAll(/<img[^>]+src="([^">]+)"/g) as Iterable<RegExpMatchArray>
  ).map((match) => match[1]);

  return (
    <div>
      <h1>Workshop</h1>
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
    </div>
  );
}

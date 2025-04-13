import {getPageByHandle} from "@/lib/shopify/pages";
import PageSection from "@/components/PageSection";

export default async function WorkshopPage() {
  const page = await getPageByHandle("workshop");

  const imageUrls = Array.from(
    page.body.matchAll(/<img[^>]+src="([^">]+)"/g) as Iterable<RegExpMatchArray>
  ).map((match) => match[1]);

  return (
    <PageSection title="Workshop">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {imageUrls.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Workshop Image ${idx + 1}`}
            className="w-full h-auto border-2 border-black"
          />
        ))}
      </div>
    </PageSection>
  );
}

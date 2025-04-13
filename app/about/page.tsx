import {getPageByHandle} from "@/lib/shopify/pages";
import PageSection from "@/components/PageSection";

export default async function AboutPage() {
  const page = await getPageByHandle("about");

  if (!page) {
    return <p>About page not found.</p>;
  }

  return (
    <PageSection title={page.title}>
      <div
        className="max-w-xl font-mono"
        dangerouslySetInnerHTML={{__html: page.body}}
      />
    </PageSection>
  );
}

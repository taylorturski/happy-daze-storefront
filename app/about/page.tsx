import {getPageByHandle} from "@/lib/shopify";
import PageSection from "@/components/PageSection";

export default async function AboutPage() {
  const page = await getPageByHandle("about");

  if (!page) {
    return <p>About page not found.</p>;
  }

  return (
    <PageSection title={page.title}>
      <div
        dangerouslySetInnerHTML={{__html: page.body}}
        style={{maxWidth: "640px"}}
      />
    </PageSection>
  );
}

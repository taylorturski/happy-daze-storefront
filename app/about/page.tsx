import {getPageByHandle} from "@/lib/shopify";

export default async function AboutPage() {
  const page = await getPageByHandle("about");

  if (!page) {
    return <p>About page not found.</p>;
  }

  return (
    <div style={{fontFamily: "monospace", padding: "2rem", maxWidth: "640px"}}>
      <h1 style={{marginBottom: "1rem"}}>{page.title}</h1>
      <div dangerouslySetInnerHTML={{__html: page.body}} />
    </div>
  );
}

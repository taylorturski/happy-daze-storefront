export default function PageSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="p-8 font-pitch">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      {children}
    </section>
  );
}

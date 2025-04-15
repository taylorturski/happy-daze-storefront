export default function MaterialComparison() {
  return (
    <section className="bg-black p-8 border-b-2">
      <h2 className="text-2xl font-bold mb-4 uppercase">
        Steel Type & Pricing
      </h2>
      <p className="mb-2">Choose your material:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold uppercase">Carbon Steel</h3>
          <p>
            Available finishes: Satin, Gun Blue, Torched Oil Can, Japanese Brown
            Oxide
          </p>
          <p>+$100 for custom finish</p>
        </div>
        <div>
          <h3 className="font-bold uppercase">Stainless Steel</h3>
          <p>Available finishes: Satin, Torched Gold</p>
          <p>+$100 for torched finish</p>
        </div>
      </div>
    </section>
  );
}

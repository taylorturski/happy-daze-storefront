"use client";

export default function Overview() {
  return (
    <section className="p-8 font-pitch bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold uppercase mb-4">
            Build Your Putter
          </h1>
          <p className="mb-4 max-w-xl text-sm md:text-base">
            Start from scratch. Choose every detail of your putter—from shape
            and material to stamping and finish.
          </p>
          <p className="text-sm text-[#ACFF9B] uppercase font-semibold">
            Fully custom. No tech. No gimmicks. Just personality.
          </p>
        </div>

        {/* Right Column */}
        <div className="text-sm leading-relaxed">
          <h2 className="font-bold uppercase text-lg mb-3">How It Works</h2>
          <ol className="list-inside space-y-2">
            <li>-Select your steel type</li>
            <li>-Choose head shape, finish, milling, neck, and alignment</li>
            <li>-Review and confirm your build</li>
            <li>-Submit your order</li>
            <li>-We&apos;ll reach out to finalize details</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

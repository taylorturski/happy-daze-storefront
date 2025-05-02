import Link from "next/link";
import {ReactNode} from "react";

type ProductGridIntroProps = {
  title: string;
  body: string;
  cta: {
    label: string;
    href: string;
  };
  children?: ReactNode;
};

export default function ProductGridIntro({
  title,
  body,
  cta,
  children,
}: ProductGridIntroProps) {
  return (
    <section className="w-full bg-black text-white font-pitch py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 px-4 lg:px-0">
          <h2 className="text-xl sm:text-3xl font-bold uppercase tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-white/80">{body}</p>
          <Link
            href={cta.href}
            className="inline-block mt-6 border-2 border-white px-5 py-2 font-vt tracking-wider text-md uppercase hover:bg-white hover:text-black transition-all">
            {cta.label}
          </Link>
        </div>

        <div className="lg:col-span-8 px-4">{children}</div>
      </div>
    </section>
  );
}

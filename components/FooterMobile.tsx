import Link from "next/link";

export default function FooterMobile() {
  return (
    <footer className="block sm:hidden w-full text-white font-pitch text-sm mt-16 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-end">
        {/* Left side links */}
        <div className="flex flex-col gap-2 text-left">
          <Link href="/about" className="hover:underline uppercase">
            About
          </Link>
          <Link href="/contact" className="hover:underline uppercase">
            Contact
          </Link>
          <a
            href="https://www.instagram.com/happydazegolf/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline uppercase">
            Instagram
          </a>
        </div>

        {/* Right side contact info */}
        <div className="flex flex-col gap-1 text-right leading-tight tracking-wider">
          <a href="tel:9515517056" className="hover:underline">
            951.551.7056
          </a>
          <a href="mailto:hello@happydaze.golf" className="hover:underline">
            hello@happydaze.golf
          </a>
        </div>
      </div>
    </footer>
  );
}

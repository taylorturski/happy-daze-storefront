import Link from "next/link";

export default function FooterMobile() {
  return (
    <footer className="block sm:hidden w-full bg-black/80 text-white font-pitch text-sm">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
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

        <div className="text-left leading-tight tracking-wider">
          <a href="tel:9515517056" className="hover:underline block">
            951.551.7056
          </a>
          <a
            href="mailto:hello@happydaze.golf"
            className="hover:underline block">
            hello@happydaze.golf
          </a>
        </div>
      </div>
    </footer>
  );
}

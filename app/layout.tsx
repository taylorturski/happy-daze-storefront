"use client";

import "@/styles/globals.css";
import {ReactNode} from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import FooterDesktop from "@/components/FooterDesktop";
import FooterMobile from "@/components/FooterMobile";
import {usePathname} from "next/navigation";
import GoogleAnalytics from "@/app/analytics/GoogleAnalytics";
import {CartProvider} from "@/app/context/CartContext";
import dynamic from "next/dynamic";

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), {
  ssr: false,
});
const EmailPopup = dynamic(() => import("@/components/EmailPopup"), {
  ssr: false,
});

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className="m-0 font-pitch text-[16px] overflow-x-hidden">
        <GoogleAnalytics />
        <CartProvider>
          <LayoutContent>{children}</LayoutContent>
          <EmailPopup />
        </CartProvider>
      </body>
    </html>
  );
}

function LayoutContent({children}: {children: ReactNode}) {
  const pathname = usePathname();
  const isBuilder = pathname.startsWith("/build-your-putter");

  return (
    <div className="flex min-h-screen flex-col relative">
      <div className="flex flex-1">
        <aside className="hidden sm:block sticky top-0 z-50 h-screen bg-black">
          <Sidebar />
        </aside>

        <main className="flex-1 relative z-0 bg-transparent sm:pl-0 min-h-screen">
          {/* Desktop Header */}
          <header className="hidden sm:flex justify-end items-right border-b-2 border-white px-5 py-4">
            <nav className="flex gap-2">
              <Link href="/custom-putters" className={navLinkClasses}>
                CUSTOM PUTTERS
              </Link>
              <Link href="/journal" className={navLinkClasses}>
                JOURNAL
              </Link>
              <Link href="/about" className={navLinkClasses}>
                ABOUT
              </Link>
            </nav>
          </header>

          {/* Mobile Header */}
          <div className="flex sm:hidden justify-between items-center border-b-2 border-black px-4 py-3">
            <Link href="/" className="block w-[160px] h-[60px] relative">
              <Image
                src="/happy_daze_logo.svg"
                alt="Happy Daze Golf"
                fill
                className="pt-2 object-contain invert"
                priority
              />
            </Link>
            <MobileMenu />
          </div>

          {children}

          {!isBuilder && <FooterMobile />}
        </main>
      </div>
      {!isBuilder && <FooterDesktop />}
    </div>
  );
}

const navLinkClasses =
  "border-2 border-black px-3 py-1 font-bold no-underline text-md uppercase";

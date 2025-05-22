"use client";

import {ReactNode, useEffect} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import FooterDesktop from "@/components/FooterDesktop";
import FooterMobile from "@/components/FooterMobile";
import AddToCartFeedback from "@/components/cart/AddToCartFeedback";
import dynamic from "next/dynamic";

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), {
  ssr: false,
});
const EmailPopup = dynamic(() => import("@/components/EmailPopup"), {
  ssr: false,
});
const GoogleAnalytics = dynamic(
  () => import("@/app/analytics/GoogleAnalytics"),
  {
    ssr: false,
  }
);
const CartProvider = dynamic(
  () => import("@/app/context/CartContext").then((mod) => mod.CartProvider),
  {
    ssr: false,
  }
);

export default function ClientShell({children}: {children: ReactNode}) {
  const pathname = usePathname();
  const isBuilder = pathname.includes("/build-your-putter");

  useEffect(() => {
    // Leave this if needed for layout tuning
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <CartProvider>
        <div className="flex flex-col h-full relative min-w-0">
          <div className="flex flex-1 min-w-0">
            <aside className="hidden sm:block sticky top-0 z-50 h-screen bg-black">
              <Sidebar />
            </aside>

            <main className="flex flex-col flex-1 min-h-[calc(100vh-80px)] min-w-0 bg-transparent">
              <div className="sticky top-0 z-50 sm:hidden flex justify-between items-center border-b-2 border-black px-4 py-3 bg-black">
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

              <header className="hidden sm:flex justify-end items-right border-b-2 border-white px-5 py-1 hover:text:underline">
                <nav className="flex gap-2" aria-label="Primary navigation">
                  <Link
                    href="/custom-putters"
                    className={navLinkClasses("/custom-putters", pathname)}>
                    CUSTOM PUTTERS
                  </Link>
                  <Link
                    href="/journal"
                    className={navLinkClasses("/journal", pathname)}>
                    JOURNAL
                  </Link>
                  <Link
                    href="/about"
                    className={navLinkClasses("/about", pathname)}>
                    ABOUT
                  </Link>
                </nav>
              </header>

              <div className="flex-1 overflow-y-auto">
                {children}
                {!isBuilder && <FooterMobile />}
              </div>
            </main>
          </div>

          {!isBuilder && <FooterDesktop />}
          {/* <EmailPopup /> */}
        </div>
        <AddToCartFeedback />
      </CartProvider>
    </>
  );
}

const navLinkClasses = (href: string, currentPath: string) =>
  `border-2 px-3 py-1 font-bold text-sm uppercase transition-all ${
    currentPath === href
      ? "border-black underline"
      : "border-black hover:underline"
  }`;

"use client";

import "@/styles/globals.css";
import {ReactNode, useEffect} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import FooterDesktop from "@/components/FooterDesktop";
import FooterMobile from "@/components/FooterMobile";
import {usePathname} from "next/navigation";
import AddToCartFeedback from "@/components/cart/AddToCartFeedback";

const CartProvider = dynamic(
  () => import("@/app/context/CartContext").then((mod) => mod.CartProvider),
  {ssr: false}
);
const GoogleAnalytics = dynamic(
  () => import("@/app/analytics/GoogleAnalytics").then((mod) => mod.default),
  {ssr: false}
);
const MobileMenu = dynamic(
  () => import("@/components/MobileMenu").then((mod) => mod.default),
  {ssr: false}
);
const EmailPopup = dynamic(
  () => import("@/components/EmailPopup").then((mod) => mod.default),
  {ssr: false}
);

export default function RootLayout({children}: {children: ReactNode}) {
  const pathname = usePathname();
  const isBuilder = pathname?.includes("/build-your-putter");

  // fix overflow bug during builder
  useEffect(() => {
    document.body.style.overflow = isBuilder ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isBuilder]);

  return (
    <html lang="en" className="h-full">
      <head>
        <title>Happy Daze Golf</title>
        {/* DNS + Font preloading */}
        <link
          rel="preconnect"
          href="https://www.happydaze.golf"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.happydazegolf.com" />
        <link
          rel="preload"
          href="/fonts/pitch-sans-medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/pitch-sans-semibold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/VT323-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="h-full m-0 font-pitch text-[16px] overflow-x-hidden">
        <GoogleAnalytics />
        <CartProvider>
          <div className="flex flex-col h-full relative min-w-0">
            <div className="flex flex-1 min-w-0">
              {/* Sidebar */}
              <aside className="hidden sm:block sticky top-0 z-50 h-screen bg-black">
                <Sidebar />
              </aside>

              {/* Main content layout */}
              <main className="flex flex-col flex-1 min-h-screen sm:pl-0 min-w-0 bg-transparent">
                {/* Mobile nav - sticky */}
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

                {/* Desktop header nav */}
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

                {/* Actual page content */}
                <div className="flex-1 overflow-y-auto">
                  {children}
                  {!isBuilder && <FooterMobile />}
                </div>
              </main>
            </div>

            {/* Shared components */}
            {!isBuilder && <FooterDesktop />}
            <EmailPopup />
          </div>
          <AddToCartFeedback />
        </CartProvider>
      </body>
    </html>
  );
}

const navLinkClasses = (href: string, currentPath: string) =>
  `border-2 px-3 py-1 font-bold text-sm uppercase transition-all ${
    currentPath === href
      ? "border-black underline"
      : "border-black hover:underline"
  }`;

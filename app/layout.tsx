"use client";

import "@/styles/globals.css";
import {ReactNode} from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import FooterDesktop from "@/components/FooterDesktop";
import FooterMobile from "@/components/FooterMobile";
import {usePathname} from "next/navigation";

// Client‑only components
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
  const isBuilder = pathname.startsWith("/build-your-putter");

  return (
    <html lang="en">
      <head>
        <title>Happy Daze Golf — Underground Golf Club</title>

        {/* Preconnect and DNS Prefetch for Shopify and prod domain */}
        <link
          rel="preconnect"
          href="https://szusur-15.myshopify.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.happydazegolf.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://szusur-15.myshopify.com" />
        <link rel="dns-prefetch" href="https://www.happydazegolf.com" />

        {/* Font preloading */}
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
      <body className="m-0 font-pitch text-[16px] overflow-x-hidden">
        <GoogleAnalytics />
        <CartProvider>
          <div className="flex min-h-screen flex-col relative min-w-0">
            <div className="flex flex-1 min-w-0">
              <aside
                role="complementary"
                className="hidden sm:block sticky top-0 z-50 h-screen bg-black">
                <Sidebar />
              </aside>

              <main
                role="main"
                className="flex-1 relative z-0 bg-transparent sm:pl-0 min-h-screen min-w-0">
                <header className="hidden sm:flex justify-end items-right border-b-2 border-white px-5 py-1 hover:text:underline">
                  <nav aria-label="Primary navigation" className="flex gap-2">
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
            <EmailPopup />
          </div>
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

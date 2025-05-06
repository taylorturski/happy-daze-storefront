import "@/styles/globals.css";
import {ReactNode} from "react";
import ClientShell from "@/components/ClientShell";
import type {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://www.happydaze.golf"),
    title: "Happy Daze Golf",
    description:
      "Refuse the ordinary. Custom putters & lifestyle gear built for expression, not performance claims.",
    openGraph: {
      title: "Happy Daze Golf",
      description:
        "Refuse the ordinary. Custom putters & lifestyle gear built for expression, not performance claims.",
      images: [
        {
          url: "https://www.happydaze.golf/og/default.png",
          width: 1200,
          height: 630,
          alt: "Happy Daze Golf OG Image",
        },
      ],
      url: "https://www.happydaze.golf",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Happy Daze Golf",
      description:
        "Refuse the ordinary. Custom putters & lifestyle gear built for expression, not performance claims.",
      images: ["https://www.happydaze.golf/og/default.png"],
    },
  };
}

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 font-pitch text-[16px] overflow-x-hidden">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}

"use client";

import {usePathname} from "next/navigation";

export default function Head() {
  const pathname = usePathname();

  const defaults = {
    title: "Happy Daze Golf",
    description:
      "Refuse the ordinary. Custom putters & lifestyle gear built for expression, not performance claims.",
    image: "https://www.happydaze.golf/og/default.png",
    url: "https://www.happydaze.golf",
  };

  const routes: Record<string, Partial<typeof defaults>> = {
    "/about": {
      title: "About | Happy Daze Golf",
      description:
        "Happy Daze didn’t start with a business plan. It started with a feeling — and a putter. A new kind of golf brand, built from scratch.",
      image: "https://www.happydaze.golf/og/about.png",
      url: "https://www.happydaze.golf/about",
    },
    "/custom-putters": {
      title: "Custom Putters | Happy Daze Golf",
      description:
        "Milled to order. Built by hand. Our custom putters are made for expression—not mass production.",
      image: "https://www.happydaze.golf/og/custom-putters.png",
      url: "https://www.happydaze.golf/custom-putters",
    },
    "/build-your-putter": {
      title: "Build Your Putter | Happy Daze Golf",
      description:
        "Choose your head, finish, milling, neck, and alignment. Then make it yours. Welcome to the builder.",
      image: "https://www.happydaze.golf/og/builder.png",
      url: "https://www.happydaze.golf/build-your-putter",
    },
    "/merch": {
      title: "Merch | Happy Daze Golf",
      description:
        "Hats, stickers, headcovers, and lifestyle drops from the Happy Daze garage.",
      image: "https://www.happydaze.golf/og/merch.png",
      url: "https://www.happydaze.golf/merch",
    },
    "/gallery": {
      title: "Gallery | Happy Daze Golf",
      description:
        "Finished putters, unique stamps, and custom builds. A behind-the-scenes look at the work.",
      image: "https://www.happydaze.golf/og/gallery.png",
      url: "https://www.happydaze.golf/gallery",
    },
    "/contact": {
      title: "Contact | Happy Daze Golf",
      description:
        "Got questions? Want something truly one-off? Reach out and let’s talk.",
      image: "https://www.happydaze.golf/og/contact.png",
      url: "https://www.happydaze.golf/contact",
    },
    "/journal/so-what-is-happy-daze": {
      title: "So What Is Happy Daze? | Journal",
      description:
        "The origin story behind the putter brand that refuses to follow the script.",
      image: "https://www.happydaze.golf/og/journal-1.png",
      url: "https://www.happydaze.golf/journal/so-what-is-happy-daze",
    },
    "/journal/its-not-just-about-the-club": {
      title: "It’s Not Just About the Club | Journal",
      description:
        "There’s something deeper going on when we make a putter. It’s personal.",
      image: "https://www.happydaze.golf/og/journal-2.png",
      url: "https://www.happydaze.golf/journal/its-not-just-about-the-club",
    },
    "/journal/this-isnt-just-a-brand-its-a-world": {
      title: "This Isn’t Just a Brand—It’s a World | Journal",
      description:
        "More than product. Happy Daze is a place to belong. Here’s why.",
      image: "https://www.happydaze.golf/og/journal-3.png",
      url: "https://www.happydaze.golf/journal/this-isnt-just-a-brand-its-a-world",
    },
  };

  const meta = {
    ...defaults,
    ...(routes[pathname] || {}),
  };

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}

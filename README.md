# Happy Daze Golf

Happy Daze Golf is a streetwear-inspired custom putter company rooted in nostalgia, rebellion, and individuality. Built for golfers who refuse the ordinary, Happy Daze offers hand-stamped putters with a focus on aesthetic, personalization, and storytelling over tech gimmicks. The brand draws influence from the 90s internet, DIY garage culture, and outsider art—merging vintage sportswear with golf club crafting.

This storefront is a fully custom e-commerce experience that lets users:

- Explore custom putter blanks
- Learn about the Happy Daze process
- Build their own putter using a multi-step visual builder
- Read journal articles and stories
- Submit inquiries via a custom contact form
- Complete purchases via live Shopify checkout

---

## 🧱 Tech Stack

### Framework & Runtime

- **Next.js 13.0.4+ (App Router)** — modern file-based routing and layout system
- **React 19** — component-based architecture, client-side interactivity
- **TypeScript** — fully typed codebase with strict type safety
- **Vercel** — deploy target with production domain config and preview environments

### Styling & UI

- **Tailwind CSS** — low-level utility-first styling
- **Custom CSS** — additional global tweaks in `build-your-putter.css`
- **90s / raw scaffolding aesthetic** — intentionally minimal, awaiting final polish

### Shopify Integration

- **Storefront API (2024-04)** — pulling products, variants, pricing, blogs, pages
- **Admin API** — used to add email signups as Shopify customers
- **Dynamic checkout creation** — users sent directly to Shopify checkout with correct variant and line item properties

### Custom Functionality

- **Custom putter builder** — supports material, finish, face milling, neck, alignment steps
- **Line item property injection** — passes build config to Shopify checkout via POST `/api/checkout`
- **Custom Shop routing** — each blank can lead directly to builder with headshape preselected
- **Client-side cart state** — fully reactive cart UI for sidebar and mobile
- **Contact form** — sends email to `hello@happydaze.golf` via Shopify’s built-in email system

### Analytics / SEO

- **GA4 & GTM** — Google Analytics and Tag Manager wired up
- **Dynamic SEO metadata** — `generateMetadata()` used per page
- **Open Graph images** — every major page has OG image (`/public/og`) for social sharing

---

## 🧩 Major Pages

- `/` — Homepage with featured product grid, process section, and direct builder access
- `/custom-shop` — Grid of blank putters with direct entry to builder per model
- `/build-your-putter` — Multi-step visual builder with dynamic logic
- `/putters/[handle]` — Individual product pages (blanks and accessories)
- `/journal` & `/journal/[handle]` — Blog system powered by Shopify articles
- `/about`, `/contact`, `/workshop` — Static pages powered by Shopify’s CMS

---

## ⚙️ Notable Logic & Features

- **Price calculation** — pulled from the correct Shopify variant (e.g. Torched = +$100)
- **Variant matching** — builder uses material + finish to find matching Shopify variant
- **Checkout API** — `POST /api/checkout` creates cart + redirects to Shopify checkout
- **Context system** — builder state managed via `BuildContext` provider
- **Thumbnail swapping** — on product detail pages, responsive gallery UX
- **Mobile-responsive** — builder, cart, navigation, and image layouts all adapt

---

## 🧪 Dev & Deployment

- Local dev: `npm run dev`
- Production: deployed via **Vercel**
- Shopify domain: `szusur-15.myshopify.com`
- Live domain: `https://www.happydazegolf.com`

### Environment Variables (`.env.local`)

```env
SHOPIFY_STORE_DOMAIN=szusur-15.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
SHOPIFY_ADMIN_API_TOKEN=...
SHOPIFY_API_VERSION=2024-04
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=hello@happydaze.golf
SMTP_PASS=...
```

---

## 🚧 Fast Follows (Post Launch)

- Style polish pass across entire site
- Add option to upload inspiration photos to builder
- Improve mobile UX of builder progress
- Enable blog filtering or categories
- Expand email automation via Shopify

---

## 🤘 Brand Ethos

Happy Daze Golf isn’t about fixing your game. It’s about building a connection — with your putter, your story, your roots. This is underground golf culture for people who want to make something personal. One stamp at a time.

**Refuse the ordinary.**

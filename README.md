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

## Tech Stack

### Framework & Runtime

- Next.js 13.0.4 (App Router)
- React 19
- TypeScript
- Vercel (CI/CD and hosting)
- Bun (JS runtime, package manager, and task runner)

### Styling & UI

- Tailwind CSS
- Custom raw CSS overrides
- 90s-inspired, minimal design

### Shopify Integration

- Storefront API (2024-04) for product and content data
- Admin API for customer email capture
- Dynamic cart + checkout API integration

### Custom Features

- Multi-step visual putter builder (materials, finishes, milling, necks, alignment)
- Variant matching and line item property injection into Shopify
- Reactive cart with sidebar and mobile views
- Email popup with discount code
- Contact form integration

### Analytics & SEO

- Google Analytics (GA4)
- Google Tag Manager
- Open Graph metadata per page

---

## Key Pages

- `/` — Homepage with featured product grid and entry points
- `/custom-shop` — Product grid of blank putters
- `/build-your-putter` — Builder flow with custom option logic
- `/putters/[handle]` — Individual product pages (putters and accessories)
- `/journal` — Blog posts via Shopify CMS
- `/about`, `/contact`, `/workshop` — Static pages

---

## Logic Highlights

- Builder dynamically matches Shopify variants based on selected attributes
- Price reflects real-time variant pricing (e.g. torched = +$100)
- Cart is stored in localStorage and synced with Shopify
- `/api/checkout` POST endpoint creates new or updates existing Shopify cart
- Visual builder uses React Context (`BuildContext`) for state persistence
- Framer Motion used for lightweight animations and transitions
- All layouts are mobile-first responsive with desktop priority styling

---

## Development

### Requirements

- [Bun](https://bun.sh) installed:
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

### First-Time Setup

```bash
bun install
```

### Dev Commands

| Task             | Command          |
| ---------------- | ---------------- |
| Start Dev Server | `bun dev`        |
| Build for Prod   | `bun run build`  |
| Preview Build    | `bun run start`  |
| Format Code      | `bun run format` |
| Lint Code        | `bun run lint`   |
| Add Package      | `bun add`        |
| Remove Package   | `bun remove`     |

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

## Deployment

- Deployed via [Vercel](https://vercel.com/)
- `bun run build` outputs production-ready app
- Vercel handles environment injection, serverless edge runtime, and CDN

---

## Post-Launch Roadmap

- Improve mobile builder UX and progress tracking
- Add ability to upload inspiration photos during build
- Expand Journal with filters/tags
- Refactor animations into global utility component
- Integrate Klaviyo or MailerLite for deeper email automation

---

## Brand Ethos

Happy Daze Golf isn’t about fixing your game. It’s about building a connection — with your putter, your story, your roots. This is underground golf culture for people who want to make something personal. One stamp at a time.

Refuse the ordinary.

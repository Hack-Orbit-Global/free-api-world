# 🌐 FreeAPIWorld

> **Universe of Free APIs** — A blazing-fast, SEO-optimized, statically generated API directory built for scale.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2014-black)](https://nextjs.org)
[![Part of Hack Orbit](https://img.shields.io/badge/Part%20of-Hack%20Orbit-00e5a0)](#)

FreeAPIWorld is a community-first platform for discovering free public APIs. Every page is statically generated from JSON data — no database, no server, no complexity.

---

## 📁 Folder Structure

```
freeapiworld/
├── data/
│   ├── apis-index.json          # Lightweight index (name, slug, category, auth, https, cors)
│   └── apis/
│       ├── openweathermap.json  # Full detail for each API
│       ├── pokeapi.json
│       ├── nasa.json
│       └── [slug].json          # One file per API
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout + global SEO metadata
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # Global styles (terminal-dark aesthetic)
│   │   ├── sitemap.ts            # Auto-generated sitemap
│   │   ├── robots.ts             # robots.txt
│   │   ├── not-found.tsx         # 404 page
│   │   ├── api/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual API page (SSG)
│   │   ├── category/
│   │   │   └── [category]/
│   │   │       └── page.tsx      # Category page with pagination (SSG)
│   │   └── finder/
│   │       ├── page.tsx          # Finder page (server)
│   │       └── FinderClient.tsx  # Client-side filtering UI
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ApiCard.tsx
│   │   └── SearchBar.tsx
│   │
│   └── lib/
│       └── api-utils.ts          # Data loading utilities (build-time only)
│
├── public/                       # Static assets
├── next.config.js                # output: 'export' for static generation
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Hack-Orbit-global/fre-eapi-world.git
cd freeapiworld

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for production

```bash
npm run build
```

This generates a fully static `out/` folder ready for any CDN.

---

## ➕ Adding a New API

Adding an API is a **two-step process** that automatically generates a new page at build time.

### Step 1 — Add to the index

Edit `data/apis-index.json` and add a new entry:

```json
{
  "slug": "my-new-api",
  "name": "My New API",
  "category": "Development",
  "auth": "apiKey",
  "https": true,
  "cors": true,
  "description": "A short one-line description of what this API does."
}
```

**Available auth values:** `"No"`, `"apiKey"`, `"OAuth"`, `"X-Mashape-Key"`, `"User-Agent"`

### Step 2 — Create the detail file

Create `data/apis/my-new-api.json`:

```json
{
  "slug": "my-new-api",
  "name": "My New API",
  "category": "Development",
  "description": "Short description for cards and meta tags.",
  "longDescription": "Full paragraph description shown on the API detail page.",
  "auth": "apiKey",
  "https": true,
  "cors": true,
  "baseUrl": "https://api.mynewapi.com/v1",
  "docsUrl": "https://docs.mynewapi.com",
  "version": "1",
  "pricing": "Free: 1,000 requests/day",
  "tags": ["tag1", "tag2", "tag3"],
  "exampleRequest": {
    "method": "GET",
    "endpoint": "https://api.mynewapi.com/v1/endpoint?key={YOUR_KEY}",
    "response": "{\n  \"status\": \"ok\",\n  \"data\": {}\n}"
  },
  "relatedSlugs": ["other-api-slug", "another-api-slug"],
  "alsoSearched": ["search term 1", "search term 2"],
  "affiliateText": "Building with this API? Deploy on Vercel for free.",
  "featured": false
}
```

**That's it.** Run `npm run build` and the new page `/api/my-new-api` is generated automatically.

---

## 🏗️ Architecture — How It Scales to 10,000+ APIs

| Problem | Solution |
|---|---|
| Loading 10K items globally is slow | `apis-index.json` is a minimal index (7 fields only); full data is loaded per-slug at build time |
| Build time grows with scale | `generateStaticParams` reads slugs lazily; use `--workers` flag for parallel builds |
| Large category pages | Pagination at 20 APIs/page; server-rendered per-page |
| JS bundle size | Finder page is the only interactive page; all other pages are zero-JS static HTML |
| SEO for every page | Dynamic `generateMetadata` per API and category; JSON-LD structured data on API pages |
| Sitemap for crawlers | Auto-generated sitemap from all slugs + categories |

### Page sizes (target)
- Homepage: ~25KB (with fonts)
- API detail page: ~18KB
- Category page: ~22KB
- Finder page: ~30KB (includes client JS for filtering)

---

## 🤝 Contributing

We welcome API suggestions, bug reports, and PRs!

### Suggest an API
[Open a GitHub Issue](https://github.com/Hack-Orbit-global/free-api-world/issues/new?template=suggest-api.md)

### Report a broken API
[Open a Bug Report](https://github.com/Hack-Orbit-global/free-api-world/issues/new?template=bug-report.md)

### Contribute code
1. Fork the repo
2. Create a branch: `git checkout -b feature/add-my-feature`
3. Make changes
4. Open a PR

---

## 💰 Monetization

FreeAPIWorld uses **ethical monetization** to sustain the project:
- Affiliate links to hosting providers (Vercel, Railway, Netlify, Supabase)
- No ads, no tracking, no paywalls
- All data and content remain free forever

---

## 📜 License

MIT © [Sabarna Barik](https://github.com/bariksabarna) · [Hack Orbit](#)

---

**Build. Contribute. Orbit Together.**

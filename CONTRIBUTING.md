# Contributing to FreeAPIWorld

Thanks for wanting to contribute! FreeAPIWorld grows through community contributions. Here are all the ways you can help.

---

## 🚀 Quickest Contribution: Add an API

### Option 1 — CLI (Recommended)

```bash
git clone https://github.com/Hack-Orbit-global/free-api-world.git
cd freeapiworld
npm install

# Interactive: follow the prompts
npm run add-api

# Or bulk import from CSV
npm run bulk-import scripts/sample-bulk-import.csv
```

### Option 2 — Manual JSON Editing

1. **Add to `data/apis-index.json`:**

```json
{
  "slug": "my-api",
  "name": "My API",
  "category": "Development",
  "auth": "apiKey",
  "https": true,
  "cors": true,
  "description": "One-line description of what the API does."
}
```

2. **Create `data/apis/my-api.json`** with full details (see [template](#detail-file-template) below).

3. **Run validation:**

```bash
npm run validate
```

4. **Open a Pull Request** — CI will build and preview automatically.

---

## 📋 Detail File Template

```json
{
  "slug": "my-api",
  "name": "My API",
  "category": "Development",
  "description": "Short description (used in cards and meta tags).",
  "longDescription": "2-3 sentence paragraph shown on the API detail page.",
  "auth": "apiKey",
  "https": true,
  "cors": true,
  "baseUrl": "https://api.myapi.com/v1",
  "docsUrl": "https://docs.myapi.com",
  "version": "1",
  "pricing": "Free: 1,000 requests/day",
  "tags": ["tag1", "tag2", "tag3"],
  "exampleRequest": {
    "method": "GET",
    "endpoint": "https://api.myapi.com/v1/resource?key={YOUR_KEY}",
    "response": "{\n  \"status\": \"ok\",\n  \"data\": {}\n}"
  },
  "relatedSlugs": ["other-api", "another-api"],
  "alsoSearched": ["my api alternative", "free my-category api"],
  "affiliateText": "Building with My API? Deploy on Vercel — free tier available.",
  "featured": false
}
```

### Valid `auth` values

| Value | Meaning |
|---|---|
| `"No"` | No authentication required |
| `"apiKey"` | API key in header or query param |
| `"OAuth"` | OAuth 2.0 flow |
| `"User-Agent"` | Custom User-Agent header |
| `"X-Mashape-Key"` | RapidAPI/Mashape key |

### Valid `category` values

Weather · Games · Science · Health · Geography · Development · Animals · AI & ML · Finance · News · Language · Entertainment

*(To add a new category, update `CATEGORY_EMOJIS` in `src/lib/api-utils.ts`)*

---

## 🐛 Reporting Issues

- **Broken API link?** → [File a bug report](https://github.com/Hack-Orbit-global/free-api-world/issues/new?template=bug-report.md)
- **Wrong data?** → Open an issue with the correct information
- **Site bug?** → Include browser, OS, and steps to reproduce

---

## 💻 Code Contributions

### Setup

```bash
git clone https://github.com/Hack-Orbit-global/free-api-world.git
cd freeapiworld
npm install
npm run dev
```

### Rules

- **No database** — all data lives in `/data/*.json`
- **Static only** — all pages must work with `output: 'export'`
- **Minimal JS** — keep the Finder as the only heavily-interactive page
- **No images** — keep page sizes under 30KB
- **TypeScript** — no `any` types
- **Test your build** — run `npm run build` before submitting a PR

### Branch naming

- `feat/add-[api-name]` — adding new APIs
- `fix/[issue-description]` — bug fixes
- `chore/[description]` — maintenance

---

## 🏅 Recognition

All contributors are listed in our [GitHub contributors graph](#) and we give shoutouts in Discord.

**Build. Contribute. Orbit Together.** 🚀

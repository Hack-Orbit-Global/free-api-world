#!/usr/bin/env node
/**
 * FreeAPIWorld — API Generator Script
 * ─────────────────────────────────────────────────────────────────
 * Usage:
 *
 *   # Add a single API interactively
 *   node scripts/add-api.js
 *
 *   # Bulk import from a CSV file
 *   node scripts/add-api.js --bulk path/to/apis.csv
 *
 *   # Bulk import from a JSON array file
 *   node scripts/add-api.js --bulk path/to/apis.json
 *
 *   # Validate all existing API files
 *   node scripts/add-api.js --validate
 *
 *   # Generate stub detail files for index entries that lack them
 *   node scripts/add-api.js --fill-stubs
 *
 * CSV format (header row required):
 *   name,slug,category,auth,https,cors,description,docsUrl,baseUrl
 *
 * ─────────────────────────────────────────────────────────────────
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const DATA_DIR = path.join(__dirname, "..", "data");
const INDEX_PATH = path.join(DATA_DIR, "apis-index.json");
const APIS_DIR = path.join(DATA_DIR, "apis");

// ── Helpers ──────────────────────────────────────────────────────

function readIndex() {
  return JSON.parse(fs.readFileSync(INDEX_PATH, "utf-8"));
}

function writeIndex(data) {
  fs.writeFileSync(INDEX_PATH, JSON.stringify(data, null, 2) + "\n");
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function generateDetailFile(entry) {
  return {
    slug: entry.slug,
    name: entry.name,
    category: entry.category,
    description: entry.description || `${entry.name} API for developers.`,
    longDescription: entry.longDescription ||
      `${entry.name} is a powerful free API providing access to ${(entry.description || "data").toLowerCase()}. ` +
      `It is trusted by thousands of developers worldwide and offers reliable uptime, comprehensive documentation, ` +
      `and an active community. Whether you're building a production application or prototyping, this API ` +
      `gives you everything you need to get started quickly.`,
    auth: entry.auth || "apiKey",
    https: entry.https !== undefined ? entry.https : true,
    cors: entry.cors !== undefined ? entry.cors : true,
    baseUrl: entry.baseUrl || `https://api.${entry.slug.replace(/-/g, "")}.com`,
    docsUrl: entry.docsUrl || `https://${entry.slug.replace(/-/g, "")}.com/docs`,
    version: entry.version || "1",
    pricing: entry.pricing || "Free tier available. Check documentation for rate limits.",
    tags: entry.tags || [entry.category.toLowerCase(), "api", "free"],
    exampleRequest: entry.exampleRequest || {
      method: "GET",
      endpoint: `${entry.baseUrl || "https://api.example.com"}/endpoint`,
      response: '{\n  "status": "ok",\n  "data": {}\n}',
    },
    relatedSlugs: entry.relatedSlugs || [],
    alsoSearched: entry.alsoSearched || [
      `${entry.category.toLowerCase()} api`,
      `free ${entry.category.toLowerCase()} api`,
      `${entry.name.toLowerCase()} alternative`,
      "public api",
      "open api",
    ],
    affiliateText:
      entry.affiliateText ||
      `Building with ${entry.name}? Deploy your project instantly on Vercel — free tier available.`,
    featured: entry.featured || false,
  };
}

function addToIndex(entry, index) {
  const indexEntry = {
    slug: entry.slug,
    name: entry.name,
    category: entry.category,
    auth: entry.auth,
    https: entry.https !== undefined ? entry.https : true,
    cors: entry.cors !== undefined ? entry.cors : true,
    description: entry.description || "",
  };
  index.push(indexEntry);
  index.sort((a, b) => a.name.localeCompare(b.name));
  return index;
}

function writeDetail(entry) {
  const detail = generateDetailFile(entry);
  const outPath = path.join(APIS_DIR, `${entry.slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(detail, null, 2) + "\n");
  return outPath;
}

// ── Validate ─────────────────────────────────────────────────────

function validate() {
  const index = readIndex();
  const detailFiles = new Set(
    fs.readdirSync(APIS_DIR).map((f) => f.replace(".json", ""))
  );

  let errors = 0;
  let warnings = 0;

  console.log(`\n📋 Validating ${index.length} APIs in index...\n`);

  // Check all index entries have detail files
  for (const api of index) {
    if (!detailFiles.has(api.slug)) {
      console.log(`  ❌ MISSING detail file: ${api.slug}.json`);
      errors++;
    }
    if (!api.slug || !api.name || !api.category) {
      console.log(`  ❌ INCOMPLETE index entry: ${JSON.stringify(api)}`);
      errors++;
    }
    if (!api.description) {
      console.log(`  ⚠️  No description for: ${api.slug}`);
      warnings++;
    }
  }

  // Check for orphaned detail files (detail with no index entry)
  const indexSlugs = new Set(index.map((a) => a.slug));
  for (const slug of detailFiles) {
    if (!indexSlugs.has(slug)) {
      console.log(`  ⚠️  ORPHANED detail file (not in index): ${slug}.json`);
      warnings++;
    }
  }

  // Validate detail file schemas
  for (const slug of detailFiles) {
    try {
      const detail = JSON.parse(
        fs.readFileSync(path.join(APIS_DIR, `${slug}.json`), "utf-8")
      );
      const required = ["slug", "name", "category", "description", "auth", "https", "cors", "baseUrl", "docsUrl"];
      for (const field of required) {
        if (detail[field] === undefined) {
          console.log(`  ⚠️  ${slug}.json missing field: ${field}`);
          warnings++;
        }
      }
    } catch (e) {
      console.log(`  ❌ INVALID JSON: ${slug}.json`);
      errors++;
    }
  }

  console.log(`\n✅ Validation complete.`);
  console.log(`   ${index.length} APIs indexed`);
  console.log(`   ${detailFiles.size} detail files`);
  console.log(`   ${errors} errors`);
  console.log(`   ${warnings} warnings\n`);

  return errors === 0;
}

// ── Fill Stubs ────────────────────────────────────────────────────

function fillStubs() {
  const index = readIndex();
  const detailFiles = new Set(
    fs.readdirSync(APIS_DIR).map((f) => f.replace(".json", ""))
  );

  let created = 0;
  for (const api of index) {
    if (!detailFiles.has(api.slug)) {
      writeDetail(api);
      console.log(`  ✅ Created: ${api.slug}.json`);
      created++;
    }
  }

  if (created === 0) {
    console.log("  ✓ All index entries already have detail files.");
  } else {
    console.log(`\n  Created ${created} stub detail file(s).`);
    console.log(`  Edit them at data/apis/*.json to add real content.\n`);
  }
}

// ── Bulk Import ───────────────────────────────────────────────────

function parseCsvLine(line) {
  const result = [];
  let inQuote = false;
  let current = "";
  for (const ch of line) {
    if (ch === '"') { inQuote = !inQuote; continue; }
    if (ch === "," && !inQuote) { result.push(current.trim()); current = ""; continue; }
    current += ch;
  }
  result.push(current.trim());
  return result;
}

function bulkImport(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  let entries = [];

  if (ext === ".json") {
    entries = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (!Array.isArray(entries)) {
      console.error("JSON file must contain an array of API objects.");
      process.exit(1);
    }
  } else if (ext === ".csv") {
    const lines = fs.readFileSync(filePath, "utf-8").split("\n").filter(Boolean);
    const headers = parseCsvLine(lines[0]);
    for (let i = 1; i < lines.length; i++) {
      const values = parseCsvLine(lines[i]);
      const obj = {};
      headers.forEach((h, idx) => {
        const v = values[idx];
        if (h === "https" || h === "cors") obj[h] = v === "true" || v === "1" || v === "yes";
        else obj[h] = v;
      });
      entries.push(obj);
    }
  } else {
    console.error("Unsupported file format. Use .json or .csv");
    process.exit(1);
  }

  const index = readIndex();
  const existingSlugs = new Set(index.map((a) => a.slug));
  let added = 0;
  let skipped = 0;

  for (const raw of entries) {
    const entry = {
      ...raw,
      slug: raw.slug || slugify(raw.name || ""),
      https: raw.https === true || raw.https === "true" || raw.https === "1",
      cors: raw.cors === true || raw.cors === "true" || raw.cors === "1",
    };

    if (!entry.slug || !entry.name) {
      console.log(`  ⚠️  Skipping entry with no name/slug: ${JSON.stringify(raw)}`);
      skipped++;
      continue;
    }

    if (existingSlugs.has(entry.slug)) {
      console.log(`  ⏭  Already exists: ${entry.slug}`);
      skipped++;
      continue;
    }

    addToIndex(entry, index);
    existingSlugs.add(entry.slug);
    writeDetail(entry);
    console.log(`  ✅ Added: ${entry.name} (${entry.slug})`);
    added++;
  }

  writeIndex(index);
  console.log(`\n  Done. Added: ${added}, Skipped: ${skipped}\n`);
}

// ── Interactive Single Add ────────────────────────────────────────

async function interactiveAdd() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  console.log("\n🌐 FreeAPIWorld — Add a New API\n");

  const name = await ask("API Name: ");
  if (!name.trim()) { console.log("Name is required."); rl.close(); return; }

  const autoSlug = slugify(name);
  const slugInput = await ask(`Slug [${autoSlug}]: `);
  const slug = slugInput.trim() || autoSlug;

  const index = readIndex();
  if (index.find((a) => a.slug === slug)) {
    console.log(`\n❌ An API with slug "${slug}" already exists.`);
    rl.close();
    return;
  }

  const category = await ask("Category (e.g. Weather, Finance, Development): ");
  const description = await ask("Short description (1 line): ");
  const authInput = await ask("Auth type (No / apiKey / OAuth) [apiKey]: ");
  const auth = authInput.trim() || "apiKey";
  const httpsInput = await ask("HTTPS? (y/n) [y]: ");
  const https = httpsInput.toLowerCase() !== "n";
  const corsInput = await ask("CORS? (y/n) [y]: ");
  const cors = corsInput.toLowerCase() !== "n";
  const baseUrl = await ask("Base URL: ");
  const docsUrl = await ask("Documentation URL: ");
  const pricing = await ask("Pricing (e.g. Free: 1000 req/day) [Free tier available]: ");
  const featuredInput = await ask("Mark as featured? (y/n) [n]: ");
  const featured = featuredInput.toLowerCase() === "y";

  rl.close();

  const entry = {
    slug,
    name: name.trim(),
    category: category.trim(),
    auth,
    https,
    cors,
    description: description.trim(),
    baseUrl: baseUrl.trim(),
    docsUrl: docsUrl.trim(),
    pricing: pricing.trim() || "Free tier available",
    featured,
  };

  addToIndex(entry, index);
  writeIndex(index);
  const detailPath = writeDetail(entry);

  console.log(`\n✅ API added successfully!`);
  console.log(`   Index updated: data/apis-index.json`);
  console.log(`   Detail created: ${detailPath}`);
  console.log(`\n📝 Edit the detail file to add full description, example request,`);
  console.log(`   related APIs, and tags. Then rebuild:\n`);
  console.log(`   npm run build\n`);
}

// ── CLI Entry ─────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args[0] === "--validate") {
  validate();
} else if (args[0] === "--fill-stubs") {
  fillStubs();
} else if (args[0] === "--bulk") {
  if (!args[1]) {
    console.error("Usage: node scripts/add-api.js --bulk <file.csv|file.json>");
    process.exit(1);
  }
  bulkImport(args[1]);
} else {
  interactiveAdd();
}

import { getAllApis } from "@/lib/api-utils";

// Rendered as a static page at /rss — link to it as /rss
export default function RssPage() {
  const apis = getAllApis().slice(0, 50);
  const baseUrl = "#";

  const items = apis
    .map(
      (api) =>
        `    <item>
      <title><![CDATA[${api.name} — Free ${api.category} API]]></title>
      <link>${baseUrl}/api/${api.slug}</link>
      <guid isPermaLink="true">${baseUrl}/api/${api.slug}</guid>
      <description><![CDATA[${api.description} Auth: ${api.auth}. HTTPS: ${
          api.https ? "Yes" : "No"
        }. CORS: ${api.cors ? "Yes" : "No"}.]]></description>
      <category>${api.category}</category>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FreeAPIWorld — New Free APIs</title>
    <link>${baseUrl}</link>
    <description>The latest free public APIs added to FreeAPIWorld.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  // Render raw XML as preformatted text (browsers handle RSS fine as text)
  return (
    <pre
      style={{
        background: "#060a10",
        color: "#adbac7",
        fontFamily: "monospace",
        fontSize: "0.8rem",
        padding: "1rem",
        margin: 0,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {rss}
    </pre>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — FreeAPIWorld",
  description:
    "FreeAPIWorld Privacy Policy. Learn how we collect, use, and protect your data, including our use of Google AdSense, Google Analytics, and cookies.",
};

const LAST_UPDATED = "March 25, 2026";
const SITE_NAME = "FreeAPIWorld";
const SITE_URL = "https://free-api-world.vercel.app";
const CONTACT_EMAIL = "https://discord.com/invite/GVNnacYENf";
const OWNER = "Sabarna Barik / Hack Orbit";

export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: "3rem 1.25rem 5rem", maxWidth: "800px" }}>

      {/* Breadcrumb */}
      <nav style={{ marginBottom: "2rem", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>
        <Link href="/" style={{ color: "var(--text-dim)" }}>home</Link>
        <span style={{ color: "var(--border2)", margin: "0 6px" }}>/</span>
        <span style={{ color: "var(--accent)" }}>privacy</span>
      </nav>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p className="section-label" style={{ marginBottom: "0.75rem" }}>Legal</p>
        <h1
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-bright)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <ProseBlock>
        This Privacy Policy describes how {SITE_NAME} ("{SITE_URL}"), operated by {OWNER},
        collects, uses, and shares information about you when you visit and use our website.
        By using {SITE_NAME}, you agree to the collection and use of information in accordance
        with this policy.
      </ProseBlock>

      <Divider />

      <Section title="1. Information We Collect">
        <SubHeading>a) Automatically Collected Information</SubHeading>
        <ProseBlock>
          When you visit {SITE_NAME}, we and our third-party partners may automatically collect
          certain information from your device and browser, including:
        </ProseBlock>
        <BulletList items={[
          "IP address (anonymized where possible)",
          "Browser type and version",
          "Operating system",
          "Pages visited and time spent on each page",
          "Referring URLs",
          "Date and time of your visit",
          "Device type (desktop, mobile, tablet)",
        ]} />

        <SubHeading>b) Information You Provide</SubHeading>
        <ProseBlock>
          We do not require account registration. If you choose to contact us via email or GitHub,
          we receive the information you voluntarily provide, such as your name and email address.
        </ProseBlock>

        <SubHeading>c) Cookies and Tracking Technologies</SubHeading>
        <ProseBlock>
          We use cookies and similar tracking technologies to improve your experience, analyze
          site traffic, and serve relevant advertisements. You can instruct your browser to refuse
          all cookies or to indicate when a cookie is being sent. However, some parts of our site
          may not function properly without cookies.
        </ProseBlock>
        <ProseBlock>
          Types of cookies we use:
        </ProseBlock>
        <BulletList items={[
          "Essential cookies — required for the site to function",
          "Analytics cookies — help us understand how visitors interact with the site (Google Analytics)",
          "Advertising cookies — used to serve relevant ads (Google AdSense)",
          "Preference cookies — remember your settings and preferences",
        ]} />
      </Section>

      <Divider />

      <Section title="2. How We Use Your Information">
        <ProseBlock>We use the information we collect to:</ProseBlock>
        <BulletList items={[
          "Operate and improve the FreeAPIWorld website and its features",
          "Analyze usage patterns to understand what content is most valuable",
          "Serve relevant advertisements through Google AdSense",
          "Measure and improve the performance of our advertising",
          "Respond to inquiries and support requests",
          "Prevent fraud and ensure the security of our platform",
          "Comply with legal obligations",
        ]} />
      </Section>

      <Divider />

      <Section title="3. Google AdSense & Advertising">
        <ProseBlock>
          {SITE_NAME} uses <strong style={{ color: "var(--text-bright)" }}>Google AdSense</strong> to
          display advertisements. Google AdSense uses cookies to serve ads based on your prior visits
          to this website and other websites on the internet. Google&apos;s use of advertising cookies
          enables it and its partners to serve ads to you based on your visit to our site and/or other
          sites on the internet.
        </ProseBlock>
        <ProseBlock>
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            Google Ad Settings
          </a>
          . You can also opt out of a third-party vendor&apos;s use of cookies for personalized advertising
          by visiting{" "}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            www.aboutads.info
          </a>
          .
        </ProseBlock>
        <ProseBlock>
          We also participate in the Google AdSense program for publishers. As part of this
          program, Google may use data about your visits to this and other websites to provide
          you with relevant advertisements. For more information, see{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            Google&apos;s advertising policies
          </a>
          .
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="4. Google Analytics">
        <ProseBlock>
          We use <strong style={{ color: "var(--text-bright)" }}>Google Analytics</strong> to
          understand how visitors use our website. Google Analytics collects information such as
          how often users visit the site, what pages they visit, and what other sites they used
          prior to coming to this site. We use this information solely to improve our website.
        </ProseBlock>
        <ProseBlock>
          Google Analytics collects only the IP address assigned to you on the date you visit
          this site, rather than your name or other identifying information. We do not combine
          the information collected through Google Analytics with personally identifiable information.
        </ProseBlock>
        <ProseBlock>
          You can prevent Google Analytics from recognizing you on return visits by disabling
          cookies in your browser, or by installing the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="5. Affiliate Links">
        <ProseBlock>
          {SITE_NAME} contains affiliate links to third-party services such as Vercel, Railway,
          Netlify, and Supabase. If you click an affiliate link and make a purchase, we may earn
          a commission at no extra cost to you. We only recommend services we believe are
          genuinely useful for developers.
        </ProseBlock>
        <ProseBlock>
          Affiliate relationships do not influence the API listings or rankings on this site.
          All APIs are listed based on quality and usefulness, not commercial relationships.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="6. Third-Party Links">
        <ProseBlock>
          {SITE_NAME} links to third-party websites (API documentation, GitHub, etc.). We are
          not responsible for the privacy practices or content of those sites. We encourage you
          to review the privacy policy of any third-party site you visit.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="7. Data Sharing and Disclosure">
        <ProseBlock>We do not sell, trade, or rent your personal information to third parties. We may share information with:</ProseBlock>
        <BulletList items={[
          "Google — for analytics and advertising (as described above)",
          "Service providers — who assist in operating our website (hosting providers)",
          "Legal authorities — if required by law or to protect our rights",
        ]} />
      </Section>

      <Divider />

      <Section title="8. Data Retention">
        <ProseBlock>
          We retain automatically collected analytics data for up to 26 months as configured
          in Google Analytics. Contact form submissions and emails are retained only as long as
          necessary to respond to your inquiry.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="9. Children's Privacy">
        <ProseBlock>
          {SITE_NAME} is not directed to children under the age of 13. We do not knowingly
          collect personally identifiable information from children under 13. If you are a parent
          or guardian and believe your child has provided us with personal information, please
          contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
            {CONTACT_EMAIL}
          </a>{" "}
          and we will take steps to delete such information.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="10. Your Rights">
        <ProseBlock>
          Depending on your location, you may have the following rights regarding your personal data:
        </ProseBlock>
        <BulletList items={[
          "Right to access — request a copy of the data we hold about you",
          "Right to rectification — request correction of inaccurate data",
          "Right to erasure — request deletion of your personal data",
          "Right to object — object to processing of your personal data",
          "Right to data portability — receive your data in a structured format",
          "Right to withdraw consent — where processing is based on consent",
        ]} />
        <ProseBlock>
          To exercise any of these rights, please contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
            {CONTACT_EMAIL}
          </a>
          .
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="11. Changes to This Policy">
        <ProseBlock>
          We may update this Privacy Policy from time to time. We will notify you of any changes
          by updating the &quot;Last Updated&quot; date at the top of this page. We encourage you to review
          this Privacy Policy periodically for any changes. Continued use of {SITE_NAME} after
          any changes constitutes your acceptance of the new policy.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="12. Contact Us">
        <ProseBlock>
          If you have questions about this Privacy Policy, please contact us:
        </ProseBlock>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "1.25rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.85rem",
            lineHeight: 2,
          }}
        >
          <div><span style={{ color: "var(--text-dim)" }}>Name: </span><span style={{ color: "var(--text)" }}>{OWNER}</span></div>
          <div><span style={{ color: "var(--text-dim)" }}>Website: </span><a href={SITE_URL} style={{ color: "var(--accent)" }}>{SITE_URL}</a></div>
          <div><span style={{ color: "var(--text-dim)" }}>Email: </span><a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a></div>
          <div><span style={{ color: "var(--text-dim)" }}>GitHub: </span><a href="https://github.com/HackOrbit/freeapiworld" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>github.com/HackOrbit/freeapiworld</a></div>
        </div>
      </Section>

    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: "var(--border)", margin: "2rem 0" }} />;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "0.5rem" }}>
      <h2
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--accent)",
          margin: "0 0 1rem",
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {children}
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontWeight: 600, color: "var(--text-bright)", margin: 0, fontSize: "0.9rem" }}>
      {children}
    </p>
  );
}

function ProseBlock({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: "var(--text)", fontSize: "0.9rem", lineHeight: 1.85, margin: 0 }}>
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
      {items.map((item) => (
        <li key={item} style={{ color: "var(--text)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "0.2rem" }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

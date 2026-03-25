import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — FreeAPIWorld",
  description:
    "Read the FreeAPIWorld Terms of Service. These terms govern your use of the FreeAPIWorld website and API directory.",
};

const LAST_UPDATED = "march 25, 2026";
const SITE_NAME = "FreeAPIWorld";
const SITE_URL = "https://free-api-world.vercel.app";
const CONTACT_EMAIL = "https://discord.com/invite/GVNnacYENf";
const OWNER = "Sabarna Barik / Hack Orbit";

export default function TermsPage() {
  return (
    <div className="container" style={{ padding: "3rem 1.25rem 5rem", maxWidth: "800px" }}>

      {/* Breadcrumb */}
      <nav style={{ marginBottom: "2rem", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>
        <Link href="/" style={{ color: "var(--text-dim)" }}>home</Link>
        <span style={{ color: "var(--border2)", margin: "0 6px" }}>/</span>
        <span style={{ color: "var(--accent)" }}>terms</span>
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
          Terms of Service
        </h1>
        <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <ProseBlock>
        Please read these Terms of Service (&quot;Terms&quot;) carefully before using {SITE_NAME} located at{" "}
        <a href={SITE_URL} style={{ color: "var(--accent)" }}>{SITE_URL}</a> (the &quot;Service&quot;),
        operated by {OWNER} (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;). Your access to and use of
        the Service is conditioned on your acceptance of and compliance with these Terms. By accessing
        or using the Service, you agree to be bound by these Terms.
      </ProseBlock>

      <Divider />

      <Section title="1. Acceptance of Terms">
        <ProseBlock>
          By accessing or using {SITE_NAME}, you confirm that you are at least 13 years of age,
          have read and understood these Terms, and agree to be bound by them. If you do not agree
          with any part of these Terms, you may not access the Service.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="2. Description of Service">
        <ProseBlock>
          {SITE_NAME} is a free, publicly accessible API directory that indexes publicly available
          third-party APIs. We provide information, documentation links, category listings, and search
          tools to help developers find free public APIs. We do not operate, own, or control any of
          the third-party APIs listed on this platform.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="3. Use of the Service">
        <ProseBlock>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</ProseBlock>
        <BulletList items={[
          "Use the Service in any way that violates applicable local, national, or international laws or regulations",
          "Attempt to gain unauthorized access to any part of the Service or its related systems",
          "Use automated scripts, bots, or scrapers to access the Service in a way that imposes an unreasonable load",
          "Reproduce, duplicate, copy, sell, or resell any part of the Service for commercial purposes without express written permission",
          "Transmit any unsolicited or unauthorized advertising or promotional material",
          "Attempt to decompile, reverse engineer, or disassemble any software on the Service",
          "Submit false, misleading, or fraudulent API submissions or reports",
          "Harass, abuse, or harm other users of the platform or its contributors",
        ]} />
      </Section>

      <Divider />

      <Section title="4. Third-Party APIs and Content">
        <ProseBlock>
          {SITE_NAME} links to and describes third-party APIs, services, and websites that are not
          owned or controlled by us. We have no control over, and assume no responsibility for, the
          content, privacy policies, availability, or practices of any third-party APIs or websites.
        </ProseBlock>
        <ProseBlock>
          We do not guarantee that any API listed on {SITE_NAME} is:
        </ProseBlock>
        <BulletList items={[
          "Currently operational or available",
          "Free from changes in pricing or availability",
          "Accurate or complete in its description",
          "Safe or free from security vulnerabilities",
          "Compliant with your project's requirements or terms",
        ]} />
        <ProseBlock>
          Always review the official documentation and terms of any API you use. Your use of any
          third-party API is governed solely by that API provider&apos;s terms of service.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="5. Intellectual Property">
        <ProseBlock>
          The {SITE_NAME} website — including its design, source code, original written content,
          and data structure — is licensed under the MIT License and is available as open source.
          API data contributed by the community is also open and freely available.
        </ProseBlock>
        <ProseBlock>
          All third-party trademarks, product names, and company names mentioned on {SITE_NAME}
          are the property of their respective owners. Their mention does not imply any affiliation
          with or endorsement by {SITE_NAME}.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="6. Advertising">
        <ProseBlock>
          {SITE_NAME} displays advertisements provided by Google AdSense and may include affiliate
          links to third-party services. These advertisements and affiliate links help support the
          ongoing operation and development of the platform.
        </ProseBlock>
        <ProseBlock>
          We are not responsible for the content of advertisements displayed on our platform.
          Clicking on advertisements or affiliate links may result in third parties collecting
          information about you. Please review the privacy policies of any advertisers or linked
          services before interacting with their content.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="7. User Contributions">
        <ProseBlock>
          Users may suggest new APIs, report issues, or contribute corrections via GitHub. By
          submitting a contribution, you grant {SITE_NAME} a worldwide, royalty-free, perpetual
          license to use, reproduce, modify, and publish the contribution as part of the platform.
        </ProseBlock>
        <ProseBlock>
          You represent that your contributions are accurate to the best of your knowledge and do
          not infringe the intellectual property rights of any third party.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="8. Disclaimer of Warranties">
        <ProseBlock>
          THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES
          OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </ProseBlock>
        <ProseBlock>
          We do not warrant that the Service will be uninterrupted, error-free, or free of viruses
          or other harmful components. We do not warrant the accuracy, completeness, or usefulness
          of any information provided on the Service.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="9. Limitation of Liability">
        <ProseBlock>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, {OWNER.toUpperCase()} SHALL NOT BE
          LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES —
          INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES
          — ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE.
        </ProseBlock>
        <ProseBlock>
          Our total liability to you for any claims arising from these Terms or your use of the
          Service shall not exceed the amount you paid us in the past twelve months (which, for
          a free service, is zero).
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="10. Indemnification">
        <ProseBlock>
          You agree to defend, indemnify, and hold harmless {OWNER} and its contributors from and
          against any claims, damages, obligations, losses, liabilities, costs, or expenses arising
          from your use of the Service, your violation of these Terms, or your violation of any
          third party&apos;s rights.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="11. Governing Law">
        <ProseBlock>
          These Terms shall be governed by and construed in accordance with the laws of India,
          without regard to its conflict of law provisions. Any disputes arising under these Terms
          shall be subject to the exclusive jurisdiction of the courts located in India.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="12. Changes to Terms">
        <ProseBlock>
          We reserve the right to modify these Terms at any time. We will notify users of significant
          changes by updating the &quot;Last Updated&quot; date at the top of this page. Your continued use
          of the Service after any changes constitutes acceptance of the new Terms. We encourage you
          to review these Terms periodically.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="13. Termination">
        <ProseBlock>
          We reserve the right to terminate or suspend access to the Service immediately, without
          prior notice, for conduct that we believe violates these Terms or is harmful to other
          users, us, or third parties, or for any other reason at our sole discretion.
        </ProseBlock>
      </Section>

      <Divider />

      <Section title="14. Contact Us">
        <ProseBlock>
          If you have questions or concerns about these Terms, please contact us:
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
        <ProseBlock>
          Also see our <Link href="/privacy" style={{ color: "var(--accent)" }}>Privacy Policy</Link> and{" "}
          <Link href="/contact" style={{ color: "var(--accent)" }}>Contact page</Link>.
        </ProseBlock>
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

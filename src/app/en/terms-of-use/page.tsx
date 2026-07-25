import { Metadata } from "next";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";

export const metadata: Metadata = {
  title: "Terms of Use - Atacadinho da Rafa",
  description: "Terms of Use of Atacadinho da Rafa. Rules and conditions for using the site.",
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-200/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#F4A7B9] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
            Legal
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-lg text-gray-300 md:text-xl">
            Last updated: July 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-[#F4A7B9]">
            <h2>1. Acceptance of terms</h2>
            <p className="text-gray-300">
              By accessing and using the <strong className="text-white">Atacadinho da Rafa</strong> site, you agree to comply with these Terms of Use. If you do not agree with any part of these terms, please do not use our site.
            </p>

            <h2 className="text-white">2. Service description</h2>
            <p className="text-gray-300">
              Atacadinho da Rafa is a product curation platform that offers informative content, recommendations and affiliate links to products available on marketplaces such as Shopee, Mercado Livre, Amazon and others.
            </p>
            <p className="text-gray-300">
              <strong className="text-white">We are not an online store</strong>. We do not sell products directly. The site works as a guide for finds and deals, directing the user to partner sales platforms.
            </p>

            <h2 className="text-white">3. Use of the site</h2>
            <p className="text-gray-300">
              You agree to use this site only for legitimate purposes and in accordance with these Terms of Use. It is prohibited:
            </p>
            <ul className="text-gray-300">
              <li>Using the site for illegal or unauthorized activities</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Reproducing, duplicating or copying content without permission</li>
              <li>Using robots, spiders or other automated methods to access the site</li>
              <li>Interfering with or disrupting the operation of the site</li>
            </ul>

            <h2 className="text-white">4. Intellectual property</h2>
            <p className="text-gray-300">
              All content of Atacadinho da Rafa — including texts, images, logos, design and code — is protected by copyright and other intellectual property laws. You may view and share content for non-commercial purposes, provided you attribute due authorship.
            </p>

            <h2 className="text-white">5. Affiliate links</h2>
            <p className="text-gray-300">
              The site contains affiliate links. This means we may receive a commission if you make a purchase through these links. This commission does not change the final price of the product for you.
            </p>
            <p className="text-gray-300">
              We operate with transparency and only recommend products we believe are relevant to our community. The purchase decision is always yours.
            </p>

            <h2 className="text-white">6. Disclaimer</h2>
            <p className="text-gray-300">
              The site's content is provided "as is". We do not guarantee the accuracy, completeness or timeliness of the information. Prices, availability and product features may be changed by sales platforms at any time without notice.
            </p>
            <p className="text-gray-300">
              We are not responsible for:
            </p>
            <ul className="text-gray-300">
              <li>Errors or omissions in the content</li>
              <li>Damages resulting from the use or inability to use the site</li>
              <li>Content of third-party sites linked</li>
              <li>Financial losses resulting from purchases</li>
            </ul>

            <h2 className="text-white">7. Privacy</h2>
            <p className="text-gray-300">
              Your privacy is important to us. Our <LocaleAwareLink href="/privacy-policy" className="text-[#F4A7B9] hover:text-white">Privacy Policy</LocaleAwareLink> describes how we collect, use and protect your information.
            </p>

            <h2 className="text-white">8. Changes to terms</h2>
            <p className="text-gray-300">
              We reserve the right to change these Terms of Use at any time. Changes will take effect immediately upon publication. We recommend that you review this page periodically.
            </p>

            <h2 className="text-white">9. Applicable law</h2>
            <p className="text-gray-300">
              These terms are governed by Brazilian law. Any disputes will be resolved in the competent courts of Brazil.
            </p>

            <h2 className="text-white">10. Contact</h2>
            <p className="text-gray-300">
              For questions related to these Terms of Use, contact us:
            </p>
            <ul className="text-gray-300">
              <li>Email: <a href="mailto:atacadinhodarafa@hotmail.com" className="text-[#F4A7B9] hover:text-white">atacadinhodarafa@hotmail.com</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Atacadinho da Rafa",
  description: "Privacy Policy of Atacadinho da Rafa. Learn how we protect your data and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-200/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#F4A7B9] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
            Transparency
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-300 md:text-xl">
            Last updated: July 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-[#F4A7B9]">
            <h2>1. Information we collect</h2>
            <p className="text-gray-300">
              We collect minimal information for the site to function. This includes basic browsing data, such as pages visited and time spent, solely to improve your experience.
            </p>
            <p className="text-gray-300">
              <strong className="text-white">We do not sell, rent or share your personal data with third parties</strong>, except when required by law or to process payments (in this case, only information necessary for the transaction).
            </p>

            <h2 className="text-white">2. Cookies</h2>
            <p className="text-gray-300">
              We use cookies to improve your browsing experience, remember your preferences and analyze site traffic. You can disable cookies in your browser settings, but some features may not work correctly.
            </p>
            <ul className="text-gray-300">
              <li><strong className="text-white">Essential cookies</strong>: necessary for basic site operation</li>
              <li><strong className="text-white">Analytics cookies</strong>: help us understand how visitors use the site</li>
              <li><strong className="text-white">Marketing cookies</strong>: used to personalize ads</li>
            </ul>

            <h2 className="text-white">3. Affiliate links</h2>
            <p className="text-gray-300">
              Some links on this site are affiliate links. This means we may receive a commission if you make a purchase through these links, <strong className="text-white">at no extra cost to you</strong>.
            </p>
            <p className="text-gray-300">
              We work with platforms like Shopee, Mercado Livre, Amazon and others. Product prices and availability are updated regularly, but may change without notice.
            </p>

            <h2 className="text-white">4. Security</h2>
            <p className="text-gray-300">
              We implement security measures to protect your information. However, no method of transmission over the internet is 100% secure. We do our best to protect your data, but cannot guarantee absolute security.
            </p>

            <h2 className="text-white">5. Your rights</h2>
            <p className="text-gray-300">
              You have the right to access, correct or delete your personal data at any time. To exercise these rights, contact us by email at <a href="mailto:atacadinhodarafa@hotmail.com" className="text-[#F4A7B9] hover:text-white">atacadinhodarafa@hotmail.com</a>.
            </p>

            <h2 className="text-white">6. Changes to this policy</h2>
            <p className="text-gray-300">
              We may update this policy periodically. The date of the last update is at the top of this page. We recommend that you review this policy regularly to stay informed.
            </p>

            <h2 className="text-white">7. Contact</h2>
            <p className="text-gray-300">
              If you have questions about this Privacy Policy, contact us:
            </p>
            <ul className="text-gray-300">
              <li>Email: <a href="mailto:atacadinhodarafa@hotmail.com" className="text-[#F4A7B9] hover:text-white">atacadinhodarafa@hotmail.com</a></li>
              <li>Instagram: <a href="https://instagram.com/atacadinhodarafa" target="_blank" rel="noopener noreferrer" className="text-[#F4A7B9] hover:text-white">@atacadinhodarafa</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

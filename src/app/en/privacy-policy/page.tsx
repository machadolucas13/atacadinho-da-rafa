import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Atacadinho da Rafa.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>

      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>
          This Privacy Policy describes how Atacadinho da Rafa collects, uses, and protects
          visitor and user information on the site.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Information we collect</h2>
        <p>
          We may collect non-personal identification information such as browser type,
          operating system, pages visited, and time on site through tools like Google Analytics.
        </p>
        <p>
          If you contact us, we may receive and store the name and email you provide.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">How we use information</h2>
        <p>
          We use this information to improve content, user experience, and, when applicable,
          respond to contact form submissions.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Cookies</h2>
        <p>
          The site may use cookies to improve browsing and for analytics and advertising
          services. You can disable cookies in your browser settings.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Affiliate links</h2>
        <p>
          We may participate in affiliate programs. These links may use cookies to track
          referrals. This does not change the final price for you.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Changes</h2>
        <p>
          We may update this policy periodically. Please review it from time to time.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Contact</h2>
        <p>
          If you have questions, contact us at{" "}
          <a className="text-[#F4A7B9] hover:underline" href="mailto:contato@atacadinhodarafa.vercel.app">
            contato@atacadinhodarafa.vercel.app
          </a>
          .
        </p>
      </div>
    </div>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosure",
  description: "Disclosure about affiliate links and sponsored content on Atacadinho da Rafa.",
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Disclosure</h1>

      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>
          Atacadinho da Rafa may participate in affiliate programs and receive commissions
          for purchases made through links indicated in our content.
        </p>
        <p>
          This does not change the final price for you. The commission received helps
          maintain the site and continue producing free curation and tips.
        </p>
        <p>
          We only recommend products and services we consider relevant and that we believe
          add value to our readers.
        </p>
        <p>
          Some posts may include sponsored content or paid partnerships. When this happens,
          it will be clearly indicated in the text.
        </p>
        <p>
          If you have questions, also see our{" "}
          <a className="text-[#F4A7B9] hover:underline" href="/en/privacy-policy">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a className="text-[#F4A7B9] hover:underline" href="/en/terms-of-use">
            Terms of Use
          </a>
          .
        </p>
      </div>
    </div>
  );
}

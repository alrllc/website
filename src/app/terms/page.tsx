import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function TermsPage() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-10 text-slate-950">
      <article className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Link className="text-sm font-black text-[#0f4c81]" href="/">
          Back to website
        </Link>
        <h1 className="mt-6 text-4xl font-black">Terms of Use</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-black text-slate-950">
              Website Use
            </h2>
            <p className="mt-2">
              This website provides information about {content.brand.name} and
              its career counseling, career coaching, resume enhancement, and
              workforce education services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">
              No Guaranteed Outcome
            </h2>
            <p className="mt-2">
              Career counseling and coaching can support decision-making,
              preparation, and confidence, but they do not guarantee employment,
              interviews, promotions, admissions, or specific career outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">
              Consultation Requests
            </h2>
            <p className="mt-2">
              Submitting a contact form does not create a client relationship.
              A service relationship begins only after both parties agree to the
              scope, timing, and terms of support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">
              Website Content
            </h2>
            <p className="mt-2">
              Website content is provided for general informational purposes and
              should not be treated as legal, financial, medical, or employment
              advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to {content.contact.email}
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

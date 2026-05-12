import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-10 text-slate-950">
      <article className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Link className="text-sm font-black text-[#0f4c81]" href="/">
          Back to website
        </Link>
        <h1 className="mt-6 text-4xl font-black">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-black text-slate-950">
              Information We Collect
            </h2>
            <p className="mt-2">
              When you submit a consultation request, {content.brand.name} may
              collect your name, email address, career goal, message, and the
              date your request was received.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">
              How We Use Information
            </h2>
            <p className="mt-2">
              We use submitted information to respond to inquiries, schedule
              consultation conversations, understand the type of career support
              requested, and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">
              Sharing Information
            </h2>
            <p className="mt-2">
              We do not sell personal information. Information may be shared
              only with service providers used to operate the website, manage
              communications, or support scheduling.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">Data Security</h2>
            <p className="mt-2">
              We take reasonable steps to protect submitted information. No
              online system can guarantee absolute security, so please avoid
              submitting sensitive personal, financial, or medical information
              through the contact form.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">Contact</h2>
            <p className="mt-2">
              Questions about this policy can be sent to {content.contact.email}
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

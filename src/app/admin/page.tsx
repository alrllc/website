import Link from "next/link";
import { AdminEditor } from "@/components/admin-editor";
import { getSiteContent } from "@/lib/site-content";
import { getConsultationSubmissions } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [content, submissions] = await Promise.all([
    getSiteContent(),
    getConsultationSubmissions(),
  ]);

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0f4c81]">
              ALR backend
            </p>
            <h1 className="mt-2 text-4xl font-black">Website Content Editor</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Edit key website content, save it to the backend, and refresh the
              public site to see changes.
            </p>
          </div>
          <Link
            className="w-fit rounded-md bg-[#0f4c81] px-5 py-3 text-sm font-black text-white"
            href="/"
          >
            View Website
          </Link>
        </div>

        <AdminEditor initialContent={content} submissions={submissions} />
      </div>
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";
import type { SiteContent } from "@/lib/site-content";
import type { ConsultationSubmission } from "@/lib/submissions";

type Props = {
  initialContent: SiteContent;
  submissions: ConsultationSubmission[];
};

type SaveState = "idle" | "saving" | "saved" | "error";

function Field({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      {textarea ? (
        <textarea
          className="min-h-28 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-normal leading-6 outline-none focus:border-[#0f4c81] focus:ring-4 focus:ring-[#0f4c81]/10"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-[#0f4c81] focus:ring-4 focus:ring-[#0f4c81]/10"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function updateJsonText<T>(
  value: string,
  fallback: T,
  setter: (value: T) => void,
) {
  try {
    setter(JSON.parse(value) as T);
  } catch {
    setter(fallback);
  }
}

export function AdminEditor({ initialContent, submissions }: Props) {
  const [content, setContent] = useState(initialContent);
  const [jsonText, setJsonText] = useState(
    JSON.stringify(initialContent, null, 2),
  );
  const [state, setState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const jsonIsValid = useMemo(() => {
    try {
      JSON.parse(jsonText);
      return true;
    } catch {
      return false;
    }
  }, [jsonText]);

  function syncJson(nextContent: SiteContent) {
    setContent(nextContent);
    setJsonText(JSON.stringify(nextContent, null, 2));
  }

  async function saveContent(contentToSave = content) {
    setState("saving");
    setMessage("");

    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contentToSave),
    });

    if (response.ok) {
      setState("saved");
      setMessage("Saved. Refresh the public site to see updates.");
      return;
    }

    const payload = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    setState("error");
    setMessage(payload?.error ?? "Could not save content.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">Quick Edit</h2>
            <p className="mt-1 text-sm text-slate-600">
              Common homepage fields.
            </p>
          </div>
          <button
            className="rounded-md bg-[#0f4c81] px-5 py-3 text-sm font-black text-white disabled:bg-slate-400"
            disabled={state === "saving"}
            onClick={() => saveContent()}
            type="button"
          >
            {state === "saving" ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-4 rounded-lg bg-slate-50 p-4 md:grid-cols-2">
            <Field
              label="Hero eyebrow"
              value={content.hero.eyebrow}
              onChange={(value) =>
                syncJson({ ...content, hero: { ...content.hero, eyebrow: value } })
              }
            />
            <Field
              label="Hero primary CTA"
              value={content.hero.primaryCta}
              onChange={(value) =>
                syncJson({
                  ...content,
                  hero: { ...content.hero, primaryCta: value },
                })
              }
            />
            <Field
              label="Hero headline"
              value={content.hero.headline}
              onChange={(value) =>
                syncJson({ ...content, hero: { ...content.hero, headline: value } })
              }
            />
            <Field
              label="Booking URL"
              value={content.contact.bookingUrl}
              onChange={(value) =>
                syncJson({
                  ...content,
                  contact: { ...content.contact, bookingUrl: value },
                })
              }
            />
            <Field
              label="Hero subheadline"
              textarea
              value={content.hero.subheadline}
              onChange={(value) =>
                syncJson({
                  ...content,
                  hero: { ...content.hero, subheadline: value },
                })
              }
            />
            <Field
              label="Audience line"
              textarea
              value={content.hero.audience}
              onChange={(value) =>
                syncJson({ ...content, hero: { ...content.hero, audience: value } })
              }
            />
          </div>

          <div className="grid gap-4 rounded-lg bg-slate-50 p-4 md:grid-cols-2">
            <Field
              label="Services headline"
              textarea
              value={content.servicesIntro.headline}
              onChange={(value) =>
                syncJson({
                  ...content,
                  servicesIntro: { ...content.servicesIntro, headline: value },
                })
              }
            />
            <Field
              label="Vision headline"
              value={content.vision.headline}
              onChange={(value) =>
                syncJson({
                  ...content,
                  vision: { ...content.vision, headline: value },
                })
              }
            />
            <Field
              label="Contact phone"
              value={content.contact.phone}
              onChange={(value) =>
                syncJson({
                  ...content,
                  contact: { ...content.contact, phone: value },
                })
              }
            />
            <Field
              label="Contact email"
              value={content.contact.email}
              onChange={(value) =>
                syncJson({
                  ...content,
                  contact: { ...content.contact, email: value },
                })
              }
            />
          </div>
        </div>

        {message ? (
          <p
            className={`mt-4 text-sm font-bold ${
              state === "error" ? "text-red-700" : "text-[#0f4c81]"
            }`}
          >
            {message}
          </p>
        ) : null}
      </section>

      <aside className="grid gap-6">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black">Raw Content JSON</h2>
          <p className="mt-1 text-sm text-slate-600">
            Edit advanced sections like services, paths, process steps, and
            vision bullets.
          </p>
          <textarea
            className="mt-4 min-h-[420px] w-full rounded-md border border-slate-300 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 outline-none focus:border-[#f6c453]"
            value={jsonText}
            onChange={(event) => {
              const value = event.target.value;
              setJsonText(value);
              updateJsonText(value, content, setContent);
            }}
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              className="rounded-md bg-[#0f4c81] px-5 py-3 text-sm font-black text-white disabled:bg-slate-400"
              disabled={!jsonIsValid || state === "saving"}
              onClick={() => saveContent(JSON.parse(jsonText) as SiteContent)}
              type="button"
            >
              Save JSON
            </button>
            <p
              className={`text-sm font-bold ${
                jsonIsValid ? "text-emerald-700" : "text-red-700"
              }`}
            >
              {jsonIsValid ? "JSON is valid" : "JSON has an error"}
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black">Consultation Leads</h2>
          <div className="mt-4 grid gap-3">
            {submissions.length ? (
              submissions.slice(0, 6).map((submission) => (
                <article
                  className="rounded-md border border-slate-200 bg-slate-50 p-4"
                  key={`${submission.email}-${submission.receivedAt}`}
                >
                  <p className="font-black">{submission.name}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {submission.email} | {submission.goal}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {submission.message}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-sm text-slate-600">No leads yet.</p>
            )}
          </div>
        </section>
      </aside>
    </div>
  );
}

"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export function ConsultationForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    if (response.ok) {
      setState("success");
      setMessage("Thanks. Your request was received.");
      form.reset();
      return;
    }

    const payload = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    setState("error");
    setMessage(payload?.error ?? "Something went wrong. Please try again.");
  }

  return (
    <form
      className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-xl"
      onSubmit={handleSubmit}
    >
      <label className="grid gap-2 text-sm font-bold">
        Name
        <input
          className="min-h-12 rounded-md border border-slate-300 bg-slate-50 px-4 text-base font-normal outline-none transition focus:border-[#0f4c81] focus:bg-white focus:ring-4 focus:ring-[#0f4c81]/10"
          name="name"
          required
          type="text"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Email
        <input
          className="min-h-12 rounded-md border border-slate-300 bg-slate-50 px-4 text-base font-normal outline-none transition focus:border-[#0f4c81] focus:bg-white focus:ring-4 focus:ring-[#0f4c81]/10"
          name="email"
          required
          type="email"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Career goal
        <select
          className="min-h-12 rounded-md border border-slate-300 bg-slate-50 px-4 text-base font-normal outline-none transition focus:border-[#0f4c81] focus:bg-white focus:ring-4 focus:ring-[#0f4c81]/10"
          name="goal"
          required
        >
          <option value="">Choose one</option>
          <option>Career direction</option>
          <option>Resume or LinkedIn help</option>
          <option>Interview coaching</option>
          <option>Job search strategy</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Message
        <textarea
          className="min-h-36 rounded-md border border-slate-300 bg-slate-50 px-4 py-3 text-base font-normal outline-none transition focus:border-[#0f4c81] focus:bg-white focus:ring-4 focus:ring-[#0f4c81]/10"
          name="message"
          required
        />
      </label>
      <button
        className="min-h-12 rounded-md bg-[#0f4c81] px-5 text-sm font-black text-white transition hover:bg-[#0b3b65] disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={state === "loading"}
        type="submit"
      >
        {state === "loading" ? "Sending..." : "Send Request"}
      </button>
      {message ? (
        <p
          className={`text-sm font-semibold ${
            state === "error" ? "text-[#a33b2b]" : "text-[#0f4c81]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

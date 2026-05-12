import Image from "next/image";
import Link from "next/link";
import { ConsultationForm } from "@/components/consultation-form";
import { LiveMotion } from "@/components/live-motion";
import { ScrollEffects } from "@/components/scroll-effects";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  const bookingUrl = content.contact.bookingUrl || "#contact";

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#111827]">
      <ScrollEffects />
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a className="flex items-center gap-3" href="#home">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-[#0f4c81] text-sm font-black text-white">
              {content.brand.shortName}
            </span>
            <span className="text-sm font-black uppercase leading-4 tracking-wide text-[#0f4c81]">
              ALR Career
              <br />
              Consulting LLC
            </span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
            <a className="transition hover:text-[#0f4c81]" href="#services">
              Services
            </a>
            <a className="transition hover:text-[#0f4c81]" href="#paths">
              Paths
            </a>
            <a className="transition hover:text-[#0f4c81]" href="#vision">
              Vision
            </a>
            <Link className="transition hover:text-[#0f4c81]" href="/studio">
              Edit
            </Link>
          </div>
          <a
            className="pulse-button rounded-md bg-[#0f4c81] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0b3b65]"
            href={bookingUrl}
          >
            Free Call
          </a>
        </nav>
      </header>

      <section id="home" className="relative overflow-hidden bg-[#0b1220]">
        <Image
          alt="Professional holding a laptop in a city setting"
          className="hero-image object-cover opacity-40"
          fill
          priority
          sizes="100vw"
          src={content.hero.image}
        />
        <div className="hero-mesh" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-end gap-10 px-5 pb-12 pt-28 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pb-20">
          <div className="max-w-3xl" data-reveal>
            <p className="mb-5 inline-flex rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f6c453]">
              {content.hero.eyebrow}
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] text-white sm:text-7xl">
              {content.hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-[#d8e7f3]">
              {content.hero.subheadline}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/78">
              {content.hero.audience}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="cta-glow rounded-md bg-[#f6c453] px-6 py-3 text-center text-sm font-black text-[#111827] transition hover:bg-[#eab23f]"
                href={bookingUrl}
              >
                {content.hero.primaryCta}
              </a>
              <a
                className="rounded-md border border-white/25 bg-white/10 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-white/18"
                href="#services"
              >
                {content.hero.secondaryCta}
              </a>
            </div>
          </div>

          <aside
            className="float-card rounded-lg border border-white/16 bg-white/12 p-6 text-white shadow-2xl backdrop-blur-md"
            data-reveal
          >
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f6c453]">
              {content.heroPanel.eyebrow}
            </p>
            <p className="mt-4 text-2xl font-bold leading-9">
              {content.heroPanel.headline}
            </p>
            <div className="mt-6 grid gap-3 text-sm text-[#d8e7f3] sm:grid-cols-2">
              {content.heroPanel.chips.map((chip) => (
                <span className="rounded-md bg-white/10 px-3 py-2" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
            <div className="mt-7 rounded-md border border-white/12 bg-[#0b1220]/35 p-4">
              <div className="career-path">
                {content.journey.steps.map((step) => (
                  <div className="career-path-step" key={step}>
                    <span />
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <LiveMotion />
          </aside>
        </div>
      </section>

      <section className="ticker-strip border-y border-[#0f4c81]/15 bg-white">
        <div className="ticker-track py-4 text-sm font-black uppercase tracking-[0.18em] text-[#0f4c81]">
          {[...content.services, ...content.services, ...content.services].map(
            (service, index) => (
              <span key={`${service.title}-${index}`}>{service.title}</span>
            ),
          )}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-20">
        <div
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
          data-reveal
        >
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0f4c81]">
              {content.servicesIntro.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950">
              {content.servicesIntro.headline}
            </h2>
          </div>
          <a
            className="w-fit rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-[#0f4c81] hover:text-[#0f4c81]"
            href={bookingUrl}
          >
            {content.servicesIntro.cta}
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.services.map((service, index) => (
            <article
              className="interactive-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              data-reveal
              key={service.title}
            >
              <p className="text-sm font-black text-[#d18a00]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-8 text-xl font-black text-slate-950">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {service.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="paths" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-3xl" data-reveal>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0f4c81]">
              {content.servicePaths.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950">
              {content.servicePaths.headline}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {content.servicePaths.items.map((item) => (
              <article
                className="path-card rounded-xl border border-slate-200 bg-[#f8fafc] p-6"
                data-reveal
                key={item.title}
              >
                <h3 className="text-xl font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.body}
                </p>
                <a
                  className="mt-6 inline-flex text-sm font-black text-[#0f4c81]"
                  href={bookingUrl}
                >
                  Start here
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="journey-panel grid gap-8 rounded-xl bg-[#0f4c81] p-6 text-white shadow-2xl md:grid-cols-[0.75fr_1.25fr] md:p-8">
          <div data-reveal>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#f6c453]">
              {content.journey.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              {content.journey.headline}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.journey.steps.map((step, index) => (
              <article
                className="journey-step rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur"
                data-reveal
                key={step}
              >
                <p className="text-sm font-black text-[#f6c453]">
                  0{index + 1}
                </p>
                <h3 className="mt-5 text-xl font-black">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0f4c81]">
              {content.expectations.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950">
              {content.expectations.headline}
            </h2>
          </div>
          <div className="grid gap-3">
            {content.expectations.items.map((item, index) => (
              <article
                className="expect-card rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                data-reveal
                key={item}
              >
                <p className="text-sm font-black text-[#d18a00]">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-base font-bold leading-7 text-slate-800">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-3xl" data-reveal>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0f4c81]">
              {content.vision.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950">
              {content.vision.headline}
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.vision.words.map((item) => (
              <article
                className="interactive-card rounded-lg border border-slate-200 bg-[#f8fafc] p-6"
                data-reveal
                key={item.word}
              >
                <h3 className="text-3xl font-black text-[#0f4c81]">
                  {item.word}
                </h3>
                <p className="mt-4 min-h-20 text-base font-bold leading-7 text-slate-950">
                  {item.lead}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-600">
                  {item.bullets.map((bullet) => (
                    <li className="border-l-2 border-[#f6c453] pl-3" key={bullet}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0f4c81]">
              {content.about.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950">
              {content.about.headline}
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-600">
              {content.about.body}
            </p>
          </div>

          <div className="grid gap-4">
            {content.about.statements.map((statement) => (
              <article
                className="interactive-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                data-reveal
                key={statement.title}
              >
                <h3 className="text-xl font-black text-slate-950">
                  {statement.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {statement.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0b1220]">
        <Image
          alt="Career consulting group working together at a table"
          className="object-cover opacity-32"
          fill
          sizes="100vw"
          src={content.cta.image}
        />
        <div
          className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-24 text-white md:flex-row md:items-center md:justify-between"
          data-reveal
        >
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#f6c453]">
              {content.cta.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight">
              {content.cta.headline}
            </h2>
          </div>
          <a
            className="cta-glow rounded-md bg-[#f6c453] px-6 py-3 text-sm font-black text-[#111827] transition hover:bg-[#eab23f]"
            href={bookingUrl}
          >
            {content.cta.button}
          </a>
        </div>
      </section>

      <section id="contact" className="bg-[#eef6fb]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0f4c81]">
              {content.contact.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950">
              {content.contact.headline}
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-600">
              {content.contact.body}
            </p>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-slate-700">
              <p>Phone: {content.contact.phone}</p>
              <p>Email: {content.contact.email}</p>
            </div>
          </div>
          <div data-reveal>
            <ConsultationForm />
          </div>
        </div>
      </section>

      <section id="admin" className="border-t border-slate-200 bg-white px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0f4c81]">
              Website backend
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Edit the site content from Sanity Studio.
            </h2>
          </div>
          <Link
            className="w-fit rounded-md bg-[#0f4c81] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0b3b65]"
            href="/studio"
          >
            Open Sanity Studio
          </Link>
        </div>
      </section>

      <footer className="bg-[#0b1220] px-5 py-6 text-sm text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p>{content.brand.footer}</p>
          <div className="flex justify-center gap-5 font-bold">
            <Link className="transition hover:text-white" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="transition hover:text-white" href="/terms">
              Terms of Use
            </Link>
          </div>
        </div>
      </footer>

      <a
        className="sticky-cta rounded-md bg-[#f6c453] px-5 py-3 text-sm font-black text-[#111827] shadow-2xl"
        href={bookingUrl}
      >
        {content.cta.button}
      </a>
    </main>
  );
}

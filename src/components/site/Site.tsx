import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, ExternalLink, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KB_LABEL, OFFICIAL, type KbEntry } from "@/lib/kb";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/standards", label: "Standards" },
  { to: "/certification", label: "Certification" },
  { to: "/testing-labs", label: "Testing Labs" },
  { to: "/hallmarking", label: "Hallmarking" },
  { to: "/consumer-help", label: "Consumer Help" },
  { to: "/ask", label: "Ask BIS Chat" },
] as const;

export function DemoBadge() {
  return (
    <Badge variant="outline" className="gap-1 border-accent-foreground/40 bg-accent text-accent-foreground">
      <Database className="h-3 w-3" aria-hidden /> {KB_LABEL}
    </Badge>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card">
      <div className="h-1 bg-[var(--saffron)]" aria-hidden />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3" aria-label="BIS Intelligent Assistant home">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">BIS</span>
          <span className="leading-tight">
            <span className="block font-semibold">BIS Intelligent Assistant</span>
            <span className="block text-xs text-muted-foreground">SIH 2026 prototype · not an official BIS service</span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-1 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "bg-secondary font-medium text-primary" }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="rounded-md p-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-border lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-secondary">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm md:grid-cols-2">
        <div>
          <p className="font-semibold">BIS Intelligent Assistant — Smart India Hackathon 2026 prototype</p>
          <p className="mt-2 opacity-80">
            Independent student project. Not affiliated with or endorsed by the Bureau of Indian Standards. Content shown is from a{" "}
            {KB_LABEL} and must be verified with official sources.
          </p>
        </div>
        <div className="md:text-right">
          <a href={OFFICIAL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
            Official BIS website <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <DemoBadge />
        <h1 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{intro}</p>
        {children}
      </div>
    </section>
  );
}

export function EntryCards({ entries }: { entries: KbEntry[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {entries.map((e) => (
        <article key={e.id} className="card-surface p-5">
          <h2 className="text-lg font-semibold">{e.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
          <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-primary underline">
            {e.sourceLabel} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </article>
      ))}
    </div>
  );
}

export function AskCta({ q }: { q: string }) {
  return (
    <div className="card-surface mt-8 flex flex-col items-start justify-between gap-3 p-5 sm:flex-row sm:items-center">
      <p className="text-sm">Have a question on this topic? Get a source-backed answer.</p>
      <Link to="/ask" search={{ q }} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Ask BIS Chat
      </Link>
    </div>
  );
}

export function TopicPage({ title, intro, entries, q }: { title: string; intro: string; entries: KbEntry[]; q: string }) {
  return (
    <>
      <PageHero title={title} intro={intro} />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <EntryCards entries={entries} />
        <AskCta q={q} />
      </div>
    </>
  );
}

export const meta = (title: string, description: string) => [
  { title },
  { name: "description", content: description },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary" },
];

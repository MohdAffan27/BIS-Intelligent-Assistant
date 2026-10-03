import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, BadgeCheck, FlaskConical, Gem, LifeBuoy, MessageSquare } from "lucide-react";
import { DemoBadge, meta } from "@/components/site/Site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: meta(
      "BIS Intelligent Assistant — SIH 2026",
      "A source-backed AI help portal prototype for Indian Standards, certification, testing labs, hallmarking and consumer help.",
    ),
  }),
  component: Home,
});

const CARDS = [
  { to: "/standards", label: "Standards", icon: BookOpen, d: "Understand Indian Standards and how to find them." },
  { to: "/certification", label: "Certification", icon: BadgeCheck, d: "Orientation on product certification and the ISI mark." },
  { to: "/testing-labs", label: "Testing Labs", icon: FlaskConical, d: "Where product testing happens and how to find labs." },
  { to: "/hallmarking", label: "Hallmarking", icon: Gem, d: "Purity marking for gold and silver, and HUID checks." },
  { to: "/consumer-help", label: "Consumer Help", icon: LifeBuoy, d: "Verify products and raise complaints." },
  { to: "/ask", label: "Ask BIS Chat", icon: MessageSquare, d: "Ask in plain language, get answers with sources." },
] as const;

function Home() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <DemoBadge />
            <h1 className="mt-4 text-4xl font-bold leading-tight text-primary sm:text-5xl">Quality questions, answered with sources.</h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              A Smart India Hackathon 2026 prototype that helps citizens and manufacturers navigate standards, certification and hallmarking —
              and never answers without a source.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/ask" className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:bg-primary/90">Ask BIS Chat</Link>
              <Link to="/consumer-help" className="rounded-md border border-border px-5 py-2.5 font-medium hover:bg-secondary">Consumer Help</Link>
            </div>
          </div>
          <div className="card-surface p-5 text-sm">
            <p className="font-semibold">How answers work</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
              <li>Your question is matched against the knowledge base on the server.</li>
              <li>Only retrieved passages are used — numbered citations link to each source.</li>
              <li>If nothing matches, the assistant says so and points to the official website.</li>
            </ol>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Explore services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ to, label, icon: Icon, d }) => (
            <Link key={to} to={to} className="card-surface group p-5 transition-colors hover:border-primary">
              <Icon className="h-6 w-6 text-accent-foreground" aria-hidden />
              <h3 className="mt-3 text-lg font-semibold group-hover:text-primary">{label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageHero, meta } from "@/components/site/Site";
import { ChatPanel } from "@/components/site/ChatPanel";

export const Route = createFileRoute("/ask")({
  validateSearch: z.object({ q: z.string().max(500).optional() }),
  head: () => ({ meta: meta("Ask BIS Chat — BIS Intelligent Assistant", "Ask questions about BIS standards, certification and hallmarking and get answers with cited sources.") }),
  component: Ask,
});

function Ask() {
  const { q } = Route.useSearch();
  return (
    <>
      <PageHero title="Ask BIS Chat" intro="Ask in plain language. Every answer cites its sources; unsupported questions are declined rather than guessed." />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <ChatPanel initial={q} />
      </div>
    </>
  );
}

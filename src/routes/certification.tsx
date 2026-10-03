import { createFileRoute } from "@tanstack/react-router";
import { TopicPage, meta } from "@/components/site/Site";
import { topicEntries } from "@/lib/kb";

export const Route = createFileRoute("/certification")({
  head: () => ({ meta: meta("Certification — BIS Intelligent Assistant", "General overview of BIS product certification. Confirm eligibility, documents and fees on official sources.") }),
  component: () => <TopicPage title="Certification" intro="General overview of BIS product certification. Confirm eligibility, documents and fees on official sources." entries={topicEntries("certification")} q="What is BIS product certification?" />,
});

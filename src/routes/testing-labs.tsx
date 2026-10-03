import { createFileRoute } from "@tanstack/react-router";
import { TopicPage, meta } from "@/components/site/Site";
import { topicEntries } from "@/lib/kb";

export const Route = createFileRoute("/testing-labs")({
  head: () => ({ meta: meta("Testing Labs — BIS Intelligent Assistant", "How product testing fits into certification and where to find recognised laboratories.") }),
  component: () => <TopicPage title="Testing Labs" intro="How product testing fits into certification and where to find recognised laboratories." entries={topicEntries("labs")} q="Where can my product be tested?" />,
});

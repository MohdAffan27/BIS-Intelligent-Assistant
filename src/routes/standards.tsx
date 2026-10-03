import { createFileRoute } from "@tanstack/react-router";
import { TopicPage, meta } from "@/components/site/Site";
import { topicEntries } from "@/lib/kb";

export const Route = createFileRoute("/standards")({
  head: () => ({ meta: meta("Standards — BIS Intelligent Assistant", "Orientation on Indian Standards and how to look up the one that applies to your product.") }),
  component: () => <TopicPage title="Standards" intro="Orientation on Indian Standards and how to look up the one that applies to your product." entries={topicEntries("standards")} q="How do I find the standard for my product?" />,
});

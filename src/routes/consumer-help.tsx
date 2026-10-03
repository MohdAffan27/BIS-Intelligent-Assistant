import { createFileRoute } from "@tanstack/react-router";
import { TopicPage, meta } from "@/components/site/Site";
import { topicEntries } from "@/lib/kb";

export const Route = createFileRoute("/consumer-help")({
  head: () => ({ meta: meta("Consumer Help — BIS Intelligent Assistant", "Check whether a marked product is genuine and learn how to raise a complaint.") }),
  component: () => <TopicPage title="Consumer Help" intro="Check whether a marked product is genuine and learn how to raise a complaint." entries={topicEntries("consumer")} q="How do I raise a complaint about a product?" />,
});

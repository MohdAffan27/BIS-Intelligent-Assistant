import { createFileRoute } from "@tanstack/react-router";
import { TopicPage, meta } from "@/components/site/Site";
import { topicEntries } from "@/lib/kb";

export const Route = createFileRoute("/hallmarking")({
  head: () => ({ meta: meta("Hallmarking — BIS Intelligent Assistant", "Understand hallmarking of gold and silver articles and how to check a HUID.") }),
  component: () => <TopicPage title="Hallmarking" intro="Understand hallmarking of gold and silver articles and how to check a HUID." entries={topicEntries("hallmarking")} q="How do I verify a HUID on gold jewellery?" />,
});

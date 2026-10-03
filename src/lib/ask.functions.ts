import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { KB, KB_LABEL, OFFICIAL } from "./kb";

const Input = z.object({
  question: z.string().trim().min(2).max(500),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), text: z.string().max(2000) }))
    .max(12)
    .default([]),
  lang: z.enum(["en", "hi"]).default("en"),
});

export type AskSource = { id: string; title: string; label: string; url: string; excerpt: string };
export type AskResult = {
  answer: string;
  grounded: boolean;
  sources: AskSource[];
  followUps: string[];
  kb: string;
};

const FOLLOW: Record<string, string> = {
  standards: "How do I find the standard for my product?",
  certification: "Is certification mandatory for my product?",
  labs: "Where can my product be tested?",
  hallmarking: "How do I verify a HUID?",
  consumer: "How do I raise a complaint?",
};

export const askBis = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }): Promise<AskResult> => {
    const { generateGrounded } = await import("./ai.server");
    const raw = await generateGrounded(data.question, data.history, data.lang);

    const cited: string[] = [];
    for (const m of raw.matchAll(/\[([a-z-]+)\]/g)) {
      const id = m[1]!;
      if (KB.some((e) => e.id === id) && !cited.includes(id)) cited.push(id);
    }

    if (raw.includes("NO_SOURCE") || cited.length === 0) {
      return {
        answer:
          data.lang === "hi"
            ? "डेमो नॉलेज बेस में इस प्रश्न का कोई स्रोत नहीं मिला, इसलिए मैं अनुमान नहीं लगाऊँगा। कृपया आधिकारिक BIS वेबसाइट देखें।"
            : "I couldn't find a source for this in the Demo Knowledge Base, so I won't guess. Please check the official BIS website.",
        grounded: false,
        sources: [{ id: "official", title: "Bureau of Indian Standards", label: "Official website", url: OFFICIAL, excerpt: "" }],
        followUps: ["How do I verify a hallmark?", "What is BIS certification?", "How do I raise a complaint?"],
        kb: KB_LABEL,
      };
    }

    const answer = raw.replace(/\[([a-z-]+)\]/g, (s, id: string) => {
      const n = cited.indexOf(id);
      return n >= 0 ? `[${n + 1}]` : "";
    });
    const entries = cited.map((id) => KB.find((e) => e.id === id)!);
    const topics = [...new Set(entries.map((e) => e.topic))];
    const others = Object.keys(FOLLOW).filter((t) => !topics.includes(t as never));
    const followUps = [...topics, ...others].slice(0, 3).map((t) => FOLLOW[t]!).filter((f) => f !== data.question);

    return {
      answer,
      grounded: true,
      sources: entries.map((e) => ({ id: e.id, title: e.title, label: e.sourceLabel, url: e.sourceUrl, excerpt: e.text })),
      followUps,
      kb: KB_LABEL,
    };
  });

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { KB, KB_LABEL, OFFICIAL } from "./kb";

const Input = z.object({
  question: z.string().trim().min(2).max(500),
  history: z.array(z.string().max(500)).max(10).default([]),
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

const tokenize = (s: string) => s.toLowerCase().replace(/[^a-z0-9/\s]/g, " ").split(/\s+/).filter(Boolean);

// Retrieval step: keyword scoring over the Demo Knowledge Base.
// Answers are extractive — only text present in retrieved entries is returned.
export const askBis = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }): Promise<AskResult> => {
    const context = [...data.history.slice(-2), data.question].join(" ");
    const q = tokenize(context);
    const qs = context.toLowerCase();
    const scored = KB.map((e) => {
      let s = 0;
      for (const k of e.keywords) if (k.includes(" ") ? qs.includes(k) : q.includes(k)) s += k.includes(" ") ? 3 : 2;
      for (const w of tokenize(e.title)) if (w.length > 3 && q.includes(w)) s += 1;
      return { e, s };
    })
      .filter((x) => x.s >= 2)
      .sort((a, b) => b.s - a.s)
      .slice(0, 3);

    if (scored.length === 0) {
      return {
        answer:
          data.lang === "hi"
            ? "डेमो नॉलेज बेस में इस प्रश्न का कोई स्रोत नहीं मिला। कृपया आधिकारिक BIS वेबसाइट देखें।"
            : "I could not find a source for this in the Demo Knowledge Base, so I won't guess. Please check the official BIS website.",
        grounded: false,
        sources: [{ id: "official", title: "Bureau of Indian Standards", label: "Official website", url: OFFICIAL, excerpt: "" }],
        followUps: ["How do I verify a hallmark?", "What is BIS certification?", "How do I raise a complaint?"],
        kb: KB_LABEL,
      };
    }

    const answer = scored.map((x, i) => `${x.e.text} [${i + 1}]`).join("\n\n");
    const topics = new Set(scored.map((x) => x.e.topic));
    const followUps = KB.filter((e) => topics.has(e.topic) && !scored.some((x) => x.e.id === e.id))
      .slice(0, 3)
      .map((e) => `Tell me about: ${e.title.toLowerCase()}`);

    return {
      answer:
        data.lang === "hi"
          ? `(हिंदी अनुवाद डेमो में उपलब्ध नहीं है — अंग्रेज़ी स्रोत पाठ नीचे है)\n\n${answer}`
          : answer,
      grounded: true,
      sources: scored.map((x) => ({
        id: x.e.id,
        title: x.e.title,
        label: x.e.sourceLabel,
        url: x.e.sourceUrl,
        excerpt: x.e.text,
      })),
      followUps,
      kb: KB_LABEL,
    };
  });

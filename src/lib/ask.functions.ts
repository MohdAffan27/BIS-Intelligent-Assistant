import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { KB_LABEL, OFFICIAL, type KbEntry } from "./kb";
import { detectSpecifics, retrieve } from "./retrieval";

const Input = z.object({
  question: z.string().trim().min(2).max(500),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), text: z.string().max(4000) }))
    .max(20)
    .default([]),
  lang: z.enum(["en", "hi"]).default("en"),
});

export type AskSource = { id: string; title: string; label: string; url: string; excerpt: string };
export type AskMode = "ai" | "retrieval";
export type AskResult = {
  ok: true;
  answer: string;
  status: "answered" | "partial" | "no_source";
  mode: AskMode;
  notice: string | null;
  sources: AskSource[];
  followUps: string[];
  kb: string;
};
export type AskError = { ok: false; message: string };

const FOLLOW: Record<string, string> = {
  standards: "How do I find the standard for my product?",
  certification: "Is certification mandatory for my product?",
  labs: "Where can my product be tested?",
  hallmarking: "How do I verify a HUID?",
  consumer: "How do I raise a complaint?",
};

const HI_UNAVAILABLE = "हिंदी स्रोत उपलब्ध नहीं हैं (Hindi source coverage is unavailable). नीचे अंग्रेज़ी स्रोत पाठ दिखाया गया है।";

function prose(entries: KbEntry[]) {
  const [first, ...rest] = entries;
  const parts = [`${first!.text} [1]`];
  rest.forEach((e, i) => parts.push(`Related — ${e.title.toLowerCase()}: ${e.text} [${i + 2}]`));
  return parts.join("\n\n");
}

export const askBis = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }): Promise<AskResult | AskError> => {
    try {
      const priorUser = data.history.filter((m) => m.role === "user").map((m) => m.text);
      const hits = retrieve(data.question, priorUser);
      const specifics = detectSpecifics(data.question);

      if (!hits.length) {
        return {
          ok: true,
          status: "no_source",
          mode: "retrieval",
          answer:
            "The Demo Knowledge Base does not contain sufficient information to answer this question, so no answer is given. It only covers basic orientation on BIS standards, certification, testing labs, hallmarking and consumer help. Please consult the official BIS website or another authoritative source.",
          notice: data.lang === "hi" ? HI_UNAVAILABLE : null,
          sources: [{ id: "official", title: "Bureau of Indian Standards", label: "Official website", url: OFFICIAL, excerpt: "" }],
          followUps: ["What is BIS?", "How do I verify a hallmark on gold jewellery?", "How do I raise a complaint?"],
          kb: KB_LABEL,
        };
      }

      const entries = hits.map((h) => h.entry);
      const gap = specifics.length
        ? `The Demo Knowledge Base does not contain ${specifics.join(" or ")}. Below is the related general information it does hold; confirm specifics on the official BIS website.`
        : null;

      const ai = await phrase(data.question, entries, data.lang, specifics);
      const mode: AskMode = ai ? "ai" : "retrieval";
      let notice: string | null = null;
      if (data.lang === "hi") notice = ai ? "AI द्वारा अंग्रेज़ी स्रोतों का हिंदी अनुवाद — मूल स्रोत अंग्रेज़ी में हैं।" : HI_UNAVAILABLE;

      const topics = [...new Set(entries.map((e) => e.topic))];
      const others = Object.keys(FOLLOW).filter((t) => !topics.includes(t as KbEntry["topic"]));
      const followUps = [...topics, ...others].map((t) => FOLLOW[t]!).filter((f) => f !== data.question).slice(0, 3);

      return {
        ok: true,
        status: gap ? "partial" : "answered",
        mode,
        answer: ai ?? (gap ? `${gap}\n\n${prose(entries)}` : prose(entries)),
        notice,
        sources: entries.map((e) => ({ id: e.id, title: e.title, label: e.sourceLabel, url: e.sourceUrl, excerpt: e.text })),
        followUps,
        kb: KB_LABEL,
      };
    } catch (e) {
      console.error("askBis failed", e instanceof Error ? e.message : "unknown");
      return { ok: false, message: "The assistant could not process this question right now. Please try again." };
    }
  });

async function phrase(q: string, entries: KbEntry[], lang: "en" | "hi", specifics: string[]) {
  try {
    const { phraseWithAi } = await import("./ai.server");
    return await phraseWithAi(q, entries, lang, specifics);
  } catch {
    return null;
  }
}

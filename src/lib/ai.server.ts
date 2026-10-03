import type { KbEntry } from "./kb";

// Optional AI phrasing over ALREADY-RETRIEVED entries. Returns null if AI is unavailable.
export async function phraseWithAi(
  question: string,
  entries: KbEntry[],
  lang: "en" | "hi",
  specifics: string[],
): Promise<string | null> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) return null;
  const sources = entries.map((e, i) => `[${i + 1}] ${e.title}: ${e.text}`).join("\n");
  const instructions = `You rewrite retrieved passages into a short helpful answer for the BIS Intelligent Assistant (SIH 2026 prototype).
Use ONLY facts in SOURCES. Add no new facts, numbers, fees, documents, standards, labs or legal claims.
Cite each sentence with [n]. Under 110 words. ${lang === "hi" ? "Write in Hindi (a faithful translation of the source facts)." : "Write in English."}
${specifics.length ? `The sources do NOT contain ${specifics.join(", ")}. Say so plainly and refer to the official BIS website.` : ""}
SOURCES:
${sources}`;
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "fetch", "Content-Type": "application/json" },
      body: JSON.stringify({ model: "openai/gpt-6-astra", instructions, input: [{ role: "user", content: question }], stream: true, store: false, reasoning: { effort: "low" } }),
    });
    if (!res.ok || !res.body) {
      console.error("AI gateway unavailable", res.status);
      return null;
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "", out = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, i).trim();
        buf = buf.slice(i + 1);
        if (!line.startsWith("data:")) continue;
        try {
          const ev = JSON.parse(line.slice(5));
          if (ev.type === "response.output_text.delta") out += ev.delta;
        } catch {}
      }
    }
    out = out.trim();
    // Require citations within range; otherwise reject and fall back.
    const cites = [...out.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1]));
    if (!out || !cites.length || cites.some((c) => c < 1 || c > entries.length)) return null;
    return out;
  } catch (e) {
    console.error("AI phrasing failed", e instanceof Error ? e.message : "unknown");
    return null;
  }
}

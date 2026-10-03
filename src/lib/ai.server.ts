import { KB } from "./kb";

// Grounded generation via Lovable AI Gateway (Responses API, streamed SSE, consumed server-side).
export async function generateGrounded(question: string, history: { role: "user" | "assistant"; text: string }[], lang: "en" | "hi") {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI not configured");
  const sources = KB.map((e) => `[${e.id}] ${e.title}: ${e.text}`).join("\n");
  const instructions = `You are the BIS Intelligent Assistant (an SIH 2026 prototype, not an official BIS service).
Answer ONLY using the SOURCES below. Never invent standard numbers, clauses, fees, timelines, lab names, legal facts or citations.
Cite every sentence with the source id in square brackets, e.g. [hm-verify].
If the sources do not cover the question, reply exactly: NO_SOURCE
Be concise (under 120 words), friendly and plain. Reply in ${lang === "hi" ? "Hindi" : "English"}.
SOURCES:
${sources}`;
  const input = [
    ...history.slice(-6).map((m) => ({ role: m.role, content: m.text })),
    { role: "user", content: question },
  ];
  const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Lovable-API-Key": key,
      "X-Lovable-AIG-SDK": "fetch",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-6-astra",
      instructions,
      input,
      stream: true,
      store: false,
      reasoning: { effort: "low" },
    }),
  });
  if (!res.ok || !res.body) {
    const t = await res.text().catch(() => "");
    console.error("AI gateway error", res.status, t.slice(0, 300));
    throw Object.assign(new Error("AI request failed"), { status: res.status });
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  let out = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let i;
    while ((i = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, i).trim();
      buf = buf.slice(i + 1);
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (payload === "[DONE]") continue;
      try {
        const ev = JSON.parse(payload);
        if (ev.type === "response.output_text.delta") out += ev.delta;
      } catch {}
    }
  }
  return out.trim();
}

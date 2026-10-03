import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Copy, RotateCcw, Send, Trash2, ExternalLink, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { askBis, type AskResult } from "@/lib/ask.functions";
import { DemoBadge } from "./Site";

type Msg = { id: number; role: "user" | "assistant"; text: string; result?: AskResult; error?: boolean };

const STARTERS = ["How do I verify a hallmark on gold jewellery?", "What is BIS product certification?", "How do I raise a complaint?"];

export function ChatPanel({ initial }: { initial?: string | undefined }) {
  const ask = useServerFn(askBis);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState(initial ?? "");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const idc = useRef(0);

  useEffect(() => ref.current?.focus(), [loading]);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), [msgs, loading]);

  async function run(question: string, base: Msg[]) {
    setLoading(true);
    const history = base.slice(0, -1).filter((m) => !m.error).map((m) => ({ role: m.role, text: m.text }));
    try {
      const result = await ask({ data: { question, history, lang } });
      setMsgs([...base, { id: ++idc.current, role: "assistant", text: result.answer, result }]);
    } catch {
      setMsgs([...base, { id: ++idc.current, role: "assistant", text: "Something went wrong while fetching an answer.", error: true }]);
    } finally {
      setLoading(false);
    }
  }

  function send(q = input) {
    const question = q.trim();
    if (question.length < 2 || loading) return;
    const next = [...msgs, { id: ++idc.current, role: "user" as const, text: question }];
    setMsgs(next);
    setInput("");
    run(question, next);
  }

  function retry() {
    const base = msgs.slice(0, -1);
    const lastUser = [...base].reverse().find((m) => m.role === "user");
    if (lastUser) run(lastUser.text, base);
  }

  return (
    <div className="card-surface flex min-h-[560px] flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border p-3">
        <DemoBadge />
        <div className="flex items-center gap-2">
          <label htmlFor="lang" className="sr-only">Language</label>
          <Select value={lang} onValueChange={(v) => setLang(v as "en" | "hi")}>
            <SelectTrigger id="lang" className="h-9 w-32" aria-label="Answer language"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => setMsgs([])} disabled={!msgs.length || loading}>
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4" aria-live="polite" role="log">
        {msgs.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Answers are written by AI using only the Demo Knowledge Base, with sources. If no source exists, the assistant says so.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {STARTERS.map((s) => (
                <Button key={s} variant="secondary" size="sm" onClick={() => send(s)}>{s}</Button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) =>
          m.role === "user" ? (
            <div key={m.id} className="ml-auto max-w-[85%] rounded-lg bg-primary px-4 py-2 text-primary-foreground">{m.text}</div>
          ) : (
            <div key={m.id} className="max-w-[95%]">
              {m.error ? (
                <div className="flex items-center gap-3 rounded-md border border-destructive/40 p-3 text-sm text-destructive">
                  <AlertTriangle className="h-4 w-4" /> {m.text}
                  {i === msgs.length - 1 && (
                    <Button size="sm" variant="outline" onClick={retry}><RotateCcw className="h-4 w-4" /> Retry</Button>
                  )}
                </div>
              ) : (
                <>
                  {m.result && !m.result.grounded && (
                    <p className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-accent-foreground"><AlertTriangle className="h-3.5 w-3.5" /> No matching source</p>
                  )}
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                  {m.result && m.result.sources.length > 0 && (
                    <div className="mt-3 rounded-md border border-border bg-muted p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sources · {m.result.kb}</p>
                      <ol className="mt-2 space-y-1 text-sm">
                        {m.result.sources.map((s, si) => (
                          <li key={s.id}>
                            [{si + 1}] {s.title} —{" "}
                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary underline">
                              {s.label} <ExternalLink className="h-3 w-3" />
                            </a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(m.text).then(() => toast.success("Answer copied"))}>
                      <Copy className="h-4 w-4" /> Copy
                    </Button>
                    {i === msgs.length - 1 && <Button variant="ghost" size="sm" onClick={retry} disabled={loading}><RotateCcw className="h-4 w-4" /> Regenerate</Button>}
                  </div>
                  {i === msgs.length - 1 && m.result && m.result.followUps.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.result.followUps.map((f) => (
                        <Button key={f} variant="outline" size="sm" onClick={() => send(f)}>{f}</Button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ),
        )}
        {loading && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Thinking…</p>
        )}
        <div ref={end} />
      </div>

      <form className="flex gap-2 border-t border-border p-3" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <label htmlFor="q" className="sr-only">Your question</label>
        <Textarea
          id="q"
          ref={ref}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Ask about standards, certification, hallmarking…"
          maxLength={500}
          rows={2}
          className="min-h-0 resize-none"
        />
        <Button type="submit" disabled={loading || input.trim().length < 2} aria-label="Send question" className="self-end">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

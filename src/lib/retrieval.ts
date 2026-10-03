import { KB, type KbEntry } from "./kb";

// Deterministic retrieval over the Demo Knowledge Base.
const STOP = new Set(
  "a an the is are was were be been of to in on for and or but with about what which who whom how do does did i my me we our you your it its this that these those can could should would will shall from by at as any some tell please need want know get there their them than then also into"
    .split(" "),
);

// Synonym / variant groups mapped to a canonical term.
const SYN: Record<string, string[]> = {
  bis: ["bis", "bureau"],
  standard: ["standard", "standards", "specification", "specifications", "spec"],
  certify: ["certification", "certificate", "certified", "certify", "licence", "license", "licensing", "isi", "mark", "marking", "approval", "conformity"],
  mandatory: ["mandatory", "compulsory", "required", "require", "qco", "obligatory"],
  lab: ["lab", "labs", "laboratory", "laboratories", "testing", "test", "tested", "sample"],
  hallmark: ["hallmark", "hallmarking", "hallmarked", "huid", "purity", "fineness", "carat", "karat"],
  gold: ["gold", "silver", "jewellery", "jewelry", "jeweller", "ornament", "ornaments", "bullion"],
  verify: ["verify", "verification", "verifying", "check", "checking", "genuine", "authentic", "fake", "counterfeit", "validate", "confirm"],
  complaint: ["complaint", "complaints", "complain", "grievance", "report", "reporting", "defective", "problem", "issue", "redress"],
  app: ["app", "application", "care", "mobile"],
  product: ["product", "products", "appliance", "appliances", "item", "goods", "electrical", "electronic"],
  find: ["find", "search", "lookup", "locate", "applies", "applicable"],
};
const CANON = new Map<string, string>();
for (const [c, words] of Object.entries(SYN)) for (const w of words) CANON.set(w, c);

export function normalize(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s/]/gu, " ").replace(/\s+/g, " ").trim();
}

function stem(w: string) {
  if (CANON.has(w)) return CANON.get(w)!;
  const base = w.replace(/(ies)$/, "y").replace(/(ing|ed|es|s)$/, "");
  return CANON.get(base) ?? base;
}

export function terms(s: string) {
  return normalize(s)
    .split(" ")
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem);
}

const INDEX = KB.map((e) => {
  const strong = new Set([...e.keywords.flatMap(terms), ...terms(e.title)]);
  const weak = new Set(terms(e.text));
  return { e, strong, weak };
});

// Requests for specifics the Demo KB intentionally does not hold.
const SPECIFIC: [RegExp, string][] = [
  [/\b(documents?|paperwork|papers)\b/, "the list of documents required"],
  [/\b(fees?|cost|charges?|price)\b/, "fees or charges"],
  [/\b(how long|timeline|duration|days|time taken)\b/, "timelines"],
  [/\b(which|what) (standard|is number|is code)|standard (number|applies)|is \d+|\bclause/, "which specific standard or clause applies"],
  [/\b(address|phone|contact number|near me|nearest|list of labs|lab names?)\b/, "specific lab names or contact details"],
];

export function detectSpecifics(q: string) {
  const n = normalize(q);
  return SPECIFIC.filter(([r]) => r.test(n)).map(([, l]) => l);
}

const FOLLOWUP = /^(what about|how about|and|also|what if|then|ok|okay|same for)\b/;

export function retrieve(question: string, priorUserTurns: string[], k = 3): { entry: KbEntry; score: number }[] {
  const qTerms = terms(question);
  const n = normalize(question);
  const isFollow = FOLLOWUP.test(n) || qTerms.length <= 2;
  const ctx = isFollow ? priorUserTurns.slice(-2).flatMap(terms) : [];

  const scored = INDEX.map(({ e, strong, weak }) => {
    let s = 0;
    for (const t of new Set(qTerms)) {
      if (strong.has(t)) s += 3;
      else if (weak.has(t)) s += 1;
    }
    for (const t of new Set(ctx)) if (strong.has(t)) s += 1;
    for (const kw of e.keywords) if (kw.includes(" ") && n.includes(kw)) s += 2;
    return { entry: e, score: s };
  })
    .filter((x) => x.score >= 3)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return [];
  const top = scored[0]!.score;
  return scored.filter((x) => x.score >= Math.max(3, top * 0.5)).slice(0, k);
}

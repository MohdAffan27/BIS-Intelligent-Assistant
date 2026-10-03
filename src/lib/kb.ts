// Demo Knowledge Base. General, publicly known orientation text only.
// No standard numbers, clauses, fees, timelines or lab names are asserted.
// Every entry points users to the official BIS source for verification.

export type Topic = "standards" | "certification" | "labs" | "hallmarking" | "consumer";

export type KbEntry = {
  id: string;
  topic: Topic;
  title: string;
  text: string;
  keywords: string[];
  sourceLabel: string;
  sourceUrl: string;
};

export const KB_LABEL = "Demo Knowledge Base";
export const OFFICIAL = "https://www.bis.gov.in";

export const KB: KbEntry[] = [
  {
    id: "std-about",
    topic: "standards",
    title: "What Indian Standards are",
    text: "Bureau of Indian Standards (BIS) is the National Standards Body of India. It formulates Indian Standards (IS) through technical committees. Exact standard numbers, titles and current versions must be checked on the official BIS standards portal.",
    keywords: ["standard", "is", "indian standard", "formulate", "committee", "bis", "what"],
    sourceLabel: "BIS official website (verify)",
    sourceUrl: OFFICIAL,
  },
  {
    id: "std-find",
    topic: "standards",
    title: "Finding a standard",
    text: "To find the standard that applies to a product, search the official BIS standards catalogue by product name or keyword. This demo does not hold the catalogue and cannot confirm which standard applies.",
    keywords: ["find", "search", "which standard", "catalogue", "product", "applies"],
    sourceLabel: "BIS official website (verify)",
    sourceUrl: OFFICIAL,
  },
  {
    id: "cert-overview",
    topic: "certification",
    title: "Product certification overview",
    text: "BIS operates conformity assessment schemes, including product certification that permits use of the Standard Mark (commonly called the ISI mark) under licence. Eligibility, documents, fees and timelines depend on the scheme and product — confirm them on the official BIS portal before applying.",
    keywords: ["certification", "licence", "license", "isi", "mark", "apply", "scheme", "manufacturer"],
    sourceLabel: "BIS official website (verify)",
    sourceUrl: OFFICIAL,
  },
  {
    id: "cert-mandatory",
    topic: "certification",
    title: "Mandatory vs voluntary certification",
    text: "Some products are covered by government Quality Control Orders that make certification compulsory; others are voluntary. Whether a specific product is mandatory can change and must be verified from current official notifications.",
    keywords: ["mandatory", "compulsory", "qco", "quality control order", "voluntary", "required"],
    sourceLabel: "BIS official website (verify)",
    sourceUrl: OFFICIAL,
  },
  {
    id: "labs-overview",
    topic: "labs",
    title: "Testing laboratories",
    text: "Product testing for certification is carried out in BIS laboratories and BIS-recognised laboratories. This demo has no lab directory; use the official BIS list of recognised laboratories to find one for your product.",
    keywords: ["lab", "laboratory", "testing", "test", "recognised", "recognized", "sample"],
    sourceLabel: "BIS official website (verify)",
    sourceUrl: OFFICIAL,
  },
  {
    id: "hm-overview",
    topic: "hallmarking",
    title: "Gold and silver hallmarking",
    text: "Hallmarking certifies the purity (fineness) of precious metal articles. Hallmarked gold jewellery in India carries a HUID (Hallmark Unique Identification) code. Applicable grades and rules should be confirmed on the official BIS hallmarking pages.",
    keywords: ["hallmark", "hallmarking", "gold", "silver", "jewellery", "jewelry", "purity", "huid", "carat", "karat"],
    sourceLabel: "BIS official website (verify)",
    sourceUrl: OFFICIAL,
  },
  {
    id: "hm-verify",
    topic: "hallmarking",
    title: "Verifying a HUID",
    text: "Consumers can check a HUID using the official BIS CARE mobile app published by BIS. Use only the official app from your device's app store.",
    keywords: ["verify", "check", "huid", "app", "care", "genuine", "fake"],
    sourceLabel: "BIS official website (verify)",
    sourceUrl: OFFICIAL,
  },
  {
    id: "con-verify",
    topic: "consumer",
    title: "Checking an ISI-marked product",
    text: "Genuine ISI-marked products carry a licence number (CM/L number). You can check licence details through the official BIS CARE app or the BIS website.",
    keywords: ["verify", "genuine", "isi", "licence number", "cm/l", "fake", "check", "product"],
    sourceLabel: "BIS official website (verify)",
    sourceUrl: OFFICIAL,
  },
  {
    id: "con-complaint",
    topic: "consumer",
    title: "Raising a complaint",
    text: "Complaints about quality of certified products or misuse of the BIS mark can be filed through official BIS channels, including the BIS CARE app and the complaints section of the BIS website.",
    keywords: ["complaint", "complain", "grievance", "misuse", "report", "problem", "defective"],
    sourceLabel: "BIS official website (verify)",
    sourceUrl: OFFICIAL,
  },
];

export function topicEntries(topic: Topic) {
  return KB.filter((e) => e.topic === topic);
}

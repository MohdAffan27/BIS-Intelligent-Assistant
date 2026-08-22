import { createFileRoute } from "@tanstack/react-router";
import profile from "@/assets/profile.jpg.asset.json";

const LINKEDIN = "https://www.linkedin.com/in/mohammed-affan-58116b319";
const GITHUB = "https://github.com/MohdAffan27";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammed Affan — AI/ML Engineer in the Making" },
      {
        name: "description",
        content:
          "Portfolio of Mohammed Affan, B.Tech CSE student building a foundation in Python, Machine Learning and Computer Vision, aiming for research in Deep Learning for Visual Computing.",
      },
      { property: "og:title", content: "Mohammed Affan — AI/ML Engineer in the Making" },
      {
        property: "og:description",
        content:
          "B.Tech Computer Science student focused on Machine Learning, Deep Learning and Computer Vision.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

const NAV = [
  ["about", "About"],
  ["goal", "Career Goal"],
  ["education", "Education"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["contact", "Contact"],
] as const;

const SKILLS = [
  "Python",
  "C",
  "C++",
  "Java",
  "HTML",
  "Git & GitHub",
  "NumPy",
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
];

const PROJECTS = [
  {
    title: "Smart Home Automation System",
    description:
      "Home automation setup built with an ESP32 microcontroller and a relay module to control appliances.",
    tags: ["ESP32", "Relay Module"],
  },
  {
    title: "Student Marks Manager",
    description: "Python project for entering, storing and managing student marks.",
    tags: ["Python"],
  },
  {
    title: "Python Practice Projects",
    description:
      "Small projects created while learning Python, Git and GitHub, kept as a record of steady practice.",
    tags: ["Python", "Git", "GitHub"],
  },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-14 sm:py-16">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <a href="#home" className="text-sm font-semibold tracking-tight">
            Mohammed Affan
          </a>
          <ul className="hidden gap-5 text-sm text-muted-foreground md:flex">
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="transition-colors hover:text-primary">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 text-sm text-muted-foreground md:hidden">
            <a href="#projects" className="transition-colors hover:text-primary">
              Projects
            </a>
            <a href="#contact" className="transition-colors hover:text-primary">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-5">
        <section id="home" className="scroll-mt-20 py-14 sm:py-20">
          <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Mohammed Affan</h1>
              <p className="mt-2 text-lg font-medium text-primary">
                AI/ML Engineer in the Making
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                B.Tech Computer Science and Engineering student building a solid foundation in
                Python, Machine Learning and Artificial Intelligence, with a long-term focus on
                Deep Learning and Computer Vision.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href="#goal"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  My Goal
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  LinkedIn
                </a>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  GitHub
                </a>
              </div>
            </div>
            <img
              src={profile.url}
              alt="Portrait of Mohammed Affan"
              width={640}
              height={853}
              className="h-44 w-44 shrink-0 rounded-full object-cover object-top shadow-[var(--shadow-card)] ring-1 ring-border sm:h-52 sm:w-52 md:h-60 md:w-60"
            />
          </div>
        </section>

        <Section id="about" title="About">
          <div className="card-surface p-6">
            <p className="leading-relaxed text-muted-foreground">
              I am a third-year B.Tech Computer Science and Engineering student, graduating in 2028.
              I completed a Diploma in Computer Science and Engineering in 2025 before joining the
              degree programme. My current focus is on strengthening my programming fundamentals and
              learning Machine Learning and Deep Learning step by step, alongside practical work
              through my internship. I am still learning, and I prefer to build real projects while
              I study rather than only reading theory.
            </p>
          </div>
        </Section>

        <Section id="goal" title="Career Goal">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="card-surface p-6 md:col-span-2">
              <h3 className="text-lg font-semibold">
                KAUST — Deep Learning for Visual Computing (first priority)
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                My immediate target is to secure an internship at King Abdullah University of
                Science and Technology (KAUST) in an area related to Computer Vision, Computer
                Graphics, Remote Sensing, Vision and Language, or Deep Learning for Visual
                Computing. My long-term goal is to earn a Master's seat at KAUST and continue
                developing toward AI/ML research and engineering.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs text-accent-foreground">
                {[
                  "Computer Vision",
                  "Computer Graphics",
                  "Remote Sensing",
                  "Vision and Language",
                  "Deep Learning for Visual Computing",
                ].map((t) => (
                  <li key={t} className="rounded-md bg-accent px-2.5 py-1">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-6">
              <h3 className="text-lg font-semibold">Secondary options</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Japan and Germany are my backup options for a Master's degree if KAUST does not work
                out. KAUST remains my first priority.
              </p>
            </div>
          </div>
        </Section>

        <Section id="education" title="Education">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="card-surface p-6">
              <h3 className="text-lg font-semibold">
                B.Tech in Computer Science and Engineering
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                3rd Year · Expected graduation 2028
              </p>
            </div>
            <div className="card-surface p-6">
              <h3 className="text-lg font-semibold">
                Diploma in Computer Science and Engineering
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">Completed 2025</p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Final Year Project — E-Commerce Website.
              </p>
            </div>
          </div>
        </Section>

        <Section id="experience" title="Current Experience">
          <div className="card-surface p-6">
            <h3 className="text-lg font-semibold">Machine Learning Intern — FlyRank.ai</h3>
            <p className="mt-1 text-sm text-muted-foreground">Current · alongside my B.Tech</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              I am currently working as a Machine Learning intern at FlyRank.ai, where I get
              practical exposure to applied machine learning work while continuing my studies.
            </p>
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <article key={p.title} className="card-surface flex flex-col p-6">
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-md bg-secondary px-2.5 py-1">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills & Current Focus">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="card-surface p-6 md:col-span-2">
              <h3 className="text-base font-semibold">Skills</h3>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-secondary-foreground">
                {SKILLS.map((s) => (
                  <li key={s} className="rounded-md bg-secondary px-3 py-1.5">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-6">
              <h3 className="text-base font-semibold">Current focus</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Strengthening Python and mathematics for machine learning, practising with NumPy,
                and gradually moving deeper into Deep Learning and Computer Vision.
              </p>
            </div>
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="card-surface flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground">
              Open to learning opportunities, internships and collaboration in AI/ML.
            </p>
            <div className="flex gap-3">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                LinkedIn
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                GitHub
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border py-8">
        <p className="mx-auto max-w-5xl px-5 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mohammed Affan
        </p>
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CustomCursor } from "@/components/CustomCursor";
import { CursorTrail } from "@/components/CursorTrail";
import { Preloader, PRELOAD_TOTAL_MS } from "@/components/Preloader";
import { ParallaxAurora } from "@/components/ParallaxAurora";
import { InteractiveHeadline } from "@/components/InteractiveHeadline";
import { ProjectVisual, type VisualVariant } from "@/components/ProjectVisual";
import { ContactForm } from "@/components/ContactForm";
import { Toaster } from "@/components/ui/sonner";

/* ---------- Data ---------- */
const SKILLS_MARQUEE = [
  "APPLIED AI",
  "PYTHON",
  "FASTAPI",
  "GEMINI · GPT",
  "UIPATH RPA",
  "LLM AGENTS",
  "AUTOMATION",
  "REST APIs",
  "PROMPT ENGINEERING",
  "IMAP / SMTP",
];

const ZONES = [
  {
    id: "01",
    title: "AI & LLM.",
    body: "Production AI systems powered by Gemini and GPT — intent classification, context-aware generation, and RAG-lite retrieval that actually ships. Prompt and context engineering with real evaluation, not vibes.",
    tags: ["Gemini API", "GPT", "Prompt Engineering", "AI Agents", "RAG", "Embeddings"],
  },
  {
    id: "02",
    title: "Backend.",
    body: "Python and FastAPI backends built for automation workloads: strict schemas, retry logic, and clean REST surfaces. SQLite / Supabase for persistence, robust exception handling for 24/7 unattended runs.",
    tags: ["Python", "FastAPI", "REST APIs", "SQLite", "Supabase", "JSON Schema"],
  },
  {
    id: "03",
    title: "RPA.",
    body: "UiPath robots on REFramework with Orchestrator. Email, Excel, PDF, and web automation wired end-to-end with the AI layer — the robot does the boring part, the LLM does the thinking part.",
    tags: ["UiPath Studio", "REFramework", "Orchestrator", "Web Scraping", "Excel", "PDF"],
  },
  {
    id: "04",
    title: "Ops.",
    body: "IMAP/SMTP pipelines, Outlook automation, PDF and Excel data extraction with pdfplumber and openpyxl. Git-based workflows, VS Code, and a mindset that treats reliability as a feature.",
    tags: ["IMAP", "SMTP", "pdfplumber", "openpyxl", "Git", "GitHub"],
  },
];

const PROJECTS: {
  kpi: string;
  title: string;
  stack: string;
  tag: string;
  body: string;
  href: string;
  visual: VisualVariant;
  hackathon?: boolean;
}[] = [
  {
    kpi: "10+ modules",
    title: "ProcureMind AI",
    stack: "Python · FastAPI · React · Gemini",
    tag: "AI PRODUCT",
    body: "Enterprise AI procurement platform that transforms BOQ workflows into an intelligent system — AI-assisted pricing, vendor comparison, quotation generation, conversational document analysis, and interactive analytics. Processes BOQ files in minutes instead of hours.",
    href: "https://github.com/Slg-Vansh",
    visual: "product",
    hackathon: true,
  },
  {
    kpi: "3hr → 3min",
    title: "Intelligent BOQ Pricing System",
    stack: "Python · Gemini API · FastAPI · Excel/PDF",
    tag: "AI · AUTOMATION",
    body: "End-to-end system that ingests construction tender BOQ files from email, normalizes chaotic tabular data with Gemini, prices every line item against a historical database with live fallback, and delivers the final commercial report — cutting a 3–4 hour manual process to under 3 minutes.",
    href: "https://github.com/Slg-Vansh/intelligent-boq-estimation-system",
    visual: "ai",
  },
  {
    kpi: "500+ emails / month",
    title: "AI Email Classification & Auto-Response",
    stack: "UiPath · FastAPI · LLM · IMAP/SMTP",
    tag: "AI · RPA",
    body: "Intelligent email ecosystem where UiPath robots monitor inboxes and a FastAPI backend classifies intent with LLMs, generating context-aware replies. Supports cloud LLMs and local Ollama for privacy-sensitive deployments. Zero manual sorting.",
    href: "https://github.com/Slg-Vansh/AI-Email-Classification-Auto-Response-System",
    visual: "ops",
  },
  {
    kpi: "Multi-format",
    title: "Invoice Processing Bot",
    stack: "UiPath · REFramework · Excel",
    tag: "RPA",
    body: "Robotic workflow handling multi-format invoice extraction, smart categorization, coupon generation, and standardized Excel reporting with strict data validation gates.",
    href: "https://github.com/Slg-Vansh",
    visual: "rpa",
  },
  {
    kpi: "Fully hands-free",
    title: "AI Birthday Email Generator",
    stack: "Python · UiPath · GPT",
    tag: "AI · AUTOMATION",
    body: "Scheduled automation connecting custom database lookups with GPT to craft deeply personalized, context-aware birthday greetings and deliver them completely hands-free on trigger.",
    href: "https://github.com/Slg-Vansh",
    visual: "backend",
  },
  {
    kpi: "Resilient scraping",
    title: "Web Portal Data Extraction Bot",
    stack: "UiPath · Dynamic Selectors",
    tag: "RPA",
    body: "Resilient scraper pulling dynamic product pricing, structured customer reviews, and complex seller ratings across unstable web interfaces with robust error handling.",
    href: "https://github.com/Slg-Vansh",
    visual: "scraper",
  },
];

const EXPERIENCE = [
  {
    role: "Senior SME / Sr. Representative – Operations",
    company: "Concentrix",
    period: "Oct 2023 – Present",
    bullets: [
      "Identified and automated 2–3 manual workflow bottlenecks using Python and UiPath",
      "Managed critical customer operations, consistently exceeding SLA benchmarks",
      "Streamlined legacy processes through targeted automation-driven improvements",
      "Mentored incoming team members on internal tools and automation workflows",
      "Spearheaded performance reporting and team optimization initiatives",
      "Handled high-priority technical escalations with consistent resolution rates",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Maharishi Dayanand University, Rohtak",
  },
];

const APPROACH = [
  {
    k: "Listen first.",
    v: "Before any code, I work out who it's for and what done actually means. Half the job is asking sharper questions than the brief did.",
  },
  {
    k: "Find the bottleneck.",
    v: "Every automation starts with the hour someone doesn't want to spend. I hunt the one repetitive step that quietly drains a team and design around it.",
  },
  {
    k: "Prototype the hard bit.",
    v: "LLM prompts, schemas, retry logic — I prove the fragile parts on paper first, while they're still cheap to change.",
  },
  {
    k: "Build it for real.",
    v: "Production Python and FastAPI, typed contracts, strict JSON schema validation, and UiPath workflows that survive real inboxes and real PDFs.",
  },
  {
    k: "Sweat the last ten.",
    v: "Retries, fallbacks, monitoring, the exception nobody planned for. I'd rather spend an extra week here than ship something almost right.",
  },
];

/* ---------- Component ---------- */
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [zone, setZone] = useState(0);

  useEffect(() => {
    // Failsafe only — the Preloader itself calls onDone right as its exit
    // animation finishes. This just guards against onDone never firing.
    const t = setTimeout(() => setLoading(false), PRELOAD_TOTAL_MS + 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-x-hidden">
      <ParallaxAurora />
      <div className="grain-overlay" aria-hidden />
      <CustomCursor />
      <CursorTrail />
      <Toaster position="bottom-right" />
      {loading && <Preloader onDone={() => setLoading(false)} />}

      <Nav />
      <Hero start={!loading} />
      <Marquee />
      <About />
      <Manifesto />
      <Toolkit zone={zone} setZone={setZone} />
      <Works />
      <Experience />
      <Approach />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const scrollToSection = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[999]" style={{ background: "rgba(24,22,38,0.55)", backdropFilter: "blur(18px) saturate(1.6)", WebkitBackdropFilter: "blur(18px) saturate(1.6)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          onClick={(e) => scrollToSection("top", e)}
          data-cursor="home"
          className="-ml-1 font-display text-3xl font-extrabold leading-none tracking-tighter text-[var(--paper)] md:-ml-3 md:text-4xl"
        >
          VJ<span className="text-[var(--accent-warm)]">.</span>
        </a>
        <nav className="hidden gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--paper)] md:flex">
          <a href="#work" onClick={(e) => scrollToSection("work", e)} data-cursor="view">Work</a>
          <a href="#experience" onClick={(e) => scrollToSection("experience", e)} data-cursor="career">Experience</a>
          <a href="#about" onClick={(e) => scrollToSection("about", e)} data-cursor="about">About</a>
          <a href="#approach" onClick={(e) => scrollToSection("approach", e)} data-cursor="how">Approach</a>
          <a href="#contact" onClick={(e) => scrollToSection("contact", e)} data-cursor="say hi">Contact</a>
        </nav>
        <a
          href="/Vansh_Resume_SDE.pdf"
          download
          data-cursor="download"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--paper)]"
        >
          Resume ↓
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
// Reveal is driven by the `start` flag (flips true the instant the preloader
// curtain finishes sliding away) rather than hardcoded absolute delays, so
// the headline cascades in exactly as the main page becomes visible —
// a smooth, single continuous transition instead of two disconnected timers.
const heroWord = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};
const heroLetter = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Hero({ start }: { start: boolean }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -80]);

  const line1 = "VANSH".split("");
  const line2 = "JANGID".split("");

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-16 pt-40 md:px-10 md:pb-24">
      <motion.div style={{ y: y1 }} className="flex flex-col gap-2">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]"
        >
          <span className="text-[var(--accent-warm)]">●</span> Applied AI Engineer · RPA Developer · New Delhi, India
        </motion.p>

        <h1 className="font-display leading-[0.82] tracking-tight">
          <motion.span
            variants={heroWord}
            initial="hidden"
            animate={start ? "show" : "hidden"}
            className="hero-solid block text-[20vw] font-black md:text-[17vw]"
          >
            {line1.map((c, i) => (
              <motion.span key={i} variants={heroLetter} className="inline-block">
                {c}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            variants={heroWord}
            initial="hidden"
            animate={start ? "show" : "hidden"}
            className="hero-solid block text-[20vw] font-black md:text-[17vw] text-white translate-x-12 md:translate-x-[16rem] lg:translate-x-[22rem]"
          >
            {line2.map((c, i) => (
              <motion.span key={i} variants={heroLetter} className="inline-block">
                {c}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={start ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-12"
        >
          <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
            <p className="max-w-2xl font-serif-display text-2xl leading-tight md:text-4xl">
              I build <em>intelligent automation systems</em> — LLM-powered pipelines, RPA robots, and Python backends that quietly do the work while humans focus on what matters.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-warm)]">
              Building production-grade AI systems for enterprise automation.
            </p>
          </div>
          <div className="col-span-12 flex flex-col justify-end gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] md:col-span-5 md:items-end">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--ink)]" /> Scroll to explore
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = [...SKILLS_MARQUEE, ...SKILLS_MARQUEE];
  return (
    <section className="border-y border-[var(--border)] bg-[var(--cream)] py-6 overflow-hidden">
      <div className="marquee-track whitespace-nowrap">
        {items.map((s, i) => (
          <span key={i} className="mx-8 font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {s} <span className="text-[var(--accent-warm)]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            01 / Approach & Vision
          </p>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest">Vansh Jangid</p>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">Based in New Delhi, India</p>
        </div>
        <div className="md:col-span-8">
          <RevealText>
            Real problems deserve real solutions —{" "}
            <em className="font-serif-display">engineered to serve people</em> and move them closer to what they actually need to get done.
          </RevealText>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
            I started in BPO operations at Concentrix, where I saw how many hours humans lose to repetitive work — and taught myself to automate all of it. Today I build end-to-end intelligent systems: Python pipelines, FastAPI backends, UiPath robots, and LLM-powered agents that work 24/7. My BOQ pricing system cuts hours of manual work down to under three minutes. My email AI handles 500+ emails a month without a human touching them.
          </p>
        </div>
      </div>
    </section>
  );
}

function RevealText({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
    >
      {children}
    </motion.h2>
  );
}

/* ---------- Manifesto (interactive letter-magnet headline) ---------- */
function Manifesto() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--paper)] px-6 py-28 md:px-10 md:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--ink) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-warm)]"
        >
          ✦ Approach & Vision
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <InteractiveHeadline
            text="Real problems deserve real solutions, engineered to serve people and move them closer to their goals."
            accentWords={["problems", "solutions,", "people", "goals."]}
            className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
          />
        </motion.div>
      </div>
    </section>
  );
}


/* ---------- Toolkit / Zones ---------- */
function Toolkit({ zone, setZone }: { zone: number; setZone: (n: number) => void }) {
  const z = ZONES[zone];
  return (
    <section className="border-t border-[var(--border)] bg-[var(--cream)] px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
          02 / Services & Toolkit
        </p>

        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Zone titles */}
          <div className="md:col-span-4">
            <ul className="flex flex-col gap-3">
              {ZONES.map((zn, i) => (
                <li key={zn.id}>
                  <button
                    data-cursor="switch"
                    onClick={() => setZone(i)}
                    className={`group flex w-full items-baseline gap-4 border-b border-[var(--border)] py-3 text-left transition-colors ${
                      i === zone ? "text-[var(--ink)]" : "text-[var(--muted-foreground)] hover:text-[var(--ink)]"
                    }`}
                  >
                    <span className="font-mono text-xs">{zn.id}</span>
                    <span className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                      {zn.title}
                    </span>
                    <span className="ml-auto font-mono text-xs">
                      {i === zone ? "●" : "○"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Zone content */}
          <motion.div
            key={z.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8"
          >
            <p className="font-serif-display text-2xl leading-snug md:text-4xl">{z.body}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {z.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--ink)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              Showing zone {zone + 1} of {ZONES.length}: <span className="text-[var(--ink)]">{z.title.toUpperCase()}</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Works ---------- */
function Works() {
  return (
    <section id="work" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between border-b border-[var(--border)] pb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
              03 / Selected Works
            </p>
            <h3 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              What I've built.
            </h3>
          </div>
          <p className="hidden max-w-xs text-sm text-[var(--muted-foreground)] md:block">
            A handful of shipped systems, hackathon builds, and internal tools. Click through for the source.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
      className="group"
    >
      <a href={p.href} target="_blank" rel="noreferrer" data-cursor="view case" className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)]">
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
              <ProjectVisual variant={p.visual} className="h-full w-full" />
            </div>
          </motion.div>

          {/* hover overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-[var(--ink)]/0 p-6 transition-colors duration-500 group-hover:bg-[var(--ink)]/10">
            <span className="translate-y-3 rounded-full bg-[var(--paper)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)] opacity-0 shadow-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              View case on GitHub ↗
            </span>
          </div>

          <span className="absolute left-4 top-4 rounded-full bg-[var(--paper)]/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)] backdrop-blur">
            0{i + 1} · {p.tag}
          </span>

          {/* Hackathon badge */}
          {p.hackathon && (
            <div className="absolute right-4 top-4 flex flex-col items-end gap-1.5">
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--accent-warm)]/70 bg-[var(--ink)]/85 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent-warm)] backdrop-blur shadow-lg">
                🏅 AMD Developer Hackathon 2026
              </span>
              <span className="rounded-full border border-[var(--accent-warm)]/30 bg-[var(--accent-warm)]/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--accent-warm)]">
                Official Submission
              </span>
              <span className="rounded-full bg-[var(--ink)]/60 px-2.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--paper)]/70 backdrop-blur">
                Results Pending
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-baseline justify-between gap-4">
          <h4 className="font-display text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
            {p.title}
          </h4>
          <p className="shrink-0 font-serif-display text-lg text-[var(--accent-warm)] md:text-xl">{p.kpi}</p>
        </div>
        <p className="mt-3 max-w-xl text-sm text-[var(--muted-foreground)] md:text-base">{p.body}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">
          {p.stack}
        </p>
      </a>
    </motion.li>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  return (
    <section id="experience" className="border-t border-[var(--border)] bg-[var(--cream)] px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
          04 / Work History &amp; Education
        </p>

        {/* Experience entries */}
        <div className="mt-12 space-y-0">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-8 border-t border-[var(--border)] py-12 md:grid-cols-12"
            >
              {/* Left: role info */}
              <div className="md:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-warm)]">
                  {exp.period}
                </p>
                <h4 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                  {exp.role}
                </h4>
                <p className="mt-2 font-mono text-sm uppercase tracking-widest text-[var(--muted-foreground)]">
                  {exp.company}
                </p>
                <div className="mt-4 h-px w-12 bg-[var(--accent-warm)]" />
              </div>

              {/* Right: bullets */}
              <ul className="md:col-span-8 flex flex-col gap-3">
                {exp.bullets.map((b, bi) => (
                  <motion.li
                    key={bi}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: bi * 0.06 }}
                    className="flex items-start gap-3 border-b border-[var(--border)] pb-3 text-sm leading-relaxed text-[var(--muted-foreground)] md:text-base"
                  >
                    <span className="mt-1.5 shrink-0 text-[var(--accent-warm)] text-xs">◆</span>
                    {b}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Education subsection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 border-t border-[var(--border)] pt-12"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            Education
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {EDUCATION.map((edu, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[var(--border)] bg-[var(--paper)] p-8"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-warm)]">Degree</p>
                <h4 className="mt-3 font-display text-xl font-semibold tracking-tight md:text-2xl">
                  {edu.degree}
                </h4>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Approach ---------- */
function Approach() {
  return (
    <section id="approach" className="border-t border-[var(--border)] bg-[var(--ink)] px-6 py-28 text-[var(--paper)] md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--paper)]/60">
          05 / How I work
        </p>
        <h3 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
          Discover · Define · <em className="font-serif-display">Design</em> · Build · Ship.
        </h3>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {APPROACH.map((a, i) => (
            <motion.div
              key={a.k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="border-t border-[var(--paper)]/20 pt-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--paper)]/50">
                Step 0{i + 1}
              </p>
              <h4 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {a.k}
              </h4>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--paper)]/70 md:text-base">
                {a.v}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--ink)]/80">
            06 / Contact
          </p>
          <p className="mt-8 max-w-xs text-sm text-[var(--ink)]/70">
            Open to Applied AI Engineer, Backend / Python, and RPA + AI Automation roles — remote or Delhi NCR.
          </p>
        </div>
        <div className="md:col-span-8">
          <h3 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            Let's build something <em className="font-serif-display">worth shipping</em>.
          </h3>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <ContactLink label="Email" value="vanshjangid1805@gmail.com" href="mailto:vanshjangid1805@gmail.com" />
            <ContactLink label="Phone" value="+91 8750981705" href="tel:+918750981705" />
            <ContactLink label="GitHub" value="github.com/Slg-Vansh" href="https://github.com/Slg-Vansh" />
            <ContactLink label="LinkedIn" value="vansh-jangid-914712206" href="https://www.linkedin.com/in/vansh-jangid-914712206" />
          </div>

          <a
            href="/Vansh_Resume_SDE.pdf"
            download
            data-cursor="download"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--paper)] transition-transform hover:-translate-y-0.5"
          >
            Download Resume ↓
          </a>

          <div className="mt-16 border-t border-[var(--border)] pt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
              Or just send a message
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      data-cursor="contact"
      className="group flex flex-col border-t border-[var(--ink)] pt-4"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
        {label}
      </span>
      <span className="mt-1 font-display text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1 md:text-2xl">
        {value} <span className="text-[var(--accent-warm)]">↗</span>
      </span>
    </a>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Vansh Jangid — Designed & built with care.</p>
        <p>New Delhi, India · Available for work</p>
      </div>
    </footer>
  );
}

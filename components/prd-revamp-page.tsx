"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronRight,
  Github,
  GraduationCap,
  Lock,
  Radar,
  ShieldCheck,
  Target,
  X,
} from "lucide-react"
import { AppendixDialog } from "@/components/appendix-dialog"
import { cn } from "@/lib/utils"

const sectionItems = [
  { id: "cover", label: "Cover", nav: "" },
  { id: "toc", label: "Table of Contents", nav: "" },
  { id: "pain", label: "The Core Problem", nav: "The Problem" },
  { id: "personas", label: "Who This Is For", nav: "Personas" },
  { id: "vision", label: "North Star", nav: "Vision" },
  { id: "whyglean", label: "Why Glean?", nav: "Why Glean" },
  { id: "mvp", label: "How We Start", nav: "The Plan" },
  { id: "details", label: "The Details", nav: "Details" },
  { id: "close", label: "Close", nav: "Close" },
]

const painPoints = [
  {
    title: "By the time grades are in, students have moved on",
    stat: "3 WEEKS TO GET EXAM RESULTS BACK",
    detail:
      "Exam results take weeks to return. By then, students have already moved on to the next unit — building on a foundation that was never solid.",
    tags: [
      { label: "Weeks of delay", explanation: "It takes up to 3 weeks for graded exams to return to students" },
      { label: "Wrong foundation builds", explanation: "Students keep learning on top of concepts they never actually understood" },
      { label: "No early warning", explanation: "There is no signal to the teacher that a student is lost until it is too late" },
    ],
    example: "A student breezes through homework but fails the exam. The teacher finds out three weeks later — after the next unit is halfway done.",
  },
  {
    title: "Grading consumes the time teachers should spend helping students",
    stat: "TEACHERS HAVE LESS THAN 2 HRS/WEEK LEFT FOR STUDENTS",
    detail:
      "Teachers spend 12-15 hours a week grading — leaving less than 2 hours for the 1:1 coaching that actually moves students forward.",
    tags: [
      { label: "12-15 hrs grading/week", explanation: "Most of a teacher's week outside class is spent marking papers" },
      { label: "30 students, 1 teacher", explanation: "The ratio makes individual attention nearly impossible" },
      { label: "No time to intervene", explanation: "By the time grading is done, the window to help has closed" },
    ],
    example: "A teacher finishes grading Sunday night. By then it is too late to reteach — the next class is already planned.",
  },
  {
    title: "Neither the teacher nor the student knows where it went wrong",
    stat: "NO VISIBILITY INTO WHY A STUDENT IS STUCK",
    detail:
      "Students get a score, not a diagnosis. Teachers see what is wrong but not why. Without the why, neither side knows what to fix.",
    tags: [
      { label: "Scores without reasons", explanation: "A grade tells you how much was wrong, not which concept broke down" },
      { label: "Students guess what to study", explanation: "Without a diagnosis, students study broadly instead of targeting the real gap" },
      { label: "Teachers intervene blind", explanation: "Teachers know a student is struggling but not what specifically to address" },
    ],
    example: "A student gets 62% on a quiz and studies more math that night. But the real issue was one specific misunderstanding in step 3 — and nobody pointed to it.",
  },
]

const mvpSteps = [
  {
    label: "SCAN",
    who: "Sarah — End of school day",
    what: "Sarah feeds the day's quizzes into the school scanner. That's it. Takes 2 minutes. Glean does everything else overnight.",
    why: "This is the only action Sarah needs to take. Everything else is automatic.",
  },
  {
    label: "ANALYZE",
    who: "Glean — Overnight",
    what: "Glean reads every answer, figures out what each student got wrong, and matches it to the curriculum Sarah is teaching.",
    why: "Analysis happens while Sarah sleeps — no extra work required.",
  },
  {
    label: "BRIEF",
    who: "Sarah — Next morning",
    what: "Sarah opens a simple summary before class. It shows which students are struggling, with what topic, and how confident Glean is.",
    why: "One glance gives Sarah everything she needs to adjust her lesson.",
  },
  {
    label: "TEACH",
    who: "Sarah — In class",
    what: "Sarah adjusts her lesson based on what Glean found. The suggestion comes directly from her own Unit 4 materials — not generic internet advice.",
    why: "The fix is grounded in what Sarah already teaches. No extra prep needed.",
  },
  {
    label: "HINT",
    who: "Marcus — That evening",
    what: "Marcus gets a specific prompt telling him exactly what to work on and why. Not just study more — a precise, actionable guide.",
    why: "Marcus stops guessing and starts understanding what he actually got wrong.",
  },
]

const whyGleanCards = [
  {
    icon: "📚",
    title: "Suggestions come from your curriculum, not the internet",
    body: "Glean indexes your school's lesson plans, curriculum documents, and LMS materials. Every recommendation a teacher gets is grounded in what they actually teach — not generic AI suggestions.",
    contrast: "Unlike generic AI tools that pull from the internet",
  },
  {
    icon: "🏫",
    title: "Your school gets smarter every year",
    body: "When a teacher finds a great way to fix a common misconception, that insight doesn't disappear. Glean makes it available to every teacher in the school — so the whole school learns, not just one classroom.",
    contrast: "Unlike generic AI that learns from one classroom only",
  },
  {
    icon: "🔒",
    title: "Student data stays private — by design",
    body: "Glean never stores raw student responses. It only keeps structured insights — what a student misunderstood, not what they wrote. Privacy isn't a policy — it's how the system is built.",
    contrast: "Privacy isn't a policy — it's architecture",
  },
]

const ecosystemNodes = [
  {
    icon: "👩‍🏫",
    label: "Teachers",
    tagline: "Finally have time to actually teach",
    outcomes: [
      "Recover 8-10 hours a week that was going to grading",
      "Walk into every class knowing exactly who needs help",
      "Feel like they are doing the job they signed up for",
    ],
  },
  {
    icon: "🧑‍🎓",
    label: "Students",
    tagline: "Stop guessing. Start understanding.",
    outcomes: [
      "Understand why they got something wrong — not just that they did",
      "Study smarter, not longer",
      "Build real confidence before test day",
    ],
  },
  {
    icon: "🏫",
    label: "School",
    tagline: "Better scores, more funding, stronger rep",
    outcomes: [
      "Higher test scores mean a stronger case for funding",
      "Teachers stay longer when they feel effective",
      "Data to show what is working across every classroom",
    ],
  },
  {
    icon: "👨‍👩‍👧",
    label: "Parents",
    tagline: "Know how their child is really doing",
    outcomes: [
      "No more 'I don't know' when asked about homework",
      "Child comes home knowing exactly what to review",
      "Real visibility into their child's learning — not just grades",
    ],
  },
]

const roadmapPhases = [
  {
    version: "V0",
    window: "NOW — 90 DAYS",
    headline: "One school. One subject. Prove the loop.",
    items: ["Quiz scanning via school scanner", "Canvas + Google Classroom connection", "Teacher morning summary", "Confidence scoring on every suggestion"],
  },
  {
    version: "V1",
    window: "4-9 MONTHS",
    headline: "Student study companion. More subjects. Expand the loop.",
    items: ["Student-facing study hints", "Algebra 1 + additional subjects", "Engagement tracking", "Teacher feedback loop"],
  },
  {
    version: "V2",
    window: "9-12 MONTHS",
    headline: "Every school in the district. Full intelligence. Scale the loop.",
    items: ["District-wide rollout", "Cross-classroom knowledge sharing", "Parent visibility layer", "District analytics dashboard"],
  },
]

const principles = [
  { title: "Get it right before scaling", body: "Missing some signals is fine. A wrong signal damages trust permanently." },
  { title: "Protect student privacy first", body: "We store what went wrong — never what was written. Privacy is built in, not bolted on." },
  { title: "Use your school's own materials", body: "Every suggestion comes from the teacher's own curriculum — not the internet." },
  { title: "One thing done really well", body: "Algebra 2 first, one robust loop first, then broader expansion." },
]

const detailsMetrics = {
  v0: [
    { target: "70%+", label: "Teachers open their summary before at least 3 classes a week" },
    { target: "8+ hrs", label: "Saved from grading every week" },
    { target: "75%+", label: "Suggestions the teacher actually acts on" },
    { target: "50%+", label: "Classes where teacher adjusts lesson based on Glean's summary" },
  ],
  v1: [
    { target: "60%+", label: "Students come back to the study companion more than once" },
    { target: "Measurable", label: "Test score improvement in Glean classrooms vs those without" },
  ],
  v2: [
    { target: "District-wide", label: "Adoption across multiple subjects" },
    { target: "Visible", label: "Overall class performance improvement in schools using Glean" },
  ],
}

const cycle = [
  {
    time: "Sunday evening",
    title: "Capture",
    desc: "Teacher photos quiz stacks. OCR and misconception detection run overnight.",
    image: "/images/phone-capture.jpg",
  },
  {
    time: "Monday 7:30am",
    title: "Brief",
    desc: "A 90-second brief shows top misconceptions, confidence, and grounded resources.",
    image: "/images/hero-teacher.jpg",
  },
  {
    time: "Monday class",
    title: "Intervene",
    desc: "Reteach, scaffold, and extend lanes replace one-size-fits-all instruction.",
    image: "/images/classroom-bright.jpg",
  },
  {
    time: "Evening practice",
    title: "Guide",
    desc: "Student companion gives Socratic prompts tied to teacher curriculum.",
    image: "/images/student-studying.jpg",
  },
]

const phases = [
  {
    name: "MVP",
    window: "0-3 months",
    outcome: "Reliable signal extraction + Monday intervention loop",
  },
  {
    name: "Phase 2",
    window: "4-9 months",
    outcome: "Student mastery map + engagement flywheel",
  },
  {
    name: "North Star",
    window: "9-12 months",
    outcome: "District learning intelligence layer",
  },
]

const successMetrics = [
  { label: "Teacher weekly active brief users", target: "70%+" },
  { label: "Monday intervention adoption", target: "50%+" },
  { label: "Grading time reclaimed", target: "8+ hrs/week" },
  { label: "High-confidence signal precision", target: "75%+" },
  { label: "Student companion return rate (Phase 2)", target: "60%+" },
  { label: "Unit assessment effect size", target: "0.3+ SD" },
]

function Slide({
  id,
  badge,
  title,
  subtitle,
  children,
  narrow = false,
}: {
  id: string
  badge?: string
  title: string
  subtitle?: string
  children: React.ReactNode
  narrow?: boolean
}) {
  return (
    <section id={id} className="min-h-screen border-b border-border/60 px-6 py-28 md:px-10 lg:px-14 scroll-mt-16">
      <div className={cn("mx-auto w-full", narrow ? "max-w-4xl" : "max-w-6xl")}>
        <header className="mb-10">
          {badge && (
            <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.18em] text-primary">{badge}</p>
          )}
          <h2 className="max-w-4xl text-3xl font-semibold leading-[1.08] tracking-[-0.02em] md:text-5xl">{title}</h2>
          {subtitle && <p className="mt-4 max-w-3xl text-base leading-[1.72] text-muted-foreground md:text-lg">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

function SectionDivider({ title }: { title: string }) {
  return (
    <section className="flex min-h-[30vh] items-center border-b border-border/60 bg-[#e2ded8] px-6 py-12 md:px-10 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#1c1c1c] md:text-4xl">{title}</h3>
      </div>
    </section>
  )
}

function CollapsibleDrawer({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl border border-border bg-card">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base font-semibold tracking-[-0.01em]">{title}</span>
        <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-90")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-6 py-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function PrdRevampPage() {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("cover")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedPain, setSelectedPain] = useState(0)
  const [activeCycle, setActiveCycle] = useState(0)
  const [activeAudience, setActiveAudience] = useState<"teacher" | "student">("teacher")
  const [activeMvpStep, setActiveMvpStep] = useState(0)
  const [roadmapOpen, setRoadmapOpen] = useState(false)
  const [impactModalOpen, setImpactModalOpen] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0)

      for (let i = sectionItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionItems[i].id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.25) {
          setActiveSection(sectionItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
        setImpactModalOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [])

  const audienceCard = useMemo(() => {
    if (activeAudience === "teacher") {
      return {
        title: "For teachers (Sarah)",
        body: "Start class with ranked intelligence: who is stuck, why, and what to do in period one.",
        stat: "From reactive grading to proactive coaching",
      }
    }

    return {
      title: "For students (Marcus)",
      body: "Get a private mastery map before test day: precise diagnosis and next action.",
      stat: "From score anxiety to clarity of next step",
    }
  }, [activeAudience])

  const activeNav = sectionItems.find((s) => s.id === activeSection)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground" style={{ fontFamily: "Arial, system-ui, sans-serif" }}>
      <div className="fixed left-0 top-0 z-[70] h-[3px] bg-primary transition-all" style={{ width: `${progress}%` }} />

      <header className="fixed left-0 right-0 top-[3px] z-[60] border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium tracking-[-0.01em] text-muted-foreground">Gaurav Mittal</span>
            <a
              href="https://github.com/gmittal1557/v0-interactive-website-design"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              aria-label="Open GitHub repository"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              className="flex items-center gap-2 rounded-md border border-transparent px-3 py-1.5 text-xs font-medium text-primary transition hover:border-border hover:bg-secondary"
            >
              <span className="uppercase tracking-wide">{activeNav?.nav || "Sections"}</span>
              <ChevronDown className={cn("h-3.5 w-3.5 transition", isMenuOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-[calc(100%+8px)] z-[80] w-60 rounded-lg border border-border bg-background p-1 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                >
                  {sectionItems.filter((item) => item.nav).map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs transition",
                        activeSection === item.id ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-secondary"
                      )}
                    >
                      <span className="w-5 font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <span className="tracking-[0.01em]">{item.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <section id="cover" className="relative flex min-h-screen items-center justify-center px-6 pt-24 text-center md:px-10">
        <div className="mx-auto max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-5xl font-semibold leading-[0.94] tracking-[-0.03em] md:text-8xl"
          >
            Glean for Teachers
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mx-auto my-6 h-[2px] w-28 bg-primary"
          />
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.55 }}
            className="text-lg leading-[1.45] text-muted-foreground md:text-2xl"
          >
            Helping teachers see where students are struggling, understand what they know, and personalize what comes next.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mt-4 max-w-4xl text-sm leading-[1.6] text-muted-foreground/90 md:text-base"
          >
            Glean for Teachers turns student work into real-time misconception insights and curriculum-grounded reteach
            plans—so teachers intervene before failure compounds.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            onClick={() => scrollTo("toc")}
            className="mx-auto mt-16 inline-flex items-center gap-2 text-xs text-muted-foreground"
          >
            Scroll to explore
            <ArrowDown className="h-4 w-4" />
          </motion.button>
        </div>
      </section>

      <Slide id="toc" badge="Glean for Teachers" title="Table of Contents" narrow>
        <ol className="space-y-2">
          {sectionItems.filter((s) => s.nav).map((item, i) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className="group flex w-full items-center justify-between rounded-lg border border-border/70 px-4 py-3 text-left transition hover:border-primary/40 hover:bg-primary/5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm md:text-base">{item.label}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </button>
            </li>
          ))}
        </ol>
      </Slide>

      <SectionDivider title="The Core Problem" />

      <Slide
        id="pain"
        badge="01 THE CORE PROBLEM"
        title="By the time a teacher knows a student is struggling, it's often too late."
        subtitle="Grading takes weeks. By then, students have moved on — with the wrong understanding baked in. Teachers don't know. Students don't know. The gap just grows."
      >
        <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            {painPoints.map((point, idx) => (
              <button
                key={point.title}
                onClick={() => setSelectedPain(idx)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition",
                  selectedPain === idx
                    ? "border-primary/35 border-l-[3px] border-l-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary">{point.stat}</p>
                <p className="mt-1 text-sm font-semibold">{point.title}</p>
              </button>
            ))}
          </div>

          <div className="h-full rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-primary">WHAT THIS MEANS</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPain}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.01em]">{painPoints[selectedPain].title}</h3>
                <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="mb-2 text-xs font-mono uppercase tracking-wider text-primary">Example:</p>
                  <p className="text-sm leading-[1.65] text-muted-foreground">{painPoints[selectedPain].example}</p>
                </div>
                <p className="mt-3 text-sm leading-[1.72] text-muted-foreground">{painPoints[selectedPain].detail}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {painPoints[selectedPain].tags.map((tag) => (
                    <div key={tag.label} className="group relative">
                      <div className="cursor-default rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground transition hover:border-primary/40 hover:bg-primary/5">
                        {tag.label}
                      </div>
                      <div className="absolute bottom-full left-0 z-10 mb-2 hidden w-52 rounded-lg border border-border bg-background p-2 text-xs text-muted-foreground shadow-lg group-hover:block">
                        {tag.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Slide>

      <SectionDivider title="Meet Sarah and Marcus" />

      <Slide id="personas" badge="02 WHO THIS IS FOR" title="Behind every struggling student is a teacher who didn't get the signal in time.">
        <video autoPlay loop muted playsInline className="mb-8 w-full rounded-2xl object-cover max-h-64 bg-muted">
          <source src="/videos/personas.mp4" type="video/mp4" />
        </video>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-mono uppercase text-primary">
              <GraduationCap className="h-3.5 w-3.5" />
              A week in Sarah's life
            </div>
            <p className="mb-4 text-sm text-muted-foreground">Sarah teaches Algebra 2 to 90 students across 3 classes. Here's what her week actually looks like.</p>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                "12-15 hours spent grading",
                "Less than 2 hours left for meaningful 1:1 coaching",
                "Finds out a student is struggling weeks after it started",
                "Walks into class each week with no clear sense of which students are falling behind",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-primary">A week in Marcus's life</p>
              <p className="mb-4 mt-3 text-sm text-muted-foreground">Marcus is a 10th grader in Sarah's class. He studies hard but often doesn't know what he's actually getting wrong.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-mono uppercase text-primary">
                <BookOpen className="h-3.5 w-3.5" />
                What he sees
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Gets his quiz back with a score — but no explanation of where he went wrong",
                  "Studies the same way every night, even when it isn't working",
                  "Has no way to know which specific concept is tripping him up",
                  "The help he gets is generic — not tied to what his teacher actually taught him",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <SectionDivider title="From Grading to Teaching" />

      <Slide
        id="vision"
        badge="03 NORTH STAR"
        title="Less time marking papers. More time actually helping students."
        subtitle="Glean works on two sides at once. Teachers get a clear picture of who is struggling and what to do. Students get specific, private guidance on what to fix. Both powered by the same overnight analysis."
      >
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="mb-4 text-xs font-mono uppercase tracking-wider text-primary">Sarah's side</p>
            <div className="space-y-4">
              {[
                { time: "End of class", action: "Feeds quizzes into the school scanner" },
                { time: "Overnight", action: "Glean reads and analyzes every answer" },
                { time: "Next morning", action: "Opens a simple summary before class" },
                { time: "In class", action: "Adjusts lesson based on what Glean found" },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-mono text-primary">{i + 1}</div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-primary">{step.time}</p>
                    <p className="text-sm text-muted-foreground">{step.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="mb-4 text-xs font-mono uppercase tracking-wider text-primary">Marcus's side</p>
            <div className="space-y-4">
              {[
                { time: "End of school", action: "Finishes homework and submits his work" },
                { time: "Overnight", action: "Glean flags gaps based on his responses" },
                { time: "That evening", action: "Gets a specific study hint — not generic advice" },
                { time: "Next day", action: "Understands exactly what he got wrong and why" },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-mono text-primary">{i + 1}</div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-primary">{step.time}</p>
                    <p className="text-sm text-muted-foreground">{step.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-border bg-card p-6">
          <p className="mb-4 text-xs font-mono uppercase tracking-wider text-primary">Product prototype</p>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="mb-3 text-xs font-mono uppercase tracking-wider text-primary">Teacher View — Sarah's morning summary</p>
              <p className="text-sm font-semibold">Good morning, Sarah. Here's what needs your attention today.</p>
              <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
                <p className="mb-1 text-xs font-mono text-primary">Top issue — High confidence</p>
                <p className="text-sm text-muted-foreground">A third of your class misunderstood the same concept in yesterday's quiz.</p>
                <p className="mt-2 text-xs text-muted-foreground">Suggested: 10 min reteach at start of class · From your Unit 4, Lesson 3</p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="mb-3 text-xs font-mono uppercase tracking-wider text-primary">Student View — Marcus's evening hint</p>
              <p className="text-sm font-semibold">Here's where to focus tonight, Marcus.</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> Factoring — you've got this
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="h-4 w-4 text-primary" /> Discriminant — let's work on this one
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                What do you think happens when the number under the square root is negative? Try working it out before checking your notes.
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground/60">No grade impact. Just for you.</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setImpactModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/10"
        >
          See the full impact
          <ArrowRight className="h-4 w-4" />
        </button>
      </Slide>

      <SectionDivider title="Why Glean?" />

      <Slide id="whyglean" badge="04 THE DIFFERENCE" title="Most tools give generic advice. Glean knows your classroom.">
        <div className="grid gap-6 md:grid-cols-3">
          {whyGleanCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="text-3xl">{card.icon}</span>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em]">{card.title}</h3>
              <p className="mt-2 text-sm leading-[1.72] text-muted-foreground">{card.body}</p>
              <p className="mt-4 text-xs italic text-muted-foreground/60">{card.contrast}</p>
            </div>
          ))}
        </div>
      </Slide>

      <SectionDivider title="How We Start" />

      <Slide id="mvp" badge="05 THE PLAN" title="We're not building everything at once. Here's why.">
        <p className="mb-8 max-w-3xl text-sm leading-[1.72] text-muted-foreground md:text-base">
          We're not trying to boil the ocean. We're starting with the smallest version that proves teachers find this useful and students learn better because of it.
        </p>

        <div className="mb-6 rounded-2xl border border-border bg-card p-6">
          <p className="mb-4 text-xs font-mono uppercase tracking-wider text-primary">A week with Glean — click each step</p>
          <div className="mb-6 flex gap-2 overflow-x-auto">
            {mvpSteps.map((step, i) => (
              <button
                key={step.label}
                onClick={() => setActiveMvpStep(i)}
                className={cn(
                  "shrink-0 rounded-lg border px-4 py-2 text-xs font-mono uppercase tracking-wider transition",
                  activeMvpStep === i ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/40"
                )}
              >
                {step.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMvpStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-border bg-background p-5"
            >
              <p className="mb-1 text-xs font-mono uppercase tracking-wider text-primary">{mvpSteps[activeMvpStep].who}</p>
              <p className="mb-3 text-sm leading-[1.72] text-foreground">{mvpSteps[activeMvpStep].what}</p>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <p className="mb-1 text-xs font-mono text-primary">WHY THIS IS IN V0</p>
                <p className="text-xs text-muted-foreground">{mvpSteps[activeMvpStep].why}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setActiveMvpStep((p) => Math.max(0, p - 1))}
              disabled={activeMvpStep === 0}
              className="text-xs text-muted-foreground transition hover:text-primary disabled:opacity-30"
            >
              ← Previous
            </button>
            <button
              onClick={() => setActiveMvpStep((p) => Math.min(mvpSteps.length - 1, p + 1))}
              disabled={activeMvpStep === mvpSteps.length - 1}
              className="text-xs text-muted-foreground transition hover:text-primary disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setRoadmapOpen((v) => !v)}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            See the full roadmap
            <ChevronRight className={cn("h-4 w-4 transition-transform", roadmapOpen && "rotate-90")} />
          </button>
          <AnimatePresence>
            {roadmapOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {roadmapPhases.map((phase) => (
                    <div key={phase.version} className="rounded-xl border border-border bg-card p-4">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-primary">{phase.window}</p>
                      <p className="mt-1 text-lg font-semibold">{phase.version}</p>
                      <p className="mb-3 mt-1 text-xs text-muted-foreground">{phase.headline}</p>
                      {phase.items.map((item) => (
                        <div key={item} className="mt-1 flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {principles.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold tracking-[-0.01em]">{p.title}</p>
              <p className="mt-2 text-xs text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Slide>

      <SectionDivider title="The Details" />
      <Slide id="details" badge="06 DEEP DIVE" title="Want to go deeper? It's all here.">
        <div className="space-y-4">
          <CollapsibleDrawer title="How it's built">
            <div className="space-y-6">
              <div>
                <p className="mb-4 text-xs font-mono uppercase tracking-wider text-primary">The flow</p>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { node: "Scanner", tech: "School scanner" },
                    { node: "OCR", tech: "GPT-4V / Google Doc AI" },
                    { node: "Classifier", tech: "Fine-tuned model" },
                    { node: "RAG", tech: "Glean Enterprise Search" },
                    { node: "Teacher Brief", tech: "Canvas / Google Classroom" },
                  ].map((item, i, arr) => (
                    <div key={item.node} className="flex items-center gap-2">
                      <div className="rounded-lg border border-border bg-background p-3 text-center">
                        <p className="text-xs font-semibold">{item.node}</p>
                        <p className="text-[10px] text-muted-foreground">{item.tech}</p>
                      </div>
                      {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  "OCR accuracy on messy handwriting -> 85% confidence threshold + teacher review flag",
                  "Misconception misclassification -> teacher override with one click",
                  "Retrieval latency -> hard 2-second limit before launch",
                ].map((risk) => (
                  <div key={risk} className="rounded-xl border border-border bg-background p-3 text-xs text-muted-foreground">
                    {risk}
                  </div>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {[
                  "We'd rather flag 5 students we're sure about than flag 20 and be wrong half the time",
                  "Glean never saves what a student wrote - only what they got wrong. Privacy by design, not policy",
                ].map((t) => (
                  <div key={t} className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleDrawer>

          <CollapsibleDrawer title="How we get into schools">
            <div className="space-y-5 text-sm text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Who we sell to:</span> Department Head &rarr; results
                visible &rarr; Principal &rarr; District
              </p>
              <p>
                <span className="font-semibold text-foreground">30-day free pilot:</span> Week 1-2 (setup + first scan)
                &rarr; Week 3-4 (first brief + classroom use)
              </p>
              <p>
                <span className="font-semibold text-foreground">Pricing:</span> Flat monthly fee per school
                (~$500-800/month), district license once proven
              </p>
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-semibold text-foreground">Why Algebra 2 first</p>
                <div className="mt-2 space-y-2 text-xs">
                  {[
                    "Standard concept progression across schools",
                    "High misconception frequency and measurable reteach impact",
                    "Clear assessment loops within one term",
                    "Existing teacher pain is immediate and explicit",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-3 w-3 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs">
                The grading objection addressed: Scanner already in school, Canvas already used, teacher's only new
                action is feeding quizzes through scanner.
              </p>
            </div>
          </CollapsibleDrawer>

          <CollapsibleDrawer title="How we know it's working">
            <div className="space-y-5">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {detailsMetrics.v0.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-border bg-background p-4">
                    <p className="text-lg font-mono font-bold text-primary">{metric.target}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {detailsMetrics.v1.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-border bg-background p-4">
                    <p className="text-lg font-mono font-bold text-primary">{metric.target}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {detailsMetrics.v2.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-border bg-background p-4">
                    <p className="text-lg font-mono font-bold text-primary">{metric.target}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-[1.72] text-muted-foreground">
                Teachers catch learning gaps before the exam. Students arrive at test day knowing exactly what they
                understood — and what they didn't.
              </div>
            </div>
          </CollapsibleDrawer>
        </div>
      </Slide>

      <SectionDivider title="Before You Go" />

      <section
        id="close"
        className="min-h-screen border-b border-border/60 px-6 py-28 md:px-10 lg:px-14 scroll-mt-16"
        style={{ backgroundColor: "#1c1c1c", color: "#ffffff" }}
      >
        <div className="mx-auto w-full max-w-4xl">
          <header className="mb-10">
            <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.18em] text-primary">07 CLOSE</p>
            <p
              style={{
                fontStyle: "italic",
                fontSize: "18px",
                color: "#9ca3af",
                marginBottom: "48px",
                lineHeight: 1.7,
              }}
            >
              This is a product I'd want to exist. Here's what I'd do first.
            </p>
            <h2
              className="max-w-4xl text-3xl font-semibold leading-[1.08] tracking-[-0.02em] md:text-5xl"
              style={{ color: "#ffffff" }}
            >
              What I'd Do in Week One
            </h2>
          </header>

          <div style={{ display: "grid", gap: "28px" }}>
            <p style={{ color: "#d1d5db", fontSize: "17px", lineHeight: 1.85 }}>
              The hardest part of this problem isn't the technology. It's earning a <strong style={{ color: "#ffffff" }}>teacher's trust</strong> on a Monday morning with 30 restless students waiting. That single moment shaped every decision in this document.
            </p>
            <p style={{ color: "#d1d5db", fontSize: "17px", lineHeight: 1.85 }}>
              In week one I'd be <strong style={{ color: "#ffffff" }}>in a classroom</strong>. Not showing software — watching a teacher grade quizzes and asking what they do with the results. The product has to <strong style={{ color: "#ffffff" }}>fit that moment</strong> before it can change it.
            </p>
            <p style={{ color: "#d1d5db", fontSize: "17px", lineHeight: 1.85 }}>
              That's what excites me about this role: the <strong style={{ color: "#ffffff" }}>deployed PM</strong> is the feedback loop that the product itself is trying to create.
            </p>
          </div>

          <div
            style={{
              width: "48px",
              height: "1px",
              background: "#374151",
              margin: "48px 0",
            }}
          />

          <p style={{ fontSize: "20px", color: "#ffffff", fontWeight: 600, lineHeight: 1.6 }}>
            Week one starts with a classroom. Everything else follows.
          </p>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-xs text-muted-foreground md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p>Glean for Teachers · Forward PM Assignment</p>
          <button onClick={() => scrollTo("cover")} className="inline-flex items-center gap-1 text-primary">
            Back to top
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {impactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-6"
            onClick={() => setImpactModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background p-8 shadow-2xl"
            >
              <button
                onClick={() => setImpactModalOpen(false)}
                className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="mb-2 text-xs font-mono uppercase tracking-wider text-primary">The full impact</p>
              <h3 className="mb-6 text-2xl font-semibold tracking-[-0.01em]">How Glean changes things for everyone in the room</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {ecosystemNodes.map((node, i) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="cursor-pointer rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:bg-primary/5"
                    onMouseEnter={() => setHoveredNode(i)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-2xl">{node.icon}</span>
                      <div>
                        <p className="text-sm font-semibold">{node.label}</p>
                        <p className="text-xs text-muted-foreground">{node.tagline}</p>
                      </div>
                    </div>
                    <AnimatePresence>
                      {hoveredNode === i && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 space-y-1 overflow-hidden"
                        >
                          {node.outcomes.map((outcome) => (
                            <li key={outcome} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                              {outcome}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

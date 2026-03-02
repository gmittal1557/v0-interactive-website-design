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
  Info,
  Lock,
  Mail,
  Radar,
  ShieldCheck,
  Target,
  X,
} from "lucide-react"
import { AppendixDialog } from "@/components/appendix-dialog"
import { cn } from "@/lib/utils"
import {
  trackSectionView,
  trackNavClick,
  trackTocClick,
  trackButtonClick,
  trackTabSwitch,
  trackToggle,
  trackExternalLink,
  trackPainPointSelect,
  trackMvpStepView,
  trackScrollDepth,
} from "@/lib/tracking"

const sectionItems = [
  { id: "cover", label: "Cover", nav: "" },
  { id: "toc", label: "Table of Contents", nav: "" },
  { id: "pain", label: "The Core Problem", nav: "The Problem" },
  { id: "personas", label: "Who This Is For", nav: "Personas" },
  { id: "vision", label: "The Vision", nav: "Vision" },
  { id: "whyglean", label: "Why Glean?", nav: "Why Glean" },
  { id: "mvp", label: "The MVP", nav: "The Plan" },
  { id: "details", label: "MVP Spec", nav: "MVP Spec" },
  { id: "openquestions", label: "Open Questions", nav: "Open Questions" },
  { id: "close", label: "Close", nav: "Close" },
]

// TODO: Replace with your live v0 embed URL before submission
const V0_PROTOTYPE_URL = "https://v0-glean-for-teachers-prototype.vercel.app/"

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
    who: "TEACHER — End of school day",
    what: "The teacher feeds the day's quizzes into the school scanner. That's it. Takes 2 minutes. Glean does everything else overnight.",
    why: "This is the only action the teacher needs to take. Everything else is automatic.",
  },
  {
    label: "ANALYZE",
    who: "GLEAN — Overnight",
    what: "Glean reads every answer, figures out what each student got wrong, and matches it to the curriculum Sarah is teaching.",
    why: "Analysis happens while Sarah sleeps — no extra work required.",
  },
  {
    label: "BRIEF",
    who: "TEACHER — Next morning",
    what: "The teacher opens a simple summary before class. It shows which students need attention, on what topic, and how confident Glean is.",
    why: "One glance gives Sarah everything she needs to adjust her lesson.",
  },
  {
    label: "TEACH",
    who: "TEACHER — In class",
    what: "The teacher adjusts the lesson based on what Glean found. Every suggestion comes directly from their own curriculum materials — not generic internet advice.",
    why: "The fix is grounded in what Sarah already teaches. No extra prep needed.",
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
    icon: "teachers",
    label: "Teachers",
    tagline: "Finally have time to actually teach",
    outcomes: [
      "Recover 8-10 hours a week that was going to grading",
      "Walk into every class knowing exactly who needs help",
      "Feel like they are doing the job they signed up for",
    ],
  },
  {
    icon: "students",
    label: "Students",
    tagline: "Stop guessing. Start understanding.",
    outcomes: [
      "Understand why they got something wrong — not just that they did",
      "Study smarter, not longer",
      "Build real confidence before test day",
    ],
  },
  {
    icon: "school",
    label: "School",
    tagline: "Better scores, more funding, stronger rep",
    outcomes: [
      "Higher test scores mean a stronger case for funding",
      "Teachers stay longer when they feel effective",
      "Data to show what is working across every classroom",
    ],
  },
  {
    icon: "parents",
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
    version: "MVP",
    window: "NOW — 90 DAYS",
    headline: "One school. One subject. Prove the loop.",
    items: ["Quiz scanning via school scanner", "Canvas + Google Classroom connection", "Teacher morning summary", "Confidence scoring on every suggestion"],
  },
  {
    version: "PHASE 2",
    window: "4-9 MONTHS",
    headline: "Student tooling unlocked. More subjects. Expand the loop.",
    items: ["Student-facing study hints", "Algebra 1 + additional subjects", "Engagement tracking", "Teacher feedback loop"],
  },
  {
    version: "NORTH STAR",
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
  const [hasHovered, setHasHovered] = useState(false)
  const [activeCycle, setActiveCycle] = useState(0)
  const [activeAudience, setActiveAudience] = useState<"teacher" | "student">("teacher")
  const [activeMvpStep, setActiveMvpStep] = useState(0)
  const [roadmapOpen, setRoadmapOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"built" | "gtm" | "metrics">("built")
  const [hasTabInteracted, setHasTabInteracted] = useState(false)
  const [openRisk, setOpenRisk] = useState(false)
  const [openPrinciples, setOpenPrinciples] = useState(false)
  const [openAlgebraWhy, setOpenAlgebraWhy] = useState(false)
  const [personasVideoError, setPersonasVideoError] = useState(false)
  const [prototypeIframeError, setPrototypeIframeError] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [impactModalOpen, setImpactModalOpen] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const prevSectionRef = useRef("cover")

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setProgress(pct)
      trackScrollDepth(pct)

      for (let i = sectionItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionItems[i].id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.25) {
          const newSection = sectionItems[i].id
          if (newSection !== prevSectionRef.current) {
            prevSectionRef.current = newSection
            trackSectionView(newSection)
          }
          setActiveSection(newSection)
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

  const scrollTo = (id: string, source?: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
    if (source) trackNavClick(`${source}:${id}`)
  }

  const toggleRisk = () => {
    setOpenRisk((prev) => {
      const next = !prev
      if (next) setOpenPrinciples(false)
      trackToggle("key_risks", next)
      return next
    })
  }

  const togglePrinciples = () => {
    setOpenPrinciples((prev) => {
      const next = !prev
      if (next) setOpenRisk(false)
      trackToggle("design_principles", next)
      return next
    })
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
              onClick={() => trackExternalLink("github", "https://github.com/gmittal1557/v0-interactive-website-design")}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              aria-label="Open GitHub repository"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/iamgauravmittal/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExternalLink("linkedin", "https://www.linkedin.com/in/iamgauravmittal/")}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              aria-label="Open LinkedIn profile"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V23h-4v-7.63c0-1.82-.03-4.16-2.54-4.16-2.54 0-2.93 1.98-2.93 4.03V23h-4V8z" />
              </svg>
            </a>
            <a
              href="mailto:gmittal1557@gmail.com"
              onClick={() => trackExternalLink("email", "mailto:gmittal1557@gmail.com")}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              aria-label="Send email"
            >
              <Mail className="h-3.5 w-3.5" />
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
                      onClick={() => scrollTo(item.id, "menu")}
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
            onClick={() => { scrollTo("toc"); trackButtonClick("scroll_to_explore", "cover") }}
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
                onClick={() => { scrollTo(item.id); trackTocClick(item.id) }}
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
          <div className="flex h-full flex-col gap-3">
            <p className="mb-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Select a problem</p>
            {painPoints.map((point, idx) => (
              <button
                key={point.title}
                onClick={() => { setSelectedPain(idx); trackPainPointSelect(idx, point.title) }}
                className={cn(
                  "w-full flex-1 cursor-pointer rounded-xl border p-4 text-left transition hover:border-l-[3px] hover:border-l-primary/50",
                  selectedPain === idx
                    ? "border-primary/35 border-l-[3px] border-l-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-primary">{point.stat}</p>
                    <p className="mt-1 text-sm font-semibold">{point.title}</p>
                  </div>
                  <ChevronRight className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", selectedPain === idx ? "text-primary" : "text-muted-foreground")} />
                </div>
              </button>
            ))}
          </div>

          <div className="h-full min-h-[400px] rounded-2xl border border-border bg-card p-6">
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
                    <div key={tag.label} className="group relative" onMouseEnter={() => setHasHovered(true)}>
                      <div className="cursor-default rounded-lg border border-dashed border-border bg-background px-3 py-2 text-xs text-muted-foreground transition hover:border-primary/40 hover:bg-primary/5">
                        <span className="inline-flex items-center gap-1.5">
                          {tag.label}
                          <Info className="h-3 w-3 text-muted-foreground/50" />
                        </span>
                      </div>
                      <div className="absolute bottom-full left-0 z-10 mb-2 hidden w-52 rounded-lg border border-border bg-background p-2 text-xs text-muted-foreground shadow-lg group-hover:block">
                        {tag.explanation}
                      </div>
                    </div>
                  ))}
                </div>
                {selectedPain === 0 && !hasHovered && (
                  <p className="mt-2 text-[10px] italic text-muted-foreground/40">Hover any tag to learn more</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Slide>

      <SectionDivider title="Meet Sarah and Marcus" />

      <Slide id="personas" badge="02 WHO THIS IS FOR" title="Behind every struggling student is a teacher who didn't get the signal in time.">
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-6">
          <div className="h-full rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-mono uppercase text-primary">
              <GraduationCap className="h-3.5 w-3.5" />
              A week in Sarah's life
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Sarah teaches Algebra 2 to 90 students across 3 classes. Here's what her week actually looks like.
            </p>
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

          <div className="w-[280px]">
            {personasVideoError ? (
              <div className="flex h-full max-h-[480px] min-h-[420px] w-full items-center justify-center rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground">Video loading...</p>
              </div>
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                onError={() => setPersonasVideoError(true)}
                className="h-full max-h-[480px] w-full rounded-2xl object-cover"
              >
                <source src="/videos/personas.mp4" type="video/mp4" />
              </video>
            )}
            <p className="mt-3 text-center text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              A week without Glean
            </p>
          </div>

          <div className="h-full rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-mono uppercase text-primary">
              <BookOpen className="h-3.5 w-3.5" />
              A week in Marcus's life
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Marcus is a 10th grader in Sarah's class. He studies hard but often doesn't know what he's actually getting wrong.
            </p>
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
      </Slide>

      <SectionDivider title="From Grading to Teaching" />

      <Slide
        id="vision"
        badge="03 NORTH STAR"
        title="Less time marking papers. More time actually helping students."
        subtitle="Glean gives teachers a clear picture of who is struggling and exactly what to do — powered by overnight analysis of student work. No extra grading. No guessing. Just signal."
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="my-8 rounded-2xl bg-[#1c1c1c] px-10 py-12"
        >
          <p className="text-center text-2xl font-semibold leading-snug text-gray-400 md:text-3xl">
            Every tool before this made grading faster.
          </p>
          <p className="mt-2 text-center text-2xl font-bold leading-snug text-white md:text-3xl">
            Glean makes grading irrelevant.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-12 bg-primary" />
          <p className="mt-4 text-center text-sm text-gray-500">
            That's the difference between a better tool and a different category.
          </p>
        </motion.div>

        <div className="mb-8 rounded-2xl border border-border bg-card p-6">
          <div className="mb-3 grid grid-cols-2">
            <p className="text-[10px] font-mono uppercase tracking-wider text-red-400">BEFORE</p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-primary">WITH GLEAN</p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="pr-4">
              <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                <p className="text-sm text-foreground">Sarah grades for 12 hours. Finds out Marcus was lost 3 weeks later.</p>
                <p className="mt-2 text-sm text-foreground">Marcus gets a score. Studies the wrong things all week.</p>
              </div>
            </div>
            <div className="pl-4">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm text-foreground">Sarah opens a 90-second brief. Knows exactly who to help and how.</p>
                <p className="mt-2 text-sm text-foreground">The teacher opens a 90-second brief. Knows exactly who to help before class starts.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-xs font-mono uppercase tracking-wider text-primary">INTERACTIVE PROTOTYPE</p>
          <a
            href={V0_PROTOTYPE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackExternalLink("prototype_v0", V0_PROTOTYPE_URL)}
            className="text-xs text-primary hover:underline"
          >
            ↗ Open in v0
          </a>
        </div>
        <p className="mb-3 text-xs italic text-muted-foreground">Click through to explore the teacher and student views</p>
        <iframe
          src={V0_PROTOTYPE_URL}
          width="100%"
          height="600px"
          className="rounded-2xl border border-border"
          allow="fullscreen"
          onError={() => setPrototypeIframeError(true)}
          title="Glean for Teachers v0 prototype"
        />
        {prototypeIframeError && (
          <div className="mt-3 flex min-h-[120px] items-center justify-center rounded-2xl bg-muted">
            <p className="text-sm text-muted-foreground">Prototype loading — open directly in v0 ↗</p>
          </div>
        )}

        <button
          onClick={() => { setImpactModalOpen(true); trackButtonClick("impact_modal", "vision") }}
          className="mt-4 ml-auto inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/10"
        >
          See who else this changes things for →
        </button>
      </Slide>

      <SectionDivider title="Why Glean?" />

      <Slide id="whyglean" badge="04 WHY GLEAN" title="Most tools give generic advice. Glean knows your classroom.">
        <div className="grid grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
            <img src="/images/curriculum.jpg" className="mb-4 h-36 w-full rounded-xl object-cover" alt="Curriculum grounded suggestions" />
            <h3 className="text-lg font-semibold tracking-[-0.01em]">Your curriculum. Not the internet.</h3>
            <p className="mt-2 text-sm leading-[1.72] text-muted-foreground">
              Glean indexes your school's lesson plans, curriculum documents, and LMS materials. Every suggestion is grounded in what you actually teach — not generic AI advice pulled from the web.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
            <img src="/images/privacy.jpg" className="mb-4 h-36 w-full rounded-xl object-cover" alt="Privacy by design" />
            <h3 className="text-lg font-semibold tracking-[-0.01em]">Student data stays private — by architecture.</h3>
            <p className="mt-2 text-sm leading-[1.72] text-muted-foreground">
              Glean never stores what a student wrote. Only what they misunderstood. Privacy isn't a policy we added at the end — it's a constraint we built around from day one.
            </p>
          </div>
        </div>

        <div className="mt-6 w-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
          <div className="grid grid-cols-[1fr_1fr] items-center gap-8">
            <img src="/images/network.jpg" className="h-48 w-full rounded-xl object-cover" alt="Network effect across classrooms" />
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.01em]">The whole school learns, not just one classroom.</h3>
              <p className="mt-2 text-sm leading-[1.72] text-muted-foreground">
                When a teacher finds a great way to fix a common misconception, that insight doesn't disappear. Glean surfaces it for every teacher in the school. The longer Glean is used, the smarter the whole school gets — a compounding advantage no single-classroom tool can replicate.
              </p>
              <div className="mt-4 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3">
                <p className="text-sm font-medium text-primary">
                  Unlike generic AI that resets with every new user — Glean's value compounds across your entire school.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <SectionDivider title="Building the MVP" />

      <Slide id="mvp" badge="05 THE PLAN" title="We're not building everything at once. Here's why.">
        <p className="mb-8 max-w-3xl text-sm leading-[1.72] text-muted-foreground md:text-base">
          We're not trying to boil the ocean. We're starting with the smallest version that proves one thing: teachers get a reliable signal and act on it before the next class.
        </p>

        <div className="mb-6 rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-mono uppercase tracking-wider text-primary">A week with Glean</p>
            {!hasInteracted && (
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[11px] italic text-muted-foreground"
              >
                ← click each step to explore
              </motion.span>
            )}
          </div>
          <div className="mb-6 flex gap-2 overflow-x-auto">
            {mvpSteps.map((step, i) => (
              <button
                key={step.label}
                onClick={() => {
                  setActiveMvpStep(i)
                  if (i > 0) setHasInteracted(true)
                  trackMvpStepView(step.label, i)
                }}
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
                <p className="mb-1 text-xs font-mono text-primary">WHY THIS IS IN THE MVP</p>
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

        <div className="mb-6 rounded-xl border border-border bg-muted/40 px-5 py-4">
          <p className="mb-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            NOT IN THIS MVP
          </p>
          <p className="text-sm text-muted-foreground">
            Student-facing study hints are deliberately out of scope. We need to prove teachers trust the signal before we put it in front of students. Marcus gets his tooling in Phase 2 — once the teacher loop is working.
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={() => { setRoadmapOpen((v) => { trackToggle("roadmap", !v); return !v }) }}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/10"
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

        <div className="mt-6 border-t border-border pt-6" />
        <p className="mb-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          WHAT GUIDES EVERY MVP DECISION
        </p>
        <div className="grid gap-3 md:grid-cols-4">
          {principles.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold tracking-[-0.01em]">{p.title}</p>
              <p className="mt-2 text-xs text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Slide>

      <SectionDivider title="The MVP Spec" />
      <Slide
        id="details"
        badge="06 MVP SPEC"
        title="The MVP, in detail."
      >
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">EXPLORE THE SPEC</p>
            {!hasTabInteracted && (
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-[11px] italic text-muted-foreground"
              >
                ← select a view
              </motion.span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: "built", label: "How it's built" },
              { key: "gtm", label: "Go-to-Market" },
              { key: "metrics", label: "Success Metrics" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as "built" | "gtm" | "metrics")
                  if (tab.key !== "built") setHasTabInteracted(true)
                  trackTabSwitch(tab.key, "mvp_spec")
                }}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm transition-all duration-150",
                  activeTab === tab.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border border-border bg-muted text-muted-foreground hover:border-primary/40 hover:bg-muted/80 hover:text-foreground"
                )}
              >
                <span className={cn("mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary/40", activeTab === tab.key && "hidden")} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
          {activeTab === "built" && (
            <div className="space-y-6">
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold">Step</th>
                      <th className="px-4 py-3 text-left font-semibold">What happens</th>
                      <th className="px-4 py-3 text-left font-semibold">Tech</th>
                      <th className="px-4 py-3 text-left font-semibold">Why this choice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        step: "Submit",
                        what: "Teacher feeds quiz into the school scanner",
                        tech: "School scanner",
                        why: "Zero new hardware — scanner already exists in school",
                      },
                      {
                        step: "Extract",
                        what: "Handwriting converted to structured text",
                        tech: "GPT-4V / Google Doc AI",
                        why: "GPT-4V handles messy student handwriting better than standard OCR",
                      },
                      {
                        step: "Classify",
                        what: "Each answer mapped to a concept and scored for confidence",
                        tech: "Fine-tuned misconception classifier",
                        why: "Fine-tuned on education data — generic models miss subject-specific errors",
                      },
                      {
                        step: "Retrieve",
                        what: "Gap matched to teacher's own curriculum materials",
                        tech: "Glean Enterprise Search",
                        why: "Glean's enterprise search grounds suggestions in the teacher's own materials",
                      },
                      {
                        step: "Deliver",
                        what: "Summary pushed to teacher's LMS before next class",
                        tech: "Canvas / Google Classroom",
                        why: "Canvas and Google Classroom are already open on the teacher's screen every morning",
                      },
                    ].map((row, idx) => (
                      <tr
                        key={row.step}
                        className={cn(
                          "border-b border-border last:border-b-0 hover:bg-muted/30",
                          idx % 2 === 0 ? "bg-background" : "bg-muted/10"
                        )}
                      >
                        <td className="px-4 py-3 font-semibold">{row.step}</td>
                        <td className="px-4 py-3">{row.what}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.tech}</td>
                        <td className="px-4 py-3 text-xs italic text-muted-foreground">{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-4">
                <div className="flex-1">
                  <button
                    onClick={toggleRisk}
                    className={cn(
                      "w-full rounded-2xl border px-5 py-4 text-left transition-all duration-200",
                      openRisk ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">Key risks</p>
                        <p className={cn("mt-1 text-xs", openRisk ? "text-primary-foreground/70" : "text-muted-foreground")}>
                          3 risks we've already planned for
                        </p>
                      </div>
                      {openRisk ? (
                        <X className="mt-0.5 h-4 w-4" />
                      ) : (
                        <ChevronRight className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openRisk && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-2 mt-2 border-l-2 border-primary pl-4">
                          <div className="grid grid-cols-1 gap-2">
                            {[
                              {
                                risk: "OCR on messy handwriting",
                                mitigation: "85% confidence threshold + teacher review flag",
                              },
                              {
                                risk: "Misconception misclassification",
                                mitigation: "Teacher can override with one click",
                              },
                              { risk: "Retrieval latency", mitigation: "Hard 2-second limit enforced before launch" },
                            ].map((item) => (
                              <div key={item.risk} className="rounded-xl border border-border bg-background p-4">
                                <p className="text-xs font-semibold">{item.risk}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{item.mitigation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex-1">
                  <button
                    onClick={togglePrinciples}
                    className={cn(
                      "w-full rounded-2xl border px-5 py-4 text-left transition-all duration-200",
                      openPrinciples ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">Design principles</p>
                        <p className={cn("mt-1 text-xs", openPrinciples ? "text-primary-foreground/70" : "text-muted-foreground")}>
                          2 decisions that shaped the architecture
                        </p>
                      </div>
                      {openPrinciples ? (
                        <X className="mt-0.5 h-4 w-4" />
                      ) : (
                        <ChevronRight className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openPrinciples && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-2 mt-2 border-l-2 border-primary pl-4">
                          <div className="grid grid-cols-1 gap-2">
                            {[
                              {
                                principle: "Precision over recall",
                                detail: "We'd rather flag 5 students we're sure about than flag 20 and be wrong half the time",
                              },
                              {
                                principle: "Privacy by design",
                                detail:
                                  "Glean never saves what a student wrote — only what they got wrong. Not policy — architecture",
                              },
                            ].map((item) => (
                              <div key={item.principle} className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                                <p className="text-xs font-semibold">{item.principle}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gtm" && (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-primary">Pilot</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    30-day free pilot with one Algebra 2 teacher. Weeks 1-2: setup + first scan. Weeks 3-4: first brief + classroom use.
                  </p>
                  <button
                    onClick={() => { setOpenAlgebraWhy((v) => { trackToggle("algebra_2_why", !v); return !v }) }}
                    className="mt-3 text-left text-xs text-primary"
                  >
                    Why Algebra 2 first ›
                  </button>
                  <AnimatePresence>
                    {openAlgebraWhy && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-2 text-xs text-muted-foreground">
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-primary">Prove</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Department Head sees results. Principal gets summary report. Trust is earned before we ask for budget.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-primary">Scale</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    School-wide license at ~$500-800/month. District license once outcomes are proven across subjects.
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
                <p className="mb-2 text-[11px] font-mono uppercase tracking-wider text-primary">
                  THE OBJECTION WE ALREADY SOLVED
                </p>
                <p className="text-sm text-muted-foreground">
                  Scanner already in school. Canvas already open every morning. The teacher's only new action is feeding quizzes through the scanner — 2 minutes at the end of class.
                </p>
              </div>
            </div>
          )}

          {activeTab === "metrics" && (
            <div className="space-y-5">
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold">The question</th>
                      <th className="px-4 py-3 text-left font-semibold">How we measure it</th>
                      <th className="px-4 py-3 text-left font-semibold">Why it matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        q: "Are teachers actually using it?",
                        m: "70%+ open their morning summary before at least 3 classes a week",
                        w: "Proves habit formation — not just novelty",
                      },
                      {
                        q: "Is it saving real time?",
                        m: "8+ hours reclaimed from grading every week",
                        w: "Proves the core value proposition is real",
                      },
                      {
                        q: "Is it changing what happens in class?",
                        m: "50%+ of teachers adjust their lesson based on Glean's brief",
                        w: "Proves it's not just read — it's acted on",
                      },
                      {
                        q: "Are suggestions trusted?",
                        m: "75%+ of flagged students are ones the teacher acts on",
                        w: "Proves signal quality — not just volume",
                      },
                    ].map((row) => (
                      <tr key={row.q} className="border-b border-border last:border-b-0">
                        <td className="px-4 py-3 font-semibold">{row.q}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.m}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.w}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <p className="mb-4 text-sm font-semibold text-foreground">If those pass, we then ask:</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-base font-semibold tracking-[-0.01em] text-primary">Do students learn more?</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Measurable test score improvement vs. control classrooms (target: 0.3+ SD effect size)
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-base font-semibold tracking-[-0.01em] text-primary">Does it reach students?</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Once teacher trust is established, we add student-facing hints. Target: 60%+ of students engage with the study companion more than once per week
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-[1.72] text-muted-foreground">
                Teachers catch learning gaps before the exam. Students arrive at test day knowing exactly what they
                understood — and what they didn't.
              </div>
            </div>
          )}
          </div>
        </div>
      </Slide>

      <SectionDivider title="Open Questions" />

      <Slide
        id="openquestions"
        badge="08 OPEN QUESTIONS"
        title="What we'll learn as we build."
        subtitle="Four questions we don't yet have perfect answers to — and how we'll get them."
      >
        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-2xl border border-border border-l-[3px] border-l-primary bg-card p-6">
            <div>
              <p className="mb-2 text-[11px] font-mono uppercase tracking-wider text-primary">01</p>
              <p className="text-base font-semibold leading-snug tracking-[-0.015em] text-foreground">
                Will a teacher change their lesson based on an AI signal — on a Monday morning with 30 students waiting?
              </p>
            </div>
            <p className="text-sm italic leading-relaxed text-muted-foreground">
              If teachers read the brief but don't act on it, Glean is a nice-to-have — not a must-have.
            </p>
            <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3">
              <p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-primary">HOW WE'LL ANSWER IT</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Track lesson adjustment rate in weeks 2–4 of the pilot. Under 30% adoption means the signal presentation needs rethinking before we scale.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border border-l-[3px] border-l-primary bg-card p-6">
            <div>
              <p className="mb-2 text-[11px] font-mono uppercase tracking-wider text-primary">02</p>
              <p className="text-base font-semibold leading-snug tracking-[-0.015em] text-foreground">
                Where's the line between a useful flag and crying wolf?
              </p>
            </div>
            <p className="text-sm italic leading-relaxed text-muted-foreground">
              One false flag that embarrasses a teacher in front of their class destroys trust permanently.
            </p>
            <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3">
              <p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-primary">HOW WE'LL ANSWER IT</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Launch with a high-confidence-only filter — top 15% of signals. Analyse teacher override patterns in weeks 4–8 to calibrate before widening.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border border-l-[3px] border-l-primary bg-card p-6">
            <div>
              <p className="mb-2 text-[11px] font-mono uppercase tracking-wider text-primary">03</p>
              <p className="text-base font-semibold leading-snug tracking-[-0.015em] text-foreground">
                Will schools trust us with raw student work — and does FERPA compliance create friction we haven't fully mapped?
              </p>
            </div>
            <p className="text-sm italic leading-relaxed text-muted-foreground">
              In K12, a single data concern raised by a district IT team can kill a pilot before it starts.
            </p>
            <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3">
              <p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-primary">HOW WE'LL ANSWER IT</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Store structured insights only — never raw responses. Complete a FERPA legal review before the pilot and produce a one-page data processing agreement schools can sign in under a day.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border border-l-[3px] border-l-primary bg-card p-6">
            <div>
              <p className="mb-2 text-[11px] font-mono uppercase tracking-wider text-primary">04</p>
              <p className="text-base font-semibold leading-snug tracking-[-0.015em] text-foreground">
                If students care about grades and not understanding, will they engage with feedback that has no grade attached?
              </p>
            </div>
            <p className="text-sm italic leading-relaxed text-muted-foreground">
              The student value prop collapses if the incentive system works against us.
            </p>
            <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3">
              <p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-primary">HOW WE'LL ANSWER IT</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Frame all student-facing features as 'no grade impact — just for you.' Measure return rate in Phase 2. If engagement is low, test whether linking insights to score improvement changes behaviour.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      <SectionDivider title="Before You Go" />

      <section
        id="close"
        className="min-h-screen border-b border-border/60 px-6 py-28 md:px-10 lg:px-14 scroll-mt-16"
        style={{ backgroundColor: "#1c1c1c", color: "#ffffff", paddingBottom: "80px" }}
      >
        <div className="mx-auto w-full max-w-4xl">
          <header className="mb-10">
            <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.18em] text-primary">09 CLOSE</p>
            <p
              style={{
                fontStyle: "italic",
                fontSize: "20px",
                color: "#d1d5db",
                marginBottom: "48px",
                lineHeight: 1.7,
                fontWeight: 500,
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

          <div className="mt-12">
            <p
              className="text-[11px] font-mono uppercase tracking-wider"
              style={{ color: "#6b7280" }}
            >
              WANT TO CONTINUE THE CONVERSATION?
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.linkedin.com/in/iamgauravmittal/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExternalLink("linkedin_footer", "https://www.linkedin.com/in/iamgauravmittal/")}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-primary hover:text-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V23h-4v-7.63c0-1.82-.03-4.16-2.54-4.16-2.54 0-2.93 1.98-2.93 4.03V23h-4V8z" />
                </svg>
                Connect on LinkedIn
              </a>
              <a
                href="mailto:gmittal1557@gmail.com"
                onClick={() => trackExternalLink("email_footer", "mailto:gmittal1557@gmail.com")}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-primary hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                gmittal1557@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-xs text-muted-foreground md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p>Glean for Teachers · Forward PM Assignment</p>
          <button onClick={() => { scrollTo("cover"); trackButtonClick("back_to_top", "footer") }} className="inline-flex items-center gap-1 text-primary">
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
                      <span className="rounded-md bg-primary/10 p-1.5">
                        {node.icon === "teachers" && <GraduationCap className="h-5 w-5 text-primary" />}
                        {node.icon === "students" && <BookOpen className="h-5 w-5 text-primary" />}
                        {node.icon === "school" && <Target className="h-5 w-5 text-primary" />}
                        {node.icon === "parents" && <ShieldCheck className="h-5 w-5 text-primary" />}
                      </span>
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

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
  { id: "about", label: "About This Presentation", nav: "About" },
  { id: "vision", label: "Product Vision", nav: "Vision" },
  { id: "teacher", label: "Teacher", nav: "Teacher" },
  { id: "student", label: "Student", nav: "Student" },
  { id: "pain", label: "Pervasive Pain", nav: "Pain" },
  { id: "northstar", label: "North Star", nav: "North Star" },
  { id: "mvp", label: "MVP", nav: "MVP" },
  { id: "phases", label: "Gates & Next Phases", nav: "Phases" },
  { id: "choices", label: "Strategic Choices", nav: "Choices" },
  { id: "metrics", label: "Success Metrics", nav: "Metrics" },
]

const painPoints = [
  {
    title: "Signal latency",
    stat: "~3 weeks",
    detail:
      "Teachers discover misconceptions after assessments, when failure has already compounded.",
  },
  {
    title: "Coaching deficit",
    stat: "<2 hrs/wk",
    detail:
      "Teacher time is consumed by grading and admin workflows instead of personalized coaching.",
  },
  {
    title: "Student blind spot",
    stat: "No why-data",
    detail:
      "Students get outcome scores but no cognitive diagnosis of what specifically to fix.",
  },
]

const cycle = [
  {
    time: "Sunday evening",
    title: "Capture",
    desc: "Teacher photos quiz stacks. OCR + misconception detection runs overnight.",
    image: "/images/phone-capture.jpg",
  },
  {
    time: "Monday 7:30am",
    title: "Brief",
    desc: "90-second brief with top misconceptions, confidence scores, and grounded resources.",
    image: "/images/hero-teacher.jpg",
  },
  {
    time: "Monday class",
    title: "Intervene",
    desc: "Reteach/scaffold/extend lanes replace one-size-fits-all instruction.",
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
  children,
  narrow = false,
}: {
  id: string
  badge?: string
  title: string
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

export function PrdRevampPage() {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("cover")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedPain, setSelectedPain] = useState(0)
  const [activeCycle, setActiveCycle] = useState(0)
  const [activeAudience, setActiveAudience] = useState<"teacher" | "student">("teacher")
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
      if (event.key === "Escape") setIsMenuOpen(false)
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
        body: "Start class with ranked learning intelligence: who is confused, why they are confused, and what to do in period one.",
        stat: "From reactive grading to proactive coaching",
      }
    }

    return {
      title: "For students (Marcus)",
      body: "Receive a private mastery map before test day: precise diagnosis and next action, not generic hints.",
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
            A Learning Intelligence Layer for Middle & High School Classrooms
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

      <Slide id="about" badge="01 About This Presentation" title="About This Presentation" narrow>
        <div className="space-y-5 text-base leading-[1.72] text-muted-foreground">
          <p>
            This presentation is part of a take-home assignment for the <span className="font-semibold text-foreground">Forward Deployed PM role at Glean</span>.
            The objective is to show product thinking at two altitudes: a bold 12-month North Star and a practical 3-month MVP.
          </p>
          <p>
            This is an interactive experience. Charts respond to hover and touch. Audio clips provide commentary from the original
            presentation. Diagrams animate as you scroll. Use the navigation dropdown at the top to jump between sections.
          </p>
        </div>
      </Slide>

      <SectionDivider title="Product Vision" />

      <Slide
        id="vision"
        badge="02 Product Vision"
        title="One Product, Two Humans, One Shared Win"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex gap-2 rounded-lg bg-secondary p-1">
              {[
                { key: "teacher", label: "Teacher" },
                { key: "student", label: "Student" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveAudience(tab.key as "teacher" | "student")}
                  className={cn(
                    "flex-1 rounded-md px-3 py-2 text-xs font-mono uppercase transition",
                    activeAudience === tab.key ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <h3 className="text-2xl font-semibold tracking-[-0.01em]">{audienceCard.title}</h3>
            <p className="mt-3 text-sm leading-[1.72] text-muted-foreground">{audienceCard.body}</p>
            <p className="mt-4 inline-flex rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary">
              {audienceCard.stat}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative h-64">
              <Image src="/images/hero-teacher.jpg" alt="Teacher in classroom" fill className="object-cover" />
            </div>
            <div className="p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-primary">Design principle</p>
              <p className="mt-2 text-sm leading-[1.72] text-muted-foreground">
                Build real value for the student first. Teacher intelligence emerges as a byproduct of useful student engagement,
                not forced compliance.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      <SectionDivider title="Teacher" />

      <Slide id="teacher" badge="03 Teacher" title="Teacher Reality: Signal Must Arrive Before the Bell">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-mono uppercase text-primary">
              <GraduationCap className="h-3.5 w-3.5" />
              Sarah's weekly constraint
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              {["12-15 hours spent grading", "<2 hours for meaningful 1:1 coaching", "Finds misconceptions weeks too late", "Starts Monday without ranked intervention priorities"].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-primary">Promise</p>
            <p className="mt-3 text-sm leading-[1.72] text-muted-foreground">
              Deliver a 90-second Monday brief: top misconceptions, confidence scores, and curriculum-grounded actions before class.
            </p>
            <div className="mt-5 rounded-lg border border-border bg-background p-4">
              <p className="text-2xl font-mono font-bold text-primary">8-10 hrs/week</p>
              <p className="mt-1 text-xs text-muted-foreground">Potential coaching time reclaimed from grading workflows</p>
            </div>
          </div>
        </div>
      </Slide>

      <SectionDivider title="Student" />

      <Slide id="student" badge="04 Student" title="Student Reality: Grades Explain Outcome, Not Cause">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative h-64">
              <Image src="/images/student-studying.jpg" alt="Student studying" fill className="object-cover" />
            </div>
            <div className="p-5">
              <p className="text-xs font-mono uppercase tracking-wider text-primary">Marcus's gap</p>
              <p className="mt-2 text-sm leading-[1.72] text-muted-foreground">
                He knows the score, but not the specific misconception causing repeated point loss before test day.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-mono uppercase text-primary">
              <BookOpen className="h-3.5 w-3.5" />
              What he sees
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                '"Factoring: solid. Discriminant: shaky. Review step 3 tonight."',
                "Private mastery map; no ranking or social comparison",
                "No grade impact from companion use",
                "Socratic prompts grounded in teacher methodology",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      <SectionDivider title="Pervasive Pain" />

      <Slide id="pain" badge="05 Pervasive Pain" title="This Is a Signal Architecture Problem">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            {painPoints.map((point, idx) => (
              <button
                key={point.title}
                onClick={() => setSelectedPain(idx)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition",
                  selectedPain === idx ? "border-primary/35 bg-primary/10" : "border-border bg-card hover:border-primary/30"
                )}
              >
                <p className="text-[11px] font-mono uppercase tracking-wider text-primary">{point.stat}</p>
                <p className="mt-1 text-sm font-semibold">{point.title}</p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-primary">Deep dive</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.01em]">{painPoints[selectedPain].title}</h3>
            <p className="mt-3 text-sm leading-[1.72] text-muted-foreground">{painPoints[selectedPain].detail}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Lagged detection", "Class-size bottleneck", "Low-confidence intervention"].map((item) => (
                <div key={item} className="rounded-lg border border-border bg-background p-3 text-xs text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      <SectionDivider title="North Star" />

      <Slide id="northstar" badge="06 North Star" title="The 24-Hour Learning Intelligence Cycle">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-2">
            {cycle.map((step, idx) => (
              <button
                key={step.title}
                onClick={() => setActiveCycle(idx)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition",
                  activeCycle === idx ? "border-primary/35 bg-primary/10" : "border-border bg-card hover:border-primary/30"
                )}
              >
                <p className="text-[10px] font-mono uppercase tracking-wider text-primary">{step.time}</p>
                <p className="mt-1 text-sm font-semibold">{step.title}</p>
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative h-72">
              <Image src={cycle[activeCycle].image} alt={cycle[activeCycle].title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-primary">{cycle[activeCycle].time}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.01em]">{cycle[activeCycle].title}</h3>
              <p className="mt-3 text-sm leading-[1.72] text-muted-foreground">{cycle[activeCycle].desc}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-xs font-mono text-primary">Requirement</p>
                  <p className="mt-1 text-xs text-muted-foreground">Curriculum-grounded responses over model priors.</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-xs font-mono text-primary">Trust mechanic</p>
                  <p className="mt-1 text-xs text-muted-foreground">Confidence-scored outputs with visible uncertainty.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <SectionDivider title="MVP" />

      <Slide id="mvp" badge="07 MVP" title="3 Engineers, 3 Months: Start Narrow, Prove Behavior Change">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-primary">In scope</p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                "Mobile quiz capture (photo -> OCR -> misconception tags)",
                "Canvas + Google Classroom ingestion",
                "Monday pre-class brief",
                "Class-level confidence + freshness indicators",
                "Curriculum-grounded reteach retrieval",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-primary">Out of scope</p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                "Full student companion",
                "District analytics suite",
                "Multi-subject expansion",
                "Policy-level grade model changes",
                "Parent-facing dashboards",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <X className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <AppendixDialog
                title="MVP Tech Structure"
                triggerLabel="Open tech structure"
                content={[
                  "Ingestion: LMS connector + mobile handwritten capture pipeline.",
                  "Classification: concept + misconception tagging with confidence scoring.",
                  "Retrieval: teacher curriculum indexed for grounded recommendations.",
                  "Delivery: Monday brief optimized for <90 seconds of reading time.",
                ]}
              />
              <AppendixDialog
                title="Pilot GTM"
                triggerLabel="Open GTM"
                content={[
                  "Land with 3-5 Algebra teachers in one school.",
                  "Expand to department once behavior change is visible.",
                  "Expand district-wide after security + efficacy proof.",
                ]}
              />
            </div>
          </div>
        </div>
      </Slide>

      <SectionDivider title="Gates & Next Phases" />

      <Slide id="phases" badge="08 Gates & Phases" title="Evidence Gates Before Expansion">
        <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["70%+", "Teachers open brief before 3+ classes/week"],
            ["50%+", "Monday classes address top flagged misconception"],
            ["8+ hrs", "Grading time reclaimed weekly"],
            ["75%+", "High-confidence precision"],
          ].map(([value, text]) => (
            <div key={text} className="rounded-xl border border-border bg-card p-4">
              <p className="text-2xl font-mono font-bold text-primary">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {phases.map((phase) => (
            <div key={phase.name} className="rounded-xl border border-border bg-card p-4">
              <p className="text-[10px] font-mono uppercase tracking-wider text-primary">{phase.window}</p>
              <p className="mt-1 text-xl font-semibold tracking-[-0.01em]">{phase.name}</p>
              <p className="mt-2 text-xs text-muted-foreground">{phase.outcome}</p>
            </div>
          ))}
        </div>
      </Slide>

      <SectionDivider title="Strategic Choices" />

      <Slide id="choices" badge="09 Strategic Choices" title="Tradeoffs That Preserve Trust and Adoption">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              icon: ShieldCheck,
              title: "Precision over recall",
              body: "Missing some signals is acceptable; false positives permanently damage teacher trust.",
            },
            {
              icon: Lock,
              title: "Privacy over signal richness",
              body: "Persist structured tags, not raw student dialogue. Privacy is architecture, not policy copy.",
            },
            {
              icon: BrainCircuit,
              title: "Grounding over autonomy",
              body: "Curriculum and teacher method remain source of truth for generated guidance.",
            },
            {
              icon: Target,
              title: "Depth over breadth",
              body: "Algebra 2 first, one robust loop first, then broader subject expansion.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5">
              <item.icon className="h-4 w-4 text-primary" />
              <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em]">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Slide>

      <SectionDivider title="Success Metrics" />

      <Slide id="metrics" badge="10 Success Metrics" title="How We Know It Works">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {successMetrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xl font-mono font-bold text-primary">{metric.target}</p>
              <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-primary/25 bg-primary/10 p-4 text-sm text-foreground/90">
          <span className="inline-flex items-center gap-2">
            <Radar className="h-4 w-4 text-primary" />
            North-star check: earlier teacher intervention + student clarity before test day.
          </span>
        </div>
      </Slide>

      <footer className="border-t border-border px-6 py-8 text-xs text-muted-foreground md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p>Glean for Teachers · Forward PM Assignment</p>
          <button onClick={() => scrollTo("cover")} className="inline-flex items-center gap-1 text-primary">
            Back to top
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </footer>
    </main>
  )
}

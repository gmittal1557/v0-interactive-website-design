"use client"

import { SectionWrapper, FadeIn } from "./section-wrapper"
import { AppendixDialog } from "./appendix-dialog"
import { Smartphone, Link2, FileText, Database, LayoutDashboard, Lock } from "lucide-react"

const ships = [
  { icon: Smartphone, label: "Mobile Quiz Capture", desc: "Photo stack to OCR to misconception extraction. Algebra 2 only." },
  { icon: Link2, label: "LMS Connector", desc: "Canvas + Google Classroom. Zero new teacher workflow." },
  { icon: FileText, label: "Monday Morning Brief", desc: "5 bullets. 90 seconds. 30 min before first class." },
  { icon: Database, label: "Curriculum Index", desc: "Teacher uploads lesson plans. AI outputs grounded in her materials." },
  { icon: LayoutDashboard, label: "Teacher Dashboard", desc: "Class-level patterns. Confidence scores. Freshness timestamps." },
]

const doesNotShip = [
  "Student companion + mastery map",
  "Parent dashboards",
  "District analytics",
  "Multi-subject support",
  "Mastery-weighted grading",
]

const gates = [
  { metric: "70%+", desc: "teachers check brief before 3+ classes/week for 6 weeks" },
  { metric: "50%+", desc: "Monday classes address the top flagged misconception" },
  { metric: "8+ hrs", desc: "grading time reclaimed per teacher per week" },
  { metric: "75%+", desc: "precision on high-confidence signals, teacher-validated" },
]

export function MvpSection() {
  return (
    <SectionWrapper id="mvp" className="py-24 lg:py-32" fullHeight={false}>
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono text-primary font-bold tracking-wide">05</span>
          <div className="h-px flex-1 bg-border/30" />
          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em]">The MVP</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-3 text-balance leading-[1.05]">
          3 Engineers. <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">3 Months.</span>
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mb-5 leading-relaxed">
          If Glean extracts misconception signals from Sarah{"'"}s existing graded work — without requiring any new student behavior — will she act on that signal before class?
        </p>
        <div className="flex flex-wrap gap-2 mb-16">
          <AppendixDialog
            title="Technology Assumptions"
            content={[
              "Multimodal OCR on handwritten math: High confidence. GPT-4o / Gemini Vision perform well on structured math. Min bar: 85% on legible handwriting.",
              "Misconception classifier fine-tuning: Medium-high confidence. Standard math taxonomies exist. Need 500+ labeled examples per subject.",
              "RAG retrieval at sub-2s latency: High confidence. Well-solved engineering problem.",
              "LLM pedagogical guardrails: Medium confidence. Retrieval-first reduces hallucination risk. Confidence scoring + teacher override are the safety net.",
              "Most uncertain: Classifier precision on real student handwriting. Min bar: 80% precision on high-confidence signals before V1 launch.",
            ]}
          />
          <AppendixDialog
            title="Versioning Strategy V1 to V4"
            content={[
              "V1 (Months 1-3) — Signal Extraction: Can we extract reliable signal from existing workflows? Ships: Mobile capture, LMS connector, classifier, Monday brief.",
              "V2 (Months 4-9) — Signal Generation: Will students engage voluntarily? Ships: Socratic companion, mastery view, privacy contract, command bar.",
              "V3 (Months 10-18) — District Intelligence: Cross-classroom signal. Ships: heatmaps, department dashboards, multi-subject.",
              "V4 (Month 18+) — Grading Evolution: Mastery-based grading with 2 years of evidence. Ships: mastery-weighted grades, parent views.",
            ]}
          />
        </div>
      </FadeIn>

      {/* What ships - card grid */}
      <FadeIn delay={0.1}>
        <h3 className="text-xl md:text-2xl font-serif text-foreground mb-6">What ships</h3>
      </FadeIn>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-14">
        {ships.map((item, i) => {
          const Icon = item.icon
          return (
            <FadeIn key={item.label} delay={0.12 + i * 0.06}>
              <div className="p-5 rounded-xl bg-card border border-border/30 group hover:border-primary/20 transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{item.label}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          )
        })}
      </div>

      {/* Deliberately not in MVP */}
      <FadeIn delay={0.3}>
        <div className="p-6 rounded-xl bg-secondary/30 border border-border/20 mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-3.5 h-3.5 text-muted-foreground/50" />
            <p className="text-xs font-semibold text-foreground">Deliberately not in MVP</p>
          </div>
          <p className="text-[11px] text-muted-foreground/60 mb-4">Not cuts — deliberate sequencing. Each requires hypothesis validation first.</p>
          <div className="flex flex-wrap gap-1.5">
            {doesNotShip.map(item => (
              <span key={item} className="px-3 py-1.5 rounded-lg bg-background/60 border border-border/30 text-[11px] text-muted-foreground/70">
                {item}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Four gates to V2 */}
      <FadeIn delay={0.35}>
        <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2">Four Gates to V2</h3>
        <p className="text-[10px] text-muted-foreground/50 font-mono mb-8 uppercase tracking-wider">All four must pass. Minimum bars for trust.</p>
      </FadeIn>
      <div className="grid sm:grid-cols-2 gap-3">
        {gates.map((gate, i) => (
          <FadeIn key={i} delay={0.4 + i * 0.07}>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border/30">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-mono font-bold text-primary">{i + 1}</span>
              </div>
              <div>
                <span className="text-lg font-mono font-bold text-primary">{gate.metric}</span>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{gate.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  )
}

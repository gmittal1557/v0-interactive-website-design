"use client"

import { SectionWrapper, FadeIn } from "./section-wrapper"
import { AppendixDialog } from "./appendix-dialog"
import { Smartphone, Link2, FileText, Database, LayoutDashboard } from "lucide-react"

const ships = [
  { icon: Smartphone, label: "Mobile quiz capture", desc: "Photo stack to OCR to misconception extraction. Algebra 2 only." },
  { icon: Link2, label: "LMS connector", desc: "Canvas + Google Classroom. No new teacher workflow required." },
  { icon: FileText, label: "Monday Morning Brief", desc: "5 bullets. 90 seconds. Delivered 30 min before first class." },
  { icon: Database, label: "Curriculum index", desc: "Teacher uploads lesson plans. All AI outputs grounded in her materials." },
  { icon: LayoutDashboard, label: "Teacher dashboard", desc: "Class-level patterns only. Confidence scores. Data freshness timestamps." },
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
  { metric: "50%+", desc: "Monday classes address top flagged misconception" },
  { metric: "8+ hrs", desc: "grading time reclaimed per teacher per week" },
  { metric: "75%+", desc: "precision on high-confidence signals, teacher-validated" },
]

export function MvpSection() {
  return (
    <SectionWrapper id="mvp" className="py-28" fullHeight={false}>
      <FadeIn>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono text-primary font-semibold tracking-wide">05</span>
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-widest">The MVP</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-3 text-balance">
          3 Engineers. <span className="text-primary">3 Months.</span>
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mb-4 leading-relaxed">
          If Glean extracts misconception signals from Sarah{"'"}s existing graded work — will she act on that signal before class?
        </p>
        <div className="flex flex-wrap gap-2 mb-14">
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

      {/* What ships */}
      <FadeIn delay={0.1}>
        <h3 className="text-lg font-serif text-foreground mb-5">What ships</h3>
      </FadeIn>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {ships.map((item, i) => {
          const Icon = item.icon
          return (
            <FadeIn key={item.label} delay={0.12 + i * 0.06}>
              <div className="p-4 rounded-xl bg-card border border-border/50 group hover:border-primary/15 transition-colors h-full">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-0.5">{item.label}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          )
        })}
      </div>

      {/* Does not ship */}
      <FadeIn delay={0.3}>
        <div className="p-5 rounded-xl bg-secondary/40 border border-border/30 mb-12">
          <p className="text-xs font-semibold text-foreground mb-1.5">Deliberately not in MVP</p>
          <p className="text-[11px] text-muted-foreground mb-3">Not cuts — deliberate sequencing. Each requires hypothesis validation first.</p>
          <div className="flex flex-wrap gap-1.5">
            {doesNotShip.map(item => (
              <span key={item} className="px-2.5 py-1 rounded-md bg-background border border-border/50 text-[11px] text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Four gates */}
      <FadeIn delay={0.35}>
        <h3 className="text-lg font-serif text-foreground mb-1.5">Four Gates to V2</h3>
        <p className="text-[11px] text-muted-foreground mb-5">All four must pass. Minimum bars for trust, not aspirational targets.</p>
      </FadeIn>
      <div className="grid sm:grid-cols-2 gap-3">
        {gates.map((gate, i) => (
          <FadeIn key={i} delay={0.4 + i * 0.07}>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-mono font-bold text-primary">{i + 1}</span>
              </div>
              <div>
                <span className="text-base font-mono font-bold text-primary">{gate.metric}</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{gate.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  )
}

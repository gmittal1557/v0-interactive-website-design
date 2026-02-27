"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionWrapper, FadeIn } from "./section-wrapper"
import { AppendixDialog } from "./appendix-dialog"
import { Check, Smartphone, Link2, FileText, Database, LayoutDashboard } from "lucide-react"

const ships = [
  { icon: Smartphone, label: "Mobile quiz capture", desc: "Photo stack → OCR → misconception extraction. Algebra 2 only." },
  { icon: Link2, label: "LMS connector", desc: "Canvas + Google Classroom. No new teacher workflow required." },
  { icon: FileText, label: "Monday Morning Insight Report", desc: "5 bullets. 90 seconds. Delivered 30 min before first class." },
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
  { metric: "≥70%", desc: "of teachers check brief before 3+ classes/week for 6 weeks" },
  { metric: "≥50%", desc: "of Monday classes address the top flagged misconception" },
  { metric: "≥8 hrs", desc: "/week grading time reclaimed per teacher" },
  { metric: "≥75%", desc: "precision on high-confidence signals, teacher-validated" },
]

export function MvpSection() {
  return (
    <SectionWrapper id="mvp" className="py-24" fullHeight={false}>
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <span className="text-xs font-mono text-primary">05</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">The MVP</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-2 text-balance">
          3 Engineers. <span className="text-primary">3 Months.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
          The one hypothesis: If Glean extracts misconception signals from Sarah{"'"}s existing
          graded work — will she act on that signal before class?
        </p>
        <div className="flex gap-3 mb-16">
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
            title="Versioning Strategy V1 → V4"
            content={[
              "V1 (Months 1–3) — Signal Extraction: Can we extract reliable signal from existing workflows? Ships: Mobile capture, LMS connector, classifier, Monday brief.",
              "V2 (Months 4–9) — Signal Generation: Will students engage voluntarily? Ships: Socratic companion, mastery view, privacy contract, command bar.",
              "V3 (Months 10–18) — District Intelligence: Cross-classroom signal. Ships: heatmaps, department dashboards, multi-subject.",
              "V4 (Month 18+) — Grading Evolution: Mastery-based grading with 2 years of evidence. Ships: mastery-weighted grades, parent views.",
            ]}
          />
        </div>
      </FadeIn>

      {/* What ships */}
      <FadeIn delay={0.1}>
        <h3 className="text-xl font-serif font-bold text-foreground mb-6">What ships</h3>
      </FadeIn>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {ships.map((item, i) => {
          const Icon = item.icon
          return (
            <FadeIn key={item.label} delay={0.15 + i * 0.08}>
              <div className="p-5 rounded-xl bg-card border border-border group hover:border-primary/30 transition-colors h-full">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-bold text-foreground font-sans mb-1">{item.label}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          )
        })}
      </div>

      {/* What does NOT ship */}
      <FadeIn delay={0.3}>
        <div className="p-6 rounded-xl bg-secondary border border-border mb-12">
          <h3 className="text-sm font-bold text-foreground font-sans mb-3">Deliberately not in MVP</h3>
          <p className="text-xs text-muted-foreground mb-4">Not cuts — deliberate sequencing. Each requires MVP hypothesis to be validated first.</p>
          <div className="flex flex-wrap gap-2">
            {doesNotShip.map(item => (
              <span key={item} className="px-3 py-1.5 rounded-full bg-background border border-border text-xs text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Four gates */}
      <FadeIn delay={0.4}>
        <h3 className="text-xl font-serif font-bold text-foreground mb-2">Four Gates to V2</h3>
        <p className="text-xs text-muted-foreground mb-6">All four must pass. Minimum bars for trust, not aspirational targets.</p>
      </FadeIn>
      <div className="grid sm:grid-cols-2 gap-4">
        {gates.map((gate, i) => (
          <FadeIn key={i} delay={0.5 + i * 0.1}>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-mono font-bold text-primary">{i + 1}</span>
              </div>
              <div>
                <span className="text-lg font-mono font-bold text-primary">{gate.metric}</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{gate.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  )
}

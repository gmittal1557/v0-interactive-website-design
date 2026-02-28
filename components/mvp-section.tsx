"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Smartphone, Link2, FileText, Database, LayoutDashboard, Lock, ArrowRight } from "lucide-react"
import { AppendixDialog } from "@/components/appendix-dialog"

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

const versions = [
  { label: "V1", months: "1-3", name: "Signal Extraction", desc: "Can we extract reliable signal from existing workflows?", active: true },
  { label: "V2", months: "4-9", name: "Signal Generation", desc: "Will students engage voluntarily?", active: false },
  { label: "V3", months: "10-18", name: "District Intelligence", desc: "Cross-classroom signal creates institutional memory.", active: false },
  { label: "V4", months: "18+", name: "Grading Evolution", desc: "Mastery-based grading with 2 years of evidence.", active: false },
]

export function MvpSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="mvp" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-widest">06</span>
          <div className="w-8 h-[1px] bg-border" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">The MVP</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-foreground leading-tight"
        >
          3 Engineers. 3 Months.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl"
        >
          If Glean extracts misconception signals from Sarah{"'"}s existing graded work -- without requiring any new student behavior -- will she act on that signal before class?
        </motion.p>

        {/* What ships */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-14 text-lg font-serif text-foreground mb-5"
        >
          What ships
        </motion.h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ships.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                className="p-5 rounded-xl bg-card border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all duration-300"
              >
                <Icon className="w-5 h-5 text-primary mb-3" />
                <h4 className="text-sm font-semibold text-foreground mb-1">{item.label}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* What doesn't ship */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 p-5 rounded-xl bg-secondary/50 border border-border/30"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">Deliberately not in MVP</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Not cuts -- deliberate sequencing. Each requires hypothesis validation first.</p>
          <div className="flex flex-wrap gap-1.5">
            {doesNotShip.map(item => (
              <span key={item} className="px-3 py-1.5 rounded-lg bg-card border border-border/40 text-xs text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Version roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-14"
        >
          <h3 className="text-lg font-serif text-foreground mb-6">Version Gates</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {versions.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.75 + i * 0.08 }}
                className={`p-5 rounded-xl border transition-all duration-300 ${
                  v.active ? "bg-primary/[0.04] border-primary/20" : "bg-card border-border/40"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-sm font-mono font-bold ${v.active ? "text-primary" : "text-muted-foreground"}`}>{v.label}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">Mo {v.months}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{v.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                {v.active && (
                  <div className="mt-3 flex items-center gap-1 text-primary text-[10px] font-mono">
                    <ArrowRight className="w-3 h-3" />
                    <span>Current focus</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Four gates to V2 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-14"
        >
          <h3 className="text-lg font-serif text-foreground mb-2">Four Gates to V2</h3>
          <p className="text-xs text-muted-foreground mb-6">All four must pass. Minimum bars for trust.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {gates.map((gate, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.95 + i * 0.07 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border/40"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-mono font-bold text-primary">{i + 1}</span>
                </div>
                <div>
                  <span className="text-lg font-mono font-bold text-primary">{gate.metric}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{gate.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          <AppendixDialog
            title="Technology Assumptions"
            content={[
              "Multimodal OCR on handwritten math: High confidence. GPT-4o / Gemini Vision perform well on structured math. Min bar: 85% on legible handwriting.",
              "Misconception classifier fine-tuning: Medium-high confidence. Standard math taxonomies exist. Need 500+ labeled examples per subject.",
              "RAG retrieval at sub-2s latency: High confidence. Well-solved engineering problem.",
              "LLM pedagogical guardrails: Medium confidence. Retrieval-first reduces hallucination risk.",
              "Most uncertain: Classifier precision on real student handwriting. Min bar: 80% precision on high-confidence signals before V1 launch.",
            ]}
            triggerLabel="Technology Assumptions"
          />
        </motion.div>
      </div>
    </section>
  )
}

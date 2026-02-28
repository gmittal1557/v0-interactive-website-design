"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Zap, Lock, Eye, Brain } from "lucide-react"
import { AppendixDialog } from "@/components/appendix-dialog"

const tradeoffs = [
  {
    icon: Shield,
    chose: "Precision over recall",
    meaning: "Miss signals rather than flag wrong ones.",
    why: "A false positive destroys teacher trust permanently. Better to say \"I don't know\" than to say the wrong thing.",
  },
  {
    icon: Lock,
    chose: "Privacy over signal richness",
    meaning: "Structured tags only, not raw dialogue.",
    why: "A privacy violation ends the district relationship. Structured misconception tags give Sarah everything she needs.",
  },
  {
    icon: Eye,
    chose: "Teacher control over AI autonomy",
    meaning: "AI never contradicts Sarah's methodology.",
    why: "RAG-first, grounded in her curriculum. The AI is a research assistant, not a co-teacher.",
  },
  {
    icon: Zap,
    chose: "Depth over breadth",
    meaning: "Algebra 2 only in MVP.",
    why: "One subject creates a clean hypothesis test. Multi-subject obscures signal quality.",
  },
  {
    icon: Brain,
    chose: "Teacher value first, student value V2",
    meaning: "Marcus gets no mastery view until classifier accuracy validated.",
    why: "Wrong information to students is worse than no information. Earn the right by proving signal quality first.",
  },
]

export function MoatSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="tradeoffs" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-widest">07</span>
          <div className="w-8 h-[1px] bg-border" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Strategic Tradeoffs</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-foreground leading-tight max-w-3xl"
        >
          What we chose and why
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl"
        >
          Every product is defined by what it says no to. These are the constraints that make the product trustworthy.
        </motion.p>

        <div className="mt-12 space-y-3">
          {tradeoffs.map((t, i) => (
            <motion.div
              key={t.chose}
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="p-5 md:p-6 rounded-xl bg-card border border-border/40 hover:border-primary/15 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <t.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1.5">
                    <h3 className="text-sm font-semibold text-foreground">{t.chose}</h3>
                    <span className="text-xs text-primary font-mono">{t.meaning}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.why}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          <AppendixDialog
            title="Data Architecture & Privacy"
            content={[
              "Signal sources (V1): Mobile quiz capture (Photo to OCR to structured extraction), LMS connector (Canvas/Google Classroom API), Curriculum index (teacher uploads to RAG store).",
              "NOT stored: Raw student dialogue (discarded after classification), Individual student PII (anonymized IDs only), Video/audio, Behavioral metadata beyond task completion.",
              "FERPA: All student data classified as educational records. Role-based access controls enforced. Data minimization: Only collect what's needed.",
              "Retention: Signals expire after 90 days unless refreshed. Student privacy contract: Three sentences on first use.",
            ]}
            triggerLabel="Data & Privacy Architecture"
          />
          <AppendixDialog
            title="Open Questions"
            content={[
              "1. Will teachers actually look at the brief? Signal: brief open rate >70% before class.",
              "2. Is OCR accurate enough on real student handwriting? Min bar: 85% on legible handwriting.",
              "3. Does misconception clustering produce actionable groups? Signal: >50% of teachers adjust Monday lesson based on the brief.",
              "4. Can we build trust fast enough to expand to student-facing features? Gates must pass before V2.",
              "5. Will districts pay $500-800/teacher/year? Price sensitivity research needed in pilot phase.",
            ]}
            triggerLabel="Open Questions"
          />
        </motion.div>
      </div>
    </section>
  )
}

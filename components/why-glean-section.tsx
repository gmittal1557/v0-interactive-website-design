"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Cpu, TrendingUp, Lock, AlertTriangle } from "lucide-react"
import { AppendixDialog } from "@/components/appendix-dialog"

const reasons = [
  {
    icon: Shield,
    title: "RAG Architecture Already District-Trusted",
    desc: "Glean's core product already indexes district knowledge with enterprise-grade security. The CIO who approved Glean for enterprise can extend to education with an existing trust foundation.",
  },
  {
    icon: Cpu,
    title: "AI Infrastructure Maturity",
    desc: "Multimodal OCR is production-ready. GPT-4o / Gemini Vision perform well on structured math. Min bar: 85% on legible handwriting. This was not possible 18 months ago.",
  },
  {
    icon: TrendingUp,
    title: "EdTech Consolidation Window",
    desc: "Districts are consolidating vendors. The winner of the next 24 months owns the intelligence layer for a decade. Glean's existing enterprise GTM motion is the right motion.",
  },
  {
    icon: Lock,
    title: "Competitive Moat on Org Knowledge",
    desc: "Every classroom running Glean makes the misconception taxonomy richer. After 400 classrooms across 12 districts, Glean knows which approaches resolve specific misconceptions fastest.",
  },
]

const threats = [
  {
    name: "Microsoft Copilot for Education",
    level: "High",
    color: "bg-destructive/60",
    width: "w-[85%]",
    defense: "Own the cross-district data asset before they reach scale.",
  },
  {
    name: "Google Classroom",
    level: "Medium",
    color: "bg-chart-4/60",
    width: "w-[55%]",
    defense: "Deep student analytics creates FERPA exposure threatening their entire district portfolio.",
  },
  {
    name: "Canvas / Khan Academy",
    level: "Low",
    color: "bg-chart-3/60",
    width: "w-[25%]",
    defense: "Different product category. No district knowledge layer.",
  },
]

export function WhyGleanSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="why-glean" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-widest">04</span>
          <div className="w-8 h-[1px] bg-border" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Why Glean, Why Now</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-foreground leading-tight max-w-3xl"
        >
          Four reasons this is Glean{"'"}s to win
        </motion.h2>

        {/* Reasons grid */}
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all duration-300"
            >
              <r.icon className="w-5 h-5 text-primary mb-4" />
              <h3 className="text-base font-semibold text-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Threat assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14"
        >
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-lg font-serif text-foreground">Biggest Threats</h3>
          </div>

          <div className="space-y-5">
            {threats.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{t.name}</span>
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${
                    t.level === "High" ? "text-destructive" : t.level === "Medium" ? "text-chart-4" : "text-chart-3"
                  }`}>{t.level} threat</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden mb-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: t.width.replace("w-[", "").replace("]", "") }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
                    viewport={{ once: true }}
                    className={`h-full rounded-full ${t.color}`}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{t.defense}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          <AppendixDialog
            title="Technology Assumptions"
            content={[
              "Multimodal OCR on handwritten math: High confidence. GPT-4o / Gemini Vision perform well on structured math. Min bar: 85% on legible handwriting.",
              "Misconception classifier fine-tuning: Medium-high confidence. Standard math taxonomies exist. Need 500+ labeled examples per subject.",
              "RAG retrieval at sub-2s latency: High confidence. Well-solved engineering problem.",
              "LLM pedagogical guardrails: Medium confidence. Retrieval-first reduces hallucination risk. Confidence scoring + teacher override are the safety net.",
              "Most uncertain: Classifier precision on real student handwriting. Min bar: 80% precision on high-confidence signals before V1 launch. Below this, false positives destroy teacher trust permanently.",
            ]}
            triggerLabel="Technology Assumptions"
          />
          <AppendixDialog
            title="Enterprise Go-to-Market"
            content={[
              "Glean's existing enterprise GTM motion is the right motion. District contracts, IT security review, FERPA BAA, pilot-to-expand.",
              "The adaptation: the champion is a Curriculum Director, not a CIO.",
              "Land: 3-5 teachers in one school. Prove brief accuracy and time savings.",
              "Expand to department: 10-15 teachers. Show cross-classroom patterns. Win the Principal.",
              "Expand to district: District analytics unlock. CIO signs enterprise contract.",
              "Pricing signal: $500-800/teacher/year. 10-teacher pilot at $5k-8k. District-wide license $50k-150k.",
            ]}
            triggerLabel="GTM Strategy"
          />
        </motion.div>
      </div>
    </section>
  )
}

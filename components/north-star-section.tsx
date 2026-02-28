"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { AppendixDialog } from "@/components/appendix-dialog"
import { User, Users, School, Building2, ArrowRight } from "lucide-react"

const stakeholders = [
  {
    icon: User,
    label: "Teachers",
    benefit: "Start class knowing exactly where every student is confused",
  },
  {
    icon: Users,
    label: "Students",
    benefit: "Know exactly what to fix before the test, not after",
  },
  {
    icon: School,
    label: "Schools",
    benefit: "Cross-classroom patterns identify systematic gaps",
  },
  {
    icon: Building2,
    label: "Districts",
    benefit: "Institutional memory -- what works compounds across years",
  },
]

export function NorthStarSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="north-star" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-widest">03</span>
          <div className="w-8 h-[1px] bg-border" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">North Star</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-foreground leading-tight max-w-4xl"
        >
          12-Month Vision
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl"
        >
          Every teacher starts class knowing exactly where every student is confused. Every student knows exactly what to fix before the test. The district builds institutional memory.
        </motion.p>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 relative rounded-2xl overflow-hidden bg-secondary/30 border border-border/40"
        >
          <Image
            src="/images/north-star-diagram.jpg"
            alt="12-month product roadmap from V1 signal extraction through V4 grading evolution"
            width={1200}
            height={500}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Who benefits - clean grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stakeholders.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="p-5 rounded-xl bg-card border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all duration-300"
            >
              <s.icon className="w-5 h-5 text-primary mb-3" />
              <div className="text-sm font-semibold text-foreground mb-1.5">{s.label}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{s.benefit}</div>
            </motion.div>
          ))}
        </div>

        {/* Glean's unique position */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 p-6 md:p-8 rounded-2xl bg-surface-dark text-surface-dark-foreground relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)", backgroundSize: "24px 24px" }} />
          <div className="relative">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">Glean{"'"}s Unique Position</div>
            <p className="text-base md:text-lg leading-relaxed text-surface-dark-foreground/80">
              Google Classroom knows what students submitted. Khan knows the curriculum.
              <span className="text-primary font-medium"> Nobody knows what the district knows</span> --
              lesson plans, intervention guides, what worked last year.
              Glean{"'"}s core product already indexes this. That{"'"}s not a feature anyone can add. It requires becoming a fundamentally different product.
            </p>
            <div className="mt-4 flex items-center gap-2 text-primary text-xs font-mono">
              <ArrowRight className="w-3 h-3" />
              <span>The organizational knowledge layer is the moat</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          <AppendixDialog
            title="Learning Signal Graph"
            content={[
              "Inputs: LMS submissions, practice sessions, scanned quizzes, exit tickets.",
              "Output per signal: { concept, misconception_type, confidence_score, freshness_ts, session_quality_flag }",
              "Privacy layer: Individual data aggregated to class-level before surfacing to teacher. Raw dialogue discarded -- structured tags only.",
              "Signal sources in V1: Mobile quiz capture (Photo -> OCR -> structured extraction -> misconception classification), LMS connector (Canvas / Google Classroom API), Curriculum index (Teacher uploads lesson plans -> RAG store).",
            ]}
            triggerLabel="Signal Graph Architecture"
          />
          <AppendixDialog
            title="Teaching Command Bar"
            content={[
              "Natural language: 'Who is struggling with completing the square in Period 3?'",
              "RAG-first: All responses grounded in curriculum index. Will never suggest an approach that contradicts Sarah's methodology.",
              "Available in V2 after classifier accuracy is validated. Not in MVP scope.",
            ]}
            triggerLabel="Command Bar Detail"
          />
        </motion.div>
      </div>
    </section>
  )
}

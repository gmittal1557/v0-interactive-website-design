"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowDown } from "lucide-react"
import { AppendixDialog } from "@/components/appendix-dialog"

export function ExecSummary() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} id="exec-summary" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="max-w-5xl mx-auto w-full relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-[2px] bg-primary" />
          <span className="text-xs font-mono text-primary tracking-widest uppercase">Glean for Teachers</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-[1.1] tracking-tight text-balance max-w-4xl"
        >
          The signal already exists.
          <span className="block text-primary mt-2">It has never been delivered.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
        >
          Turn everyday student work into targeted instruction and private, personalized
          guidance — grounded in district curriculum and safe by design.
        </motion.p>

        {/* Key stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
        >
          {[
            { value: "3 wk", label: "Avg lag between misconception and discovery" },
            { value: "12-15 hrs", label: "Weekly grading load per teacher" },
            { value: "3.7M", label: "Teachers face this every single week" },
            { value: "$150/hr", label: "Cost of the only personalized solution" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="relative"
            >
              <div className="text-2xl md:text-3xl font-serif text-foreground">{stat.value}</div>
              <div className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap gap-2"
        >
          <AppendixDialog
            title="Product Vision - North Star"
            content={[
              "North Star (12 months): Every teacher starts class knowing exactly where every student is confused. Every student knows exactly what to fix before the test. The district builds institutional memory — what works compounds across classrooms and years.",
              "Learning Signal Graph: Inputs include LMS submissions, practice sessions, scanned quizzes, exit tickets. Output per signal: { concept, misconception_type, confidence_score, freshness_ts, session_quality_flag }.",
              "Privacy layer: Individual data aggregated to class-level before surfacing to teacher. Raw dialogue discarded — structured tags only.",
              "Marcus's Personal Mastery View is private to him only — never shown to Sarah in individual form. Links to the specific step in Sarah's lesson plan where the gap lives.",
              "Teaching Command Bar (Cmd+J): Natural language queries like 'Who is struggling with completing the square in Period 3?' All responses grounded in curriculum index.",
            ]}
            triggerLabel="Full Vision"
          />
          <AppendixDialog
            title="How to Read This PRD"
            content={[
              "Main body (Sections 1-9) tells the complete story in 5 minutes.",
              "Appendix dialogs provide full detail for the thorough reader — click any 'info' button to dive deeper.",
              "Author: Gaurav Mittal, Director of PM, EY-Parthenon. Glean FDPM Interview Exercise, February 2026.",
            ]}
            triggerLabel="About This PRD"
          />
        </motion.div>
      </div>

      {/* Scroll prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-muted-foreground/50 tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-muted-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}

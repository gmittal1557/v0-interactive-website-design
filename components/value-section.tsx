"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionWrapper, FadeIn } from "./section-wrapper"
import { Check, X, ArrowRight } from "lucide-react"

type Tab = "teacher" | "student"

const data = {
  teacher: {
    headline: "Know how every student is confused — before class, not after the exam.",
    tagline: "Reclaim 8-10 hrs/week from grading.",
    rows: [
      {
        before: "12-15 hrs grading Sunday night. Discovers gaps 3 weeks later. Teaches to the average.",
        after: "20-min mobile capture Sunday. 90-second Monday brief. Acts on signal before first period.",
      },
      {
        before: "Less than 2 hrs/week for actual 1:1 coaching — the work she became a teacher to do.",
        after: "8-10 hrs/week reclaimed. Sarah's judgment applied where only she can apply it.",
      },
    ],
  },
  student: {
    headline: "Know exactly what to fix — before Friday's test, not after.",
    tagline: "A private mastery map, not a grade.",
    rows: [
      {
        before: "Studies the wrong things. Gets a 68. Grade says he failed — not why.",
        after: "'Factoring: solid. Discriminant: shaky — review step 3 tonight.' Three days before the test.",
      },
      {
        before: "Gets stuck on homework. Stays stuck. Gives up or guesses.",
        after: "Companion asks a Socratic question grounded in Sarah's lesson plan. Unblocked.",
      },
    ],
  },
}

export function ValueSection() {
  const [activeTab, setActiveTab] = useState<Tab>("teacher")
  const current = data[activeTab]

  return (
    <SectionWrapper id="value" className="py-24 lg:py-32" fullHeight={false}>
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono text-primary font-bold tracking-wide">03</span>
          <div className="h-px flex-1 bg-border/30" />
          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em]">Value Propositions</span>
        </div>
      </FadeIn>

      {/* Design principle banner */}
      <FadeIn>
        <div className="mb-14 p-5 rounded-xl border border-accent/15 bg-accent/[0.04]">
          <p className="text-[9px] font-mono text-accent uppercase tracking-[0.2em] mb-1">Design Principle</p>
          <p className="text-sm text-foreground/70 leading-relaxed">
            Design the companion for the student. Let teacher intelligence be the byproduct.
          </p>
        </div>
      </FadeIn>

      {/* Tab switch - big interactive cards */}
      <FadeIn delay={0.1}>
        <div className="grid md:grid-cols-2 gap-3 mb-10">
          {(["teacher", "student"] as Tab[]).map(tab => {
            const isActive = activeTab === tab
            const info = data[tab]
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative p-6 rounded-xl border text-left transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "bg-card border-primary/25"
                    : "bg-secondary/20 border-border/20 hover:bg-secondary/30 hover:border-border/40"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="valueHighlight"
                    className="absolute inset-0 border-2 border-primary/20 rounded-xl"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <div className="relative z-10">
                  <p className="text-lg font-serif text-foreground mb-1">
                    {tab === "teacher" ? "For Sarah" : "For Marcus"}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{info.tagline}</p>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 flex items-center gap-1.5 text-primary"
                    >
                      <ArrowRight className="w-3 h-3" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">Active</span>
                    </motion.div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </FadeIn>

      {/* Headline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-xl md:text-2xl font-serif text-foreground mb-8">{current.headline}</h3>

          {/* Before/After comparisons - more visual */}
          <div className="space-y-4">
            {current.rows.map((row, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-px bg-border/20 rounded-xl overflow-hidden">
                <div className="p-6 bg-destructive/[0.03]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="w-3.5 h-3.5 text-destructive/60" />
                    </div>
                    <span className="text-[9px] font-mono text-destructive/50 uppercase tracking-[0.2em]">Today</span>
                  </div>
                  <p className="text-sm text-foreground/50 leading-relaxed">{row.before}</p>
                </div>
                <div className="p-6 bg-primary/[0.03]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-[9px] font-mono text-primary/60 uppercase tracking-[0.2em]">With Glean</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">{row.after}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  )
}

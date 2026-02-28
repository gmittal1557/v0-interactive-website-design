"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionWrapper, FadeIn } from "./section-wrapper"
import { Check, X } from "lucide-react"

type Tab = "teacher" | "student"

const comparisons = {
  teacher: [
    {
      before: "12-15 hrs grading Sunday night. Discovers gaps 3 weeks later. Teaches to the average.",
      after: "20-min mobile capture Sunday. 90-second Monday brief. Acts on signal before first period.",
    },
    {
      before: "< 2 hrs/week for actual 1:1 coaching — the work she became a teacher to do.",
      after: "8-10 hrs/week reclaimed. Sarah's judgment applied where only she can apply it.",
    },
  ],
  student: [
    {
      before: "Studies the wrong things. Gets a 68. Grade says he failed — not why.",
      after: "'Factoring: solid. Discriminant: shaky — review step 3 tonight.' Three days before the test.",
    },
    {
      before: "Gets stuck on homework. Stays stuck. Gives up or guesses.",
      after: "Companion asks a Socratic question grounded in Sarah's lesson plan. Unblocked. Keeps going.",
    },
  ],
}

const tabData = [
  {
    key: "teacher" as Tab,
    label: "For Sarah",
    sublabel: "Know how every student is confused — before class, not after the exam",
    tagline: "Reclaim 8-10 hrs/week from grading",
  },
  {
    key: "student" as Tab,
    label: "For Marcus",
    sublabel: "Know exactly what to fix — before Friday's test, not after",
    tagline: "A private mastery map, not a grade",
  },
]

export function ValueSection() {
  const [activeTab, setActiveTab] = useState<Tab>("teacher")

  return (
    <SectionWrapper id="value" className="py-28" fullHeight={false}>
      <FadeIn>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono text-primary font-semibold tracking-wide">03</span>
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-widest">Two Value Propositions</span>
        </div>
      </FadeIn>

      {/* Design principle */}
      <FadeIn>
        <div className="mb-12 p-4 rounded-lg border border-warm/15 bg-warm/[0.03]">
          <p className="text-[10px] font-mono text-warm/80 uppercase tracking-widest mb-1">Design Principle</p>
          <p className="text-[13px] text-foreground/70 leading-relaxed">
            Design the companion for the student. Let teacher intelligence be the byproduct.
            Every EdTech product that extracted signal without giving students genuine value has failed on adoption.
          </p>
        </div>
      </FadeIn>

      {/* Tab switch */}
      <FadeIn delay={0.1}>
        <div className="flex gap-2 mb-10">
          {tabData.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex-1 p-4 rounded-xl border text-left transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-card border-primary/25"
                  : "bg-secondary/30 border-border/30 hover:bg-secondary/50"
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="valueTabLine"
                  className="absolute top-0 left-0 right-0 h-[2px] bg-primary rounded-t-xl"
                />
              )}
              <p className="text-sm font-semibold text-foreground">{tab.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{tab.sublabel}</p>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Before/After comparisons */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          {comparisons[activeTab].map((item, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-destructive/[0.04] border border-destructive/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="w-3 h-3 text-destructive/70" />
                  </div>
                  <span className="text-[10px] font-mono text-destructive/60 uppercase tracking-wide">Today</span>
                </div>
                <p className="text-[13px] text-foreground/60 leading-relaxed">{item.before}</p>
              </div>
              <div className="p-4 rounded-xl bg-primary/[0.04] border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-[10px] font-mono text-primary/70 uppercase tracking-wide">With Glean</span>
                </div>
                <p className="text-[13px] text-foreground/90 leading-relaxed">{item.after}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  )
}

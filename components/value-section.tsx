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

export function ValueSection() {
  const [activeTab, setActiveTab] = useState<Tab>("teacher")

  return (
    <SectionWrapper id="value" className="py-24" fullHeight={false}>
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <span className="text-xs font-mono text-primary">03</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Two Value Propositions</span>
        </div>
      </FadeIn>

      {/* Design principle callout */}
      <FadeIn>
        <div className="mb-12 p-6 rounded-2xl bg-warm/5 border border-warm/20">
          <p className="text-xs font-mono text-warm uppercase tracking-wider mb-2">Design Principle</p>
          <p className="text-sm text-foreground leading-relaxed">
            Design the companion for the student. Let teacher intelligence be the byproduct.
            Every EdTech product that extracted signal from students without giving them genuine value has failed on adoption.
          </p>
        </div>
      </FadeIn>

      {/* Tab selector */}
      <FadeIn delay={0.1}>
        <div className="flex gap-2 mb-8">
          {[
            { key: "teacher" as Tab, label: "For Sarah — The Teacher", sublabel: "Know how every student is confused — before class" },
            { key: "student" as Tab, label: "For Marcus — The Student", sublabel: "Know exactly what to fix — before the test" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex-1 p-5 rounded-xl border text-left transition-all ${
                activeTab === tab.key
                  ? "bg-card border-primary/30"
                  : "bg-secondary/50 border-border hover:bg-secondary"
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-primary rounded-t-xl"
                />
              )}
              <h3 className="text-sm font-bold text-foreground font-sans">{tab.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{tab.sublabel}</p>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Comparisons */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {comparisons[activeTab].map((item, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-4">
              {/* Before */}
              <div className="p-5 rounded-xl bg-destructive/5 border border-destructive/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                    <X className="w-3 h-3 text-destructive" />
                  </div>
                  <span className="text-xs font-mono text-destructive uppercase">Today</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.before}</p>
              </div>

              {/* After */}
              <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-xs font-mono text-primary uppercase">With Glean</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{item.after}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  )
}

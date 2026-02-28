"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { SectionWrapper, FadeIn } from "./section-wrapper"
import { Camera, Brain, Sun, Users, BookOpen, BarChart3 } from "lucide-react"

const cycleSteps = [
  {
    time: "Sun 7 pm",
    label: "Sarah Captures",
    icon: Camera,
    image: "/images/phone-capture.jpg",
    desc: "Opens Glean mobile. Photos 28 quizzes. 18 minutes. OCR + misconception classifier runs overnight.",
    detail: "Replaces 12-15 hours of manual grading with a quick photo scan. AI handles the rest.",
  },
  {
    time: "Overnight",
    label: "Glean Processes",
    icon: Brain,
    image: "/images/data-network.jpg",
    desc: "Clusters misconceptions across all students. Matches to curriculum index. Assigns confidence scores. Drafts brief.",
    detail: "Identifies systemic misunderstandings across the entire class, not just individual mistakes.",
  },
  {
    time: "Mon 7:30 am",
    label: "Sarah Reads Brief",
    icon: Sun,
    image: "/images/hero-teacher.jpg",
    desc: "'34 students inverting signs — high confidence. 9 skipping steps — medium. 11 ready for extension.'",
    detail: "90-second brief delivered 30 min before first period. Two grounded resource links from Sarah's lesson plans.",
  },
  {
    time: "Mon 8 am",
    label: "Class Runs Differently",
    icon: Users,
    image: "/images/classroom-bright.jpg",
    desc: "Targeted reteach, not 'any questions?' Three lanes: reteach / scaffold / extend.",
    detail: "Marcus's sign error is caught before it compounds into Unit 5.",
  },
  {
    time: "Mon Evening",
    label: "Marcus Practices",
    icon: BookOpen,
    image: "/images/student-studying.jpg",
    desc: "Gets stuck. Companion asks a Socratic question — never contradicts Sarah's methodology.",
    detail: "Opens mastery view: 'Discriminant: improving.' Gets unstuck in minutes, not hours.",
  },
  {
    time: "Mon Night",
    label: "Signal Updates",
    icon: BarChart3,
    image: "/images/data-network.jpg",
    desc: "Marcus's session classified. Added to class graph. Sarah's Tuesday brief already building.",
    detail: "The cycle repeats, getting smarter with each iteration. The signal compounds.",
  },
]

export function CycleSection() {
  const [activeStep, setActiveStep] = useState(0)
  const current = cycleSteps[activeStep]
  const CurrentIcon = current.icon

  return (
    <SectionWrapper id="cycle" className="py-28">
      <FadeIn>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono text-primary font-semibold tracking-wide">04</span>
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-widest">Product in Action</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-3 text-balance">
          The <span className="text-primary">24-Hour</span> Cycle
        </h2>
        <p className="text-xs text-muted-foreground/60 font-mono mb-14">
          capture &rarr; cluster &rarr; brief &rarr; teach &rarr; practice &rarr; update &rarr; repeat
        </p>
      </FadeIn>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Steps */}
        <div className="lg:col-span-2">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-4 bottom-4 w-px bg-border/30" />

            <div className="space-y-0.5">
              {cycleSteps.map((step, i) => {
                const Icon = step.icon
                const isActive = activeStep === i
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 relative z-10 ${
                      isActive ? "bg-card border border-primary/15" : "hover:bg-secondary/30 border border-transparent"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-[10px] font-mono uppercase tracking-wide ${isActive ? "text-primary" : "text-muted-foreground/50"}`}>
                        {step.time}
                      </p>
                      <p className={`text-sm truncate ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {step.label}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl overflow-hidden bg-card border border-border/50"
            >
              <div className="relative h-52 md:h-64 overflow-hidden">
                <Image src={current.image} alt={current.label} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <CurrentIcon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-primary">{current.time}</p>
                    <p className="text-base font-serif text-foreground">{current.label}</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[13px] text-foreground/90 leading-relaxed mb-2">{current.desc}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{current.detail}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot nav */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {cycleSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeStep === i ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-muted-foreground/20"
                }`}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-12 p-5 rounded-xl bg-primary/[0.04] border border-primary/10 text-center">
          <p className="text-base font-serif text-foreground">
            Intervention <span className="text-primary font-medium">before</span> failure, not after.
          </p>
          <p className="text-xs text-muted-foreground mt-1.5">
            Marcus{"'"}s sign error is addressed Monday morning. Without Glean, it follows him to the Unit 5 exam.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}

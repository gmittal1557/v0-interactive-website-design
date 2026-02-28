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
    desc: "Opens Glean mobile. Photos 28 quizzes. 18 minutes.",
    detail: "OCR + misconception classifier runs overnight. Replaces 12-15 hours of manual grading.",
    accent: "from-primary/20",
  },
  {
    time: "Overnight",
    label: "Glean Processes",
    icon: Brain,
    image: "/images/data-network.jpg",
    desc: "Clusters misconceptions across all students.",
    detail: "Matches to curriculum index. Assigns confidence scores. Drafts the brief.",
    accent: "from-accent/20",
  },
  {
    time: "Mon 7:30 am",
    label: "Sarah Reads Brief",
    icon: Sun,
    image: "/images/hero-teacher.jpg",
    desc: "90-second brief. '34 students inverting signs — high confidence.'",
    detail: "Two grounded resource links from Sarah's lesson plans. Delivered 30 min before first period.",
    accent: "from-chart-4/20",
  },
  {
    time: "Mon 8 am",
    label: "Class Runs Differently",
    icon: Users,
    image: "/images/classroom-bright.jpg",
    desc: "Three lanes: reteach / scaffold / extend.",
    detail: "Marcus's sign error is caught before it compounds into Unit 5. Targeted reteach, not 'any questions?'",
    accent: "from-primary/20",
  },
  {
    time: "Mon Evening",
    label: "Marcus Practices",
    icon: BookOpen,
    image: "/images/student-studying.jpg",
    desc: "Gets stuck. Companion asks a Socratic question.",
    detail: "Never contradicts Sarah's methodology. Opens mastery view: 'Discriminant: improving.'",
    accent: "from-accent/20",
  },
  {
    time: "Mon Night",
    label: "Signal Updates",
    icon: BarChart3,
    image: "/images/data-network.jpg",
    desc: "Marcus's session classified. Added to class graph.",
    detail: "Sarah's Tuesday brief is already being built. The cycle repeats, getting smarter.",
    accent: "from-primary/20",
  },
]

export function CycleSection() {
  const [activeStep, setActiveStep] = useState(0)
  const current = cycleSteps[activeStep]
  const CurrentIcon = current.icon

  return (
    <SectionWrapper id="cycle" className="py-24 lg:py-32">
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono text-primary font-bold tracking-wide">04</span>
          <div className="h-px flex-1 bg-border/30" />
          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em]">Product in Action</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground mb-3 text-balance leading-[1.05]">
          The <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">24-Hour</span> Cycle
        </h2>
        <p className="text-[10px] text-muted-foreground/50 font-mono mb-14 uppercase tracking-[0.15em]">
          capture &rarr; cluster &rarr; brief &rarr; teach &rarr; practice &rarr; update &rarr; repeat
        </p>
      </FadeIn>

      {/* Main interactive area */}
      <div className="grid lg:grid-cols-12 gap-5">
        {/* Timeline steps - left */}
        <div className="lg:col-span-4">
          <div className="relative">
            {/* Animated vertical progress */}
            <div className="absolute left-[19px] top-3 bottom-3 w-px bg-border/20">
              <motion.div
                className="w-full bg-gradient-to-b from-primary to-accent"
                animate={{ height: `${((activeStep + 1) / cycleSteps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            <div className="space-y-1">
              {cycleSteps.map((step, i) => {
                const Icon = step.icon
                const isActive = activeStep === i
                const isPast = i < activeStep
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`w-full flex items-center gap-3.5 p-3 rounded-xl text-left transition-all duration-200 relative z-10 ${
                      isActive ? "bg-card border border-primary/20" : "hover:bg-secondary/20 border border-transparent"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : isPast ? "bg-primary/20 text-primary" : "bg-secondary/60 text-muted-foreground/50"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-[9px] font-mono uppercase tracking-[0.15em] ${isActive ? "text-primary" : "text-muted-foreground/40"}`}>
                        {step.time}
                      </p>
                      <p className={`text-sm ${isActive ? "text-foreground font-medium" : "text-muted-foreground/70"}`}>
                        {step.label}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Visual detail panel - right */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden bg-card border border-border/30"
            >
              {/* Large image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image src={current.image} alt={current.label} fill className="object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t ${current.accent} via-transparent to-card/90`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                {/* Floating badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-xl border border-border/30">
                  <CurrentIcon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-mono text-primary font-bold">{current.time}</span>
                </div>

                {/* Large title overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl md:text-3xl font-serif text-foreground">{current.label}</h3>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-base text-foreground/90 leading-relaxed mb-2">{current.desc}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{current.detail}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {cycleSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeStep === i ? "w-7 h-2 bg-primary" : "w-2 h-2 bg-muted-foreground/15 hover:bg-muted-foreground/30"
                }`}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Key insight */}
      <FadeIn delay={0.2}>
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-primary/[0.05] to-accent/[0.05] border border-primary/10 text-center">
          <p className="text-lg md:text-xl font-serif text-foreground">
            Intervention <span className="text-primary font-semibold">before</span> failure, not after.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Marcus{"'"}s sign error is addressed Monday morning. Without Glean, it follows him to the Unit 5 exam.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}

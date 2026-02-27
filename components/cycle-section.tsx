"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { SectionWrapper, FadeIn } from "./section-wrapper"
import { Camera, Brain, Sun, Users, BookOpen, BarChart3 } from "lucide-react"

const cycleSteps = [
  {
    time: "Sun 7pm",
    label: "Sarah Captures",
    icon: Camera,
    color: "bg-primary",
    image: "/images/phone-capture.jpg",
    desc: "Opens Glean mobile. Photos 28 quizzes. 18 minutes. OCR + misconception classifier runs overnight.",
    detail: "The capture replaces 12-15 hours of manual grading with a quick photo scan. AI handles the rest.",
  },
  {
    time: "Overnight",
    label: "Glean Processes",
    icon: Brain,
    color: "bg-chart-5",
    image: "/images/data-network.jpg",
    desc: "Clusters misconceptions across all students. Matches to curriculum index. Assigns confidence scores. Drafts brief.",
    detail: "The classifier identifies patterns across the entire class — not just individual mistakes, but systemic misunderstandings.",
  },
  {
    time: "Mon 7:30am",
    label: "Sarah Reads",
    icon: Sun,
    color: "bg-warm",
    image: "/images/hero-teacher.jpg",
    desc: "'34 students inverting signs — high confidence. 9 skipping steps — medium confidence. 11 ready for extension.'",
    detail: "90-second brief delivered 30 minutes before first period. Two grounded resource links from Sarah's own lesson plans.",
  },
  {
    time: "Mon 8am",
    label: "Class Runs Differently",
    icon: Users,
    color: "bg-primary",
    image: "/images/classroom-bright.jpg",
    desc: "Targeted reteach, not 'any questions?' Three lanes: reteach / scaffold / extend.",
    detail: "Marcus's sign error is caught before it compounds into Unit 5. Sarah splits the class into targeted groups for the first time.",
  },
  {
    time: "Mon Evening",
    label: "Marcus Practices",
    icon: BookOpen,
    color: "bg-chart-2",
    image: "/images/student-studying.jpg",
    desc: "Gets stuck. Companion asks a Socratic question — never contradicts Sarah's methodology. Opens mastery view: 'Discriminant: improving.'",
    detail: "The companion grounds all responses in Sarah's lesson plan. Marcus gets unstuck in minutes, not hours.",
  },
  {
    time: "Mon Night",
    label: "Signal Updates",
    icon: BarChart3,
    color: "bg-chart-5",
    image: "/images/data-network.jpg",
    desc: "Marcus's session classified. Added to class graph. Sarah's Tuesday brief is already being built.",
    detail: "The cycle repeats, getting smarter with each iteration. The signal compounds.",
  },
]

export function CycleSection() {
  const [activeStep, setActiveStep] = useState(0)
  const current = cycleSteps[activeStep]
  const CurrentIcon = current.icon

  return (
    <SectionWrapper id="cycle" className="py-24">
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <span className="text-xs font-mono text-primary">04</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">The Product in Action</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
          The <span className="text-primary">24-Hour</span> Cycle
        </h2>
        <p className="text-sm text-muted-foreground font-mono mb-12">
          Sunday capture &rarr; overnight clustering &rarr; Monday brief &rarr; targeted instruction &rarr; better signal &rarr; repeat
        </p>
      </FadeIn>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Timeline steps */}
        <div className="lg:col-span-2 space-y-1">
          {cycleSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                  activeStep === i
                    ? "bg-card border border-primary/20"
                    : "bg-transparent hover:bg-secondary/50 border border-transparent"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0 transition-all ${
                  activeStep === i ? "opacity-100 scale-100" : "opacity-40 scale-90"
                }`}>
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-primary uppercase">{step.time}</p>
                  <p className={`text-sm font-sans font-semibold transition-colors ${
                    activeStep === i ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.label}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden bg-card border border-border"
            >
              <div className="relative h-56 md:h-72 overflow-hidden">
                <Image
                  src={current.image}
                  alt={current.label}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${current.color} flex items-center justify-center`}>
                      <CurrentIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-primary">{current.time}</p>
                      <p className="text-lg font-serif font-bold text-foreground">{current.label}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-foreground leading-relaxed mb-3">{current.desc}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{current.detail}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {cycleSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === i ? "w-8 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Key insight */}
      <FadeIn delay={0.3}>
        <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
          <p className="text-lg font-serif text-foreground">
            The step-function change: <span className="text-primary font-bold">Intervention before failure, not after.</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Marcus{"'"}s sign error is addressed Monday morning. Without Glean, it follows him to the Unit 5 exam.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"
import { Camera, Brain, Sun, Users, BookOpen, BarChart3, ChevronRight } from "lucide-react"

const cycleSteps = [
  {
    time: "Sun 7 pm",
    label: "Sarah Captures",
    icon: Camera,
    image: "/images/phone-capture.jpg",
    desc: "Opens Glean mobile. Photos 28 quizzes. 18 minutes.",
    detail: "OCR + misconception classifier runs overnight. Replaces 12-15 hours of manual grading.",
  },
  {
    time: "Overnight",
    label: "Glean Processes",
    icon: Brain,
    image: "/images/data-network.jpg",
    desc: "Clusters misconceptions across all students.",
    detail: "Matches to curriculum index. Assigns confidence scores. Drafts the brief.",
  },
  {
    time: "Mon 7:30 am",
    label: "Sarah Reads Brief",
    icon: Sun,
    image: "/images/hero-teacher.jpg",
    desc: "90-second brief: '34 students inverting signs -- high confidence.'",
    detail: "Two grounded resource links from Sarah's lesson plans. 30 minutes before first period.",
  },
  {
    time: "Mon 8 am",
    label: "Class Runs Differently",
    icon: Users,
    image: "/images/classroom-bright.jpg",
    desc: "Three lanes: reteach / scaffold / extend.",
    detail: "Marcus's sign error is caught before it compounds into Unit 5.",
  },
  {
    time: "Mon Evening",
    label: "Marcus Practices",
    icon: BookOpen,
    image: "/images/student-studying.jpg",
    desc: "Gets stuck. Companion asks a Socratic question.",
    detail: "Never contradicts Sarah's methodology. Opens mastery view: 'Discriminant: improving.'",
  },
  {
    time: "Mon Night",
    label: "Signal Updates",
    icon: BarChart3,
    image: "/images/data-network.jpg",
    desc: "Marcus's session classified. Added to class graph.",
    detail: "Sarah's Tuesday brief is already being built. The cycle repeats, getting smarter.",
  },
]

export function CycleSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeStep, setActiveStep] = useState(0)
  const current = cycleSteps[activeStep]
  const CurrentIcon = current.icon

  return (
    <section ref={ref} id="cycle" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-widest">05</span>
          <div className="w-8 h-[1px] bg-border" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Product in Action</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-foreground leading-tight"
        >
          The 24-Hour Cycle
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-3 text-xs font-mono text-muted-foreground tracking-widest uppercase"
        >
          capture &rarr; cluster &rarr; brief &rarr; teach &rarr; practice &rarr; update &rarr; repeat
        </motion.p>

        {/* Main interactive area */}
        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          {/* Timeline steps */}
          <div className="lg:col-span-4">
            <div className="relative">
              <div className="absolute left-[19px] top-3 bottom-3 w-px bg-border/40">
                <motion.div
                  className="w-full bg-primary/60"
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
                        isActive ? "bg-card border border-primary/20 shadow-sm" : "hover:bg-card/50 border border-transparent"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isActive ? "bg-primary text-card" : isPast ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-[10px] font-mono uppercase tracking-widest ${isActive ? "text-primary" : "text-muted-foreground/50"}`}>
                          {step.time}
                        </p>
                        <p className={`text-sm ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                          {step.label}
                        </p>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl overflow-hidden bg-card border border-border/40"
              >
                <div className="relative h-56 md:h-72 overflow-hidden">
                  <Image src={current.image} alt={current.label} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/70 backdrop-blur-md border border-border/30">
                    <CurrentIcon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-mono text-primary font-medium">{current.time}</span>
                  </div>
                  <div className="absolute bottom-5 left-5">
                    <h3 className="text-2xl font-serif text-foreground">{current.label}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-base text-foreground leading-relaxed">{current.desc}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{current.detail}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-1.5 mt-4">
              {cycleSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`rounded-full transition-all duration-300 ${
                    activeStep === i ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                  }`}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-14 p-6 rounded-2xl bg-primary/[0.04] border border-primary/10 text-center"
        >
          <p className="text-lg font-serif text-foreground">
            Intervention <span className="text-primary font-semibold">before</span> failure, not after.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Marcus{"'"}s sign error is addressed Monday morning. Without Glean, it follows him to the Unit 5 exam.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { SectionWrapper, FadeIn } from "./section-wrapper"

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

const competitors = [
  {
    name: "Canvas / Google Classroom",
    what: "Know what was submitted",
    gap: "Cannot detect why it's wrong or cluster patterns across students",
    fill: 25,
  },
  {
    name: "Khan Academy",
    what: "Knows the curriculum",
    gap: "Cannot connect it to Sarah's specific students in her classroom",
    fill: 35,
  },
  {
    name: "Grading Software",
    what: "Speeds up the process",
    gap: "Does not change latency — signal still arrives too late",
    fill: 45,
  },
  {
    name: "Private Tutors",
    what: "Actually work",
    gap: "$150/hr. Not available to 90% of students",
    fill: 80,
  },
]

export function ProblemSection() {
  return (
    <SectionWrapper id="problem" className="py-28" fullHeight={false}>
      <FadeIn>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono text-primary font-semibold tracking-wide">02</span>
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-widest">The Problem</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-4 text-balance leading-[1.1]">
          Education{"'"}s failure mode
          <br className="hidden sm:block" />
          is <span className="text-primary">latency</span>.
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-lg mb-16 leading-relaxed">
          Not a content problem. Not a curriculum problem. An information architecture problem.
        </p>
      </FadeIn>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-20">
        {[
          { value: 15, suffix: " hrs/wk", label: "spent grading per teacher", color: "text-primary" },
          { value: 3, suffix: " weeks", label: "avg. misconception discovery lag", color: "text-warm" },
          { value: 34, suffix: "%", label: "carry a fixable gap to finals", color: "text-chart-3" },
          { value: 150, prefix: "$", suffix: "/hr", label: "cost of only personalized solution", color: "text-foreground" },
        ].map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.08}>
            <div className="p-5 rounded-xl bg-card border border-border/50 text-center">
              <p className={`text-2xl md:text-3xl font-mono font-bold ${stat.color}`}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} />
              </p>
              <p className="text-[11px] text-muted-foreground mt-2 leading-snug">{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Why nothing today solves it */}
      <FadeIn delay={0.15}>
        <h3 className="text-lg font-serif text-foreground mb-6">Why nothing today solves it</h3>
      </FadeIn>

      <div className="space-y-3">
        {competitors.map((comp, i) => (
          <FadeIn key={comp.name} delay={0.2 + i * 0.08}>
            <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap mb-0.5">
                  <h4 className="text-sm font-semibold text-foreground">{comp.name}</h4>
                  <span className="text-[11px] text-primary font-mono">{comp.what}</span>
                </div>
                <p className="text-xs text-muted-foreground">{comp.gap}</p>
              </div>
              <div className="w-full md:w-40 flex-shrink-0">
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${comp.fill}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-primary/40"
                  />
                </div>
                <p className="text-[9px] text-muted-foreground/60 mt-1 text-right font-mono">
                  {comp.fill === 80 ? "works, not scalable" : "partial coverage"}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.5}>
        <div className="mt-10 p-5 rounded-xl bg-secondary/50 border border-border/30">
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            The signal already exists — in Sarah{"'"}s Sunday quizzes, in Marcus{"'"}s evening practice.
            It has never been <span className="text-primary font-medium">extracted, structured, and delivered</span> to the right person at the right moment.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}

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
    gap: "Knows what was submitted. Cannot detect why it's wrong.",
    fill: 25,
    color: "bg-chart-4",
  },
  {
    name: "Khan Academy",
    gap: "Knows the curriculum. Cannot connect to Sarah's students.",
    fill: 35,
    color: "bg-chart-3",
  },
  {
    name: "Grading Software",
    gap: "Speeds up the process. Signal still arrives too late.",
    fill: 45,
    color: "bg-chart-2",
  },
  {
    name: "Private Tutors",
    gap: "Actually work. $150/hr. Unavailable to 90% of students.",
    fill: 80,
    color: "bg-primary",
  },
]

export function ProblemSection() {
  return (
    <SectionWrapper id="problem" className="py-24 lg:py-32" fullHeight={false}>
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono text-primary font-bold tracking-wide">02</span>
          <div className="h-px flex-1 bg-border/30" />
          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em]">The Problem</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-foreground mb-4 text-balance leading-[1.05]">
          Education{"'"}s failure mode is <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">latency</span>.
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mb-20 leading-relaxed">
          Not a content problem. Not a curriculum problem. An information architecture problem.
          The signal already exists — it has never been extracted at the right moment.
        </p>
      </FadeIn>

      {/* Big stat cards - Electric Grid style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/20 rounded-2xl overflow-hidden mb-20">
        {[
          { value: 15, suffix: " hrs", sub: "per week", label: "spent grading", color: "text-primary" },
          { value: 3, suffix: " wk", sub: "average", label: "misconception lag", color: "text-accent" },
          { value: 34, suffix: "%", sub: "of students", label: "carry fixable gaps", color: "text-chart-4" },
          { value: 150, prefix: "$", suffix: "", sub: "per hour", label: "tutoring cost", color: "text-foreground" },
        ].map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.08}>
            <div className="bg-card/70 p-6 md:p-8 text-center h-full flex flex-col justify-center">
              <p className={`text-3xl md:text-4xl lg:text-5xl font-mono font-bold ${stat.color} leading-none`}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} />
              </p>
              <p className="text-[10px] text-muted-foreground/50 font-mono mt-1.5 uppercase tracking-wider">{stat.sub}</p>
              <p className="text-xs text-muted-foreground mt-2">{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Why nothing today solves it - visual bars */}
      <FadeIn delay={0.15}>
        <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2">Why nothing today solves it</h3>
        <p className="text-xs text-muted-foreground/60 font-mono mb-8 uppercase tracking-wider">Coverage vs. the full problem</p>
      </FadeIn>

      <div className="space-y-4">
        {competitors.map((comp, i) => (
          <FadeIn key={comp.name} delay={0.2 + i * 0.08}>
            <div className="group">
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="text-sm font-semibold text-foreground">{comp.name}</h4>
                <span className="text-[10px] font-mono text-muted-foreground/50">{comp.fill}%</span>
              </div>
              <div className="h-3 rounded-full bg-secondary/60 overflow-hidden mb-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${comp.fill}%` }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`h-full rounded-full ${comp.color} opacity-60`}
                />
              </div>
              <p className="text-xs text-muted-foreground/60">{comp.gap}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Key insight box */}
      <FadeIn delay={0.5}>
        <div className="mt-14 p-8 rounded-2xl bg-card border border-border/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed pl-6">
            The signal already exists — in Sarah{"'"}s Sunday quizzes, in Marcus{"'"}s evening practice.
            It has never been <span className="text-primary font-semibold">extracted, structured, and delivered</span> to
            the right person at the right moment.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}

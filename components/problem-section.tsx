"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { SectionWrapper, FadeIn } from "./section-wrapper"

function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
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

  return <span ref={ref}>{count}{suffix}</span>
}

const competitors = [
  {
    name: "Canvas / Google Classroom",
    desc: "Know what was submitted",
    gap: "Cannot detect why it's wrong or cluster patterns",
    level: 25,
  },
  {
    name: "Khan Academy",
    desc: "Knows the curriculum",
    gap: "Cannot connect to Sarah's specific students",
    level: 35,
  },
  {
    name: "Grading Software",
    desc: "Speeds up the process",
    gap: "Signal still arrives too late",
    level: 45,
  },
  {
    name: "Private Tutors",
    desc: "Actually work",
    gap: "$150/hr — unavailable to 90% of students",
    level: 80,
  },
]

export function ProblemSection() {
  return (
    <SectionWrapper id="problem" className="py-24" fullHeight={false}>
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <span className="text-xs font-mono text-primary">02</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">The Problem</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4 text-balance">
          Education{"'"}s failure mode is{" "}
          <span className="text-primary">latency</span>.
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
          This is not a content problem or a curriculum problem. It is an
          information architecture problem.
        </p>
      </FadeIn>

      {/* Big stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: 15, suffix: " hrs", label: "weekly grading per teacher", color: "text-primary" },
          { value: 3, suffix: " wk", label: "avg. lag to discovery", color: "text-warm" },
          { value: 34, suffix: "%", label: "carry fixable gap to finals", color: "text-chart-5" },
          { value: 150, suffix: "/hr", label: "cost of private tutoring", color: "text-foreground" },
        ].map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1}>
            <div className="p-6 rounded-2xl bg-card border border-border text-center">
              <span className={`text-3xl md:text-4xl font-mono font-bold ${stat.color}`}>
                {stat.value === 150 && "$"}<AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </span>
              <p className="text-xs text-muted-foreground mt-2 leading-snug">{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Competitor landscape */}
      <FadeIn delay={0.2}>
        <h3 className="text-xl font-serif font-bold text-foreground mb-6">Why nothing today solves it</h3>
      </FadeIn>
      <div className="space-y-4">
        {competitors.map((comp, i) => (
          <FadeIn key={comp.name} delay={0.3 + i * 0.1}>
            <div className="p-5 rounded-xl bg-card border border-border">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-sm font-bold text-foreground font-sans">{comp.name}</h4>
                    <span className="text-xs text-primary font-mono">{comp.desc}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comp.gap}</p>
                </div>
                <div className="w-full md:w-48">
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${comp.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                      viewport={{ once: true }}
                      className="h-full rounded-full bg-primary/50"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 text-right font-mono">
                    {comp.level === 80 ? "works, but unscalable" : "partial solution"}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Insight box */}
      <FadeIn delay={0.5}>
        <div className="mt-12 p-6 rounded-2xl bg-secondary border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The signal already exists — in Sarah{"'"}s Sunday quizzes, in Marcus{"'"}s evening practice.
            It has never been <span className="text-primary font-semibold">extracted, structured, and delivered</span> to the right person at the right moment.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}

"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { AppendixDialog } from "@/components/appendix-dialog"

export function PersonasSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [active, setActive] = useState<"sarah" | "marcus">("sarah")

  return (
    <section ref={ref} id="personas" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-widest">02</span>
          <div className="w-8 h-[1px] bg-border" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">User Persona</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-foreground leading-tight max-w-3xl"
        >
          The Two Humans
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex gap-1 p-1 rounded-full bg-secondary/80 w-fit"
        >
          <button
            onClick={() => setActive("sarah")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              active === "sarah" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sarah Chen
          </button>
          <button
            onClick={() => setActive("marcus")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              active === "marcus" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Marcus
          </button>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary"
          >
            <Image
              src={active === "sarah" ? "/images/hero-teacher.jpg" : "/images/student-studying.jpg"}
              alt={active === "sarah" ? "Teacher reviewing student work" : "Student studying at desk"}
              fill
              className="object-cover transition-all duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-card/90 backdrop-blur-md rounded-xl px-4 py-3 border border-border/30">
                {active === "sarah" ? (
                  <>
                    <div className="text-sm font-semibold text-foreground">Sarah Chen</div>
                    <div className="text-xs text-muted-foreground mt-0.5">11th Grade Math &middot; Jefferson High &middot; 142 students &middot; 5 classes</div>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-semibold text-foreground">Marcus</div>
                    <div className="text-xs text-muted-foreground mt-0.5">11th Grade &middot; Sarah{"'"}s Algebra 2 class &middot; Studies hard, still underperforms</div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {active === "sarah" ? (
              <>
                <p className="text-xl md:text-2xl font-serif text-foreground leading-snug italic">
                  {"\"Hired to coach. Forced to process.\""}
                </p>
                <p className="mt-6 text-base text-muted-foreground leading-relaxed">
                  Every Sunday night: 28 quizzes. 12-15 hours. She discovers what went wrong — <span className="text-foreground font-medium">three weeks after it started compounding</span> into the next unit.
                </p>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                  She became a teacher to catch Marcus before the exam. The system only lets her catch him after.
                </p>
                <div className="mt-8 p-4 rounded-xl bg-primary/[0.04] border border-primary/10">
                  <div className="text-xs font-mono text-primary uppercase tracking-widest mb-2">The #1 Pain</div>
                  <div className="text-sm text-foreground leading-relaxed">
                    Grading latency -- 3-week lag between misconception and discovery. By the time Sarah finds it, the damage has compounded into the next unit.
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground/60">Note: Middle school (6-8) flagged as higher-leverage expansion target in V2</p>
              </>
            ) : (
              <>
                <p className="text-xl md:text-2xl font-serif text-foreground leading-snug italic">
                  {"\"Not failing. Not disengaged. Nobody has time to find out why.\""}
                </p>
                <p className="mt-6 text-base text-muted-foreground leading-relaxed">
                  A small, fixable misunderstanding about sign inversion that <span className="text-foreground font-medium">nobody has ever specifically identified for him</span>. His grade says 68. It doesn{"'"}t say why.
                </p>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                  Sarah has 141 other students. A private tutor solves this at $150/hr. That{"'"}s why tutoring works and costs what it does.
                </p>
                <div className="mt-8 p-4 rounded-xl bg-primary/[0.04] border border-primary/10">
                  <div className="text-xs font-mono text-primary uppercase tracking-widest mb-2">The Insight</div>
                  <div className="text-sm text-foreground leading-relaxed">
                    Glean is that private tutor -- for every Marcus, in every school, regardless of zip code.
                  </div>
                </div>
              </>
            )}
            <div className="mt-6">
              <AppendixDialog
                title="Student Experience Design"
                content={[
                  "The product's biggest blind spot: treating Marcus as a data source rather than a user. If he doesn't engage voluntarily, V2 produces garbage signal.",
                  "Why Marcus engages: Mastery view gives a specific, honest, private map of where he stands. Privacy contract shown on first use in plain language.",
                  "Sarah sees: '34 students got the sign inversion step wrong.' Class-level only, never individual attribution.",
                  "Marcus sees: His own mastery map. Private. Not graded. Not visible to Sarah.",
                  "Non-participation: V1 still works -- signal comes from quiz capture. Low-engagement sessions marked low-confidence, excluded from Sarah's brief.",
                ]}
                triggerLabel="Student Experience Detail"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

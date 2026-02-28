"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AppendixDialog } from "@/components/appendix-dialog"

const successTiers = [
  { tier: "1", name: "Adoption", metric: "70%+ teachers open brief before 3+ classes/week" },
  { tier: "2", name: "Engagement", metric: "Avg time in brief < 3 min. It's a brief, not a dashboard." },
  { tier: "3", name: "Behavior Change", metric: "50%+ Monday classes reteach top flagged misconception.", highlight: true },
  { tier: "4", name: "Time Savings", metric: "8+ hrs/week grading time reclaimed per teacher" },
  { tier: "5", name: "Signal Accuracy", metric: "75%+ precision on high-confidence tags, teacher-validated" },
  { tier: "6", name: "Student Outcomes", metric: "Effect size 0.3+ SD on unit assessments vs. control (semester 2)" },
]

export function BetSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="bet" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-primary tracking-widest">08</span>
          <div className="w-8 h-[1px] bg-border" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">The Bet</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-foreground leading-tight max-w-3xl"
        >
          Infrastructure, not an app.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
        >
          The district{"'"}s collective teaching intelligence, indexed. What Ms. Rodriguez discovered
          about sign inversion in 2019, surfaced to every teacher who hits that misconception in 2026.
        </motion.p>

        {/* The core bet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 p-6 md:p-10 rounded-2xl bg-surface-dark text-surface-dark-foreground relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)", backgroundSize: "20px 20px" }} />
          <div className="relative">
            <p className="text-base md:text-lg text-surface-dark-foreground/80 leading-relaxed max-w-3xl">
              Glean{"'"}s enterprise knowledge graph, multimodal AI, and RAG architecture are
              exactly the right tools to close that gap. The bet is that closing it creates a
              product that is simultaneously{" "}
              <span className="text-primary font-medium">irreplaceable for teachers</span>,{" "}
              genuinely valuable for students, and{" "}
              <span className="text-surface-dark-foreground font-semibold">structurally defensible</span> against
              every well-funded incumbent.
            </p>
          </div>
        </motion.div>

        {/* Success metrics tiers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-14"
        >
          <h3 className="text-lg font-serif text-foreground mb-6">Success Metrics</h3>
          <div className="space-y-2">
            {successTiers.map((t, i) => (
              <motion.div
                key={t.tier}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.55 + i * 0.06 }}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 ${
                  t.highlight ? "bg-primary/[0.04] border-primary/20" : "bg-card border-border/40"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  t.highlight ? "bg-primary text-card" : "bg-secondary text-muted-foreground"
                }`}>
                  <span className="text-xs font-mono font-bold">{t.tier}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-mono text-primary uppercase tracking-widest">{t.name}</span>
                  <p className="text-sm text-foreground mt-0.5 leading-relaxed">{t.metric}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl font-serif text-foreground/70 leading-relaxed italic">
            {"\"Sarah doesn't need another app. She needs the right information at the right moment, grounded in what she already knows works, with enough time to do something about it.\""}
          </p>
          <p className="text-sm text-primary font-mono mt-5 font-medium">
            That{"'"}s what Glean for Teachers is.
          </p>
        </motion.div>

        {/* Appendix reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 p-6 rounded-2xl bg-secondary/50 border border-border/30"
        >
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-1">Reference</div>
          <p className="text-sm font-semibold text-foreground mb-1">Appendix -- Full Detail</p>
          <p className="text-xs text-muted-foreground mb-4">Click any topic for deeper reasoning, tradeoffs, and specifications.</p>
          <div className="flex flex-wrap gap-2">
            <AppendixDialog
              title="Product Vision -- North Star"
              content={[
                "North Star (12 months): Every teacher starts class knowing exactly where every student is confused. Every student knows exactly what to fix before the test.",
                "Learning Signal Graph: Inputs include LMS submissions, practice sessions, scanned quizzes, exit tickets.",
                "Teaching Command Bar (Cmd+J): Natural language queries grounded in curriculum index.",
              ]}
              triggerLabel="Product Vision"
            />
            <AppendixDialog
              title="Student Experience Design"
              content={[
                "Why Marcus engages voluntarily: A specific, honest, private map of where he stands.",
                "Sarah sees class-level patterns only. Marcus sees his own mastery map. District sees cross-classroom heatmaps.",
                "Non-participation: V1 still works. Low-effort sessions excluded from Sarah's brief.",
              ]}
              triggerLabel="Student Experience"
            />
            <AppendixDialog
              title="Enterprise Go-to-Market"
              content={[
                "Land: 3-5 teachers in one school. Prove brief accuracy and time savings.",
                "Expand to department: 10-15 teachers. Show cross-classroom patterns.",
                "Expand to district: District analytics unlock. CIO signs enterprise contract.",
                "Pricing: $500-800/teacher/year. 10-teacher pilot at $5k-8k. District-wide $50k-150k.",
              ]}
              triggerLabel="GTM Strategy"
            />
            <AppendixDialog
              title="Data Architecture & Privacy"
              content={[
                "FERPA: All student data classified as educational records. Role-based access enforced.",
                "Data minimization: Only collect what's needed.",
                "Retention: Signals expire after 90 days unless refreshed.",
                "NOT stored: Raw dialogue, individual PII, video/audio, behavioral metadata.",
              ]}
              triggerLabel="Data & Privacy"
            />
            <AppendixDialog
              title="Open Questions"
              content={[
                "Sarah's trust threshold? Structured interviews with 5 pilot teachers after week 2.",
                "How to frame mastery view without triggering anxiety?",
                "Actual OCR accuracy on real handwriting? Collect 200 real quizzes.",
                "Who is the economic buyer? 10 discovery calls with district admins.",
                "Union dimension? Algorithmic processing of teacher data may be a contract issue.",
              ]}
              triggerLabel="Open Questions"
            />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          className="mt-14 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="7" className="fill-primary" />
              <path d="M10 16.5C10 13.5 12.5 11 16 11C18 11 19.5 11.8 20.5 13L18.5 14.5C18 13.8 17.1 13.3 16 13.3C13.9 13.3 12.5 14.7 12.5 16.5C12.5 18.3 13.9 19.7 16 19.7C17.5 19.7 18.5 19 19 18.2V17.5H16V15.5H21.5V19C20.5 20.8 18.5 22 16 22C12.5 22 10 19.5 10 16.5Z" className="fill-primary-foreground" />
            </svg>
            <span className="text-xs text-muted-foreground font-mono">Glean for Teachers</span>
          </div>
          <p className="text-[10px] text-muted-foreground/50 font-mono text-center sm:text-right">
            Gaurav Mittal &middot; Director of PM, EY-Parthenon &middot; Feb 2026
          </p>
        </motion.div>
      </div>
    </section>
  )
}

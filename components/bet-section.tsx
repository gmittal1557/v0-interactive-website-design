"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionWrapper, FadeIn } from "./section-wrapper"
import { AppendixDialog } from "./appendix-dialog"

export function BetSection() {
  const roadmapRef = useRef<HTMLDivElement>(null)
  const roadmapInView = useInView(roadmapRef, { once: true })

  const versions = [
    { v: "V1", label: "Signal Extraction", time: "Mo 1-3", who: "Sarah only", color: "border-primary/30 bg-primary/[0.06]" },
    { v: "V2", label: "Signal Generation", time: "Mo 4-9", who: "Sarah + Marcus", color: "border-primary/20 bg-primary/[0.04]" },
    { v: "V3", label: "District Intelligence", time: "Mo 10-18", who: "Sarah + District", color: "border-accent/20 bg-accent/[0.04]" },
    { v: "V4", label: "Grading Evolution", time: "Mo 18+", who: "Everyone", color: "border-border/30 bg-secondary/30" },
  ]

  return (
    <SectionWrapper id="bet" className="py-24 lg:py-32">
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono text-primary font-bold tracking-wide">07</span>
          <div className="h-px flex-1 bg-border/30" />
          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em]">The Bet</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-foreground mb-8 text-balance max-w-4xl leading-[1.05]">
          Infrastructure,
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">not an app.</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-14">
          The district{"'"}s collective teaching intelligence, indexed. What Ms. Rodriguez discovered
          about sign inversion in 2019, surfaced to every teacher who hits that misconception in 2026.
        </p>
      </FadeIn>

      {/* The bet card - cinematic */}
      <FadeIn delay={0.15}>
        <div className="p-8 md:p-12 rounded-2xl bg-card border border-border/20 mb-14 relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.04] blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/[0.03] blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <p className="text-lg md:text-xl text-foreground/85 leading-relaxed mb-14 max-w-3xl">
              Glean{"'"}s enterprise knowledge graph, multimodal AI, and RAG architecture are
              exactly the right tools to close that gap. The bet is that closing it creates a
              product that is simultaneously{" "}
              <span className="text-primary font-medium">irreplaceable for teachers</span>,{" "}
              <span className="text-accent font-medium">genuinely valuable for students</span>, and{" "}
              <span className="text-foreground font-semibold">structurally defensible</span> against
              every well-funded incumbent.
            </p>

            {/* Version roadmap - animated */}
            <div ref={roadmapRef}>
              <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em] mb-5">Product Roadmap</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {versions.map((item, i) => (
                  <motion.div
                    key={item.v}
                    initial={{ opacity: 0, y: 16 }}
                    animate={roadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`p-4 rounded-xl border ${item.color}`}
                  >
                    <p className="text-2xl font-mono font-bold text-foreground">{item.v}</p>
                    <p className="text-xs text-foreground/70 mt-1">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground/50 font-mono mt-0.5">{item.time}</p>
                    <p className="text-[9px] text-primary/50 font-mono mt-2 uppercase tracking-wider">{item.who}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Closing quote */}
      <FadeIn delay={0.25}>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl font-serif text-foreground/70 leading-relaxed italic">
            {"\"Sarah doesn't need another app. She needs the right information at the right moment, grounded in what she already knows works, with enough time to do something about it.\""}
          </p>
          <p className="text-sm text-primary font-mono mt-5 font-medium">
            That{"'"}s what Glean for Teachers is.
          </p>
        </div>
      </FadeIn>

      {/* All appendix items */}
      <FadeIn delay={0.3}>
        <div className="p-6 md:p-8 rounded-2xl bg-secondary/20 border border-border/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <p className="text-[9px] font-mono text-primary/50 uppercase tracking-[0.2em]">Reference</p>
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">Appendix — Full Detail</p>
          <p className="text-xs text-muted-foreground/60 mb-5">Click any topic for deeper reasoning, tradeoffs, and specifications.</p>
          <div className="flex flex-wrap gap-2">
            <AppendixDialog
              title="Product Vision — North Star"
              content={[
                "North Star (12 months): Every teacher starts class knowing exactly where every student is confused. Every student knows exactly what to fix before the test.",
                "Learning Signal Graph: Inputs include LMS submissions, practice sessions, scanned quizzes, exit tickets. Output per signal: { concept, misconception_type, confidence_score, freshness_ts, session_quality_flag }",
                "Marcus's Personal Mastery View: Private to Marcus only. Links to the specific step in Sarah's lesson plan where the gap lives.",
                "Teaching Command Bar (Cmd+J): Natural language queries like 'Who is struggling with completing the square in Period 3?' RAG-first: All responses grounded in curriculum index.",
              ]}
            />
            <AppendixDialog
              title="Student Experience Design"
              content={[
                "Why Marcus engages voluntarily: A specific, honest, private map of where he stands — before the test, not after. Privacy contract on first use in plain language.",
                "What Marcus sees vs Sarah: Sarah sees class-level patterns only. Marcus sees his own mastery map. District sees cross-classroom heatmaps. No individual student data at any level.",
                "Non-participation: If Marcus never uses the companion, V1 still works. Low-effort sessions are excluded from Sarah's brief.",
                "Biggest blind spot: Treating Marcus as data source rather than user. If he doesn't engage voluntarily, V2 produces garbage signal.",
              ]}
            />
            <AppendixDialog
              title="Success Metrics (6 Tiers)"
              content={[
                "Tier 1 — Adoption: 70%+ teachers open brief before 3+ classes/week",
                "Tier 2 — Engagement: Avg time in brief < 3 min. It's a brief, not a dashboard.",
                "Tier 3 — Behavior change: 50%+ Monday classes reteach top flagged misconception. THIS is the metric.",
                "Tier 4 — Time savings: 8+ hrs/week grading time reclaimed per teacher",
                "Tier 5 — Signal accuracy: 75%+ precision on high-confidence tags, teacher-validated",
                "Tier 6 — Student outcomes: Effect size 0.3+ SD on unit assessments vs. control (semester 2 only)",
              ]}
            />
            <AppendixDialog
              title="Enterprise Go-to-Market"
              content={[
                "Glean's existing GTM motion: District contracts, IT security review, FERPA BAA, pilot-to-expand. The champion is a Curriculum Director, not a CIO.",
                "Land: 3-5 teachers in one school. Prove brief accuracy and time savings.",
                "Expand to department: 10-15 teachers. Show cross-classroom patterns. Win the Principal.",
                "Expand to district: District analytics unlock. CIO signs enterprise contract.",
                "Pricing: $500-800/teacher/year. 10-teacher pilot at $5k-8k. District-wide license $50k-150k.",
              ]}
            />
            <AppendixDialog
              title="Open Questions"
              content={[
                "Sarah's trust threshold? Structured interviews with 5 pilot teachers after week 2.",
                "How to frame mastery view without triggering anxiety? A/B test three framings with 30 students.",
                "Right report cadence? Daily = noise. Weekly = misses the loop. Pilot three options.",
                "Actual OCR accuracy on real handwriting? Collect 200 real quizzes, human-validate.",
                "Does classifier transfer across teachers? Train on 3, test on 4th.",
                "Who is the economic buyer? 10 discovery calls with district admins in month 1.",
                "Union dimension? Algorithmic processing of teacher data may be a contract issue.",
              ]}
            />
            <AppendixDialog
              title="Data Architecture & Privacy"
              content={[
                "FERPA: All student data classified as educational records. Role-based access enforced.",
                "Data minimization: Only collect what's needed. No behavioral fingerprinting.",
                "Retention: Signals expire after 90 days unless refreshed by new data.",
                "Student privacy contract: Three sentences on first use. What we collect. What we show your teacher. What we never share.",
                "NOT stored: Raw dialogue, individual PII, video/audio, behavioral metadata beyond task completion.",
              ]}
            />
          </div>
        </div>
      </FadeIn>

      {/* Footer */}
      <FadeIn delay={0.35}>
        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="7" className="fill-primary" />
              <path d="M10 16.5C10 13.5 12.5 11 16 11C18 11 19.5 11.8 20.5 13L18.5 14.5C18 13.8 17.1 13.3 16 13.3C13.9 13.3 12.5 14.7 12.5 16.5C12.5 18.3 13.9 19.7 16 19.7C17.5 19.7 18.5 19 19 18.2V17.5H16V15.5H21.5V19C20.5 20.8 18.5 22 16 22C12.5 22 10 19.5 10 16.5Z" className="fill-primary-foreground" />
            </svg>
            <span className="text-xs text-muted-foreground/50 font-mono">Glean for Teachers</span>
          </div>
          <p className="text-[10px] text-muted-foreground/30 font-mono text-center sm:text-right">
            Gaurav Mittal &middot; Director of PM, EY-Parthenon &middot; Feb 2026
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}

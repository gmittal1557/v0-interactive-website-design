"use client"

import { motion } from "framer-motion"
import { SectionWrapper, FadeIn } from "./section-wrapper"
import { AppendixDialog } from "./appendix-dialog"

export function BetSection() {
  return (
    <SectionWrapper id="bet" className="py-24">
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <span className="text-xs font-mono text-primary">07</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">The Bet</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-8 text-balance max-w-4xl">
          Infrastructure, not an app.
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
          The district{"'"}s collective teaching intelligence, indexed. What Ms. Rodriguez discovered
          about sign inversion in 2019, surfaced to every teacher who hits that misconception in 2026.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="p-8 md:p-12 rounded-2xl bg-card border border-border mb-12 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-warm/5 blur-[60px] rounded-full" />

          <div className="relative z-10">
            <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed mb-8">
              Glean{"'"}s enterprise knowledge graph, multimodal AI, and RAG architecture are
              exactly the right tools to close that gap. The bet is that closing it creates a
              product that is simultaneously{" "}
              <span className="text-primary font-bold">irreplaceable for teachers</span>,{" "}
              <span className="text-warm font-bold">genuinely valuable for students</span>, and{" "}
              <span className="text-foreground font-bold">structurally defensible</span> against
              every well-funded incumbent.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-3xl font-mono font-bold text-primary mb-1">V1</p>
                <p className="text-xs text-muted-foreground">Signal Extraction</p>
                <p className="text-[10px] text-muted-foreground/70 mt-1">Months 1-3</p>
              </div>
              <div className="p-4 rounded-xl bg-warm/5 border border-warm/10">
                <p className="text-3xl font-mono font-bold text-warm mb-1">V2</p>
                <p className="text-xs text-muted-foreground">Signal Generation</p>
                <p className="text-[10px] text-muted-foreground/70 mt-1">Months 4-9</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary border border-border">
                <p className="text-3xl font-mono font-bold text-foreground mb-1">V4</p>
                <p className="text-xs text-muted-foreground">Grading Evolution</p>
                <p className="text-[10px] text-muted-foreground/70 mt-1">Month 18+</p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Closing quote */}
      <FadeIn delay={0.3}>
        <div className="text-center mb-12">
          <p className="text-lg md:text-xl font-serif text-foreground leading-relaxed max-w-2xl mx-auto italic">
            {"\"Sarah doesn't need another app. She needs the right information at the right moment, grounded in what she already knows works, with enough time to do something about it.\""}
          </p>
          <p className="text-sm text-muted-foreground mt-4 font-mono">
            That{"'"}s what Glean for Teachers is.
          </p>
        </div>
      </FadeIn>

      {/* Appendix links */}
      <FadeIn delay={0.4}>
        <div className="p-6 rounded-2xl bg-secondary border border-border">
          <h3 className="text-sm font-bold text-foreground font-sans mb-3">Appendix — Full Detail</h3>
          <p className="text-xs text-muted-foreground mb-4">For the thorough reader. Click any item below for deeper reasoning, tradeoffs, and specifications.</p>
          <div className="flex flex-wrap gap-2">
            <AppendixDialog
              title="Product Vision — North Star"
              content={[
                "North Star (12 months): Every teacher starts class knowing exactly where every student is confused. Every student knows exactly what to fix before the test.",
                "Learning Signal Graph: Inputs include LMS submissions, practice sessions, scanned quizzes, exit tickets. Output per signal: { concept, misconception_type, confidence_score, freshness_ts, session_quality_flag }",
                "Marcus's Personal Mastery View: Private to Marcus only — never shown to Sarah in individual form. Links to the specific step in Sarah's lesson plan where the gap lives.",
                "Teaching Command Bar (Cmd+J): Natural language queries like 'Who is struggling with completing the square in Period 3?' RAG-first: All responses grounded in curriculum index.",
              ]}
            />
            <AppendixDialog
              title="Student Experience Design"
              content={[
                "Why Marcus engages voluntarily: A specific, honest, private map of where he stands — before the test, not after. Privacy contract shown on first use in plain language.",
                "What Marcus sees vs. what Sarah sees: Sarah sees class-level patterns only. Marcus sees his own mastery map. District sees cross-classroom heatmaps. No individual student data at any level.",
                "Non-participation scenarios: If Marcus never uses the companion, V1 still works — signal comes from quiz capture. Low-effort sessions are excluded from Sarah's brief.",
                "The product's biggest blind spot: Treating Marcus as a data source rather than a user. If he doesn't engage voluntarily, V2 produces garbage signal.",
              ]}
            />
            <AppendixDialog
              title="Success Metrics"
              content={[
                "Tier 1 — Adoption: ≥70% of teachers open brief before 3+ classes/week",
                "Tier 2 — Engagement quality: Avg time in brief < 3 minutes. It's a brief, not a dashboard.",
                "Tier 3 — Behavior change: ≥50% of Monday classes reteach top flagged misconception. This is THE metric.",
                "Tier 4 — Time savings: ≥8 hrs/week grading time reclaimed per teacher",
                "Tier 5 — Signal accuracy: ≥75% precision on high-confidence tags, teacher-validated",
                "Tier 6 — Student outcomes: Effect size ≥0.3 SD on unit assessments vs. control group (semester 2 only)",
              ]}
            />
            <AppendixDialog
              title="Enterprise Go-to-Market"
              content={[
                "Glean's existing enterprise GTM motion is the right motion. District contracts, IT security review, FERPA BAA, pilot-to-expand.",
                "Land: 3-5 teachers in one school. Prove brief accuracy and time savings.",
                "Expand to department: 10-15 teachers. Show cross-classroom patterns. Win the Principal.",
                "Expand to district: District analytics unlock. CIO signs enterprise contract.",
                "Pricing: $500-800/teacher/year. 10-teacher pilot at $5k-8k. District-wide license $50k-150k.",
              ]}
            />
            <AppendixDialog
              title="Open Questions"
              content={[
                "What is Sarah's trust threshold for the brief? → Structured interviews with 5 pilot teachers after week 2.",
                "How do we frame the mastery view for Marcus without triggering anxiety? → A/B test three framings with 30 students.",
                "Actual OCR accuracy on real student handwriting? → Collect 200 real quizzes from pilot teacher.",
                "Does the classifier transfer across teachers? → Train on 3 teachers' data, test on a 4th.",
                "Who is the actual economic buyer? CIO? Curriculum Director? Principal? → 10 discovery calls in month 1.",
                "Union dimension? Algorithmic processing of teacher performance data may be a contract issue. → Legal review in month 1.",
              ]}
            />
          </div>
        </div>
      </FadeIn>

      {/* Footer */}
      <FadeIn delay={0.5}>
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Gaurav Mittal &middot; Director of PM, EY-Parthenon &middot; February 2026 &middot; Glean PM Interview Exercise
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}

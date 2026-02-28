"use client"

import Image from "next/image"
import { SectionWrapper, FadeIn } from "./section-wrapper"
import { AppendixDialog } from "./appendix-dialog"
import { Shield, Network, Lock, AlertTriangle } from "lucide-react"

const moats = [
  {
    icon: Shield,
    title: "Organizational Knowledge Layer",
    desc: "Nobody knows what the district knows — lesson plans, intervention guides, what worked last year. Glean already indexes this. That's not a feature Google can add.",
    gradient: "from-primary/10 to-transparent",
  },
  {
    icon: Network,
    title: "Cross-District Signal Network",
    desc: "After 400 classrooms across 12 districts, Glean knows which approaches resolve specific misconceptions fastest. That dataset cannot be purchased.",
    gradient: "from-accent/10 to-transparent",
  },
  {
    icon: Lock,
    title: "Institutional Trust as Switching Cost",
    desc: "The CIO who approved Glean. The teachers who rebuilt Monday routines around it. The switching cost is organizational memory, not technical.",
    gradient: "from-chart-4/10 to-transparent",
  },
]

const threats = [
  {
    name: "Microsoft Copilot for Education",
    level: "High",
    levelColor: "bg-destructive/10 text-destructive border-destructive/20",
    defense: "Own the cross-district data asset before they reach scale.",
  },
  {
    name: "Google Classroom",
    level: "Medium",
    levelColor: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    defense: "Deep student analytics creates FERPA exposure for their entire district portfolio.",
  },
  {
    name: "Canvas / Khan Academy",
    level: "Low",
    levelColor: "bg-accent/10 text-accent border-accent/20",
    defense: "Different product category. No district knowledge layer.",
  },
]

export function MoatSection() {
  return (
    <SectionWrapper id="moat" className="py-24 lg:py-32" fullHeight={false}>
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono text-primary font-bold tracking-wide">06</span>
          <div className="h-px flex-1 bg-border/30" />
          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em]">Why Glean Wins</span>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-14">
        <div>
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-10 text-balance leading-[1.08]">
              Google knows submissions. <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Glean knows what the district knows.</span>
            </h2>
          </FadeIn>

          <div className="space-y-3">
            {moats.map((moat, i) => {
              const Icon = moat.icon
              return (
                <FadeIn key={moat.title} delay={0.08 + i * 0.08}>
                  <div className={`p-5 rounded-xl bg-gradient-to-r ${moat.gradient} border border-border/20 group hover:border-primary/15 transition-all duration-300`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center flex-shrink-0 border border-border/30">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">{moat.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{moat.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>

        <div>
          {/* Knowledge graph visual */}
          <FadeIn delay={0.15}>
            <div className="relative h-56 lg:h-64 rounded-2xl overflow-hidden mb-6">
              <Image src="/images/data-network.jpg" alt="Knowledge graph visualization" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em] mb-1">The Moat</p>
                <p className="text-base font-serif text-foreground">Cross-district signal compounds over time</p>
              </div>
            </div>
          </FadeIn>

          {/* Threats */}
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-3.5 h-3.5 text-chart-4" />
              <h3 className="text-sm font-semibold text-foreground">Competitive Landscape</h3>
            </div>
          </FadeIn>

          <div className="space-y-2.5">
            {threats.map((threat, i) => (
              <FadeIn key={threat.name} delay={0.25 + i * 0.07}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/20">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${threat.levelColor}`}>
                    {threat.level}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-foreground">{threat.name}</h4>
                    <p className="text-[11px] text-muted-foreground/70">{threat.defense}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-2 mt-6">
              <AppendixDialog
                title="Data Architecture & Privacy"
                content={[
                  "Signal sources (V1): Mobile quiz capture (Photo to OCR to structured extraction), LMS connector (Canvas/Google Classroom API), Curriculum index (teacher uploads to RAG store).",
                  "NOT stored: Raw student dialogue (discarded after classification), Individual student PII (anonymized IDs only), Video/audio, Behavioral metadata beyond task completion.",
                  "FERPA: All student data classified as educational records. Role-based access controls enforced. Data minimization: Only collect what's needed.",
                  "Retention: Signals expire after 90 days unless refreshed. Student privacy contract: Three sentences on first use.",
                ]}
              />
              <AppendixDialog
                title="Key Tradeoffs"
                content={[
                  "Precision over recall: Miss signals rather than flag wrong ones. A false positive destroys teacher trust permanently.",
                  "Privacy over signal richness: Structured tags only, not raw dialogue. A privacy violation ends the district relationship.",
                  "Teacher control over AI autonomy: AI never contradicts Sarah's methodology. RAG-first, grounded in her curriculum.",
                  "Depth over breadth: Algebra 2 only in MVP. One subject creates a clean hypothesis test.",
                  "Teacher value first, student value V2: Marcus gets no mastery view until classifier accuracy validated.",
                ]}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  )
}

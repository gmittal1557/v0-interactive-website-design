"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { SectionWrapper, FadeIn } from "./section-wrapper"
import { AppendixDialog } from "./appendix-dialog"
import { Shield, Network, Lock, AlertTriangle } from "lucide-react"

const moats = [
  {
    icon: Shield,
    title: "Organizational Knowledge Layer",
    desc: "Nobody knows what the district knows — lesson plans, intervention guides, what worked last year. Glean already indexes this. That's not a feature Google can add.",
  },
  {
    icon: Network,
    title: "Cross-District Signal Network",
    desc: "After 400 classrooms across 12 districts, Glean knows which approaches resolve specific misconceptions fastest. That dataset cannot be purchased.",
  },
  {
    icon: Lock,
    title: "Institutional Trust as Switching Cost",
    desc: "The CIO who approved Glean. The teachers who rebuilt Monday routines around it. Switching cost is organizational memory and trust, not technical.",
  },
]

const threats = [
  {
    name: "Microsoft Copilot for Education",
    level: "High",
    color: "bg-destructive/20 text-destructive",
    defense: "Own the cross-district data asset before they reach scale.",
  },
  {
    name: "Google Classroom",
    level: "Medium",
    color: "bg-warm/20 text-warm",
    defense: "Deep student analytics creates FERPA exposure threatening their entire district portfolio.",
  },
  {
    name: "Canvas / Khan Academy",
    level: "Low",
    color: "bg-primary/20 text-primary",
    defense: "Different product category. No district knowledge layer.",
  },
]

export function MoatSection() {
  return (
    <SectionWrapper id="moat" className="py-24" fullHeight={false}>
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <span className="text-xs font-mono text-primary">06</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Why Glean Wins</span>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
              Google knows submissions. Glean knows{" "}
              <span className="text-primary">what the district knows</span>.
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {moats.map((moat, i) => {
              const Icon = moat.icon
              return (
                <FadeIn key={moat.title} delay={0.1 + i * 0.1}>
                  <div className="p-5 rounded-xl bg-card border border-border group hover:border-primary/20 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground font-sans mb-1">{moat.title}</h4>
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
          <FadeIn delay={0.2}>
            <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
              <Image
                src="/images/data-network.jpg"
                alt="Knowledge graph visualization"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </FadeIn>

          {/* Threats */}
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-warm" />
              <h3 className="text-sm font-bold text-foreground font-sans">Biggest Threats</h3>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {threats.map((threat, i) => (
              <FadeIn key={threat.name} delay={0.35 + i * 0.1}>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                  <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-md ${threat.color}`}>
                    {threat.level}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-foreground font-sans">{threat.name}</h4>
                    <p className="text-[11px] text-muted-foreground">{threat.defense}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="flex gap-2 mt-6">
              <AppendixDialog
                title="Data Architecture & Privacy"
                content={[
                  "Signal sources (V1): Mobile quiz capture (Photo → OCR → structured extraction → misconception classification), LMS connector (Canvas/Google Classroom API), Curriculum index (teacher uploads → RAG store).",
                  "What is explicitly NOT stored: Raw student dialogue — discarded after classification. Individual student PII in the signal graph — anonymized IDs only. Video or audio of students. Behavioral metadata beyond task completion.",
                  "FERPA: All student data classified as educational records. Role-based access controls enforced at every layer. Data minimization: Only collect what's needed.",
                  "Retention: Signals expire after 90 days unless refreshed by new data. Student privacy contract: Three sentences on first use.",
                ]}
              />
              <AppendixDialog
                title="Key Tradeoffs"
                content={[
                  "Precision over recall: We will miss signals rather than flag wrong ones. A false positive destroys teacher trust permanently.",
                  "Privacy over signal richness: Structured tags only — not raw dialogue. A privacy violation ends the district relationship.",
                  "Teacher control over AI autonomy: AI never contradicts Sarah's methodology. RAG-first means all outputs grounded in her curriculum.",
                  "Depth over breadth in MVP: Algebra 2 only. One subject creates a clean hypothesis test.",
                  "Teacher value first, student value V2: Marcus gets no mastery view until classifier accuracy is validated.",
                ]}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  )
}

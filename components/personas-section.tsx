"use client"

import Image from "next/image"
import { SectionWrapper } from "./section-wrapper"
import { FadeIn } from "./section-wrapper"

export function PersonasSection() {
  return (
    <SectionWrapper id="personas" className="py-24">
      <FadeIn>
        <div className="flex items-center gap-3 mb-12">
          <span className="text-xs font-mono text-primary">01</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">The Two Humans</span>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Sarah */}
        <FadeIn delay={0.1}>
          <div className="group relative rounded-2xl overflow-hidden bg-card border border-border">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/hero-teacher.jpg"
                alt="Sarah Chen, 11th Grade Math Teacher"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-serif font-bold text-foreground">Sarah Chen</h3>
                </div>
                <p className="text-sm text-primary font-mono mt-1">
                  11th Grade Math &middot; 142 students &middot; 5 classes
                </p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-lg text-foreground font-serif italic leading-relaxed mb-4">
                {"\"Hired to coach. Forced to process.\""}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every Sunday night: 28 quizzes. 12-15 hours. She discovers what went wrong
                — three weeks after it started compounding into the next unit. She became a
                teacher to catch Marcus before the exam. The system only lets her catch him after.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Marcus */}
        <FadeIn delay={0.2}>
          <div className="group relative rounded-2xl overflow-hidden bg-card border border-border">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/student-studying.jpg"
                alt="Marcus, 11th Grade Student"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-serif font-bold text-foreground">Marcus</h3>
                </div>
                <p className="text-sm text-primary font-mono mt-1">
                  11th Grade &middot; Algebra 2 &middot; Studies hard
                </p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-lg text-foreground font-serif italic leading-relaxed mb-4">
                {"\"Not failing. Not disengaged. Still underperforming.\""}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A small, fixable misunderstanding about sign inversion that nobody has ever
                specifically identified. His grade says 68. It doesn{"'"}t say why. A private tutor
                solves this at $150/hr. Glean is that tutor — for every student, regardless of zip code.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Quote callout */}
      <FadeIn delay={0.3}>
        <div className="mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/10 text-center">
          <p className="text-lg md:text-xl font-serif text-foreground leading-relaxed max-w-3xl mx-auto">
            A private tutor works because they watch one student, not a class of 30.
            That{"'"}s why it costs <span className="text-primary font-bold">$150/hr</span>.
            Glean is that private tutor — for every Marcus, in every school.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}

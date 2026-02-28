"use client"

import Image from "next/image"
import { SectionWrapper, FadeIn } from "./section-wrapper"

export function PersonasSection() {
  return (
    <SectionWrapper id="personas" className="py-28">
      <FadeIn>
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono text-primary font-semibold tracking-wide">01</span>
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-widest">The Two Humans</span>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {/* Sarah */}
        <FadeIn delay={0.1}>
          <div className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/20 transition-colors duration-500">
            <div className="relative h-56 overflow-hidden">
              <Image
                src="/images/hero-teacher.jpg"
                alt="Sarah Chen, 11th Grade Math Teacher"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <h3 className="text-xl font-serif text-foreground">Sarah Chen</h3>
                <p className="text-[11px] text-primary font-mono mt-0.5">
                  11th Grade Math &middot; 142 students &middot; 5 classes
                </p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-base text-foreground/90 font-serif italic leading-relaxed mb-3">
                {"\"Hired to coach. Forced to process.\""}
              </p>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Every Sunday night: 28 quizzes. 12-15 hours. She discovers what went wrong
                three weeks after it started compounding. She became a teacher to catch Marcus
                before the exam. The system only lets her catch him after.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Marcus */}
        <FadeIn delay={0.2}>
          <div className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/20 transition-colors duration-500">
            <div className="relative h-56 overflow-hidden">
              <Image
                src="/images/student-studying.jpg"
                alt="Marcus, 11th Grade Student"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <h3 className="text-xl font-serif text-foreground">Marcus</h3>
                <p className="text-[11px] text-primary font-mono mt-0.5">
                  11th Grade &middot; Algebra 2 &middot; Studies hard, still underperforms
                </p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-base text-foreground/90 font-serif italic leading-relaxed mb-3">
                {"\"Not failing. Not disengaged. Still underperforming.\""}
              </p>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                A small, fixable misunderstanding about sign inversion that nobody has ever
                specifically identified. His grade says 68. It doesn{"'"}t say why. A private tutor
                solves this at $150/hr. Glean is that tutor — for every student, regardless of zip code.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.3}>
        <div className="mt-10 p-6 rounded-xl bg-primary/[0.04] border border-primary/10">
          <p className="text-sm md:text-base text-foreground/80 text-center leading-relaxed max-w-3xl mx-auto">
            A private tutor works because they watch <span className="text-foreground font-medium">one student</span>, not a class of 30.
            That{"'"}s why it costs <span className="text-primary font-mono font-semibold">$150/hr</span>.
            Glean is that private tutor — for every Marcus, in every school.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}

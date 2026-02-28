"use client"

import Image from "next/image"
import { SectionWrapper, FadeIn } from "./section-wrapper"
import { AudioSnippet } from "./audio-snippet"

export function PersonasSection() {
  return (
    <SectionWrapper id="personas" className="py-24 lg:py-32">
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono text-primary font-bold tracking-wide">01</span>
          <div className="h-px flex-1 bg-border/30" />
          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em]">The Two Humans</span>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground mb-16 text-balance leading-[1.08]">
          Every product is a story about <span className="text-primary">two people</span>.
        </h2>
      </FadeIn>

      {/* Sarah - full width cinematic card */}
      <FadeIn delay={0.1}>
        <div className="group relative rounded-2xl overflow-hidden mb-4 bg-card border border-border/30">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-72 lg:h-auto lg:min-h-[360px] overflow-hidden">
              <Image
                src="/images/hero-teacher.jpg"
                alt="Sarah Chen, 11th Grade Math Teacher"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent lg:hidden" />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-3">11th Grade Math &middot; 142 Students &middot; 5 Classes</p>
              <h3 className="text-2xl lg:text-3xl font-serif text-foreground mb-2">Sarah Chen</h3>
              <p className="text-lg font-serif text-foreground/70 italic mb-6">{"\"Hired to coach. Forced to process.\""}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Every Sunday night: 28 quizzes. 12-15 hours. She discovers what went wrong three weeks after it started compounding. She became a teacher to catch Marcus before the exam. The system only lets her catch him after.
              </p>
              <AudioSnippet
                label="Sarah on Sunday Grading"
                description="'I became a teacher to coach, not to process paperwork...'"
                duration="1:24"
              />
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Marcus */}
      <FadeIn delay={0.2}>
        <div className="group relative rounded-2xl overflow-hidden mb-8 bg-card border border-border/30">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
              <p className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] mb-3">11th Grade &middot; Algebra 2 &middot; Studies Hard</p>
              <h3 className="text-2xl lg:text-3xl font-serif text-foreground mb-2">Marcus</h3>
              <p className="text-lg font-serif text-foreground/70 italic mb-6">{"\"Not failing. Not disengaged. Still underperforming.\""}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                A small, fixable misunderstanding about sign inversion that nobody has ever specifically identified. His grade says 68. It doesn{"'"}t say why. Nobody has time to find out — Sarah has 141 other students.
              </p>
              <AudioSnippet
                label="Marcus on Getting Unstuck"
                description="'It asked me the right question — I figured it out myself...'"
                duration="1:08"
              />
            </div>
            <div className="relative h-72 lg:h-auto lg:min-h-[360px] overflow-hidden order-1 lg:order-2">
              <Image
                src="/images/student-studying.jpg"
                alt="Marcus, 11th Grade Student"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card/80 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </FadeIn>

      {/* The bridge */}
      <FadeIn delay={0.3}>
        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-primary/[0.06] to-accent/[0.06] border border-primary/10 text-center">
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
            A private tutor works because they watch <span className="text-foreground font-semibold">one student</span>, not a class of 30.
            That{"'"}s why it costs <span className="text-primary font-mono font-bold">$150/hr</span>.
          </p>
          <p className="text-sm text-primary mt-3 font-medium">
            Glean is that private tutor — for every Marcus, in every school, regardless of zip code.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}

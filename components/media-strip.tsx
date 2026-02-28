"use client"

import { FadeIn } from "./section-wrapper"
import { VideoEmbed } from "./video-embed"
import { AudioSnippet } from "./audio-snippet"

export function MediaStrip() {
  return (
    <section className="relative w-full px-6 py-20 md:px-12 lg:px-20 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Experience the Cycle</span>
            <div className="h-px flex-1 bg-border/20" />
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="grid md:grid-cols-2 gap-5">
            <VideoEmbed
              thumbnailSrc="/images/classroom-bright.jpg"
              title="How Glean Transforms Monday Morning"
              description="A 2-minute walkthrough of the Sunday capture to Monday brief cycle."
            />
            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-xl bg-card border border-border/30 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-[10px] font-mono text-accent/70 uppercase tracking-widest">Audio Commentary</span>
                </div>
                <div className="space-y-3">
                  <AudioSnippet
                    label="Sarah on Sunday Grading"
                    description="'I became a teacher to coach, not to process paperwork...'"
                    duration="1:24"
                  />
                  <AudioSnippet
                    label="The Monday Brief Experience"
                    description="'90 seconds. I walk in knowing exactly who needs what...'"
                    duration="0:52"
                  />
                  <AudioSnippet
                    label="Marcus on Getting Unstuck"
                    description="'It asked me the right question — I figured it out myself...'"
                    duration="1:08"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

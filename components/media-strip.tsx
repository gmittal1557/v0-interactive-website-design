"use client"

import { FadeIn } from "./section-wrapper"
import { VideoEmbed } from "./video-embed"
import { AudioSnippet } from "./audio-snippet"

export function MediaStrip() {
  return (
    <section className="relative w-full px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            <VideoEmbed
              thumbnailSrc="/images/classroom-bright.jpg"
              title="How Glean Transforms Monday Morning"
              description="A 2-minute walkthrough of the Sunday capture to Monday brief cycle."
            />
            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-xl bg-card border border-border/50 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[10px] font-mono text-primary/70 uppercase tracking-widest">Audio Commentary</span>
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

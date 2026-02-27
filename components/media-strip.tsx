"use client"

import { FadeIn } from "./section-wrapper"
import { VideoEmbed } from "./video-embed"
import { AudioSnippet } from "./audio-snippet"

export function MediaStrip() {
  return (
    <section className="relative w-full px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Video embed */}
            <VideoEmbed
              thumbnailSrc="/images/classroom-bright.jpg"
              title="How Glean Transforms Monday Morning"
              description="A 2-minute walkthrough of the Sunday capture → Monday brief cycle showing how signal flows from quiz to instruction."
            />

            {/* Audio clips */}
            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">Audio Commentary</span>
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

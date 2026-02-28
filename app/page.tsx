import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PersonasSection } from "@/components/personas-section"
import { ProblemSection } from "@/components/problem-section"
import { ValueSection } from "@/components/value-section"
import { CycleSection } from "@/components/cycle-section"
import { MvpSection } from "@/components/mvp-section"
import { MoatSection } from "@/components/moat-section"
import { BetSection } from "@/components/bet-section"
import { MediaStrip } from "@/components/media-strip"

export default function Page() {
  return (
    <main className="relative bg-background min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <PersonasSection />
      <ProblemSection />
      <ValueSection />
      <CycleSection />
      <MediaStrip />
      <MvpSection />
      <MoatSection />
      <BetSection />
    </main>
  )
}

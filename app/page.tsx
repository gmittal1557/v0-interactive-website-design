import { Navigation } from "@/components/navigation"
import { ExecSummary } from "@/components/exec-summary"
import { PersonasSection } from "@/components/personas-section"
import { NorthStarSection } from "@/components/north-star-section"
import { WhyGleanSection } from "@/components/why-glean-section"
import { CycleSection } from "@/components/cycle-section"
import { MvpSection } from "@/components/mvp-section"
import { MoatSection } from "@/components/moat-section"
import { BetSection } from "@/components/bet-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ExecSummary />
      <PersonasSection />
      <NorthStarSection />
      <WhyGleanSection />
      <CycleSection />
      <MvpSection />
      <MoatSection />
      <BetSection />
    </main>
  )
}

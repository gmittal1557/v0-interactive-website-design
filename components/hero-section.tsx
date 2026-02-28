"use client"

import { motion } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"

export function HeroSection() {
  const scrollToNext = () => {
    document.getElementById("personas")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.20_0.03_255)_0%,oklch(0.12_0.01_250)_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs font-mono text-primary/90 tracking-wide">PRD &middot; Glean for Education</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif text-foreground leading-[1.05] tracking-tight mb-8 text-balance"
        >
          Learning Intelligence
          <br />
          <span className="text-primary">for Teachers</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-6"
        >
          Turn everyday student work into targeted instruction and private,
          personalized guidance — grounded in district curriculum and safe by design.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.95 }}
          className="text-xs text-muted-foreground/50 font-mono mb-14"
        >
          Gaurav Mittal &middot; Director of PM, EY-Parthenon &middot; Glean FDPM Interview Exercise
        </motion.p>

        {/* Key stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 sm:divide-x divide-border mb-16"
        >
          {[
            { value: "3.7M", label: "teachers affected weekly" },
            { value: "12-15 hrs", label: "grading per week" },
            { value: "3 weeks", label: "avg. discovery lag" },
            { value: "$150/hr", label: "private tutoring cost" },
          ].map((stat, i) => (
            <div key={stat.label} className="px-6 py-2 text-center">
              <p className="text-xl md:text-2xl font-mono font-bold text-foreground">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Reading guide */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
        >
          <ArrowRight className="w-4 h-4 text-primary" />
          <p className="text-xs text-muted-foreground">
            <span className="text-foreground font-medium">Main body (Sections 1-7)</span> tells the complete story in 5 minutes.
            Appendix detail available via click-through dialogs.
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  )
}

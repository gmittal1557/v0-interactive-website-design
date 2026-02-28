"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToNext = () => {
    document.getElementById("personas")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/classroom-bright.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.07]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        {/* Glowing orb */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/20 blur-[180px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.07, 0.04] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/20 blur-[140px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Glean badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.06] mb-10"
        >
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="7" className="fill-primary" />
            <path d="M10 16.5C10 13.5 12.5 11 16 11C18 11 19.5 11.8 20.5 13L18.5 14.5C18 13.8 17.1 13.3 16 13.3C13.9 13.3 12.5 14.7 12.5 16.5C12.5 18.3 13.9 19.7 16 19.7C17.5 19.7 18.5 19 19 18.2V17.5H16V15.5H21.5V19C20.5 20.8 18.5 22 16 22C12.5 22 10 19.5 10 16.5Z" className="fill-primary-foreground" />
          </svg>
          <span className="text-xs font-mono text-primary/90 tracking-wide">Product Requirement Document</span>
        </motion.div>

        {/* Main title - Electric Grid style large serif */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.02] tracking-tight mb-6 text-balance"
        >
          Learning Intelligence
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">for Teachers</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-5"
        >
          Turn everyday student work into targeted instruction and private,
          personalized guidance — grounded in district curriculum and safe by design.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-[11px] text-muted-foreground/40 font-mono mb-16"
        >
          Gaurav Mittal &middot; Director of PM, EY-Parthenon &middot; Glean FDPM Interview
        </motion.p>

        {/* Key stats - like the Electric Grid stat banners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30 rounded-2xl overflow-hidden mb-14"
        >
          {[
            { value: "3.7M", label: "teachers affected" },
            { value: "12-15 hrs", label: "weekly grading" },
            { value: "3 week", label: "discovery lag" },
            { value: "$150/hr", label: "tutoring cost" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card/60 backdrop-blur-sm px-5 py-5 text-center">
              <p className="text-xl md:text-2xl font-mono font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint - matching Electric Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-[10px] font-mono text-muted-foreground/40 tracking-[0.2em] uppercase"
        >
          Scroll or use navigation to explore
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
        aria-label="Scroll to explore"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  )
}

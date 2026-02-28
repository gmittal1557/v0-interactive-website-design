"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronDown, Menu } from "lucide-react"

const sections = [
  { id: "hero", label: "Intro", num: "" },
  { id: "personas", label: "The Two Humans", num: "01" },
  { id: "problem", label: "The Problem", num: "02" },
  { id: "value", label: "Two Value Propositions", num: "03" },
  { id: "cycle", label: "24-Hour Cycle", num: "04" },
  { id: "mvp", label: "The MVP", num: "05" },
  { id: "moat", label: "Why Glean Wins", num: "06" },
  { id: "bet", label: "The Bet", num: "07" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0)

      const sectionElements = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id),
      }))

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i].el
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 3) {
            setActiveSection(sectionElements[i].id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const currentSection = sections.find(s => s.id === activeSection)
  const currentIndex = sections.findIndex(s => s.id === activeSection)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={cn(
          "fixed top-[2px] left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Glean logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 group"
          >
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
              <rect width="32" height="32" rx="8" className="fill-primary" />
              <path d="M10 16.5C10 13.5 12.5 11 16 11C18 11 19.5 11.8 20.5 13L18.5 14.5C18 13.8 17.1 13.3 16 13.3C13.9 13.3 12.5 14.7 12.5 16.5C12.5 18.3 13.9 19.7 16 19.7C17.5 19.7 18.5 19 19 18.2V17.5H16V15.5H21.5V19C20.5 20.8 18.5 22 16 22C12.5 22 10 19.5 10 16.5Z" className="fill-primary-foreground" />
            </svg>
            <span className={cn(
              "text-sm font-semibold transition-colors",
              scrolled ? "text-foreground" : "text-foreground/80"
            )}>
              Glean for Teachers
            </span>
          </button>

          {/* Section dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-full border transition-all",
                scrolled
                  ? "bg-secondary/80 border-border/50 backdrop-blur-sm"
                  : "bg-foreground/5 border-foreground/10 backdrop-blur-sm"
              )}
            >
              {currentSection?.num && (
                <span className="text-[11px] font-mono text-primary font-semibold">
                  {currentSection.num}
                </span>
              )}
              <span className="text-sm text-foreground">{currentSection?.label}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-card/95 border border-border/50 shadow-2xl shadow-black/40 overflow-hidden backdrop-blur-xl z-50"
                  >
                    {sections.map((section, i) => (
                      <button
                        key={section.id}
                        onClick={() => scrollTo(section.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                          activeSection === section.id
                            ? "bg-primary/10 text-foreground"
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        )}
                      >
                        <span className="text-[10px] font-mono text-primary w-5 text-right">
                          {section.num || "--"}
                        </span>
                        <span className="text-sm">{section.label}</span>
                        {activeSection === section.id && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="hidden lg:flex items-center gap-1.5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="group relative p-0.5"
                aria-label={`Go to ${section.label}`}
              >
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  activeSection === section.id
                    ? "bg-primary scale-150"
                    : "bg-muted-foreground/20 group-hover:bg-muted-foreground/50"
                )} />
              </button>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  )
}

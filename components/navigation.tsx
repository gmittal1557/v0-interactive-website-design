"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const sections = [
  { id: "hero", label: "Intro" },
  { id: "personas", label: "The Humans" },
  { id: "problem", label: "The Problem" },
  { id: "value", label: "The Solution" },
  { id: "cycle", label: "24-Hour Cycle" },
  { id: "mvp", label: "The MVP" },
  { id: "moat", label: "Why Glean Wins" },
  { id: "bet", label: "The Bet" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

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

  const currentLabel = sections.find(s => s.id === activeSection)?.label || "Intro"
  const currentIndex = sections.findIndex(s => s.id === activeSection) + 1

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm font-sans">G</span>
          </div>
          <span className="text-foreground font-semibold text-sm font-sans hidden sm:block">
            Glean for Teachers
          </span>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border hover:bg-secondary transition-colors"
          >
            <span className="text-xs font-mono text-primary">
              {String(currentIndex).padStart(2, "0")}
            </span>
            <span className="text-sm text-foreground font-sans">{currentLabel}</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-card border border-border shadow-xl overflow-hidden"
              >
                {sections.map((section, i) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary/50 transition-colors",
                      activeSection === section.id && "bg-secondary"
                    )}
                  >
                    <span className="text-xs font-mono text-primary w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={cn(
                      "text-sm font-sans",
                      activeSection === section.id ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {section.label}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="group relative p-1"
              aria-label={`Go to ${section.label}`}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeSection === section.id
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                )}
              />
              <span className="sr-only">{`Section ${i + 1}: ${section.label}`}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

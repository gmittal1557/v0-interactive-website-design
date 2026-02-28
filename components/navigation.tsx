"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const sections = [
  { id: "exec-summary", label: "Exec Summary", num: "01" },
  { id: "personas", label: "Personas", num: "02" },
  { id: "north-star", label: "North Star", num: "03" },
  { id: "why-glean", label: "Why Glean", num: "04" },
  { id: "cycle", label: "Product Cycle", num: "05" },
  { id: "mvp", label: "The MVP", num: "06" },
  { id: "tradeoffs", label: "Tradeoffs", num: "07" },
  { id: "bet", label: "The Bet", num: "08" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("exec-summary")
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <>
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
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          "fixed top-[2px] left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-card/90 backdrop-blur-xl border-b border-border/60 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-2.5">
          <button
            onClick={() => scrollTo("exec-summary")}
            className="flex items-center gap-2.5 group"
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
              <rect width="32" height="32" rx="7" className="fill-primary" />
              <path d="M10 16.5C10 13.5 12.5 11 16 11C18 11 19.5 11.8 20.5 13L18.5 14.5C18 13.8 17.1 13.3 16 13.3C13.9 13.3 12.5 14.7 12.5 16.5C12.5 18.3 13.9 19.7 16 19.7C17.5 19.7 18.5 19 19 18.2V17.5H16V15.5H21.5V19C20.5 20.8 18.5 22 16 22C12.5 22 10 19.5 10 16.5Z" className="fill-primary-foreground" />
            </svg>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground leading-none">Glean</span>
              <span className="text-[9px] text-muted-foreground leading-none mt-0.5 tracking-wide">for Teachers</span>
            </div>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300",
                scrolled
                  ? "bg-secondary/60 border-border/50"
                  : "bg-foreground/[0.04] border-foreground/[0.08]"
              )}
            >
              <span className="text-[10px] font-mono text-primary font-bold">{currentSection?.num}</span>
              <span className="text-[13px] text-foreground font-medium">{currentSection?.label}</span>
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
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 rounded-xl bg-card border border-border shadow-xl shadow-foreground/5 overflow-hidden z-50"
                  >
                    <div className="p-1.5">
                      {sections.map((section) => {
                        const isActive = activeSection === section.id
                        return (
                          <button
                            key={section.id}
                            onClick={() => scrollTo(section.id)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150",
                              isActive ? "bg-primary/8" : "hover:bg-secondary"
                            )}
                          >
                            <span className={cn(
                              "text-[10px] font-mono w-5 text-right flex-shrink-0",
                              isActive ? "text-primary font-bold" : "text-muted-foreground/60"
                            )}>
                              {section.num}
                            </span>
                            <span className={cn(
                              "text-[13px]",
                              isActive ? "text-foreground font-medium" : "text-muted-foreground"
                            )}>
                              {section.label}
                            </span>
                            {isActive && (
                              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="group p-0.5"
                aria-label={`Go to ${section.label}`}
              >
                <div className={cn(
                  "rounded-full transition-all duration-300",
                  activeSection === section.id
                    ? "w-5 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-foreground/10 group-hover:bg-foreground/25"
                )} />
              </button>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  )
}

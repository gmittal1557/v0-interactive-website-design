"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2 } from "lucide-react"

interface AudioSnippetProps {
  label: string
  description: string
  duration: string
}

export function AudioSnippet({ label, description, duration }: AudioSnippetProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      setProgress(0)
    } else {
      setIsPlaying(true)
      // Simulate audio playback with a progress animation
      let p = 0
      const interval = setInterval(() => {
        p += 1
        setProgress(p)
        if (p >= 100) {
          clearInterval(interval)
          setIsPlaying(false)
          setProgress(0)
        }
      }, 80)
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors">
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 hover:bg-primary/20 transition-colors"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-primary" />
        ) : (
          <Play className="w-4 h-4 text-primary ml-0.5" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Volume2 className="w-3 h-3 text-primary flex-shrink-0" />
          <span className="text-xs font-bold text-foreground font-sans truncate">{label}</span>
          <span className="text-[10px] text-muted-foreground font-mono flex-shrink-0">{duration}</span>
        </div>
        <p className="text-[11px] text-muted-foreground truncate">{description}</p>
        <div className="mt-2 h-1 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.08 }}
          />
        </div>
      </div>
    </div>
  )
}

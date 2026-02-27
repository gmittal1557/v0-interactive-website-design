"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Film } from "lucide-react"
import Image from "next/image"

interface VideoEmbedProps {
  thumbnailSrc: string
  title: string
  description: string
}

export function VideoEmbed({ thumbnailSrc, title, description }: VideoEmbedProps) {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border">
      {!showVideo ? (
        <div className="relative group cursor-pointer" onClick={() => setShowVideo(true)}>
          <div className="relative h-56 md:h-72 overflow-hidden">
            <Image
              src={thumbnailSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/40 group-hover:bg-background/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/20"
              >
                <Play className="w-7 h-7 text-primary-foreground ml-1" />
              </motion.div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Film className="w-3 h-3 text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">Watch Explainer</span>
                </div>
                <p className="text-sm font-serif text-foreground font-bold">{title}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-56 md:h-72 bg-background flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Film className="w-7 h-7 text-primary" />
            </div>
            <p className="text-sm text-foreground font-serif font-bold mb-2">{title}</p>
            <p className="text-xs text-muted-foreground mb-4">{description}</p>
            <button
              onClick={() => setShowVideo(false)}
              className="text-xs text-primary font-mono hover:underline"
            >
              Close preview
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

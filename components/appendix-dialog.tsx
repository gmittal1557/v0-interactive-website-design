"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Info } from "lucide-react"

interface AppendixDialogProps {
  title: string
  content: string[]
  triggerLabel?: string
}

export function AppendixDialog({ title, content, triggerLabel }: AppendixDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
          <Info className="w-3 h-3" />
          {triggerLabel || title}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-card border-border max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-serif text-foreground">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {content.map((paragraph, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-xs font-mono text-primary mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

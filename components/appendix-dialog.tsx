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
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border/30 text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-primary/[0.04] transition-all duration-200">
          <Info className="w-3 h-3 text-primary/60" />
          {triggerLabel || title}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-card border-border/30 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[9px] font-mono text-primary/60 uppercase tracking-[0.2em]">Appendix</span>
          </div>
          <DialogTitle className="text-lg font-serif text-foreground">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {content.map((paragraph, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-[10px] font-mono text-primary/40 mt-1 flex-shrink-0 w-5 text-right">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

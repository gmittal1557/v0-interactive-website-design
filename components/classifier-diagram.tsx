"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
)

const CLASSIFIER_ELEMENTS: any[] = [
  // === TITLE ===
  { type: "text", id: "title", x: 155, y: 15, text: "Free-Response Classification", fontSize: 28, strokeColor: "#1e1e1e", fontFamily: 1 },
  { type: "text", id: "sub", x: 140, y: 52, text: "How Glean classifies misconceptions without answer choices", fontSize: 16, strokeColor: "#757575", fontFamily: 1 },

  // === MARCUS INPUT ===
  { type: "rectangle", id: "inputBox", x: 30, y: 105, width: 280, height: 160, backgroundColor: "#a5d8ff", fillStyle: "solid", roundness: { type: 3 }, strokeColor: "#4a9eed", strokeWidth: 1 },
  { type: "text", id: "inIcon", x: 45, y: 115, text: "MARCUS TYPES IN CANVAS", fontSize: 12, strokeColor: "#2563eb", fontFamily: 1 },
  { type: "text", id: "inQ", x: 45, y: 142, text: "Solve:  x² + 6x + 9 = 0", fontSize: 18, strokeColor: "#1e1e1e", fontFamily: 1 },
  { type: "text", id: "in1", x: 45, y: 175, text: "(x+3)(x+3) = 0", fontSize: 16, strokeColor: "#555555", fontFamily: 1 },
  { type: "text", id: "in2", x: 45, y: 198, text: "x + 3 = 0", fontSize: 16, strokeColor: "#555555", fontFamily: 1 },
  { type: "text", id: "in3", x: 45, y: 224, text: "x = 3", fontSize: 20, strokeColor: "#ef4444", fontFamily: 1 },

  // === REFERENCE SOLUTION ===
  { type: "rectangle", id: "refBox", x: 30, y: 300, width: 280, height: 140, backgroundColor: "#b2f2bb", fillStyle: "solid", roundness: { type: 3 }, strokeColor: "#22c55e", strokeWidth: 1 },
  { type: "text", id: "refIcon", x: 45, y: 310, text: "REFERENCE SOLUTION", fontSize: 12, strokeColor: "#15803d", fontFamily: 1 },
  { type: "text", id: "ref1", x: 45, y: 338, text: "(x+3)(x+3) = 0", fontSize: 16, strokeColor: "#555555", fontFamily: 1 },
  { type: "text", id: "ref2", x: 45, y: 361, text: "x + 3 = 0", fontSize: 16, strokeColor: "#555555", fontFamily: 1 },
  { type: "text", id: "ref3", x: 45, y: 387, text: "x = -3", fontSize: 20, strokeColor: "#15803d", fontFamily: 1 },

  // === STAGE 1: EXTRACT ===
  { type: "rectangle", id: "stage1", x: 390, y: 115, width: 180, height: 55, backgroundColor: "#d0bfff", fillStyle: "solid", roundness: { type: 3 }, strokeColor: "#8b5cf6", strokeWidth: 2 },
  { type: "text", id: "s1label", x: 430, y: 130, text: "1. EXTRACT", fontSize: 18, strokeColor: "#1e1e1e", fontFamily: 1 },
  { type: "text", id: "s1desc", x: 395, y: 178, text: "LLM parses typed work\ninto structured steps", fontSize: 14, strokeColor: "#757575", fontFamily: 1 },
  { type: "arrow", id: "a1", x: 315, y: 170, width: 70, height: 0, points: [[0, 0], [70, 0]], strokeColor: "#8b5cf6", strokeWidth: 2, endArrowhead: "arrow" },
  { type: "arrow", id: "a2", x: 480, y: 175, width: 0, height: 55, points: [[0, 0], [0, 55]], strokeColor: "#757575", strokeWidth: 2, endArrowhead: "arrow" },

  // === STAGE 2: COMPARE ===
  { type: "rectangle", id: "stage2", x: 390, y: 235, width: 180, height: 55, backgroundColor: "#d0bfff", fillStyle: "solid", roundness: { type: 3 }, strokeColor: "#8b5cf6", strokeWidth: 2 },
  { type: "text", id: "s2label", x: 425, y: 250, text: "2. COMPARE", fontSize: 18, strokeColor: "#1e1e1e", fontFamily: 1 },
  { type: "text", id: "s2desc", x: 395, y: 298, text: "Align student steps vs.\nreference, find divergence", fontSize: 14, strokeColor: "#757575", fontFamily: 1 },
  { type: "arrow", id: "a2b", x: 315, y: 370, width: 68, height: -90, points: [[0, 0], [68, -90]], strokeColor: "#22c55e", strokeWidth: 1, strokeStyle: "dashed", endArrowhead: "arrow" },
  { type: "arrow", id: "a3", x: 480, y: 295, width: 0, height: 50, points: [[0, 0], [0, 50]], strokeColor: "#757575", strokeWidth: 2, endArrowhead: "arrow" },

  // === DIVERGENCE ===
  { type: "rectangle", id: "divergeBox", x: 390, y: 350, width: 180, height: 45, backgroundColor: "#ffc9c9", fillStyle: "solid", roundness: { type: 3 }, strokeColor: "#ef4444", strokeWidth: 1 },
  { type: "text", id: "divLabel", x: 410, y: 362, text: "Step 3: +3 not -3", fontSize: 15, strokeColor: "#1e1e1e", fontFamily: 1 },
  { type: "arrow", id: "a4", x: 480, y: 400, width: 0, height: 40, points: [[0, 0], [0, 40]], strokeColor: "#757575", strokeWidth: 2, endArrowhead: "arrow" },

  // === STAGE 3: CLASSIFY ===
  { type: "rectangle", id: "stage3", x: 390, y: 445, width: 180, height: 55, backgroundColor: "#d0bfff", fillStyle: "solid", roundness: { type: 3 }, strokeColor: "#8b5cf6", strokeWidth: 2 },
  { type: "text", id: "s3label", x: 430, y: 460, text: "3. CLASSIFY", fontSize: 18, strokeColor: "#1e1e1e", fontFamily: 1 },
  { type: "text", id: "s3desc", x: 395, y: 508, text: "Match divergence to\nmisconception ontology", fontSize: 14, strokeColor: "#757575", fontFamily: 1 },

  // === ONTOLOGY ===
  { type: "rectangle", id: "ontBox", x: 30, y: 470, width: 280, height: 165, backgroundColor: "#fff3bf", fillStyle: "solid", roundness: { type: 3 }, strokeColor: "#f59e0b", strokeWidth: 1 },
  { type: "text", id: "ontTitle", x: 45, y: 480, text: "MISCONCEPTION ONTOLOGY", fontSize: 12, strokeColor: "#b45309", fontFamily: 1 },
  { type: "text", id: "ontSrc1", x: 55, y: 508, text: "Research literature", fontSize: 16, strokeColor: "#1e1e1e", fontFamily: 1 },
  { type: "text", id: "ontSrc1d", x: 55, y: 528, text: "Decades of cataloged error patterns", fontSize: 12, strokeColor: "#757575", fontFamily: 1 },
  { type: "text", id: "ontSrc2", x: 55, y: 553, text: "Pilot teacher annotations", fontSize: 16, strokeColor: "#1e1e1e", fontFamily: 1 },
  { type: "text", id: "ontSrc2d", x: 55, y: 573, text: "Hundreds of labeled student responses", fontSize: 12, strokeColor: "#757575", fontFamily: 1 },
  { type: "text", id: "ontSrc3", x: 55, y: 598, text: "Teacher override feedback", fontSize: 16, strokeColor: "#1e1e1e", fontFamily: 1 },
  { type: "text", id: "ontSrc3d", x: 55, y: 618, text: "Continuous refinement from classrooms", fontSize: 12, strokeColor: "#757575", fontFamily: 1 },
  { type: "arrow", id: "a5", x: 315, y: 520, width: 70, height: -45, points: [[0, 0], [70, -45]], strokeColor: "#f59e0b", strokeWidth: 2, endArrowhead: "arrow" },

  // === CLASSIFICATION RESULT ===
  { type: "arrow", id: "a6", x: 575, y: 472, width: 55, height: 0, points: [[0, 0], [55, 0]], strokeColor: "#22c55e", strokeWidth: 2, endArrowhead: "arrow" },
  { type: "rectangle", id: "resultBox", x: 640, y: 435, width: 160, height: 105, backgroundColor: "#b2f2bb", fillStyle: "solid", roundness: { type: 3 }, strokeColor: "#22c55e", strokeWidth: 2 },
  { type: "text", id: "resLabel", x: 658, y: 443, text: "CLASSIFICATION", fontSize: 12, strokeColor: "#15803d", fontFamily: 1 },
  { type: "text", id: "res1", x: 658, y: 468, text: "Sign inversion", fontSize: 20, strokeColor: "#1e1e1e", fontFamily: 1 },
  { type: "text", id: "res2", x: 658, y: 498, text: "Confidence: 85%", fontSize: 16, strokeColor: "#15803d", fontFamily: 1 },
  { type: "text", id: "res3", x: 658, y: 520, text: "Divergence at step 3", fontSize: 12, strokeColor: "#757575", fontFamily: 1 },

  // === BRIEF OUTPUT ===
  { type: "arrow", id: "a7", x: 720, y: 545, width: 0, height: 35, points: [[0, 0], [0, 35]], strokeColor: "#4a9eed", strokeWidth: 2, endArrowhead: "arrow" },
  { type: "rectangle", id: "briefBox", x: 640, y: 585, width: 160, height: 55, backgroundColor: "#a5d8ff", fillStyle: "solid", roundness: { type: 3 }, strokeColor: "#4a9eed", strokeWidth: 2 },
  { type: "text", id: "briefLabel", x: 670, y: 600, text: "Monday Brief\nin Canvas", fontSize: 16, strokeColor: "#1e1e1e", fontFamily: 1 },

  // === FEEDBACK LOOP ===
  { type: "arrow", id: "feedback", x: 640, y: 435, width: -280, height: 75, points: [[0, 0], [-140, 10], [-280, 75]], strokeColor: "#b0b0b0", strokeWidth: 1, strokeStyle: "dashed", endArrowhead: "arrow" },
  { type: "text", id: "fbLabel", x: 430, y: 460, text: "overrides retrain", fontSize: 12, strokeColor: "#b0b0b0", fontFamily: 1 },
]

export default function ClassifierDiagram() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[500px] rounded-xl border border-border bg-muted/30">
        <p className="text-sm text-muted-foreground">Loading diagram...</p>
      </div>
    )
  }

  return (
    <div className="h-[500px] w-full rounded-xl border border-border overflow-hidden">
      <Excalidraw
        initialData={{
          elements: CLASSIFIER_ELEMENTS as any,
          appState: {
            viewBackgroundColor: "#ffffff",
            zoom: { value: 0.7 as any },
            scrollX: 50,
            scrollY: 30,
            viewModeEnabled: true,
            zenModeEnabled: false,
            gridModeEnabled: false,
          },
          scrollToContent: true,
        }}
        viewModeEnabled={true}
        zenModeEnabled={true}
        gridModeEnabled={false}
        UIOptions={{
          canvasActions: {
            loadScene: false,
            saveToActiveFile: false,
            export: false,
            toggleTheme: false,
          },
          tools: { image: false },
        }}
      />
    </div>
  )
}

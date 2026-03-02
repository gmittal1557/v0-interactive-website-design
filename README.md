# Glean for Teachers — Product Spec

Live demo: [https://gleanforteachers.vercel.app/](https://gleanforteachers.vercel.app/)

## 1) Product Summary

**Glean for Teachers** is a learning intelligence layer for middle and high school classrooms.
It converts student work into high-confidence misconception signals so teachers can intervene **before** failure compounds.

Core promise:
- Less time grading
- More time teaching
- Better in-class decisions before the next period starts

## 2) Who This Is For

Primary user:
- **Teacher** (MVP focus)

Secondary users (later phases):
- Student
- Department head / school leadership
- District stakeholders

## 3) Problem Statement

Today’s grading workflow creates delayed, low-quality feedback loops:
- Teachers learn about gaps too late (often weeks later)
- Grading consumes time needed for targeted intervention
- Scores explain outcomes, not causes

Result: teachers teach without reliable signal, and students keep building on weak foundations.

## 4) North Star Vision

A teacher starts the day with a short, trusted brief:
- Who is likely stuck
- On which concept
- What to do in class immediately

The product shifts classrooms from **reactive grading** to **predictive teaching**.

## 5) MVP Scope (Teacher-Only)

### In scope
- Quiz ingestion from existing school scanner workflow
- OCR + misconception classification pipeline
- Confidence-scored teacher brief before class
- Curriculum-grounded reteach recommendations in teacher LMS context

### Explicitly out of scope (MVP)
- Student-facing hinting/study companion

Rationale:
- Trust must be earned with teachers first
- Student surfaces are unlocked after teacher-loop reliability is proven

## 6) MVP Workflow

1. **Scan**: Teacher submits quizzes (2-minute end-of-day action)
2. **Analyze**: Overnight OCR + classification + confidence scoring
3. **Brief**: Teacher sees high-signal flags before class
4. **Teach**: Teacher adjusts lesson based on grounded recommendations

## 7) Product Requirements

### Functional requirements
- Ingest scanned student work reliably
- Extract structured responses from messy handwriting
- Classify misconceptions at concept level
- Retrieve curriculum-aligned guidance from school materials
- Deliver teacher brief in existing workflow (Canvas/Google Classroom context)

### Non-functional requirements
- Privacy-first storage model (structured insights, not raw student text)
- <2s retrieval response for surfaced recommendations
- High precision default threshold for trust protection

## 8) Technical Architecture (MVP)

Pipeline:
- Scanner input
- Text recognition (`GPT-4V` / `Google Doc AI`)
- Fine-tuned misconception classifier
- Curriculum retrieval via Glean-style enterprise search
- Teacher brief delivery

Key design choices:
- **Precision over recall** early on
- **Privacy by design** as architecture, not policy

## 9) Go-to-Market Plan

Pilot motion:
- 30-day free pilot with one Algebra 2 teacher
- Weeks 1–2: setup + first scans
- Weeks 3–4: live classroom use

Commercial motion:
- Department head proof -> principal confidence -> school budget
- School license first; district expansion after clear outcomes

Why Algebra 2 first:
- Standardized concept progression
- Frequent misconception patterns
- Fast evidence loop within a term

## 10) Success Metrics

### MVP (must-pass)
- 70%+ teachers open morning summary before 3+ classes/week
- 8+ hours/week grading time reclaimed
- 50%+ classes show lesson adjustment based on brief
- 75%+ surfaced flags are acted on by teachers

### Next questions (post-MVP)
- Do student outcomes improve vs control classes?
- Does student engagement sustain once student tooling is introduced?

## 11) Open Questions

1. Will teachers change planned lessons based on AI signal under classroom pressure?
2. What confidence threshold maximizes trust without missing too many true gaps?
3. How much FERPA/compliance friction appears in district procurement?
4. Does classifier quality generalize beyond math-heavy subjects?

## 12) Repository Implementation Map

Core implementation is in:
- `components/prd-revamp-page.tsx`

Primary editable content models:
- `sectionItems` (navigation/section structure)
- `mvpSteps` (MVP walkthrough)
- `roadmapPhases` (phase progression)
- `V0_PROTOTYPE_URL` (embedded prototype source)
- `ecosystemNodes` (impact modal)

Assets:
- `public/videos/personas.mp4`
- `public/images/*.jpg`

## 13) Local Development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run start
```

## 14) Deployment

- Host: Vercel
- Base branch: `main`
- Production URL: [https://gleanforteachers.vercel.app/](https://gleanforteachers.vercel.app/)

---

This README captures the product spec represented by the interactive website.

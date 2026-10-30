# Project memory

## Product intent & audience

- Interactive lesson for Grade 4 student named Tiwatope to learn about AI-generated misinformation
- Core learning objective: identify false headlines, understand AI-generated misinformation
- Teaches STOP CHECK THINK fact-checking method
- Single-learner, tutor-guided experience (not a multi-user classroom app)

## Brand personality & voice

- Educational, kid-friendly, age-appropriate for Grade 4 (~9-10 years old)
- Encouraging and supportive tone — tutor provides guidance per stage

## Visual design & UX direction

- Vite + React + Tailwind CSS + Lucide React icons (per `.bolt/prompt`)
- Use `@/` path alias for imports, not deep relative paths
- Lesson structured as multi-stage progression (stages 1-7 plus takehome)
- TutorPanel component displays per-stage guidance (SAY, ASK, LOOK FOR, IF HE STRUGGLES, FOLLOW-UP)
- Headline/headline-card components likely present interactive real vs. fake headlines for student to evaluate

## Decisions, constraints & rationale

- Stage data lives in a `lessonData` module containing `tutorSupport` object keyed by stage
- `tutorSupport` keys: stage1 through stage7, takehome (all must exist to avoid runtime crashes)
- App.tsx must use safe fallbacks when reading `tutorSupport[stage]` — missing entries crash the entire page (blank screen)
- Vite env vars must be prefixed with `VITE_` to be client-accessible
- No UI theme/icon packages beyond what the template provides

## Open questions & assumptions

- Exact STOP CHECK THINK method steps and how they map to lesson stages (assumed embedded in lessonData)
- Whether the app uses an AI API for dynamic headline generation or static lesson data (current evidence points to static `lessonData`)
- Full stage structure/progression logic beyond stage names
- Whether progress persistence (localStorage, etc.) is needed across sessions
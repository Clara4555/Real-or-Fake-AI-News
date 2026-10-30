/*
# AI Explorers — Module 4, Lesson 2: Real or Fake? Misinformation Lesson

## Overview
Creates the persistence layer for an interactive Grade 4 lesson on AI-generated
fake news and misinformation. This is a single-tenant app (no sign-in) used in a
one-on-one tutoring context, so all policies target anon + authenticated.

## New Tables

1. `lesson_progress`
   - Tracks which stage the student has reached and which stages are complete.
   - `stage_id` (text): identifier for each lesson stage (e.g. "stage1").
   - `status` (text): "not_started" | "in_progress" | "complete".
   - `updated_at` (timestamptz).

2. `error_investigations`
   - The five AI news error investigations (Deliverable 1).
   - `item_index` (int): 1–5, which investigation.
   - `headline` (text): the AI-generated headline/claim (read-only teaching content).
   - `identified_error` (text): student writes what is wrong.
   - `explanation` (text): student writes why they think so.
   - `correction` (text): student writes what they discovered / the correction.
   - `completed` (boolean): whether the investigation is finished.

3. `factcheck_reports`
   - The three STOP-CHECK-THINK fact-check reports (Deliverable 2).
   - `claim_index` (int): 1–3.
   - `claim` (text): the AI claim being investigated (read-only teaching content).
   - `stop_note` (text): student's STOP reasoning.
   - `check_source` (text): reliable source used.
   - `check_note` (text): what the source said.
   - `think_note` (text): student's THINK reasoning.
   - `verdict` (text): TRUE | FALSE | MISLEADING | UNVERIFIED.
   - `verdict_explanation` (text): student's supporting explanation.
   - `completed` (boolean).

4. `headline_challenge` — Stage 1 student response (which headline believed/suspicious/what they'd need).
5. `headline_inspector` — Stage 3 classifications per headline.
6. `recap_responses` — Stage 7 recap answers and reflection sentence.
7. `takehome_mission` — Take-home assignment saved responses.

## Security
- RLS enabled on every table.
- All tables grant CRUD to anon, authenticated (single-tenant, no auth screen).
- USING (true) is acceptable: this is intentionally shared single-tenant data.
*/

CREATE TABLE IF NOT EXISTS lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_id text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'not_started',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON lesson_progress TO anon, authenticated;
DROP POLICY IF EXISTS "anon_rw_lesson_progress" ON lesson_progress;
CREATE POLICY "anon_rw_lesson_progress" ON lesson_progress FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_rw_lesson_progress_i" ON lesson_progress;
CREATE POLICY "anon_rw_lesson_progress_i" ON lesson_progress FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_lesson_progress_u" ON lesson_progress;
CREATE POLICY "anon_rw_lesson_progress_u" ON lesson_progress FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_lesson_progress_d" ON lesson_progress;
CREATE POLICY "anon_rw_lesson_progress_d" ON lesson_progress FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS error_investigations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_index int NOT NULL,
  headline text NOT NULL DEFAULT '',
  identified_error text NOT NULL DEFAULT '',
  explanation text NOT NULL DEFAULT '',
  correction text NOT NULL DEFAULT '',
  completed boolean NOT NULL DEFAULT false,
  updated_at timestamptz DEFAULT now(),
  UNIQUE (item_index)
);

ALTER TABLE error_investigations ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON error_investigations TO anon, authenticated;
DROP POLICY IF EXISTS "anon_rw_error_inv_sel" ON error_investigations;
CREATE POLICY "anon_rw_error_inv_sel" ON error_investigations FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_rw_error_inv_ins" ON error_investigations;
CREATE POLICY "anon_rw_error_inv_ins" ON error_investigations FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_error_inv_upd" ON error_investigations;
CREATE POLICY "anon_rw_error_inv_upd" ON error_investigations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_error_inv_del" ON error_investigations;
CREATE POLICY "anon_rw_error_inv_del" ON error_investigations FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS factcheck_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_index int NOT NULL,
  claim text NOT NULL DEFAULT '',
  stop_note text NOT NULL DEFAULT '',
  check_source text NOT NULL DEFAULT '',
  check_note text NOT NULL DEFAULT '',
  think_note text NOT NULL DEFAULT '',
  verdict text NOT NULL DEFAULT '',
  verdict_explanation text NOT NULL DEFAULT '',
  completed boolean NOT NULL DEFAULT false,
  updated_at timestamptz DEFAULT now(),
  UNIQUE (claim_index)
);

ALTER TABLE factcheck_reports ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON factcheck_reports TO anon, authenticated;
DROP POLICY IF EXISTS "anon_rw_fc_sel" ON factcheck_reports;
CREATE POLICY "anon_rw_fc_sel" ON factcheck_reports FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_rw_fc_ins" ON factcheck_reports;
CREATE POLICY "anon_rw_fc_ins" ON factcheck_reports FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_fc_upd" ON factcheck_reports;
CREATE POLICY "anon_rw_fc_upd" ON factcheck_reports FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_fc_del" ON factcheck_reports;
CREATE POLICY "anon_rw_fc_del" ON factcheck_reports FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS headline_challenge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  believed_headline text NOT NULL DEFAULT '',
  suspicious_headline text NOT NULL DEFAULT '',
  what_you_need text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE headline_challenge ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON headline_challenge TO anon, authenticated;
DROP POLICY IF EXISTS "anon_rw_hc_sel" ON headline_challenge;
CREATE POLICY "anon_rw_hc_sel" ON headline_challenge FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_rw_hc_ins" ON headline_challenge;
CREATE POLICY "anon_rw_hc_ins" ON headline_challenge FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_hc_upd" ON headline_challenge;
CREATE POLICY "anon_rw_hc_upd" ON headline_challenge FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_hc_del" ON headline_challenge;
CREATE POLICY "anon_rw_hc_del" ON headline_challenge FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS headline_inspector (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_index int NOT NULL,
  headline text NOT NULL DEFAULT '',
  warning_signs text NOT NULL DEFAULT '',
  reasoning text NOT NULL DEFAULT '',
  completed boolean NOT NULL DEFAULT false,
  updated_at timestamptz DEFAULT now(),
  UNIQUE (item_index)
);

ALTER TABLE headline_inspector ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON headline_inspector TO anon, authenticated;
DROP POLICY IF EXISTS "anon_rw_hi_sel" ON headline_inspector;
CREATE POLICY "anon_rw_hi_sel" ON headline_inspector FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_rw_hi_ins" ON headline_inspector;
CREATE POLICY "anon_rw_hi_ins" ON headline_inspector FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_hi_upd" ON headline_inspector;
CREATE POLICY "anon_rw_hi_upd" ON headline_inspector FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_hi_del" ON headline_inspector;
CREATE POLICY "anon_rw_hi_del" ON headline_inspector FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS recap_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  misinformation_explanation text NOT NULL DEFAULT '',
  suspicious_headline_id text NOT NULL DEFAULT '',
  why_checking_matters text NOT NULL DEFAULT '',
  stop_check_think text NOT NULL DEFAULT '',
  verdict_choice text NOT NULL DEFAULT '',
  reflection_sentence text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE recap_responses ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON recap_responses TO anon, authenticated;
DROP POLICY IF EXISTS "anon_rw_rr_sel" ON recap_responses;
CREATE POLICY "anon_rw_rr_sel" ON recap_responses FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_rw_rr_ins" ON recap_responses;
CREATE POLICY "anon_rw_rr_ins" ON recap_responses FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_rr_upd" ON recap_responses;
CREATE POLICY "anon_rw_rr_upd" ON recap_responses FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_rr_del" ON recap_responses;
CREATE POLICY "anon_rw_rr_del" ON recap_responses FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS takehome_mission (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  headline_claim text NOT NULL DEFAULT '',
  why_check text NOT NULL DEFAULT '',
  source_used text NOT NULL DEFAULT '',
  what_discovered text NOT NULL DEFAULT '',
  verdict text NOT NULL DEFAULT '',
  explanation text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE takehome_mission ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON takehome_mission TO anon, authenticated;
DROP POLICY IF EXISTS "anon_rw_thm_sel" ON takehome_mission;
CREATE POLICY "anon_rw_thm_sel" ON takehome_mission FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_rw_thm_ins" ON takehome_mission;
CREATE POLICY "anon_rw_thm_ins" ON takehome_mission FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_thm_upd" ON takehome_mission;
CREATE POLICY "anon_rw_thm_upd" ON takehome_mission FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_rw_thm_del" ON takehome_mission;
CREATE POLICY "anon_rw_thm_del" ON takehome_mission FOR DELETE TO anon, authenticated USING (true);

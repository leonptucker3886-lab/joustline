# Tester SOP v1.0 (Joustline)
Ratified 2026-10-19. Source of truth: `Team_SOPs_v1.0.pdf` in this folder. Supervisor for this repo: 2nd LT Real.

## Bug reports
Every report has **Severity**, **Frequency** (Always / Sometimes / Once) and **Status** (Open / Fixed / Verified / Reopened / Closed).

## Severity guide
- **Blocker:** testing can't continue or the game won't launch. Report immediately in the topic thread.
- **Critical:** crash, data or save loss, or a progression stopper where testing can continue another way.
- **Major**, **Minor**, **Cosmetic** follow, in that order.

## Before filing
Search for duplicates in the tracker (or the 'Bugs' thread until a tracker exists).
If a build has no checklist, ask its Design owner and do exploratory testing meanwhile.

## Design feedback
What you felt, where it happened, and a suggestion if you have one.

## Regression (Step 6)
1. Dev or Design owner sets **Fixed** and notes the build number of the fix.
2. Testers retest Fixed bugs on the next build.
3. Fix works: set **Verified** and note the build number. Closed once the Design owner or dev confirms.
4. Bug still there: set **Reopened** and note the build number. Don't file a new report.

## Status owners
Open = tester; Fixed = dev/Design owner; Verified or Reopened = tester; Closed = dev/Design owner.

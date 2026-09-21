# Jujube Log

A home-screen web app for logging Sleep, Breastfeed, Diaper, Bath, and Medicine,
built to replace Nara Baby before it starts charging. Data is written in Nara's own
column format, so
[understand-infant-sleep](https://github.com/alicezheng-ai/understand-infant-sleep)
keeps working against it unchanged.

**Live app:** https://alicezheng-ai.github.io/baby-is-figureoutable/
(open it in Safari, then Share → Add to Home Screen)

## What's here

- Live start/stop timers for **Sleep** and **Breastfeed** (with one-tap side
  switching), one-tap-start **Diaper** logging with Type / Color / Texture / Size
- Every row stays visible and usable while a timer runs elsewhere — nothing takes
  over the screen
- A date/time picker on every timer and on Diaper, for backfilling when the actual
  start was earlier than when you opened the app
- "Log manually" on Sleep and Breastfeed, for entries logged with no live timer at
  all (phone wasn't on hand)
- Stopping a Sleep or Breastfeed timer opens a quick review step — add a note if you
  want one, then Save; nothing saves silently
- Every entry in Recent has its own delete link; double-tap an entry to open it and
  see or edit its note and details
- Breastfeed shows which side was used last, so it's easy to rotate
- Today / Last 24h rollup totals, rounded to the minute
- Offline-safe: saves queue locally and retry on their own
- Installs to the home screen; light/dark follows the phone's system setting
- Styled around the watercolor piece of Sai by the lake — same warm ivory paper and
  soft palette throughout, light or dark
- Bath as a one-tap timestamped log, same shape as Diaper
- Medicine: set a current medication and dosing interval once, then log each dose
  in one tap — the row shows time since the last dose and a live countdown to the
  next one, right on the home screen

## Roadmap

- [x] **Day 1 — Core logging**, expanded with editing, notes, backfill, and a
  Today/24h summary per the workflow details above.
- [x] **Day 2 — Bath and Medicine**, as described above.
- [ ] **Day 3 — Action screen v1.** Rule-based "what's likely going on" reading —
  elapsed time since the last event, compared against Sai's own recent averages.
- [ ] **Day 4 — Sleep-trend flag.** A longer-horizon, week-over-week check for
  things like reduced sleep, with AAP age-bracket context layered in.

CSV export isn't a separate line item — the Google Sheet behind this app already uses
Nara's exact header row, so `File > Download > CSV` on it is already a Nara-format
export, any time.

**Later, not on this sprint:** merging in the Digital Twin model and folding
`understand-infant-sleep` in as a view rather than a separate tool; multi-caregiver
support, once family is around to use it in January.

## Setup / updating

1. **Backend:** Google Sheet → Extensions → Apps Script → paste in `apps-script/Code.gs`.
   First time: Deploy → New deployment → Web app (Execute as Me, access Anyone),
   copy the URL into `CONFIG.APPS_SCRIPT_URL` in `index.html`. Any time `Code.gs`
   changes after that: Deploy → Manage deployments → edit → **New version** — saving
   alone doesn't push changes live.
2. **Front end:** this repo, with Pages turned on (Settings → Pages → main branch,
   root).
3. **Home screen:** open the live link in Safari → Share → Add to Home Screen.

Data lives in the `Log` tab of the Google Sheet — one row per entry, headers matching
the Nara export, editable there directly if ever needed.

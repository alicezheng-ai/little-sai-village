# Baby is Figureoutable 👶🏼✨

A mobile-friendly web tool built around the belief that parenting and baby routines are always **figureoutable**. Designed for seamless daily logging and shift handoffs—giving parents, nannies, and caregivers an instant, organized picture of Jujube's day without friction or subscription paywalls.

Originally created to replace Nara Baby, all data writes directly to Google Sheets using Nara's standard column export format (making it fully compatible with downstream analysis tools like `understand-infant-sleep`).

**Live App Link:** [little-sai-village/tools/baby-tracker/](https://alicezheng-ai.github.io/little-sai-village/tools/baby-tracker/)  
*(Open in Mobile Safari → Share → **Add to Home Screen** for a native app feel)*

---

## 🌟 Why "Baby is Figureoutable"?

When multiple caregivers or nannies take over shifts throughout the day and night, clear continuity is everything. This tool gives incoming caregivers an immediate, clear snapshot of:
* When he last slept, fed, or had a diaper change.
* Which side was used last for breastfeeds.
* Medication countdowns and dosage intervals.
* Today vs. Last 24-hour summary totals.

---

## ✨ Features & Capabilities

* **Live & Flexible Timers:**
  * One-tap start/stop for **Sleep** and **Breastfeed** with live elapsed timers.
  * Easy **one-tap side switching** (Left / Right) during feeding.
  * Shows which side was used last to keep rotations seamless across caregiver shifts.
* **Smart Backfilling & Manual Logging:**
  * Built-in date/time picker on every timer to backfill start times if the phone wasn't nearby when an activity began.
  * "Log manually" options for retroactive logging.
* **Shift-Friendly & Non-Intrusive UI:**
  * Timers run unobtrusively in the background—every other row stays interactive while a timer is running.
  * Stopping a timer opens a review screen to add optional notes before saving (nothing saves silently).
  * Double-tap any entry in the **Recent** list to inspect or edit details; single-tap delete link for quick fixes.
* **Diaper, Bath & Medication Tracking:**
  * Fast diaper logging with support for Type (*Wet / Dirty / Dirty Wet*), Color, Texture, and Size.
  * One-tap timestamped Bath logging.
  * **Medicine Tracker:** Set a medication name and interval hours once. Log doses in one tap—the home screen displays exact time elapsed since the last dose and a live countdown to the next due dose.
* **Summaries & Offline Resilience:**
  * Interactive **Today** and **Last 24h** rollups showing total sleep duration, feed times per side, and diaper counts.
  * **Offline-Safe:** Queues log entries locally if offline and syncs automatically when connection restores.
  * Styled with warm watercolor ivory tones and auto-adapts to system Dark/Light mode.

---

## 🏗️ Technical Setup & Integration

### Repository Structure
This tool lives inside the main **[little-sai-village](https://github.com/alicezheng-ai/little-sai-village)** repository under:

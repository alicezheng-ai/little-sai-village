/* ==========================================================================
   Little Sai and His Village of Love — shared behavior
   ========================================================================== */

// Sai's birth moment. Used to power the live age counter on the home page.
// Format: ISO 8601 with UTC offset, so it parses correctly regardless of
// the visitor's own timezone.
const SAI_BIRTH = new Date("2026-06-12T19:51:00-07:00");

/* ---------- Live age counter (home page hero) ---------- */
function renderAge() {
  const el = document.querySelector("[data-age-counter]");
  if (!el) return;

  const now = new Date();
  let months = (now.getFullYear() - SAI_BIRTH.getFullYear()) * 12 + (now.getMonth() - SAI_BIRTH.getMonth());
  const anchor = new Date(SAI_BIRTH);
  anchor.setMonth(anchor.getMonth() + months);
  if (anchor > now) {
    months -= 1;
    anchor.setMonth(anchor.getMonth() - 1);
  }
  const dayMs = 1000 * 60 * 60 * 24;
  const days = Math.floor((now - anchor) / dayMs);
  const totalDays = Math.floor((now - SAI_BIRTH) / dayMs);

  const monthLabel = months === 1 ? "month" : "months";
  const dayLabel = days === 1 ? "day" : "days";

  el.innerHTML =
    `<span class="age-counter__num">${months} ${monthLabel}, ${days} ${dayLabel} old</span>` +
    `<span class="age-counter__label">${totalDays.toLocaleString()} days since June 12, 2026</span>`;
}

/* ---------- Growing tree timeline ----------
   Add a line here for every milestone — first celebration, first steps,
   whatever the village wants remembered — and it grows the tree on the
   home page and the full timeline automatically. Keep dates in order. */
const MILESTONES = [
  { date: "2026-06-12", label: "Born", note: "Born under Pacific Northwest's evergreens, China on one side and India on the other — the very start of the tree." },
  { date: "2026-09-19", label: "100 Days — his first branch", note: "A traditional Chinese milestone: the village's first gathering for him, red eggs and longevity noodles included. Details on the Events page." },
  // { date: "YYYY-MM-DD", label: "Next milestone", note: "One line about it." },
];

function renderTree() {
  const el = document.querySelector("[data-tree]");
  if (!el) return;
  el.innerHTML = MILESTONES.map((m) => {
    const d = new Date(m.date + "T00:00:00");
    const pretty = d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    return `<li class="tree__node"><time datetime="${m.date}">${pretty}</time><strong>${m.label}</strong><p>${m.note}</p></li>`;
  }).join("");
}

/* ---------- Menu tabs (vegetarian / non-vegetarian) ---------- */
function initMenuTabs() {
  const tabGroups = document.querySelectorAll("[data-menu-tabs]");
  tabGroups.forEach((group) => {
    const tabs = group.querySelectorAll(".menu-tab");
    const panels = group.parentElement.querySelectorAll(".menu-panel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
        tab.setAttribute("aria-selected", "true");
        const target = tab.getAttribute("data-target");
        panels.forEach((p) => p.setAttribute("data-active", String(p.id === target)));
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderAge();
  renderTree();
  initMenuTabs();
});

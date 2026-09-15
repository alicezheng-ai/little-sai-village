/* ==========================================================================
   Little Sai and His Village of Love — shared behavior
   ========================================================================== */

// Sai's birth moment. Used only to power the live age counter's math below —
// never printed on the page. Format: ISO 8601 with UTC offset, so it parses
// correctly regardless of the visitor's own timezone.
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
    `<span class="age-counter__label">${totalDays.toLocaleString()} days, and counting</span>`;
}

/* ---------- Growing tree timeline ----------
   Add a line here for every milestone — first celebration, first steps,
   whatever the village wants remembered — and it grows the tree on the
   home page automatically. Keep entries in order.
   `date` only controls sort order and is never shown as-is; set `display`
   to whatever text should actually appear (kept vague for Sai's birthday
   on purpose — no exact date is shown anywhere on the site). */
const MILESTONES = [
  { date: "2026-06", display: "Mid-June 2026", label: "Born", note: "Born under Pacific Northwest's evergreens, China on one side and India on the other — the very start of the tree." },
  { date: "2026-09-19", display: "September 19, 2026", label: "100 Days — his first branch", note: "A traditional Chinese milestone: the village's first gathering for him, red eggs and longevity noodles included. Details on the Events page." },
  // { date: "YYYY-MM-DD", display: "Month Day, Year", label: "Next milestone", note: "One line about it." },
];

function renderTree() {
  const el = document.querySelector("[data-tree]");
  if (!el) return;
  el.innerHTML = MILESTONES.map((m) => {
    return `<li class="tree__node"><time datetime="${m.date}">${m.display}</time><strong>${m.label}</strong><p>${m.note}</p></li>`;
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

/* ---------- Rotating wish banner (wishes page) ----------
   Add a short line for every wish you want to feature — no names, just the
   message itself. Leave the array empty and the section quietly hides
   itself until you add some. */
const WISHES = [
  // "May you always find your way back to the people who love you.",
  // "Grow up curious, kind, and a little bit stubborn — it'll serve you well.",
];

function renderWishBanner() {
  const el = document.querySelector("[data-wish-banner]");
  if (!el) return;
  const section = el.closest("section");
  if (!WISHES.length) {
    if (section) section.style.display = "none";
    return;
  }

  let i = Math.floor(Math.random() * WISHES.length);
  const show = (index) => { el.textContent = `“${WISHES[index]}”`; };
  show(i);

  if (WISHES.length > 1) {
    setInterval(() => {
      el.classList.add("is-fading");
      setTimeout(() => {
        i = (i + 1) % WISHES.length;
        show(i);
        el.classList.remove("is-fading");
      }, 500);
    }, 5000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderAge();
  renderTree();
  initMenuTabs();
  renderWishBanner();
});

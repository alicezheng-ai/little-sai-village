# Little Sai Village — three-level sliding navigation

This is a **drop-in shared site navigation**, designed for the existing HTML/CSS/JS GitHub Pages repository. It uses the current design palette, fonts, and no dependencies. It does **not** change the contents of any page.

## Navigation structure

- **Utilities / 实用工具** → Nanny Guide → guide sections; First Foods → Today / 100-day plan / Groceries / Book / Settings; Baby Tracker → Open tracker.
- **People / 我们爱的人** → Great-Grandpa Yin Xiuli → Memorial.
- **Events / 重要日子** → Sai's 100 Days → Celebration details; All Events → Browse celebrations.
- **Memories / 成长记忆** → Monthly Videos / Photos / Wishes → Open page.

The Home link is always present in the header. Each panel slides horizontally (Category → Page → Section/shortcut); Back moves up one level. Escape, overlay click, and × close the menu. Supports keyboard navigation, `aria-modal`, focus management, and reduced motion.

## Install in GitHub repository

1. Download/unzip the package and copy `js/navigation.js` and `css/navigation.css` into the corresponding directories of `little-sai-village`.
2. Copy `install-navigation.py` into the repository root.
3. From that repository root, run `python3 install-navigation.py`.
4. Commit all modified HTML pages and the new JS/CSS files, then push to `main`.

If you edit only on GitHub.com, add this script before `</body>` in **each root-level HTML page** instead of running the installer:

```html
<script src="js/navigation.js" data-root="./"></script>
```

The script replaces the older flat `<nav class="site-nav">` automatically (or standalone memorial `.site-head`) with the new header. It injects its own CSS once. Existing content and `js/main.js` remain intact. No framework/build step required.

## First Foods integration

The navigation links to `starting-solid.html#today`, `#plan`, `#grocery`, `#guide`, and `#settings`. It calls the existing app's `switchTab()` function when arriving at those URLs. If you are still using an older starting-solid.html that doesn't have those tabs, upgrade that page with the First Foods integration from the prior package.

## Notes

- Includes all currently linked root pages found in the November 2026 public repository: index, nanny, starting-solid, events, event-100-days, videos, wishes, photos, and Great-Grandpa memorial.
- All references are relative, so they work at `https://alicezheng-ai.github.io/little-sai-village/`.
- This is navigation only, not authentication. Public GitHub Pages pages remain public.
- To rename, rearrange, or add entries, edit the `tree` array near the top of `js/navigation.js`.

# Little Sai and His Village of Love

A small, plain-HTML site meant to live on GitHub Pages forever. No build step, no dependencies — just HTML, CSS, and a little JS.

## Publish it

1. Create a GitHub repo (e.g. `little-sai-village`) and push everything in this folder to its `main` branch, root level.
2. In the repo, go to **Settings → Pages**, set Source to `main` branch / `/ (root)`, and save.
3. Your site will be live at `https://alicezheng-ai.github.io/little-sai-village/` within a minute or two.

## Fill in the placeholders

Search the files for `TODO` — every spot that needs a real link or detail is marked that way. At minimum:

- **`event-100-days.html`** — venue address, RSVP deadline, the Partiful link (search for `#rsvp` and the `href="#"` right under it), the menu items, and the schedule.
- **`videos.html`** and the video strip in `index.html` — swap each placeholder `<div class="video-card__frame">` for a real embed. Two easy options are in a comment right above each placeholder (YouTube unlisted, or Google Drive).
- **`wishes.html`** — create a Google Form ("Wishes for Sai") and either embed it (Form → Send → the `<>` embed icon → paste the `<iframe>` into `.form-embed`) or point the "Open the wish form" button at its link. Then share the response Google Sheet as "anyone with the link can view" and point the "Read the wishes" button at it.
- **`photos.html`** — create a shared Google Photos album, set it to allow collaborators to add photos, and point the button at its share link.

## Add a new event

1. Copy `event-100-days.html` to a new file (e.g. `event-first-birthday.html`).
2. Update the title, date, logistics, RSVP link, menu, and schedule inside it.
3. In `events.html`, copy the `<a class="event-card">` block and point it at your new file.
4. If it's the newest event, update the "next gathering" card in `index.html` too.

## Add a new monthly video

Copy one `.video-card` block in `videos.html` (and, if you want it on the home page strip, in `index.html`), swap in the new embed and caption.

## Add a milestone to the growing tree

Open `js/main.js` and add a line to the `MILESTONES` array near the top:

```js
{ date: "2027-01-15", label: "First steps", note: "One line about it." },
```

The tree on the home page updates automatically — no HTML editing needed.

## Design notes

Palette, type, and layout tokens are all defined at the top of `css/style.css`. The watercolor washes in the header are plain CSS (blurred, blended shapes) — no image assets to manage.

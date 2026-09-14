# Little Sai and His Village of Love

A small, plain-HTML site meant to live on GitHub Pages forever. No build step, no dependencies — just HTML, CSS, and a little JS.

Live at: [https://alicezheng-ai.github.io/little-sai-village/](https://alicezheng-ai.github.io/little-sai-village/)

## Publish updates

1. Push any changes to the `main` branch, root level of the `little-sai-village` repo.
2. GitHub Pages picks them up automatically — usually live within a minute or two.

## What's already filled in

- 100 Days event: venue, date/time, parking, dress code, RSVP (Partiful), schedule, traditions, and menu are all real.
- Monthly videos: all three Google Drive embeds are wired up on both `videos.html` and the homepage strip.
- Wishes: the Google Form is embedded, with a direct-link fallback underneath it.
- Photos: the Google Photos album link is live.

## Still open

- **`wishes.html`** — the "Read the village's wishes" button still needs a link. Share the form's response Google Sheet as "anyone with the link can view," then paste that link in for the `href="#"` marked `TODO` near the bottom of the file.
- **`event-100-days.html`** — an RSVP deadline line is commented out near the RSVP button, in case you want to add one later.

## Add a new event

1. Copy `event-100-days.html` to a new file (e.g. `event-first-birthday.html`).
2. Update the title, date, logistics, RSVP link, menu, and schedule inside it.
3. In `events.html`, copy the `<a class="event-card">` block and point it at your new file.
4. If it's the newest event, update the "first branch" card in `index.html` too.

## Add a new monthly video

Copy one `.video-card` block in `videos.html` (and, if you want it on the home page strip, in `index.html`), swap in the new embed and caption. Keep the two in sync if you want the same caption in both places.

## Add a milestone to the growing tree

Open `js/main.js` and add a line to the `MILESTONES` array near the top:

```js
{ date: "2027-01-15", label: "First steps", note: "One line about it." },
```

The tree on the home page updates automatically — no HTML editing needed.

## Design notes

Palette, type, and layout tokens are all defined at the top of `css/style.css`. The watercolor washes in the header are plain CSS (blurred, blended shapes) — no image assets to manage.

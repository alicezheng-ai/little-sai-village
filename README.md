# Little Sai and His Village of Love

A small, plain-HTML site meant to live on GitHub Pages forever. No build step, no dependencies — just HTML, CSS, and a little JS.

Live at: [https://alicezheng-ai.github.io/little-sai-village/](https://alicezheng-ai.github.io/little-sai-village/)

## Publish updates

1. Push any changes to the `main` branch, root level of the `little-sai-village` repo.
2. GitHub Pages picks them up automatically — usually live within a minute or two.

## What's already filled in

- 100 Days event: venue, date/time, parking, dress code, RSVP (Partiful), schedule, traditions, and menu are all real.
- Monthly videos: all three Google Drive embeds are wired up on both `videos.html` and the homepage strip, sized to keep their true 9:16 proportion.
- Wishes: a button opens the wish form directly (no embed). A short "words from the village" banner sits below it once you add some.
- Photos: no standalone page. Guests can add photos through the photo form, view the shared album directly, or just send them to Alice or Sid. Both links live in the "Photos" card on the homepage and the event page.
- Sai's exact birthdate is never shown anywhere on the site — the homepage age counter and the timeline both keep it vague on purpose (see below).

## Still open

- **`event-100-days.html`** — an RSVP deadline line is commented out near the RSVP button, in case you want to add one later.

## Add a wish to the rotating banner

Open `js/main.js` and add a line to the `WISHES` array:

```js
"May you always find your way back to the people who love you.",
```

No names — just the message. The banner hides itself automatically until there's at least one wish in the array, and rotates through them if there's more than one.

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
{ date: "2027-01-15", display: "January 2027", label: "First steps", note: "One line about it." },
```

`date` only controls the sort order and is never shown — `display` is the text that actually appears, so you can keep any date as vague or exact as you'd like. The tree on the home page updates automatically, no HTML editing needed.

## Design notes

Palette, type, and layout tokens are all defined at the top of `css/style.css`. The watercolor washes in the header are plain CSS (blurred, blended shapes) — no image assets to manage.

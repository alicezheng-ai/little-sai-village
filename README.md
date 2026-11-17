# Little Sai and His Village of Love

*A living family archive, a practical parenting toolkit, and a place for Sai to discover the people who loved him from the beginning.*

**Live site:** https://alicezheng-ai.github.io/little-sai-village/  
**Repository:** https://github.com/alicezheng-ai/little-sai-village

## Why this exists

Sai's village spans generations, languages, cultures, and continents. This website keeps family stories, celebrations, photographs, videos, and messages together, while also giving the people caring for Sai useful everyday references. It is designed to grow with him rather than remain a one-time event invitation.

The organizing metaphor is a growing tree: celebrations and milestones are branches; videos, photographs, memories, and wishes become its leaves.

## Explore the Village

The updated homepage groups **all existing destinations** into three categories. Each item links directly to an existing page.

| Utilities | People | Events |
| --- | --- | --- |
| [Nanny Guide](nanny.html) | [Great-Grandpa Yin Xiuli / 殷修力](great-grandpa-yin-xiuli-memorial.html) | [All Events](events.html) |
| [First Foods / 第一口辅食](starting-solid.html) | [Wishes](wishes.html) | [100 Days / 百日宴](event-100-days.html) |
| [Baby Tracker](tools/baby-tracker/index.html) | [Photos](photos.html) | |
| | [Monthly Videos](videos.html) | |

The homepage now includes a responsive three-column **Explore the Village** directory. This is not yet a multi-panel sliding navigation experience; that would require coordinating a shared navigation component across the other pages.

### What the home page contains

- A welcome and live age counter, keeping Sai's exact birth date out of visible text.
- An Explore the Village directory with all the links above.
- The 100 Days celebration feature.
- Five monthly Google Drive videos, including the new Month 5 recording.
- Photo submission, shared album and a link to the photo page.
- Wishes and the growing-tree milestone timeline.

## Content principles

**Personal, not generic.** Write for Sai and his family, with meaningful details and authentic voices. Preserve original memories instead of rewriting everyone into the same tone.

**Bilingual where useful.** Display English and Simplified Chinese together for food names, family relationships, cultural traditions, and important labels. Avoid making users switch the whole website just to understand one term.

**Practical information must be usable.** Parenting guides should be easy to scan on a phone. First-food entries should distinguish a food name from its preparation instructions, allergy guidance, and age-appropriate safety considerations. Do not imply that a referenced feeding book is freely licensed for public redistribution.

**Accessible and lightweight.** Prefer semantic HTML, keyboard-operable menus, readable type, captions or transcripts where available, responsive layouts, and reduced-motion support for sliding navigation.

**Privacy by design.** Avoid publishing exact birth timestamps, private care details, unconsented family information, or confidential documents. Google Drive embeds require appropriate access permissions; an unlisted link is not a security boundary.

## Videos and family moments

The new recording is **one Month 5 video** celebrating both occasions, titled exactly:

**Happy birthday Mama and Happy Diwali!**

The video is embedded on **both** `index.html` and `videos.html`.

Google Drive preview URL:

```text
https://drive.google.com/file/d/170yX3idJxtSIpFsntWFlgjOhcJYgQy4o/preview
```

The first four monthly video embeds and captions are retained. To add Month 6, add a `.video-card` to both pages with the corresponding month label, descriptive iframe `title`, and `loading="lazy"`. The shared `.video-card__frame` CSS uses a portrait 9:16 aspect ratio.

Google Drive sharing settings must permit each intended viewer to play the video. A publicly accessible GitHub Pages site is not a private family portal.

## Adding and maintaining content

### Add an event

1. Copy `event-100-days.html` to a new, clearly named event page.
2. Replace the title, schedule, venue, traditions, images, links, and any RSVP details.
3. Add an event card to `events.html`.
4. Update the homepage feature if the event should be highlighted there.
5. Verify mobile layout and remove outdated RSVP language after the event.

### Add a milestone

Edit the `TREE` array in `js/main.js` (this is the existing live implementation):

```js
{ when: "Month 5", title: "Happy birthday Mama and Happy Diwali!", href: "videos.html#month-5", text: "A month of family celebrations." },
```

The `TREE` array is shown in the order entered. The provided replacement HTML does not modify `js/main.js`; add the Month 5 entry separately if you want the growing tree to include it.

### Update wishes

The homepage links to `wishes.html`. Maintain submission and display behavior on that page or in its own supporting script. The current `js/main.js` is responsible for the age counter and growing tree; it does **not** contain a `WISHES` array.

### Add a person or family story

Create a dedicated page with a short introduction, photographs used with permission, a timeline if appropriate, and links to related events or memories. Link it under **People**. Preserve both the original-language names and their English transliterations when helpful.

### Add first-food content

Keep food entries structured: day or stage, English name, Chinese name, ingredients, preparation, texture/serving guidance, allergen notes, and source attribution. Where using a commercially published guide, link to the family's legitimately obtained source instead of committing the full copyrighted PDF to a public repository.

## Development and publishing

There is **no build step** and no package installation required for the main site.

```bash
git clone https://github.com/alicezheng-ai/little-sai-village.git
cd little-sai-village
python3 -m http.server 8000
```

Open `http://localhost:8000` to preview. Commit changes and push to `main`; GitHub Pages publishes from the repository's configured source. Deployment may take a few minutes.

Key files in the existing architecture:

| File | Purpose |
| --- | --- |
| `index.html` | Homepage, featured event, videos and growing tree |
| `videos.html` | Video gallery |
| `events.html` | Event index |
| `event-100-days.html` | 100 Days celebration |
| `wishes.html` | Wishes |
| `nanny.html` | Caregiving guide |
| `great-grandpa-yin-xiuli-memorial.html` | Memorial page |
| `js/main.js` | Shared age counter and growing-tree milestones |
| `css/style.css` | Shared design system and responsive styles |
| `tools/baby-tracker/` | Baby Tracker |
| `starting-solid.html` | First Foods |
| `photos.html` | Photos page |

## Design direction

Keep the established visual language: soft watercolor-like washes, warm colors, generous whitespace, serif editorial headings, and clean readable body text. The existing stylesheet defines shared colors and typography. New sections should feel like rooms in the same home, not separate apps.

For navigation, use an accessible three-level sliding menu on mobile and an appropriately adapted hierarchy on desktop. Keep transitions subtle and respect `prefers-reduced-motion`.

## Roadmap

- [x] Add Explore the Village directory to homepage with links to all existing destinations.
- [x] Embed the combined **Happy birthday Mama and Happy Diwali!** Month 5 video on homepage and video page.
- [x] Keep the four existing monthly videos and the 100 Days feature.
- [ ] Add Month 5 to the `TREE` array in `js/main.js` if desired.
- [ ] Propagate the updated navigation directory to every other page or implement a three-level sliding menu as a separate sitewide enhancement.
- [ ] Verify new Google Drive video permission using an incognito browser.
- [ ] Expand bilingual first-food materials and maintain family content with permission.
- [ ] Audit accessibility, mobile layout and media permissions.

## A note for the future

A small memory added regularly matters more than a perfect launch. One day, Sai can come here to see not only what happened as he grew up, but who was there and how many people made up his village.

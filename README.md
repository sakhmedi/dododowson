# dododowson

Official website for **dododowson** — a new-generation rap artist from Kazakhstan.
A single scrolling page: Hero → Music → Videos → Concerts → About. Trilingual (KZ / RU / EN).

No build step, no framework. Just open `index.html` in a browser.

---

## ✏️ How to update the site

**You only ever edit one file: `content.js`.** Open it in any text editor.
Change the text between the quotes, save, refresh the page. Nothing else to touch.

A few rules:
- Keep every `"quote"` and every `,` comma in place.
- Text shown in all 3 languages looks like `{ kz: "…", ru: "…", en: "…" }`.
- Links must start with `https://`.
- Dates are `YYYY-MM-DD` (e.g. `"2026-08-14"`).

### Add an album
Copy one `{ … }` block inside `albums: [ … ]` and edit the title, year, features and links.

### Add a music video
Add a block to `videos: [ … ]`. The `youtubeId` is the code after `v=` in a YouTube URL:
`youtube.com/watch?v=`**`dQw4w9WgXcQ`** → `youtubeId: "dQw4w9WgXcQ"`.
(The thumbnail is pulled from YouTube automatically; the video only loads when clicked.)

### Add a concert
Add a row to `concerts: [ … ]`. **Past dates move to “Past shows” automatically** — you never
need to delete old ones.

### Change a language / bio / tagline
Edit the matching `kz` / `ru` / `en` text. The `defaultLang` at the top sets the first-visit language.

---

## 🖼 Images (optional)

Placeholders show automatically, so images aren't required. To add real art, drop files in
the `img/` folder and point to them in `content.js`, e.g. `cover: "img/album1.jpg"`.

- Album covers: square (1:1), ~1000×1000px
- Press photo: portrait (4:5)
- `img/og.jpg`: a 1200×630px image used when the link is shared on Telegram/Instagram

---

## 🌐 Publishing it online (free)

The site is static, so it can be hosted for free on **GitHub Pages**:
1. Push this repo to GitHub.
2. Repo **Settings → Pages → Build from branch → `main` / root**.
3. Your site goes live at `https://<username>.github.io/dododowson`.

A custom domain (e.g. `dododowson.com`) can be pointed at it later.
Netlify or Vercel (drag-and-drop the folder) work the same way.

---

## Files

| File | What it is |
|------|------------|
| `content.js` | **All content + translations — the file you edit.** |
| `index.html` | Page structure (rarely touched). |
| `styles.css` | Look & feel. |
| `app.js` | Builds the sections from `content.js`. |
| `background.js` | The animated smoke background in the hero. |

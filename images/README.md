# Adding Your Photos

**8 photos total** for the other movies (2 episodes each). My FaceTime Baby has **13 photos** in its own folder.

## Required

| File | Used for |
|------|----------|
| `profile.jpg` | Nethra's profile on "Who's watching?" |
| `aarav.jpg` | (Optional) Your locked profile |
| `letter-cover.jpg` | Cover for the letter card |

## Show photos (2 per movie)

Drop pairs into `images/shows/`:

| Show | Files |
|------|-------|
| Us: The Series | `01-a.jpg`, `01-b.jpg` |
| Our Places | `places/01.jpg` through `places/23.jpg` (23 photos of us out together) |
| That Smile | `03-a.jpg`, `03-b.jpg` |
| My FaceTime Baby | `facetime/01.jpg` through `facetime/13.jpg` (13 FaceTime screenshots) |

When she taps **Play**, each movie cycles through its 2 photos with captions.

## Editing text

Open `js/catalog.js`:
- `hero.tagline` and `hero.meta` — banner text (meta says **6 Months**)
- Each show's `title`, `synopsis`, `meta`
- Each scene's `caption`
- `letter.body` — the birthday letter

## Tips

- **iPhone photos:** Export as **JPG** first — HEIC won't work in browsers
- **Format:** `.jpg`, `.jpeg`, or `.png` all work
- **Names:** Must match exactly (`01-a.jpg` not `IMG_1234.jpg`)
- **Best look:** Landscape for movie tiles, portrait works too

## Preview

Double-click `preview.command` or visit the [live site](https://verma0118.github.io/nethras-19th-birthday/).

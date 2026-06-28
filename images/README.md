# Adding Your Photos

## Required

| File | Used for |
|------|----------|
| `profile.jpg` | Nethra's profile on "Who's watching?" |
| `aarav.jpg` | (Optional) Your locked profile |
| `letter-cover.jpg` | Cover for the letter card |

## Show photos

| Show | Folder | Count |
|------|--------|-------|
| Us: The Series | `shows/us/01.jpg`–`04.jpg` | 4 |
| Our Places | `shows/places/01.jpg`–`23.jpg` | 23 |
| That Smile | `shows/smile/01.jpg`–`08.jpg` | 8 |
| My FaceTime Baby | `shows/facetime/01.jpg`–`13.jpg` | 13 |

When she taps **Play**, each show runs a fullscreen slideshow with its intro, then cycles through every photo.

## Editing text

Open `js/catalog.js`:
- `hero.tagline` and `hero.meta` — banner text (meta says **6 Months**)
- Each show's `title`, `synopsis`, `meta`, `intro`
- `letter.body` — the birthday letter

## Tips

- **iPhone photos:** Export as **JPG** first — HEIC won't work in browsers
- **Format:** `.jpg`, `.jpeg`, or `.png` all work
- **Names:** Must match exactly what's in `catalog.js`
- **No duplicates:** Each photo should only appear in one show

## Preview

Double-click `preview.command` or visit the [live site](https://verma0118.github.io/nethras-19th-birthday/).

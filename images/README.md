# Adding Your Photos

Drop your photos into these folders using the exact filenames below. Until a file exists, the site shows a colored placeholder — so you can preview the layout first, then swap in real images.

## Required first

| File | Used for |
|------|----------|
| `profile.jpg` | Nethra's "Who's watching?" avatar |
| `hero.jpg` | Big banner at the top of the home screen |
| `aarav.jpg` | (Optional) Aarav's locked profile avatar |
| `letter-cover.jpg` | Cover for the "A Letter For You" card |

## Row folders

Each row has 5 slots. Name files `01.jpg` through `05.jpg`:

- `greatest-hits/` — Our Greatest Hits
- `date-nights/` — Date Nights
- `travel/` — Travel & Adventures
- `favorites/` — My Favorite Photos of You
- `why-i-love-you/` — Why I Love You (first 4 cards; 5th is the letter)

## Editing captions & titles

Open `js/catalog.js` and edit the `title`, `caption`, and `meta` fields for each show. The letter text is at the bottom in `letter.body`.

## Tips

- **iPhone photos:** Export as **JPG** first — HEIC files will not show in browsers (Photos → Share → Save as JPG, or AirDrop to Mac and export)
- **Format:** `.jpg`, `.jpeg`, or `.png` all work (the site tries each automatically)
- **Names:** Must match exactly — `01.jpg` not `1.jpg` or `IMG_1234.jpg`
- **Size:** 1200px wide is plenty — GitHub Pages serves them as-is
- **Aspect ratio:** Portrait photos look best on the cards (Netflix poster style)
- **Hero:** Landscape/wide photos work best for the banner

## Preview locally

Double-click **`preview.command`** in the project folder (Mac), or run:

```bash
cd ~/Birthday_Present_2026
chmod +x preview.command
./preview.command
```

Do **not** open `index.html` directly from Finder — use the preview script or the live link instead.

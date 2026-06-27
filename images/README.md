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

- **Format:** JPG or PNG both work
- **Size:** 1200px wide is plenty — GitHub Pages serves them as-is
- **Aspect ratio:** Portrait photos look best on the cards (Netflix poster style)
- **Hero:** Landscape/wide photos work best for the banner

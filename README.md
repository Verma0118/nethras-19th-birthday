# Nethraflix

A Netflix-style birthday gift for Nethra's 19th — photos, captions, and a letter, hosted on GitHub Pages.

**Live site:** [verma0118.github.io/nethras-19th-birthday](https://verma0118.github.io/nethras-19th-birthday/)

## Quick start

1. Add photos — see [`images/README.md`](images/README.md) for filenames and folders
2. Edit captions and titles in [`js/catalog.js`](js/catalog.js)
3. Push to `main` — GitHub Pages updates automatically

## Local preview

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080)

## Structure

- `index.html` — page shell
- `css/styles.css` — Nethraflix styling
- `js/catalog.js` — all content (photos, captions, letter)
- `js/app.js` — interactions and modals
- `images/` — your photos

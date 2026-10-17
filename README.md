# Joshini & Siddesh — Wedding e-invitation

A mobile-first invitation that opens like a printed card. Plain HTML, CSS and a little JavaScript — no frameworks, no build step.

## Folder structure

```
wedding-invitation/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── torana.png        ← your torana (transparent, trimmed)
    ├── lamp.png          ← your hanging lamp (transparent, trimmed)
    ├── couple-art.png    ← your couple artwork (original, untouched)
    ├── couple-art.webp   ← same artwork, smaller file for faster phones
    ├── garland.svg       ← marigold + jasmine garland (drawn for this site)
    ├── flower.svg        ← marigold emblem beside the Reception details
    ├── temple.svg        ← gopuram line art in the Venue card
    ├── rangoli.svg       ← kolam pattern (cover watermark + closing)
    └── favicon.svg
```

## Where your images are used

| File | Where it appears |
|------|------------------|
| `torana.png` | Top of the cover, and again above "A Special Day, Shared With You" |
| `lamp.png` | Hangs from the centre of the cover torana (gentle sway), and small at the start of the closing section |
| `couple-art.png / .webp` | Framed under the invitation message |

## Replacing an image later

1. Keep the **same filename** and drop the new file into `assets/` — nothing else to edit.
2. **Torana / lamp:** use a transparent PNG with the empty margin trimmed. The lamp should include its chain; it hangs from the top.
3. **Couple art:** if the new picture has a different shape, edit `aspect-ratio: 2 / 3` in `style.css` (rule `.art`) and the `width`/`height` attributes in `index.html`. If its background colour differs, change `--art-paper` at the top of `style.css`.
4. If you replace `couple-art.png`, also replace or delete `couple-art.webp` (the page prefers WebP). To delete it, remove the `<source …webp>` line in `index.html`.
5. To use a real garland/flower/temple/rangoli image instead of the drawn ones, save it with the same name, e.g. `garland.png`, then change the extension where it is referenced (`index.html` and `style.css`).
6. Photos of the couple: add `assets/couple-photo.jpg` and an `<img>` with `object-fit: cover` where you want it.

## Editing text

Everything is in `index.html`. Dates, times and the Maps link are plain text there. The Maps button is the only `<a>` with `target="_blank"`.

## Putting it online (so the link works in WhatsApp)

Upload the whole folder to any static host (Netlify Drop, GitHub Pages, Cloudflare Pages), then share the link. For a nice WhatsApp preview picture, add this line in `<head>` using your full web address:
`<meta property="og:image" content="https://YOUR-SITE/assets/couple-art.png">`

## Notes

- Fonts (Cormorant Garamond, Lato, Noto Serif Kannada) load from Google Fonts; without internet the page falls back to system serif/sans fonts.
- Animations respect "reduce motion" on the visitor's device.
- The torana image is 728 px wide, so it is shown at card width (max 640 px). A higher-resolution version would look even crisper on large phones.

# YouTube Split Scroll

Splits the YouTube watch page into two independent scroll areas: the left column
(player, description, comments) and the right column (suggested videos). Scrolling
one leaves the other exactly where it was.

## Install

1. Open `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and pick this folder.
4. Open any `https://www.youtube.com/watch?v=...` page.

## Controls

- **On-page button** — a "Split scroll" pill in the bottom-right corner of the watch page.
- **Popup** — click the extension icon for the same switch plus two extras:
  - *Pin the player* keeps the video fixed at the top of its column.
  - *On-page button* hides the corner pill if you only want the popup.

Settings sync through `chrome.storage.sync`, so they follow your Chrome profile.

## Notes

- Split scrolling turns itself off in theater mode, fullscreen, and on non-watch pages;
  YouTube's normal full-page scrolling comes back automatically.
- Inner scrolls are mirrored to `window` so comment and suggestion lazy-loading keeps working.
- Layout hooks (`#columns`, `#primary`, `#secondary`) are YouTube's own IDs. If YouTube
  renames them, update the selectors in `content.css`.

## Files

| File | Role |
| --- | --- |
| `manifest.json` | Manifest V3 definition |
| `content.css` | Layout rules, all gated behind `html.yss-on` |
| `content.js` | State, watch-page detection, corner toggle |
| `popup.html` / `popup.js` | Settings panel |

# YouTube Split Scroll

A lightweight Chrome extension that splits the YouTube watch page into two
independent scroll areas — the left column (player, description, comments)
and the right column (suggested videos) — so scrolling one never moves the
other.

![Manifest Version](https://img.shields.io/badge/manifest-v3-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## ✨ Features

- **Independent scrolling** — the video/comments column and the suggested
  videos column each get their own scrollbar.
- **On-page toggle** — a "Split scroll" pill in the bottom-right corner of
  the watch page.
- **Popup controls** — click the toolbar icon for the same switch, plus:
  - **Pin the player** — keeps the video fixed at the top of its column.
  - **On-page button** — show/hide the corner pill if you only want the
    popup.
- **Synced settings** — preferences are stored with `chrome.storage.sync`,
  so they follow your Chrome profile across devices.
- **Safe by default** — automatically disables itself in theater mode,
  fullscreen, and on non-watch pages, restoring YouTube's normal scrolling.

---

## 📦 Setup & Installation Guide

### Requirements

- Google Chrome, Brave, Edge, or any other Chromium-based browser
  (Manifest V3 support required).
- No build step, no dependencies — the extension runs as-is.

### Download the latest release

Every tagged version is built and published automatically, with a ready-to-load
zip attached — no cloning or build step required.

1. Go to the **[Releases](../../releases)** page of this repository.
2. Under **Assets** on the latest release, download
   `yt-split-scroll-vX.X.X.zip`.
3. Extract the zip to a folder on your computer.
4. Open your browser's extensions page:
   - Chrome: go to `chrome://extensions`
   <!-- - Brave: go to `brave://extensions`
   - Edge: go to `edge://extensions` -->
5. Turn on **Developer mode** (top-right corner of the extensions page).
6. Click **Load unpacked** and select the extracted folder
7. Confirm it's installed — "YouTube Split Scroll" should appear in your
   extensions list with its icon. Pin it to the toolbar for quick access.
8. Open any `https://www.youtube.com/watch?v=...` page — the split-scroll
   pill will appear in the bottom-right corner automatically.

## 🎛️ Usage

| Control        | Where               | What it does                                |
| -------------- | ------------------- | ------------------------------------------- |
| Split scroll   | Corner pill / popup | Master on/off switch                        |
| Pin the player | Popup               | Keeps the video fixed while comments scroll |
| On-page button | Popup               | Shows/hides the corner pill                 |

Settings sync automatically — no save button needed.

---

## 🐞 Troubleshooting

- **Nothing happens on the watch page** — make sure you're on a URL like
  `youtube.com/watch?v=...` (not the homepage or a shorts page).
- **Extension icon is greyed out** — reload the YouTube tab after
  installing or updating the extension.
- **Layout looks broken after a YouTube update** — YouTube may have
  changed its internal element IDs; check `content.css` for outdated
  selectors.

---

## 📄 License

MIT — feel free to fork, modify, and reuse.

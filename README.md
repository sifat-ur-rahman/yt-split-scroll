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

### Option A — Download the latest release (recommended)

Every tagged version is built and published automatically, with a ready-to-load
zip attached — no cloning or build step required.

1. Go to the **[Releases](../../releases)** page of this repository.
2. Under **Assets** on the latest release, download
   `yt-split-scroll-vX.X.X.zip`.
3. Extract the zip to a folder on your computer.
4. Open your browser's extensions page:
   - Chrome: go to `chrome://extensions`
   - Brave: go to `brave://extensions`
   - Edge: go to `edge://extensions`
5. Turn on **Developer mode** (top-right corner of the extensions page).
6. Click **Load unpacked** and select the extracted folder (the one
   containing `manifest.json`).
7. Confirm it's installed — "YouTube Split Scroll" should appear in your
   extensions list with its icon. Pin it to the toolbar for quick access.
8. Open any `https://www.youtube.com/watch?v=...` page — the split-scroll
   pill will appear in the bottom-right corner automatically.

### Option B — Install from source (for developers)

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/yt-split-scroll.git
   ```
2. Follow steps 4–8 from Option A above, pointing **Load unpacked** at the
   cloned `yt-split-scroll` folder instead of an extracted zip.
3. After editing any files, return to `chrome://extensions` and click the
   refresh icon on the extension's card to reload your changes.

### Updating to a new version

New versions are published on the **[Releases](../../releases)** page.
To update: download the newer zip, extract it over (or in place of) your
existing folder, then click the refresh icon on the extension's card in
`chrome://extensions`.

---

## 🎛️ Usage

| Control        | Where               | What it does                                |
| -------------- | ------------------- | ------------------------------------------- |
| Split scroll   | Corner pill / popup | Master on/off switch                        |
| Pin the player | Popup               | Keeps the video fixed while comments scroll |
| On-page button | Popup               | Shows/hides the corner pill                 |

Settings sync automatically — no save button needed.

---

## 🗂️ Project Structure

| File                      | Role                                       |
| ------------------------- | ------------------------------------------ |
| `manifest.json`           | Manifest V3 definition                     |
| `content.css`             | Layout rules, gated behind `html.yss-on`   |
| `content.js`              | State, watch-page detection, corner toggle |
| `popup.html` / `popup.js` | Settings panel                             |
| `icons/`                  | Toolbar and store icons (16/48/128px)      |

---

## 🛠️ Notes for Developers

- Layout hooks (`#columns`, `#primary`, `#secondary`) are YouTube's own
  element IDs. If YouTube renames them, update the selectors in
  `content.css`.
- Inner scroll positions are mirrored to `window` so comment and
  suggestion-list lazy-loading keeps working correctly.
- No external dependencies or bundler — edit the files directly and
  reload the extension from `chrome://extensions`.
- **Releasing a new version:** bump `"version"` in `manifest.json`, commit,
  then tag and push:
  ```bash
  git tag -a v1.1.0 -m "Release v1.1.0"
  git push origin main --tags
  ```
  The `.github/workflows/release.yml` workflow picks up the pushed tag,
  zips the `yt-split-scroll` folder, and publishes a GitHub Release with
  the zip attached automatically — no manual packaging needed.

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

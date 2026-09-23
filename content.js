/* =========================================================
   YouTube Split Scroll — content script
   ========================================================= */

(() => {
  "use strict";

  const DEFAULTS = { enabled: true, stickyPlayer: false, showButton: true };
  let settings = { ...DEFAULTS };
  let flexy = null;
  let attrObserver = null;
  let ui = null; // { host, root, btn, label }

  /* ---------- state helpers ---------- */

  const isWatchPage = () => location.pathname === "/watch";

  function getFlexy() {
    if (flexy && flexy.isConnected) return flexy;
    flexy = document.querySelector("ytd-watch-flexy");
    return flexy;
  }

  function isBlockedMode() {
    const el = getFlexy();
    if (!el) return true;
    // Theater and fullscreen have one full-width column — nothing to split.
    return (
      el.hasAttribute("theater") ||
      el.hasAttribute("fullscreen") ||
      el.hasAttribute("hidden") ||
      !el.hasAttribute("is-two-columns_")
    );
  }

  function mastheadHeight() {
    const m = document.querySelector("#masthead-container");
    const h = m ? Math.round(m.getBoundingClientRect().height) : 0;
    return h > 20 ? h : 56;
  }

  function apply() {
    const root = document.documentElement;
    const active = settings.enabled && isWatchPage() && !isBlockedMode();

    root.style.setProperty("--yss-top", mastheadHeight() + "px");
    root.classList.toggle("yss-on", active);
    root.classList.toggle("yss-sticky-player", active && settings.stickyPlayer);

    updateButton(active);
  }

  /* Lazy loading in both columns is driven by scroll position, so mirror
     inner scrolls back to the window. */
  function bridgeScroll(e) {
    if (!document.documentElement.classList.contains("yss-on")) return;
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.id === "primary" || t.id === "secondary") {
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("resize"));
    }
  }

  /* ---------- floating toggle ---------- */

  const BUTTON_CSS = `
    :host { all: initial; }
    .pill {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 2147483000;
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 8px 14px 8px 10px;
      border: 1px solid rgba(255,255,255,.14);
      border-radius: 999px;
      background: #17181c;
      color: #f1f1f1;
      font: 500 12.5px/1 "Roboto", "Segoe UI", system-ui, sans-serif;
      letter-spacing: .01em;
      cursor: pointer;
      box-shadow: 0 6px 22px rgba(0,0,0,.38);
      transition: background .15s ease, border-color .15s ease;
    }
    .pill:hover { background: #22242a; }
    .pill:focus-visible { outline: 2px solid #62a0ff; outline-offset: 2px; }
    .glyph {
      display: grid;
      grid-template-columns: 13px 7px;
      gap: 2px;
      width: 22px;
      height: 16px;
    }
    .glyph i { border-radius: 2px; background: #5a5d66; display: block; }
    .glyph i:last-child { background: #3d4048; }
    .pill[data-on="true"] .glyph i { background: #ff3d3d; }
    .pill[data-on="true"] .glyph i:last-child { background: #7d1f1f; }
    .state { color: #9aa0a6; }
    .pill[data-on="true"] .state { color: #f1f1f1; }
  `;

  function buildButton() {
    if (ui) return ui;
    const host = document.createElement("div");
    host.id = "yss-toggle-host";
    const root = host.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = BUTTON_CSS;

    const btn = document.createElement("button");
    btn.className = "pill";
    btn.type = "button";
    btn.innerHTML =
      '<span class="glyph" aria-hidden="true"><i></i><i></i></span>' +
      '<span>Split scroll</span><span class="state"></span>';

    btn.addEventListener("click", () => {
      settings.enabled = !settings.enabled;
      chrome.storage.sync.set({ enabled: settings.enabled });
      apply();
    });

    root.append(style, btn);
    (document.body || document.documentElement).appendChild(host);

    ui = { host, root, btn, label: btn.querySelector(".state") };
    return ui;
  }

  function updateButton(active) {
    const wanted = settings.showButton && isWatchPage();
    if (!wanted) {
      if (ui) ui.host.remove();
      ui = null;
      return;
    }
    const el = buildButton();
    if (!el.host.isConnected) document.body.appendChild(el.host);
    el.btn.dataset.on = String(settings.enabled);
    el.label.textContent = settings.enabled ? "on" : "off";
    el.btn.title = settings.enabled
      ? "Split scroll is on — each column scrolls on its own"
      : "Split scroll is off — the page scrolls as one";
    el.btn.setAttribute("aria-pressed", String(settings.enabled));
    el.btn.style.opacity = active || !settings.enabled ? "1" : ".55";
  }

  /* ---------- wiring ---------- */

  function watchFlexyAttributes() {
    const el = getFlexy();
    if (!el) return;
    attrObserver?.disconnect();
    attrObserver = new MutationObserver(apply);
    attrObserver.observe(el, {
      attributes: true,
      attributeFilter: ["theater", "fullscreen", "hidden", "is-two-columns_"]
    });
  }

  function onNavigate() {
    flexy = null;
    // YouTube swaps the watch element in asynchronously.
    setTimeout(() => {
      watchFlexyAttributes();
      apply();
    }, 0);
    setTimeout(apply, 400);
    setTimeout(apply, 1200);
  }

  chrome.storage.sync.get(DEFAULTS, (stored) => {
    settings = { ...DEFAULTS, ...stored };
    onNavigate();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    for (const [k, v] of Object.entries(changes)) settings[k] = v.newValue;
    apply();
  });

  window.addEventListener("yt-navigate-finish", onNavigate);
  window.addEventListener("yt-page-data-updated", onNavigate);
  window.addEventListener("popstate", onNavigate);
  window.addEventListener("resize", apply);
  document.addEventListener("scroll", bridgeScroll, true);
  document.addEventListener("DOMContentLoaded", onNavigate);

  // Fallback for SPA URL changes that fire no event.
  let lastUrl = location.href;
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      onNavigate();
    }
  }, 700);
})();

const DEFAULTS = { enabled: true, stickyPlayer: false, showButton: true };
const fields = ["enabled", "stickyPlayer", "showButton"];

const stateText = document.getElementById("stateText");

function paint(values) {
  fields.forEach((k) => (document.getElementById(k).checked = !!values[k]));
  document.body.dataset.on = String(!!values.enabled);
  stateText.textContent = values.enabled
    ? "Each column scrolls on its own"
    : "The page scrolls as one";
}

chrome.storage.sync.get(DEFAULTS, paint);

fields.forEach((key) => {
  document.getElementById(key).addEventListener("change", (e) => {
    const patch = { [key]: e.target.checked };
    chrome.storage.sync.set(patch);
    chrome.storage.sync.get(DEFAULTS, paint);
  });
});

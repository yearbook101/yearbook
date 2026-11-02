(() => {
  const PASSWORD = "Banner2026";
  const STORAGE_KEY = "bcs-yearbook-2026";

  const gate = document.getElementById("gate");
  const app = document.getElementById("app");
  const form = document.getElementById("gate-form");
  const pw = document.getElementById("pw");
  const err = document.getElementById("gate-error");

  function unlock() {
    gate.hidden = true;
    app.hidden = false;
    document.body.classList.add("unlocked");
    // Honor deep-link hash after gate opens
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (sessionStorage.getItem(STORAGE_KEY) === "1") {
    unlock();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    err.hidden = true;
    const value = (pw.value || "").trim();
    if (value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      unlock();
      return;
    }
    err.hidden = false;
    pw.select();
  });
})();

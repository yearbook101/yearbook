(() => {
  const PASSWORD = "Banner2026";
  const STORAGE_KEY = "bcs-yearbook-2026";

  const gate = document.getElementById("gate");
  const app = document.getElementById("app");
  const form = document.getElementById("gate-form");
  const pw = document.getElementById("pw");
  const err = document.getElementById("gate-error");

  function storageGet() {
    try {
      return sessionStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function storageSet() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (_) {
      /* School browsers may block storage — unlock still works. */
    }
  }

  function unlock() {
    if (gate) {
      gate.hidden = true;
      gate.style.display = "none";
      gate.setAttribute("aria-hidden", "true");
    }
    if (app) {
      app.hidden = false;
      app.style.display = "block";
      app.removeAttribute("aria-hidden");
    }
    document.body.classList.add("unlocked");

    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }

  if (storageGet() === "1") {
    unlock();
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (err) err.hidden = true;

    const value = (pw && pw.value ? pw.value : "").trim();
    if (value.toLowerCase() === PASSWORD.toLowerCase()) {
      storageSet();
      unlock();
      return false;
    }

    if (err) {
      err.hidden = false;
      err.textContent = "Wrong password. Try again. (Banner2026)";
    }
    if (pw) {
      pw.focus();
      pw.select();
    }
    return false;
  });
})();

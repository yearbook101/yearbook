(() => {
  const PASSWORD = "Banner2026";
  const STORAGE_KEY = "bcs-yearbook-2026";

  function storageGet() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function storageSet() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (_) {}
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (_) {}
  }

  function isUnlocked() {
    return storageGet() === "1";
  }

  function homeHref() {
    const page = document.body && document.body.dataset.page;
    if (page === "home") return "./";
    if (page && page.includes("/")) return "../../";
    return "../";
  }

  function requireUnlockOrRedirect() {
    if (isUnlocked()) return true;
    const next = location.pathname.replace(/\/$/, "") || "/";
    const home = homeHref();
    location.replace(home + "?next=" + encodeURIComponent(next));
    return false;
  }

  function unlockHome() {
    const gate = document.getElementById("gate");
    const app = document.getElementById("app");
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

    const params = new URLSearchParams(location.search);
    const next = params.get("next");
    if (next && !next.includes("://") && !next.startsWith("//")) {
      let dest = next;
      if (!dest.startsWith("/")) dest = "./" + dest.replace(/^\.\//, "");
      if (!dest.includes(".") && !dest.endsWith("/")) dest += "/";
      location.replace(dest);
      return;
    }
  }

  const page = document.body ? document.body.dataset.page : "home";

  if (page === "home") {
    if (isUnlocked()) {
      unlockHome();
    }

    const form = document.getElementById("gate-form");
    const pw = document.getElementById("pw");
    const err = document.getElementById("gate-error");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (err) err.hidden = true;

      const value = (pw && pw.value ? pw.value : "").trim();
      if (value.toLowerCase() === PASSWORD.toLowerCase()) {
        storageSet();
        unlockHome();
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
    return;
  }

  // Category / event pages
  if (!requireUnlockOrRedirect()) return;
  document.body.classList.add("unlocked");
  const app = document.getElementById("app");
  if (app) {
    app.hidden = false;
    app.style.display = "block";
  }
})();

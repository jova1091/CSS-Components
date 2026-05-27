export function initPage() {
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const htmlEl = document.documentElement;
      const next = htmlEl.dataset.theme === "dark" ? "light" : "dark";
      htmlEl.dataset.theme = next;
      localStorage.setItem("theme", next);
    });
  }
}

export async function initNav() {
  const [{ init: initNavbar }, { init: initDropdown }] = await Promise.all([
    import("./components/navbar.js"),
    import("./components/dropdown.js"),
  ]);
  initNavbar();
  initDropdown();
}

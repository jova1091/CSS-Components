const htmlEl = document.documentElement;

// Restore saved theme
if (localStorage.getItem("theme") === "dark") {
  htmlEl.dataset.theme = "dark";
} else if (localStorage.getItem("theme") === "light") {
  htmlEl.dataset.theme = "light";
}

export async function injectNav() {
  if (document.getElementById("navbar-menu")) return;

  const resp = await fetch("assets/includes/nav.html");
  const html = await resp.text();
  document.body.insertAdjacentHTML("afterbegin", html);

  // Theme toggle
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = htmlEl.dataset.theme === "dark" ? "light" : "dark";
      htmlEl.dataset.theme = next;
      localStorage.setItem("theme", next);
    });
  }

  // Initialize navbar and dropdown interactivity
  const [{ init: initNavbar }, { init: initDropdown }] = await Promise.all([
    import("./components/navbar.js"),
    import("./components/dropdown.js"),
  ]);
  initNavbar();
  initDropdown();
}

export async function injectFooter() {
  if (document.querySelector("footer.container-full")) return;

  const resp = await fetch("assets/includes/footer.html");
  const html = await resp.text();
  document.body.insertAdjacentHTML("beforeend", html);
}

export default injectNav;

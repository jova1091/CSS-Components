import initNavbar from "./components/navbar.js";
import initDropdowns from "./components/dropdown.js";
import initTabs from "./components/tabs.js";
import initModals from "./components/modal.js";

// Simple Theme Toggler
const themeToggleBtn = document.getElementById("theme-toggle");
const htmlEl = document.getElementsByTagName("html")[0];

themeToggleBtn.addEventListener("click", () => {
  if (htmlEl.dataset.theme === "dark") {
    htmlEl.dataset.theme = "light";
    localStorage.setItem("theme", "light");
  } else {
    htmlEl.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
  }
});

// Check for saved theme in localStorage
if (localStorage.getItem("theme") === "dark") {
  htmlEl.dataset.theme = "dark";
} else {
  htmlEl.dataset.theme = "light";
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initDropdowns();
  initTabs();
  initModals();
});

import initNavbar from "./components/navbar.js";
import initDropdowns from "./components/dropdown.js";
import initTabs from "./components/tabs.js";
import initModals from "./components/modal.js";
import initAccordions from "./components/accordion.js";
import Toasts from "./components/toasts.js";

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
  initAccordions();

  // Inicializar disparadores de Toasts del Showcase
  const btnSuccess = document.getElementById("btn-toast-success");
  const btnInfo = document.getElementById("btn-toast-info");
  const btnWarning = document.getElementById("btn-toast-warning");
  const btnDanger = document.getElementById("btn-toast-danger");

  if (btnSuccess) {
    btnSuccess.addEventListener("click", () => {
      Toasts.show("Proceso Exitoso", "El archivo se ha guardado correctamente.", "success");
    });
  }
  if (btnInfo) {
    btnInfo.addEventListener("click", () => {
      Toasts.show("Información de Sistema", "Se han aplicado las actualizaciones automáticas.", "info");
    });
  }
  if (btnWarning) {
    btnWarning.addEventListener("click", () => {
      Toasts.show("Espacio Casi Lleno", "El uso de almacenamiento está alcanzando el límite.", "warning");
    });
  }
  if (btnDanger) {
    btnDanger.addEventListener("click", () => {
      Toasts.show("Error de Servidor", "No se ha podido procesar la solicitud.", "danger");
    });
  }
});



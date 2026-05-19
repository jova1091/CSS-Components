import initNavbar from "./components/navbar.js";
import initDropdowns from "./components/dropdown.js";
import initTabs from "./components/tabs.js";
import initModals from "./components/modal.js";
import initAccordions from "./components/accordion.js";
import initTooltips from "./components/tooltips.js";
import initFloatLabels from "./components/float-labels.js";
import initPopovers from "./components/popovers.js";
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
  initTooltips();
  initFloatLabels();
  initPopovers();

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

  // Demostración de sacudida ante error (Shake Animation)
  const btnTriggerShake = document.getElementById("btn-trigger-shake");
  const shakeDemoInput = document.getElementById("shakeDemoInput");
  if (btnTriggerShake && shakeDemoInput) {
    btnTriggerShake.addEventListener("click", () => {
      // Quitar clase si ya existe para poder reiniciar la animación
      shakeDemoInput.classList.remove("is-invalid");
      // Forzar reflow para reiniciar la animación CSS
      void shakeDemoInput.offsetWidth;
      // Añadir la clase para activar la sacudida
      shakeDemoInput.classList.add("is-invalid");
      
      // Remover después de que termine la animación
      setTimeout(() => {
        shakeDemoInput.classList.remove("is-invalid");
      }, 1500);
    });
  }
});



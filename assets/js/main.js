import ComponentLoader from "./component-loader.js";
import Toasts from "./components/toasts.js";

const themeToggleBtn = document.getElementById("theme-toggle");
const htmlEl = document.getElementsByTagName("html")[0];

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    if (htmlEl.dataset.theme === "dark") {
      htmlEl.dataset.theme = "light";
      localStorage.setItem("theme", "light");
    } else {
      htmlEl.dataset.theme = "dark";
      localStorage.setItem("theme", "dark");
    }
  });
}

if (localStorage.getItem("theme") === "dark") {
  htmlEl.dataset.theme = "dark";
} else {
  htmlEl.dataset.theme = "light";
}

document.addEventListener("DOMContentLoaded", () => {
  ComponentLoader.loadAll();

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

  const btnTriggerShake = document.getElementById("btn-trigger-shake");
  const shakeDemoInput = document.getElementById("shakeDemoInput");
  if (btnTriggerShake && shakeDemoInput) {
    btnTriggerShake.addEventListener("click", () => {
      shakeDemoInput.classList.remove("is-invalid");
      void shakeDemoInput.offsetWidth;
      shakeDemoInput.classList.add("is-invalid");

      setTimeout(() => {
        shakeDemoInput.classList.remove("is-invalid");
      }, 1500);
    });
  }
});

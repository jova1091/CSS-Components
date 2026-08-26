import ComponentLoader from "../component-loader.js";
import { Toasts } from "../components/toasts.js";

ComponentLoader.load("tooltips");
ComponentLoader.load("popovers");
ComponentLoader.startObserver();

let currentPosition = "top-right";

const bind = (id, title, msg, type) =>
  document.getElementById(id)?.addEventListener("click", () => Toasts.show(title, msg, type, 4000, currentPosition));
bind("btn-toast-success", "Éxito", "Operación completada correctamente.", "success");
bind("btn-toast-info", "Información", "Este es un mensaje informativo.", "info");
bind("btn-toast-warning", "Advertencia", "Revise los datos ingresados.", "warning");
bind("btn-toast-danger", "Error", "No se pudo completar la operación.", "danger");

document.querySelectorAll(".toast-pos-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentPosition = btn.dataset.pos;
    Toasts.show("Posición", `Toast en ${currentPosition}`, "info", 3000, currentPosition);
  });
});

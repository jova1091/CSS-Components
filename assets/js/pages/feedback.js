import ComponentLoader from "../component-loader.js";
import { Toasts } from "../components/toasts.js";

ComponentLoader.load("tooltips");
ComponentLoader.load("popovers");
ComponentLoader.startObserver();

const bind = (id, title, msg, type) =>
  document.getElementById(id)?.addEventListener("click", () => Toasts.show(title, msg, type));
bind("btn-toast-success", "Éxito", "Operación completada correctamente.", "success");
bind("btn-toast-info", "Información", "Este es un mensaje informativo.", "info");
bind("btn-toast-warning", "Advertencia", "Revise los datos ingresados.", "warning");
bind("btn-toast-danger", "Error", "No se pudo completar la operación.", "danger");

/**
 * Initializes native <dialog> modals.
 * Handles triggers, close buttons, and backdrop clicks.
 */
export default function initModals() {
  // 1. Abrir Modal
  document.querySelectorAll('[data-toggle="modal"]').forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.getAttribute("data-target");
      const dialog = document.querySelector(targetId);
      if (dialog) {
        dialog.showModal(); // Método nativo que activa el backdrop y el focus trap
      }
    });
  });

  // 2. Cerrar Modal (Botones dentro del modal)
  document.querySelectorAll('[data-dismiss="modal"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = btn.closest("dialog");
      if (dialog) {
        dialog.close(); // Método nativo
      }
    });
  });

  // 3. Cerrar al hacer clic en el Backdrop (Click Outside)
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
      // El evento click en el backdrop se propaga al dialog.
      // Verificamos si el clic ocurrió fuera de los límites del contenido del dialog.
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        dialog.close();
      }
    });
  });
}

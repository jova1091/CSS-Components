/**
 * Initializes native <dialog> modals.
 * Handles triggers, close buttons, backdrop clicks, and focus return.
 */
export default function initModals() {
  const closeModal = (dialog) => {
    if (!dialog || !dialog.open) return;
    
    dialog.classList.add("closing");
    
    const handleTransitionEnd = (e) => {
      if (e.target === dialog) {
        dialog.close();
        dialog.classList.remove("closing");
        dialog.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
    
    dialog.addEventListener("transitionend", handleTransitionEnd);
    
    // Fallback de seguridad
    setTimeout(() => {
      if (dialog.classList.contains("closing")) {
        dialog.close();
        dialog.classList.remove("closing");
      }
    }, 400);
  };

  // 1. Abrir Modal y registrar el elemento trigger
  document.querySelectorAll('[data-toggle="modal"]').forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.getAttribute("data-target");
      const dialog = document.querySelector(targetId);
      if (dialog) {
        // Guardamos el elemento que activó el modal para devolverle el foco
        dialog._triggerEl = trigger;
        dialog.showModal(); // Método nativo (activa backdrop y focus trap)
      }
    });
  });

  // 2. Cerrar Modal (Botones dentro del modal)
  document.querySelectorAll('[data-dismiss="modal"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = btn.closest("dialog");
      if (dialog) {
        closeModal(dialog);
      }
    });
  });

  // 3. Cerrar al hacer clic en el Backdrop (Click Outside)
  // Y registrar el listener del evento 'close' para restaurar el foco de forma segura
  document.querySelectorAll("dialog").forEach((dialog) => {
    // Cerrar al hacer clic fuera del rect del diálogo (en el backdrop)
    dialog.addEventListener("click", (e) => {
      if (dialog.classList.contains("closing")) return;

      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        closeModal(dialog);
      }
    });

    // Evento nativo close: Se ejecuta independientemente de cómo se cierre
    // (botón de cerrar, escape o click en backdrop)
    dialog.addEventListener("close", () => {
      dialog.classList.remove("closing");
      if (dialog._triggerEl) {
        dialog._triggerEl.focus();
        delete dialog._triggerEl;
      }
    });
  });
}


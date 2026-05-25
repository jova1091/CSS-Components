export function init(container = document) {
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

    setTimeout(() => {
      if (dialog.classList.contains("closing")) {
        dialog.close();
        dialog.classList.remove("closing");
      }
    }, 400);
  };

  container.querySelectorAll('[data-toggle="modal"]').forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.getAttribute("data-target");
      const dialog = document.querySelector(targetId);
      if (dialog) {
        dialog._triggerEl = trigger;
        dialog.showModal();
      }
    });
  });

  container.querySelectorAll('[data-dismiss="modal"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = btn.closest("dialog");
      if (dialog) {
        closeModal(dialog);
      }
    });
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
      if (dialog.classList.contains("closing")) return;

      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        closeModal(dialog);
      }
    });

    dialog.addEventListener("close", () => {
      dialog.classList.remove("closing");
      if (dialog._triggerEl) {
        dialog._triggerEl.focus();
        delete dialog._triggerEl;
      }
    });
  });
}

export default init;

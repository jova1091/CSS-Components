export function init(container = document) {
  container.querySelectorAll(".chip-close").forEach((btn) => {
    if (btn._chipInit) return;
    btn._chipInit = true;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const chip = btn.closest(".chip");
      if (!chip) return;

      chip.dispatchEvent(new CustomEvent("chip-remove", {
        bubbles: true,
        detail: { chip }
      }));

      chip.style.transition = "opacity 0.15s ease, transform 0.15s ease";
      chip.style.opacity = "0";
      chip.style.transform = "scale(0.85)";

      setTimeout(() => {
        if (chip.parentNode) {
          chip.parentNode.removeChild(chip);
        }
      }, 160);
    });
  });
}

export default init;

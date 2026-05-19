/**
 * Initializes float labels behavior for form controls.
 * Ensures select elements and prefilled values trigger label transitions.
 */
export default function initFloatLabels() {
  const formFloats = document.querySelectorAll(".form-float");

  formFloats.forEach((container) => {
    const input = container.querySelector(".form-control");
    if (!input) return;

    const checkValue = () => {
      if (input.value && input.value.trim() !== "") {
        input.classList.add("has-value");
      } else {
        input.classList.remove("has-value");
      }
    };

    // Validar valor inicial (autocompletado o precargado)
    checkValue();

    // Escuchar eventos
    input.addEventListener("input", checkValue);
    input.addEventListener("change", checkValue);
    input.addEventListener("blur", checkValue);
  });
}

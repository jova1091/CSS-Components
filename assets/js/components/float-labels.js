export function init(container = document) {
  const formFloats = container.querySelectorAll(".form-float");

  formFloats.forEach((formFloat) => {
    const input = formFloat.querySelector(".form-control");
    if (!input) return;

    const checkValue = () => {
      if (input.value && input.value.trim() !== "") {
        input.classList.add("has-value");
      } else {
        input.classList.remove("has-value");
      }
    };

    checkValue();

    input.addEventListener("input", checkValue);
    input.addEventListener("change", checkValue);
    input.addEventListener("blur", checkValue);
  });
}

export default init;

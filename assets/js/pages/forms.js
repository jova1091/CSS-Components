import ComponentLoader from "../component-loader.js";

ComponentLoader.load("float-labels");
ComponentLoader.startObserver();

const btnTriggerShake = document.getElementById("btn-trigger-shake");
const shakeDemoInput = document.getElementById("shakeDemoInput");
if (btnTriggerShake && shakeDemoInput) {
  btnTriggerShake.addEventListener("click", () => {
    shakeDemoInput.classList.remove("is-invalid");
    void shakeDemoInput.offsetWidth;
    shakeDemoInput.classList.add("is-invalid");
    setTimeout(() => { shakeDemoInput.classList.remove("is-invalid"); }, 1500);
  });
}

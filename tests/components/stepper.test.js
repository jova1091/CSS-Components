import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/stepper.js";

function createStepper() {
  const el = document.createElement("div");
  el.innerHTML = `
    <div class="stepper">
      <div class="step step--active" data-step="0">
        <div class="step-marker">1</div>
        <div class="step-label">Step 1</div>
      </div>
      <div class="step" data-step="1">
        <div class="step-marker">2</div>
        <div class="step-label">Step 2</div>
      </div>
      <div class="step" data-step="2">
        <div class="step-marker">3</div>
        <div class="step-label">Step 3</div>
      </div>
    </div>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Stepper", () => {
  it("init finds stepper elements", () => {
    const el = createStepper();
    init(el);
    const stepper = el.querySelector(".stepper");
    expect(stepper).toBeTruthy();
    el.remove();
  });

  it("goTo method is attached to DOM element", () => {
    const el = createStepper();
    init(el);
    const stepper = el.querySelector(".stepper");
    expect(typeof stepper.goTo).toBe("function");
    el.remove();
  });

  it("goTo changes active step", () => {
    const el = createStepper();
    init(el);
    const stepper = el.querySelector(".stepper");
    stepper.goTo(1);
    const steps = el.querySelectorAll(".step");
    expect(steps[1].classList.contains("step--active")).toBe(true);
    expect(steps[0].classList.contains("step--completed")).toBe(true);
    el.remove();
  });

  it("goTo clamps to valid range", () => {
    const el = createStepper();
    init(el);
    const stepper = el.querySelector(".stepper");
    stepper.goTo(10);
    const steps = el.querySelectorAll(".step");
    expect(steps[2].classList.contains("step--active")).toBe(true);
    el.remove();
  });
});

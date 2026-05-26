export function init(container = document) {
  container.querySelectorAll(".stepper").forEach((stepper) => {
    if (stepper._stepperInit) return;
    stepper._stepperInit = true;

    const steps = Array.from(stepper.querySelectorAll(".step[data-step]"));
    if (steps.length === 0) return;

    const getPanels = () => {
      const stepperId = stepper.id;
      if (!stepperId) return [];
      const panelContainer = stepper.parentElement;
      return Array.from(panelContainer.querySelectorAll(`.step-panel[data-step]`));
    };

    const goTo = (index) => {
      const targetStep = Math.max(0, Math.min(index, steps.length - 1));

      steps.forEach((step, i) => {
        step.classList.remove("step--active", "step--completed", "step--error");
        if (i < targetStep) {
          step.classList.add("step--completed");
        } else if (i === targetStep) {
          step.classList.add("step--active");
        }
      });

      const panels = getPanels();
      panels.forEach((panel) => {
        const panelStep = parseInt(panel.getAttribute("data-step"), 10);
        panel.classList.toggle("step-panel--active", panelStep === targetStep + 1);
      });

      stepper.setAttribute("data-step", targetStep + 1);

      stepper.dispatchEvent(new CustomEvent("stepper-change", {
        bubbles: true,
        detail: { step: targetStep + 1, total: steps.length }
      }));
    };

    steps.forEach((step) => {
      step.addEventListener("click", () => {
        const stepIndex = parseInt(step.getAttribute("data-step"), 10) - 1;
        goTo(stepIndex);
      });
    });

    const initial = parseInt(stepper.getAttribute("data-step"), 10) || 1;
    goTo(initial - 1);

    stepper.goTo = goTo;
  });
}

export default init;

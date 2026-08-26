import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/tooltips.js";

function createTooltip() {
  const el = document.createElement("div");
  el.innerHTML = `
    <span data-toggle="tooltip" title="Tooltip text">Hover me</span>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Tooltips", () => {
  it("init finds tooltip elements", () => {
    const el = createTooltip();
    init(el);
    const trigger = el.querySelector("[data-toggle='tooltip']");
    expect(trigger).toBeTruthy();
    el.remove();
  });

  it("mouseenter creates tooltip element", () => {
    const el = createTooltip();
    init(el);
    const trigger = el.querySelector("[data-toggle='tooltip']");
    trigger.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    const tooltip = document.querySelector("[role='tooltip']");
    expect(tooltip).toBeTruthy();
    trigger.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    el.remove();
  });
});

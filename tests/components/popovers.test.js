import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/popovers.js";

function createPopover() {
  const el = document.createElement("div");
  el.innerHTML = `
    <button data-toggle="popover" title="Test Popover" data-content="Popover body" data-placement="right">Toggle</button>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Popovers", () => {
  it("init finds popover triggers", () => {
    const el = createPopover();
    init(el);
    const trigger = el.querySelector("[data-toggle='popover']");
    expect(trigger).toBeTruthy();
    el.remove();
  });

  it("click toggle creates popover element", () => {
    const el = createPopover();
    init(el);
    const trigger = el.querySelector("[data-toggle='popover']");
    trigger.click();
    const popover = document.querySelector("[role='tooltip']");
    expect(popover).toBeTruthy();
    trigger.click();
    el.remove();
  });
});

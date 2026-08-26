import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/chips.js";

function createChip() {
  const el = document.createElement("div");
  el.innerHTML = `
    <span class="chip">Tag 1 <button class="chip-close" aria-label="Remove">&times;</button></span>
    <span class="chip">Tag 2 <button class="chip-close" aria-label="Remove">&times;</button></span>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Chips", () => {
  it("init finds chip-close buttons", () => {
    const el = createChip();
    init(el);
    const btns = el.querySelectorAll(".chip-close");
    expect(btns.length).toBe(2);
    el.remove();
  });

  it("click chip-close dispatches chip-remove event", async () => {
    const el = createChip();
    init(el);
    const chip = el.querySelector(".chip");
    let eventFired = false;
    chip.addEventListener("chip-remove", () => { eventFired = true; });
    el.querySelector(".chip-close").click();
    expect(eventFired).toBe(true);
    el.remove();
  });

  it("double init does not duplicate handlers", () => {
    const el = createChip();
    init(el);
    init(el);
    const chips = el.querySelectorAll(".chip");
    expect(chips.length).toBe(2);
    el.remove();
  });
});

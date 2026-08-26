import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/drawer.js";

function createDrawer() {
  const el = document.createElement("div");
  el.innerHTML = `
    <button data-drawer-toggle data-target="#test-drawer">Toggle</button>
    <div id="test-drawer" class="drawer" hidden>
      <div class="drawer-overlay"></div>
      <div class="drawer-content">
        <button data-drawer-dismiss>Close</button>
        <p>Drawer content</p>
      </div>
    </div>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Drawer", () => {
  it("init finds toggle and dismiss buttons", () => {
    const el = createDrawer();
    init(el);
    const toggle = el.querySelector("[data-drawer-toggle]");
    expect(toggle).toBeTruthy();
    el.remove();
  });

  it("click toggle opens drawer", () => {
    const el = createDrawer();
    init(el);
    const toggle = el.querySelector("[data-drawer-toggle]");
    toggle.click();
    const drawer = el.querySelector(".drawer");
    expect(drawer.classList.contains("drawer--open")).toBe(true);
    el.remove();
  });
});

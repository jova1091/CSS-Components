import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/dropdown.js";

function createDropdown() {
  const el = document.createElement("div");
  el.className = "dropdown";
  el.innerHTML = `
    <button class="btn dropdown-toggle" aria-haspopup="true" aria-expanded="false">Menu</button>
    <div class="dropdown-menu">
      <button class="dropdown-item">Action 1</button>
      <button class="dropdown-item">Action 2</button>
    </div>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Dropdown", () => {
  it("init sets ARIA attributes", () => {
    const el = createDropdown();
    init(el);
    const toggle = el.querySelector(".dropdown-toggle");
    expect(toggle.getAttribute("aria-haspopup")).toBe("true");
    el.remove();
  });

  it("click toggle opens dropdown", () => {
    const el = createDropdown();
    init(el);
    const toggle = el.querySelector(".dropdown-toggle");
    toggle.click();
    const menu = el.querySelector(".dropdown-menu");
    expect(menu.classList.contains("show")).toBe(true);
    el.remove();
  });

  it("click item closes dropdown", () => {
    const el = createDropdown();
    init(el);
    const toggle = el.querySelector(".dropdown-toggle");
    toggle.click();
    const item = el.querySelector(".dropdown-item");
    item.click();
    const menu = el.querySelector(".dropdown-menu");
    expect(menu.classList.contains("show")).toBe(false);
    el.remove();
  });
});

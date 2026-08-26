import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/combobox.js";

function createCombobox() {
  const el = document.createElement("div");
  el.className = "combobox";
  el.innerHTML = `
    <input type="text" class="combobox-input" placeholder="Search..." />
    <div class="combobox-dropdown">
      <div class="combobox-option" data-value="opt1">Option 1</div>
      <div class="combobox-option" data-value="opt2">Option 2</div>
      <div class="combobox-option" data-value="opt3">Option 3</div>
    </div>
    <div class="combobox-chips"></div>
    <button class="combobox-clear" hidden>×</button>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Combobox", () => {
  it("init finds combobox elements", () => {
    const el = createCombobox();
    init(el);
    const input = el.querySelector(".combobox-input");
    expect(input).toBeTruthy();
    el.remove();
  });

  it("init works when container is the combobox itself", () => {
    const el = createCombobox();
    init(el);
    const input = el.querySelector(".combobox-input");
    expect(input).toBeTruthy();
    el.remove();
  });

  it("focus input opens dropdown", () => {
    const el = createCombobox();
    init(el);
    const input = el.querySelector(".combobox-input");
    input.focus();
    input.dispatchEvent(new Event("input"));
    const dropdown = el.querySelector(".combobox-dropdown");
    expect(el.getAttribute("data-open")).toBe("true");
    el.remove();
  });

  it("click option selects it", () => {
    const el = createCombobox();
    init(el);
    const input = el.querySelector(".combobox-input");
    input.focus();
    input.dispatchEvent(new Event("input"));
    const option = el.querySelector(".combobox-option");
    option.click();
    expect(input.value).toBe("Option 1");
    el.remove();
  });
});

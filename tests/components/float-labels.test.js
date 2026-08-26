import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/float-labels.js";

function createFloatLabel() {
  const el = document.createElement("div");
  el.innerHTML = `
    <div class="form-float">
      <input type="text" class="form-control" placeholder=" " />
      <label>Email</label>
    </div>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Float Labels", () => {
  it("init finds form-float elements", () => {
    const el = createFloatLabel();
    init(el);
    const float = el.querySelector(".form-float");
    expect(float).toBeTruthy();
    el.remove();
  });

  it("input with value gets has-value class", () => {
    const el = createFloatLabel();
    const input = el.querySelector("input");
    input.value = "test";
    init(el);
    expect(input.classList.contains("has-value")).toBe(true);
    el.remove();
  });

  it("empty input does not get has-value class", () => {
    const el = createFloatLabel();
    const input = el.querySelector("input");
    input.value = "";
    init(el);
    expect(input.classList.contains("has-value")).toBe(false);
    el.remove();
  });
});

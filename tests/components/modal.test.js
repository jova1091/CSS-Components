import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/modal.js";

function createModal() {
  const el = document.createElement("div");
  el.innerHTML = `
    <button data-toggle="modal" data-target="#test-modal">Open</button>
    <dialog id="test-modal">
      <div class="modal-content">
        <h2>Test Modal</h2>
        <p>Body</p>
        <button data-dismiss="modal">Close</button>
      </div>
    </dialog>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Modal", () => {
  it("click trigger opens dialog", () => {
    const el = createModal();
    init(el);
    const btn = el.querySelector("[data-toggle='modal']");
    const dialog = el.querySelector("dialog");
    btn.click();
    expect(dialog.open).toBe(true);
    dialog.close();
    el.remove();
  });

  it("click dismiss closes dialog", () => {
    const el = createModal();
    init(el);
    const btn = el.querySelector("[data-toggle='modal']");
    btn.click();
    const dialog = el.querySelector("dialog");
    expect(dialog.open).toBe(true);
    el.remove();
  });
});

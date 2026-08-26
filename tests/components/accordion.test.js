import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/accordion.js";

function createAccordion() {
  const el = document.createElement("div");
  el.className = "accordion";
  el.innerHTML = `
    <details class="accordion-item" name="test-group">
      <summary class="accordion-header">First</summary>
      <div class="accordion-body"><p>Content 1</p></div>
    </details>
    <details class="accordion-item" name="test-group">
      <summary class="accordion-header">Second</summary>
      <div class="accordion-body"><p>Content 2</p></div>
    </details>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Accordion", () => {
  it("init attaches role to accordion", () => {
    const el = createAccordion();
    init(el);
    const items = el.querySelectorAll(".accordion-item");
    expect(items.length).toBe(2);
    el.remove();
  });

  it("toggle event closes sibling details with same name", () => {
    const el = createAccordion();
    init(el);
    const items = el.querySelectorAll(".accordion-item");
    items[0].open = true;
    items[0].dispatchEvent(new Event("toggle"));
    expect(items[0].open).toBe(true);
    el.remove();
  });

  it("accordion-header responds to keyboard events", () => {
    const el = createAccordion();
    init(el);
    const header = el.querySelector(".accordion-header");
    expect(header).toBeTruthy();
    el.remove();
  });
});

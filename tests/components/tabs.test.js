import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/tabs.js";

function createTabs() {
  const el = document.createElement("div");
  el.innerHTML = `
    <div role="tablist">
      <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">Tab 1</button>
      <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">Tab 2</button>
    </div>
    <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">Content 1</div>
    <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>Content 2</div>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Tabs", () => {
  it("init sets up tabs", () => {
    const el = createTabs();
    init(el);
    const tabs = el.querySelectorAll("[role='tab']");
    expect(tabs.length).toBe(2);
    el.remove();
  });

  it("click inactive tab activates it", () => {
    const el = createTabs();
    init(el);
    const tab2 = el.querySelector("#tab-2");
    tab2.click();
    expect(tab2.getAttribute("aria-selected")).toBe("true");
    const panel2 = el.querySelector("#panel-2");
    expect(panel2.hidden).toBe(false);
    el.remove();
  });

  it("active tab has tabindex 0", () => {
    const el = createTabs();
    init(el);
    const tab1 = el.querySelector("#tab-1");
    expect(tab1.getAttribute("tabindex")).toBe("0");
    el.remove();
  });
});

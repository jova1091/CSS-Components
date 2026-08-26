import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/tree-view.js";

function createTreeView() {
  const el = document.createElement("div");
  el.className = "tree-view";
  el.innerHTML = `
    <div class="tree-item" data-expanded="true">
      <div class="tree-item-content" tabindex="0">Root</div>
      <div class="tree-group">
        <div class="tree-group-inner">
          <div class="tree-item">
            <div class="tree-item-content" tabindex="0">Child 1</div>
          </div>
          <div class="tree-item">
            <div class="tree-item-content" tabindex="0">Child 2</div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Tree View", () => {
  it("init sets role=tree", () => {
    const el = createTreeView();
    init(el);
    expect(el.getAttribute("role")).toBe("tree");
    el.remove();
  });

  it("click on tree-item-content selects item", () => {
    const el = createTreeView();
    init(el);
    const content = el.querySelector(".tree-item-content");
    content.click();
    const item = content.closest(".tree-item");
    expect(item.getAttribute("data-selected")).toBe("true");
    el.remove();
  });

  it("click toggles data-expanded on items with children", () => {
    const el = createTreeView();
    init(el);
    const content = el.querySelector(".tree-item-content");
    const item = content.closest(".tree-item");
    expect(item.getAttribute("data-expanded")).toBe("true");
    content.click();
    expect(item.getAttribute("data-expanded")).toBe("false");
    content.click();
    expect(item.getAttribute("data-expanded")).toBe("true");
    el.remove();
  });

  it("init works when container is the tree-view itself", () => {
    const el = createTreeView();
    init(el);
    expect(el.getAttribute("role")).toBe("tree");
    el.remove();
  });
});

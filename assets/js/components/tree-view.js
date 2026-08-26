export function init(container = document) {
  const trees = new Set(container.querySelectorAll(".tree-view"));
  if (container.classList?.contains("tree-view")) trees.add(container);

  trees.forEach((tree) => {
    tree.setAttribute("role", "tree");

    tree.addEventListener("click", (e) => {
      const content = e.target.closest(".tree-item-content");
      if (!content) return;

      const item = content.closest(".tree-item");
      if (!item) return;

      const group = item.querySelector(":scope > .tree-group");

      if (group) {
        const expanded = item.getAttribute("data-expanded") === "true";
        item.setAttribute("data-expanded", String(!expanded));
        item.setAttribute("aria-expanded", String(!expanded));
      }

      tree.querySelectorAll(".tree-item[data-selected]").forEach((el) => {
        el.removeAttribute("data-selected");
      });
      item.setAttribute("data-selected", "true");
    });

    tree.addEventListener("keydown", (e) => {
      const focused = tree.querySelector(".tree-item-content:focus");
      if (!focused) return;

      const currentItem = focused.closest(".tree-item");
      const allItems = Array.from(tree.querySelectorAll(".tree-item-content"));
      const currentIndex = allItems.indexOf(focused);

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const next = allItems[currentIndex + 1];
          if (next) next.focus();
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prev = allItems[currentIndex - 1];
          if (prev) prev.focus();
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          const group = currentItem.querySelector(":scope > .tree-group");
          if (group) {
            const expanded = currentItem.getAttribute("data-expanded") === "true";
            if (!expanded) {
              currentItem.setAttribute("data-expanded", "true");
              currentItem.setAttribute("aria-expanded", "true");
            } else {
              const firstChild = group.querySelector(".tree-item-content");
              if (firstChild) firstChild.focus();
            }
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const group = currentItem.querySelector(":scope > .tree-group");
          const expanded = currentItem.getAttribute("data-expanded") === "true";
          if (group && expanded) {
            currentItem.setAttribute("data-expanded", "false");
            currentItem.setAttribute("aria-expanded", "false");
          } else {
            const parentItem = currentItem.parentElement?.closest(".tree-item");
            if (parentItem) {
              const parentContent = parentItem.querySelector(":scope > .tree-item-content");
              if (parentContent) parentContent.focus();
            }
          }
          break;
        }
        case "Home": {
          e.preventDefault();
          if (allItems.length) allItems[0].focus();
          break;
        }
        case "End": {
          e.preventDefault();
          if (allItems.length) allItems[allItems.length - 1].focus();
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          focused.click();
          break;
        }
      }
    });
  });
}

export default init;

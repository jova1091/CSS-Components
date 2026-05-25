export function init(container = document) {
  const tabLists = container.querySelectorAll('[role="tablist"]');

  tabLists.forEach((tabList) => {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = getAssociatedPanels(tabs);

    tabList.addEventListener("click", (e) => {
      const clickedTab = e.target.closest('[role="tab"]');
      if (!clickedTab) return;
      activateTab(clickedTab, tabs, panels);
    });

    tabList.addEventListener("keydown", (e) => {
      const currentTab = e.target.closest('[role="tab"]');
      if (!currentTab || !tabs.includes(currentTab)) return;

      const isVertical = tabList.getAttribute("aria-orientation") === "vertical";
      const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
      const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";

      let newIndex;

      switch (e.key) {
        case nextKey:
          e.preventDefault();
          newIndex = (tabs.indexOf(currentTab) + 1) % tabs.length;
          tabs[newIndex].focus();
          break;
        case prevKey:
          e.preventDefault();
          newIndex = (tabs.indexOf(currentTab) - 1 + tabs.length) % tabs.length;
          tabs[newIndex].focus();
          break;
        case "Home":
          e.preventDefault();
          tabs[0].focus();
          break;
        case "End":
          e.preventDefault();
          tabs[tabs.length - 1].focus();
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          activateTab(currentTab, tabs, panels);
          break;
      }
    });
  });
}

function activateTab(tabToActivate, allTabs, allPanels) {
  allTabs.forEach((tab) => {
    const isSelected = tab === tabToActivate;
    tab.setAttribute("aria-selected", isSelected);
    tab.setAttribute("tabindex", isSelected ? "0" : "-1");
  });

  allPanels.forEach((panel) => {
    const isAssociatedPanel = panel.getAttribute("aria-labelledby") === tabToActivate.id;
    panel.hidden = !isAssociatedPanel;
  });
}

function getAssociatedPanels(tabs) {
  return tabs.map((tab) => {
    const panelId = tab.getAttribute("aria-controls");
    return document.getElementById(panelId);
  });
}

export default init;

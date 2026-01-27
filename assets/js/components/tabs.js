/**
 * Initializes accessible tab components on the page.
 * Follows the ARIA Authoring Practices Guide for Tabs.
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
 */
export default function initTabs() {
  const tabLists = document.querySelectorAll('[role="tablist"]');

  tabLists.forEach((tabList) => {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = getAssociatedPanels(tabs);

    // Event listener for clicks on tabs
    tabList.addEventListener("click", (e) => {
      const clickedTab = e.target.closest('[role="tab"]');
      if (!clickedTab) return;

      activateTab(clickedTab, tabs, panels);
    });

    // Event listener for keyboard navigation
    tabList.addEventListener("keydown", (e) => {
      const currentTab = e.target;
      let newIndex;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          newIndex = (tabs.indexOf(currentTab) + 1) % tabs.length;
          tabs[newIndex].focus();
          break;
        case "ArrowLeft":
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

/**
 * Activates a specific tab and its corresponding panel.
 * @param {HTMLElement} tabToActivate - The tab element to make active.
 * @param {HTMLElement[]} allTabs - An array of all tab elements in the group.
 * @param {HTMLElement[]} allPanels - An array of all panel elements in the group.
 */
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

/**
 * Finds all panels associated with a list of tabs.
 * @param {HTMLElement[]} tabs - An array of tab elements.
 * @returns {HTMLElement[]} An array of the corresponding panel elements.
 */
function getAssociatedPanels(tabs) {
  return tabs.map((tab) => {
    const panelId = tab.getAttribute("aria-controls");
    return document.getElementById(panelId);
  });
}

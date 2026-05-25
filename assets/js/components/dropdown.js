export function init(container = document) {
  const dropdownContainers = container.querySelectorAll(".dropdown, .nav-item.dropdown");

  const openDropdown = (toggle, menu) => {
    closeAllDropdowns(menu);
    menu.classList.add("show");
    toggle.setAttribute("aria-expanded", "true");
  };

  const closeDropdown = (toggle, menu) => {
    menu.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
  };

  const closeAllDropdowns = (exceptMenu = null) => {
    document.querySelectorAll(".dropdown-menu.show").forEach((openMenu) => {
      if (openMenu !== exceptMenu) {
        openMenu.classList.remove("show");
        const toggle = openMenu.previousElementSibling;
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  };

  dropdownContainers.forEach((dropdownContainer) => {
    const toggle = dropdownContainer.querySelector(".dropdown-toggle");
    const menu = dropdownContainer.querySelector(".dropdown-menu");
    if (!toggle || !menu) return;

    if (!toggle.getAttribute("aria-haspopup")) {
      toggle.setAttribute("aria-haspopup", "true");
    }
    if (!toggle.getAttribute("aria-expanded")) {
      toggle.setAttribute("aria-expanded", "false");
    }

    let menuId = menu.getAttribute("id");
    if (!menuId) {
      menuId = `dropdown-menu-${Math.random().toString(36).substr(2, 9)}`;
      menu.setAttribute("id", menuId);
    }
    toggle.setAttribute("aria-controls", menuId);

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = menu.classList.contains("show");
      if (isOpen) {
        closeDropdown(toggle, menu);
      } else {
        openDropdown(toggle, menu);
      }
    });

    menu.addEventListener("click", (e) => {
      const item = e.target.closest(".dropdown-item");
      if (item) {
        closeDropdown(toggle, menu);
      }
    });

    dropdownContainer.addEventListener("keydown", (e) => {
      const items = Array.from(menu.querySelectorAll(".dropdown-item:not([disabled])"));
      const isOpen = menu.classList.contains("show");
      const activeEl = document.activeElement;

      if (activeEl === toggle) {
        switch (e.key) {
          case "ArrowDown":
          case "Enter":
          case " ":
            e.preventDefault();
            if (!isOpen) openDropdown(toggle, menu);
            if (items.length > 0) items[0].focus();
            break;
          case "ArrowUp":
            e.preventDefault();
            if (!isOpen) openDropdown(toggle, menu);
            if (items.length > 0) items[items.length - 1].focus();
            break;
          case "Escape":
            if (isOpen) {
              e.preventDefault();
              closeDropdown(toggle, menu);
            }
            break;
          case "Tab":
            if (isOpen) {
              closeDropdown(toggle, menu);
            }
            break;
        }
      } else if (items.includes(activeEl)) {
        const currentIndex = items.indexOf(activeEl);

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % items.length;
            items[nextIndex].focus();
            break;
          case "ArrowUp":
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + items.length) % items.length;
            items[prevIndex].focus();
            break;
          case "Home":
            e.preventDefault();
            items[0].focus();
            break;
          case "End":
            e.preventDefault();
            items[items.length - 1].focus();
            break;
          case "Escape":
            e.preventDefault();
            closeDropdown(toggle, menu);
            toggle.focus();
            break;
          case "Tab":
            closeDropdown(toggle, menu);
            break;
        }
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown, .nav-item.dropdown")) {
      closeAllDropdowns();
    }
  });
}

export default init;

/**
 * Initializes accessible dropdown components.
 * Follows the WAI-ARIA Menu Button Pattern.
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/
 */
function initDropdowns() {
  const dropdownContainers = document.querySelectorAll(".dropdown, .nav-item.dropdown");

  const openDropdown = (toggle, menu) => {
    // Cerrar otros dropdowns abiertos
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

  dropdownContainers.forEach((container) => {
    const toggle = container.querySelector(".dropdown-toggle");
    const menu = container.querySelector(".dropdown-menu");
    if (!toggle || !menu) return;

    // Abrir/Cerrar al hacer clic en el botón trigger
    toggle.addEventListener("click", (e) => {
      e.preventDefault(); // Evitar navegación si es un enlace
      const isOpen = menu.classList.contains("show");
      if (isOpen) {
        closeDropdown(toggle, menu);
      } else {
        openDropdown(toggle, menu);
      }
    });

    // Cerrar el menú al seleccionar una opción
    menu.addEventListener("click", (e) => {
      const item = e.target.closest(".dropdown-item");
      if (item) {
        closeDropdown(toggle, menu);
      }
    });

    // Navegación por teclado
    container.addEventListener("keydown", (e) => {
      const items = Array.from(menu.querySelectorAll(".dropdown-item:not([disabled])"));
      const isOpen = menu.classList.contains("show");
      const activeEl = document.activeElement;

      // Eventos cuando el foco está en el botón trigger
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
      }
      // Eventos cuando el foco está dentro de los elementos del menú
      else if (items.includes(activeEl)) {
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
            // Cerrar menú al tabular fuera y permitir comportamiento nativo
            closeDropdown(toggle, menu);
            break;
        }
      }
    });
  });

  // Cerrar dropdowns al hacer clic fuera del contenedor dropdown
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      closeAllDropdowns();
    }
  });
}

export default initDropdowns;


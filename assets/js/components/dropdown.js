function initDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown-toggle");

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      e.preventDefault(); // Evitar navegación si es un enlace
      const menu = dropdown.nextElementSibling;
      if (!menu) return;

      const isOpen = menu.classList.contains("show");

      // Cerrar otros dropdowns abiertos
      document.querySelectorAll(".dropdown-menu.show").forEach((openMenu) => {
        if (openMenu !== menu) {
          openMenu.classList.remove("show");
          const toggle = openMenu.previousElementSibling;
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        }
      });

      // Alternar estado actual
      menu.classList.toggle("show");
      dropdown.setAttribute("aria-expanded", !isOpen);
    });
  });

  // Cerrar dropdowns al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
        menu.classList.remove("show");
        const toggle = menu.previousElementSibling;
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });
}

export default initDropdowns;

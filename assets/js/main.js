// Simple Theme Toggler
const themeToggleBtn = document.getElementById("theme-toggle");
const htmlEl = document.getElementsByTagName("html")[0];

themeToggleBtn.addEventListener("click", () => {
  if (htmlEl.dataset.theme === "dark") {
    htmlEl.dataset.theme = "light";
    localStorage.setItem("theme", "light");
  } else {
    htmlEl.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
  }
});

// Check for saved theme in localStorage
if (localStorage.getItem("theme") === "dark") {
  htmlEl.dataset.theme = "dark";
} else {
  htmlEl.dataset.theme = "light";
}

/**
 * Navbar Toggle Logic
 * Maneja la apertura/cierre del menú móvil y la accesibilidad (inert/hidden).
 */
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".navbar-toggler");
  const navMenu = document.querySelector(".navbar-collapse");
  const navCloseBtn = document.querySelector(".navbar-collapse .btn-close");
  const navBackdrop = document.querySelector(".navbar-backdrop");

  if (!navToggle || !navMenu) return;

  // Función para abrir el menú
  const openMenu = () => {
    navMenu.hidden = false; // Quitamos hidden para permitir renderizado
    navMenu.removeAttribute("inert"); // Hacemos interactivo el contenido
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // Bloquear scroll

    // Pequeño delay para permitir que el navegador procese el cambio de 'hidden' antes de la transición
    requestAnimationFrame(() => {
      navMenu.classList.add("show");
      if (navBackdrop) navBackdrop.classList.add("show");
    });
  };

  // Función para cerrar el menú
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("show");
    if (navBackdrop) navBackdrop.classList.remove("show");
    document.body.style.overflow = ""; // Restaurar scroll

    // Esperamos a que termine la transición CSS para aplicar hidden e inert
    navMenu.addEventListener(
      "transitionend",
      () => {
        if (!navMenu.classList.contains("show")) {
          navMenu.hidden = true;
          navMenu.setAttribute("inert", "");
        }
      },
      { once: true },
    );
  };

  // Event Listener del botón
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Event Listeners para cerrar (Botón X y Backdrop)
  if (navCloseBtn) navCloseBtn.addEventListener("click", closeMenu);
  if (navBackdrop) navBackdrop.addEventListener("click", closeMenu);

  // Manejo de Responsive (Desktop vs Mobile)
  // Asegura que en desktop el menú no tenga 'inert' ni 'hidden'
  const mediaQuery = globalThis.matchMedia("(min-width: 769px)");

  const handleScreenChange = (e) => {
    if (e.matches) {
      // Desktop: Limpiar atributos restrictivos
      navMenu.hidden = false;
      navMenu.removeAttribute("inert");
      if (navBackdrop) navBackdrop.classList.remove("show"); // Asegurar que el backdrop se oculte
      document.body.style.overflow = ""; // Asegurar que el scroll esté habilitado en desktop
    } else {
      // Mobile: Si está cerrado, asegurar que sea inert/hidden
      if (navToggle.getAttribute("aria-expanded") === "false") {
        navMenu.hidden = true;
        navMenu.setAttribute("inert", "");
      }
    }
  };

  // Inicializar y escuchar cambios
  mediaQuery.addEventListener("change", handleScreenChange);
  handleScreenChange(mediaQuery); // Ejecutar al cargar
});

/**
 * Dropdown Logic
 * Maneja la interacción de los menús desplegables.
 */
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown-toggle");

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      e.preventDefault(); // Evitar navegación si es un enlace
      const menu = dropdown.nextElementSibling;
      if (!menu) return;

      const isOpen = menu.classList.contains("show");

      // Cerrar otros dropdowns abiertos (opcional, comportamiento tipo acordeón)
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
});

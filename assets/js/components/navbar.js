function initNavbar() {
  const navToggle = document.querySelector(".navbar-toggler");
  const navMenu = document.querySelector(".navbar-collapse");
  const navCloseBtn = document.querySelector(".navbar-collapse .btn-close");
  const navBackdrop = document.querySelector(".navbar-backdrop");

  if (!navToggle || !navMenu) return;

  // Función para alternar el atributo inert en los hermanos directos del body
  // para evitar que el foco se escape del menu Offcanvas
  const setSiblingsInert = (isInert) => {
    const navbar = navToggle.closest(".navbar");
    if (!navbar) return;

    Array.from(document.body.children).forEach((child) => {
      // Ignorar el propio navbar, scripts y styles
      if (
        child !== navbar &&
        !child.contains(navbar) &&
        child.tagName !== "SCRIPT" &&
        child.tagName !== "STYLE"
      ) {
        if (isInert) {
          child.setAttribute("inert", "");
        } else {
          child.removeAttribute("inert");
        }
      }
    });
  };

  // Función para abrir el menú
  const openMenu = () => {
    navMenu.hidden = false; // Quitamos hidden para permitir renderizado
    navMenu.removeAttribute("inert"); // Hacemos interactivo el contenido
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // Bloquear scroll

    // Aplicamos inert al resto de la página
    setSiblingsInert(true);

    // Pequeño delay para permitir que el navegador procese el cambio de 'hidden' antes de la transición
    requestAnimationFrame(() => {
      navMenu.classList.add("show");
      if (navBackdrop) navBackdrop.classList.add("show");
      
      // Enfocar el botón de cerrar al abrir la barra lateral
      if (navCloseBtn) {
        navCloseBtn.focus();
      }
    });
  };

  // Función para cerrar el menú
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("show");
    if (navBackdrop) navBackdrop.classList.remove("show");
    document.body.style.overflow = ""; // Restaurar scroll

    // Restauramos la interacción con el resto de la página
    setSiblingsInert(false);

    // Devolvemos el foco al botón que abrió el menú
    navToggle.focus();

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

  // Event Listener del botón toggler
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

  // Manejo de la tecla Escape para cerrar el Offcanvas
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("show")) {
      closeMenu();
    }
  });

  // Manejo de Responsive (Desktop vs Mobile)
  const mediaQuery = window.matchMedia("(min-width: 769px)");

  const handleScreenChange = (e) => {
    if (e.matches) {
      navMenu.hidden = false;
      navMenu.removeAttribute("inert");
      if (navBackdrop) navBackdrop.classList.remove("show");
      document.body.style.overflow = "";
      setSiblingsInert(false);
    } else {
      if (navToggle.getAttribute("aria-expanded") === "false") {
        navMenu.hidden = true;
        navMenu.setAttribute("inert", "");
      }
    }
  };

  mediaQuery.addEventListener("change", handleScreenChange);
  handleScreenChange(mediaQuery);
}

export default initNavbar;


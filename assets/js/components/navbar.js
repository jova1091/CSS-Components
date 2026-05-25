export function init(container = document) {
  const navToggle = container.querySelector(".navbar-toggler");
  const navMenu = container.querySelector(".navbar-collapse");
  const navCloseBtn = container.querySelector(".navbar-collapse .btn-close");
  const navBackdrop = container.querySelector(".navbar-backdrop");

  if (!navToggle || !navMenu) return;

  const setSiblingsInert = (isInert) => {
    const navbar = navToggle.closest(".navbar");
    if (!navbar) return;

    Array.from(document.body.children).forEach((child) => {
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

  const openMenu = () => {
    navMenu.hidden = false;
    navMenu.removeAttribute("inert");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";

    setSiblingsInert(true);

    requestAnimationFrame(() => {
      navMenu.classList.add("show");
      if (navBackdrop) navBackdrop.classList.add("show");
      if (navCloseBtn) {
        navCloseBtn.focus();
      }
    });
  };

  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("show");
    if (navBackdrop) navBackdrop.classList.remove("show");
    document.body.style.overflow = "";

    setSiblingsInert(false);

    navToggle.focus();

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

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (navCloseBtn) navCloseBtn.addEventListener("click", closeMenu);
  if (navBackdrop) navBackdrop.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("show")) {
      closeMenu();
    }
  });

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

export default init;

export function init(container = document) {
  const openDrawer = (drawer, trigger) => {
    if (drawer.classList.contains("drawer--open")) return;

    drawer._triggerEl = trigger;
    drawer.removeAttribute("hidden");
    // Force reflow para que la transición se active
    drawer.offsetHeight;
    drawer.classList.add("drawer--open");
    document.body.classList.add("drawer-open");
  };

  const closeDrawer = (drawer) => {
    if (!drawer.classList.contains("drawer--open")) return;

    drawer.classList.remove("drawer--open");
    document.body.classList.remove("drawer-open");

    if (drawer._triggerEl) {
      drawer._triggerEl.focus();
      delete drawer._triggerEl;
    }

    const hideAfterTransition = () => {
      if (!drawer.classList.contains("drawer--open")) {
        drawer.setAttribute("hidden", "");
      }
    };

    drawer.addEventListener("transitionend", hideAfterTransition, { once: true });
    setTimeout(hideAfterTransition, 400);
  };

  container.querySelectorAll('[data-drawer-toggle]').forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.getAttribute("data-target");
      const drawer = document.querySelector(targetId);
      if (drawer) {
        const isOpen = drawer.classList.contains("drawer--open");
        if (isOpen) {
          closeDrawer(drawer);
        } else {
          openDrawer(drawer, trigger);
        }
      }
    });
  });

  container.querySelectorAll('[data-drawer-dismiss]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const drawer = btn.closest(".drawer");
      if (drawer) closeDrawer(drawer);
    });
  });

  document.addEventListener("click", (e) => {
    const overlay = e.target.closest(".drawer-overlay");
    if (overlay) {
      const drawer = overlay.closest(".drawer");
      if (drawer && drawer.classList.contains("drawer--open")) {
        closeDrawer(drawer);
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const drawer = document.querySelector(".drawer.drawer--open");
      if (drawer) closeDrawer(drawer);
    }
  });
}

export default init;

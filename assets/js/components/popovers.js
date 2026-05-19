/**
 * Initializes accessible dynamic popovers.
 * Toggled on click, closes on Escape or clicking outside.
 */
export default function initPopovers() {
  const popoverElements = document.querySelectorAll('[data-toggle="popover"]');
  let activePopover = null;
  let activeTrigger = null;

  const showPopover = (el) => {
    // Si ya hay un popover activo de otro elemento, lo cerramos
    if (activePopover) {
      hidePopover();
    }

    // 1. Obtener título y contenido
    let titleText = el.getAttribute("data-original-title");
    if (!titleText) {
      titleText = el.getAttribute("data-title") || el.getAttribute("title") || "";
      if (titleText) {
        el.setAttribute("data-original-title", titleText);
        el.removeAttribute("title"); // Evita el tooltip nativo
      }
    }

    const contentText = el.getAttribute("data-content") || "";
    if (!titleText && !contentText) return;

    // 2. Determinar posición
    const position = el.getAttribute("data-placement") || "right";

    // 3. Crear el contenedor del popover
    const container = document.createElement("div");
    container.className = `popover`;
    container.setAttribute("data-placement", position);
    container.setAttribute("role", "tooltip");

    const arrow = document.createElement("div");
    arrow.className = "popover-arrow";
    container.appendChild(arrow);

    if (titleText) {
      const header = document.createElement("h3");
      header.className = "popover-header";
      header.textContent = titleText;
      container.appendChild(header);
    }

    if (contentText) {
      const body = document.createElement("div");
      body.className = "popover-body";
      body.textContent = contentText;
      container.appendChild(body);
    }

    document.body.appendChild(container);

    // 4. Calcular coordenadas
    const elRect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let top = 0;
    let left = 0;

    // Mostrar invisible temporalmente para medir
    container.style.visibility = "hidden";
    container.style.display = "block";
    const containerRect = container.getBoundingClientRect();
    container.style.display = "";
    container.style.visibility = "";

    const gap = 8; // Distancia entre el trigger y el popover

    switch (position) {
      case "top":
        top = elRect.top + scrollTop - containerRect.height - gap;
        left = elRect.left + scrollLeft + (elRect.width - containerRect.width) / 2;
        break;
      case "bottom":
        top = elRect.bottom + scrollTop + gap;
        left = elRect.left + scrollLeft + (elRect.width - containerRect.width) / 2;
        break;
      case "left":
        top = elRect.top + scrollTop + (elRect.height - containerRect.height) / 2;
        left = elRect.left + scrollLeft - containerRect.width - gap;
        break;
      case "right":
        top = elRect.top + scrollTop + (elRect.height - containerRect.height) / 2;
        left = elRect.right + scrollLeft + gap;
        break;
    }

    container.style.top = `${top}px`;
    container.style.left = `${left}px`;

    // 5. Mostrar con animación
    requestAnimationFrame(() => {
      container.classList.add("show");
    });

    activePopover = container;
    activeTrigger = el;
  };

  const hidePopover = () => {
    if (activePopover) {
      const popover = activePopover;
      popover.classList.remove("show");
      activePopover = null;
      activeTrigger = null;

      const handleTransitionEnd = () => {
        if (popover.parentNode) {
          popover.parentNode.removeChild(popover);
        }
        popover.removeEventListener("transitionend", handleTransitionEnd);
      };
      popover.addEventListener("transitionend", handleTransitionEnd);

      setTimeout(() => {
        if (popover.parentNode) {
          popover.parentNode.removeChild(popover);
        }
      }, 200);
    }
  };

  popoverElements.forEach((el) => {
    const title = el.getAttribute("title");
    if (title) {
      el.setAttribute("data-original-title", title);
      el.removeAttribute("title");
    }

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      if (activeTrigger === el) {
        hidePopover();
      } else {
        showPopover(el);
      }
    });
  });

  // Cerrar al hacer clic fuera del popover y del disparador
  document.addEventListener("click", (e) => {
    if (activePopover && !activePopover.contains(e.target) && e.target !== activeTrigger) {
      hidePopover();
    }
  });

  // Cerrar al pulsar Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activePopover) {
      hidePopover();
      if (activeTrigger) activeTrigger.focus();
    }
  });
}

/**
 * Initializes accessible dynamic tooltips.
 * Supports mouse hover and keyboard focus events.
 */
export default function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-toggle="tooltip"]');
  let activeTooltip = null;

  const showTooltip = (el) => {
    // Si ya hay un tooltip activo, quitarlo inmediatamente
    if (activeTooltip) {
      if (activeTooltip.parentNode) {
        activeTooltip.parentNode.removeChild(activeTooltip);
      }
      activeTooltip = null;
    }

    // 1. Obtener texto del tooltip
    let text = el.getAttribute("data-original-title");
    if (!text) {
      text = el.getAttribute("title") || "";
      if (text) {
        el.setAttribute("data-original-title", text);
        el.removeAttribute("title"); // Evita el tooltip nativo
      }
    }

    if (!text) return;

    // 2. Determinar la posición
    const position = el.getAttribute("data-placement") || "top";

    // 3. Crear el contenedor
    const container = document.createElement("div");
    container.className = `tooltip-container tooltip-${position}`;
    container.setAttribute("role", "tooltip");

    const inner = document.createElement("div");
    inner.className = "tooltip-inner";
    inner.textContent = text;

    const arrow = document.createElement("div");
    arrow.className = "tooltip-arrow";

    container.appendChild(inner);
    container.appendChild(arrow);
    document.body.appendChild(container);

    // 4. Calcular coordenadas
    const elRect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let top = 0;
    let left = 0;

    // Colocamos el contenedor temporalmente visible para medir su ancho/alto
    container.style.visibility = "hidden";
    container.style.display = "block";
    const containerRect = container.getBoundingClientRect();
    container.style.display = "";
    container.style.visibility = "";

    const gap = 8; // Distancia entre elemento y tooltip

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

    // 5. Aplicar coordenadas
    container.style.top = `${top}px`;
    container.style.left = `${left}px`;

    // 6. Mostrar con animación
    requestAnimationFrame(() => {
      container.classList.add("show");
    });

    activeTooltip = container;
  };

  const hideTooltip = () => {
    if (activeTooltip) {
      const tooltip = activeTooltip;
      tooltip.classList.remove("show");
      activeTooltip = null;

      // Esperar a que la transición termine antes de eliminarlo del DOM
      const handleTransitionEnd = () => {
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
        tooltip.removeEventListener("transitionend", handleTransitionEnd);
      };
      tooltip.addEventListener("transitionend", handleTransitionEnd);

      // Fallback
      setTimeout(() => {
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
      }, 200);
    }
  };

  tooltipElements.forEach((el) => {
    // Si tiene atributo title, guardarlo y quitarlo para evitar duplicados
    const title = el.getAttribute("title");
    if (title) {
      el.setAttribute("data-original-title", title);
      el.removeAttribute("title");
    }

    // Mouse events
    el.addEventListener("mouseenter", () => showTooltip(el));
    el.addEventListener("mouseleave", hideTooltip);

    // Keyboard focus events for accessibility
    el.addEventListener("focus", () => showTooltip(el));
    el.addEventListener("blur", hideTooltip);
  });
}

export function init(container = document) {
  const tooltipElements = container.querySelectorAll('[data-toggle="tooltip"]');
  let activeTooltip = null;

  const showTooltip = (el) => {
    if (activeTooltip) {
      if (activeTooltip.parentNode) {
        activeTooltip.parentNode.removeChild(activeTooltip);
      }
      activeTooltip = null;
    }

    let text = el.getAttribute("data-original-title");
    if (!text) {
      text = el.getAttribute("title") || "";
      if (text) {
        el.setAttribute("data-original-title", text);
        el.removeAttribute("title");
      }
    }

    if (!text) return;

    const position = el.getAttribute("data-placement") || "top";

    const tooltipContainer = document.createElement("div");
    tooltipContainer.className = `tooltip-container tooltip-${position}`;
    tooltipContainer.setAttribute("role", "tooltip");

    const inner = document.createElement("div");
    inner.className = "tooltip-inner";
    inner.textContent = text;

    const arrow = document.createElement("div");
    arrow.className = "tooltip-arrow";

    tooltipContainer.appendChild(inner);
    tooltipContainer.appendChild(arrow);
    document.body.appendChild(tooltipContainer);

    const elRect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let top = 0;
    let left = 0;

    tooltipContainer.style.visibility = "hidden";
    tooltipContainer.style.display = "block";
    const containerRect = tooltipContainer.getBoundingClientRect();
    tooltipContainer.style.display = "";
    tooltipContainer.style.visibility = "";

    const gap = 8;

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

    tooltipContainer.style.top = `${top}px`;
    tooltipContainer.style.left = `${left}px`;

    requestAnimationFrame(() => {
      tooltipContainer.classList.add("show");
    });

    activeTooltip = tooltipContainer;
  };

  const hideTooltip = () => {
    if (activeTooltip) {
      const tooltip = activeTooltip;
      tooltip.classList.remove("show");
      activeTooltip = null;

      const handleTransitionEnd = () => {
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
        tooltip.removeEventListener("transitionend", handleTransitionEnd);
      };
      tooltip.addEventListener("transitionend", handleTransitionEnd);

      setTimeout(() => {
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
      }, 200);
    }
  };

  tooltipElements.forEach((el) => {
    const title = el.getAttribute("title");
    if (title) {
      el.setAttribute("data-original-title", title);
      el.removeAttribute("title");
    }

    el.addEventListener("mouseenter", () => showTooltip(el));
    el.addEventListener("mouseleave", hideTooltip);

    el.addEventListener("focus", () => showTooltip(el));
    el.addEventListener("blur", hideTooltip);
  });
}

export default init;

export function init(container = document) {
  const popoverElements = container.querySelectorAll('[data-toggle="popover"]');
  let activePopover = null;
  let activeTrigger = null;

  const showPopover = (el) => {
    if (activePopover) {
      hidePopover();
    }

    let titleText = el.getAttribute("data-original-title");
    if (!titleText) {
      titleText = el.getAttribute("data-title") || el.getAttribute("title") || "";
      if (titleText) {
        el.setAttribute("data-original-title", titleText);
        el.removeAttribute("title");
      }
    }

    const contentText = el.getAttribute("data-content") || "";
    if (!titleText && !contentText) return;

    const position = el.getAttribute("data-placement") || "right";

    const containerEl = document.createElement("div");
    containerEl.className = `popover`;
    containerEl.setAttribute("data-placement", position);
    containerEl.setAttribute("role", "tooltip");

    const arrow = document.createElement("div");
    arrow.className = "popover-arrow";
    containerEl.appendChild(arrow);

    if (titleText) {
      const header = document.createElement("h3");
      header.className = "popover-header";
      header.textContent = titleText;
      containerEl.appendChild(header);
    }

    if (contentText) {
      const body = document.createElement("div");
      body.className = "popover-body";
      body.textContent = contentText;
      containerEl.appendChild(body);
    }

    document.body.appendChild(containerEl);

    const elRect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let top = 0;
    let left = 0;

    containerEl.style.visibility = "hidden";
    containerEl.style.display = "block";
    const popoverRect = containerEl.getBoundingClientRect();
    containerEl.style.display = "";
    containerEl.style.visibility = "";

    const gap = 8;

    switch (position) {
      case "top":
        top = elRect.top + scrollTop - popoverRect.height - gap;
        left = elRect.left + scrollLeft + (elRect.width - popoverRect.width) / 2;
        break;
      case "bottom":
        top = elRect.bottom + scrollTop + gap;
        left = elRect.left + scrollLeft + (elRect.width - popoverRect.width) / 2;
        break;
      case "left":
        top = elRect.top + scrollTop + (elRect.height - popoverRect.height) / 2;
        left = elRect.left + scrollLeft - popoverRect.width - gap;
        break;
      case "right":
        top = elRect.top + scrollTop + (elRect.height - popoverRect.height) / 2;
        left = elRect.right + scrollLeft + gap;
        break;
    }

    containerEl.style.top = `${top}px`;
    containerEl.style.left = `${left}px`;

    requestAnimationFrame(() => {
      containerEl.classList.add("show");
    });

    activePopover = containerEl;
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

  document.addEventListener("click", (e) => {
    if (activePopover && !activePopover.contains(e.target) && e.target !== activeTrigger) {
      hidePopover();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activePopover) {
      hidePopover();
      if (activeTrigger) activeTrigger.focus();
    }
  });
}

export default init;

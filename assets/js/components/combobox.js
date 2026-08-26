export function init(container = document) {
  const comboboxes = new Set(container.querySelectorAll(".combobox"));
  if (container.classList?.contains("combobox")) comboboxes.add(container);

  comboboxes.forEach((combo) => {
    const multi = combo.hasAttribute("data-multi");
    const input = combo.querySelector(".combobox-input");
    const dropdown = combo.querySelector(".combobox-dropdown");
    const options = Array.from(dropdown.querySelectorAll(".combobox-option"));
    const chipContainer = combo.querySelector(".combobox-chips");
    const clearBtn = combo.querySelector(".combobox-clear");
    let focusedIndex = -1;
    let selectedValues = [];

    const open = () => {
      combo.setAttribute("data-open", "true");
      filterOptions("");
    };

    const close = () => {
      combo.removeAttribute("data-open");
      focusedIndex = -1;
      clearFocus();
    };

    const clearFocus = () => {
      options.forEach((o) => o.removeAttribute("data-focused"));
    };

    const setFocus = (index) => {
      clearFocus();
      if (index >= 0 && index < options.length) {
        focusedIndex = index;
        options[index].setAttribute("data-focused", "true");
        options[index].scrollIntoView({ block: "nearest" });
        input.setAttribute("aria-activedescendant", options[index].id || "");
      }
    };

    const filterOptions = (query) => {
      let visibleCount = 0;
      options.forEach((opt) => {
        const text = opt.textContent.toLowerCase();
        const match = text.includes(query.toLowerCase());
        opt.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });

      let emptyMsg = dropdown.querySelector(".combobox-empty");
      if (visibleCount === 0) {
        if (!emptyMsg) {
          emptyMsg = document.createElement("div");
          emptyMsg.className = "combobox-empty";
          emptyMsg.textContent = "Sin resultados";
          dropdown.appendChild(emptyMsg);
        }
        emptyMsg.style.display = "";
      } else if (emptyMsg) {
        emptyMsg.style.display = "none";
      }
    };

    const selectOption = (option) => {
      const value = option.dataset.value;
      const label = option.textContent.trim();

      if (multi) {
        if (selectedValues.includes(value)) {
          selectedValues = selectedValues.filter((v) => v !== value);
          option.removeAttribute("data-selected");
        } else {
          selectedValues.push(value);
          option.setAttribute("data-selected", "true");
        }
        renderChips();
      } else {
        options.forEach((o) => o.removeAttribute("data-selected"));
        option.setAttribute("data-selected", "true");
        input.value = label;
        input.setAttribute("data-value", value);
        close();
      }

      updateHasValue();
      combo.dispatchEvent(new CustomEvent("combobox-change", { detail: { value: multi ? selectedValues : value, label } }));
    };

    const renderChips = () => {
      if (!chipContainer) return;
      chipContainer.innerHTML = "";
      selectedValues.forEach((val) => {
        const opt = options.find((o) => o.dataset.value === val);
        if (!opt) return;
        const chip = document.createElement("span");
        chip.className = "combobox-chip";
        chip.innerHTML = `${opt.textContent.trim()}<button class="combobox-chip-remove" aria-label="Quitar" data-value="${val}">&times;</button>`;
        chipContainer.appendChild(chip);
      });
    };

    const updateHasValue = () => {
      const hasValue = multi ? selectedValues.length > 0 : !!input.value;
      combo.classList.toggle("combobox-has-value", hasValue);
    };

    input.addEventListener("focus", open);
    input.addEventListener("input", (e) => {
      open();
      filterOptions(e.target.value);
    });

    input.addEventListener("keydown", (e) => {
      const visible = options.filter((o) => o.style.display !== "none");

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!combo.getAttribute("data-open")) open();
          setFocus(Math.min(focusedIndex + 1, visible.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocus(Math.max(focusedIndex - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && visible[focusedIndex]) {
            selectOption(visible[focusedIndex]);
          }
          break;
        case "Escape":
          close();
          input.blur();
          break;
        case "Tab":
          close();
          break;
      }
    });

    options.forEach((opt) => {
      opt.addEventListener("click", () => selectOption(opt));
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (multi) {
          selectedValues = [];
          options.forEach((o) => o.removeAttribute("data-selected"));
          renderChips();
        } else {
          input.value = "";
          input.removeAttribute("data-value");
          options.forEach((o) => o.removeAttribute("data-selected"));
        }
        updateHasValue();
        input.focus();
      });
    }

    if (chipContainer) {
      chipContainer.addEventListener("click", (e) => {
        const removeBtn = e.target.closest(".combobox-chip-remove");
        if (!removeBtn) return;
        const val = removeBtn.dataset.value;
        selectedValues = selectedValues.filter((v) => v !== val);
        const opt = options.find((o) => o.dataset.value === val);
        if (opt) opt.removeAttribute("data-selected");
        renderChips();
        updateHasValue();
      });
    }

    document.addEventListener("click", (e) => {
      if (!combo.contains(e.target)) close();
    });
  });
}

export default init;

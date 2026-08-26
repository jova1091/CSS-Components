export function init(container = document) {
  const pickers = new Set(container.querySelectorAll(".datepicker"));
  if (container.classList?.contains("datepicker")) pickers.add(container);

  pickers.forEach((picker) => {
    const input = picker.querySelector(".datepicker-input");
    const calendar = picker.querySelector(".datepicker-calendar");
    const toggleBtn = picker.querySelector(".datepicker-toggle");
    const prevBtn = picker.querySelector(".datepicker-nav-prev");
    const nextBtn = picker.querySelector(".datepicker-nav-next");
    const monthLabel = picker.querySelector(".datepicker-header-label");
    const daysContainer = picker.querySelector(".datepicker-days");

    const locale = picker.dataset.locale || navigator.language || "es-ES";
    const minDate = picker.dataset.min ? new Date(picker.dataset.min) : null;
    const maxDate = picker.dataset.max ? new Date(picker.dataset.max) : null;

    let currentDate = new Date();
    let selectedDate = null;
    let focusedDate = new Date();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formatDate = (date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    };

    const open = () => {
      picker.setAttribute("data-open", "true");
      render();
    };

    const close = () => {
      picker.removeAttribute("data-open");
    };

    const isSameDay = (a, b) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    const isDisabled = (date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    const render = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      const monthName = currentDate.toLocaleString(locale, { month: "long" });
      monthLabel.textContent = `${monthName} ${year}`;

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPrevMonth = new Date(year, month, 0).getDate();

      daysContainer.innerHTML = "";

      const startDay = (firstDay + 6) % 7;

      for (let i = startDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const date = new Date(year, month - 1, day);
        const btn = createDayButton(day, date, true);
        daysContainer.appendChild(btn);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const btn = createDayButton(day, date, false);
        daysContainer.appendChild(btn);
      }

      const totalCells = startDay + daysInMonth;
      const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
      for (let day = 1; day <= remaining; day++) {
        const date = new Date(year, month + 1, day);
        const btn = createDayButton(day, date, true);
        daysContainer.appendChild(btn);
      }
    };

    const createDayButton = (day, date, isOutside) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "datepicker-day";
      btn.textContent = day;
      btn.dataset.date = formatDate(date);

      if (isOutside) btn.setAttribute("data-outside", "true");
      if (isSameDay(date, today)) btn.setAttribute("data-today", "true");
      if (selectedDate && isSameDay(date, selectedDate)) btn.setAttribute("data-selected", "true");
      if (isSameDay(date, focusedDate)) btn.setAttribute("data-focused", "true");
      if (isDisabled(date)) btn.setAttribute("data-disabled", "true");

      btn.addEventListener("click", () => {
        if (isDisabled(date)) return;
        selectedDate = new Date(date);
        input.value = selectedDate.toLocaleDateString(locale, { year: "numeric", month: "2-digit", day: "2-digit" });
        input.dataset.value = formatDate(selectedDate);
        close();
        picker.dispatchEvent(new CustomEvent("datepicker-change", { detail: { date: selectedDate, value: formatDate(selectedDate) } }));
      });

      return btn;
    };

    const navigateMonth = (delta) => {
      currentDate.setMonth(currentDate.getMonth() + delta);
      render();
    };

    toggleBtn.addEventListener("click", () => {
      if (picker.getAttribute("data-open")) {
        close();
      } else {
        open();
      }
    });

    input.addEventListener("focus", open);

    prevBtn.addEventListener("click", () => navigateMonth(-1));
    nextBtn.addEventListener("click", () => navigateMonth(1));

    monthLabel.addEventListener("click", () => {
      currentDate = new Date();
      render();
    });

    input.addEventListener("keydown", (e) => {
      if (!picker.getAttribute("data-open")) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          e.preventDefault();
          open();
          return;
        }
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          focusedDate.setDate(focusedDate.getDate() - 1);
          syncMonth();
          render();
          break;
        case "ArrowRight":
          e.preventDefault();
          focusedDate.setDate(focusedDate.getDate() + 1);
          syncMonth();
          render();
          break;
        case "ArrowUp":
          e.preventDefault();
          focusedDate.setDate(focusedDate.getDate() - 7);
          syncMonth();
          render();
          break;
        case "ArrowDown":
          e.preventDefault();
          focusedDate.setDate(focusedDate.getDate() + 7);
          syncMonth();
          render();
          break;
        case "Enter":
          e.preventDefault();
          if (!isDisabled(focusedDate)) {
            selectedDate = new Date(focusedDate);
            input.value = selectedDate.toLocaleDateString(locale, { year: "numeric", month: "2-digit", day: "2-digit" });
            input.dataset.value = formatDate(selectedDate);
            close();
            picker.dispatchEvent(new CustomEvent("datepicker-change", { detail: { date: selectedDate, value: formatDate(selectedDate) } }));
          }
          break;
        case "Escape":
          close();
          break;
      }
    });

    const syncMonth = () => {
      if (focusedDate.getMonth() !== currentDate.getMonth() || focusedDate.getFullYear() !== currentDate.getFullYear()) {
        currentDate = new Date(focusedDate);
      }
    };

    document.addEventListener("click", (e) => {
      if (!picker.contains(e.target)) close();
    });

    render();
  });
}

export default init;

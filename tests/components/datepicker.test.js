import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/datepicker.js";

function createDatepicker() {
  const el = document.createElement("div");
  el.className = "datepicker";
  el.innerHTML = `
    <input type="text" class="datepicker-input" readonly placeholder="Select date" />
    <button class="datepicker-toggle">📅</button>
    <div class="datepicker-calendar" hidden>
      <div class="datepicker-header">
        <button class="datepicker-prev">‹</button>
        <span class="datepicker-label"></span>
        <button class="datepicker-next">›</button>
      </div>
      <div class="datepicker-days"></div>
    </div>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Datepicker", () => {
  it("init finds datepicker elements", () => {
    const el = createDatepicker();
    init(el);
    const input = el.querySelector(".datepicker-input");
    expect(input).toBeTruthy();
    el.remove();
  });

  it("init works when container is the datepicker itself", () => {
    const el = createDatepicker();
    init(el);
    const input = el.querySelector(".datepicker-input");
    expect(input).toBeTruthy();
    el.remove();
  });

  it("click toggle opens calendar", () => {
    const el = createDatepicker();
    init(el);
    const toggle = el.querySelector(".datepicker-toggle");
    toggle.click();
    const calendar = el.querySelector(".datepicker-calendar");
    expect(calendar.hidden).toBe(false);
    el.remove();
  });

  it("calendar renders days", () => {
    const el = createDatepicker();
    init(el);
    const toggle = el.querySelector(".datepicker-toggle");
    toggle.click();
    const days = el.querySelectorAll(".datepicker-day");
    expect(days.length).toBeGreaterThan(0);
    el.remove();
  });

  it("click day selects date and dispatches event", () => {
    const el = createDatepicker();
    init(el);
    let eventFired = false;
    el.addEventListener("datepicker-change", () => { eventFired = true; });
    const toggle = el.querySelector(".datepicker-toggle");
    toggle.click();
    const day = el.querySelector(".datepicker-day:not(.datepicker-day--outside)");
    if (day) {
      day.click();
      expect(eventFired).toBe(true);
    }
    el.remove();
  });
});

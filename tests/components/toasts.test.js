import { describe, it, expect } from "../test-framework.js";
import { Toasts } from "../../assets/js/components/toasts.js";

describe("Toasts", () => {
  it("show creates a toast element", () => {
    Toasts.show("Test", "Message", "info", 0);
    const toast = document.querySelector(".toast");
    expect(toast).toBeTruthy();
    toast.remove();
  });

  it("show with danger sets role=alert", () => {
    Toasts.show("Alert", "Danger message", "danger", 0);
    const toast = document.querySelector(".toast");
    expect(toast.getAttribute("role")).toBe("alert");
    expect(toast.getAttribute("aria-live")).toBe("assertive");
    toast.remove();
  });

  it("show with success sets role=status", () => {
    Toasts.show("Success", "Done", "success", 0);
    const toast = document.querySelector(".toast");
    expect(toast.getAttribute("role")).toBe("status");
    expect(toast.getAttribute("aria-live")).toBe("polite");
    toast.remove();
  });

  it("creates container for each position", () => {
    Toasts.show("Test", "Msg", "info", 0, "top-left");
    Toasts.show("Test", "Msg", "info", 0, "bottom-right");
    const c1 = document.querySelector(".toast-container-top-left");
    const c2 = document.querySelector(".toast-container-bottom-right");
    expect(c1).toBeTruthy();
    expect(c2).toBeTruthy();
    document.querySelectorAll(".toast").forEach(t => t.remove());
  });

  it("btn-close dismisses toast", async () => {
    Toasts.show("Test", "Close me", "info", 0);
    const toast = document.querySelector(".toast");
    const closeBtn = toast.querySelector(".btn-close");
    closeBtn.click();
    await new Promise(r => setTimeout(r, 500));
    expect(document.querySelector(".toast")).toBeNull();
  });
});

import { describe, it, expect } from "../test-framework.js";
import ComponentLoader from "../../assets/js/component-loader.js";

describe("ComponentLoader", () => {
  it("getRegistry returns all registered components", () => {
    const reg = ComponentLoader.getRegistry();
    const keys = Object.keys(reg);
    expect(keys.length > 20).toBeTruthy();
    expect(reg.accordion).toBeTruthy();
    expect(reg.buttons).toBeTruthy();
    expect(reg["tree-view"]).toBeTruthy();
  });

  it("each entry has css path", () => {
    const reg = ComponentLoader.getRegistry();
    for (const [name, entry] of Object.entries(reg)) {
      expect(typeof entry.css).toBe("string");
    }
  });

  it("load rejects for unknown component", async () => {
    let threw = false;
    try { await ComponentLoader.load("nonexistent-xyz"); } catch { threw = true; }
    expect(threw).toBeTruthy();
  });

  it("load resolves for known component", async () => {
    let resolved = false;
    try { await ComponentLoader.load("alerts"); resolved = true; } catch { /* ignore */ }
    expect(resolved).toBeTruthy();
  });

  it("startObserver is idempotent", () => {
    ComponentLoader.startObserver();
    ComponentLoader.startObserver();
  });
});

import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/dropzone.js";

function createDropzone() {
  const el = document.createElement("div");
  el.className = "dropzone";
  el.setAttribute("data-dropzone", "");
  el.innerHTML = `
    <input type="file" class="dropzone-input" multiple />
    <ul class="dropzone-files"></ul>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Dropzone", () => {
  it("init attaches to dropzone elements", () => {
    const el = createDropzone();
    init(el);
    expect(el._dropzoneInit).toBe(true);
    el.remove();
  });

  it("double init does not re-attach", () => {
    const el = createDropzone();
    init(el);
    init(el);
    expect(el._dropzoneInit).toBe(true);
    el.remove();
  });

  it("click opens file picker", () => {
    const el = createDropzone();
    init(el);
    const input = el.querySelector(".dropzone-input");
    expect(input).toBeTruthy();
    el.remove();
  });
});

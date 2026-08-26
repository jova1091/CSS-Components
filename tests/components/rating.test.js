import { describe, it, expect } from "../test-framework.js";
import { init } from "../../assets/js/components/rating.js";

function createRating() {
  const el = document.createElement("div");
  el.className = "rating";
  el.setAttribute("role", "radiogroup");
  el.innerHTML = `
    <span class="rating-star" role="radio" aria-checked="false" tabindex="0">★</span>
    <span class="rating-star" role="radio" aria-checked="false" tabindex="-1">★</span>
    <span class="rating-star" role="radio" aria-checked="false" tabindex="-1">★</span>
    <span class="rating-star" role="radio" aria-checked="false" tabindex="-1">★</span>
    <span class="rating-star" role="radio" aria-checked="false" tabindex="-1">★</span>
  `;
  document.body.appendChild(el);
  return el;
}

describe("Rating", () => {
  it("init finds interactive ratings", () => {
    const el = createRating();
    init(el);
    const stars = el.querySelectorAll(".rating-star");
    expect(stars.length).toBe(5);
    el.remove();
  });

  it("click star sets value", () => {
    const el = createRating();
    init(el);
    const stars = el.querySelectorAll(".rating-star");
    stars[2].click();
    expect(stars[0].classList.contains("rating-star--filled")).toBe(true);
    expect(stars[1].classList.contains("rating-star--filled")).toBe(true);
    expect(stars[2].classList.contains("rating-star--filled")).toBe(true);
    expect(stars[3].classList.contains("rating-star--filled")).toBe(false);
    el.remove();
  });

  it("dispatches rating-change event", () => {
    const el = createRating();
    init(el);
    let eventDetail = null;
    el.addEventListener("rating-change", (e) => { eventDetail = e.detail; });
    const stars = el.querySelectorAll(".rating-star");
    stars[3].click();
    expect(eventDetail).toBeTruthy();
    expect(eventDetail.value).toBe(4);
    el.remove();
  });
});

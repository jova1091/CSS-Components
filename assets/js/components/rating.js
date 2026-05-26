export function init(container = document) {
  container.querySelectorAll(".rating:not(.rating--readonly):not(.rating--disabled)").forEach((rating) => {
    if (rating._ratingInit) return;
    rating._ratingInit = true;

    const stars = Array.from(rating.querySelectorAll(".rating-star"));
    if (stars.length === 0) return;

    let currentValue = stars.filter((s) => s.classList.contains("rating-star--filled")).length;

    const setValue = (value) => {
      currentValue = value;
      stars.forEach((star, i) => {
        const isFilled = i < value;
        star.classList.toggle("rating-star--filled", isFilled);
        star.setAttribute("aria-checked", isFilled ? "true" : "false");
      });
      rating.dispatchEvent(new CustomEvent("rating-change", {
        bubbles: true,
        detail: { value }
      }));
    };

    const preview = (value) => {
      stars.forEach((star, i) => {
        star.classList.toggle("rating-star--hover", i < value && !star.classList.contains("rating-star--filled"));
      });
    };

    const clearPreview = () => {
      stars.forEach((star) => star.classList.remove("rating-star--hover"));
    };

    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        setValue(index + 1);
        clearPreview();
      });

      star.addEventListener("mouseenter", () => preview(index + 1));
      star.addEventListener("mouseleave", clearPreview);
    });

    rating.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(currentValue + 1, stars.length);
        setValue(next);
        stars[next - 1]?.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        const prev = Math.max(currentValue - 1, 0);
        setValue(prev);
        if (prev > 0) stars[prev - 1]?.focus();
        else stars[0]?.focus();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
      }
    });
  });
}

export default init;

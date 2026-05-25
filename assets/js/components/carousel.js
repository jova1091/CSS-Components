export function init(container = document) {
  const carousels = container.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const inner = carousel.querySelector(".carousel-inner");
    const items = carousel.querySelectorAll(".carousel-item");
    const prevBtn = carousel.querySelector(".carousel-control-prev");
    const nextBtn = carousel.querySelector(".carousel-control-next");
    const indicators = carousel.querySelectorAll(".carousel-indicators [data-slide-to]");

    if (!inner || items.length === 0) return;

    let autoplayTimer = null;
    const interval = parseInt(carousel.getAttribute("data-interval")) || 5000;
    const isAutoplay = carousel.getAttribute("data-ride") === "carousel";

    const scrollToSlide = (index) => {
      const slideWidth = inner.clientWidth;
      inner.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const index = Math.round(inner.scrollLeft / inner.clientWidth);
        const prevIndex = index === 0 ? items.length - 1 : index - 1;
        scrollToSlide(prevIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const index = Math.round(inner.scrollLeft / inner.clientWidth);
        const nextIndex = (index + 1) % items.length;
        scrollToSlide(nextIndex);
      });
    }

    indicators.forEach((indicator) => {
      indicator.addEventListener("click", () => {
        const targetIndex = parseInt(indicator.getAttribute("data-slide-to"));
        scrollToSlide(targetIndex);
      });
    });

    const handleScroll = () => {
      const index = Math.round(inner.scrollLeft / inner.clientWidth);
      indicators.forEach((indicator, idx) => {
        if (idx === index) {
          indicator.classList.add("active");
          indicator.setAttribute("aria-current", "true");
        } else {
          indicator.classList.remove("active");
          indicator.removeAttribute("aria-current");
        }
      });
    };

    inner.addEventListener("scroll", handleScroll);

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const index = Math.round(inner.scrollLeft / inner.clientWidth);
        inner.scrollTo({
          left: index * inner.clientWidth,
          behavior: "auto"
        });
      }, 100);
    });

    const startAutoplay = () => {
      if (!isAutoplay) return;
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        const index = Math.round(inner.scrollLeft / inner.clientWidth);
        const nextIndex = (index + 1) % items.length;
        scrollToSlide(nextIndex);
      }, interval);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    startAutoplay();

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("touchstart", stopAutoplay, { passive: true });
    carousel.addEventListener("touchend", startAutoplay);
  });
}

export default init;

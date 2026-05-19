/**
 * Initializes responsive, accessible carousels.
 * Uses native CSS Scroll Snapping for smooth performance.
 * Integrates Intersection/Scroll tracking for indicator state, next/prev controls, and safe autoplay (pauses on hover).
 */
export default function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");

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

    // Función para ir a un índice específico
    const scrollToSlide = (index) => {
      const slideWidth = inner.clientWidth;
      inner.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
    };

    // Controladores de botones
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

    // Controladores de indicadores
    indicators.forEach((indicator) => {
      indicator.addEventListener("click", () => {
        const targetIndex = parseInt(indicator.getAttribute("data-slide-to"));
        scrollToSlide(targetIndex);
      });
    });

    // Sincronizar indicadores activos durante el scroll (para swipes móviles)
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

    // Ajustar scroll en caso de redimensionamiento de pantalla (resize)
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const index = Math.round(inner.scrollLeft / inner.clientWidth);
        // Volver a alinear al slide correspondiente en su nuevo ancho
        inner.scrollTo({
          left: index * inner.clientWidth,
          behavior: "auto"
        });
      }, 100);
    });

    // Lógica de Autoplay accesible
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

    // Iniciar autoplay
    startAutoplay();

    // Pausar al pasar el ratón (hover) o al tocar en móvil para evitar frustración del usuario
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("touchstart", stopAutoplay, { passive: true });
    carousel.addEventListener("touchend", startAutoplay);
  });
}

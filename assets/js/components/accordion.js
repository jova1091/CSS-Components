/**
 * Initializes accessible Accordion components.
 * Follows the WAI-ARIA Accordion Pattern for keyboard navigation.
 * Provides a JS fallback for the exclusive details toggling (name attribute).
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
function initAccordions() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const summaries = Array.from(accordion.querySelectorAll(".accordion-header"));
    
    // 1. Navegación por Teclado en los headers (<summary>)
    summaries.forEach((summary) => {
      summary.addEventListener("keydown", (e) => {
        const currentIndex = summaries.indexOf(summary);
        let newIndex;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            newIndex = (currentIndex + 1) % summaries.length;
            summaries[newIndex].focus();
            break;
          case "ArrowUp":
            e.preventDefault();
            newIndex = (currentIndex - 1 + summaries.length) % summaries.length;
            summaries[newIndex].focus();
            break;
          case "Home":
            e.preventDefault();
            summaries[0].focus();
            break;
          case "End":
            e.preventDefault();
            summaries[summaries.length - 1].focus();
            break;
        }
      });
    });

    // 2. Fallback de Exclusividad (comportamiento de acordéon exclusivo)
    // Escucha el evento toggle usando captura ya que no burbujea por defecto
    accordion.addEventListener(
      "toggle",
      (e) => {
        const details = e.target;
        if (details.tagName !== "DETAILS" || !details.open) return;

        const name = details.getAttribute("name");
        if (!name) return;

        // Buscar otros <details> con el mismo 'name' en este acordeón y cerrarlos
        const otherDetails = accordion.querySelectorAll(`details[name="${name}"]`);
        otherDetails.forEach((other) => {
          if (other !== details && other.open) {
            other.open = false; // Cierra el acordeón alternativo
          }
        });
      },
      true // useCapture = true
    );
  });
}

export default initAccordions;

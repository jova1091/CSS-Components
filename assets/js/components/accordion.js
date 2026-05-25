export function init(container = document) {
  const accordions = container.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const summaries = Array.from(accordion.querySelectorAll(".accordion-header"));

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

    accordion.addEventListener(
      "toggle",
      (e) => {
        const details = e.target;
        if (details.tagName !== "DETAILS" || !details.open) return;

        const name = details.getAttribute("name");
        if (!name) return;

        const otherDetails = accordion.querySelectorAll(`details[name="${name}"]`);
        otherDetails.forEach((other) => {
          if (other !== details && other.open) {
            other.open = false;
          }
        });
      },
      true
    );
  });
}

export default init;

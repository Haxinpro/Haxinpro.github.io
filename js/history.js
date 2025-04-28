document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
  
    // 1) Tapahtumat data-taulukossa
    const steps = [
      {
        id: "start-point",
        title: "Valmistuin koulusta",
        description: "Valmistuin koulusta vuonna 2018."
      },
      {
        title: "Ensimmäinen työ",
        description: "Aloitin ensimmäisen työni ohjelmistoalalla."
      },
      {
        title: "Ensimmäinen peli",
        description: "Julkaisin ensimmäisen pelini itch.io:hon."
      },
      {
        title: "Ensimmäinen peli",
        description: "Julkaisin ensimmäisen pelini itch.io:hon."
      },
      {
        title: "Ensimmäinen peli",
        description: "Julkaisin ensimmäisen pelini itch.io:hon."
      },
      {
        title: "Ensimmäinen peli",
        description: "Julkaisin ensimmäisen pelini itch.io:hon."
      },
      {
        title: "Ensimmäinen peli",
        description: "Julkaisin ensimmäisen pelini itch.io:hon."
      },
      // Lisää tarvittaessa...
    ];
  
    // 2) Rakennetaan vaiheittain DOM
    steps.forEach((step, index) => {
      const stepEl = document.createElement("div");
      stepEl.classList.add("timeline-step");
  
      // 2a) Piste
      const point = document.createElement("div");
      point.classList.add("timeline-point");
      if (index === 0) {
        point.id = step.id;          // erillinen id ensimmäiselle
      } else {
        point.classList.add("hidden");
      }
      stepEl.appendChild(point);
  
      // 2b) Viiva alaspäin (ei viimeiselle)
      let segment = null;
      if (index < steps.length - 1) {
        segment = document.createElement("div");
        segment.classList.add("timeline-segment", "hidden");
        stepEl.appendChild(segment);
      }
  
      // 2c) Infokortti
      const card = document.createElement("div");
      card.classList.add("info-card", index % 2 === 0 ? "left" : "right");
  
      const content = document.createElement("div");
      content.classList.add("info-content");
  
      const h3 = document.createElement("h3");
      h3.classList.add("info-title");
      h3.textContent = step.title;
  
      const p = document.createElement("p");
      p.classList.add("info-description");
      p.textContent = step.description;
  
      content.append(h3, p);
      card.appendChild(content);
      stepEl.appendChild(card);
  
      // 2d) Lisää askel aikajanalle
      timeline.appendChild(stepEl);
  
      // 3) Klikkauskäsittelijä
      point.addEventListener("click", () => {
        // estetään uusi klikkaus
        point.classList.add("inactive");
  
        // näytetään oma infokortti
        card.classList.add("visible");
  
        // näytetään segmentti animaatiolla
        if (segment) {
          segment.classList.remove("hidden");
          requestAnimationFrame(() => {
            segment.classList.add("visible");
          });
        }
  
        // näytetään seuraava piste fade‑inillä
        const nextStepEl = timeline.children[index + 1];
        if (nextStepEl) {
          const nextPoint = nextStepEl.querySelector(".timeline-point");
          if (nextPoint) {
            nextPoint.classList.remove("hidden");
            nextPoint.style.opacity = 0;
            setTimeout(() => {
              nextPoint.style.transition = "opacity 0.4s ease";
              nextPoint.style.opacity = 1;
            }, 50);
          }
        }
  
        // scrollataan napin kohdalle
        point.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  });
  
let isHiding = false;

// ------------------------------
// INFO-LAATIKON NÄYTTÖ (yläpainikkeiden hover-teksti)
// ------------------------------
function showInfo(element, infoBoxId) {
  document.querySelectorAll('.info-box').forEach(box => {
    box.classList.remove('show');
    box.style.display = 'none';
  });

  const key = element.dataset.infoKey;
  const infoBox = document.getElementById(infoBoxId);
  const currentLanguage = localStorage.getItem('language') || 'fi';
  const infoText = kieliData[currentLanguage][key];

  if (infoBox) {
    infoBox.innerHTML = infoText;
    infoBox.style.display = 'block';
    setTimeout(() => infoBox.classList.add('show'), 10);
  }
}

// ------------------------------
// PAINIKKEEN KLIKKAUS (KIELI / TYÖKALU)
// ------------------------------
function showDetails(element, key) {
  const type = element.dataset.type;
  showDetailsBox(key, type);
}

// ------------------------------
// INFOBOXIN NÄYTTÖ (KIELET & TYÖKALUT)
// ------------------------------
async function showDetailsBox(key, type) {
  const lang = localStorage.getItem("language") || "fi";
  const container = document.getElementById("dynamic-details");

  if (isHiding) return; // Estetään avaaminen kesken piilotuksen

  // Jos sama laatikko on jo näkyvissä, suljetaan se
  if (container.classList.contains("show") && key === container.dataset.activeKey) {
    hideDetailsBox(container);
    return;
  }

  container.innerHTML = "";
  container.style.display = "block";
  container.dataset.activeKey = key;

  setTimeout(() => {
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);

  try {
    const response = await fetch(`../json/skills_${lang}.json`);
    const data = await response.json();
    const item = data.skills.find((s) => s.key === key);

    if (!item) {
      container.innerHTML = "<p>Ei tietoa osaamisesta.</p>";
      return;
    }

    const xp = item.xp || 0;
    const maxXp = item.maxXp || 1000;
    const xpPercent = Math.min((xp / maxXp) * 100, 100);

    const headerHTML = `
      <div class="skill-header">
        <h3>${item.name}</h3>
        <p>${item["description_" + lang] || item.description}</p>
        <p><strong>Taso:</strong> ${item.level}</p>
        <p><strong>XP:</strong> <span id="xp-count">0</span> / ${maxXp}</p>
        <div class="xp-bar">
          <div class="xp-fill" id="xp-fill-${key}" style="width: 0%"></div>
        </div>
        <button class="close-btn" onclick="closeDetailsBox()">×</button>
      </div>
    `;

    const tiersHTML = (item.tiers || []).map((tier, index) => {
      const items = (tier.skills || []).map((s) => {
        const status = s.status || "pending";
        return `<li class="${status}">${s.name}</li>`;
      }).join("");

      const extraClass = tier.title.toLowerCase().includes("mestari") ? "tier master" : "tier";

      return `
        <div class="${extraClass}" style="animation-delay: ${index * 100}ms">
          <h4>${tier.title}</h4>
          <ul>${items}</ul>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div class="skill-details">
        ${headerHTML}
        <div class="tiers">${tiersHTML}</div>
      </div>
    `;

    const isMobile = window.innerWidth <= 768;

    const observer = new IntersectionObserver((entries, obs) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        container.classList.add("show");
        const fill = document.getElementById(`xp-fill-${key}`);
        if (fill) fill.style.width = `${xpPercent}%`;
        const xpElement = document.getElementById("xp-count");
        if (xpElement) animateXPCount(xpElement, xp);
        obs.disconnect();
      }
    }, {
      threshold: isMobile ? 0.3 : 0.8 // jos 0.8 arvo on suurempi, niin infolaatikko ei näy /lataudu 800-1000px välillä välttämättä.
    });

    observer.observe(container);

  } catch (error) {
    console.error("Tiedon näyttäminen epäonnistui:", error);
    container.innerHTML = "<p>Virhe ladattaessa tietoja.</p>";
  }
}

// ------------------------------
// INFOBOXIN SULKEMINEN
// ------------------------------
function closeDetailsBox() {
  const container = document.getElementById("dynamic-details");
  hideDetailsBox(container);
}

function hideDetailsBox(container) {
  if (!container || isHiding || !container.classList.contains("show")) return;

  isHiding = true;
  container.classList.remove("show");
  container.classList.add("hide");

  setTimeout(() => {
    container.style.display = "none";
    container.classList.remove("hide");
    container.removeAttribute("data-active-key");
    isHiding = false;
  }, 1200); // Vastaa CSS-transitionin kestoa
}

// ------------------------------
// XP-NUMERON LASKURIANIMAATIO
// ------------------------------
function animateXPCount(element, endValue, duration = 2500) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const current = Math.floor(progress * endValue);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = endValue;
    }
  }

  requestAnimationFrame(update);
}

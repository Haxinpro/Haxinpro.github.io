

/* ============================================================
   KIELEN VAIHTO
   ============================================================ */
function switchLanguage(language) {
  window.currentLang = language;
  // Tallennetaan valittu kieli localStorageen
  localStorage.setItem('language', language);

  // Päivitetään kaikki tekstit (data-i18n)
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (kieliData[language] && kieliData[language][key]) {
      el.textContent = kieliData[language][key];
    }
  });

  // Päivitetään placeholderit
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (kieliData[language] && kieliData[language][key]) {
      el.placeholder = kieliData[language][key];
    }
  });

  // -------------------------------------
  // UUSI: dynamic-details laatikon uudelleenlataus
  // -------------------------------------
  const dynamicBox = document.getElementById("dynamic-details");
  const activeKey = dynamicBox?.dataset.activeKey;

  if (dynamicBox && dynamicBox.classList.contains("show") && activeKey) {
    // Suljetaan vanha laatikko
    dynamicBox.classList.remove("show");
    dynamicBox.removeAttribute("data-active-key");
    dynamicBox.style.display = "none";

    // Avataan uudelleen valitulla osaamisella
    const typeElement = document.querySelector(`[onclick*="${activeKey}"]`);
    if (typeElement) {
      setTimeout(() => {
        showDetails(typeElement, activeKey);
      }, 100);
    }
  }
}

// Ladataan kieli, kun sivu on valmis
document.addEventListener('DOMContentLoaded', () => {
  const language = localStorage.getItem('language') || 'fi';
  switchLanguage(language);
});


/* ============================================================
   TEEMAN VAIHTO (VALOISA / TUMMA)
   ============================================================ */
   document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('toggle');
    const toggleMobile = document.getElementById('toggle-mobile');
    const savedTheme = localStorage.getItem('theme');
    const useLight = savedTheme === 'light';
  
    // Aseta teema classilla (oletetaan, että se on jo asetettu early-scriptissä, mutta varmistetaan)
    if (useLight) {
      document.body.classList.add('light-theme');
      document.documentElement.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.documentElement.classList.remove('light-theme');
    }
  
    // Aseta toggle-nappien tilat oikein
    if (toggle) toggle.checked = !useLight;
    if (toggleMobile) toggleMobile.checked = !useLight;
  
    // Kuuntelijat – molemmat toggle-napit
    function setTheme(isDark) {
      if (isDark) {
        document.body.classList.remove('light-theme');
        document.documentElement.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.add('light-theme');
        document.documentElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      }
  
      if (toggle) toggle.checked = isDark;
      if (toggleMobile) toggleMobile.checked = isDark;
    }
  
    if (toggle) {
      toggle.addEventListener('change', () => setTheme(toggle.checked));
    }
  
    if (toggleMobile) {
      toggleMobile.addEventListener('change', () => setTheme(toggleMobile.checked));
    }
  });
  

/* ============================================================
   INFO-LAATIKKO TOIMINTO
   ============================================================ */

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  menu.classList.toggle("show");

  const isOpen = menu.classList.contains("show");
  menuIcon.style.display = isOpen ? "none" : "inline";
  closeIcon.style.display = isOpen ? "inline" : "none";
}

document.addEventListener('click', function (e) {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('show');

    // Päivitä kuvake oikein
    if (menuIcon && closeIcon) {
      menuIcon.style.display = "inline";
      closeIcon.style.display = "none";
    }
  }
});


const toggleMobile = document.getElementById('toggle-mobile');
const body = document.body;

if (toggleMobile) {
  toggleMobile.checked = !body.classList.contains('light-theme');

  toggleMobile.addEventListener('change', function () {
    if (this.checked) {
      body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }

    // Synkronoi myös pää-toggle
    const mainToggle = document.getElementById('toggle');
    if (mainToggle) mainToggle.checked = toggleMobile.checked;
  });
}

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById("mobileMenu");
    menu.classList.remove("show");
  });
});

/*   function showInfo(element, targetId) {
    const key = element.getAttribute("data-info-key");
    const language = localStorage.getItem('language') || 'fi';
  
    // Varmistetaan että kielidata ja avain ovat olemassa
    if (!kieliData[language] || !kieliData[language][key]) return;
  
    const text = kieliData[language][key];
    const infoBox = document.getElementById(targetId);
  
    // Jos sama teksti on jo näkyvissä, piilotetaan laatikko
    if (infoBox.textContent === text && infoBox.style.display === "block") {
      infoBox.style.display = "none";
      infoBox.textContent = "";
    } else {
      infoBox.textContent = text;
      infoBox.style.display = "block";
    }
  }
   */

// kuvavaihtuu

// Kuva vaihtuu automaattisesti
// const imagePaths = [
//   "../photos/mina.png",
//   "../photos/mina.png",
//   "../photos/mina.png"
// ];

// let currentImage = 0;
// const imageElement = document.getElementById("about-img");

// setInterval(() => {
//   currentImage = (currentImage + 1) % imagePaths.length;
//   imageElement.style.opacity = 0;
//   setTimeout(() => {
//     imageElement.src = imagePaths[currentImage];
//     imageElement.style.opacity = 1;
//   }, 300);
// }, 4000);

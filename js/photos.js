function openLightbox(img) {
  const rect = img.getBoundingClientRect();

  const clone = img.cloneNode();
  clone.style.transform = 'translate(-50%, -50%) scale(1.2)';
  clone.style.position = 'absolute';
  clone.style.top = `${rect.top}px`;
  clone.style.left = `${rect.left}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.opacity = '0';
  clone.style.transition = 'all 2.0s cubic-bezier(0.23, 1, 0.32, 1)';
  clone.style.zIndex = '1001';

  const lightbox = document.getElementById('lightbox');
  lightbox.innerHTML = ''; // tyhjennä vanha
  lightbox.appendChild(clone);
  lightbox.style.display = 'flex';

  // Pakotetaan selain tunnistamaan alkuasento ennen animointia
  requestAnimationFrame(() => {
    clone.style.top = '50%';
    clone.style.left = '50%';
    clone.style.transform = 'translate(-50%, -50%) scale(1)';
    clone.style.width = '90vw';
    clone.style.height = 'auto';
    clone.style.opacity = '1';
  });
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const clone = lightbox.querySelector('img');

  if (clone) {
    // Aloitetaan ulos-zoomaus
    clone.style.transition = 'all 2.0s ease';
    clone.style.opacity = '0';
    clone.style.transform = 'translate(-50%, -50%) scale(0.8)';

    // Odotetaan animaation loppuun, sitten poistetaan lightbox
    setTimeout(() => {
      lightbox.style.display = 'none';
      lightbox.innerHTML = '';
    }, 1500); // 1000ms = 1s, odotetaan animaation loppuun
  } else {
    lightbox.style.display = 'none';
    lightbox.innerHTML = '';
  }
}


document.querySelectorAll('.project-image img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img));
});





const isMobile = window.innerWidth <= 1500;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // näkyy vain kerran
    }
  });
}, {
  threshold: isMobile ? 0.2 : 0.7,
  rootMargin: isMobile ? "0px 0px -10% 0px" : "0px"
});

document.querySelectorAll('.project-card').forEach(card => {
  observer.observe(card);
});




// karuselli + dot-indikaattorit

function initCarousel(carouselId) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const items = carousel.querySelectorAll('.carousel-item');
  const dotContainer = document.getElementById(`dots-${carouselId}`);
  const dots = [];
  let currentIndex = 0;

  // Luo pisteet (dots)
  items.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => showSlide(i));
    dotContainer.appendChild(dot);
    dots.push(dot);
  });

  function showSlide(index) {
    items.forEach((item, i) => {
      item.classList.remove('active');
      if (i === index) item.classList.add('active');
    });
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
    currentIndex = index;
  }

  function next() {
    const nextIndex = (currentIndex + 1) % items.length;
    showSlide(nextIndex);
  }

  function prev() {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(prevIndex);
  }

  // Tallenna funktiot karuselliin
  carousel.next = next;
  carousel.prev = prev;

  // Näytä ensimmäinen dia ja merkkaa piste aktiiviseksi
  showSlide(0);
}

// Käynnistys
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    initCarousel(carousel.id);
  });
});

function nextSlide(id) {
  const carousel = document.getElementById(id);
  if (carousel && carousel.next) carousel.next();
}

function prevSlide(id) {
  const carousel = document.getElementById(id);
  if (carousel && carousel.prev) carousel.prev();
}


// Filtteri

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    // Vaihdetaan aktiivinen nappi
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Näytetään/suodatetaan projektit
    document.querySelectorAll('.project-card').forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      if (filter === 'all' || tags.includes(filter)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});


document.querySelectorAll('.category-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    // Piilota kaikki ryhmät
    document.querySelectorAll('.filter-options').forEach(group => group.classList.remove('active'));

    // Näytä valittu
    const target = btn.dataset.category;
    const group = document.getElementById(target);
    if (group) group.classList.add('active');
  });
});

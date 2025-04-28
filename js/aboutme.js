const cards = document.querySelectorAll('.about-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));

// =====================
// ABOUTME Korttien fade-in scrollissa
// =====================
document.addEventListener("DOMContentLoaded", function () {
    const aboutCards = document.querySelectorAll(".about-card");

    function revealCards() {
        const triggerBottom = window.innerHeight * 0.9;

        aboutCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.classList.add("visible");
                }, index * 1000); // 200ms väli jokaiselle kortille
            }
        });
    }

    window.addEventListener("scroll", revealCards);
    revealCards();
});


document.addEventListener("DOMContentLoaded", () => {
    const paladinImage = document.querySelector("#paladin-click-img");
    const voiceLines = [
        { img: "../ee/ee1.webp", audio: "../ee/voice1.ogg" },
        { img: "../ee/ee2.webp", audio: "../ee/voice2.ogg" },
        { img: "../ee/ee3.webp", audio: "../ee/voice3.ogg" },
        { img: "../ee/ee4.jpg", audio: "../ee/voice4.ogg" },
    ];

    const defaultImg = "../photos/Paladin.png";
    let currentIndex = 0;
    let finished = false;
    let currentAudio = null;

    if (paladinImage) {
        paladinImage.addEventListener("click", () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            // Aloita fade-out
            paladinImage.classList.remove("visible");

            setTimeout(() => {
                if (!finished) {
                    const current = voiceLines[currentIndex];
                    paladinImage.src = current.img;
                    currentAudio = new Audio(current.audio);
                    currentAudio.play();

                    currentIndex++;

                    if (currentIndex >= voiceLines.length) {
                        finished = true;
                    }
                } else {
                    paladinImage.src = defaultImg;
                    paladinImage.style.pointerEvents = "none";
                }

                // Fade-in
                paladinImage.classList.add("visible");
            }, 100);
        });
    }
});


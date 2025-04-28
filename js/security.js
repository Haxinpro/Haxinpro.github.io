document.addEventListener("DOMContentLoaded", () => {
  // Jos käyttäjä on jo kirjautunut sisään, ohjataan pois tältä sivulta
  if (localStorage.getItem("authenticated") === "true") {
    window.location.href = "pages/welcome.html";
    return;
  }

  const form = document.getElementById("security-form");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  async function getCorrectHash() {
    try {
      const encodedUrl = getObfuscatedUrl();
      const response = await fetch(encodedUrl);
      const text = await response.text();
      return text.trim();
    } catch (error) {
      console.error("Hashin hakeminen epäonnistui:", error);
      return null;
    }
  }

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = passwordInput.value;
    const hashedInput = await hashPassword(input);
    const correctHash = await getCorrectHash();

    if (!correctHash) {
      errorMessage.textContent = "Palvelinvirhe. Yritä myöhemmin uudelleen.";
      errorMessage.classList.add("show");
      return;
    }

    if (hashedInput === correctHash) {
      localStorage.setItem("authenticated", "true");
      window.location.href = "pages/welcome.html";
    } else {
      errorMessage.textContent = "Palvelin virhe. Yritä hetken päästä uudelleen.";
      errorMessage.classList.add("show");
    }
  });
});
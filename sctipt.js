document.addEventListener("DOMContentLoaded", () => {
  
  const greetingElement = document.getElementById("dynamic-greeting");
  if (greetingElement) {
    const hour = new Date().getHours();
    let greetingText = "Olá! Bem-vindo(a)";

    if (hour >= 5 && hour < 12) {
      greetingText = "☀️ Bom dia! Bem-vindo(a)";
    } else if (hour >= 12 && hour < 18) {
      greetingText = "🌤️ Boa tarde! Bem-vindo(a)";
    } else {
      greetingText = "🌙 Boa noite! Bem-vindo(a)";
    }

    greetingElement.textContent = greetingText;
  }

  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector(".theme-icon") : null;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (themeIcon) themeIcon.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      let newTheme = "dark";

      if (currentTheme === "dark") {
        newTheme = "light";
      }

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      if (themeIcon) {
        themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
      }
    });
  }

  const nirInput = document.getElementById("nir-value");
  const redInput = document.getElementById("red-value");
  const nirDisp = document.getElementById("nir-disp");
  const redDisp = document.getElementById("red-disp");
  const ndviScore = document.getElementById("ndvi-score");
  const ndviStatus = document.getElementById("ndvi-status");

  function calculateNDVI() {
    if (!nirInput || !redInput) return;

    const nir = parseFloat(nirInput.value);
    const red = parseFloat(redInput.value);

    nirDisp.textContent = nir.toFixed(2);
    redDisp.textContent = red.toFixed(2);

    const denominator = nir + red;
    let ndvi = 0;

    if (denominator !== 0) {
      ndvi = (nir - red) / denominator;
    }

    ndviScore.textContent = ndvi.toFixed(2);

    if (ndvi < 0) {
      ndviStatus.textContent = "💧 Corpo d'Água ou Nuvem";
    } else if (ndvi < 0.2) {
      ndviStatus.textContent = "🏜️ Solo Exposto ou Rocha";
    } else if (ndvi < 0.5) {
      ndviStatus.textContent = "🌾 Vegetação Rasteira / Escassa";
    } else {
      ndviStatus.textContent = "🌳 Vegetação Densa e Saudável";
    }
  }

  if (nirInput && redInput) {
    nirInput.addEventListener("input", calculateNDVI);
    redInput.addEventListener("input", calculateNDVI);
  }

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      const email = document.getElementById("email");
      const mensagem = document.getElementById("mensagem");
      const lgpd = document.getElementById("lgpd");

      const errEmail = document.getElementById("error-email");
      const errMensagem = document.getElementById("error-mensagem");
      const errLgpd = document.getElementById("error-lgpd");
      const successMsg = document.getElementById("form-success");

      [errEmail, errMensagem, errLgpd].forEach(el => {
        if (el) el.style.display = "none";
      });
      if (successMsg) successMsg.style.display = "none";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        if (errEmail) errEmail.style.display = "block";
        isValid = false;
      }

      if (!mensagem.value.trim()) {
        if (errMensagem) errMensagem.style.display = "block";
        isValid = false;
      }

      if (!lgpd.checked) {
        if (errLgpd) errLgpd.style.display = "block";
        isValid = false;
      }

      if (isValid) {
        if (successMsg) {
          successMsg.style.display = "block";
        }
        contactForm.reset();
      }
    });
  }

});
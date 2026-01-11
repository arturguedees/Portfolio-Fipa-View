// ================================
// ANIMAÇÃO AO CARREGAR AS SECTIONS
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.6s ease";

    setTimeout(() => {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// ================================
// NAVBAR COM SCROLL
// ================================
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ================================
// VALIDAÇÃO DE FORMULÁRIO
// ================================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

function validateForm() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  let errors = [];

  if (!nome) errors.push("Nome");
  if (!email) errors.push("E-mail");
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    formMessage.className = "error";
    formMessage.textContent = "Por favor, insira um e-mail válido.";
    return false;
  }
  if (!mensagem) errors.push("Mensagem");

  formMessage.classList.remove("hidden");

  if (errors.length > 0) {
    formMessage.className = "error";
    formMessage.textContent =
      "Por favor, preencha os campos: " + errors.join(", ");
    return false;
  }

  formMessage.className = "success";
  formMessage.textContent = "Mensagem enviada com sucesso!";
  contactForm.reset();

  setTimeout(() => {
    formMessage.classList.add("hidden");
  }, 5000);

  return true;
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
  });
}

// ================================
// VIDEO CAROUSEL (COM ANIMAÇÃO)
// ================================
(() => {
  const carousel = document.querySelector(".video-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const prevBtn = carousel.querySelector(".carousel-btn.prev");

  let currentIndex = 0;


  function setupSlides() {
    const width = carousel.getBoundingClientRect().width;
    slides.forEach(slide => {
      slide.style.flex = `0 0 ${width}px`;
      slide.style.width = `${width}px`;
    });
    track.style.display = "flex";
    track.style.transition = "transform 0.45s ease-in-out";
    track.style.width = `${width * slides.length}px`;
  }

  function goTo(index) {
    currentIndex = (index + slides.length) % slides.length;
    const width = carousel.getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * width}px)`;

    slides.forEach((slide, i) => {
      const video = slide.querySelector("video");
      if (!video) return;

      if (i === currentIndex) {
        slide.classList.add("is-active");
        // play only the active video
        video.play().catch(() => {});
      } else {
        slide.classList.remove("is-active");
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  function next() { goTo(currentIndex + 1); }
  function prev() { goTo(currentIndex - 1); }

  nextBtn.addEventListener("click", () => { next(); });
  prevBtn.addEventListener("click", () => { prev(); });

  setupSlides();
  goTo(0);
  // recalcular larguras ao redimensionar
  window.addEventListener('resize', () => {
    setupSlides();
    goTo(currentIndex);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();

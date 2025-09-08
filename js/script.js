// Menú hamburguesa
const toggle = document.getElementById("menuBtn");
const nav = document.getElementById("menuNav");
const overlay = document.getElementById("overlay");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  toggle.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  nav.classList.remove("active");
  toggle.classList.remove("active");
  overlay.classList.remove("active");
});

// Carrusel
const slides = document.getElementById("slides");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let index = 0;
const total = slides.children.length;

// Función para mostrar slide
function showSlide(i) {
  index = (i + total) % total; // se asegura que sea circular
  slides.style.transform = `translateX(${-index * 100}%)`;
}

// Botones
document.getElementById("prev").addEventListener("click", () => showSlide(index - 1));
document.getElementById("next").addEventListener("click", () => showSlide(index + 1));

// Auto-play
setInterval(() => showSlide(index + 1), 5000); // cada 5 segundos

// Lightbox con animación
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const clickableImages = document.querySelectorAll(".clickable");

clickableImages.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;

    // Reinicia la animación al abrir
    lightboxImg.style.animation = "none";
    void lightboxImg.offsetWidth; // "reflow" para reiniciar animación
    lightboxImg.style.animation = "zoomIn 0.5s ease forwards";
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
});


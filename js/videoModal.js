document.addEventListener("DOMContentLoaded", () => {
  const videoLinks = document.querySelectorAll(".btn"); // los botones de microcápsulas
  const videoModal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const closeVideo = document.getElementById("closeVideo");

  videoLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // evita que abra otra pestaña

      const videoSrc = link.getAttribute("href"); // obtenemos el link del botón
      modalVideo.querySelector("source").src = videoSrc;
      modalVideo.load(); // recarga la fuente del video
      videoModal.style.display = "flex";
      modalVideo.play(); // comienza el video automáticamente
    });
  });

  // Cerrar modal
  closeVideo.addEventListener("click", () => {
    videoModal.style.display = "none";
    modalVideo.pause();
    modalVideo.currentTime = 0; // reinicia el video
  });

  // Cerrar clickeando afuera
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.style.display = "none";
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
  });
});

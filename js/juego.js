// ====== Menú hamburguesa (si lo usas en esta página) ======
const toggle = document.getElementById("menuBtn");
const nav = document.getElementById("menuNav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    toggle.classList.toggle("active");
  });
}

// ====== Juego ======
let score = 0;
let time = 45; // puedes cambiarlo
let timer;
let started = false;
let remaining = 0;

const items = document.querySelectorAll(".draggable");
const bins = document.querySelectorAll(".bin");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const leftDisplay = document.getElementById("left");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const gameTitle = document.getElementById("gameTitle");
const startOverlay = document.getElementById("startOverlay");
const btnStart = document.getElementById("btnStart");

// Sonidos
const soundCorrect = document.getElementById("sound-correct");
const soundError   = document.getElementById("sound-error");
const soundApplause= document.getElementById("sound-applause");

// Contador de piezas restantes
remaining = items.length;
leftDisplay.textContent = remaining;

// Preparar drag: referencia directa al elemento arrastrado
let draggedEl = null;

items.forEach(item => {
  // Inicia deshabilitado (draggable=false en HTML)
  item.classList.remove("active");

  item.addEventListener("dragstart", (e) => {
    if (!started) { e.preventDefault(); return; }
    draggedEl = item;
    // Opcional: para que se vea más natural
    e.dataTransfer.effectAllowed = "move";
  });
});

// Bins: visual y lógica
bins.forEach(bin => {
  bin.addEventListener("dragover", (e) => {
    if (!started) return;
    e.preventDefault();
    bin.classList.add("over");
  });

  bin.addEventListener("dragleave", () => bin.classList.remove("over"));

  bin.addEventListener("drop", (e) => {
    if (!started) return;
    e.preventDefault();
    bin.classList.remove("over");
    if (!draggedEl) return;

    const expected = draggedEl.dataset.bin;
    const targetBin = bin.dataset.bin;

    if (expected === targetBin) {
      // Acierto
      score++;
      remaining--;
      scoreDisplay.textContent = score;
      leftDisplay.textContent = remaining;

      // Sonido + animación + ocultar
      try { soundCorrect.currentTime = 0; soundCorrect.play(); } catch {}
      draggedEl.classList.add("correct");
      draggedEl.style.pointerEvents = "none";
      setTimeout(() => { draggedEl.style.display = "none"; }, 320);

      // ¿Ganó antes de que acabe el tiempo?
      if (remaining <= 0) {
        endGame(true);
      }
    } else {
      // Error
      score = Math.max(0, score - 1); // que no baje de 0 si prefieres
      scoreDisplay.textContent = score;
      try { soundError.currentTime = 0; soundError.play(); } catch {}
      alert("❌ Basurero incorrecto. ¡Sigue intentando!");
    }

    draggedEl = null;
  });
});

// Temporizador
function startTimer() {
  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time <= 0) {
      endGame(false);
    }
  }, 1000);
}

// Confeti 🎉
function launchConfetti() {
  const duration = 2000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    }));
  }, 200);
}

// Terminar juego
function endGame(win = false) {
  clearInterval(timer);
  started = false;

  // Oculta área de juego y muestra resultado
  document.querySelector(".game-area").style.display = "none";
  gameOverScreen.style.display = "block";
  finalScore.textContent = score;

  if (win) {
    gameTitle.textContent = "¡Excelente! ¡Clasificaste todo! 🌟";
    try { soundApplause.currentTime = 0; soundApplause.play(); } catch {}
    launchConfetti();
  } else {
    gameTitle.textContent = "⏳ Se acabó el tiempo";
  }
}

// Reiniciar
function restartGame() {
  window.location.reload();
}

// Iniciar partida
function startGame() {
  if (started) return;
  started = true;
  // habilitar drag
  items.forEach(el => {
    el.setAttribute("draggable", "true");
    el.classList.add("active");
  });
  // ocultar tarjeta de inicio
  if (startOverlay) startOverlay.style.display = "none";
  // iniciar timer
  startTimer();
}

if (btnStart) {
  btnStart.addEventListener("click", startGame);
}

// =================== QUIZ ===================
document.addEventListener("DOMContentLoaded", () => {
  const openQuiz = document.getElementById("openQuiz");
  const quizModal = document.getElementById("quizModal");
  const closeQuiz = document.getElementById("closeQuiz");
  const submitQuiz = document.getElementById("submitQuiz");
  const resultado = document.getElementById("resultado");
  const quizActions = document.getElementById("quizActions");
  const retryQuiz = document.getElementById("retryQuiz");
  const exitQuiz = document.getElementById("exitQuiz");

  function resetQuiz() {
    document.getElementById("quizForm").reset();
    resultado.style.display = "none";
    resultado.innerHTML = "";
    quizActions.style.display = "none";
    submitQuiz.style.display = "block";
  }

  if (openQuiz) {
    openQuiz.addEventListener("click", () => {
      quizModal.style.display = "flex";
    });
  }

  if (closeQuiz) {
    closeQuiz.addEventListener("click", () => {
      quizModal.style.display = "none";
      resetQuiz();
    });
  }

  if (exitQuiz) {
    exitQuiz.addEventListener("click", () => {
      quizModal.style.display = "none";
      resetQuiz();
    });
  }

  if (submitQuiz) {
    submitQuiz.addEventListener("click", () => {
      let correctas = {
        q1: "b",
        q2: "d",
        q3: "d",
        q4: "b",
        q5: "c",
        q6: "b"
      };

      let total = 6;
      let score = 0;

      for (let p in correctas) {
        let respuesta = document.querySelector(`input[name="${p}"]:checked`);
        if (respuesta && respuesta.value === correctas[p]) score++;
      }

      let mensaje = "";
      if (score >= 5) {
        mensaje = "🌟 ¡Eres un experto en residuos sólidos!";
      } else if (score >= 3) {
        mensaje = "👍 ¡Estás en el camino correcto!";
      } else {
        mensaje = "📚 ¡No te preocupes, puedes aprender más!";
      }

      resultado.innerHTML = `<h3>Tu puntaje: ${score} / ${total}</h3><p>${mensaje}</p>`;
      resultado.style.display = "block";
      quizActions.style.display = "block";
      submitQuiz.style.display = "none";
    });
  }

  if (retryQuiz) retryQuiz.addEventListener("click", resetQuiz);
});

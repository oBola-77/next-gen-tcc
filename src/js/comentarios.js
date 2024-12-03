document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reviewForm");
    const reviewsList = document.getElementById("reviewsList");
  
    // Comentários fictícios iniciais no HTML
    const defaultReviews = [
      { emoji: "😊", name: "João Silva", comment: "Ótima experiência! O serviço foi rápido e eficiente, estou muito satisfeito." },
      { emoji: "😊", name: "Ana Souza", comment: "Atendimento excelente! Todos foram muito atenciosos e resolveram meu problema rapidamente." },
      { emoji: "😊", name: "Carlos Mendes", comment: "Super recomendo! O serviço foi impecável, com muita qualidade e agilidade." },
    ];
  
    // Carrega comentários do localStorage ou usa os fictícios como fallback
    function loadReviews() {
      const reviews = JSON.parse(localStorage.getItem("reviews")) || defaultReviews;
      reviewsList.innerHTML = "";  // Limpa a lista de comentários
  
      reviews.forEach((review) => {
        const li = document.createElement("li");
        li.innerHTML = `<p><strong>${review.emoji} ${review.name}:</strong> ${review.comment}</p>`;
        reviewsList.appendChild(li);
      });
    }
  
    // Salva um novo comentário
    function saveReview(review) {
      const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviews.push(review);
      localStorage.setItem("reviews", JSON.stringify(reviews));
    }
  
    // Adiciona evento ao formulário
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const rating = document.getElementById("rating").value;
      const comment = document.getElementById("comment").value.trim();
  
      if (name && rating && comment) {
        const emojis = {
          "5": "😊",
          "4": "🙂",
          "3": "😐",
          "2": "😒",
          "1": "😞",
        };
  
        const review = {
          emoji: emojis[rating],
          name: name,
          comment: comment,
        };
  
        saveReview(review);
        form.reset();
        loadReviews();
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    });
  
    loadReviews();  // Carrega os comentários ao carregar a página
  });
  
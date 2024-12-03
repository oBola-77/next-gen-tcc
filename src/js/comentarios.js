document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reviewForm");
    const reviewsList = document.getElementById("reviewsList");
  
    const defaultReviews = [
      { emoji: "😊", name: "João Silva", comment: "Ótima experiência! O serviço foi rápido e eficiente, estou muito satisfeito." },
      { emoji: "😊", name: "Ana Souza", comment: "Atendimento excelente! Todos foram muito atenciosos e resolveram meu problema rapidamente." },
      { emoji: "😊", name: "Carlos Mendes", comment: "Super recomendo! O serviço foi impecável, com muita qualidade e agilidade." },
    ];
  
    function loadReviews() {
      const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviewsList.innerHTML = "";
  
      reviews.forEach((review) => {
        const li = document.createElement("li");
        li.innerHTML = `<p><strong>${review.emoji} ${review.name}:</strong> ${review.comment}</p>`;
        reviewsList.appendChild(li);
      });
  
      defaultReviews.forEach((review) => {
        const li = document.createElement("li");
        li.innerHTML = `<p><strong>${review.emoji} ${review.name}:</strong> ${review.comment}</p>`;
        reviewsList.appendChild(li);
      });
    }
  
    function saveReview(review) {
      const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviews.push(review);
      localStorage.setItem("reviews", JSON.stringify(reviews));
    }
  
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
  
    loadReviews();  
  });
  
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reviewForm");
    const reviewsList = document.getElementById("reviewsList");

    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviewsList.innerHTML = "";

        reviews.forEach((review) => {
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

        const rating = document.getElementById("rating").value;
        const comment = document.getElementById("comment").value.trim();

        if (rating && comment) {
            const emojis = {
                "5": "😊",
                "4": "🙂",
                "3": "😐",
                "2": "😒",
                "1": "😞",
            };

            const review = {
                emoji: emojis[rating],
                name: "Anônimo",
                comment: comment,
            };

            saveReview(review);
            form.reset();
            loadReviews();
        }
    });

    loadReviews();
});
const name = document.getElementById("name").value.trim();
if (rating && comment && name) {
    const review = {
        emoji: emojis[rating],
        name: name || "Anônimo",
        comment: comment,
    };
    saveReview(review);
    form.reset();
    loadReviews();
}


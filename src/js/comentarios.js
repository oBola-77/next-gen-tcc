document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reviewForm");
    const reviewsList = document.getElementById("reviewsList");

    async function loadComments() {
        try {
            const response = await fetch("https://example.com/api/comments");
            const comments = await response.json();
            reviewsList.innerHTML = "";

            comments.forEach((comment) => {
                const li = document.createElement("li");
                li.innerHTML = `<p><strong>${getEmoji(comment.rating)}:</strong> ${comment.text}</p>`;
                reviewsList.appendChild(li);
            });
        } catch (error) {
            console.error("Erro ao carregar comentários:", error);
        }
    }

    async function submitComment(rating, text) {
        try {
            await fetch("https://example.com/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating, text }),
            });
            loadComments();
        } catch (error) {
            console.error("Erro ao enviar comentário:", error);
        }
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const rating = document.getElementById("rating").value;
        const comment = document.getElementById("comment").value.trim();

        if (rating && comment) {
            submitComment(rating, comment);
            form.reset();
        }
    });

    function getEmoji(rating) {
        const emojis = {
            "5": "😊",
            "4": "🙂",
            "3": "😐",
            "2": "😒",
            "1": "😞",
        };
        return emojis[rating] || "😐";
    }

    loadComments();
});

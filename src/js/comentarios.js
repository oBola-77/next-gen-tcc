document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("commentForm");
    const commentsSection = document.getElementById("comments");

    loadComments();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const comment = document.getElementById("comment").value.trim();

        if (name && comment) {
            const commentObj = { id: Date.now(), name, comment, responses: [] };
            saveComment(commentObj);
            form.reset();
            loadComments();
        }
    });

    function saveComment(comment) {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push(comment);
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        commentsSection.innerHTML = "";
        comments.forEach((comment) => {
            if (comment.name && comment.comment) {
                const div = document.createElement("div");
                div.classList.add("comment");
                div.innerHTML = `
                    <strong>${comment.name}</strong>: <p>${comment.comment}</p>
                    <button onclick="deleteComment(${comment.id})">Deletar Comentário</button>
                    <div class="response">
                        <textarea id="response-${comment.id}" placeholder="Sua resposta..."></textarea>
                        <button onclick="respondToComment(${comment.id})">Responder</button>
                        <div id="responses-${comment.id}"></div>
                    </div>
                `;

                comment.responses.forEach((response, index) => {
                    div.querySelector(`#responses-${comment.id}`).innerHTML += `
                        <div class="response-item">
                            <p><strong>Você:</strong> ${response} <button onclick="deleteResponse(${comment.id}, ${index})">Excluir</button></p>
                        </div>
                    `;
                });

                commentsSection.appendChild(div);
            }
        });
    }

    window.deleteComment = function(id) {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        const updatedComments = comments.filter(comment => comment.id !== id);
        localStorage.setItem("comments", JSON.stringify(updatedComments));
        loadComments();
    };

    window.respondToComment = function(id) {
        const commentText = document.getElementById(`response-${id}`).value.trim();
        if (commentText) {
            const comments = JSON.parse(localStorage.getItem("comments")) || [];
            const comment = comments.find(c => c.id === id);
            comment.responses.push(commentText);
            localStorage.setItem("comments", JSON.stringify(comments));
            loadComments();
        }
    };

    window.deleteResponse = function(commentId, responseIndex) {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
            comment.responses.splice(responseIndex, 1);
            localStorage.setItem("comments", JSON.stringify(comments));
            loadComments();
        }
    };
});

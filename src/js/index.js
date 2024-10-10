document.addEventListener('DOMContentLoaded', () => {
    const btnAvancar = document.getElementById('btn-avancar');
    const btnVoltar = document.getElementById('btn-voltar');
    const listaPersonagens = document.querySelector('.lista-personagens');
    const cards = document.querySelectorAll('.cartao');
    const totalCards = cards.length;
    const cardsPorPagina = 3;
    let paginaAtual = 0;
    const totalPaginas = Math.ceil(totalCards / cardsPorPagina);

    function atualizarCards() {
        const start = paginaAtual * cardsPorPagina;
        const end = start + cardsPorPagina;

        // Aplica a transformação para exibir os cards corretos
        listaPersonagens.style.transform = `translateX(-${paginaAtual * 100}%)`;
    }

    btnAvancar.addEventListener('click', () => {
        if (paginaAtual < totalPaginas - 1) {
            paginaAtual++;
            atualizarCards();
        }
    });

    btnVoltar.addEventListener('click', () => {
        if (paginaAtual > 0) {
            paginaAtual--;
            atualizarCards();
        }
    });

    atualizarCards(); 
});

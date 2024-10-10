function showDescription(id) {
    // Esconde todas as descrições
    const descriptions = document.querySelectorAll('.description');
    descriptions.forEach(desc => desc.style.display = 'none');

    // Exibe a descrição clicada
    const description = document.getElementById(id);
    if (description) {
        description.style.display = 'block';
    }
}
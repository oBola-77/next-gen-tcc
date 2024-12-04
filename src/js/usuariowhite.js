// Seleciona múltiplos checkboxes para alternar o tema
const toggleCheckboxes = document.querySelectorAll('#toggle-theme, #toggle-theme-mobile');
const body = document.body;

// Seleção de elementos que precisam de ajustes
const customShapeDivider = document.querySelector('.custom-shape-divider-bottom-1683068753');
const svgElement = customShapeDivider?.querySelector('svg');
const logoImg = document.querySelector('.logo img');
const h1 = document.querySelector('.body.light-mode .container h1');
const h2 = document.querySelector('.body.light-mode .container h2');
const reviewsli = document.querySelector('.body.light-mode .reviews li');
const reviewFormLabel = document.querySelector('body.light-mode .review-form label');
const button = document.querySelector('.body.light-mode .button');
const coment = document.querySelector('.body.light-mode #comment');
const rating = document.querySelector('.body.light-mode #rating');

// Verifica se o light mode está ativado no carregamento
if (localStorage.getItem('light-mode') === 'enabled') {
    body.classList.add('light-mode');

    // Marca todos os checkboxes como ativados
    toggleCheckboxes.forEach((checkbox) => {
        checkbox.checked = true;
    });

    // Ajusta elementos específicos para o light mode
    if (customShapeDivider) {
        customShapeDivider.style.backgroundColor = '#ffffff';
        svgElement.style.fill = '#eaeaea';
    }
    if (logoImg) {
        logoImg.src = '../src/imagem/logowhite.png'; // Caminho da imagem do light mode
    }
}

// Alterna entre modo escuro e claro
toggleCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        // Define o comportamento de animação baseado no estado atual
        if (this.checked) {
            // Adiciona a classe de entrada
            this.classList.add('clicked');
            this.classList.remove('unchecked');
        } else {
            // Adiciona a classe de saída
            this.classList.add('unchecked');
            this.classList.remove('clicked');
        }

        // Remove a classe após a animação terminar
        setTimeout(() => {
            this.classList.remove('clicked', 'unchecked');
        }, 300); // O tempo deve corresponder à duração da animação no CSS

        // Alterna entre modos light e dark
        if (this.checked) {
            body.classList.add('light-mode');

            // Ajusta elementos para o light mode
            if (customShapeDivider) {
                customShapeDivider.style.backgroundColor = '#ffffff';
                svgElement.style.fill = '#eaeaea';
            }
            if (logoImg) {
                logoImg.src = '../src/imagem/logowhite.png'; // Define a imagem do light mode
            }

            localStorage.setItem('light-mode', 'enabled');
        } else {
            body.classList.remove('light-mode');

            // Reverte os ajustes para o dark mode
            if (customShapeDivider) {
                customShapeDivider.style.backgroundColor = '#121212';
                svgElement.style.fill = ''; // Volta ao estilo padrão
            }
            if (logoImg) {
                logoImg.src = '../src/imagem/logoblack.png'; // Caminho da imagem padrão (dark mode)
            }

            localStorage.setItem('light-mode', 'disabled');
        }

        // Sincroniza todos os checkboxes
        toggleCheckboxes.forEach((otherCheckbox) => {
            otherCheckbox.checked = this.checked;
        });
    });
});
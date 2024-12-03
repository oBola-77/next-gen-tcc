const toggleCheckboxes = document.querySelectorAll('#toggle-theme, #toggle-theme-mobile');
const body = document.body;

// Seleção de elementos que precisam de ajustes
const customShapeDivider = document.querySelector('.custom-shape-divider-bottom-1683068753');
const svgElement = customShapeDivider?.querySelector('svg');
const logoImg = document.querySelector('.logo img');
const fields = document.querySelectorAll('.field'); // Todas as divs de input
const inputIcons = document.querySelectorAll('.input-icon'); // Ícones SVG nos campos

// Verifica se o light mode está ativado no carregamento
if (localStorage.getItem('light-mode') === 'enabled') {
    body.classList.add('light-mode');
    toggleCheckboxes.forEach((checkbox) => {
        checkbox.checked = true; // Marca todos os checkboxes como ativados
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
toggleCheckboxes.forEach((toggleCheckbox) => {
    toggleCheckbox.addEventListener('change', function () {
        // Adiciona classes para animação de entrada ou saída
        if (this.checked) {
            this.classList.add('clicked');
            this.classList.remove('unchecked');
        } else {
            this.classList.add('unchecked');
            this.classList.remove('clicked');
        }

        // Remove as classes após a animação terminar
        setTimeout(() => {
            this.classList.remove('clicked', 'unchecked');
        }, 300); // Tempo da animação em ms (correspondente ao CSS)

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
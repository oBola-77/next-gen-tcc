const toggleCheckboxes = document.querySelectorAll('#toggle-theme, #toggle-theme-mobile');
const body = document.body;

// Seleção de elementos que precisam de ajustes
const descricaoContainer = document.querySelector('.descricao-container');
const descricaoDiv = document.querySelector('.descricao');
const butao2button = document.querySelector('.butao2 button');
const customShapeDivider = document.querySelector('.custom-shape-divider-bottom-1683068753');
const svgElement = customShapeDivider?.querySelector('svg');
const pmeImage = document.querySelector('.pme img'); // Imagem dentro da div .pme
const pme2Image = document.querySelector('.pme2 img'); // Imagem dentro da div .pme2
const pme3Image = document.querySelector('.pme3 img'); // Imagem dentro da div .pme3
const logoImg = document.querySelector('.logo img'); // Imagem do logo no header

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
    if (pmeImage) {
        pmeImage.src = '../src/imagem/pmes-light.png'; // Caminho da imagem do light mode
    }
    if (pme2Image) {
        pme2Image.src = '../src/imagem/pmedesignwhite.png'; // Caminho da imagem do light mode para .pme2
    }
    if (pme3Image) {
        pme3Image.src = '../src/imagem/pmedesignwhite.png'; // Caminho da imagem do light mode para .pme3
    }
    if (logoImg) {
        logoImg.src = '../src/imagem/logowhite.png'; // Caminho da imagem do light mode
    }
}

// Alterna entre modo escuro e claro
toggleCheckboxes.forEach((toggleCheckbox) => {
    toggleCheckbox.addEventListener('change', function () {
        if (this.checked) {
            body.classList.add('light-mode');

            // Ajusta elementos para o light mode
            if (customShapeDivider) {
                customShapeDivider.style.backgroundColor = '#ffffff';
                svgElement.style.fill = '#eaeaea';
            }
            if (pmeImage) {
                pmeImage.src = '../src/imagem/pmes-light.png'; // Define a imagem do light mode
            }
            if (pme2Image) {
                pme2Image.src = '../src/imagem/pmedesignwhite.png'; // Define a imagem do light mode para .pme2
            }
            if (pme3Image) {
                pme3Image.src = '../src/imagem/pmedesignwhite.png'; // Define a imagem do light mode para .pme3
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
            if (pmeImage) {
                pmeImage.src = '../src/imagem/pmes.png'; // Caminho da imagem padrão (dark mode)
            }
            if (pme2Image) {
                pme2Image.src = '../src/imagem/pmedesign.png'; // Caminho da imagem padrão para .pme2
            }
            if (pme3Image) {
                pme3Image.src = '../src/imagem/pmedesign.png'; // Caminho da imagem padrão para .pme3
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
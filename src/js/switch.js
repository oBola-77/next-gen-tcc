const toggleCheckbox = document.getElementById('toggle-theme');
const body = document.body;

// Seleção de elementos que precisam de ajustes
const descricaoContainer = document.querySelector('.descricao-container');
const descricaoDiv = document.querySelector('.descricao');
const descricaoP = document.querySelector('.descricao p');
const customShapeDivider = document.querySelector('.custom-shape-divider-bottom-1683068753');
const svgElement = customShapeDivider?.querySelector('svg');
const pmeImage = document.querySelector('.pme img'); // Imagem dentro da div .pme
const logoImg = document.querySelector('.logo img'); // Imagem do logo no header

// Verifica se o light mode está ativado no carregamento
if (localStorage.getItem('light-mode') === 'enabled') {
  body.classList.add('light-mode');
  toggleCheckbox.checked = true;

  // Ajusta elementos específicos para o light mode
  if (customShapeDivider) {
    customShapeDivider.style.backgroundColor = '#ffffff';
    svgElement.style.fill = '#eaeaea';
  }
  if (pmeImage) {
    pmeImage.src = './src/imagem/pmes-light.png'; // Caminho da imagem do light mode
  }
  if (logoImg) {
    logoImg.src = './src/imagem/logowhite.png'; // Caminho da imagem do light mode
  }
}

// Alterna entre modo escuro e claro
toggleCheckbox.addEventListener('change', function () {
  if (this.checked) {
    body.classList.add('light-mode');

    // Ajusta elementos para o light mode
    if (customShapeDivider) {
      customShapeDivider.style.backgroundColor = '#ffffff';
      svgElement.style.fill = '#eaeaea';
    }
    if (pmeImage) {
      pmeImage.src = './src/imagem/pmes-light.png'; // Define a imagem do light mode
    }
    if (logoImg) {
      logoImg.src = './src/imagem/logowhite.png'; // Define a imagem do light mode
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
      pmeImage.src = './src/imagem/pmes.png'; // Caminho da imagem padrão (dark mode)
    }
    if (logoImg) {
      logoImg.src = './src/imagem/logoblack.png'; // Caminho da imagem padrão (dark mode)
    }

    localStorage.setItem('light-mode', 'disabled');
  }
});
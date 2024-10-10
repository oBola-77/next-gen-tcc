document.addEventListener("DOMContentLoaded", () => {
    // Função para carregar dados do localStorage
    function loadUserData() {
        // Carregar o nome do usuário
        const userName = localStorage.getItem('userName');
        if (userName) {
            document.getElementById('user-name').textContent = userName;
        }
        
        // Carregar a imagem do perfil
        const profileImgSrc = localStorage.getItem('profileImgSrc');
        if (profileImgSrc) {
            document.getElementById('profile-img').src = profileImgSrc;
        }
        
        // Carregar outras informações pessoais
        document.getElementById('email').value = localStorage.getItem('email') || '';
        document.getElementById('telefone').value = localStorage.getItem('telefone') || '';
        document.getElementById('endereco').value = localStorage.getItem('endereco') || '';
        document.getElementById('redes-sociais').value = localStorage.getItem('redesSociais') || '';
    }

    // Função para salvar dados no localStorage
    function saveUserData() {
        const userName = document.getElementById('user-name').textContent;
        localStorage.setItem('userName', userName);
        
        const profileImgSrc = document.getElementById('profile-img').src;
        localStorage.setItem('profileImgSrc', profileImgSrc);
        
        localStorage.setItem('email', document.getElementById('email').value);
        localStorage.setItem('telefone', document.getElementById('telefone').value);
        localStorage.setItem('endereco', document.getElementById('endereco').value);
        localStorage.setItem('redesSociais', document.getElementById('redes-sociais').value);
    }

    // Carregar os dados quando a página é carregada
    loadUserData();

    // Evento para salvar informações ao clicar no botão
    document.getElementById('save-contact').addEventListener('click', () => {
        saveUserData();
        alert('Informações salvas com sucesso!');
    });

    // Evento para alterar a imagem de perfil
    document.getElementById('change-img-btn').addEventListener('click', () => {
        document.getElementById('upload-img').click();
    });

    document.getElementById('upload-img').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profile-img').src = e.target.result;
                localStorage.setItem('profileImgSrc', e.target.result);
            }
            reader.readAsDataURL(file);
        }
    });
});

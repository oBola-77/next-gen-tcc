async function fetchTest() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.log('Token não encontrado');
        window.location.href = 'login.html';
        return null; // Retorna null explicitamente
    }

    try {
        const response = await fetch('/test', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Acesso não autorizado');
        }

        const data = await response.json(); // Extrai os dados JSON
        console.log('Resposta:', data);
        return data; // Retorna os dados corretamente
    } catch (error) {
        console.error('Erro:', error);
        return null; // Retorna null em caso de erro
    }
}

function renderizarProjetos(projetos) {
    console.log("Renderizando projetos");
    const container = document.getElementById('projects-container');
    container.innerHTML = '';

    projetos.forEach(projeto => {
        const card = document.createElement('div');
        card.classList.add('project-card');

        // Lógica para escolher a imagem dependendo do nome do projeto
        let imagemProjeto;
        if (projeto.tipoprojeto === 'Criação de Sites') {
            imagemProjeto = '../src/imagem/Site Profissional.png'; // Substitua pelo caminho real da imagem
        } else if (projeto.tipoprojeto === 'Campanha redes sociais') {
            imagemProjeto = 'caminho/para/imagem_instagram.jpg'; // Substitua pelo caminho real da imagem
        } else {
            imagemProjeto = '../src/imagem/Perfil e Campanhas nas Redes Sociais.png'; // Imagem padrão caso o nome não coincida
        }

        card.innerHTML = `
            <div class="project-info">
                <span class="project-title">${projeto.tipoprojeto}</span>
                <p class="project-description">${projeto.descricaoprojeto}</p>
                <p class="project-description">Consultor: ${projeto.consultor}</p>
                <p class="project-description">Status: ${projeto.status}</p>
                <p class="project-description">Data de Início: ${projeto.datainicio}</p>
            </div>
            <div class="project-image">
                <img src="${imagemProjeto}" alt="Imagem do Projeto">
            </div>
        `;

        container.appendChild(card);
    });
}

function renderizarUsuarios(dadosUsuario){
    console.log("Renderizando dados do usuario");
    document.getElementById("user-name").innerText = dadosUsuario[0].nomeCompleto;
    document.getElementById("email").placeholder = dadosUsuario[0].email;
    document.getElementById("telefone").placeholder = dadosUsuario[0].telefone;
    document.getElementById("nomeEmpresa").placeholder = dadosUsuario[0].nomeEmpresa;    
}

async function fetchProjetos() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error('Token não encontrado. Faça login.');
        return;
    }

    try {
        const response = await fetch('/test');
        if (response.ok) {
            const data = await response.json();
            console.log("responde data:", data);
            return data.projetos;
        } else {
            console.error("Erro ao buscar projetos", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
    }
}

function definirImagem(tituloProjeto) {
    switch (tituloProjeto) {
        case tituloProjeto:
            
            break;
    
        default:
            break;
    } 
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchTest();
    console.log(data);
    console.log(data.user)
    if (data) {
        console.log("Usuário autenticado:", data.user);
        console.log("Projetos recebidos:", data.projetos);
        console.log( "Dados do usuario recebidos:", data.dadosUsuario);

        if (data.projetos && data.projetos.length > 0) {
            renderizarProjetos(data.projetos); // Renderiza os projetos
            renderizarUsuarios(data.dadosUsuario); //Renderiza a cachorra da mae do usuario aquele filho de uma puta
        } else {
            console.log("Nenhum projeto para renderizar.");
        };
    }
});
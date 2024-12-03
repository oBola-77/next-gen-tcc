async function fetchTest() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.log('Token não encontrado');
        window.location.href = 'login.html';
        return null;
    }

    try {
        const response = await fetch('/cadastrarProjeto', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: SON.stringify(dadosLogin)
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


let formCadastro = document.getElementById('formCadastro');
formCadastro.addEventListener('submit', async function cadastrarProjeto(event) {
    event.preventDefault();

    let dadosProjeto = {
        idCliente: document.getElementById('id_Cliente').value,
        tipoProjeto: document.getElementById('tipoProjeto').value,
        descricaoProjeto: document.getElementById('descricaoProjeto').value,
        consultorProjeto: document.getElementById('consultorProjeto').value
    }

    console.log("Dados capturados no formulário:", dadosProjeto);

    if (Object.values(dadosProjeto).some(valor => !valor)) {
        alert("Preencha todos os campos");
        return;
    }

    try {
        const response = await fetch('/cadastrarProjeto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosProjeto)
        });

        if (response.ok) {
            const data = await response.json();
            alert("Projeto criado com sucesso!");
        } else {
            const errorData = await response.json();
            console.error("Erro ao cadastrar o projeto:", errorData.message || "Erro desconhecido");
            alert(errorData.message || "Erro ao cadastrar o projeto!");
        }

    } catch (error) {
        console.log('ocorreu um erro', error);
        alert("deu bosta");
    }
})


let formAtualizar = document.getElementById('formAtualizar');
formAtualizar.addEventListener('submit', async function atualizarProjeto(event) {
    event.preventDefault();

    let dadosAtualizar = {
        idProjeto: document.getElementById('uIdProjeto').value,
        tipoProjeto: document.getElementById('uTipoProjeto').value,
        descricaoProjeto: document.getElementById('uDescricaoProjeto').value,
        consultorProjeto: document.getElementById('uConsultorProjeto').value,
        statusProjeto: document.getElementById('uStatusProjeto').value
    }

    console.log("Dados capturados no formulário:", dadosAtualizar);

    console.log(dadosAtualizar)
    if (Object.values(dadosAtualizar).some(valor => !valor)) {
        alert("Preencha todos os campos");
        return;
    }

    try {
        const response = await fetch('/atualizarProjeto', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizar)
        });

        if (response.ok) {
            const data = await response.json();
            alert("Projeto atualizado com sucesso!");
        } else {
            const errorData = await response.json();
            console.error("Erro ao atualizar o projeto:", errorData.message || "Erro desconhecido");
            alert(errorData.message || "Erro ao atualizar o projeto!");
        }

    } catch (error) {
        console.log('ocorreu um erro', error);
        alert("deu bosta");
    }
})

function renderizarProjetos(projetos) {
    console.log("Renderizando projetos");
    const container = document.getElementById('projects-container');
    
    container.innerHTML = '';
    
    projetos.forEach(projeto => {
        
        const card = document.createElement('div');
        card.classList.add('project-card');
        
        card.innerHTML = `
        <div class="project-info">
        <span class="project-title">${projeto.tipoprojeto}</span>
        <p class="project-description">${projeto.descricaoprojeto}</p>
        <p class="project-description">Consultor: ${projeto.consultor}</p>
        <p class="project-description">Status: ${projeto.status}</p>
        <p class="project-description">Data de Início: ${projeto.datainicio}</p>
        </div>
        `;
        
        container.appendChild(card);
    });
}

let formBuscar = document.getElementById('formBuscar');
formBuscar.addEventListener('submit', async function listarProjeto(event) {
    event.preventDefault();

    let idCliente = document.getElementById('sIdCliente').value.trim();

    if (!idCliente) {
        alert("Preencha todos os campos");
        return;
    }

    console.log("Dados capturados no formulário:", idCliente);

    try {
        const response = await fetch(`/listarProjetos?sIdCliente=${encodeURIComponent(idCliente)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const projetos = await response.json();
            alert("Projetos listados com sucesso!", projetos);
            console.log("Projetos listados com sucesso!", projetos);
            renderizarProjetos(projetos);
        } else {
            const errorData = await response.json();
            console.error("Erro ao listar o projeto:", errorData.message || "Erro desconhecido");
            alert(errorData.message || "Erro ao listar o projeto!");
        }
    } catch (error) {
        console.log('ocorreu um erro', error);
        alert(error);
    }
})

async function fetchTest() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.log('Token não encontrado');
        window.location.href = 'login.html';
        return null;
    }

    try {
        const response = await fetch('/consultor', {
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

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchTest();
    console.log(data);
    if (data) {
        console.log("Usuário autenticado:", data);
    }
});


let formCadastro = document.getElementById('formCadastro');
formCadastro.addEventListener('submit', async function cadastrarProjeto(event) {
    event.preventDefault();

    let dadosProjeto = {
        idCliente: document.getElementById('id_Cliente').value,
        tipoProjeto: document.getElementById('tipoProjeto').value,
        descricaoProjeto: document.getElementById('descricaoProjeto').value,
        consultorProjeto: document.getElementById('consultorProjeto').value
    }

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

        if(response.ok) {
            const data = await response.json();

            if(data.dadosAdmin) {
                alert("Projeto criado");
            } else {
                alert("erro ao criar projeto");
            }
        } else {
            console.error('erro ao cadastrar projeto', data.message);
        }

    } catch (error) {
        console.log('ocorreu um erro', error);
        alert("deu bosta");
    }
})

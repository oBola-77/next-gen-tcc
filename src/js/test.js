
async function fetchTest() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        console.log('Token não encontrado');
        window.location.href = 'login.html';
        return;
    }
    
    await fetch('/test', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Acesso não autorizado');
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta:', data);
            return data
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function renderizarProjetos(projetos) {
    console.log("Renderizando projetos");
    const container = document.getElementById('projetos-container');
    
    container.innerHTML = '';
    
    projetos.forEach(projeto => {
        
        const card = document.createElement('div');
        card.classList.add('project-card');
        
        card.innerHTML = `
        <div class="project-image">
        <img src="${projeto.imagem}" alt="Imagem do projeto">
        </div>
        <div class="project-info">
        <span class="project-title">${projeto.nome}</span>
        <p class="project-description">${projeto.descricao}</p>
                <p class="project-description">Consultor: ${projeto.consultor}</p>
                <p class="project-description">Status: ${projeto.status}</p>
                <p class="project-description">Data de Conclusão: ${projeto.dataConclusao}</p>
                </div>
                `;
                
                container.appendChild(card);
            });
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

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchTest();
    console.log(data);
    console.log(data.user)
    if (data) {
        console.log("Puxando projetos");
        const projetos = await fetchProjetos();
        if (projetos) {
            console.log("renderizando projetos");
            renderizarProjetos(projetos);
        }
    }
});

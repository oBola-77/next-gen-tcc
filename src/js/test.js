document.addEventListener('DOMContentLoaded', () => {
    console.log("Exe..fetchTest");
    fetchTest();
    console.log("Exe..fetchProjetos");
    fetchProjetos();
});

function fetchTest() {
    const token = localStorage.getItem('authToken'); 

    if (!token) {
        console.log('Token não encontrado');        
        window.location.href = 'login.html'; 
        return;
    }

    fetch('/test', {
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
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function fetchProjetos() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error('Token não encontrado. Faça login.');
        return;
    }

    try {
        const response = fetch('/test', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar projetos.');
        }

        const data = response.json();
        renderizarProjetos(data.projetos);
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
    }
}

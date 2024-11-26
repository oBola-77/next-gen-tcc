let botaoPenis = document.getElementById('btnFetchTest');

document.getElementById('btnFetchTest').addEventListener('click', fetchTest());

function fetchTest() {
    const token = localStorage.getItem('authToken'); 

    if (!token) {
        console.log('Token não encontrado');
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

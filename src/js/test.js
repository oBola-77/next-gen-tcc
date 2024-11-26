document.addEventListener('DOMContentLoaded', () => {
    console.log("Exe..fetchTest");
    fetchTest();
});

function fetchTest() {
    const token = localStorage.getItem('authToken'); 

    if (!token) {
        console.log('Token não encontrado');        
        window.location.href = 'cadastro'; // Redireciona para a página de login
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

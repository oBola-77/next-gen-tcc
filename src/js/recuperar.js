const form = document.getElementById('formRec');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('emailRec').value;

    try {
        const response = await fetch('/recuperarSenha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); 
        } else {
            alert(data.message || "Erro ao enviar o e-mail."); 
        }
    } catch (error) {
        console.error('Erro:', error);
        alert("Ocorreu um erro inesperado.");
    }
});

let formLogin = document.getElementById('formLogin')
formLogin.addEventListener('submit', async function logarUsuario(event) {
    event.preventDefault();

    let dadosLogin = {
        emailLogin: document.getElementById('emailLogin').value,
        senhaLogin: document.getElementById('senhaLogin').value
    }

    if (Object.values(dadosLogin).some(valor => !valor)) {
        alert("Preencha todos os campos");
        return;
    }

    try {
        const response = await fetch('/logarConsultor', { //pelo amor de deus vai
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosLogin)
        });

        if (response.ok) {
            console.log("ta aqui");
            const data = await response.json();

            if (data.token) {
                    localStorage.setItem("authToken", data.token);
                    window.location.href = 'consultor.html';
                    fetchTest();
                    console.log("fetchTest Executado")
                } else {
                console.log("cade o token?");
            }
        } else {
            console.error('Erro no login: ', data.message);
        }
    } catch (error) {
        console.log('Erro ao logar:', error);
        alert("Ocorreu um erro ao logar o usuário.");
    }
})
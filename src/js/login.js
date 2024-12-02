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
        const response = await fetch('/logar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosLogin)
        });

        if (response.ok) {
            const data = await response.json();

            if (data.ia === true) {
                localStorage.setItem("authToken", data.token);
                if (data.token) {
                    alert("Bem vindo, " + data.uid + "!");
                    window.location.href = 'consultor.html';
                } else {
                    alert("Bem vindo, " + data.email + "!");
                    window.location.href = 'test.html';
                }
            } else {
                alert("Falha no login.");
            }
        } else {
            const error = await response.json();
            console.error('Erro no login: ', error.message);
            alert("Erro ao tentar logar.");
        }
    } catch (error) {
        console.log('Erro ao logar:', error);
        alert("Ocorreu um erro ao logar o usuário.");
    }
})
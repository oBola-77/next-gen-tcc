async function fetchTest() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.log('Token não encontrado');
        window.location.href = 'login.html';
        return null; // Retorna null explicitamente
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

    if (Object.values(dadosLogin).some(valor => !valor)) {
        alert("Preencha todos os campos");
        return;
    }
    
    try {
        const response = await fetch('/cadastrarProjeto', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosLogin)
        });

        if(response.ok) {
            const data = await response.json();
        }

    } catch (error) {
        
    }
})


// let formLogin = document.getElementById('formLogin')
// formLogin.addEventListener('submit', async function logarUsuario(event) {
//     event.preventDefault();

//     let dadosLogin = {
//         emailLogin: document.getElementById('emailLogin').value,
//         senhaLogin: document.getElementById('senhaLogin').value 
//     }

//     if (Object.values(dadosLogin).some(valor => !valor)) {
//         alert("Preencha todos os campos");
//         return;
//     } 
    
//     try {
//         const response = await fetch('/logar', { //pelo amor de deus vai
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(dadosLogin)
//         });

//         if (response.ok) {
//             console.log("ta aqui");
//             const data = await response.json();

//             if(data.token) {
//                 alert("Bem vindo, " + data.email + "!");

//                 localStorage.setItem("authToken", data.token);

//                 window.location.href = 'test.html';  
                
//                 fetchTest();
//                 console.log("fetchTest Executado")
//             } else {
//                 console.log("cade o token?");
//             }
//         } else {
//             console.error('Erro no login: ', data.message);
//         }
//     } catch (error) {
//         console.log('Erro ao logar:', error);
//         alert("Ocorreu um erro ao logar o usuário.");
//     }
// })
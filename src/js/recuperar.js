import { DatabasePostgres } from './db/commands-db.js';
const database = new DatabasePostgres;

document.getElementById('formRec').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('emailRec').value;

    if (!email) {
        alert("Por favor, insira seu email.");
        return;
    }

    try {
        await database.recuperarSenha(email);
        alert("Um email de redefinição de senha foi enviado para o seu endereço.");
    } catch (error) {
        console.error("Erro ao enviar email de redefinição:", error);
        alert("Erro ao tentar enviar o email de redefinição. Verifique o endereço e tente novamente.");
    }
});

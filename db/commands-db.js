import { sql } from './conn.js';
import shortUUID from 'short-uuid';
import { auth } from './firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export class DatabasePostgres {
    async registrar(dadosRegistro) {
        const idUsuario = shortUUID.generate();
        const { nomeCompleto, nomeEmpresa, email, telefone, senha, genero } = dadosRegistro;

        console.log("Iniciando registro no banco e Firebase...", idUsuario, dadosRegistro);

        try {
            // Insere os dados no banco de dados
            await sql`INSERT INTO usuarios(id_usuario, nomeCompleto, nomeEmpresa, email, telefone, senha, genero)
                      VALUES(${idUsuario}, ${nomeCompleto}, ${nomeEmpresa}, ${email}, ${telefone}, ${senha}, ${genero})`;
            console.log("Usuário salvo no banco de dados.");

            // Cria o usuário no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            console.log("Usuário criado no Firebase:", userCredential.user);
        } catch (error) {
            console.error("Erro durante o registro:", error);
            throw error; // Repassa o erro para o método chamador
        }
    }

    async validar(dadosLogin) {
        const { emailLogin, senhaLogin } = dadosLogin;

        try {
            console.log("Iniciando validação de login...");

            const userCredential = await signInWithEmailAndPassword(auth, emailLogin, senhaLogin);
            const user = userCredential.user;
            console.log("Usuário autenticado no Firebase:", user);

            const busca = await sql`SELECT * FROM usuarios WHERE email ilike ${emailLogin}`;
            if (busca.length === 0) {
                throw new Error("Usuário não encontrado no banco de dados.");
            }

            console.log("Dados do usuário buscados no banco:", busca);

            return busca[0];
        } catch (error) {
            console.error("Erro durante o login:", error.message);
            throw error; // Repassa o erro para o método chamador
        }
    }
}

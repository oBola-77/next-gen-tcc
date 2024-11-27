import { sql } from './conn.js';
import shortUUID from 'short-uuid';
import { auth } from './firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export class DatabasePostgres {
    async registrar(dadosRegistro) {
        const { nomeCompleto, nomeEmpresa, email, telefone, senha, genero } = dadosRegistro;
        console.log("Iniciando registro no banco e Firebase...", dadosRegistro);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            console.log("Usuário criado no Firebase:", userCredential.user);
            
            await sql`INSERT INTO usuarios(id_usuario, nomeCompleto, nomeEmpresa, telefone, genero)
                      VALUES(${idUsuario}, ${nomeCompleto}, ${nomeEmpresa}, ${telefone}, ${genero})`;
            console.log("Usuário salvo no banco de dados.");
        } catch (error) {
            console.error("Erro durante o registro:", error);
            throw error; 
        }
    }

    async validar(dadosLogin) {
        const { emailLogin, senhaLogin } = dadosLogin;

        try {
            console.log("Iniciando validação de login...");
            console.log('Email:', emailLogin);
            console.log('Senha:', senhaLogin);

            const userCredential = await signInWithEmailAndPassword(auth, emailLogin, senhaLogin);
            const user = userCredential.user;

            console.log("Usuário autenticado no Firebase:", user);

            return { uid: user.uid, email: user.email };

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

    async criarProjeto(dadosProjeto) {
        const { tipoProjeto, dataInicio, idUsuario } = dadosProjeto;

        console.log("Iniciando registro no banco de um projeto novo", idUsuario, dadosRegistro);

        try {
            await sql`INSERT INTO projetos(tipoprojeto, dataprojeto, idUsuario) VALUES (${tipoProjeto}, ${dataInicio}, ${idUsuario})`;
            console.log("Projeto criado");
        } catch (error) {
            console.log("Erro durante a criação do projeto", error);
        }
    }

    async listarProjetos(uid) {
        return await sql`SELECT * FROM projetos WHERE idUsuario = ${uid}`
        console.log("Projetos retornados")
    }
} //FOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOI


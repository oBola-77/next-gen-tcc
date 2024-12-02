import dotenv from 'dotenv';
dotenv.config({ path: './db/.env'});
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
            const idUsuario = userCredential.user.reloadUserInfo.localId;
            console.log("Usuário criado no Firebase:", userCredential.user);
            
            await sql`INSERT INTO usuarios(id_usuario, nomeCompleto, nomeEmpresa, email, telefone, genero)
                      VALUES(${idUsuario}, ${nomeCompleto}, ${nomeEmpresa}, ${email}, ${telefone}, ${genero})`;
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
        } catch (error) {
            console.error("Erro durante o login:", error.message);
            throw error; // Repassa o erro para o método chamador
        }
    }

    async validarConsultor(dadosLogin) {
        const { emailLogin, senhaLogin } = dadosLogin;

        try {
            console.log("Iniciando validação de login de consultor...");
            console.log('Email:', emailLogin);
            console.log('Senha:', senhaLogin);

            const userCredential = await signInWithEmailAndPassword(auth, emailLogin, senhaLogin);
            const user = userCredential.user;

            if (user.uid !== process.env.ADMIN_ID) {
                throw new Error('Usuário não autorizado');
            }

            console.log("Usuário autenticado no Firebase:", user);
            return { uid: user.uid, email: user.email };

        } catch (error) {
            console.error("Erro durante o login:", error.message);
            throw error; // Repassa o erro para o método chamador
        }
    }

    async dadosUsuario(uid){
        try{
            console.log("Validando Usuario");
            const busca = await sql`SELECT * FROM usuarios WHERE id_Usuario = ${uid}`;
            return busca;
        } catch(error){
            console.log(error);
        }
    }

    async criarProjeto(dadosProjeto) {
        const { idCliente, tipoProjeto, descricaoprojeto, consultor } = dadosProjeto;
        console.log("Iniciando registro no banco de um projeto novo", idUsuario);

        try {
            await sql`INSERT INTO projetos(id_usuario, tipoprojeto, descricaoprojeto, consultor, status, datainicio) VALUES (${idCliente}, ${tipoProjeto}, ${descricaoprojeto}, ${consultor}, 'Em Andamento', CURRENT_DATE)`;
            console.log("Projeto criado");
        } catch (error) {
            console.log("Erro durante a criação do projeto", error);
            throw error;
        }
    }

    async listarProjetos(uid) {
        console.log("Buscando projetos para o UID:", uid);
        const dados = await sql`SELECT * FROM projetos WHERE id_usuario = ${uid}`;
        return dados;
    }
} //FOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOI
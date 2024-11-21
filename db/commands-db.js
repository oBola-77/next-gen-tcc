import { sql } from './conn.js';
import shortUUID from 'short-uuid';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCDOqafNG9IItWc3_HY1Oak4jf1c1v8clU",
    authDomain: "next-gen-tcc.firebaseapp.com",
    projectId: "next-gen-tcc",
    storageBucket: "next-gen-tcc.firebasestorage.app",
    messagingSenderId: "688643974899",
    appId: "1:688643974899:web:3aab81fd1b412ca89ef986"
  };

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)

export class DatabasePostgres {
    async registrar(dadosRegistro) {
        const idUsuario = shortUUID.generate();
        const { nomeCompleto, nomeEmpresa, email, telefone, senha, genero } = dadosRegistro;
        console.log(idUsuario, dadosRegistro);

        await sql`INSERT INTO usuarios(id_usuario, nomeCompleto, nomeEmpresa, email, telefone, senha, genero) VALUES(${idUsuario}, ${nomeCompleto}, ${nomeEmpresa}, ${email}, ${telefone}, ${senha}, ${genero})`;
        console.log("Banco de dados criado");

        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuário criado:", user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Erro ao criar usuário:", errorCode, errorMessage);
            });
    }

    async validar(dadosLogin) {
        const { emailLogin, senhaLogin } = dadosLogin;
        console.log(dadosLogin);
        console.log("retorno do req.body")

        const busca = await sql`SELECT * FROM usuarios WHERE email ilike ${emailLogin} AND senha ilike ${senhaLogin}`

        console.log(busca);
        console.log("busca sql")

        return busca;
    }
}

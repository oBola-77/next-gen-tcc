import { sql } from './conn.js';
import shortUUID from 'short-uuid';

export class DatabasePostgres {
    async registrar(dadosRegistro) {
        const idUsuario = shortUUID.generate();
        const { nomeCompleto, nomeEmpresa, email, telefone, senha, genero } = dadosRegistro;
        console.log(idUsuario, dadosRegistro);

        await sql`INSERT INTO usuarios(id_usuario, nomeCompleto, nomeEmpresa, email, telefone, senha, genero) VALUES(${idUsuario}, ${nomeCompleto}, ${nomeEmpresa}, ${email}, ${telefone}, ${senha}, ${genero})`;
        console.log("Banco de dados criado");
    }

    async validar(dadosLogin) {
        const { emailLogin, senhaLogin } = dadosLogin;
        console.log(dadosLogin);
        console.log("retorno do req.body")
    
        const busca = await sql`SELECT * FROM usuarios WHERE email ilike ${emailLogin} AND senha ilike ${senhaLogin}`
        
        console.log(busca);
        console.log("busca sql")
        
        return busca;
}}

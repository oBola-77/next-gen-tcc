
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import { DatabasePostgres } from './db/commands-db.js';
import { sql } from './db/conn.js';

import ejs from 'ejs';

import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import jwt from 'jsonwebtoken';
import { gerarToken } from './middlewares/authMiddleware.js';
import authMiddleware from './middlewares/authMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const database = new DatabasePostgres;
const porta = 8080;
const server = express();


server.engine('html', ejs.renderFile);
server.set('view engine', 'html');
// server.use(cors({
//     origin: 'http://localhost:8080/cadastro.html'
// }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use('/src', express.static(path.join(__dirname, '/src')));
server.use('/db', express.static(path.join(__dirname, '/db')));
server.use(cookieParser());
server.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: true }
    })
);
server.set('views', path.join(__dirname, '/views'));

server.get('/', async (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

server.get('/api/version', async (req, res) => {
    try {
        const result = await sql`SELECT version()`;
        const { version } = result[0];
        res.send(`PostgreSQL Version: ${version}`);
    } catch (err) {
        res.status(500).send('Erro ao consultar a versão do banco de dados.');
    }
});

server.get('/:pagina', (request, reply) => {
    let pagina = request.params.pagina;
    reply.render(`${pagina}`);
    console.log(pagina)
})

// server.get('/consultor', authMiddleware, async (req, res) => {
//     try {
//         const { uid } = req.uid;
//         const projetos = await database.listarProjetos(uid);
//     } catch (error) {
        
//     }
// })

// server.post('/criarPro')

server.get('/test', authMiddleware, async (req, res) => {
    try {
        const uid = req.uid;
        const projetos = await database.listarProjetos(uid);

        res.status(200).json({ projetos });
        console.log({ projetos })
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        res.status(500).json({ message: "Erro ao buscar os projetos." });
    }
})

server.post('/registrar', async (req, res) => {
    const dadosRegistro = req.body;
    try {
        await database.registrar(dadosRegistro);
        res.status(200).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao registrar o usuário." });
    }
})

server.post('/logar', async (req, res) => {
    const dadosLogin = req.body;

    try {
        const user = await database.validar(dadosLogin);
        console.log(user);
        console.log("return do app.js")

        if (user) {
            const token = gerarToken(user)
            console.log('token gerado', token);

            res.cookie("authToken", token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000, 
                userData: {
                    message: "Login Realizado",
                    uid: user.uid,
                    email: user.email
                }
            });

            console.log("Logado com sucesso.")
            return res.status(200).json({ 
                message: "Logado com sucesso",
                token: token,
                email: user.email,
                uid: user.uid
            });
        }

        res.status(401).json({ message: "Dados inválidos" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao logar" })
    }
})

server.post('/logout', (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logout realizado com sucesso" });
});

server.listen(porta, () => {
    console.log(`server subiu em ${porta}`)
})
//neste ponto rodou o login e o cadastro com firebase, só resta a sessão
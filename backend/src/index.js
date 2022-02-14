const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const SECRET = 'inter'

const app = express();
app.use(express.json());
app.use(cors());

async function getConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'transactions'
    });
    return connection;
}

async function query(sql = '', values = []) {
    const conn = await getConnection();
    const result = await conn.query(sql, values);
    conn.end();

    return result[0];
}

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({message: "token inválido ou user não logado"})
        }else{
            req.userId = decoded.userId;
            next();
        }
    });

}

app.post("/token", verifyJWT, async (req, res) => {
    
    const token = req.headers['x-access-token'];
    
    try {
        if (token) {
            res.status(200).json({ auth: true })
        } else {
            res.status(401).json({ message: "token indisponível" })
        }

    } catch (err) {
        res.status(400).json({ message: err })
    }
})

app.post("/transacao", verifyJWT, async (req, res) => {

    const { titulo, valor, categoria_id, tipo, data, hora } = req.body;

    try {

        if (titulo && valor && categoria_id && tipo && data && hora) {
            const sql = "insert into transactions(titulo, valor, categoria_id, tipo, datacao, hora) values (?, ?, ?, ?, ?, ?)";
            const valores = [titulo, valor, categoria_id, tipo, data, hora]
            await query(sql, valores)
            res.status(201).json({ message: "Dados cadastrados com sucesso!" })
        } else {
            res.status(400).json({ message: "Dados incompletos" })
        }


    } catch (err) {
        res.status(400).json({ message: err })
    }

})

app.post("/contato", verifyJWT, async (req, res) => {

    const { nome, email, message } = req.body;

    try {

        if (nome && email && email) {
            const sql = "insert into contact(nome, email, message) values (?, ?, ?)";
            const valores = [nome, email, message]
            await query(sql, valores)
            res.status(201).json({ message: "Cadastrado com sucesso" })
        } else {
            res.status(400).json({ message: "Dados incompletos" })
        }


    } catch (err) {
        res.status(400).json({ message: err })
    }

})

app.post('/login', async(req, res) => {

    const { user, password } = req.body;
    try {

        if (user && password) {

            const sql = "select * from usuarios where usuario = ? and senha = ?";
            const valores = [user, password]
            const login = await query(sql, valores)
            
            if(login.length > 0){

                const token = jwt.sign({userId: login[0].id}, SECRET, {expiresIn: 3600})

                return res.json({auth: true, token})

            }else {

                return res.json({message: "Login negado"})

            }
            

            res.status(201).json({ message: "Cadastrado com sucesso" })
        } else {
            res.status(400).json({ message: "Dados incompletos" })
        }


    } catch (err) {
        res.status(400).json({ message: err })
    }

})

app.get('/transacao', verifyJWT, async (req, res) => {

    const transacoes = await query('SELECT * FROM transactions;')

    res.json(transacoes);
})

app.get('/categoria', verifyJWT, async (req, res) => {

    const categorias = await query('SELECT * FROM categories;')

    res.json(categorias);
})

app.get('/categoria/:id', verifyJWT, async (req, res) => {
    const { id } = req.params;
    const categoria = await query('SELECT * FROM categories where id = ' + id)

    res.json(categoria);
})

app.get('/transacao/:id', verifyJWT, async (req, res) => {
    const { id } = req.params;
    const transacoes = await query('SELECT * FROM transactions where id = ' + id)

    res.json(transacoes);
})

app.put('/transacao/:id', async (req, res) => {

    const { id } = req.params;
    const { titulo, valor, categoria_id, tipo, data, hora } = req.body;

    try {
        const sql = 'UPDATE transactions SET titulo = ?, valor = ?, categoria_id = ?, tipo = ?, datacao = ?, hora = ? WHERE id = ?';
        const valores = [titulo, valor, categoria_id, tipo, data, hora, id]
	
        await query(sql, valores)
		
        res.json({ message: "Editado com sucesso" })
    } catch (err) {
        res.json({ message: err })
    }
})

app.delete('/transacao/:id', verifyJWT, async (req, res) => {

    const { id } = req.params;

    try {
        const sql = 'DELETE FROM transactions WHERE id = ?';
        const valores = [id]
        await query(sql, valores)

        res.json({ message: "Deletado com sucesso" })
    } catch (err) {
        res.json({ message: err })
    }
})


app.listen(3000, function () {
    console.log("server rodando na porta 3000.");
})
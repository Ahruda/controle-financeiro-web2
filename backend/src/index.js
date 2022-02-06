const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json())

async function getConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'vinicius',
        password: 'root',
        database: 'teste'
    });
    return connection;
}

async function query(sql = '', values = []) {
    const conn = await getConnection();
    const result = await conn.query(sql, values);
    conn.end();

    return result[0];
}

app.post("/transacao", async (req, res) => {

    const { titulo, valor, categoria, tipo, data } = req.body;

    try {

        if (titulo && valor && categoria && tipo && data) {
            const sql = "insert into transactions(titulo, valor, categoria, tipo, datacao) values (?, ?, ?, ?, ?)";
            const valores = [titulo, valor, categoria, tipo, data]
            await query(sql, valores)
            res.status(201).json({ message: "deu certo" })
        } else {
            res.status(400).json({ message: "Dados incompletos" })
        }


    } catch (err) {
        res.status(400).json({ message: err })
    }

})

app.get('/transacao', async (req, res) => {

    const transacoes = await query('SELECT * FROM transactions;')

    res.json(transacoes);
})

app.put('/transacao/:id', async (req, res) => {

    const { id } = req.params;
    const { titulo, valor, categoria, tipo, data } = req.body;

    try {
        const sql = 'UPDATE transactions SET titulo = ?, valor = ?, categoria = ?, tipo = ?, datacao = ? WHERE id = ?';
        const valores = [titulo, valor, categoria, tipo, data, id]
        await query(sql, valores)

        res.json({ message: "Editado com sucesso" })
    } catch (err) {
        res.json({ message: err })
    }
})

app.delete('/transacao/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const sql = 'DELETE FROM transactions WHERE id = ?';
        const valores = [id]
        await query(sql, valores)

        res.json({ message: "Deletado com sucesso" })
    } catch (err) {
        res.json({ message: err })
    }
    res.json(produtos);
})


app.listen(3000, function () {
    console.log("server rodando")
})
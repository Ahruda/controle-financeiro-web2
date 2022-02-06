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

app.post("/teste", async (req, res) => {

    const { nome, email } = req.body;

    const sql = await query("insert into teste(nome, email) values (?, ?)")
    const valores = [nome, email]

    await query(sql, valores)

    res.status(201).json({ message: "deu certo" })
})

app.get('/teste', async (req, res) => {

    const produtos = await query('SELECT * FROM TESTE;')

    console.log(produtos)

    res.json(produtos);

})

app.listen(3000, function () {
    console.log("server rodando")
})
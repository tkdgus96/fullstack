


let users = []

const express = require('express')
const cors = require('cors')
var mariadb = require('mariadb')
const app = express()
const port = 3000



const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: "1234",
    database:"test"
})

pool.getConnection();

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}
app.set('port', 3000)
app.use(cors(corsOptions))
app.use(express.json())

app.post('/add_todo', (req, res) => {
    const todoObj = {
        id: Math.floor(Math.random() * 255),
        text: req.body.text
    }
    var sql = 'INSERT INTO todo (id, title) VALUES (?, ?)'
    var params = [todoObj.id, todoObj.text]
    pool.query(sql, params, (err, res) => {
        console.log(res);
        pool.end();
    })
    users.push(todoObj)
    res.send(users)
})

app.post('/update_todo', (req, res) => {
    const todoIndex = users.findIndex(todo => todo.id === req.body.id)
    users[todoIndex].text = req.body.text
    var sql = 'UPDATE todo SET title=? WHERE id=?'
    var params = [req.body.text, req.body.id]
    pool.query(sql, params, (err, res) => {
        console.log(res);
        pool.end();
    })
    res.send(users)
}),
app.post('/delete_todo', (req, res) => {
    const todoIndex = users.findIndex(todo => todo.id === req.body)
    users.splice(todoIndex, 1)
    var sql = 'DELETE FROM todo WHERE id=?'
    var params = [req.body.id]

    pool.query(sql, params, (err, res) => {
        pool.end();
    })
    res.send(users)
}),
app.post('/get_todo', (req, res) => {
    console.log(users)
    res.send(users)
}),
app.listen(3000, () => {
  console.log('using port 3000')
})

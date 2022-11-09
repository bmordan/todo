const express = require('express')
const app = express()
const expressWs = require('express-ws')(app)

const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sqlite:todos.sqlite')

class Todo extends Model {}
Todo.init({
    task: DataTypes.STRING,
    status: DataTypes.BOOLEAN
}, { sequelize })

app.use(express.json())
app.use(express.static('public'))

app.get('/todos', async (req, res) => {
    const todos = await Todo.findAll()
    res.send(todos)
})

app.post('/todos', async (req, res) => {
    const todo = await Todo.create(req.body)
    res.send(todo)
})

app.ws('/chats', (ws, req) => {
    ws.on('message', msg => {
        expressWs.getWss().clients.forEach(client => {
            client.send(msg)
        })
    })
})

app.listen(3000, async () => {
    await sequelize.sync()
    console.log('ready for todos...')
})
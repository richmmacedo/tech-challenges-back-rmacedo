const AppDataSource = require('./datasource/datasource')
const Person = require('./entity/Person.js')

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/example', (req, res) => {
  res.send(AppDataSource.manager.find(Person))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

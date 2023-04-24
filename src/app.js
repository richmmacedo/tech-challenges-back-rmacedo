const AppDataSource = require('./datasource/datasource')
const Person = require('./entity/Person.js')

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/persons', async (req, res) => {
    let persons = await AppDataSource
        .createQueryBuilder()
        .select('person')
        .from(Person)
        .getMany()
    res.send(persons)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

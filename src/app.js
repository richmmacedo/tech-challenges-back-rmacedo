const AppDataSource = require('./datasource/datasource')
const Person = require('./entity/Person.js')

const express = require('express')
const app = express()
const port = 3000

const personRepository = AppDataSource.getRepository(Person)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/persons', async (req, res) => {
    let persons = await personRepository.find({
        relations: {
            roles: true
        }
    })
    res.send(persons)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

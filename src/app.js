const AppDataSource = require('./datasource/datasource')
const Person = require('./entity/Person.js')
const fs = require("fs");
const { marked } = require('marked');
const express = require('express')
const app = express()
const port = 3000

const personRepository = AppDataSource.getRepository(Person)

app.get('/', (req, res) => {
    let readme = './README.md';
    let output = fs.readFileSync(readme, 'utf8');
    res.send(marked(output.toString()));
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

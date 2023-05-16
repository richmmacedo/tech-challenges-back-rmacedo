const AppDataSource = require('./datasource/datasource')
const Person = require('./entity/Person.js')
const fs = require("fs");
const { marked } = require('marked');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

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


app.get('/persons_last_name:last_name', async (req, res) => {             // criar novo método GET com endereço contendo sobrenome pesquisado 
    let person = await personRepository.find({                  
        last_name: req.params.last_name                                   // parametros definidos: retornar persons que tiverem last_name igual ao passado no req
    });
    res.send(person)                                                      // retornar person encontrada(qualquer um que tenha o sobrenome inserido)
})

app.post('/person_insert', async (req, res) => {
    let new_person = await personRepository.insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
})

app.patch('/person_name_update', async (req, res) => {
    let person = await personRepository.update({
        email: req.body.email
        },
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name
        });
})


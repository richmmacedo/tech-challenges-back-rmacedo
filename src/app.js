const AppDataSource = require('./datasource/datasource')
const Person = require('./entity/Person.js')
const Role = require('./entity/Role.js')                                       // Adicionar entity 'Role' para uso
const fs = require("fs");
const { marked } = require('marked');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

const personRepository = AppDataSource.getRepository(Person)
const roleRepository = AppDataSource.getRepository(Role)                       // Buscar repositório de 'Role'

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


app.get('/persons_last_name/:last_name', async (req, res) => {                  // criar novo método GET com endereço contendo sobrenome pesquisado 
    let person = await personRepository.find({
        where: {
            last_name: req.params.last_name
        }                                                              // parametros definidos: retornar persons que tiverem last_name igual ao passado no req
    });
    res.send(person)                                                           // retornar person encontrada (qualquer um que tenha o sobrenome inserido)
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

app.delete('/person_delete', async (req, res) => { 
    let deleted = await personRepository.delete({
        email: req.body.email
        })
})

app.get('/roles', async (req, res) => { 
    let roles = await roleRepository.find();
    res.send(roles)
})

app.post('/role_add', async (req, res) => { 
    let role_adding = await roleRepository.insert({
        name: req.body.name
        }) 
})

app.delete('/role_delete', async (req, res) => {
    let role_deleting = await roleRepository.delete({
        name: req.body.name
        })
})



app.post('/role_assign', async (req, res) => {
    let person = await personRepository.findOne({
        where: {
            id: req.body.personID,
        },
        relations: {
            roles : true,
        }
    });
    let role = await roleRepository.findOne({
        where: {
            id: req.body.roleID,
        }
    });
    person.roles.push(role)
    await personRepository.save(person)
    res.status(200)
})



app.get('/persons_of_roles/:roleID', async (req, res) => {
    let role = await roleRepository.findOne(req.params.roleId, { relations: ['users'] });
    res.send(role.users);
})

app.get('/roles_of_person/:personID', async (req, res) => {
    let person = await personRepository.findOne({
        where: {
            id: req.params.personID,
        }, 
        relations: {
            roles : true,
        }
    });
    if (!person) {
        return res.status(400).send('The person does not exist');
    }
    res.send(person.roles)
})


app.delete('/role_delete', async (req, res) => { 
    let person = await personRepository.findOne({
        where: {
            id: req.body.personID,
        },
        relations: {
            roles : true,
        }
    });
    let role = await roleRepository.findOne({
        where: {
            id: req.body.roleID,
        }
    });
    person.roles.delete(role);
    await personRepository.save(person);
})
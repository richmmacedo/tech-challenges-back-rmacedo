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
    
app.get('/persons', async (req, res) => {                                       // endpoint para buscar pessoas do banco de dados
    let persons = await personRepository.find({                                 // funcao assincrona, usar await
        relations: {
            roles: true                                                         // retornar tambem, lista de roles associado a cada pessoa 
        }
    })
    res.send(persons)                                                           // retornar persons do db na resposta http
})

app.listen(port, () => {                                                        
    console.log(`App listening on port ${port}`)                                // imprimir no console qual port do servidor esta sendo usado 
})


app.get('/persons_last_name/:last_name', async (req, res) => {                  // criar novo método GET com endereço contendo sobrenome pesquisado 
    let person = await personRepository.find({                                  // definir pessoa  a ser buscada e usar await por função ser assíncrona 
        where: {
            last_name: req.params.last_name                                     // parametros definidos: retornar persons que tiverem last_name igual ao passado no req
        }                                                                      
    });
    res.send(person)                                                            // retornar person encontrada (qualquer um que tenha o sobrenome inserido)
})

app.post('/person_insert', async (req, res) => {                                // endpoint para inserir person
    let new_person = await personRepository.insert({
        first_name: req.body.first_name,                                        // definir first name da pessoa inserida
        last_name: req.body.last_name,                                          // definir last name da pessoa inserida 
        email: req.body.email
    })                                                                          // id nao e necessario pois e auto-gerado
})


app.patch('/person_name_update', async (req, res) => {                          // endpoint para atualizar nome utilizando email
    let person = await personRepository.update({
        email: req.body.email                                                   // primeira parte utiliza email para achar nome
        },
        {
            first_name: req.body.first_name,                                    // segunda parte specifica quais campos serao mudados 
            last_name: req.body.last_name
        });
})


app.delete('/person_delete', async (req, res) => {                              // endpoint para deletar person
    let deleted = await personRepository.delete({
        email: req.body.email                                                   // usuario sera deletado atraves da especificacao do email 
        })
})


app.get('/roles', async (req, res) => {                                         // endpoint para retornar todas as roles 
    let roles = await roleRepository.find();                                    // definir variavel com todas as roles do db
    res.send(roles)                                                             // mandar como resposta a list com as roles
})


app.post('/role_add', async (req, res) => {                                     // endpoint para adicionar role 
    let role_adding = await roleRepository.insert({
        name: req.body.name                                                     // nome da role a ser adicionada
        }) 
})


app.delete('/role_delete', async (req, res) => {                                // endpoint para deletar role 
    let role_deleting = await roleRepository.delete({
        name: req.body.name                                                     // nome da role a ser deletada
        })      
})


app.post('/role_assign', async (req, res) => {                                  // endpoint para designar role a person 
    let person = await personRepository.findOne({                               // achar person a ser designada para um role 
        where: {
            id: req.body.personID,
        },
        relations: {                                                            // retornar person com a lista de seus roles
            roles : true,
        }
    });
    let role = await roleRepository.findOne({                                   // encontrar role a ser dada a person 
        where: {
            id: req.body.roleID,                                                // informar id da role pelo body do request
        }
    });
    person.roles.push(role)                                                     // push role nova a person 
    await personRepository.save(person)                                         // salvar person no repositorio novamente
})


app.get('/persons_of_roles/:roleID', async (req, res) => {                      // endpoint para retornar persons desginadas a um role
    let role = await roleRepository.findOne(req.params.roleId,                  // funcao fora de padrao pois nao foi encontrada um metodo correto que retornasse o que pedimos
        { relations: ['users'] });                                              // endpoint necessita revisao 
    res.send(role.users);
})

app.get('/roles_of_person/:personID', async (req, res) => {                     // endpoint para retornar as roles de uma determinada person
    let person = await personRepository.findOne({
        where: {    
            id: req.params.personID,                                            // ID da person informada atravas do parametro na URL 
        }, 
        relations: {                                                            // garantir que roles sao encontradas tambem 
            roles : true,                                                       
        }
    });
 
    res.send(person.roles)                                                      // retornar lista de roles da pessoa como resposta
})


app.delete('/role_delete', async (req, res) => {                                // endpoint para tirar designacao de role de uma pessoa 
    let person = await personRepository.findOne({
        where: {
            id: req.body.personID,                                              // encontrar pessoa correta
        },
        relations: {
            roles : true,                                                       // retornar lista de roles da pessoa 
        }
    });
    let role = await roleRepository.findOne({                                   // encontrar role a ser tirada da pessoa 
        where: {
            id: req.body.roleID,                                                // ID da role
        }
    });
    person.roles.delete(role);                                                  // funcao delete nao funcionou nesse caso, necessita revisao
    await personRepository.save(person);                                        // salvar Person novamente no repositorio
})

// apenas dois endpoints nao foram solucionados: GET retornando persons de uma role / DELETE para apagar role de uma person
// um pouco de dificuldade em entender por completo o funcionamento da many-to-many mas aprendizado com o geral de API's e requests.